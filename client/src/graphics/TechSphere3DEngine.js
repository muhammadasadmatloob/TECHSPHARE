import * as THREE from 'three';

/**
 * OOP Class: TechSphere3DEngine
 * Encapsulates Three.js 3D spatial core visualization, particle physics,
 * mouse interaction matrix, and memory management.
 */
export class TechSphere3DEngine {
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.options = {
      particleCount: options.particleCount || 1200,
      sphereRadius: options.sphereRadius || 2.4,
      enableMouseFollow: options.enableMouseFollow !== false,
      ...options
    };

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = null;
    this.coreMesh = null;
    this.outerRing = null;
    this.animationFrameId = null;

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    this.init();
  }

  init() {
    if (!this.container) return;

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || 500;

    // 1. Scene setup
    this.scene = new THREE.Scene();

    // 2. Camera setup
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = 7;

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f0ff, 3, 50);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);

    const purpleLight = new THREE.PointLight(0x7000ff, 2, 50);
    purpleLight.position.set(-5, -5, -2);
    this.scene.add(purpleLight);

    // 5. Build Core Holographic Sphere (Icosahedron Wireframe + Mesh)
    const geometry = new THREE.IcosahedronGeometry(this.options.sphereRadius, 3);
    const material = new THREE.MeshStandardMaterial({
      color: 0x111111,
      wireframe: true,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.25,
      roughness: 0.1,
      metalness: 0.9
    });
    this.coreMesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.coreMesh);

    // 6. Build Outer Torus Ring
    const ringGeometry = new THREE.TorusGeometry(3.6, 0.03, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x7000ff, wireframe: true });
    this.outerRing = new THREE.Mesh(ringGeometry, ringMaterial);
    this.outerRing.rotation.x = Math.PI / 3;
    this.scene.add(this.outerRing);

    // 7. Build Particle Constellation
    this.buildParticleSystem();

    // 8. Event Listeners
    this.onWindowResize = this.onWindowResize.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    window.addEventListener('resize', this.onWindowResize);
    if (this.options.enableMouseFollow) {
      window.addEventListener('mousemove', this.onMouseMove);
    }

    // 9. Start Loop
    this.animate();
  }

  buildParticleSystem() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.options.particleCount * 3);
    const colors = new Float32Array(this.options.particleCount * 3);

    const color1 = new THREE.Color(0x00f0ff);
    const color2 = new THREE.Color(0xffffff);

    for (let i = 0; i < this.options.particleCount * 3; i += 3) {
      const radius = 3.5 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  onMouseMove(event) {
    this.mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || 500;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

    // Smooth mouse lerp
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Rotate Meshes
    if (this.coreMesh) {
      this.coreMesh.rotation.y += 0.005;
      this.coreMesh.rotation.x += 0.003;
      this.coreMesh.rotation.z = this.mouse.x * 0.4;
    }

    if (this.outerRing) {
      this.outerRing.rotation.z -= 0.004;
      this.outerRing.rotation.y = this.mouse.y * 0.5;
    }

    if (this.particles) {
      this.particles.rotation.y += 0.001;
    }

    // Camera tilt shift
    this.camera.position.x = this.mouse.x * 0.8;
    this.camera.position.y = this.mouse.y * 0.8;
    this.camera.lookAt(this.scene.position);

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    // Memory disposal to avoid WebGL memory leaks
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    window.removeEventListener('resize', this.onWindowResize);
    window.removeEventListener('mousemove', this.onMouseMove);

    if (this.scene) {
      this.scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(mat => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    }

    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
      this.renderer.dispose();
    }
  }
}
