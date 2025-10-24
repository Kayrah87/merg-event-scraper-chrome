// ICS file generation utilities

/**
 * Parse date/time string to Date object
 */
function parseEventDateTime(event) {
  // Parse the date format: "14:00 Friday, 24-Oct-25"
  const monthMap = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };
  
  const month = monthMap[event.month];
  let year = parseInt(event.year);
  
  // Handle 2-digit years
  if (year < 100) {
    year += 2000;
  }
  
  const day = parseInt(event.day);
  
  // Parse time
  const [hours, minutes] = event.time.split(':').map(Number);
  
  const startDate = new Date(year, month, day, hours, minutes, 0);
  
  // Default duration: 2 hours
  const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000));
  
  return { startDate, endDate };
}

/**
 * Format date for ICS file (YYYYMMDDTHHMMSS)
 */
function formatICSDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

/**
 * Escape special characters for ICS format
 */
function escapeICSText(text) {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Fold long lines according to ICS spec (max 75 chars per line)
 */
function foldLine(line) {
  const maxLength = 75;
  if (line.length <= maxLength) {
    return line;
  }
  
  const lines = [];
  let currentLine = line.substring(0, maxLength);
  let remaining = line.substring(maxLength);
  
  lines.push(currentLine);
  
  while (remaining.length > 0) {
    const chunk = remaining.substring(0, maxLength - 1);
    lines.push(' ' + chunk);
    remaining = remaining.substring(maxLength - 1);
  }
  
  return lines.join('\r\n');
}

/**
 * Generate ICS content for a single event
 */
function generateICS(event) {
  const { startDate, endDate } = parseEventDateTime(event);
  
  // Build description with all event details
  const descriptionParts = [];
  
  if (event.group) {
    descriptionParts.push(`Group: ${event.group}`);
  }
  
  if (event.venue) {
    descriptionParts.push(`Venue: ${event.venue}`);
  }
  
  descriptionParts.push('\\n--- ZOOM DETAILS ---\\n');
  
  if (event.zoomLink) {
    descriptionParts.push(`Zoom Link: ${event.zoomLink}`);
  }
  
  if (event.zoomId) {
    descriptionParts.push(`Zoom Meeting ID: ${event.zoomId}`);
  }
  
  if (event.zoomPassword) {
    descriptionParts.push(`Zoom Password: ${event.zoomPassword}`);
  }
  
  const description = escapeICSText(descriptionParts.join('\\n'));
  const summary = escapeICSText(event.title);
  const location = escapeICSText(event.venue || 'Online Zoom Meeting');
  
  // Generate unique ID using event data and timestamp
  // This creates a deterministic but unique ID based on event details
  const hashBase = `${formatICSDate(startDate)}-${event.title}-${event.zoomId || ''}-${Date.now()}`;
  const simpleHash = hashBase.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);
  const uid = `${formatICSDate(startDate)}-${Math.abs(simpleHash).toString(36)}@merg.org.uk`;
  
  // Build ICS content
  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MERG Event Scraper//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    foldLine(`UID:${uid}`),
    foldLine(`DTSTAMP:${formatICSDate(new Date())}`),
    foldLine(`DTSTART:${formatICSDate(startDate)}`),
    foldLine(`DTEND:${formatICSDate(endDate)}`),
    foldLine(`SUMMARY:${summary}`),
    foldLine(`DESCRIPTION:${description}`),
    foldLine(`LOCATION:${location}`),
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR'
  ];
  
  return icsLines.join('\r\n');
}

/**
 * Generate filename for ICS file
 */
function generateICSFilename(event) {
  // Sanitize title for filename
  const safeName = event.title
    .replace(/[^a-z0-9]/gi, '_')
    .replace(/_+/g, '_')
    .substring(0, 50);
  
  const { startDate } = parseEventDateTime(event);
  const dateStr = formatICSDate(startDate).substring(0, 8); // YYYYMMDD
  
  return `merg_event_${dateStr}_${safeName}.ics`;
}
