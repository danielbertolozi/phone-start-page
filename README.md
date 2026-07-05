# Phone Start Page

A minimalist mobile start page hosted on GitHub Pages. Built with React + Vite + Tailwind CSS.

## Features

- **Stock ticker** (top of page, auto-refreshes every 60 seconds):
  - SAP SE on XETRA in Euro
  - EUR/BRL (Euro to Brazilian Real)
- **Website shortcuts** with outline icons:
  - [Intervals.icu](https://intervals.icu) — training platform
  - [Google](https://www.google.com)
  - [DuckDuckGo](https://duckduckgo.com)
  - [Lemon Manuals](https://lemon-manuals.la)

## Setup

### 1. Get a free Finnhub API key

1. Go to [https://finnhub.io/register](https://finnhub.io/register)
2. Create a free account (no credit card required)
3. Copy your API key from the dashboard
4. Open `src/config.js` and replace `'YOUR_FINNHUB_API_KEY'` with your actual key

```js
// src/config.js
export const FINNHUB_API_KEY = 'your_actual_key_here'
```

> **Note:** The free tier allows 60 API calls/minute, which is more than enough for 2 symbols refreshing every 60 seconds.

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

The output is in the `dist/` folder — deploy the entire contents of `dist/` to GitHub Pages.

## Deploying to GitHub Pages

1. Build the project: `npm run build`
2. Push the `dist/` folder contents to the `gh-pages` branch of your repository, or configure GitHub Pages to serve from `docs/` by copying `dist/` there.

Alternatively, use the `gh-pages` npm package:

```bash
npm install -D gh-pages
# Add to package.json scripts: "deploy": "gh-pages -d dist"
npm run deploy
```

## Tech stack

- [Vite](https://vite.dev/) — build tool
- [React 19](https://react.dev/) — UI
- [Tailwind CSS v4](https://tailwindcss.com/) — styling
- [Finnhub API](https://finnhub.io/) — market data
