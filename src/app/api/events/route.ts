import { NextResponse } from 'next/server';

function convertDriveUrl(url: string): string {
  if (!url) return url;
  
  if (url.includes('drive.google.com/uc?') || url.includes('lh3.googleusercontent.com')) {
    return url;
  }
  
  // Google Drive sharing URL format: https://drive.google.com/file/d/FILE_ID/view
  let fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch) {
    const fileId = fileIdMatch[1];
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1920`;
  }
  
  // Alternative format: https://drive.google.com/open?id=FILE_ID
  fileIdMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (fileIdMatch) {
    const fileId = fileIdMatch[1];
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1920`;
  }
  
  return url;
}

//  "month/day/year" format
function parseEventDate(dateString: string): Date | null {
  if (!dateString) return null;
  
  const parts = dateString.split('/');
  if (parts.length !== 3) return null;
  
  const month = parseInt(parts[0].trim(), 10) - 1; 
  const day = parseInt(parts[1].trim(), 10);
  const year = parseInt(parts[2].trim(), 10);
  
  if (isNaN(month) || isNaN(day) || isNaN(year)) return null;
  
  return new Date(year, month, day);
}

function formatPastEventDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = parseEventDate(dateString);
  if (!date) return dateString; 
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function formatUpcomingEventDate(dateString: string): { datePrimary: string; dateSecondary: string } {
  if (!dateString) return { datePrimary: '', dateSecondary: '' };
  
  const date = parseEventDate(dateString);
  if (!date) {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      return { datePrimary: parts[1].trim(), dateSecondary: parts[0].trim() };
    }
    return { datePrimary: '', dateSecondary: '' };
  }
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return {
    datePrimary: date.getDate().toString(),
    dateSecondary: monthNames[date.getMonth()]
  };
}

// Fetch data from public Google Sheet
async function fetchPublicSheetData(spreadsheetId: string, sheetName: string = 'Events'): Promise<string[][]> {
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
  
  const response = await fetch(url, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch sheet: ${response.statusText}`);
  }
  
  const csvText = await response.text();
  
  const rows: string[][] = [];
  const lines = csvText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0); 
  
  for (const line of lines) {
    if (!line) continue;
    
    const row: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote inside quoted field ("")
          current += '"';
          i++; // Skip next quote
        } else if (inQuotes && (nextChar === ',' || nextChar === undefined || nextChar === '\r' || nextChar === '\n')) {
          // End of quoted field
          inQuotes = false;
          // Don't add the quote to current, it's just a delimiter
        } else {
          // Start of quoted field
          inQuotes = !inQuotes;
          // Don't add the quote to current
        }
      } else if (char === ',' && !inQuotes) {
        // Field separator (comma outside quotes)
        row.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    row.push(current.trim());
    
      while (row.length < 10) {
        row.push('');
      }
    
    rows.push(row);
  }
  
  return rows;
}

export async function GET() {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_EVENTS_SPREADSHEET_ID;
    const range = process.env.GOOGLE_SHEETS_EVENTS_RANGE || 'Events!A:I';
    const sheetName = range.split('!')[0] || 'Events';
    
    if (!spreadsheetId) {
      return NextResponse.json(
        { error: 'Google Sheets Events Spreadsheet ID not configured', upcoming: [], past: [] },
        { status: 400 }
      );
    }
    
    const rows = await fetchPublicSheetData(spreadsheetId, sheetName);
    
    if (rows.length === 0) {
      return NextResponse.json({
        upcoming: [],
        past: [],
      });
    }
    

    const allRows = rows.slice(1)
      .filter(row => row && row.length > 0 && row.some(cell => cell && cell.trim().length > 0));
    
    const events = allRows.map((row: string[]) => {
      while (row.length < 10) {
        row.push('');
      }
      
      const cleanField = (field: string) => (field || '').trim().replace(/\r?\n+$/, '').trim();
      
      return {
        date: cleanField(row[0]),
        endDate: cleanField(row[1]) || undefined,
        title: cleanField(row[2]),
        location: cleanField(row[3]) || undefined,
        time: cleanField(row[4]) || undefined,
        description: cleanField(row[5]),
        link: cleanField(row[6]) || undefined,
        image: cleanField(row[7]) || undefined,
        excerpt: cleanField(row[8]) || undefined,
        content: cleanField(row[9]) || undefined,
      };
    })
    .filter(event => {
      const looksLikeDate = event.date && /[\d\/]/.test(event.date) && event.date.includes('/');
      return looksLikeDate && 
        event.title && 
        (event.description || event.content);
    });
    
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    const upcoming: Array<{
      datePrimary: string;
      dateSecondary: string;
      title: string;
      location: string;
      time: string;
      description: string;
      link?: string;
      image?: string;
    }> = [];
    
    const past: Array<{
      title: string;
      date: string;
      excerpt: string;
      href: string;
      content: string;
    }> = [];

    for (const event of events) {
      const imageUrl = event.image ? convertDriveUrl(event.image) : undefined;
      const eventDate = parseEventDate(event.date);
      const endDate = event.endDate ? parseEventDate(event.endDate) : null;
      
      let eventDateForComparison: Date | null = null;
      if (eventDate) {
        eventDateForComparison = new Date(eventDate);
        eventDateForComparison.setHours(0, 0, 0, 0);
      }
      
      let eventEndDateForComparison: Date | null = null;
      if (endDate) {
        eventEndDateForComparison = new Date(endDate);
        eventEndDateForComparison.setHours(0, 0, 0, 0);
      }
      
      const dateToCompare = eventEndDateForComparison || eventDateForComparison;
      const isPast = dateToCompare && dateToCompare < now;

      if (isPast) {
        // For past events:
        // - excerpt: shorter preview text for card (from column H, or truncated content/description)
        // - content: full text for modal (from column I, or description)
        
        const fullContent = event.content || event.description;
        
        if (!fullContent) {
          continue;
        }
        
        let excerpt = event.excerpt;
        if (!excerpt) {
          excerpt = fullContent.length > 150 
            ? fullContent.substring(0, 150).trim() + '...'
            : fullContent;
        }
        
        past.push({
          title: event.title,
          date: formatPastEventDate(event.date),
          excerpt: excerpt, 
          href: event.link || '#',
          content: fullContent, 
        });
      } else {
        if (!event.location || !event.time) {
          continue;
        }
        
        const { datePrimary, dateSecondary } = formatUpcomingEventDate(event.date);
        if (!datePrimary || !dateSecondary) {
          continue;
        }
        
        upcoming.push({
          datePrimary: datePrimary,
          dateSecondary: dateSecondary,
          title: event.title,
          location: event.location,
          time: event.time,
          description: event.content || event.description,
          link: event.link,
          image: imageUrl,
        });
      }
    }

    return NextResponse.json({
      upcoming,
      past,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events', upcoming: [], past: [] },
      { status: 500 }
    );
  }
}
