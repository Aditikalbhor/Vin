import * as THREE from 'three';

export function createTestSphere(scene) {
    const geometry = new THREE.SphereGeometry(1, 64, 64);

    const material = new THREE.MeshStandardMaterial({
        color: 0x648cff,
        metalness: 0.3,
        roughness: 0.4
    });

    const sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);
    const markerGeometry = new THREE.SphereGeometry(0.12, 24, 24);

const markerMaterial = new THREE.MeshBasicMaterial({
    color: 0xff4444
});

const marker = new THREE.Mesh(markerGeometry, markerMaterial);

marker.position.set(0, 0, 1);

sphere.add(marker);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(3, 3, 5);
    scene.add(directionalLight);

    return sphere;
}