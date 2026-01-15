# Year Dots Wallpaper (macOS)

A minimal macOS wallpaper that visualizes the current year as dots — one dot per day.

No apps.  
No accounts.  
Just time, quietly passing.

---

## Preview

### Dark Version
![Dark wallpaper](screenshots/dark.png)

### Light Version
![Light wallpaper](screenshots/light.png)

---

## What This Is

- Each dot represents **one day of the year**
- Past days are filled
- Today is highlighted
- Future days are outlined
- Shows:
  - Days left in the year
  - Percentage completed
- Updates automatically when refreshed

Designed to be calm, minimal, and always visible.

---

## How It Works

The wallpaper is generated dynamically using a serverless function.

A macOS Shortcut:
1. Fetches the image from a URL
2. Sets it as your desktop wallpaper

That’s it.

---

## Available Versions

### 🌙 Dark 

https://mac-year-calendar.vercel.app/api/year

### ☀️ Light

https://mac-year-calendar.vercel.app/api/year_light

---

## macOS Setup (2 Minutes)

1. Open **Shortcuts.app**
1. Open the **Automation** tab
2. Click **Create Personal Automation**
3. Select **Time of Day**
4. Set:
   - Time: `12:00 AM`
   - Repeat: **Daily**
   - Run Immediately
5. Create a new shortcut
6. Add:
   - **Get Contents of URL**
   - **Set Wallpaper**
7. Enter the URL of the wallpaper you want.
8. Run the shortcut once.   

The wallpaper will now update daily without any manual action.

---

## Why This Exists

Time is abstract.  
This makes it visible — without being loud.

Inspired by life-calendar ideas, but intentionally limited to:
- One year
- One glance
- No interaction

---

## Tech

- Node.js
- Canvas
- Vercel Serverless Functions
- macOS Shortcuts

---

## License

MIT — do whatever you want with it.