# MAGURO Sushi — Telegram Mini App

A Telegram Mini App for sushi delivery, built with React + Vite + TypeScript.

---

## Local setup

### 1. Install dependencies

Open the project folder in VS Code, then open the **Terminal** (`Ctrl+` ` ` or **View → Terminal**) and run:

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in your bot token:

```bash
cp .env.example .env
```

Edit `.env`:

```
VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here   # from @BotFather
```

> **Note:** The bot token is kept server-side for validating Telegram requests. Never commit `.env`.

### 3. Start the dev server

```bash
npm run dev
```

The app runs at `http://localhost:3000`.

---

## Hosting locally for Telegram (HTTPS tunnel)

Telegram Mini Apps require an **HTTPS URL**. Use a tunnel to expose your local server.

### Option A — Cloudflare Tunnel (recommended, free, no account needed)

1. Install once:
   ```bash
   brew install cloudflared
   ```
2. In VS Code Terminal, run the dev server:
   ```bash
   npm run dev
   ```
3. In a **second terminal tab**, start the tunnel:
   ```bash
   cloudflared tunnel --url http://localhost:3000
   ```
4. Copy the `https://….trycloudflare.com` URL from the output.

### Option B — ngrok

1. Install: `brew install ngrok` (or download from ngrok.com)
2. Run the dev server: `npm run dev`
3. In a second terminal: `ngrok http 3000`
4. Copy the `https://….ngrok-free.app` URL.

---

## Connecting to Telegram BotFather

1. Open [@BotFather](https://t.me/BotFather) on Telegram.
2. Send `/newbot` (or select your existing bot).
3. Send `/mybots` → select your bot → **Bot Settings** → **Menu Button** → **Configure menu button**.
4. Paste your tunnel HTTPS URL (e.g. `https://abc123.trycloudflare.com`).
5. Open your bot and tap the **Menu** button — the mini app loads.

> Re-run step 3 with the tunnel command whenever your Mac restarts (the tunnel URL changes each time unless you use a paid plan).

---

## Adding sushi photos

Drop `.jpg` or `.png` photos into `public/images/`, then add an `image` field to the item in `src/data/menu.ts`:

```ts
{ id: 8, category: 'Classic', name: 'Ролл Аляска', ..., image: 'alaska-roll.jpg' },
```

See `public/images/README.md` for full instructions.

---

## Build for production

```bash
npm run build
```

Output is in `dist/`. Deploy to any static host (Vercel, Netlify, Cloudflare Pages, etc.).
