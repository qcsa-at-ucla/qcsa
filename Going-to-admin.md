### 1. Configure Google Sheets API
1. Follow the instructions in `GOOGLE_SHEETS_SETUP.md`
2. Create a Google Cloud project and service account
3. Share your spreadsheet with the service account
4. Update the `.env` file with your credentials

### 2. Test the Setup
1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000/admin`
3. Click "Test Connections" to verify everything is working
4. Click "Check Spreadsheet Status" to see your data
5. Click "Sync to Mailchimp" to perform the actual sync

