// Popup script for MERG Event Scraper

let scrapedEvents = [];

document.addEventListener('DOMContentLoaded', function() {
  const scrapeBtn = document.getElementById('scrapeBtn');
  const downloadAllBtn = document.getElementById('downloadAllBtn');
  const statusDiv = document.getElementById('status');
  const eventListDiv = document.getElementById('eventList');
  
  scrapeBtn.addEventListener('click', scrapeEvents);
  downloadAllBtn.addEventListener('click', downloadAllEvents);
  
  async function scrapeEvents() {
    setStatus('Scraping events...', 'info');
    scrapeBtn.disabled = true;
    eventListDiv.innerHTML = '';
    downloadAllBtn.style.display = 'none';
    
    try {
      // Get the active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Check if we're on the right page
      if (!tab.url || !tab.url.includes('merg.org.uk/membership/summary.php')) {
        setStatus('⚠️ Please navigate to the MERG "My Upcoming Events" page first!', 'warning');
        scrapeBtn.disabled = false;
        return;
      }
      
      // Send message to content script
      chrome.tabs.sendMessage(tab.id, { action: 'scrapeEvents' }, function(response) {
        if (chrome.runtime.lastError) {
          setStatus('Error: ' + chrome.runtime.lastError.message, 'error');
          scrapeBtn.disabled = false;
          return;
        }
        
        if (response && response.events) {
          scrapedEvents = response.events;
          
          if (scrapedEvents.length === 0) {
            setStatus('No events with Zoom details found on this page.', 'warning');
          } else {
            setStatus(`✓ Found ${scrapedEvents.length} event(s) with Zoom details!`, 'success');
            displayEvents(scrapedEvents);
            downloadAllBtn.style.display = 'block';
          }
        } else {
          setStatus('No events found.', 'warning');
        }
        
        scrapeBtn.disabled = false;
      });
    } catch (error) {
      setStatus('Error: ' + error.message, 'error');
      scrapeBtn.disabled = false;
    }
  }
  
  function displayEvents(events) {
    eventListDiv.innerHTML = '';
    
    events.forEach((event, index) => {
      const eventDiv = document.createElement('div');
      eventDiv.className = 'event-item';
      
      eventDiv.innerHTML = `
        <div class="event-title">${escapeHtml(event.title)}</div>
        <div class="event-details">
          📅 ${escapeHtml(event.dateTime)}<br>
          ${event.group ? '👥 ' + escapeHtml(event.group) + '<br>' : ''}
          ${event.venue ? '📍 ' + escapeHtml(event.venue) + '<br>' : ''}
          🔗 Zoom ID: ${escapeHtml(event.zoomId || 'N/A')}
        </div>
        <div class="event-actions">
          <button onclick="downloadEvent(${index})">Download ICS</button>
        </div>
      `;
      
      eventListDiv.appendChild(eventDiv);
    });
  }
  
  function setStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status-${type}`;
    statusDiv.style.display = 'block';
  }
  
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  // Make functions available globally for onclick handlers
  window.downloadEvent = function(index) {
    const event = scrapedEvents[index];
    if (!event) return;
    
    const icsContent = generateICS(event);
    const filename = generateICSFilename(event);
    
    downloadICS(icsContent, filename);
  };
  
  function downloadAllEvents() {
    if (scrapedEvents.length === 0) return;
    
    setStatus(`Downloading ${scrapedEvents.length} event(s)...`, 'info');
    
    scrapedEvents.forEach((event, index) => {
      setTimeout(() => {
        const icsContent = generateICS(event);
        const filename = generateICSFilename(event);
        downloadICS(icsContent, filename);
        
        if (index === scrapedEvents.length - 1) {
          setStatus(`✓ Downloaded ${scrapedEvents.length} event(s)!`, 'success');
        }
      }, index * 200); // Stagger downloads slightly
    });
  }
  
  function downloadICS(content, filename) {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    chrome.downloads.download({
      url: url,
      filename: filename,
      saveAs: false
    }, function(downloadId) {
      // Clean up the blob URL after a short delay
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
  }
});
