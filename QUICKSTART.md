# Quick Start Guide

## Installation (5 Minutes)

### Step 1: Get the Code
```bash
git clone https://github.com/Kayrah87/merg-event-scraper-chrome.git
```

### Step 2: Load in Chrome
1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked"
5. Select the `merg-event-scraper-chrome` folder

✅ Extension installed!

## Usage (3 Steps)

### Step 1: Navigate to MERG
Go to: https://merg.org.uk/membership/summary.php
(You must be logged in)

### Step 2: Click Extension Icon
Look for the "ME" icon in your toolbar
(Click the puzzle icon to pin it if needed)

### Step 3: Scrape & Download
1. Click "Scrape Events"
2. Click "Download ICS" for each event
   OR
   Click "Download All Events"

✅ ICS files downloaded!

### Step 4: Import to Calendar
1. Open your calendar app
2. Import the ICS files
3. Events appear with all Zoom details

## What Gets Scraped

From this format:
```
14:00 Friday, 24-Oct-25
Wales North AG Zoom Meeting

Group: Wales North
Venue: Online Zoom Meeting

ZOOM DETAILS
Zoom Link: https://us02web.zoom.us/j/84421428383?pwd=...
Zoom Mtg ID: 844 2142 8383
Zoom Password: 498167
```

You get an ICS file with:
- 📅 Event date and time
- 📝 Event title
- 👥 Group name
- 📍 Venue
- 🔗 Zoom link
- 🔢 Meeting ID
- 🔐 Password

## Troubleshooting

### "No events found"
- Check you're on: https://merg.org.uk/membership/summary.php
- Make sure you're logged in
- Verify events have Zoom details

### "Wrong page" warning
- You must be on the MERG upcoming events page
- The extension only works on merg.org.uk

### Extension not visible
- Go to chrome://extensions/
- Make sure it's enabled
- Click the puzzle icon → Pin the extension

## File Locations

After download, find ICS files in:
- **Windows**: `C:\Users\YourName\Downloads\`
- **Mac**: `/Users/YourName/Downloads/`
- **Linux**: `/home/yourname/Downloads/`

Files are named: `merg_event_YYYYMMDD_EventName.ics`

## Supported Calendars

Import ICS files into:
- ✅ Google Calendar
- ✅ Microsoft Outlook
- ✅ Apple Calendar
- ✅ Thunderbird
- ✅ Most other calendar apps

## Tips

💡 **Pin the extension** for quick access
💡 **Use "Download All"** to save time
💡 **Check Downloads folder** if files don't appear
💡 **ICS files can be emailed** to share events
💡 **Re-scrape** if new events are added to the page

## Need Help?

📖 Check [README.md](README.md) for full documentation
📖 Check [INSTALLATION.md](INSTALLATION.md) for detailed install steps
📖 Check [TESTING.md](TESTING.md) for troubleshooting
📖 Check [ARCHITECTURE.md](ARCHITECTURE.md) for technical details

## Security & Privacy

✅ Runs entirely in your browser
✅ No data sent to external servers
✅ Only accesses merg.org.uk when you're there
✅ Open source - inspect the code yourself

## Version

Current Version: **1.0.0**
Last Updated: **October 2025**

---

**That's it! You're ready to scrape MERG events!** 🎉
