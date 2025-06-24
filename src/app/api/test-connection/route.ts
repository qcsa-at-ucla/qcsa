import { NextResponse } from 'next/server';
import { GoogleSheetsService } from '../../utils/googleSheetsService';
import mailchimp from '@mailchimp/mailchimp_marketing';

export async function GET() {
  const results = {
    googleSheets: { connected: false, error: '', entries: 0 },
    mailchimp: { connected: false, error: '', listName: '' },
  };

  // Test Google Sheets connection
  try {
    console.log('Testing Google Sheets connection...');
    const sheetsService = new GoogleSheetsService();
    const data = await sheetsService.getSpreadsheetData();
    results.googleSheets.connected = true;
    results.googleSheets.entries = data.length;
    console.log(`Google Sheets: Connected successfully, found ${data.length} entries`);
  } catch (error) {
    results.googleSheets.error = error instanceof Error ? error.message : 'Unknown error';
    console.error('Google Sheets connection failed:', error);
  }

  // Test Mailchimp connection
  try {
    console.log('Testing Mailchimp connection...');
    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMP_API_KEY,
      server: process.env.MAILCHIMP_DATA_CENTER,
    });

    const listId = process.env.MAILCHIMP_LIST_ID;
    if (!listId) {
      throw new Error('Mailchimp List ID not configured');
    }

    const listInfo = await mailchimp.lists.getList(listId);
    results.mailchimp.connected = true;
    results.mailchimp.listName = listInfo.name;
    console.log(`Mailchimp: Connected successfully to list "${listInfo.name}"`);
  } catch (error) {
    results.mailchimp.error = error instanceof Error ? error.message : 'Unknown error';
    console.error('Mailchimp connection failed:', error);
  }

  const allConnected = results.googleSheets.connected && results.mailchimp.connected;

  return NextResponse.json({
    success: allConnected,
    message: allConnected 
      ? 'All connections successful' 
      : 'Some connections failed - check individual results',
    results,
  });
}
