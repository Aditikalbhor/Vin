
import './style.css'

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
  </main>

  <footer>
    <span>VIN — Interactive 3D Exploration</span>
    <span>Built with curiosity.</span>
  </footer>
`
