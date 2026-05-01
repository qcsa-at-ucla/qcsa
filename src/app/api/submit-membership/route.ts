import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

interface MembershipFormData {
  firstName: string;
  lastName: string;
  email: string;
  educationalBackground: string;
  year: string;
  reasonToJoin: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData: MembershipFormData = await request.json();

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.educationalBackground || !formData.year || !formData.reasonToJoin) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Initialize Google Sheets API client
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID_1;

    if (!spreadsheetId) {
      throw new Error('Google Sheets Spreadsheet ID not configured');
    }

    // Prepare the data for range A:G
    // A = Timestamp, B = First Name, C = Last Name, D = Email, E = Educational Background, F = Year, G = Reason to Join
    const timestamp = new Date().toISOString();
    const values = [
      [
        timestamp,
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.educationalBackground,
        formData.year,
        formData.reasonToJoin,
      ]
    ];

    // Append the data to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A:G',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values
      }
    });

    console.log('Successfully submitted to Google Sheets:', response.data);

    return NextResponse.json({
      success: true,
      message: 'Membership form submitted successfully',
      rowsAdded: response.data.updates?.updatedRows || 1
    });

  } catch (error) {
    console.error('Error submitting membership form:', error);
    return NextResponse.json(
      { error: 'Failed to submit membership form' },
      { status: 500 }
    );
  }
}