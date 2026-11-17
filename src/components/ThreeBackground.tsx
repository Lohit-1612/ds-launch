import { useEffect, useRef } from 'react';
import type { FC } from 'react';
import * as THREE from 'three';

interface TileData {
  mesh: THREE.Group;
  initialPos: THREE.Vector3;
  initialRot: THREE.Euler;
  floatSpeed: number;
  floatOffset: number;
  rotSpeed: { x: number; y: number; z: number };
}

interface ThreeBackgroundProps {
  activeSectionIndex?: number;
}

export const ThreeBackground: FC<ThreeBackgroundProps> = ({ activeSectionIndex = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeSectionIndexRef = useRef(activeSectionIndex);

  useEffect(() => {
    activeSectionIndexRef.current = activeSectionIndex;
  }, [activeSectionIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050817, 0.038);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 9);
    camera.lookAt(0, 0, 0);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x0a1025, 2.5);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00e5ff, 4.5, 25);
    cyanLight.position.set(-4, 3, 4);
    scene.add(cyanLight);

    const blueLight = new THREE.PointLight(0x287bff, 5.0, 25);
    blueLight.position.set(4, 2, 3);
    scene.add(blueLight);

    const purpleLight = new THREE.PointLight(0x8755ff, 3.5, 20);
    purpleLight.position.set(0, -2, 2);
    scene.add(purpleLight);

    // 5. Perspective Grid Floor with Intersections
    const gridSize = 40;
    const gridDivisions = 40;
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x287bff, 0x122448);
    gridHelper.position.y = -1.8;
    scene.add(gridHelper);

    // Glowing cross marks (+) at grid points
    const crossGroup = new THREE.Group();
    crossGroup.position.y = -1.79;
    const crossMaterial = new THREE.LineBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.45,
    });

    const crossPoints = [
      new THREE.Vector3(-0.15, 0, 0),
      new THREE.Vector3(0.15, 0, 0),
      new THREE.Vector3(0, 0, -0.15),
      new THREE.Vector3(0, 0, 0.15),
    ];
    const crossGeo = new THREE.BufferGeometry().setFromPoints(crossPoints);

    for (let x = -8; x <= 8; x += 2) {
      for (let z = -6; z <= 6; z += 2) {
        const line = new THREE.LineSegments(crossGeo, crossMaterial);
        line.position.set(x, 0, z);
        crossGroup.add(line);
      }
    }
    scene.add(crossGroup);

    // 6. Floating Particles
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 24;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12 + 1;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
      particleScales[i] = Math.random() * 0.8 + 0.2;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

    const canvasParticle = document.createElement('canvas');
    canvasParticle.width = 32;
    canvasParticle.height = 32;
    const pCtx = canvasParticle.getContext('2d')!;
    const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(0, 229, 255, 1)');
    grad.addColorStop(0.3, 'rgba(40, 123, 255, 0.8)');
    grad.addColorStop(1, 'rgba(5, 8, 23, 0)');
    pCtx.fillStyle = grad;
    pCtx.beginPath();
    pCtx.arc(16, 16, 16, 0, Math.PI * 2);
    pCtx.fill();

    const particleTexture = new THREE.CanvasTexture(canvasParticle);
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 7. Dynamic Tile Face Texture Generator
    const createTileCanvasTexture = (iconType: string, label: string) => {
      const cvs = document.createElement('canvas');
      cvs.width = 512;
      cvs.height = 512;
      const ctx = cvs.getContext('2d')!;

      // Background
      const bgGrad = ctx.createLinearGradient(0, 0, 512, 512);
      bgGrad.addColorStop(0, '#0a1025');
      bgGrad.addColorStop(1, '#050817');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 512, 512);

      // Border glow
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 14;
      ctx.strokeRect(10, 10, 492, 492);

      // Label
      ctx.font = 'bold 36px monospace';
      ctx.fillStyle = '#00e5ff';
      ctx.textAlign = 'center';
      ctx.fillText(label, 256, 420);

      // Icon
      ctx.save();
      ctx.translate(256, 220);
      ctx.strokeStyle = '#00e5ff';
      ctx.fillStyle = '#00e5ff';
      ctx.lineWidth = 12;

      if (iconType === 'sparkle') {
        ctx.beginPath();
        ctx.arc(0, 0, 50, 0, Math.PI * 2);
        ctx.fill();
      } else if (iconType === 'cube') {
        ctx.strokeRect(-50, -50, 100, 100);
      } else if (iconType === 'network') {
        ctx.beginPath();
        ctx.arc(-60, 40, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(60, 40, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, -60, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-60, 40);
        ctx.lineTo(0, -60);
        ctx.lineTo(60, 40);
        ctx.stroke();
      } else {
        ctx.strokeRect(-40, -40, 80, 80);
      }
      ctx.restore();

      return new THREE.CanvasTexture(cvs);
    };

    // 8. 3D Floating Tiles
    const tileConfigs = [
      { icon: 'sparkle', label: 'GEN AI', x: -4.5, y: 1.2, z: 0.5, rx: 0.1, ry: 0.35 },
      { icon: 'cube', label: 'SYSTEMS', x: -2.3, y: 0.9, z: 1.4, rx: -0.1, ry: 0.2 },
      { icon: 'network', label: 'DATA SCI', x: 0.0, y: 1.3, z: 1.8, rx: 0.05, ry: -0.05 },
      { icon: 'grid', label: 'INTERFACE', x: 2.3, y: 0.8, z: 1.3, rx: 0.1, ry: -0.25 },
      { icon: 'eye', label: 'SENSING', x: 4.5, y: 1.1, z: 0.4, rx: -0.1, ry: -0.38 },
      { icon: 'code', label: 'DEV ENGINE', x: -3.8, y: 2.8, z: -2.2, rx: 0.2, ry: 0.4 },
      { icon: 'wave', label: 'MODELS', x: 3.6, y: 2.6, z: -2.0, rx: -0.15, ry: -0.4 },
    ];

    const tiles: TileData[] = [];
    const tileGeo = new THREE.BoxGeometry(1.3, 1.3, 0.28);

    tileConfigs.forEach((cfg) => {
      const tileGroup = new THREE.Group();
      const faceTex = createTileCanvasTexture(cfg.icon, cfg.label);
      faceTex.colorSpace = THREE.SRGBColorSpace;

      const frontMat = new THREE.MeshPhysicalMaterial({
        map: faceTex,
        roughness: 0.25,
        metalness: 0.1,
        clearcoat: 0.9,
      });

      const bodyMat = new THREE.MeshPhysicalMaterial({
        color: 0x0a1435,
        roughness: 0.2,
        metalness: 0.4,
      });

      const materials = [bodyMat, bodyMat, bodyMat, bodyMat, frontMat, bodyMat];
      const mesh = new THREE.Mesh(tileGeo, materials);
      tileGroup.add(mesh);

      tileGroup.position.set(cfg.x, cfg.y, cfg.z);
      tileGroup.rotation.set(cfg.rx, cfg.ry, 0);
      scene.add(tileGroup);

      tiles.push({
        mesh: tileGroup,
        initialPos: tileGroup.position.clone(),
        initialRot: tileGroup.rotation.clone(),
        floatSpeed: 0.8 + Math.random() * 0.6,
        floatOffset: Math.random() * Math.PI * 2,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.002,
          y: (Math.random() - 0.5) * 0.003,
          z: (Math.random() - 0.5) * 0.001,
        },
      });
    });

    // 9. Mouse interaction parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 10. Resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // 11. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Camera parallax
      const sectionXOffsets = [0, -1.2, 1.2, -0.8, 0.8, -1.4, 1.4, -0.6, 0];
      const targetSecX = sectionXOffsets[activeSectionIndexRef.current % sectionXOffsets.length] || 0;
      camera.position.x += (mouseX * 0.4 + targetSecX - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 0.3 + 1.2 - camera.position.y) * 0.04;
      camera.lookAt(targetSecX * 0.3, 0, 0);

      // Animate floating tiles
      tiles.forEach((tile) => {
        const t = elapsedTime * tile.floatSpeed + tile.floatOffset;
        tile.mesh.position.y = tile.initialPos.y + Math.sin(t) * 0.14;
        tile.mesh.position.x = tile.initialPos.x + Math.cos(t * 0.8) * 0.06;
      });

      // Rotate particle field
      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      tileGeo.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      crossGeo.dispose();
      crossMaterial.dispose();

      tiles.forEach((tile) => {
        scene.remove(tile.mesh);
      });

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.92 }}
      aria-hidden="true"
    />
  );
};
