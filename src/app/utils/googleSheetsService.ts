import { google } from 'googleapis';

interface SpreadsheetRow {
  firstName: string;
  lastName: string;
  email: string;
  timestamp?: string;
}

class GoogleSheetsService {
  private sheets;
  private auth;

  constructor() {
    // Initialize Google Sheets API client
    this.auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    this.sheets = google.sheets({ version: 'v4', auth: this.auth });
  }  async getSpreadsheetData(): Promise<SpreadsheetRow[]> {
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const range = process.env.GOOGLE_SHEETS_RANGE || 'A:D'; // A = Timestamp, B = First Name, C = Last Name, D = Email

    if (!spreadsheetId) {
      throw new Error('Google Sheets Spreadsheet ID not configured');
    }

    console.log(`Reading from spreadsheet: ${spreadsheetId}, range: ${range}`);

    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      const rows = response.data.values || [];
      console.log(`Raw response: ${JSON.stringify(rows, null, 2)}`);
      console.log(`Found ${rows.length} total rows (including header)`);

      if (rows.length === 0) {
        console.log('No data found in the specified range');
        return [];
      }

      // Skip header row and convert to objects
      const dataRows = rows.slice(1).map((row: string[], index: number) => ({
        timestamp: row[0] || '',
        firstName: row[1] || '',
        lastName: row[2] || '',
        email: row[3] || '',
        rowIndex: index + 2, // +2 because we skipped header and array is 0-indexed
      }));

      console.log(`Processed ${dataRows.length} data rows`);
      console.log(`Sample data: ${JSON.stringify(dataRows.slice(0, 3), null, 2)}`);

      // Filter out rows with missing email addresses
      const validRows = dataRows.filter(row => row.email && row.email.trim() !== '');
      console.log(`Found ${validRows.length} rows with valid email addresses`);
      
      return validRows;
    } catch (error) {
      console.error('Error reading Google Sheets:', error);
      throw new Error('Failed to read Google Sheets data');
    }
  }

  async getNewEntries(lastProcessedTimestamp?: string): Promise<SpreadsheetRow[]> {
    const allEntries = await this.getSpreadsheetData();
    
    if (!lastProcessedTimestamp) {
      return allEntries;
    }

    // Filter entries newer than the last processed timestamp
    return allEntries.filter(entry => {
      if (!entry.timestamp) return true; // Include entries without timestamp
      return new Date(entry.timestamp) > new Date(lastProcessedTimestamp);
    });
  }
}

export { GoogleSheetsService };
export type { SpreadsheetRow };
