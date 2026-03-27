import { useState, useEffect } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --white:       #FFFFFF;
    --off-white:   #F7FBFD;
    --blue-pale:   #EAF4FB;
    --blue-light:  #BDD9EE;
    --blue:        #7AB8D4;
    --blue-dark:   #4990B2;
    --pink-pale:   #FDF0F5;
    --pink-light:  #F2C4D8;
    --pink:        #D48FAA;
    --pink-dark:   #B8607E;
    --navy:        #19283A;
    --slate:       #4A6070;
    --muted:       #8EA3B2;
    --serif:       'Cormorant Garamond', Georgia, serif;
    --sans:        'DM Sans', system-ui, sans-serif;
  }

  html { scroll-behavior: smooth; overflow-x: hidden; }
  body { font-family: var(--sans); background: var(--white); color: var(--navy); overflow-x: hidden; }

  /* ── GRAIN OVERLAY ─────────────────────────────── */
  body::before {
    content: '';
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.022;
  }

  /* ── NAV ─────────────────────────────────────── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 3.5rem; height: 64px;
    background: linear-gradient(
      105deg,
      rgba(234,244,251,0.93) 0%,
      rgba(255,255,255,0.90) 40%,
      rgba(253,240,245,0.90) 100%
    );
    backdrop-filter: blur(22px);
    border-bottom: 1px solid rgba(189,217,238,0.28);
    transition: box-shadow 0.4s, background 0.4s;
  }
  /* Rainbow shimmer stripe along top */
  .nav::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(122,184,212,0.8) 20%,
      rgba(212,143,170,0.8) 50%,
      rgba(122,184,212,0.8) 80%,
      transparent 100%
    );
  }
  .nav.scrolled {
    box-shadow: 0 4px 40px rgba(26,40,58,0.10), 0 1px 0 rgba(189,217,238,0.3);
    background: linear-gradient(
      105deg,
      rgba(228,242,251,0.97) 0%,
      rgba(255,255,255,0.96) 45%,
      rgba(252,237,246,0.95) 100%
    );
  }
  .nav-logo {
    font-family: var(--serif); font-size: 1.6rem; font-weight: 600;
    color: var(--navy); letter-spacing: 0.03em; text-decoration: none;
  }
  .nav-logo span { color: var(--pink); }
  .nav-links { display: flex; gap: 0.35rem; align-items: center; }
  .nav-links a {
    font-size: 0.72rem; font-weight: 500; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--slate); text-decoration: none;
    padding: 0.45rem 1rem; border-radius: 100px;
    position: relative; transition: color 0.25s, background 0.25s;
  }
  .nav-links a:hover { color: var(--navy); background: rgba(189,217,238,0.25); }
  .nav-links a::after {
    content: ''; position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%);
    width: 3px; height: 3px; border-radius: 50%; background: var(--pink);
    opacity: 0; transition: opacity 0.25s;
  }
  .nav-links a:hover::after { opacity: 1; }

  /* ── HERO ─────────────────────────────────────── */
  .hero {
    min-height: 100vh; position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    padding: 7rem 3.5rem 4rem;
    background:
      radial-gradient(ellipse 80% 65% at 88%  8%,  rgba(122,184,212,0.32) 0%, transparent 60%),
      radial-gradient(ellipse 65% 55% at  8% 88%,  rgba(212,143,170,0.30) 0%, transparent 58%),
      radial-gradient(ellipse 50% 45% at 75% 75%,  rgba(242,196,216,0.22) 0%, transparent 55%),
      radial-gradient(ellipse 45% 40% at 20% 20%,  rgba(189,217,238,0.28) 0%, transparent 55%),
      radial-gradient(ellipse 30% 30% at 50% 50%,  rgba(234,244,251,0.50) 0%, transparent 65%),
      #F3F8FD;
  }
  /* Diagonal mesh lines for premium texture */
  .hero::before {
    content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      repeating-linear-gradient(
        135deg,
        rgba(189,217,238,0.06) 0px, rgba(189,217,238,0.06) 1px,
        transparent 1px, transparent 80px
      ),
      repeating-linear-gradient(
        45deg,
        rgba(212,143,170,0.04) 0px, rgba(212,143,170,0.04) 1px,
        transparent 1px, transparent 120px
      );
  }
  .hero-orb { position: absolute; border-radius: 50%; pointer-events: none; }
  .hero-content { text-align: center; position: relative; z-index: 2; max-width: 880px; }

  /* Decorative rings */
  .hero-ring {
    position: absolute; border-radius: 50%; pointer-events: none;
    border: 1px solid rgba(189,217,238,0.35);
  }

  .hero-tag {
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-size: 0.7rem; font-weight: 500; letter-spacing: 0.28em;
    text-transform: uppercase; color: var(--pink);
    margin-bottom: 2rem;
    opacity: 0; animation: fadeUp 0.8s ease forwards 0.15s;
  }
  .hero-tag::before, .hero-tag::after {
    content: ''; display: block; width: 28px; height: 1px; background: var(--pink-light);
  }
  .hero-name {
    font-family: var(--serif); font-size: clamp(3.8rem, 8vw, 7.5rem);
    font-weight: 300; line-height: 1.02; color: var(--navy);
    margin-bottom: 0.6rem;
    opacity: 0; animation: fadeUp 0.85s ease forwards 0.35s;
  }
  .hero-name em { font-style: italic; color: var(--blue-dark); }
  .hero-subtitle {
    font-family: var(--serif); font-size: clamp(1.25rem, 2.8vw, 1.875rem);
    font-weight: 300; font-style: italic; color: var(--slate);
    margin-bottom: 2rem;
    opacity: 0; animation: fadeUp 0.85s ease forwards 0.55s;
  }
  .hero-desc {
    font-size: 1rem; color: var(--muted); line-height: 1.85;
    max-width: 500px; margin: 0 auto 3rem;
    opacity: 0; animation: fadeUp 0.85s ease forwards 0.75s;
  }
  .hero-btns {
    display: inline-flex; gap: 1rem; flex-wrap: wrap; justify-content: center;
    opacity: 0; animation: fadeUp 0.85s ease forwards 0.95s;
  }
  .btn {
    padding: 0.9rem 2.4rem; border-radius: 2px; font-size: 0.75rem;
    font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
    text-decoration: none; transition: all 0.3s ease; display: inline-block;
  }
  .btn-dark { background: var(--navy); color: var(--white); }
  .btn-dark:hover { background: var(--blue-dark); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(73,144,178,0.28); }
  .btn-ghost { border: 1.5px solid var(--blue-light); color: var(--slate); background: transparent; }
  .btn-ghost:hover { border-color: var(--pink); color: var(--pink-dark); transform: translateY(-2px); }

  .scroll-hint {
    position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
    font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted);
    opacity: 0; animation: fadeUp 0.8s ease forwards 1.4s;
  }
  .scroll-line {
    width: 1px; height: 40px;
    background: linear-gradient(to bottom, var(--blue-light), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }

  /* ── SECTION SHARED ───────────────────────────── */
  .section { padding: 7.5rem 3.5rem; max-width: 1120px; margin: 0 auto; position: relative; z-index: 1; }
  .section-label {
    font-size: 0.68rem; font-weight: 600; letter-spacing: 0.3em;
    text-transform: uppercase; color: var(--pink); margin-bottom: 0.875rem;
  }
  .section-title {
    font-family: var(--serif); font-size: clamp(2.5rem, 5vw, 3.75rem);
    font-weight: 300; color: var(--navy); line-height: 1.08; margin-bottom: 1.25rem;
  }
  .section-title em { font-style: italic; color: var(--blue-dark); }
  .section-rule {
    width: 56px; height: 1.5px; margin-bottom: 3.5rem;
    background: linear-gradient(to right, var(--blue-light), var(--pink-light));
  }

  /* ── ABOUT ────────────────────────────────────── */
  .about-wrap {
    position: relative; overflow: hidden;
    background:
      radial-gradient(ellipse 60% 70% at 95% 50%, rgba(189,217,238,0.22) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 5% 20%, rgba(242,196,216,0.16) 0%, transparent 55%),
      #FFFFFF;
  }
  /* floating soft blob behind about */
  .about-wrap::before {
    content: '';
    position: absolute; top: -120px; right: -180px;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(189,217,238,0.18) 0%, transparent 65%);
    pointer-events: none;
  }
  .about-grid { display: grid; grid-template-columns: auto 1fr auto; gap: 3.5rem; align-items: center; }
  .about-body p { font-size: 1.0625rem; line-height: 1.9; color: var(--slate); margin-bottom: 1.5rem; }
  .about-note { font-size: 0.875rem !important; color: var(--muted) !important; }

  /* ── PHOTO ── */
  .photo-col { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
  .photo-ring {
    position: relative; width: 200px; height: 200px; flex-shrink: 0;
    border-radius: 50%; padding: 3px;
    background: linear-gradient(135deg, var(--blue-light), var(--pink-light), var(--blue), var(--pink));
    box-shadow: 0 12px 48px rgba(122,184,212,0.22), 0 4px 16px rgba(212,143,170,0.18);
    transition: box-shadow 0.4s ease, transform 0.4s ease;
  }
  .photo-ring:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 20px 60px rgba(122,184,212,0.30), 0 8px 24px rgba(212,143,170,0.25); }
  .photo-inner {
    width: 100%; height: 100%; border-radius: 50%; overflow: hidden;
    background: linear-gradient(145deg, var(--blue-pale), var(--pink-pale));
    position: relative;
  }
  .photo-inner img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; border-radius: 50%; }
  .photo-initials {
    width: 100%; height: 100%; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(145deg, var(--blue-pale), var(--pink-pale));
    font-family: var(--serif); font-size: 3rem; font-weight: 300;
    color: var(--blue-dark); letter-spacing: 0.05em;
  }
  .photo-inner::after {
    content: ''; position: absolute; inset: 0; border-radius: 50%;
    background: linear-gradient(145deg, rgba(255,255,255,0.12) 0%, transparent 60%);
    pointer-events: none;
  }
  .photo-caption { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--muted); text-align: center; }
  .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
  .stat-card {
    padding: 2rem 1.75rem; background: rgba(255,255,255,0.85);
    border: 1px solid var(--blue-light); border-radius: 6px;
    text-align: center; position: relative; overflow: hidden;
    backdrop-filter: blur(8px);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s;
  }
  .stat-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2.5px;
  }
  .stat-card:nth-child(odd)::before  { background: linear-gradient(to right, var(--blue-light), var(--blue)); }
  .stat-card:nth-child(even)::before { background: linear-gradient(to right, var(--pink-light), var(--pink)); }
  .stat-card:hover { transform: translateY(-5px); border-color: var(--blue); box-shadow: 0 16px 40px rgba(74,150,187,0.15); }
  .stat-num { font-family: var(--serif); font-size: 2.75rem; font-weight: 300; color: var(--blue-dark); display: block; line-height: 1; margin-bottom: 0.5rem; }
  .stat-lbl { font-size: 0.72rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }

  /* ── SKILLS ───────────────────────────────────── */
  .skills-wrap {
    position: relative; overflow: hidden;
    background:
      radial-gradient(ellipse 50% 80% at 0% 50%, rgba(242,196,216,0.18) 0%, transparent 55%),
      radial-gradient(ellipse 60% 50% at 100% 30%, rgba(122,184,212,0.16) 0%, transparent 55%),
      radial-gradient(ellipse 40% 40% at 50% 90%, rgba(189,217,238,0.20) 0%, transparent 55%),
      #F2F8FC;
  }
  .skills-wrap::after {
    content: '';
    position: absolute; bottom: -100px; left: 50%; transform: translateX(-50%);
    width: 800px; height: 300px; border-radius: 50%;
    background: radial-gradient(ellipse, rgba(212,143,170,0.10) 0%, transparent 65%);
    pointer-events: none;
  }
  .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.75rem; }
  .skill-group h3 {
    font-size: 0.68rem; font-weight: 600; letter-spacing: 0.28em;
    text-transform: uppercase; color: var(--pink); margin-bottom: 1rem;
  }
  .pills { display: flex; flex-wrap: wrap; gap: 0.45rem; }
  .pill {
    font-size: 0.8125rem; font-weight: 400; letter-spacing: 0.01em;
    padding: 0.38rem 0.95rem; border-radius: 100px;
    transition: all 0.22s ease; cursor: default;
  }
  .pill-blue { background: rgba(234,244,251,0.9); color: var(--blue-dark); border: 1px solid var(--blue-light); }
  .pill-blue:hover { background: var(--blue-light); transform: translateY(-1px); }
  .pill-pink { background: rgba(253,240,245,0.9); color: var(--pink-dark); border: 1px solid var(--pink-light); }
  .pill-pink:hover { background: var(--pink-light); transform: translateY(-1px); }
  .pill-grey { background: rgba(26,40,58,0.05); color: var(--slate); border: 1px solid rgba(26,40,58,0.1); }
  .pill-grey:hover { background: rgba(26,40,58,0.09); transform: translateY(-1px); }

  /* ── PROJECTS ─────────────────────────────────── */
  .projects-wrap {
    position: relative; overflow: hidden;
    background:
      radial-gradient(ellipse 55% 60% at 15% 20%, rgba(189,217,238,0.20) 0%, transparent 58%),
      radial-gradient(ellipse 45% 55% at 90% 80%, rgba(242,196,216,0.18) 0%, transparent 55%),
      radial-gradient(ellipse 35% 35% at 60% 10%, rgba(212,143,170,0.08) 0%, transparent 55%),
      #FFFFFF;
  }

  /* Decorative large circle in bg */
  .projects-wrap::before {
    content: '';
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 900px; height: 900px; border-radius: 50%;
    border: 1px solid rgba(189,217,238,0.15);
    pointer-events: none;
  }
  .projects-wrap::after {
    content: '';
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 600px; height: 600px; border-radius: 50%;
    border: 1px solid rgba(242,196,216,0.12);
    pointer-events: none;
  }

  .projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .proj-card {
    padding: 2rem 1.875rem; border-radius: 10px;
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(189,217,238,0.35); position: relative; overflow: hidden;
    display: flex; flex-direction: column;
    transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s, background 0.35s;
  }
  .proj-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    opacity: 0; transition: opacity 0.3s ease;
  }
  /* Glow blob inside card */
  .proj-card::after {
    content: ''; position: absolute; bottom: -40px; right: -40px;
    width: 120px; height: 120px; border-radius: 50%;
    opacity: 0; transition: opacity 0.4s ease;
    pointer-events: none;
  }
  .proj-card:hover { transform: translateY(-8px); border-color: rgba(122,184,212,0.5); box-shadow: 0 28px 60px rgba(74,150,187,0.14); background: rgba(255,255,255,0.95); }
  .proj-card:hover::before { opacity: 1; }
  .proj-card:hover::after { opacity: 1; }

  .accent-blue::before  { background: linear-gradient(to right, var(--blue-light), var(--blue-dark)); }
  .accent-blue::after   { background: radial-gradient(circle, rgba(122,184,212,0.18) 0%, transparent 70%); }
  .accent-pink::before  { background: linear-gradient(to right, var(--pink-light), var(--pink-dark)); }
  .accent-pink::after   { background: radial-gradient(circle, rgba(212,143,170,0.18) 0%, transparent 70%); }
  .accent-mixed::before { background: linear-gradient(to right, var(--blue), var(--pink)); }
  .accent-mixed::after  { background: radial-gradient(circle, rgba(160,163,185,0.14) 0%, transparent 70%); }

  .proj-year {
    font-size: 0.65rem; font-weight: 600; letter-spacing: 0.2em;
    color: var(--muted); text-transform: uppercase; margin-bottom: 0.75rem;
  }
  .proj-name { font-family: var(--serif); font-size: 1.4rem; font-weight: 400; color: var(--navy); margin-bottom: 0.625rem; }
  .proj-desc { font-size: 0.875rem; color: var(--muted); line-height: 1.78; margin-bottom: 1.25rem; flex-grow: 1; }
  .proj-tags { display: flex; flex-wrap: wrap; gap: 0.375rem; margin-bottom: 1.5rem; }
  .proj-tag {
    font-size: 0.68rem; font-weight: 600; letter-spacing: 0.1em;
    text-transform: uppercase; padding: 0.25rem 0.65rem;
    background: var(--blue-pale); color: var(--blue-dark); border-radius: 100px;
  }
  .proj-link {
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--slate); text-decoration: none;
    display: inline-flex; align-items: center; gap: 0.4rem;
    transition: color 0.2s, gap 0.2s; margin-top: auto;
  }
  .proj-link:hover { color: var(--blue-dark); gap: 0.7rem; }
  .proj-no-link { font-size: 0.72rem; color: rgba(138,163,178,0.5); letter-spacing: 0.06em; margin-top: auto; }

  /* ── CONTACT ──────────────────────────────────── */
  .contact-wrap {
    position: relative; overflow: hidden;
    background:
      radial-gradient(ellipse 60% 50% at 20% 30%, rgba(73,144,178,0.35) 0%, transparent 55%),
      radial-gradient(ellipse 50% 60% at 85% 75%, rgba(184,96,126,0.25) 0%, transparent 55%),
      var(--navy);
    padding: 8rem 3.5rem; text-align: center;
  }
  .contact-wrap::before {
    content: '';
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 700px; height: 700px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.04); pointer-events: none;
  }
  .contact-label { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; color: var(--blue-light); margin-bottom: 1rem; }
  .contact-title { font-family: var(--serif); font-size: clamp(2.75rem, 6vw, 4.5rem); font-weight: 300; color: var(--white); line-height: 1.08; margin-bottom: 1.25rem; }
  .contact-title em { font-style: italic; color: var(--blue-light); }
  .contact-sub { font-size: 1rem; color: rgba(255,255,255,0.42); line-height: 1.8; max-width: 440px; margin: 0 auto 3rem; }
  .contact-email {
    font-family: var(--serif); font-size: clamp(1.375rem, 3vw, 2.125rem);
    font-style: italic; color: var(--white); text-decoration: none;
    border-bottom: 1px solid rgba(255,255,255,0.18); padding-bottom: 0.3rem;
    display: inline-block; margin-bottom: 3.5rem;
    transition: color 0.25s, border-color 0.25s;
    position: relative; z-index: 1;
  }
  .contact-email:hover { color: var(--pink-light); border-color: var(--pink-light); }
  .socials { display: flex; justify-content: center; gap: 2.5rem; flex-wrap: wrap; position: relative; z-index: 1; }
  .soc-link {
    font-size: 0.72rem; font-weight: 500; letter-spacing: 0.18em;
    text-transform: uppercase; color: rgba(255,255,255,0.3); text-decoration: none;
    transition: color 0.25s;
  }
  .soc-link:hover { color: rgba(255,255,255,0.9); }

  /* ── FOOTER ───────────────────────────────────── */
  .footer { background: var(--navy); border-top: 1px solid rgba(255,255,255,0.05); padding: 1.5rem 3.5rem; text-align: center; }
  .footer p { font-size: 0.72rem; color: rgba(255,255,255,0.15); letter-spacing: 0.06em; }

  /* ── ANIMATIONS ───────────────────────────────── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes floatA {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50%       { transform: translateY(-22px) rotate(4deg); }
  }
  @keyframes floatB {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50%       { transform: translateY(16px) rotate(-3deg); }
  }
  @keyframes floatC {
    0%, 100% { transform: translateY(0) scale(1); }
    50%       { transform: translateY(-12px) scale(1.04); }
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.3; transform: scaleY(1); }
    50%       { opacity: 1; transform: scaleY(1.1); }
  }
  @keyframes rotateSlow {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to   { transform: translate(-50%, -50%) rotate(360deg); }
  }

  .reveal {
    opacity: 0; transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.in { opacity: 1; transform: none; }
  .d1 { transition-delay: 0.10s; } .d2 { transition-delay: 0.20s; }
  .d3 { transition-delay: 0.30s; } .d4 { transition-delay: 0.40s; }
  .d5 { transition-delay: 0.50s; }

  /* ── RESPONSIVE ───────────────────────────────── */
  @media (max-width: 900px) {
    .nav { padding: 1rem 1.75rem; }
    .nav-links { gap: 1.5rem; }
    .hero { padding: 6rem 1.75rem 4rem; }
    .section { padding: 5rem 1.75rem; }
    .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .photo-ring { width: 150px; height: 150px; }
    .stats-grid { grid-template-columns: 1fr 1fr; }
    .stats-grid { grid-template-columns: 1fr 1fr; }
    .skills-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
    .projects-grid { grid-template-columns: 1fr 1fr; }
    .contact-wrap { padding: 6rem 1.75rem; }
  }
  @media (max-width: 600px) {
    .nav-links { display: none; }
    .skills-grid { grid-template-columns: 1fr; }
    .projects-grid { grid-template-columns: 1fr; }
    .hero-btns { flex-direction: column; align-items: center; }
  }
`;

/* ─── DATA ──────────────────────────────────────── */
const skillGroups = [
  { label: "Languages",         style: "blue", pills: ["Python","Java","C#","Swift","JavaScript","TypeScript","C++","PHP"] },
  { label: "Frontend & Mobile", style: "pink", pills: ["HTML / CSS","Angular","React","SwiftUI","iOS","Android",".NET MAUI"] },
  { label: "Backend",           style: "blue", pills: ["ASP.NET Core","Laravel","Node.js","Express","Firebase","REST APIs"] },
  { label: "Databases",         style: "pink", pills: ["SQL Server","SQLite","MongoDB","Firebase Firestore"] },
  { label: "Tools & Systems",   style: "grey", pills: ["Git","Xcode","Android Studio","VS Code","PHPStorm","Linux"] },
  { label: "Architecture",      style: "grey", pills: ["MVC","MVVM","OOP","CRUD","JWT Auth","Dependency Injection"] },
];

const projects = [
  {
    name: "SkillSwap",
    year: "2026",
    accent: "blue",
    tech: ["Angular","TypeScript"],
    github: "https://github.com/250evelyne/SkillSwap",
    desc: "Full-stack freelance marketplace with user authentication, service listings, booking system, and real-time data updates."
  },
  {
    name: "PlugTrade",
    year: "2025",
    accent: "pink",
    tech: ["SwiftUI","Firebase","MVVM"],
    github: "https://github.com/250evelyne/PlugTrade.git",
    desc: "iOS marketplace to buy, sell, and trade tech products. Features cart & checkout, trade proposals, real-time Firestore notifications, and Firebase Auth."
  },
  {
    name: "Recify",
    year: "2025-2026",
    accent: "mixed",
    tech: ["Swift","SwiftUI","Firebase"],
    github: "https://github.com/250evelyne/Recify",
    desc: "iOS recipe manager with CookingMode, CalendarView, meal planning, shopping list aggregation, and Firebase cloud sync."
  },
  {
    name: "Bankly",
    year: "2025",
    accent: "blue",
    tech: ["Java","Firebase","Retrofit"],
    github: "https://github.com/250evelyne/BankAppAndroidF2025.git",
    desc: "Android banking app integrating 13 REST endpoints with hybrid JWT + Firebase auth, transaction scheduling, and real-time sync."
  },
  {
    name: "MapNavigatorTransport",
    year: "2026",
    accent: "pink",
    tech: ["Swift","MapKit"],
    github: "https://github.com/250evelyne/MapNavigator",
    desc: "iOS navigation app with multi-mode routing (walk / drive / cycle), route drawing, and distance validation via MapKit."
  },
  {
    name: "GlowUp Skincare",
    year: "2026",
    accent: "mixed",
    tech: ["ASP.NET Core","SQL Server"],
    github: null,
    desc: "Database-driven e-commerce platform with product catalog, shopping cart, order management, and full-text search."
  },
  {
    name: "TaskApp",
    year: "2026",
    accent: "blue",
    tech: [".NET MAUI","C#","SQLite"],
    github: null,
    desc: "Cross-platform task manager with SQLite persistence, dependency injection, and priority-based color coding across iOS and Android."
  },
  {
    name: "Bankly",
    year: "2025",
    accent: "pink",
    tech: ["Swift","SwiftUI","Firebase"],
    github: null,
    desc: "iOS notes manager using MVVM, Firestore integration, offline persistence, and SDWebImage for cloud-synced media."
  },
  {
    name: "GradeManager",
    year: "2024",
    accent: "mixed",
    tech: ["Python"],
    github: null,
    desc: "Student records system with file-based persistence, GPA calculation algorithms, and a clean command-line interface."
  },
];

// deduplicate by name just in case
const uniqueProjects = projects.filter((p, i, arr) => arr.findIndex(q => q.name === p.name) === i);

const stats = [
  { num: "10+", lbl: "Projects Built" },
  { num: "2026", lbl: "Graduating"    },
  { num: "5+",  lbl: "Tech Stacks"   },
  { num: "3",   lbl: "Platforms"     },
];

/* ─── COMPONENT ──────────────────────────────────── */
export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.10 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  return (
    <>
      <style>{css}</style>

      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a href="#home" className="nav-logo">E<span>.</span>M</a>
        <div className="nav-links">
          {["about","skills","projects","contact"].map((s) => (
            <a key={s} href={`#${s}`}>{s}</a>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home">
       
        <div className="hero-orb" style={{ width:480, height:480, top:"-6%", right:"-10%", background:"radial-gradient(circle, rgba(189,217,238,.40) 0%, transparent 65%)", animation:"floatA 9s ease-in-out infinite" }} />
        <div className="hero-orb" style={{ width:360, height:360, bottom:"-5%", left:"-8%",  background:"radial-gradient(circle, rgba(242,196,216,.35) 0%, transparent 65%)", animation:"floatB 11s ease-in-out infinite" }} />
        <div className="hero-orb" style={{ width:200, height:200, top:"42%",  left:"3%",    background:"radial-gradient(circle, rgba(122,184,212,.22) 0%, transparent 65%)", animation:"floatC 13s ease-in-out infinite 2s" }} />
        <div className="hero-orb" style={{ width:130, height:130, top:"18%",  right:"16%",  background:"radial-gradient(circle, rgba(212,143,170,.20) 0%, transparent 65%)", animation:"floatB 8s ease-in-out infinite 1s" }} />
      
        <div className="hero-ring" style={{ width:340, height:340, top:"50%", left:"8%", transform:"translateY(-50%)", opacity:0.5, animation:"floatA 15s ease-in-out infinite 3s" }} />
        <div className="hero-ring" style={{ width:180, height:180, bottom:"15%", right:"10%", opacity:0.4, animation:"floatC 10s ease-in-out infinite" }} />

        <div className="hero-content">
          <p className="hero-tag">Portfolio · Montréal · 2026</p>
          <h1 className="hero-name">
            Evelyne<br /><em>Mukarukundo</em>
          </h1>
          <p className="hero-subtitle">Full-Stack Developer &amp; CS Student</p>
          <p className="hero-desc">
            Building elegant, functional software across web, mobile, and beyond —
            with a passion for clean code and thoughtful design.
          </p>
          <div className="hero-btns">
      <a href="#projects" className="btn btn-dark">View Projects</a>
<a href="/my-portfolio/Evelyne_CV.pdf" download className="btn btn-ghost">Download CV</a>
<a href="#contact"  className="btn btn-ghost">Get in Touch</a>

          </div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-line" />
          scroll
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="about-wrap">
        <div className="section">
          <p className="section-label reveal">About</p>
          <h2 className="section-title reveal">Crafting solutions<br /><em>with purpose</em></h2>
          <div className="section-rule reveal" />

          <div className="about-grid">

            {/* Photo column */}
            <div className="photo-col reveal">
              <div className="photo-ring">
                <div className="photo-inner">
              
               <img src="/my-portfolio/me.jpg" alt="Evelyne Mukarukundo" />
                </div>
              </div>
              <p className="photo-caption">Evelyne Mukarukundo</p>
            </div>

            {/* Bio column */}
            <div className="about-body">
              <p className="reveal">
                I'm a Computer Science student at LaSalle College Montréal, passionate about building
                software that is both technically sound and beautifully considered. From iOS apps to
                full-stack web platforms, I bring a meticulous approach to every project.
              </p>
              <p className="reveal d1">
                With experience across Python, Java, C#, Swift, JavaScript and more, I'm comfortable
                across the entire stack — mobile, backend, frontend, and database — and I thrive where
                creativity and engineering intersect.
              </p>
              <p className="reveal d2 about-note">
                Multilingual · Fluent English · Conversational French · Open to internship opportunities.
              </p>
            </div>

            {/* Stats column */}
            <div className="stats-grid">
              {stats.map(({ num, lbl }, i) => (
                <div key={lbl} className={`stat-card reveal d${i + 1}`}>
                  <span className="stat-num">{num}</span>
                  <span className="stat-lbl">{lbl}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="skills-wrap">
        <div className="section">
          <p className="section-label reveal">Expertise</p>
          <h2 className="section-title reveal">Technical <em>skills</em></h2>
          <div className="section-rule reveal" />

          <div className="skills-grid">
            {skillGroups.map(({ label, style, pills }, i) => (
              <div key={label} className={`skill-group reveal d${(i % 5) + 1}`}>
                <h3>{label}</h3>
                <div className="pills">
                  {pills.map((p) => (
                    <span key={p} className={`pill pill-${style}`}>{p}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="projects-wrap">
        <div className="section">
          <p className="section-label reveal">Work</p>
          <h2 className="section-title reveal">Selected <em>projects</em></h2>
          <div className="section-rule reveal" />

          <div className="projects-grid">
            {uniqueProjects.map(({ name, year, accent, tech, github, desc }, i) => (
              <div key={name} className={`proj-card accent-${accent} reveal d${(i % 4) + 1}`}>
                <p className="proj-year">{year}</p>
                <h3 className="proj-name">{name}</h3>
                <p className="proj-desc">{desc}</p>
                <div className="proj-tags">
                  {tech.map((t) => <span key={t} className="proj-tag">{t}</span>)}
                </div>
                {github
                  ? <a href={github} target="_blank" rel="noopener noreferrer" className="proj-link">View on GitHub →</a>
                  : <span className="proj-no-link">Private project</span>
                }
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-wrap">
        <p className="contact-label reveal">Contact</p>
        <h2 className="contact-title reveal">Let's <em>connect</em></h2>
        <p className="contact-sub reveal">
          Open to internship opportunities and collaborations.<br />
          Based in Montréal — available from May 2026.
        </p>
        <br />
        <a href="mailto:evelynekessie@gmail.com" className="contact-email reveal">
          evelynekessie@gmail.com
        </a>
        <div className="socials reveal">
         <a href="https://github.com/250evelyne" target="_blank" rel="noopener noreferrer" className="soc-link">GitHub</a>
<a href="https://www.linkedin.com/in/evelyne-mukarukundo-317407188" target="_blank" rel="noopener noreferrer" className="soc-link">LinkedIn</a>
          <a href="tel:+15144301949" className="soc-link">+1 (514) 430‑1949</a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <p>© 2026 Evelyne Mukarukundo — Designed &amp; built with React + Vite</p>
      </footer>
    </>
  );
}