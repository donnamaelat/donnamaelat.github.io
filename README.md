# Donna Mae Lat — Portfolio Website

A premium UI/UX designer and web developer portfolio website built with semantic HTML, custom CSS, Vanilla JavaScript, and the Bootstrap 5 grid system. This site emphasizes visual aesthetics, responsive design, and an intuitive user experience.

## Features
- **Custom Parallax Hero**: Mouse-tracking parallax background with subtle floating particle animations.
- **Interactive Skills Keyboard**: A functional 3D-styled keyboard built with HTML/CSS that reveals skillset data when clicked or typed.
- **Dynamic 3D Project Cards**: Smooth hover tilt effects using Vanilla JS and CSS transforms.
- **Responsive Layout**: Fluid breakpoints and grid management using the standard Bootstrap 5 grid system.
- **Glassmorphism Design System**: Tailored colors (Cream, Charcoal, Soft Gold) combined with background blurring.

## Technologies
- **HTML5**: Semantic and accessible markup.
- **CSS3**: Custom variables, animations, glassmorphic UI, and flexbox layouts.
- **JavaScript (ES6+)**: Event-driven UI, intersection observers, math-based CSS transform calculations.
- **Bootstrap 5**: Utilized exclusively for its robust responsive grid system (`.container`, `.row`, `.col-*`).

## Folder Structure
```text
.
├── index.html             # Home page (Hero section)
├── html/
│   ├── about.html         # About Me & Skills page
│   ├── cv.html            # CV / Resume page
│   ├── projects.html      # Projects showcase page
│   └── contact.html       # Contact form page
├── assets/
│   ├── css/
│   │   └── style.css      # Custom styles and design tokens
│   └── js/
│       └── script.js      # Vanilla JS logic and interactions
└── README.md              # Project documentation
```

## Setup Instructions
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/donnamaelat/portpolio-website.git
   ```
2. Navigate to the project directory:
   ```bash
   cd portpolio-website
   ```
3. Open `index.html` in your preferred web browser. No local server is required as this is a static site (though a tool like VS Code Live Server is recommended for live reloading).

## Deployment Steps (GitHub Pages)
1. Push the final code to the `main` branch of your GitHub repository.
2. In your repository on GitHub, navigate to **Settings** > **Pages**.
3. Under the **Source** section, select `Deploy from a branch`.
4. In the branch dropdown, select `main` and the `/ (root)` folder.
5. Click **Save**.
6. Wait a few minutes for GitHub Actions to build and deploy your site. You will find the live URL at the top of the Pages settings page.
