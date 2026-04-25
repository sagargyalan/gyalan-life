import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useLanguage } from '../lib/LanguageContext';

const PANO_URL = "https://media.base44.com/images/public/69e45033a417e8a3481c7bdb/ceffd9171_PANO_20210525_155725_0.jpg";

export default function PanoramaViewer() {
  const { lang, fontClass } = useLanguage();
  const mountRef = useRef(null);
  const stateRef = useRef({});

  const labels = {
    en: { eyebrow: '360° View', title: 'Virtual Village Tour', subtitle: 'Drag to explore the panoramic view of Betini, Andheri, Makwanpur.', drag: 'Click & drag to look around · Scroll to zoom' },
    ne: { eyebrow: '३६०° दृश्य', title: 'भर्चुअल गाउँ भ्रमण', subtitle: 'बेतिनी, अँधेरी, मकवानपुरको panoramic दृश्य हेर्न drag गर्नुहोस्।', drag: 'वरिपरि हेर्न Click & drag गर्नुहोस् · Zoom गर्न Scroll गर्नुहोस्' },
    ko: { eyebrow: '360° 뷰', title: '가상 마을 투어', subtitle: '베티니, 안데리, 마크완푸르의 파노라마 뷰를 탐색하세요.', drag: '둘러보려면 클릭 & 드래그 · 확대/축소하려면 스크롤' },
  };
  const t = labels[lang] || labels.en;

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const w = el.clientWidth;
    const h = el.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.set(0, 0, 0.1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, precision: 'highp' });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio * 1.5, 3));
    el.appendChild(renderer.domElement);

    // Sphere — high resolution segments for crisp rendering
    const geometry = new THREE.SphereGeometry(500, 128, 64);
    geometry.scale(-1, 1, 1);

    const loader = new THREE.TextureLoader();
    const texture = loader.load(PANO_URL);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // State
    const state = stateRef.current;
    state.lon = 0;
    state.lat = 0;
    state.isDragging = false;
    state.startX = 0;
    state.startY = 0;
    state.startLon = 0;
    state.startLat = 0;
    state.fov = 75;

    const onMouseDown = (e) => {
      state.isDragging = true;
      state.startX = e.clientX;
      state.startY = e.clientY;
      state.startLon = state.lon;
      state.startLat = state.lat;
    };
    const onMouseMove = (e) => {
      if (!state.isDragging) return;
      state.lon = state.startLon - (e.clientX - state.startX) * 0.3;
      state.lat = Math.max(-85, Math.min(85, state.startLat + (e.clientY - state.startY) * 0.3));
    };
    const onMouseUp = () => { state.isDragging = false; };

    const onTouchStart = (e) => {
      state.isDragging = true;
      state.startX = e.touches[0].clientX;
      state.startY = e.touches[0].clientY;
      state.startLon = state.lon;
      state.startLat = state.lat;
    };
    const onTouchMove = (e) => {
      if (!state.isDragging) return;
      state.lon = state.startLon - (e.touches[0].clientX - state.startX) * 0.3;
      state.lat = Math.max(-85, Math.min(85, state.startLat + (e.touches[0].clientY - state.startY) * 0.3));
    };

    const onWheel = (e) => {
      state.fov = Math.max(30, Math.min(100, state.fov + e.deltaY * 0.05));
      camera.fov = state.fov;
      camera.updateProjectionMatrix();
    };

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onMouseUp);
    el.addEventListener('wheel', onWheel, { passive: true });

    // Auto-rotate slowly
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!state.isDragging) state.lon += 0.05;

      const phi = THREE.MathUtils.degToRad(90 - state.lat);
      const theta = THREE.MathUtils.degToRad(state.lon);
      camera.lookAt(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta)
      );
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onMouseUp);
      el.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section id="panorama" className="py-28 bg-foreground">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">{t.eyebrow}</p>
          <h2 className={`font-serif text-4xl md:text-5xl font-bold text-white ${fontClass}`}>{t.title}</h2>
          <div className="w-12 h-0.5 bg-primary mx-auto mt-5 mb-4" />
          <p className={`text-white/60 text-lg max-w-xl mx-auto ${fontClass}`}>{t.subtitle}</p>
        </div>

        {/* Viewer */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10" style={{ height: '520px' }}>
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
          {/* Hint overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white/80 text-xs px-4 py-2 rounded-full pointer-events-none">
            🖱️ {t.drag}
          </div>
          {/* 360 badge */}
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full pointer-events-none">
            360°
          </div>
        </div>
      </div>
    </section>
  );
}
