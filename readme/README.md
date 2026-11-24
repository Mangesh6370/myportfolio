# Project Documentation

## Overview

This is Mangesh Kumar Mahala's responsive personal portfolio. It is primarily a static website built with HTML, CSS, and vanilla JavaScript. Optional FastAPI and Spring Boot contact endpoints are included in the `backend/` directory.

The portfolio presents:

- Personal introduction and career objective
- Education and certification timeline
- Technical skill categories and progress indicators
- Academic and practical projects
- Experience and achievements
- Contact details and a contact form
- Dark and light themes
- Responsive desktop, tablet, and mobile layouts
- Java, Python, and SQL code examples

## Technology Stack

| Area | Technology |
| --- | --- |
| Structure | HTML5 |
| Styling | CSS3, CSS variables, Flexbox, CSS Grid |
| Interactions | Vanilla JavaScript |
| Icons | Font Awesome 6.5.2 |
| Typography | Google Fonts: Plus Jakarta Sans and JetBrains Mono |
| Python backend | FastAPI, Uvicorn, Pydantic |
| Java backend | Spring Boot REST controller |
| Static deployment | Netlify, Vercel, GitHub Pages |

## Complete File Arrangement

```text
mangesh-portfolio/
├── index.html
├── README.md
├── readme/
│   └── README.md
├── css/
│   └── style.css
├── js/
│   └── main.js
├── backend/
│   ├── python-fastapi/
│   │   ├── main.py
│   │   └── requirements.txt
│   └── java-springboot/
│       └── ContactController.java
├── .vscode/
│   └── extensions.json
├── netlify.toml
└── vercel.json
```

## File and Folder Responsibilities

### `index.html`

The main application document. It contains every visible portfolio section:

- Navigation and mobile menu
- Hero introduction
- AI-style animated visual
- Java, Python, and SQL code tabs
- About and education information
- Skill filters and skill cards
- Project listings
- Certifications
- Contact form
- Scroll-to-top control and notification toast

External resources are loaded in this file:

- Google Fonts for typography
- Font Awesome for icons
- `css/style.css` for presentation
- `js/main.js` for behavior

### `css/style.css`

Defines the complete visual system and includes:

- Light and dark theme variables
- Global layout and typography
- Navigation and responsive menu styles
- Hero, code-window, and AI-assistant graphics
- Education timeline
- Skill cards and animated progress bars
- Project and certification cards
- Contact form
- Reveal and hover animations
- Scroll progress and ambient background styles
- Tablet and mobile breakpoints

Theme colors are selected through the `data-theme` attribute on the root `<html>` element. JavaScript stores the user's chosen theme in `localStorage` under `mkm-theme`.

### `js/main.js`

Controls browser-side behavior and UI state:

- Current footer year
- Dark/light theme switching
- Mobile navigation
- Hero role typing effect
- Code-language tabs
- Pointer-driven AI-stage motion
- Skill category filtering
- Scroll reveal animations
- Skill-bar animation
- Scroll progress
- Active navigation highlighting
- Scroll-to-top button
- Email-copy toast
- Contact form submission and mail fallback
- Canvas particle constellation background

The contact form currently uses `mailto:` by default. It can send JSON data to an API by assigning a URL to `API_ENDPOINT` in `js/main.js`.

### `backend/python-fastapi/main.py`

An optional Python API server that:

- Accepts `POST` requests at `/api/contact`
- Validates names, subjects, messages, and email addresses
- Saves submissions to `messages.json`
- Supports CORS for browser access
- Can serve the static portfolio frontend directly

The API model accepts:

```json
{
  "name": "Your name",
  "email": "you@example.com",
  "subject": "Project inquiry",
  "message": "Hello"
}
```

### `backend/python-fastapi/requirements.txt`

Python dependencies required by the FastAPI implementation:

- `fastapi`
- `uvicorn`
- `pydantic[email]`

### `backend/java-springboot/ContactController.java`

An optional Spring Boot REST controller that provides:

- Base route: `/api`
- Contact route: `/api/contact`
- Cross-origin access
- JSON request binding through a Java record
- A simple success response

It can be copied into a Spring Boot web project or used as the contact endpoint implementation reference.

### `.vscode/extensions.json`

Contains recommended extensions for editing and previewing the workspace.

### `netlify.toml`

Configures Netlify to publish the repository root as the website directory.

### `vercel.json`

Provides Vercel deployment configuration with clean URLs enabled.

### Root `README.md`

Provides a short project summary and quick start instructions. Detailed documentation is stored in this `readme/` folder.

## Running the Static Website

From the project root, start a local server:

```bash
python3 -m http.server 4173
```

Open:

```text
http://localhost:4173
```

The JavaScript and assets are loaded using relative paths, so serving through HTTP is preferred over opening `index.html` directly.

## Running the FastAPI Backend

Install dependencies:

```bash
python3 -m pip install -r backend/python-fastapi/requirements.txt
```

Start the API and static frontend:

```bash
uvicorn backend.python-fastapi.main:app --reload
```

Open:

```text
http://127.0.0.1:8000
```

The API endpoint is:

```text
POST http://127.0.0.1:8000/api/contact
```

To send form submissions to FastAPI, set this value in `js/main.js`:

```javascript
const API_ENDPOINT = "http://127.0.0.1:8000/api/contact";
```

Leave `API_ENDPOINT` empty to use the email-client fallback.

## Running the Spring Boot Option

Place `ContactController.java` into a Spring Boot project under:

```text
src/main/java/com/mangesh/portfolio/controller/
```

The project should include the Spring Web dependency, then run it on port `8080`. Set this value in `js/main.js`:

```javascript
const API_ENDPOINT = "http://localhost:8080/api/contact";
```

## Contact Form Behavior

The form in `index.html` requires:

- Name
- Email
- Subject
- Message

When no API endpoint is configured, JavaScript opens the visitor's mail application with a prefilled email addressed to `mangeshmahala2004@gmail.com`.

When an API endpoint is configured, JavaScript sends the form values as JSON. If the API is unreachable, the form falls back to opening the visitor's email application.

## Deployment

### Netlify

The included `netlify.toml` publishes the project root. Drag the folder into Netlify Drop or connect a Git repository and deploy.

### Vercel

The included `vercel.json` is suitable for static deployment. Import the Git repository in Vercel and deploy.

### GitHub Pages

Push the repository to GitHub, open **Settings > Pages**, and deploy from the repository's main branch and root directory.

## Customization Map

| Change | File |
| --- | --- |
| Personal content and section markup | `index.html` |
| Profile links, email, or project links | `index.html` |
| Colors, spacing, layout, themes | `css/style.css` |
| Typing text and UI interactions | `js/main.js` |
| Contact submission API URL | `js/main.js` |
| FastAPI validation or storage | `backend/python-fastapi/main.py` |
| Spring Boot contact behavior | `backend/java-springboot/ContactController.java` |
| Quick project setup information | `README.md` |

## Maintenance Notes

- Keep asset and stylesheet paths relative to `index.html`.
- The frontend is framework-free, so no package installation is required for normal static use.
- The FastAPI backend stores contact submissions locally in `messages.json`; this file is created when the first valid message is submitted.
- The Spring Boot controller does not persist submissions; it receives and logs them.
- Test both themes and the mobile menu after changing navigation or layout markup.
- Verify contact behavior with JavaScript enabled in a modern browser.
