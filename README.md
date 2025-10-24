# MERG Event Scraper Chrome Extension

A Chrome/Chromium/Edge extension that scrapes Zoom meeting details from the MERG "My Upcoming Events" page and converts them to ICS (iCalendar) files for easy import into your calendar application.

## Features

- 🎫 Scrapes all upcoming events with Zoom details from the MERG website
- 📅 Converts events to standard ICS format
- 💾 Download individual events or all events at once
- 🔒 Runs entirely in your browser - no data sent to external servers
- ⚡ Simple and easy to use

## Installation

### From Source (Developer Mode)

1. **Download or Clone this repository**
   ```bash
   git clone https://github.com/Kayrah87/merg-event-scraper-chrome.git
   cd merg-event-scraper-chrome
   ```

2. **Open Chrome/Chromium/Edge**
   - Navigate to `chrome://extensions/` (or `edge://extensions/` for Edge)
   - Enable "Developer mode" using the toggle in the top-right corner

3. **Load the Extension**
   - Click "Load unpacked"
   - Select the `merg-event-scraper-chrome` directory
   - The extension should now appear in your extensions list

## Usage

1. **Navigate to MERG Events Page**
   - Log in to your MERG account at https://merg.org.uk
   - Go to the "My Upcoming Events" page: https://merg.org.uk/membership/summary.php

2. **Open the Extension**
   - Click the MERG Event Scraper icon in your browser toolbar
   - If you don't see it, click the extensions icon (puzzle piece) and pin the MERG Event Scraper

3. **Scrape Events**
   - Click the "Scrape Events" button in the popup
   - The extension will scan the page for events with Zoom details

4. **Download ICS Files**
   - You'll see a list of all found events
   - Click "Download ICS" for individual events, or
   - Click "Download All Events" to download all events at once
   - The ICS files will be saved to your default downloads folder

5. **Import to Calendar**
   - Open the downloaded ICS files with your calendar application
   - Supported by: Google Calendar, Outlook, Apple Calendar, Thunderbird, etc.

## Event Data Format

The extension captures the following details from each event:

- **Date and Time**: Event start time
- **Title**: Event name
- **Group**: MERG group hosting the event
- **Venue**: Event location (typically "Online Zoom Meeting")
- **Zoom Details**:
  - Zoom Meeting Link
  - Zoom Meeting ID
  - Zoom Password

All Zoom details are included in the ICS file description for easy access.

## Browser Compatibility

- ✅ Google Chrome (version 88+)
- ✅ Microsoft Edge (version 88+)
- ✅ Chromium-based browsers
- ✅ Brave Browser
- ✅ Opera (with Chromium engine)

## Privacy & Security

- All processing happens locally in your browser
- No data is sent to external servers
- The extension only accesses the MERG website when you're logged in
- Source code is open and available for inspection

## Troubleshooting

### No events found?
- Make sure you're on the correct page: `https://merg.org.uk/membership/summary.php`
- Ensure you're logged into your MERG account
- Check that there are events with Zoom details visible on the page

### Extension not working?
- Try refreshing the MERG events page
- Reload the extension in `chrome://extensions/`
- Check the browser console for error messages (F12 → Console tab)

### ICS files not importing?
- Ensure your calendar application supports ICS format
- Try opening the ICS file with a text editor to verify the content
- Some calendar apps require you to manually import ICS files

## Development

The extension consists of:

- `manifest.json` - Extension configuration
- `content.js` - Content script that scrapes the MERG page
- `popup.html` / `popup.js` - User interface
- `ics-generator.js` - ICS file generation logic
- `icons/` - Extension icons

## License

MIT License - Feel free to use and modify as needed.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions:
1. Check the Troubleshooting section above
2. Open an issue on GitHub
3. Contact the MERG technical support team
