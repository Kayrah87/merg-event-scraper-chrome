# Project Summary

## MERG Event Scraper Chrome Extension

A complete Chrome/Chromium/Edge extension for scraping Zoom meeting details from the MERG "My Upcoming Events" page and converting them to ICS calendar files.

### Project Structure

```
merg-event-scraper-chrome/
├── manifest.json           # Chrome extension configuration
├── content.js             # Content script that scrapes MERG pages
├── popup.html             # Extension popup UI
├── popup.js               # Popup logic and event handling
├── ics-generator.js       # ICS file generation utilities
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── README.md              # Main documentation
├── INSTALLATION.md        # Installation instructions
├── TESTING.md            # Testing guide
├── test-page.html        # Sample HTML for testing
└── .gitignore            # Git ignore rules
```

### Key Features

✅ **Scrapes Event Data**: Extracts all Zoom meeting details from MERG upcoming events page
✅ **ICS Generation**: Creates valid RFC 5545 compliant ICS calendar files
✅ **Individual/Bulk Download**: Download single events or all events at once
✅ **Browser Compatible**: Works with Chrome, Edge, Chromium, Brave, Opera
✅ **Privacy Focused**: All processing happens client-side, no external servers
✅ **Security Audited**: Passed CodeQL security analysis with no vulnerabilities

### Event Data Captured

- Date and time
- Event title
- Group/organization
- Venue information
- Zoom meeting link
- Zoom meeting ID
- Zoom password

### Technical Implementation

**Content Script** (`content.js`)
- Runs only on merg.org.uk/membership/summary.php
- Uses regex patterns to parse event details
- Handles multiple date/time formats
- Extracts Zoom credentials

**ICS Generator** (`ics-generator.js`)
- Follows RFC 5545 ICS format specification
- Proper line folding (75 char limit)
- Escapes special characters
- Generates unique UIDs using deterministic hash
- Default 2-hour duration for events

**Popup Interface** (`popup.html`, `popup.js`)
- Clean, user-friendly design
- Real-time status updates
- Event preview before download
- Download progress feedback
- Error handling and validation

**Security Features**
- Content Security Policy compliant
- No use of eval() or inline scripts
- Secure UID generation (no Math.random())
- Domain-restricted operation
- No external data transmission

### Testing

✅ Unit tests for event parsing (all cases pass)
✅ Unit tests for ICS generation (valid output)
✅ CodeQL security analysis (no vulnerabilities)
✅ Syntax validation (all JavaScript files valid)
✅ Manual testing workflow documented

### Installation

1. Clone or download repository
2. Open Chrome → `chrome://extensions/`
3. Enable Developer Mode
4. Click "Load unpacked"
5. Select extension directory

### Usage

1. Log in to MERG website
2. Navigate to "My Upcoming Events"
3. Click extension icon
4. Click "Scrape Events"
5. Download ICS files
6. Import to calendar app

### Browser Support

- Google Chrome 88+
- Microsoft Edge 88+
- Chromium-based browsers
- Brave Browser
- Opera (Chromium engine)

### Documentation

- `README.md`: Overview, features, usage
- `INSTALLATION.md`: Detailed installation steps
- `TESTING.md`: Testing procedures and validation
- `test-page.html`: Sample event data for reference

### Code Quality

- No linting errors
- No security vulnerabilities
- Clear, commented code
- Modular design
- Follows Chrome extension best practices

### Deployment Status

✅ Ready for production use
✅ All tests passing
✅ Security audit complete
✅ Documentation complete
✅ User-friendly interface

### Future Enhancements (Optional)

Potential improvements that could be added later:
- Support for recurring events
- Calendar timezone support
- Event reminders configuration
- Custom event duration settings
- Export all events as single ICS file
- Support for other MERG page formats

### Support

For issues or questions:
1. Check documentation files
2. Review testing guide
3. Open GitHub issue
4. Contact MERG technical support

---

**Status**: ✅ Complete and ready for use
**Version**: 1.0.0
**Last Updated**: October 2025
