const SKILLS = {
  "HTML5": { desc: "Semantic markup, accessibility best practices, structure-first thinking.", level: 92, category: "Frontend" },
  "CSS3": { desc: "Custom properties, Grid, Flexbox, animations. Precise and expressive CSS.", level: 90, category: "Frontend" },
  "JavaScript": { desc: "Vanilla JS for DOM manipulation, event-driven UIs, and async workflows.", level: 80, category: "Frontend" },
  "PHP": { desc: "Server-side scripting for dynamic web apps, authentication, and backend logic.", level: 82, category: "Backend" },
  "MySQL": { desc: "Relational database design, complex queries, and data management.", level: 85, category: "Backend" },
  "Git": { desc: "Version control, branching strategies, collaborative workflows via GitHub.", level: 75, category: "DevTools" },
  "Figma": { desc: "UI/UX design, prototyping, component systems, and translating designs.", level: 88, category: "Design" },
  "Responsive Design": { desc: "Mobile-first layouts that work seamlessly across all breakpoints.", level: 90, category: "Frontend" },
  "UI/UX Design": { desc: "User-centered design thinking, interaction design, and usability principles.", level: 85, category: "Design" },
  "Database Design": { desc: "Structuring data effectively for scalability and performance.", level: 85, category: "Backend" },
  "Web Development": { desc: "End-to-end creation of web applications with a focus on clean code.", level: 88, category: "General" },
  "Branding": { desc: "Visual identity systems, logo design, and crafting cohesive brand guidelines.", level: 80, category: "Design" },
  "Typography": { desc: "Type hierarchy, font pairing, optical sizing, and text composition.", level: 85, category: "Design" },
  "Networking (Cisco)": { desc: "Understanding of network fundamentals and routing protocols.", level: 70, category: "Networking" },
  "Canvas API": { desc: "Creating dynamic graphics, charts, and interactive elements directly on the web.", level: 75, category: "Frontend" },
  "Problem Solving": { desc: "Breaking down complex issues into manageable parts to develop effective solutions.", level: 90, category: "Soft Skill" },
  "Full-Stack Thinking": { desc: "Approaching development with an understanding of client and server integration.", level: 85, category: "General" },
  "Graphic Design": { desc: "Creating visual content to communicate messages effectively.", level: 82, category: "Design" },
  "Adobe Photoshop": { desc: "Image editing, compositing, and creating digital assets.", level: 80, category: "Design" },
  "Adobe Illustrator": { desc: "Vector graphics creation including logos, icons, and illustrations.", level: 75, category: "Design" },
  "ERD Modeling": { desc: "Creating Entity-Relationship Diagrams to visualize data architecture.", level: 85, category: "Backend" },
  "Java": { desc: "Object-oriented language used for developing desktop, web, and mobile software.", level: 80, category: "Backend" },
  "Python": { desc: "High-level language known for readability, backend scripting, and versatility.", level: 75, category: "Backend" },
  "C++": { desc: "Systems programming language used for high-performance apps and low-level control.", level: 70, category: "Backend" },
  "C#": { desc: "Modern, object-oriented language for enterprise applications, desktop apps, and games.", level: 70, category: "Backend" },
  "Blender": { desc: "Open-source 3D software for modeling, rendering, animation, and asset creation.", level: 75, category: "Design" },
  "GitHub": { desc: "Web-based platform for hosting Git repositories, collaboration, and CI/CD pipelines.", level: 82, category: "DevTools" },
  "Kodular": { desc: "App-creator platform for building native Android applications visually.", level: 85, category: "DevTools" },
  "Visual Studio": { desc: "Integrated development environment (IDE) for compiling C++, C#, and managing developer workflows.", level: 80, category: "DevTools" },
  "Cisco Packet Tracer": { desc: "Network simulation tool used to model, configure, and troubleshoot network architectures.", level: 82, category: "Networking" },
  "phpMyAdmin": { desc: "Web-based interface for administering MySQL databases, managing tables, and running queries.", level: 85, category: "Backend" },
  "Bootstrap": { desc: "Front-end framework featuring a responsive grid system and pre-styled UI components.", level: 85, category: "Frontend" },
  "XAMPP": { desc: "Local development server stack containing Apache, MySQL, and PHP for testing web applications.", level: 80, category: "DevTools" }
};


// Dynamically load the shared navbar and initialize scroll/hamburger listeners
async function loadNavbar() {
  const defaultNavbarHTML = `
    <nav class="navbar" id="navbar">
      <div class="nav-inner">
        <a href="index.html" class="nav-logo">
          <img src="assets/img/logo.png" alt="DML Logo" class="nav-logo-img">
          <span>DML<span class="nav-logo-dot">.</span></span>
        </a>
        <ul class="nav-links">
          <li><a href="index.html">About</a></li>
          <li><a href="cv.html">CV</a></li>
          <li><a href="projects.html">Projects</a></li>
          <li><a href="awards.html">Awards</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
        <button class="nav-hamburger" id="hamburger" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>

    <div class="mobile-nav" id="mobileNav">
      <div class="mobile-nav-header">
        <a href="index.html" class="nav-logo">
          <img src="assets/img/logo.png" alt="DML Logo" class="nav-logo-img">
          <span>DML<span class="nav-logo-dot">.</span></span>
        </a>
        <button class="mobile-nav-close" id="mobileNavClose" aria-label="Close menu">✕</button>
      </div>
      
      <div class="mobile-nav-body">
        <ul class="mobile-nav-links">
          <li style="--i: 1;"><a href="index.html" class="mob-link"><span class="link-num">01</span>About</a></li>
          <li style="--i: 2;"><a href="cv.html" class="mob-link"><span class="link-num">02</span>CV</a></li>
          <li style="--i: 3;"><a href="projects.html" class="mob-link"><span class="link-num">03</span>Projects</a></li>
          <li style="--i: 4;"><a href="awards.html" class="mob-link"><span class="link-num">04</span>Awards</a></li>
          <li style="--i: 5;"><a href="contact.html" class="mob-link"><span class="link-num">05</span>Contact</a></li>
        </ul>
      </div>

      <div class="mobile-nav-footer">
        <div class="mobile-socials">
          <a href="https://github.com/donnamaelat" target="_blank" aria-label="GitHub">GitHub</a>
          <span class="social-divider"></span>
          <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn">LinkedIn</a>
        </div>
        <p class="mobile-nav-email">donnamaelat@gmail.com</p>
      </div>
    </div>
  `;

  try {
    let htmlText;
    
    // Check if the site is running locally via file:// protocol (CORS restriction)
    if (window.location.protocol === 'file:') {
      console.log("Running locally via file:// protocol. Using embedded navbar template to bypass CORS restriction.");
      htmlText = defaultNavbarHTML;
    } else {
      try {
        const response = await fetch('navbar.html');
        if (!response.ok) throw new Error('Failed to load navbar');
        htmlText = await response.text();
      } catch (fetchError) {
        console.warn("Failed to fetch navbar dynamically, using embedded fallback template:", fetchError);
        htmlText = defaultNavbarHTML;
      }
    }

    const placeholder = document.getElementById('navbar-placeholder');
    if (placeholder) {
      // Create a temporary container to parse HTML string
      const temp = document.createElement('div');
      temp.innerHTML = htmlText;
      
      // Highlight the active page link based on the current filename
      const path = window.location.pathname;
      const filename = path.split('/').pop() || 'index.html';
      
      const navLinks = temp.querySelectorAll('.nav-links a, .mobile-nav a');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === filename || (filename === '' && href === 'index.html')) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      // Replace placeholder div directly with all child elements from temp
      placeholder.replaceWith(...temp.childNodes);
      
      // Initialize scroll event listener
      const navbar = document.getElementById('navbar');
      window.addEventListener('scroll', () => {
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
      }, { passive: true });

      // Initialize hamburger click event listeners
      const hamburger  = document.getElementById('hamburger');
      const mobileNav  = document.getElementById('mobileNav');
      const closeBtn   = document.getElementById('mobileNavClose');
      const mobLinks   = document.querySelectorAll('.mob-link');

      if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
      }
      if (closeBtn && mobileNav) {
        closeBtn.addEventListener('click',  () => mobileNav.classList.remove('open'));
      }
      if (mobLinks && mobileNav) {
        mobLinks.forEach(l => l.addEventListener('click', () => mobileNav.classList.remove('open')));
      }
    }
  } catch (error) {
    console.error("Error loading navbar:", error);
  }
}

loadNavbar();



try {
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
} catch (error) {
  console.error("Error in PARALLAX:", error);
}


try {
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
} catch (error) {
  console.error("Error in PARTICLES:", error);
}


try {
  function initReveal() {
    const els = document.querySelectorAll('.reveal-bottom, .reveal-left, .reveal-right');
    
    els.forEach(el => {
      
      if (el.closest('.hero-content') || el.closest('#heroLeft')) {
        setTimeout(() => el.classList.add('revealed'), 100);
      } else {
        
        const tracker = document.createElement('div');
        tracker.style.position = 'absolute';
        tracker.style.width = '1px';
        tracker.style.height = '1px';
        tracker.style.pointerEvents = 'none';
        tracker.style.visibility = 'hidden';
        
        if (el.parentNode) el.parentNode.insertBefore(tracker, el);
        
        const obs = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            el.classList.add('revealed');
            obs.disconnect();
          }
        }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
        
        obs.observe(tracker);
      }
    });
  }
  initReveal();
} catch (error) {
  console.error("Error in SCROLL REVEAL:", error);
}


try {
const keyboard = document.getElementById('keyboard');
if (keyboard) {
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

    if (selectedKey && selectedKey !== keyEl) {
      selectedKey.classList.remove('selected');
    }
    keyEl.classList.add('selected');
    selectedKey = keyEl;

    skillIdle.style.display  = 'none';
    skillActive.style.display = 'flex';

    skillName.textContent = skillKey;
    skillDesc.textContent = data.desc;
    skillCat.textContent  = data.category;

    skillBarFill.style.width = '0%';
    skillBarPct.textContent  = '0%';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        skillBarFill.style.width = data.level + '%';
      });
    });

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
      if (skillKey) showSkill(skillKey, key);
    });

    key.addEventListener('mouseup', () => {
      key.classList.remove('pressed');
    });

    key.addEventListener('mouseleave', () => {
      key.classList.remove('pressed');
    });

    key.addEventListener('touchstart', (e) => {
      e.preventDefault();
      key.classList.add('pressed');
      if (skillKey) showSkill(skillKey, key);
    }, { passive: false });

    key.addEventListener('touchend', (e) => {
      e.preventDefault();
      key.classList.remove('pressed');
    }, { passive: false });
  });

}
} catch (error) { console.error("Error in KEYBOARD SKILL MODULE:", error); }


try {
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formStatus  = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

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

    fetch(contactForm.action, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message
      })
    })
    .then(response => {
      if (response.ok) {
        submitBtn.textContent  = 'Message Sent ✓';
        formStatus.style.color = '#C8A96A';
        formStatus.textContent = `Thank you, ${name}. Your message has been successfully sent. I will get back to you as soon as possible.`;

        contactForm.reset();

        setTimeout(() => {
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled    = false;
        }, 4000);
      } else {
        response.json().then(data => {
          if (Object.hasOwnProperty.call(data, 'errors')) {
            formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
          } else {
            formStatus.textContent = "Oops! There was a problem submitting your form";
          }
          formStatus.style.color = '#c0553a';
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
        });
      }
    })
    .catch(error => {
      formStatus.style.color = '#c0553a';
      formStatus.textContent = "Oops! There was a problem submitting your form";
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
    });
  });
}
} catch (error) { console.error("Error in CONTACT FORM:", error); }


try {
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
} catch (error) { console.error("Error in PROJECT CARD TILT:", error); }


try {
const PROJECT_DATA = [
  {
    title: "SariSaLasa E-Commerce Website",
    tags: ["UI/UX", "Java", "Full-Stack"],
    desc: "Designed wireframes, user flows, and high-fidelity mockups using Figma to create an intuitive online ordering experience. Developed front-end and back-end functionalities using HTML, CSS, and Java to support e-commerce operations. Created branding, visual layouts, and navigation structures that improved usability and user engagement. Implemented a food randomizer feature that helps customers choose meals when undecided. Managed the complete design and development lifecycle independently from concept to implementation and testing."
  },
  {
    title: "Sip & Slice Cafe Website",
    tags: ["UI/UX", "Web Design", "Full-Stack"],
    desc: "Designed wireframes, high-fidelity mockups, and interactive prototypes using Figma to establish a cohesive user experience. Developed front-end and back-end components for the cafe website, transforming design concepts into functional products. Applied responsive design principles to improve accessibility and usability across multiple devices. Organized branding, typography, spacing, and visual hierarchy to create a consistent and engaging user interface."
  },
  {
    title: "Sip & Slice Mobile App",
    tags: ["Kodular", "Mobile App", "UI/UX"],
    desc: "Developed a functional mobile application for Sip & Slice Cafe using Kodular. Focused on seamless navigation, intuitive mobile layouts, and translating the cafe's branding into a native app experience. Managed the complete app development process independently from concept to implementation."
  },
  {
    title: "Qydentra Dental Clinic",
    tags: ["UI/UX", "Team Project", "Full-Stack"],
    desc: "Collaborated with a four-member team to design and develop a dental clinic website. Designed user-centered interfaces and layouts that improved navigation and visual clarity. Developed front-end and back-end website features to support project requirements and functionality. Contributed branding and visual design elements to maintain a professional healthcare-focused appearance."
  },
  {
    title: "Magma Madness Game",
    tags: ["UI/UX", "Team Project", "Game Web"],
    desc: "Collaborated with a five-member team to design and develop a website supporting a game project. Created interface layouts and visual elements that enhanced user engagement and accessibility. Developed front-end and back-end website components to support project functionality. Applied responsive design principles to ensure a consistent user experience across devices."
  },
  {
    title: "Automated Attendance Penalty System",
    tags: ["System", "Attendance", "Automated"],
    desc: "An automated attendance tracking and penalty management system designed to streamline monitoring. It replaces manual logging with a digital solution, improving accuracy and reducing administrative workload. Features include real-time tracking, automated penalty calculation for tardiness or absences, and comprehensive reporting."
  },
  {
    title: "PS5 Feature Showcase Prototype",
    tags: ["UI/UX", "Prototype", "Figma"],
    desc: "An interactive prototype focusing on the PlayStation 5, designed to showcase its standout features and sleek interface. Built to highlight the console's dynamic UI, game library, and user experience, emphasizing smooth transitions and high-fidelity visuals."
  }
];

const projectModalEl = document.getElementById('projectModal');
if (projectModalEl) {
  const projectModal = new bootstrap.Modal(projectModalEl);
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTags = document.getElementById('modalTags');

  document.querySelectorAll('.project-link, .project-card-img').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (el.tagName === 'A' && el.getAttribute('target') === '_blank') return; 
      if (e.target.closest('.carousel-control-prev') || e.target.closest('.carousel-control-next')) return; 
      
      e.preventDefault();
      const card = e.target.closest('.project-card');
      if (!card) return;
      const index = card.getAttribute('data-index');
      if (index !== null) {
        const data = PROJECT_DATA[index];
        let title = "";
        let desc = "";
        let tagsHTML = "";

        if (data && document.title.includes("Projects")) {
          title = data.title;
          desc = data.desc;
          tagsHTML = data.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        } else {
          const titleEl = card.querySelector('.project-title');
          const descEl = card.querySelector('.project-desc');
          const tagsContainer = card.querySelector('.project-tags');
          if (titleEl) title = titleEl.textContent;
          if (descEl) desc = descEl.textContent;
          if (tagsContainer) tagsHTML = tagsContainer.innerHTML;
        }

        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalTags.innerHTML = tagsHTML;
        
        const imgContainer = card.querySelector('.project-card-img');
        const modalImgContainer = document.getElementById('modalImageContainer');
        if (imgContainer && modalImgContainer) {
          modalImgContainer.classList.remove('zoomed'); 
          modalImgContainer.innerHTML = imgContainer.innerHTML;
          
          const carousel = modalImgContainer.querySelector('.carousel');
          if (carousel) {
            const newId = carousel.id + '-modal';
            carousel.id = newId;
            carousel.querySelectorAll('[data-bs-target]').forEach(c => c.setAttribute('data-bs-target', '#' + newId));
            new bootstrap.Carousel(carousel);
          }
        }

        projectModal.show();
      }
    });
  });

  const modalImgContainer = document.getElementById('modalImageContainer');
  if (modalImgContainer) {
    modalImgContainer.style.cursor = 'zoom-in';
    modalImgContainer.addEventListener('click', (e) => {
      
      if (e.target.closest('.carousel-control-prev') || e.target.closest('.carousel-control-next')) return;
      modalImgContainer.classList.toggle('zoomed');
      modalImgContainer.style.cursor = modalImgContainer.classList.contains('zoomed') ? 'zoom-out' : 'zoom-in';
    });
  }
}
} catch (error) { console.error("Error in PROJECT MODAL:", error); }

// Force download for PDF file instead of opening it in a browser tab
try {
  const downloadBtn = document.getElementById('downloadResumeBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const link = this;
      const originalContent = link.innerHTML;
      
      // Prevent double clicks and show loading feedback
      link.style.pointerEvents = 'none';
      link.style.opacity = '0.7';
      link.innerHTML = 'Downloading...';
      
      fetch(link.href)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch file');
          return response.blob();
        })
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = link.getAttribute('download') || 'Lat, Donna Mae D. - resume.pdf';
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        })
        .catch(err => {
          console.error('Download failed, falling back:', err);
          // Fallback if fetch fails (e.g. cross-origin/local filesystem restrictions)
          window.open(link.href, '_blank');
        })
        .finally(() => {
          // Restore button state
          link.style.pointerEvents = 'auto';
          link.style.opacity = '1';
          link.innerHTML = originalContent;
        });
    });
  }
} catch (error) {
  console.error("Error in DOWNLOAD HANDLER:", error);
}

