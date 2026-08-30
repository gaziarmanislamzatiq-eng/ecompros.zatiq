"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Lightweight ambient 3D scene: a slowly rotating wireframe icosahedron
 * built from connected nodes, sitting behind the sidebar. Purely decorative,
 * pointer-events are disabled so it never blocks the tab list.
 *
 * Kept dependency-light on purpose (raw three.js, no postprocessing) so it
 * stays cheap on low-power devices and never fights the GSAP timeline for
 * the main thread.
 */
export default function AmbientOrb() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Layered wireframe icosahedrons for a faceted "network" feel
    const geoOuter = new THREE.IcosahedronGeometry(2.15, 1);
    const wireOuter = new THREE.LineSegments(
      new THREE.WireframeGeometry(geoOuter),
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.35,
      })
    );
    group.add(wireOuter);

    const geoInner = new THREE.IcosahedronGeometry(1.35, 0);
    const wireInner = new THREE.LineSegments(
      new THREE.WireframeGeometry(geoInner),
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.22,
      })
    );
    group.add(wireInner);

    // Node points at the outer vertices
    const pointsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.9,
    });
    const points = new THREE.Points(geoOuter, pointsMat);
    group.add(points);

    let raf = 0;
    let mouseX = 0;
    let mouseY = 0;
    let isVisible = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(mount);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    window.addEventListener("pointermove", handlePointerMove);

    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      const speed = prefersReducedMotion ? 0.04 : 0.16;
      group.rotation.y = t * speed;
      group.rotation.x = Math.sin(t * 0.12) * 0.25;

      // subtle mouse parallax, eased toward target
      group.rotation.y += mouseX * 0.15;
      group.rotation.x += mouseY * 0.08;

      if (isVisible && !document.hidden) {
        renderer.render(scene, camera);
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();
      io.disconnect();
      geoOuter.dispose();
      geoInner.dispose();
      wireOuter.geometry.dispose();
      wireInner.geometry.dispose();
      pointsMat.dispose();
      (wireOuter.material as THREE.Material).dispose();
      (wireInner.material as THREE.Material).dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen"
    />
  );
}
