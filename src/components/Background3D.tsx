import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ============================================================
   Background3D — full-viewport Three.js scene (vanilla three)
   - Low-poly wireframe shapes + particle field + glow sprites
   - Gentle orbit + mouse parallax / attraction
   - Perf: DPR clamp, pause when tab hidden, full dispose,
     static single-frame when prefers-reduced-motion
   - Canvas is pointer-events:none and aria-hidden (never blocks UI)
   ============================================================ */

function makeGlowTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  g.addColorStop(0, "rgba(197,224,28,0.85)");
  g.addColorStop(0.35, "rgba(197,224,28,0.28)");
  g.addColorStop(1, "rgba(197,224,28,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

export default function Background3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // ---- renderer / scene / camera ----
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5),
    );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.045);
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 14);

    const world = new THREE.Group();
    scene.add(world);

    const disposables: Array<{ dispose: () => void }> = [];

    // ---- particle field ----
    const P_COUNT = isMobile ? 140 : 260;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(P_COUNT * 3);
    for (let i = 0; i < P_COUNT; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 34;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.06,
      color: 0xc5e01c,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeo, pMat);
    world.add(particles);
    disposables.push(pGeo, pMat);

    // ---- floating wireframe shapes ----
    const shapes: Array<{
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      orbitR: number;
      orbitSpeed: number;
      orbitPhase: number;
      rotSpeed: number;
    }> = [];

    const geoPool = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TetrahedronGeometry(1, 0),
      new THREE.TorusGeometry(0.8, 0.22, 6, 12),
      new THREE.BoxGeometry(1.1, 1.1, 1.1),
    ];
    disposables.push(...geoPool);

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xc5e01c,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const wireMat2 = new THREE.MeshBasicMaterial({
      color: 0x8fae12,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    disposables.push(wireMat, wireMat2);

    const SHAPES = isMobile ? 6 : 10;
    for (let i = 0; i < SHAPES; i++) {
      const geo = geoPool[i % geoPool.length];
      const mesh = new THREE.Mesh(geo, i % 2 === 0 ? wireMat : wireMat2);
      const s = 0.5 + Math.random() * 1.1;
      mesh.scale.setScalar(s);
      const baseX = (Math.random() - 0.5) * 22;
      const baseY = (Math.random() - 0.5) * 14;
      mesh.position.set(baseX, baseY, -2 - Math.random() * 6);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      world.add(mesh);
      shapes.push({
        mesh,
        baseX,
        baseY,
        orbitR: 0.4 + Math.random() * 0.9,
        orbitSpeed: 0.08 + Math.random() * 0.16,
        orbitPhase: Math.random() * Math.PI * 2,
        rotSpeed: 0.05 + Math.random() * 0.15,
      });
    }

    // ---- soft lime glow orbs (sprites) ----
    const glowTex = makeGlowTexture();
    disposables.push(glowTex);
    const orbs: THREE.Sprite[] = [];
    const orbPos: Array<[number, number, number, number]> = isMobile
      ? [
          [-7, 3, -6, 7],
          [7, -3, -7, 8],
        ]
      : [
          [-8, 3.5, -6, 8],
          [8, -2.5, -7, 9],
          [0, 5.5, -9, 7],
        ];
    orbPos.forEach(([x, y, z, size]) => {
      const mat = new THREE.SpriteMaterial({
        map: glowTex,
        transparent: true,
        opacity: 0.32,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      disposables.push(mat);
      const sprite = new THREE.Sprite(mat);
      sprite.position.set(x, y, z);
      sprite.scale.setScalar(size);
      scene.add(sprite);
      orbs.push(sprite);
    });

    // ---- mouse parallax (lerped) ----
    const mouse = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // ---- resize ----
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ---- loop (paused when tab hidden) ----
    let raf = 0;
    let running = true;
    const clock = new THREE.Clock();

    const render = () => {
      renderer.render(scene, camera);
    };

    if (reduced) {
      // Static single frame for reduced motion
      render();
    } else {
      const tick = () => {
        if (!running) return;
        raf = requestAnimationFrame(tick);
        const t = clock.getElapsedTime();

        smooth.x += (mouse.x - smooth.x) * 0.035;
        smooth.y += (mouse.y - smooth.y) * 0.035;

        // world parallax
        world.rotation.y = smooth.x * 0.14 + t * 0.012;
        world.rotation.x = smooth.y * 0.08;
        camera.position.x = smooth.x * 0.7;
        camera.position.y = -smooth.y * 0.5;
        camera.lookAt(0, 0, 0);

        // shapes: orbit + drift toward mouse (attraction)
        for (const s of shapes) {
          const a = t * s.orbitSpeed + s.orbitPhase;
          s.mesh.position.x =
            s.baseX + Math.cos(a) * s.orbitR + smooth.x * 0.8;
          s.mesh.position.y =
            s.baseY + Math.sin(a * 0.9) * s.orbitR - smooth.y * 0.6;
          s.mesh.rotation.x += s.rotSpeed * 0.016;
          s.mesh.rotation.y += s.rotSpeed * 0.02;
        }

        particles.rotation.y = t * 0.008;
        orbs.forEach((o, i) => {
          o.position.y += Math.sin(t * 0.4 + i * 2) * 0.0012;
          (o.material as THREE.SpriteMaterial).opacity =
            0.28 + Math.sin(t * 0.6 + i) * 0.06;
        });

        render();
      };
      tick();
    }

    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        clock.getDelta();
        const tick = () => {
          if (!running) return;
          raf = requestAnimationFrame(tick);
          const t = clock.getElapsedTime();
          smooth.x += (mouse.x - smooth.x) * 0.035;
          smooth.y += (mouse.y - smooth.y) * 0.035;
          world.rotation.y = smooth.x * 0.14 + t * 0.012;
          world.rotation.x = smooth.y * 0.08;
          camera.position.x = smooth.x * 0.7;
          camera.position.y = -smooth.y * 0.5;
          camera.lookAt(0, 0, 0);
          for (const s of shapes) {
            const a = t * s.orbitSpeed + s.orbitPhase;
            s.mesh.position.x =
              s.baseX + Math.cos(a) * s.orbitR + smooth.x * 0.8;
            s.mesh.position.y =
              s.baseY + Math.sin(a * 0.9) * s.orbitR - smooth.y * 0.6;
            s.mesh.rotation.x += s.rotSpeed * 0.016;
            s.mesh.rotation.y += s.rotSpeed * 0.02;
          }
          particles.rotation.y = t * 0.008;
          render();
        };
        tick();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // ---- cleanup / dispose ----
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.9 }}
    />
  );
}
