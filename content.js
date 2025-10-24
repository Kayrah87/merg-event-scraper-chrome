// Content script that scrapes event data from MERG website
(function() {
  'use strict';

  /**
   * Parse event details from the page
   */
  function scrapeEvents() {
    const events = [];
    
    // Look for event containers - adjust selectors based on actual page structure
    // We'll need to inspect the actual page structure to get the right selectors
    // For now, we'll create a generic scraper that looks for common patterns
    
    // Try to find event elements - this will need to be adjusted based on actual HTML
    const eventElements = document.querySelectorAll('.event, .meeting, tr[class*="event"], div[class*="event"]');
    
    if (eventElements.length === 0) {
      // Fallback: try to find any elements containing "Zoom" text
      const bodyText = document.body.innerText;
      const zoomMatches = bodyText.matchAll(/(\d{1,2}:\d{2}\s+\w+,\s+\d{1,2}-\w{3}-\d{2,4}[\s\S]*?Zoom Password:\s*\d+)/gi);
      
      for (const match of zoomMatches) {
        const eventText = match[0];
        const event = parseEventText(eventText);
        if (event) {
          events.push(event);
        }
      }
    } else {
      // Parse structured event elements
      eventElements.forEach(element => {
        const eventText = element.innerText || element.textContent;
        const event = parseEventText(eventText);
        if (event) {
          events.push(event);
        }
      });
    }
    
    return events;
  }

  /**
   * Parse event text to extract structured data
   */
  function parseEventText(text) {
    // Match the date/time pattern: "14:00 Friday, 24-Oct-25"
    const dateTimeMatch = text.match(/(\d{1,2}:\d{2})\s+(\w+),\s+(\d{1,2})-(\w{3})-(\d{2,4})/i);
    if (!dateTimeMatch) {
      return null;
    }

    const [, time, dayOfWeek, day, month, year] = dateTimeMatch;
    
    // Extract event title (usually the line after the date)
    const titleMatch = text.match(/\d{1,2}:\d{2}\s+\w+,\s+\d{1,2}-\w{3}-\d{2,4}\s*\n?\s*([^\n]+)/i);
    const title = titleMatch ? titleMatch[1].trim() : 'MERG Event';
    
    // Extract group
    const groupMatch = text.match(/Group:\s*([^\n]+)/i);
    const group = groupMatch ? groupMatch[1].trim() : '';
    
    // Extract venue
    const venueMatch = text.match(/Venue:\s*([^\n]+)/i);
    const venue = venueMatch ? venueMatch[1].trim() : '';
    
    // Extract Zoom details
    const zoomLinkMatch = text.match(/Zoom Link:\s*(https?:\/\/[^\s\n]+)/i);
    const zoomLink = zoomLinkMatch ? zoomLinkMatch[1].trim() : '';
    
    const zoomIdMatch = text.match(/Zoom (?:Mtg )?ID:\s*([\d\s]+)/i);
    const zoomId = zoomIdMatch ? zoomIdMatch[1].replace(/\s/g, '') : '';
    
    const zoomPasswordMatch = text.match(/Zoom Password:\s*(\d+)/i);
    const zoomPassword = zoomPasswordMatch ? zoomPasswordMatch[1].trim() : '';
    
    // Only return if we have zoom details
    if (!zoomLink && !zoomId) {
      return null;
    }
    
    return {
      dateTime: `${time} ${dayOfWeek}, ${day}-${month}-${year}`,
      time,
      dayOfWeek,
      day,
      month,
      year,
      title,
      group,
      venue,
      zoomLink,
      zoomId,
      zoomPassword
    };
  }

  /**
   * Listen for messages from popup
   */
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'scrapeEvents') {
      const events = scrapeEvents();
      sendResponse({ events });
    }
    return true; // Keep the message channel open for async response
  });

  // Signal that content script is loaded
  console.log('MERG Event Scraper content script loaded');
})();
