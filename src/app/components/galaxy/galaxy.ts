// galaxy.component.ts
import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-galaxy',
  template: `<div #canvasContainer class="galaxy-container"></div>`,
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
export class Galaxy implements AfterViewInit {
  private stars!: THREE.Points;
  private starMaterial!: THREE.PointsMaterial;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  @ViewChild('canvasContainer', { static: true }) canvasRef!: ElementRef;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initThreeJS();
    }
  }

  private initThreeJS(): void {
    const container = this.canvasRef.nativeElement;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Stelle scintillanti
    const starCount = 3000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = [];
    const starSizes = [];
    const starOpacities = [];

    for (let i = 0; i < starCount; i++) {
      const x = THREE.MathUtils.randFloatSpread(600);
      const y = THREE.MathUtils.randFloatSpread(600);
      const z = THREE.MathUtils.randFloatSpread(600);
      starPositions.push(x, y, z);

      // Dimensioni più piccole e controllate
      starSizes.push(THREE.MathUtils.randFloat(0.5, 0.8));

      // Opacità iniziali casuali
      starOpacities.push(THREE.MathUtils.randFloat(0.3, 1.0));
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('size', new THREE.Float32BufferAttribute(starSizes, 1));

    const loader = new THREE.TextureLoader();
    const starTex = loader.load('img/wallpapers/star-circle.png');
    this.starMaterial = new THREE.PointsMaterial({
      map: starTex,
      size: 0.8, // Dimensione base ridotta
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      vertexColors: false
    });

    this.stars = new THREE.Points(starGeometry, this.starMaterial);
    scene.add(this.stars);

    // Sistema di stelle cadenti con effetto cometa
    const shootingStars: {
      mesh: THREE.Mesh,
      trail: THREE.Line,
      velocity: THREE.Vector3,
      trailPositions: THREE.Vector3[]
    }[] = [];

    function createCometTail(startPos: THREE.Vector3): THREE.Line {
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
    }

    function spawnShootingStar() {
      // Stella cadente principale più piccola
      const geometry = new THREE.SphereGeometry(0.8, 6, 6); // Ridotta da 1.2 a 0.8
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9
      });
      const shootingStar = new THREE.Mesh(geometry, material);

      // Genera posizione di partenza da diverse direzioni (più lontano per evitare primi piani)
      const startPos: THREE.Vector3 = new THREE.Vector3(THREE.MathUtils.randFloat(0, 220), 141, -100);
      const velocity: THREE.Vector3 =  new THREE.Vector3(-2, -1.5, 0);  

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
    }

    // Spawna stelle cadenti a intervalli casuali
    function scheduleNextShootingStar() {
      setTimeout(() => {
        spawnShootingStar();
        scheduleNextShootingStar();
      }, THREE.MathUtils.randFloat(3000, 8000));
    }
    scheduleNextShootingStar();

    // Nebulosa
    const nebulaGeometry = new THREE.SphereGeometry(300, 64, 64);
    const nebulaMaterial = new THREE.MeshBasicMaterial({
      color: 0x5522aa,
      transparent: true,
      opacity: 0.03,
      side: THREE.BackSide
    });
    const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    scene.add(nebula);

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    document.addEventListener('mousemove', (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    });



    // Variabili per l'animazione delle stelle scintillanti
    let time = 0;
    const starOriginalSizes = starSizes.slice(); // Copia delle dimensioni originali

    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Rotazione base delle stelle
      this.stars.rotation.y += 0.0005;
      this.stars.rotation.x += 0.0003;
      nebula.rotation.y -= 0.0001;

      // Effetto scintillante sulle stelle (più controllato)
      const sizes = this.stars.geometry.attributes['size'].array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        // Ogni stella ha una frequenza di scintillio più lenta e controllata
        const flickerSpeed = 0.8 + Math.sin(i * 0.05) * 0.3;
        const phase = time * flickerSpeed + i * 0.2;

        // Scintillio ancora più controllato con dimensioni massime limitate
        const flicker = 0.9 + 0.1 * Math.sin(phase) + 0.05 * Math.sin(phase * 1.7);
        sizes[i] = starOriginalSizes[i] * THREE.MathUtils.clamp(flicker, 0.8, 1.2);
      }
      this.stars.geometry.attributes['size'].needsUpdate = true;

      // Opacità generale più stabile
      this.starMaterial.opacity = 0.75 + 0.05 * Math.sin(time * 0.3);

      // Camera movement
      camera.position.x += (mouse.x * 20 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y * 20 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Aggiorna stelle cadenti e le loro scie
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

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }
}