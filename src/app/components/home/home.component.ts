import {
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  private canvasRef!: ElementRef;
  private isMouseDown = false;
  private previousMouseX = 0;
  private previousMouseY = 0;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private keyboard!: THREE.Group;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.initScene();
    this.addResizeListener();
    this.addResizeListener();
    this.addMouseListeners();
    this.loadKeyboardModel(() => {
      this.animate();
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateCameraPosition();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  initScene() {
    const aspect = window.innerWidth / window.innerHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(2, aspect, 0.1, 1000);
    this.updateCameraPosition();
    this.camera.lookAt(0, 0, 0.03);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.canvasRef.nativeElement.appendChild(this.renderer.domElement);
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(0, 1, 0);
    this.scene.add(ambientLight, directionalLight);
  }

  updateCameraPosition() {
    if (window.innerWidth > 890) {
      this.camera.position.set(0, 5, 5);
    } else if (window.innerWidth >= 620) {
      this.camera.position.set(0, 8, 5);
    } else {
      this.camera.position.set(0, 11, 5);
    }
    this.camera.lookAt(0, 0, 0.03);
  }

  loadKeyboardModel(callback: () => void) {
    const loader = new GLTFLoader();
    loader.load('assets/three-js/keyboard.glb', (gltf) => {
      this.keyboard = gltf.scene;
      this.scene.add(this.keyboard);
      callback();
    });
  }

  addMouseListeners() {
    this.canvasRef.nativeElement.addEventListener(
      'mousedown',
      this.onMouseDown.bind(this)
    );
    this.canvasRef.nativeElement.addEventListener(
      'mousemove',
      this.onMouseMove.bind(this)
    );
    this.canvasRef.nativeElement.addEventListener(
      'mouseup',
      this.onMouseUp.bind(this)
    );
  }

  onMouseDown(event: MouseEvent) {
    this.isMouseDown = true;
    this.previousMouseX = event.clientX;
    this.previousMouseY = event.clientY;
  }

  onMouseMove(event: MouseEvent) {
    if (this.isMouseDown) {
      const deltaX = event.clientX - this.previousMouseX;
      const deltaY = event.clientY - this.previousMouseY;
      if (this.keyboard) {
        this.keyboard.rotation.y += deltaX * 0.005;
        this.keyboard.rotation.x += deltaY * 0.005;
      }
      this.previousMouseX = event.clientX;
      this.previousMouseY = event.clientY;
    }
  }

  onMouseUp() {
    this.isMouseDown = false;
  }

  addResizeListener() {
    window.addEventListener('resize', () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      this.renderer.setSize(newWidth, newHeight);
      this.camera.aspect = newWidth / newHeight;
      this.camera.updateProjectionMatrix();
      if (this.keyboard) {
        this.keyboard.position.set(0, 0, 0);
      }
    });
  }

  animate() {
    this.ngZone.runOutsideAngular(() => {
      let rotationDirectionY = 1;
      let rotationDirectionX = -1;
      const rotationSpeedY = 0.002;
      const rotationSpeedX = 0.001;
      const animateFn = () => {
        requestAnimationFrame(animateFn);

        if (this.keyboard) {
          this.keyboard.rotation.y += rotationDirectionY * rotationSpeedY;
          this.keyboard.rotation.x += rotationDirectionX * rotationSpeedX;
        }
        if (Math.abs(this.keyboard.rotation.y) >= Math.PI / 4) {
          rotationDirectionY *= -1;
        }
        if (Math.abs(this.keyboard.rotation.y) >= Math.PI / 4) {
          rotationDirectionX *= -1;
        }
        this.renderer.render(this.scene, this.camera);
      };
      animateFn();
    });
  }
}
