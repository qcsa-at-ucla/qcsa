import { NextResponse } from 'next/server';
import { GoogleSheetsService } from '../../utils/googleSheetsService';
import { MailchimpService } from '../../utils/mailchimpService';
import { SyncTracker } from '../../utils/syncTracker';

export async function POST() {
  try {
    // Initialize services
    const sheetsService = new GoogleSheetsService();
    const mailchimpService = new MailchimpService();
    const syncTracker = new SyncTracker();

    // Get data from Google Sheets
    console.log('Fetching data from Google Sheets...');
    const spreadsheetData = await sheetsService.getSpreadsheetData();
    
    if (spreadsheetData.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'No data found in spreadsheet',
        processed: 0 
      });
    }

    console.log(`Found ${spreadsheetData.length} entries in spreadsheet`);

    // Filter out already processed emails
    const processedEmails = syncTracker.getProcessedEmails();
    const newEntries = spreadsheetData.filter(row => 
      !processedEmails.has(row.email.toLowerCase())
    );

    console.log(`Found ${newEntries.length} new entries to process`);

    if (newEntries.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'All entries have already been processed',
        processed: 0,
        skipped: spreadsheetData.length,
      });
    }

    // Convert to Mailchimp format
    const contacts = newEntries.map(row => ({
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
    }));

    // Add contacts to Mailchimp
    console.log('Adding contacts to Mailchimp...');
    const results = await mailchimpService.addMultipleContacts(contacts);

    // Record the sync results
    const syncRecords = results.map(result => ({
      email: result.email,
      processedAt: new Date().toISOString(),
      status: result.success ? 'success' as const : 'failed' as const,
      error: result.error,
    }));

    syncTracker.recordSync(syncRecords);

    // Count successful additions
    const successful = results.filter(result => result.success).length;
    const failed = results.filter(result => !result.success);

    console.log(`Successfully processed ${successful} contacts`);
    if (failed.length > 0) {
      console.log(`Failed to process ${failed.length} contacts:`, failed);
    }

    return NextResponse.json({
      success: true,
      message: `Sync completed: ${successful} new contacts processed, ${spreadsheetData.length - newEntries.length} already existed`,
      processed: successful,
      failed: failed.length,
      skipped: spreadsheetData.length - newEntries.length,
      errors: failed.map(f => ({ email: f.email, error: f.error })),
    });

  } catch (error) {
    console.error('Error in sync-to-mailchimp:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json({
      success: false,
      message: `Sync failed: ${errorMessage}`,
    }, { status: 500 });
  }
}

// GET endpoint for manual triggering or status check
export async function GET() {
  try {
    const sheetsService = new GoogleSheetsService();
    const syncTracker = new SyncTracker();
    
    const data = await sheetsService.getSpreadsheetData();
    const stats = syncTracker.getStats();
    
    return NextResponse.json({
      success: true,
      message: `Found ${data.length} entries in spreadsheet`,
      entries: data.length,
      syncStats: stats,
      preview: data.slice(0, 5), // Show first 5 entries as preview
    });
  } catch (error) {
    console.error('Error checking spreadsheet:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json({
      success: false,
      message: `Failed to check spreadsheet: ${errorMessage}`,
    }, { status: 500 });
  }
}
