import * as THREE from 'three';

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('section_1');
    if (!heroSection) return;

    const containerWidth = heroSection.clientWidth;
    const containerHeight = heroSection.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(containerWidth / -2, containerWidth / 2, containerHeight / 2, containerHeight / -2, 1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setClearColor(0x000000, 0);
    heroSection.appendChild(renderer.domElement);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '1';

    // Colors
    const style = getComputedStyle(document.body);
    const primaryColor = new THREE.Color(style.getPropertyValue('--primary-color').trim() || '#535da1');

    // Wave Geometry and Shader Material
    const waveWidth = containerWidth * 2; // Make it wider than the screen to animate across
    const waveHeight = 350; // The amplitude of the wave
    const segments = 400;
    const geometry = new THREE.PlaneGeometry(waveWidth, waveHeight, segments, 1);

    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0.0 },
            waveColor: { value: primaryColor }
        },
        vertexShader: `
            uniform float time;
            varying vec2 vUv;
            void main() {
                vUv = uv;
                vec3 pos = position;
                
                // Simple sine wave
                pos.y += sin(pos.x * 0.01 + time) * 20.0;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 waveColor;
            void main() {
                gl_FragColor = vec4(waveColor, 1.0);
            }
        `,
        transparent: true
    });

    const wave = new THREE.Mesh(geometry, material);
    scene.add(wave);

    // Position the wave at the bottom
    wave.position.y = -containerHeight / 2 + 150;

    camera.position.z = 5;

    // Animation Loop
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        material.uniforms.time.value = clock.getElapsedTime();
        renderer.render(scene, camera);
    }
    animate();

    // Handle Window Resize
    window.addEventListener('resize', () => {
        const newWidth = heroSection.clientWidth;
        const newHeight = heroSection.clientHeight;

        camera.left = newWidth / -2;
        camera.right = newWidth / 2;
        camera.top = newHeight / 2;
        camera.bottom = newHeight / -2;
        camera.updateProjectionMatrix();

        renderer.setSize(newWidth, newHeight);

        // Update wave geometry on resize
        wave.geometry.dispose();
        wave.geometry = new THREE.PlaneGeometry(newWidth * 2, 300, segments, 1);
        wave.position.y = -newHeight / 2 + 150;
    });
});
