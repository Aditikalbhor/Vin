import { initializeCamera } from './gestures/camera.js'
import './style.css'
import { detectPinch } from './gestures/gestureRecognition.js';
import { drawLandmarks } from './gestures/drawLandmarks.js'

import {
    initializeHandTracking,
    detectHands
} from './gestures/handTracking.js'

document.querySelector('#app').innerHTML = `
  <header class="navbar">
    <div class="logo">VIN<span>.</span></div>
    <div class="nav-label">INTERACTIVE 3D EXPLORATION</div>
  </header>

  <main>
  <div class="camera-container">
    <video id="camera-feed" autoplay playsinline muted></video>
    <canvas id="hand-canvas"></canvas>
</div>
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
    <video id="camera-feed" autoplay playsinline muted></video>
    <div class="camera-container">
    <canvas id="hand-canvas"></canvas>
</div>
  </main>

  <footer>
    <span>VIN — Interactive 3D Exploration</span>
    <span>Built with curiosity.</span>
  </footer>
  `
  const videoElement = document.querySelector('#camera-feed');
async function startApp() {
    const video = document.querySelector('#camera-feed');

    await initializeCamera(video);
    await startHandTracking();
}

startApp();
  
async function startHandTracking() {

    const canvas = document.querySelector('#hand-canvas');
    const video = document.querySelector('#camera-feed');

    const handLandmarker = await initializeHandTracking();

    function detectFrame() {

        if (video.readyState >= 2) {
            console.log({
              readyState: video.readyState,
              currentTime: video.currentTime,
              videoWidth: video.videoWidth,
              videoHeight: video.videoHeight,
              paused: video.paused
            });
            const results = detectHands(handLandmarker, video);

            console.log("Detected hands:", results.landmarks.length);

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (results.landmarks.length > 0) {
            results.landmarks.forEach((hand, index) => {
              drawLandmarks(canvas, hand);
              const isPinching = detectPinch(hand);

              console.log(
                `Hand ${index + 1}:`,
                isPinching ? "PINCH" : "OPEN"
              );
            });
          }
        }

        requestAnimationFrame(detectFrame);
        console.log("Canvas:", canvas.width, canvas.height);
    }

    detectFrame();
}
let isTracking = true;

function detectFrame() {
    if (!isTracking) return;

    if (video.readyState >= 2) {
        const results = detectHands(handLandmarker, video);
        console.log("Detected hands:", results.landmarks.length);
    }

    requestAnimationFrame(detectFrame);
}