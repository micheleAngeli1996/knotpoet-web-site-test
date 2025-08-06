// galaxy.component.ts
import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild, OnDestroy } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-galaxy',
  template: `
    <div #canvasContainer class="galaxy-container"></div>`,
  styles: `
    :host {
      display: block;
      width: 100vw;
      height: 100vh;
      position: fixed;
      background: radial-gradient(circle at center, #331d53 0%, #1e293b 100%);
      z-index: -1;
    }

    .galaxy-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 0;
      pointer-events: none;
      background: radial-gradient(circle at center,
      rgba(34, 13, 78, 1) 0%,
      rgba(0, 0, 0, 1) 80%);
    }`
})
export class Galaxy implements AfterViewInit, OnDestroy {
  private stars!: THREE.Points;
  private starMaterial!: THREE.PointsMaterial;
  private isVisible = true;
  private lastTime = 0;
  private shootingStarTimer: number | null = null;
  private animationId: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  @ViewChild('canvasContainer', { static: true }) canvasRef!: ElementRef;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupVisibilityListeners();
      this.initThreeJS();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {

      if (this.shootingStarTimer) {
        clearTimeout(this.shootingStarTimer);
      }
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
  }

  private setupVisibilityListeners(): void {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  private handleVisibilityChange = (): void => {
    this.isVisible = !document.hidden;

    if (this.isVisible) {
      // Reset del timer quando la scheda torna visibile
      this.lastTime = performance.now();
      this.scheduleNextShootingStar();
    } else {
      // Ferma il timer quando la scheda perde il focus
      if (this.shootingStarTimer) {
        clearTimeout(this.shootingStarTimer);
        this.shootingStarTimer = null;
      }
    }
  };

  private initThreeJS(): void {
    const container = this.canvasRef.nativeElement;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Sistema di stelle multi-livello per effetto profondità
    const starLayers: {
      points: THREE.Points,
      material: THREE.PointsMaterial,
      originalSizes: number[],
      rotationSpeed: { x: number, y: number },
      parallaxFactor: number
    }[] = [];

    const loader = new THREE.TextureLoader();
    const starTex = loader.load('img/wallpapers/star-mask-removebg.png');

    // Layer 1: Stelle lontane (sfondo)
    const createStarLayer = (count: number, spread: number, minZ: number, maxZ: number,
      minSize: number, maxSize: number, opacity: number,
      color: number, parallaxFactor: number) => {
      const geometry = new THREE.BufferGeometry();
      const positions = [];
      const sizes = [];
      const colors = [];
      const originalSizes = [];

      for (let i = 0; i < count; i++) {
        const x = THREE.MathUtils.randFloatSpread(spread);
        const y = THREE.MathUtils.randFloatSpread(spread);
        const z = THREE.MathUtils.randFloat(minZ, maxZ);
        positions.push(x, y, z);

        // Le stelle più lontane sono più piccole
        const distanceFactor = Math.abs(z) / Math.abs(maxZ);
        const baseSize = THREE.MathUtils.randFloat(minSize, maxSize);
        const size = baseSize * (1 - distanceFactor * 0.7); // Riduce dimensione con distanza
        sizes.push(size);
        originalSizes.push(size);

        // Colore basato sulla distanza - stelle lontane più blu/fredde
        const r = color === 0xffffff ? 1 : ((color >> 16) & 255) / 255;
        const g = color === 0xffffff ? 1 : ((color >> 8) & 255) / 255;
        const b = color === 0xffffff ? 1 : (color & 255) / 255;

        // Aggiungi variazione di colore basata su distanza
        const colorVar = 1 - distanceFactor * 0.3;
        colors.push(r * colorVar, g * colorVar, b);
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        map: starTex,
        size: 1.0,
        transparent: true,
        opacity: opacity,
        sizeAttenuation: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending
      });

      const points = new THREE.Points(geometry, material);

      return {
        points,
        material,
        originalSizes,
        rotationSpeed: {
          x: THREE.MathUtils.randFloat(0.0001, 0.0005) * parallaxFactor,
          y: THREE.MathUtils.randFloat(0.0001, 0.0008) * parallaxFactor
        },
        parallaxFactor
      };
    };

    // Layer 1: Stelle molto lontane (sfondo profondo)
    const layer1 = createStarLayer(1200, 800, -500, -300, 0.3, 0.6, 0.4, 0xaabbff, 0.3);
    starLayers.push(layer1);
    scene.add(layer1.points);

    // Layer 2: Stelle a distanza media
    const layer2 = createStarLayer(1000, 600, -300, -150, 0.5, 1.0, 0.6, 0xddddff, 0.6);
    starLayers.push(layer2);
    scene.add(layer2.points);

    // Layer 3: Stelle più vicine (primo piano)
    const layer3 = createStarLayer(400, 400, -150, -50, 0.8, 1.5, 0.8, 0xffffff, 1.0);
    starLayers.push(layer3);
    scene.add(layer3.points);

    // Layer 4: Stelle molto vicine (poche ma prominenti)
    const layer4 = createStarLayer(200, 300, -50, 50, 1.2, 2.5, 0.9, 0xffffdd, 1.5);
    starLayers.push(layer4);
    scene.add(layer4.points);

    // Mantieni riferimento al primo layer per compatibilità
    this.stars = layer1.points;
    this.starMaterial = layer1.material;

    // Sistema di stelle cadenti con effetto cometa
    const shootingStars: {
      mesh: THREE.Mesh,
      trail: THREE.Line,
      velocity: THREE.Vector3,
      trailPositions: THREE.Vector3[]
    }[] = [];

    const createCometTail = (startPos: THREE.Vector3): THREE.Line => {
      const trailGeometry = new THREE.BufferGeometry();
      const trailPositions = [];
      const trailColors = [];

      // Creiamo una scia iniziale con 20 punti
      for (let i = 0; i < 20; i++) {
        trailPositions.push(startPos.x, startPos.y, startPos.z);
        // Colore bianco con alpha che decresce
        const alpha = (20 - i) / 20; // Dalla testa alla coda
        trailColors.push(1, 1, 1, alpha);
      }

      trailGeometry.setAttribute('position', new THREE.Float32BufferAttribute(trailPositions, 3));
      trailGeometry.setAttribute('color', new THREE.Float32BufferAttribute(trailColors, 4));

      const trailMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 1.0,
        blending: THREE.AdditiveBlending,
        linewidth: 3 // Linea più spessa
      });

      return new THREE.Line(trailGeometry, trailMaterial);
    };

    const spawnShootingStar = (): void => {
      // Non spawnare stelle se la scheda non è visibile
      if (!this.isVisible) return;

      // Stella cadente principale più piccola
      const geometry = new THREE.SphereGeometry(0.8, 6, 6); // Ridotta da 1.2 a 0.8
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9
      });
      const shootingStar = new THREE.Mesh(geometry, material);

      // Genera posizione di partenza da diverse direzioni (più lontano per evitare primi piani)
      const startPos: THREE.Vector3 = new THREE.Vector3(THREE.MathUtils.randFloat(100, 220), 141, -100);
      const velocity: THREE.Vector3 = new THREE.Vector3(-2, -1.5, 0);

      shootingStar.position.copy(startPos);

      // Creiamo SEMPRE la scia
      const trail = createCometTail(startPos);

      const trailPositions: THREE.Vector3[] = [];

      // Inizializziamo le posizioni della scia
      for (let i = 0; i < 20; i++) {
        trailPositions.push(startPos.clone());
      }

      // Aggiungiamo SEMPRE alla scena
      scene.add(shootingStar);
      scene.add(trail);

      const newStar = {
        mesh: shootingStar,
        trail: trail,
        velocity: velocity,
        trailPositions: trailPositions
      };

      shootingStars.push(newStar);
    };

    // Spawna stelle cadenti a intervalli casuali - con gestione della visibilità
    const scheduleNextShootingStar = (): void => {
      // Cancella il timer precedente se esiste
      if (this.shootingStarTimer) {
        clearTimeout(this.shootingStarTimer);
      }

      // Non schedulare se la scheda non è visibile
      if (!this.isVisible) return;

      this.shootingStarTimer = window.setTimeout(() => {
        spawnShootingStar();
        scheduleNextShootingStar();
      }, THREE.MathUtils.randFloat(3000, 8000));
    };

    // Esponi la funzione per poterla chiamare da handleVisibilityChange
    this.scheduleNextShootingStar = scheduleNextShootingStar;
    scheduleNextShootingStar();

    // Nebulosa con più profondità
    const createNebulaLayer = (radius: number, opacity: number, color: number, z: number) => {
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: opacity,
        side: THREE.BackSide
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.z = z;
      return mesh;
    };

    // Multiple nebula layers for depth
    const nebula1 = createNebulaLayer(400, 0.02, 0x3322aa, -200);
    const nebula2 = createNebulaLayer(300, 0.03, 0x5533bb, -100);
    const nebula3 = createNebulaLayer(200, 0.04, 0x6644cc, -50);

    scene.add(nebula1);
    scene.add(nebula2);
    scene.add(nebula3);

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    document.addEventListener('mousemove', (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Variabili per l'animazione delle stelle scintillanti
    let time = 0;
    let lastTimestamp = 0;

    const animate = (timestamp: number) => {
      this.animationId = requestAnimationFrame(animate);

      // Calcola deltaTime per animazioni smooth anche dopo pause
      if (lastTimestamp === 0) lastTimestamp = timestamp;
      const deltaTime = Math.min((timestamp - lastTimestamp) / 1000, 0.1); // Limita deltaTime per evitare salti enormi
      lastTimestamp = timestamp;

      // Solo se la scheda è visibile, aggiorna il tempo di animazione
      if (this.isVisible) {
        time += deltaTime;
      }

      // Animazione di tutti i layer di stelle con effetti di parallax
      starLayers.forEach((layer, layerIndex) => {
        // Rotazione diversa per ogni layer (effetto parallax)
        layer.points.rotation.y += layer.rotationSpeed.y * deltaTime * 60;
        layer.points.rotation.x += layer.rotationSpeed.x * deltaTime * 60;

        // Effetto scintillante per ogni layer
        const sizes = layer.points.geometry.attributes['size'].array as Float32Array;
        const starCount = sizes.length;

        for (let i = 0; i < starCount; i++) {
          // Ogni stella ha una frequenza di scintillio basata sul layer e posizione
          const flickerSpeed = (0.5 + layerIndex * 0.2) + Math.sin(i * 0.03) * 0.2;
          const phase = time * flickerSpeed + i * 0.15 + layerIndex * 0.5;

          // Scintillio più pronunciato per stelle vicine
          const intensityMultiplier = layer.parallaxFactor * 0.3 + 0.7;
          const flicker = 0.8 + 0.2 * Math.sin(phase) + 0.1 * Math.sin(phase * 1.5) * intensityMultiplier;

          sizes[i] = layer.originalSizes[i] * THREE.MathUtils.clamp(flicker, 0.6, 1.4);
        }
        layer.points.geometry.attributes['size'].needsUpdate = true;

        // Opacità variabile per ogni layer
        const baseOpacity = [0.4, 0.6, 0.8, 0.9][layerIndex] || 0.8;
        layer.material.opacity = baseOpacity + 0.1 * Math.sin(time * 0.4 + layerIndex);
      });

      // Animazione nebulosa con movimento indipendente per ogni layer
      nebula1.rotation.y -= 0.00008 * deltaTime * 60;
      nebula1.rotation.x += 0.00005 * deltaTime * 60;

      nebula2.rotation.y -= 0.00012 * deltaTime * 60;
      nebula2.rotation.x -= 0.00007 * deltaTime * 60;

      nebula3.rotation.y += 0.00015 * deltaTime * 60;
      nebula3.rotation.x += 0.00010 * deltaTime * 60;

      // Camera movement con effetto parallax migliorato
      const targetX = mouse.x * 30; // Aumentato il range di movimento
      const targetY = -mouse.y * 30;

      camera.position.x += (targetX - camera.position.x) * 0.03;
      camera.position.y += (targetY - camera.position.y) * 0.03;

      // Parallax per i layer di stelle
      starLayers.forEach((layer, index) => {
        const parallaxStrength = layer.parallaxFactor * 0.5;
        layer.points.position.x = -mouse.x * 10 * parallaxStrength;
        layer.points.position.y = mouse.y * 10 * parallaxStrength;
      });

      // Parallax per le nebulose
      nebula1.position.x = -mouse.x * 2;
      nebula1.position.y = mouse.y * 2;
      nebula2.position.x = -mouse.x * 5;
      nebula2.position.y = mouse.y * 5;
      nebula3.position.x = -mouse.x * 8;
      nebula3.position.y = mouse.y * 8;

      camera.lookAt(scene.position);

      // Aggiorna stelle cadenti e le loro scie - solo se visibile
      if (this.isVisible) {
        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const shootingStar = shootingStars[i];

          // Aggiorna posizione della stella
          shootingStar.mesh.position.add(shootingStar.velocity);

          // Aggiorna la scia
          shootingStar.trailPositions.unshift(shootingStar.mesh.position.clone());
          if (shootingStar.trailPositions.length > 20) {
            shootingStar.trailPositions.pop();
          }

          // Aggiorna la geometria della scia
          const trailGeometry = shootingStar.trail.geometry;
          const positions = trailGeometry.attributes['position'].array as Float32Array;
          const colors = trailGeometry.attributes['color'].array as Float32Array;

          for (let j = 0; j < shootingStar.trailPositions.length; j++) {
            const pos = shootingStar.trailPositions[j];
            positions[j * 3] = pos.x;
            positions[j * 3 + 1] = pos.y;
            positions[j * 3 + 2] = pos.z;

            // Colore che sfuma lungo la scia
            const alpha = 1 - (j / shootingStar.trailPositions.length);
            colors[j * 4 + 3] = alpha * 0.8;
          }

          trailGeometry.attributes['position'].needsUpdate = true;
          trailGeometry.attributes['color'].needsUpdate = true;

          // Rimuovi stelle che sono uscite dalla vista (controllo più ampio per tutte le direzioni)
          if (shootingStar.mesh.position.x < -400 || shootingStar.mesh.position.x > 400 ||
            shootingStar.mesh.position.y < -400 || shootingStar.mesh.position.y > 400) {
            scene.remove(shootingStar.mesh);
            scene.remove(shootingStar.trail);
            shootingStars.splice(i, 1);
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate(0);

    // Resize handler
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }

  // Funzione esposta per la gestione della visibilità
  private scheduleNextShootingStar!: () => void;
}
