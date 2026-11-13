import { initializeCamera } from './gestures/camera.js'
import './style.css'
import {
    detectPinch,
    detectOpenPalm,
    detectFist
} from './gestures/gestureRecognition.js';
import { drawLandmarks } from './gestures/drawLandmarks.js'

import {
    initializeHandTracking,
    detectHands
} from './gestures/handTracking.js'
import {
    getHandPosition,
    getHandMovement
} from './gestures/handMovement.js';

import { initializeScene } from './visualization/scene.js';
import { createTestSphere } from './visualization/object.js';
import { rotateObject } from './visualization/controls.js';

document.querySelector('#app').innerHTML = `
  <header class="navbar">
    <div class="logo">VIN<span>.</span></div>
    <div class="nav-label">INTERACTIVE 3D EXPLORATION</div>
  </header>

  <main>
    <section class="hero">
      <p class="eyebrow">EXPLORE BEYOND THE SCREEN</p>
      <h1>See the world<br/>in <span>another dimension.</span></h1>
      <p class="description">
        Explore space, molecular structures and electronic circuits
        through immersive 3D visualization and hand gestures.
      </p>
      <button id="explore-btn">Start Exploring ↗</button>
    </section>

    <section class="domains">
      <p class="section-label">CHOOSE YOUR UNIVERSE</p>

      <div class="domain-grid">
        <article class="domain-card">
          <span class="domain-number">01</span>
          <div class="domain-icon">✦</div>
          <h2>Astronomy</h2>
          <p>Explore planets, stars and galaxies.</p>
        </article>

        <article class="domain-card">
          <span class="domain-number">02</span>
          <div class="domain-icon">⚛</div>
          <h2>Chemistry</h2>
          <p>Discover atoms, molecules and bonds.</p>
        </article>

        <article class="domain-card">
          <span class="domain-number">03</span>
          <div class="domain-icon">⌘</div>
          <h2>Electronics</h2>
          <p>Explore circuits and electronic components.</p>
        </article>
      </div>
    </section>
    <section class="visualization-section">
        <h2>3D Exploration</h2>
       <div id="three-container"></div>
    </section>
    <section class="camera-section">
      <div class="camera-container">
        <video id="camera-feed" autoplay playsinline muted></video>
        <canvas id="hand-canvas"></canvas>
      </div>

      <div id="gesture-status">
        Gesture: Waiting...
      </div>
    </section>
  </main>

  <footer>
    <span>VIN — Interactive 3D Exploration</span>
    <span>Built with curiosity.</span>
  </footer>
`;

const threeContainer = document.querySelector('#three-container');

const { scene } = initializeScene(threeContainer);

const sphere = createTestSphere(scene);

async function startApp() {
    const video = document.querySelector('#camera-feed');

    await initializeCamera(video);
    await startHandTracking();
}

async function startHandTracking() {
    const canvas = document.querySelector('#hand-canvas');
    const video = document.querySelector('#camera-feed');
    const gestureStatus = document.querySelector('#gesture-status');

    const handLandmarker = await initializeHandTracking();

    function detectFrame() {
        if (video.readyState >= 2) {
            const results = detectHands(handLandmarker, video);

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const detectedGestures = [];

            results.landmarks.forEach((hand, index) => {
                // Draw hand landmarks
                drawLandmarks(canvas, hand);

                // Detect gestures
                const isPinching = detectPinch(hand);
                const isOpenPalm = detectOpenPalm(hand);
                const isFist = detectFist(hand);

                let gesture = "UNKNOWN";

                if (isPinching) {
                    gesture = "PINCH";
                } else if (isOpenPalm) {
                    gesture = "OPEN PALM";
                } else if (isFist) {
                    gesture = "FIST";
                }

                const position = getHandPosition(hand);
                const movement = getHandMovement(hand, index);

if (index === 0) {
    rotateObject(sphere, movement.deltaX, movement.deltaY);
}
                detectedGestures.push(
                  `Hand ${index + 1}: ${gesture} | ` +
                  `X: ${position.x.toFixed(2)} | ` +
                  `Y: ${position.y.toFixed(2)} | ` +
                  `dX: ${movement.deltaX.toFixed(3)} | ` +
                  `dY: ${movement.deltaY.toFixed(3)}`
                );
            });

            gestureStatus.textContent =
                detectedGestures.length > 0
                    ? detectedGestures.join(" | ")
                    : "Gesture: No hands detected";
        }

        requestAnimationFrame(detectFrame);
    }

    detectFrame();
}

startApp();
