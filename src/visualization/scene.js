import * as THREE from 'three';

let scene;
let camera;
let renderer;

export function initializeScene(container) {
    // Create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080b18);

    // Create the camera
    camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );

    camera.position.z = 5;

    // Create the renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    container.appendChild(renderer.domElement);

    // Render loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();

    return { scene, camera, renderer };
}