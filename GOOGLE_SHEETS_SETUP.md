# Google Sheets to Mailchimp Sync Setup Instructions

## Google Sheets API Setup

### 1. Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on it and press "Enable"

### 2. Create Service Account Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: `mailchimp-sync-service`
   - Description: `Service account for syncing Google Sheets to Mailchimp`
4. Click "Create and Continue"
5. Skip the role assignment (click "Continue")
6. Skip granting users access (click "Done")

### 3. Generate Private Key
1. Find your newly created service account in the list
2. Click on it to open the details
3. Go to the "Keys" tab
4. Click "Add Key" > "Create New Key"
5. Choose "JSON" format
6. Download the JSON file

### 4. Share Your Spreadsheet
1. Open your Google Spreadsheet
2. Click the "Share" button
3. Add the service account email (found in the JSON file as `client_email`)
4. Give it "Viewer" permissions
5. Click "Send"

### 5. Update Environment Variables
1. Open your `.env` file
2. Update the following variables with values from your JSON file:

```env
# Google Sheets Configuration
GOOGLE_SHEETS_SPREADSHEET_ID=1oJYPSUkc-Xl6ThQ7qLHwnILs2l4XYdymEYgbmJyNAFo
GOOGLE_SHEETS_RANGE=Sheet1!A:C
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----"

# Mailchimp Configuration (already configured)
MAILCHIMP_API_KEY=your-api-key
MAILCHIMP_LIST_ID=your-list-id
MAILCHIMP_DATA_CENTER=us1
```

**Note**: The private key should include the `\n` characters for line breaks and be wrapped in quotes.

## Spreadsheet Format

Your Google Spreadsheet should have the following columns:
- Column A: Timestamp (optional, filled automatically by Google Forms)
- Column B: First Name
- Column C: Last Name  
- Column D: Email Address


The first row should contain headers.

## Usage

### Manual Sync
1. Navigate to `/admin` in your application
2. Click "Check Spreadsheet Status" to verify the connection
3. Click "Sync to Mailchimp" to process new entries
