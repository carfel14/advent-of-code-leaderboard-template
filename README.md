# 🎄 Advent of Code Leaderboard — Template 🎁
A configurable and retro-styled leaderboard page for **Advent of Code**, designed so anyone can fork it, plug in their own leaderboard, and customize the visuals.

This template lets you:

- Fetch a private Advent of Code leaderboard  
- Customize titles, footer text, and header image easily 

Perfect for friend groups, small dev teams, or communities that want a nice AoC leaderboard website.


## 🧩 Features

- 🎅 Retro Christmas UI  
- 🌟 Tracks silver/gold stars for each day  
- 🎄 Space for your group photo or custom header image  
- 🔧 Fully configurable `config.json`  

## 🚀 Quick Start

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/aoc-leaderboard-template.git
cd aoc-leaderboard-template
```
### 2️⃣ Create your config file

```bash
cp config.example.json config.json
```
Then edit `config.json`
```json
{
  "leaderboardUrl": "https://adventofcode.com/2025/leaderboard/private/view/000000.json",
  "branding": {
    "title": "My Advent of Code",
    "subtitle": "Friends Leaderboard",
    "headerImageUrl": "/assets/header.jpg",
    "footerText": "Happy Coding & Happy Holidays! 🎄"
  }
}
```
**Explanation of fields:**
- **leaderboardUrl**: ID of your private leaderboard
- **branding**: Titles, header image, footer text

### 3️⃣ Add your Advent of Code session cookie
Copy:
```bash
cp .env.example .env
```
Open `.env`:
```bash
AOC_SESSION_COOKIE=your_cookie_here
```
**How to get your session cookie**
1. Log into *[Advent of Code](https://adventofcode.com/)*
2. Open **DevTools → Storage → Cookies**
3. Find the cookie named `session`
4. Copy its value into `.env`

> **Warning**
>
> Anyone with this cookie can access your AoC account. **Never commit `.env`**

### 4️⃣ Install & run locally
```bash
pnpm install
pnpm run dev
```
Open:
```bash
http://localhost:3000
```

## Screenshots

## Contributing

Issues and pull requests are welcome! Feel free to add improvements.

## License

MIT © 2025 Carlos Ruiz. See LICENSE for full text.
