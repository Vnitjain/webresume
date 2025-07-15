
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, model;

function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, 350 / 350, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const canvas = document.querySelector('#three-canvas');
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(350, 350);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Model
    const loader = new GLTFLoader();
    loader.load('models/tux.gltf', (gltf) => {
        model = gltf.scene;
        model.scale.set(0.05, 0.05, 0.05);
        model.position.y = -2;
        scene.add(model);
    });

    // Animation
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    if (model) {
        model.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

init();
