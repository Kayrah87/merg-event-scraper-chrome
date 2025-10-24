# Testing Guide

This document describes how to test the MERG Event Scraper extension.

## Manual Testing

### 1. Load the Extension

1. Open Chrome/Chromium/Edge
2. Navigate to `chrome://extensions/`
3. Enable Developer mode
4. Click "Load unpacked"
5. Select the extension directory

### 2. Test on MERG Website

#### Prerequisites
- Valid MERG membership account
- Access to https://merg.org.uk

#### Steps
1. Log in to MERG at https://merg.org.uk
2. Navigate to "My Upcoming Events": https://merg.org.uk/membership/summary.php
3. Verify there are events with Zoom details visible on the page
4. Click the extension icon in the toolbar
5. Click "Scrape Events"
6. Verify:
   - Status message shows number of events found
   - Events are listed in the popup
   - Each event shows: title, date/time, group, venue, and Zoom ID

#### Test Download Functionality
1. Click "Download ICS" for a single event
2. Verify the ICS file is downloaded to your Downloads folder
3. Open the ICS file with a text editor and verify:
   - Proper ICS format
   - Event details are correct
   - Zoom details are in the description
4. Import the ICS file into a calendar application
5. Verify the event appears correctly in the calendar

#### Test Bulk Download
1. Click "Download All Events"
2. Verify all events are downloaded (check Downloads folder)
3. Verify each file has a unique, descriptive name

### 3. Test Edge Cases

#### No Events Scenario
1. Navigate to a MERG page without events
2. Click "Scrape Events"
3. Verify appropriate message is shown

#### Wrong Page Scenario
1. Navigate to any non-MERG page
2. Click the extension icon
3. Click "Scrape Events"
4. Verify warning message about being on wrong page

#### Events Without Zoom Details
1. If there are events on the page without Zoom details
2. Verify they are not included in the scraped results

## Automated Testing

### Unit Tests

The repository includes test scripts to validate core functionality:

#### Test Event Parsing
```bash
cd /tmp
node test_event_parsing.js
```

Expected output:
- All test cases should pass
- Each event should be parsed correctly
- All Zoom details should be extracted

#### Test ICS Generation
```bash
cd /tmp
node test_ics_generation.js
```

Expected output:
- ICS file should be generated successfully
- File should follow ICS format standards
- All event details should be included
- Zoom details should be in the description

### Validation Checklist

Before releasing a new version, verify:

- [ ] Extension loads without errors
- [ ] Manifest.json is valid
- [ ] All JavaScript files pass syntax check
- [ ] Icons are present and display correctly
- [ ] Content script loads on MERG pages only
- [ ] Event parsing works for various date formats
- [ ] ICS generation produces valid calendar files
- [ ] Download functionality works in Chrome/Edge
- [ ] Bulk download handles multiple events correctly
- [ ] Error messages are clear and helpful
- [ ] Extension doesn't crash on edge cases
- [ ] No console errors in normal operation

## Browser Compatibility Testing

Test the extension in:
- [ ] Google Chrome (latest version)
- [ ] Microsoft Edge (latest version)
- [ ] Chromium
- [ ] Brave Browser

## Performance Testing

1. Test with page containing 1 event
2. Test with page containing 10+ events
3. Verify scraping completes quickly (< 2 seconds)
4. Verify downloads don't block the UI

## Security Testing

1. Verify extension only runs on merg.org.uk
2. Check that no data is sent to external servers
3. Verify downloads use blob URLs (no external hosting)
4. Ensure no credentials are exposed in logs

## Test Data

Sample event format (as seen on MERG website):
```
14:00 Friday, 24-Oct-25
Wales North AG Zoom Meeting

Group: Wales North

Venue: Online Zoom Meeting

ZOOM DETAILS

Zoom Link: https://us02web.zoom.us/j/84421428383?pwd=kuYf7nY6mNYNEsX4J8fbPgcZFhITN5.1

Zoom Mtg ID: 844 2142 8383

Zoom Password: 498167
```

*Note: The date format is DD-MMM-YY. The example above uses 24-Oct-25 for demonstration purposes.*

## Debugging

### Enable Console Logging
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for messages from the content script
4. Check for any error messages

### Inspect Extension
1. Go to `chrome://extensions/`
2. Click "Details" on MERG Event Scraper
3. Click "Inspect views: popup" to debug popup
4. Use console to check for errors

### Check Network Activity
1. Open Developer Tools (F12)
2. Go to Network tab
3. Verify no unexpected requests are made
4. Ensure extension only accesses MERG domain

## Common Issues and Solutions

### Extension doesn't appear
- Verify manifest.json is valid
- Check for errors in chrome://extensions
- Reload the extension

### Scraping returns no events
- Check you're on the correct MERG page
- Verify you're logged in
- Check if events have Zoom details
- Look at console for error messages

### Downloads fail
- Check downloads permission in manifest
- Verify browser download settings
- Look for popup blocker interference

### ICS files don't import
- Validate ICS format using online validator
- Check calendar app compatibility
- Try opening file in text editor first

## Reporting Bugs

When reporting issues, include:
1. Browser name and version
2. Extension version
3. Steps to reproduce
4. Expected vs actual behavior
5. Console error messages (if any)
6. Screenshots (if applicable)
