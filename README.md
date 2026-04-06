# MAGURO Sushi — Telegram Mini App

A Telegram Mini App for sushi delivery, built with React + Vite + TypeScript.

---

## Local setup

### 1. Install dependencies

Open the project folder in VS Code, then open the **Terminal** (`Ctrl+` ` ` or **View → Terminal**) and run:

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

The app runs at `http://localhost:3000`.

---

## Hosting locally for Telegram (HTTPS tunnel)

Telegram Mini Apps require an **HTTPS URL**. Use a tunnel to expose your local server.

### Option - Cloudflare Tunnel (recommended, free, no account needed)

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

Output is in `dist/`. Deploy to any static host (Vercel, Netlify, Cloudflare Pages, Railway, etc.).

---

## Hosting on Railway (постоянный HTTPS-адрес)

Railway даёт бесплатный постоянный HTTPS-домен вида `your-app.up.railway.app` — идеально для Telegram Mini App.

### Шаг 1 — Подготовь репозиторий

Убедись, что проект запушен на GitHub:

```bash
git add .
git commit -m "ready for railway"
git push
```

### Шаг 2 — Создай проект на Railway

1. Зайди на [railway.app](https://railway.app) и войди через GitHub.
2. Нажми **New Project → Deploy from GitHub repo**.
3. Выбери репозиторий `sushi-mini-app`.

### Шаг 3 — Настрой билд и запуск

Railway автоматически определит Node.js. Нужно явно указать команды.

В дашборде Railway открой **Settings → Build & Deploy**:

| Поле | Значение |
|------|----------|
| **Build Command** | `npm run build` |
| **Start Command** | `npx serve dist --single --listen 3000` |

> `--single` нужен для SPA — все маршруты отдают `index.html`.

Либо добавь файл `railway.json` в корень проекта:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npx serve dist --single --listen 3000",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

### Шаг 4 — Задай переменную порта

В Railway → **Variables** добавь:

```
PORT=3000
```

### Шаг 5 — Получи домен

1. Перейди в **Settings → Networking → Generate Domain**.
2. Railway выдаст URL вида `https://your-app.up.railway.app`.

### Шаг 6 — Подключи к BotFather

1. Открой [@BotFather](https://t.me/BotFather).
2. `/mybots` → твой бот → **Bot Settings → Menu Button → Configure menu button**.
3. Вставь `https://your-app.up.railway.app`.

Теперь URL постоянный — менять в BotFather ничего не нужно при каждом перезапуске.

---

### Важно: переменные окружения

Если в приложении есть `.env`-переменные (например `VITE_BOT_TOKEN`), добавь их в Railway → **Variables**. Railway подставит их при билде.

```
VITE_BOT_TOKEN=your_token_here
```
