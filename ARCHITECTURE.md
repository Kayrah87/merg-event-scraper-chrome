# Architecture Overview

## Component Diagram

```
┌─────────────────────────────────────────────────────────┐
│                   MERG Website                          │
│         https://merg.org.uk/membership/summary.php      │
│                                                          │
│  ┌────────────────────────────────────────────┐        │
│  │  Event 1: Wales North AG Zoom Meeting      │        │
│  │  14:00 Friday, 24-Oct-25                   │        │
│  │  Group: Wales North                        │        │
│  │  Zoom Link: https://zoom.us/...            │        │
│  │  Zoom ID: 844 2142 8383                    │        │
│  │  Password: 498167                          │        │
│  └────────────────────────────────────────────┘        │
│                                                          │
│  ┌────────────────────────────────────────────┐        │
│  │  Event 2: Scotland East Monthly Meeting    │        │
│  │  19:30 Tuesday, 28-Oct-25                  │        │
│  │  ...                                        │        │
│  └────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────┘
                          │
                          │ Scrapes
                          ▼
┌─────────────────────────────────────────────────────────┐
│            Chrome Extension (content.js)                 │
│                                                          │
│  • Matches URL pattern                                  │
│  • Parses HTML/text content                             │
│  • Extracts event details with regex                    │
│  • Sends data to popup                                  │
└─────────────────────────────────────────────────────────┘
                          │
                          │ Data
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Extension Popup (popup.js)                  │
│                                                          │
│  ┌─────────────────────────────────────┐               │
│  │  📋 MERG Event Scraper              │               │
│  │  ─────────────────────────────────  │               │
│  │  [ Scrape Events ]                  │               │
│  │  [ Download All Events ]            │               │
│  │                                      │               │
│  │  ✓ Found 2 events with Zoom details │               │
│  │                                      │               │
│  │  ┌───────────────────────────────┐  │               │
│  │  │ Wales North AG Zoom Meeting   │  │               │
│  │  │ 📅 14:00 Friday, 24-Oct-25    │  │               │
│  │  │ 👥 Wales North                │  │               │
│  │  │ [ Download ICS ]              │  │               │
│  │  └───────────────────────────────┘  │               │
│  │                                      │               │
│  │  ┌───────────────────────────────┐  │               │
│  │  │ Scotland East Monthly Meeting │  │               │
│  │  │ 📅 19:30 Tuesday, 28-Oct-25   │  │               │
│  │  │ 👥 Scotland East              │  │               │
│  │  │ [ Download ICS ]              │  │               │
│  │  └───────────────────────────────┘  │               │
│  └─────────────────────────────────────┘               │
└─────────────────────────────────────────────────────────┘
                          │
                          │ Generate ICS
                          ▼
┌─────────────────────────────────────────────────────────┐
│            ICS Generator (ics-generator.js)              │
│                                                          │
│  • Parse date/time formats                              │
│  • Build RFC 5545 compliant ICS                         │
│  • Escape special characters                            │
│  • Fold lines (75 char limit)                           │
│  • Generate unique UIDs                                 │
└─────────────────────────────────────────────────────────┘
                          │
                          │ Download
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  ICS File Output                         │
│                                                          │
│  BEGIN:VCALENDAR                                        │
│  VERSION:2.0                                            │
│  BEGIN:VEVENT                                           │
│  UID:20251024T140000-5v5oru7@merg.org.uk               │
│  DTSTART:20251024T140000                               │
│  DTEND:20251024T160000                                 │
│  SUMMARY:Wales North AG Zoom Meeting                   │
│  DESCRIPTION:Group: Wales North\nVenue: Online...      │
│             Zoom Link: https://...\n                   │
│             Zoom ID: 844 2142 8383\n                   │
│             Password: 498167                            │
│  LOCATION:Online Zoom Meeting                          │
│  END:VEVENT                                            │
│  END:VCALENDAR                                         │
│                                                          │
│  ⬇ Saved to: Downloads/merg_event_20251024_....ics     │
└─────────────────────────────────────────────────────────┘
                          │
                          │ Import
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Calendar Application                        │
│  (Google Calendar, Outlook, Apple Calendar, etc.)        │
│                                                          │
│  📅 Friday, October 24, 2025                           │
│  🕐 2:00 PM - 4:00 PM                                  │
│  📍 Online Zoom Meeting                                │
│  👥 Wales North                                        │
│  🔗 Join: https://zoom.us/...                          │
│  🔑 Meeting ID: 844 2142 8383                          │
│  🔐 Password: 498167                                   │
└─────────────────────────────────────────────────────────┘
```

## Data Flow

1. **User visits MERG page** → Content script loads automatically
2. **User clicks extension icon** → Popup opens
3. **User clicks "Scrape Events"** → Popup sends message to content script
4. **Content script parses page** → Extracts event data using regex
5. **Data returned to popup** → Events displayed in list
6. **User clicks download** → ICS generator creates file
7. **Browser downloads ICS** → File saved to Downloads folder
8. **User imports to calendar** → Event appears with all details

## Security Model

- ✅ Content script only runs on merg.org.uk
- ✅ No external network requests
- ✅ No data sent to third parties
- ✅ All processing client-side
- ✅ Secure UID generation (no random numbers)
- ✅ No eval() or inline scripts
- ✅ Proper CSP compliance

## File Responsibilities

| File | Purpose | Lines of Code |
|------|---------|---------------|
| manifest.json | Extension configuration & permissions | 34 |
| content.js | Page scraping & data extraction | 112 |
| popup.html | User interface layout | 149 |
| popup.js | UI logic & download handling | 139 |
| ics-generator.js | ICS file generation | 165 |
| icons/ | Extension branding | (4 PNG files) |

**Total:** ~600 lines of code (excluding tests and docs)

## Extension Permissions

```json
{
  "permissions": [
    "activeTab",     // Access current tab when clicked
    "downloads"      // Download ICS files
  ],
  "host_permissions": [
    "https://merg.org.uk/*"  // Only MERG website
  ]
}
```

## Browser Compatibility Matrix

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 88+ | ✅ Fully Supported |
| Edge | 88+ | ✅ Fully Supported |
| Brave | Latest | ✅ Fully Supported |
| Opera | Latest | ✅ Fully Supported |
| Chromium | Latest | ✅ Fully Supported |
| Firefox | N/A | ❌ Not supported (Manifest V3) |

## Testing Status

| Test Category | Status |
|--------------|--------|
| Event Parsing | ✅ All test cases pass |
| ICS Generation | ✅ Valid RFC 5545 output |
| Security Scan | ✅ No vulnerabilities |
| Syntax Check | ✅ All files valid |
| Manual Testing | ✅ Documented workflow |

## Future Considerations

Optional enhancements for future versions:

- 📆 Support for recurring events
- 🌍 Timezone handling
- ⏰ Custom event durations
- 📦 Bulk export as single file
- 🔔 Reminder settings
- 📱 Mobile browser support (when available)
