# Donna Mae Lat — Interactive Portfolio

A premium, highly interactive portfolio showcasing my work as a **UI/UX Designer and Frontend Developer**.

## Standout Features
- **2D Physics Engine**: Custom ID Card simulation using `matter.js` (draggable and interactive).
- **Interactive Keyboard**: 3D-styled isometric skills keyboard built with HTML/CSS.
- **Glassmorphic Design**: Deep-blue palette, radial gradients, and layered blur effects.
- **Bento Grid Projects**: Modern layout with image framing and immersive modal views.

## Tech Stack
- HTML5 & CSS3
- Vanilla JavaScript (ES6+)
- [Matter.js](https://brm.io/matter-js/) (2D Physics)
- Bootstrap 5 (Grid System)

## Project Structure
```text
.
├── index.html                 # Homepage (formerly about.html)
├── cv.html                    # Curriculum Vitae & Skills Keyboard
├── projects.html              # Bento-grid Project Showcase
├── awards.html                # Achievements & Certifications
├── contact.html               # Contact form
├── navbar.html                # Shared dynamic navbar component
├── assets/
│   ├── css/style.css          # Design system & styling
│   ├── js/
│   │   ├── script.js          # Navbar logic, keyboard, and modals
│   │   └── id-physics.js      # ID Card physics logic
│   └── img/                   # Image assets
└── README.md                  # Project documentation
```

## Setup & Running Locally

Because the navigation bar loads dynamically, the website must be run using a local web server (instead of double-clicking the HTML files directly).

1. **Clone the repository:**
   ```bash
   git clone https://github.com/donnamaelat/portpolio-website.git
   ```
2. **Open the project:**
   Open the folder in VS Code.
3. **Run locally:**
   Right-click `index.html` and select **Open with Live Server** (requires the VS Code 'Live Server' extension).
