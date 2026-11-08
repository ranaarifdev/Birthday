# Valija Rameen's Birthday Surprise

A seven-page birthday experience made with friendship, respect, and best wishes for Valija Rameen. The project is static HTML, CSS, and vanilla JavaScript: no build step, backend, account, external assets, or paid services are required.

## Project structure

```text
Birthday/
├── index.html             # Welcome, birthday celebration, and countdown
├── letter.html            # Interactive birthday letter
├── friendship.html        # Friendship messages and personal-memory placeholders
├── smiles.html            # Twenty interactive birthday reminders
├── surprise.html          # Animated gift and hidden message
├── wishes.html            # Birthday wishes and flower garden
├── finale.html            # Final birthday celebration
├── Birthday.html          # Legacy entry point redirecting to index.html
├── README.md              # Project and publishing documentation
├── css/
│   ├── style.css          # Shared visual system and components
│   ├── animations.css     # Effects and reduced-motion rules
│   └── responsive.css     # Tablet and mobile layouts
└── js/
    ├── main.js            # Countdown gate, navigation, theme, music, and page behavior
    ├── animations.js      # Confetti, fireworks, petals, and heart effects
    └── interactions.js    # Wishes, letter, gift, and card interactions
```

There are no required image or music files. The illustrations use native emoji and CSS. The optional music control synthesizes a gentle repeating melody in the browser and starts only after the visitor taps the button.

## Features

- Seven connected birthday pages with shared navigation and a consistent pastel design.
- Full-screen countdown gate on every birthday page. It uses the device's system clock and local time zone and releases the content at **12:00 AM on November 9**.
- Periodic time checks and rechecks when a page becomes visible or focused, so a page left open can unlock at midnight.
- Interactive letter envelope, gift box, twenty revealable cards, random birthday wishes, and replay navigation.
- Birthday countdown, optional click-to-play music, theme toggle, mobile navigation, and back-to-top button.
- Responsive layouts for phones, tablets, and desktop; keyboard-operable controls and reduced-motion support.
- Relative page and asset paths for GitHub Pages project-site hosting.

### Countdown behavior and limitations

The target is created with the browser's local `Date` constructor, so the countdown follows the device's configured clock and time zone; it does not force Pakistan Standard Time. The pages stay locked until the current year's local November 9 midnight. This client-side gate is a surprise screen for static hosting, not tamper-proof access control. A visitor can alter their device clock or JavaScript.

## Technologies

- HTML5 for semantic page content.
- CSS3 for layout, gradients, responsive styling, and lightweight animations.
- Vanilla JavaScript and browser APIs for the countdown, interactions, and optional synthesized audio.
- GitHub Pages for static hosting.

## Preview

Open `index.html` in a browser. All site navigation and local assets use relative paths, so the project also works from a GitHub Pages repository subpath. No development server or build command is needed.

## Deploy to GitHub Pages

The target repository is [ranaarifdev/Birthday](https://github.com/ranaarifdev/Birthday), with the published site at <https://ranaarifdev.github.io/Birthday/>.

1. Add the project files to the repository root. Keep `index.html`, all other HTML pages, `css/`, and `js/` at that level.
2. Push the changes to the repository's `main` branch. Preserve any unrelated repository files.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select branch **main** and folder **/(root)**, then save.
5. Wait for the Pages deployment to complete. Confirm the deployment in the repository's **Actions** tab, then visit <https://ranaarifdev.github.io/Birthday/>.

No Node.js, npm, package installation, or build workflow is required. The `index.html` file at the repository root is the entry point.

## Personalize

The friendship page contains placeholders for optional photos and memories. Add only images or details you want to share; no personal shared events or photos have been invented in the site.
