# Installation Guide

## Quick Start

### Step 1: Download the Extension

Clone or download this repository:
```bash
git clone https://github.com/Kayrah87/merg-event-scraper-chrome.git
```

Or download as ZIP and extract it to a folder on your computer.

### Step 2: Enable Developer Mode in Chrome

1. Open Google Chrome (or Chromium/Edge)
2. Navigate to the extensions page:
   - **Chrome:** Type `chrome://extensions/` in the address bar
   - **Edge:** Type `edge://extensions/` in the address bar
   - Or use the menu: More Tools → Extensions
3. Toggle the **Developer mode** switch in the top-right corner

### Step 3: Load the Extension

1. Click the **"Load unpacked"** button
2. Navigate to the folder where you downloaded/cloned the extension
3. Select the `merg-event-scraper-chrome` folder
4. Click **Select Folder** (or Open)

The extension should now appear in your extensions list with the name "MERG Event Scraper".

### Step 4: Pin the Extension (Optional but Recommended)

1. Click the **Extensions icon** (puzzle piece) in the Chrome toolbar
2. Find "MERG Event Scraper" in the list
3. Click the **pin icon** next to it
4. The extension icon should now appear in your toolbar

## Using the Extension

### Step 1: Log in to MERG

1. Open your browser and go to https://merg.org.uk
2. Log in with your MERG membership credentials

### Step 2: Navigate to Upcoming Events

Go to the "My Upcoming Events" page:
- Direct link: https://merg.org.uk/membership/summary.php
- Or navigate through the member dashboard

### Step 3: Scrape Events

1. Click the **MERG Event Scraper icon** in your toolbar
2. Click the **"Scrape Events"** button in the popup
3. Wait for the extension to scan the page

### Step 4: Download ICS Files

Once events are found:
- Click **"Download ICS"** for individual events
- Or click **"Download All Events"** to download all at once
- Files will be saved to your Downloads folder

### Step 5: Import to Calendar

1. Open your calendar application (Google Calendar, Outlook, etc.)
2. Look for an "Import" or "Add calendar" option
3. Select the downloaded ICS file(s)
4. The event will be added to your calendar with all Zoom details

## Troubleshooting

### Extension doesn't show up after loading

- Make sure you selected the correct folder (should contain `manifest.json`)
- Check for any error messages in the extensions page
- Try reloading the extension

### "Scrape Events" button does nothing

- Verify you're on the correct page: `https://merg.org.uk/membership/summary.php`
- Make sure you're logged into MERG
- Try refreshing the page and clicking again
- Open Developer Tools (F12) and check the Console for errors

### No events found

- Ensure there are upcoming events visible on the page
- Check that the events have Zoom details
- The extension only scrapes events with Zoom information

### Download doesn't work

- Check that the extension has "downloads" permission
- Verify your browser's download settings
- Check if downloads are being blocked by the browser

## Updating the Extension

When a new version is released:

1. Download/pull the latest code
2. Go to `chrome://extensions/`
3. Click the **Reload button** (circular arrow) on the MERG Event Scraper card

## Uninstalling

1. Go to `chrome://extensions/`
2. Find "MERG Event Scraper"
3. Click **Remove**
4. Confirm the removal

## Security Note

This extension:
- Only runs on the MERG website
- Does not send any data to external servers
- All processing happens locally in your browser
- Is open source - you can inspect the code yourself

## Getting Help

If you encounter issues:
1. Check the README.md file
2. Open an issue on GitHub
3. Contact MERG technical support
