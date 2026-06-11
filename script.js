/* ═══════════════════════════════════════════════════
   DML PORTFOLIO — script.js
   ═══════════════════════════════════════════════════ */

/* ── SKILL DATA ──────────────────────────────────── */
const SKILLS = {
  "HTML5": {
    desc: "Semantic markup, accessibility best practices, structure-first thinking. The foundation of every site I build.",
    level: 92,
    category: "Frontend"
  },
  "CSS3": {
    desc: "Custom properties, Grid, Flexbox, animations. I write CSS that's both precise and expressive.",
    level: 90,
    category: "Frontend"
  },
  "JavaScript": {
    desc: "Vanilla JS for DOM manipulation, event-driven UIs, canvas animations, and async workflows.",
    level: 80,
    category: "Frontend"
  },
  "PHP": {
    desc: "Server-side scripting for dynamic web apps — sessions, authentication, CRUD, and backend logic.",
    level: 82,
    category: "Backend"
  },
  "MySQL": {
    desc: "Relational database design, normalization (1NF–5NF), complex queries, and ERD modeling.",
    level: 85,
    category: "Backend"
  },
  "Git": {
    desc: "Version control, branching strategies, collaborative workflows via GitHub.",
    level: 75,
    category: "DevTools"
  },
  "Figma": {
    desc: "UI/UX design, prototyping, component systems, and translating designs into precise code.",
    level: 88,
    category: "Design"
  },
  "Responsive Design": {
    desc: "Mobile-first layouts that work across all breakpoints — fluid grids and adaptive components.",
    level: 87,
    category: "Frontend"
  },
  "UI/UX Design": {
    desc: "User-centered design thinking, wireframing, interaction design, and usability principles.",
    level: 85,
    category: "Design"
  },
  "Adobe Photoshop": {
    desc: "Photo editing, digital illustration, and compositing for web and print media.",
    level: 80,
    category: "Design"
  },
  "Adobe Illustrator": {
    desc: "Vector graphics, brand identity creation, logo design, and scalable visual assets.",
    level: 75,
    category: "Design"
  },
  "Database Design": {
    desc: "Schema design, normalization, entity-relationship modeling, and query optimization.",
    level: 84,
    category: "Backend"
  },
  "ERD Modeling": {
    desc: "Translating business requirements into structured, normalized data models with clear relationships.",
    level: 82,
    category: "Backend"
  },
  "Graphic Design": {
    desc: "Brand identity, typography systems, layout composition, and print/digital collateral.",
    level: 86,
    category: "Design"
  },
  "XAMPP": {
    desc: "Local server setup for PHP/MySQL development — Apache configuration, phpMyAdmin, and debugging.",
    level: 78,
    category: "DevTools"
  },
  "Web Development": {
    desc: "End-to-end web projects from concept to deployment — HTML, CSS, JS, PHP, SQL, and beyond.",
    level: 85,
    category: "General"
  },
  "Branding": {
    desc: "Visual identity systems, tone-of-voice, logo design, and brand guidelines for DML and beyond.",
    level: 83,
    category: "Design"
  },
  "Canvas API": {
    desc: "2D/physics-based animations in browser — used for interactive ID card components and data visuals.",
    level: 74,
    category: "Frontend"
  },
  "Problem Solving": {
    desc: "Breaking down complex systems into solvable parts. Comfortable debugging across the full stack.",
    level: 90,
    category: "Soft Skill"
  },
  "Typography": {
    desc: "Type hierarchy, font pairing, optical sizing, and using type as a design element — not decoration.",
    level: 88,
    category: "Design"
  },
  "Full-Stack Thinking": {
    desc: "Connecting frontend UX to backend logic — building systems that are cohesive from DB to browser.",
    level: 80,
    category: "General"
  },
  "Networking (Cisco)": {
    desc: "VLAN configuration, Router-on-a-Stick, DHCP setup, subnetting, and Cisco Packet Tracer topology design.",
    level: 72,
    category: "Networking"
  }
};

/* ── NAVBAR SCROLL ───────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── HAMBURGER ───────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');
const closeBtn   = document.getElementById('mobileNavClose');
const mobLinks   = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
closeBtn.addEventListener('click',  () => mobileNav.classList.remove('open'));
mobLinks.forEach(l => l.addEventListener('click', () => mobileNav.classList.remove('open')));

/* ── PARALLAX ────────────────────────────────────── */
const parallaxBg   = document.getElementById('parallaxBg');
const heroLeft     = document.getElementById('heroLeft');
const heroRight    = document.getElementById('heroRight');

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (parallaxBg) parallaxBg.style.transform = `translateY(${y * 0.35}px)`;
      if (heroLeft)   heroLeft.style.transform   = `translateY(${y * 0.12}px)`;
      if (heroRight)  heroRight.style.transform  = `translateY(${y * 0.07}px)`;
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ── PARTICLES ───────────────────────────────────── */
function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 3 + Math.random() * 6;
    p.style.cssText = `
      width:${size}px;height:${size}px;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      --dur:${5+Math.random()*6}s;
      --delay:${Math.random()*6}s;
    `;
    container.appendChild(p);
  }
}
spawnParticles();

/* ── SCROLL REVEAL ───────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal-bottom, .reveal-left, .reveal-right');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}
initReveal();

/* ── KEYBOARD SKILL MODULE ───────────────────────── */
const keys       = document.querySelectorAll('.key');
const skillPanel = document.getElementById('skillPanel');
const skillIdle  = document.getElementById('skillIdle');
const skillActive= document.getElementById('skillActive');
const skillName  = document.getElementById('skillName');
const skillDesc  = document.getElementById('skillDesc');
const skillBarFill = document.getElementById('skillBarFill');
const skillBarPct  = document.getElementById('skillBarPct');
const skillCat     = document.getElementById('skillCategory');

let selectedKey = null;

function showSkill(skillKey, keyEl) {
  const data = SKILLS[skillKey];
  if (!data) return;

  // Deselect previous
  if (selectedKey && selectedKey !== keyEl) {
    selectedKey.classList.remove('selected');
  }
  keyEl.classList.add('selected');
  selectedKey = keyEl;

  // Update panel
  skillIdle.style.display  = 'none';
  skillActive.style.display = 'flex';

  skillName.textContent = skillKey;
  skillDesc.textContent = data.desc;
  skillCat.textContent  = data.category;

  // Animate bar
  skillBarFill.style.width = '0%';
  skillBarPct.textContent  = '0%';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      skillBarFill.style.width = data.level + '%';
    });
  });

  // Animate percentage counter
  let start = 0;
  const target = data.level;
  const duration = 600;
  const startTime = performance.now();
  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    skillBarPct.textContent = current + '%';
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

keys.forEach(key => {
  const skillKey = key.dataset.skill;

  key.addEventListener('mousedown', () => {
    key.classList.add('pressed');
  });

  key.addEventListener('mouseup', () => {
    key.classList.remove('pressed');
    if (skillKey) showSkill(skillKey, key);
  });

  key.addEventListener('mouseleave', () => {
    key.classList.remove('pressed');
  });

  // Touch support
  key.addEventListener('touchstart', (e) => {
    e.preventDefault();
    key.classList.add('pressed');
  }, { passive: false });

  key.addEventListener('touchend', (e) => {
    e.preventDefault();
    key.classList.remove('pressed');
    if (skillKey) showSkill(skillKey, key);
  }, { passive: false });
});

/* Keyboard typing triggers keys */
const keyMap = {
  'h': 'HTML5', 'c': 'CSS3', 'j': 'JavaScript', 'p': 'PHP',
  's': 'MySQL', 'g': 'Git', 'f': 'Figma', 'u': 'UI/UX Design',
  'd': 'Database Design', 'w': 'Web Development', 'b': 'Branding',
  't': 'Typography', ' ': 'Full-Stack Thinking', 'n': 'Networking (Cisco)'
};

document.addEventListener('keydown', (e) => {
  const skillKey = keyMap[e.key.toLowerCase()];
  if (!skillKey) return;
  const matchEl = [...keys].find(k => k.dataset.skill === skillKey);
  if (matchEl) {
    matchEl.classList.add('pressed');
    showSkill(skillKey, matchEl);
  }
});
document.addEventListener('keyup', (e) => {
  const skillKey = keyMap[e.key.toLowerCase()];
  if (!skillKey) return;
  const matchEl = [...keys].find(k => k.dataset.skill === skillKey);
  if (matchEl) matchEl.classList.remove('pressed');
});

/* ── CONTACT FORM ────────────────────────────────── */
const submitBtn  = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

submitBtn && submitBtn.addEventListener('click', () => {
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formStatus.style.color = '#c0553a';
    formStatus.textContent = 'Please fill in all fields.';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formStatus.style.color = '#c0553a';
    formStatus.textContent = 'Please enter a valid email.';
    return;
  }

  submitBtn.textContent  = 'Sending…';
  submitBtn.disabled     = true;
  formStatus.textContent = '';

  setTimeout(() => {
    submitBtn.textContent  = 'Message Sent ✓';
    formStatus.style.color = '#C8A96A';
    formStatus.textContent = `Thanks, ${name}! I'll get back to you soon.`;

    document.getElementById('name').value    = '';
    document.getElementById('email').value   = '';
    document.getElementById('message').value = '';

    setTimeout(() => {
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled    = false;
    }, 4000);
  }, 1200);
});

/* ── PROJECT CARD TILT ───────────────────────────── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) / (rect.width  / 2);
    const dy     = (e.clientY - cy) / (rect.height / 2);
    const tiltX  = dy * -6;
    const tiltY  = dx *  6;
    card.style.transform = `translateY(-10px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    card.style.transition = 'box-shadow .35s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform  = '';
    card.style.transition = 'transform .5s cubic-bezier(0.16,1,0.3,1), box-shadow .35s ease';
  });
});

/* ── ACTIVE NAV LINK ON SCROLL ───────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navLinksA = document.querySelectorAll('.nav-links a');

const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinksA.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObs.observe(s));
