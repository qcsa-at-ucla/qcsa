'use client';

import { useState } from 'react';

interface SyncResult {
  success: boolean;
  message: string;
  processed?: number;
  failed?: number;
  skipped?: number;
  errors?: Array<{ email: string; error: string }>;
  entries?: number;
  preview?: Array<{ firstName: string; lastName: string; email: string }>;
  syncStats?: {
    total: number;
    successful: number;
    failed: number;
    lastSync: string | null;
  };
  results?: {
    googleSheets: { connected: boolean; error: string; entries: number };
    mailchimp: { connected: boolean; error: string; listName: string };
  };
}

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SyncResult | null>(null);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const handleSync = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/sync-to-mailchimp', {
        method: 'POST',
      });
      const data: SyncResult = await response.json();
      setResult(data);
      if (data.success) {
        setLastSync(new Date());
      }
    } catch (error) {
      setResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleCheckStatus = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/sync-to-mailchimp', {
        method: 'GET',
      });
      const data: SyncResult = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/test-connection', {
        method: 'GET',
      });
      const data: SyncResult = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Mailchimp Sync Administration
          </h1>
          
          <div className="space-y-6">            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleTestConnection}
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isLoading ? 'Testing...' : 'Test Connections'}
              </button>
              
              <button
                onClick={handleSync}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isLoading ? 'Processing...' : 'Sync to Mailchimp'}
              </button>
              
              <button
                onClick={handleCheckStatus}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isLoading ? 'Checking...' : 'Check Spreadsheet Status'}
              </button>
            </div>

            {/* Last Sync Info */}
            {lastSync && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Last sync completed: {lastSync.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            {result && (
              <div className={`border-l-4 p-4 ${
                result.success 
                  ? 'bg-green-50 border-green-400' 
                  : 'bg-red-50 border-red-400'
              }`}>
                <div className="flex">
                  <div className="ml-3">
                    <h3 className={`text-sm font-medium ${
                      result.success ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {result.success ? 'Success' : 'Error'}
                    </h3>
                    <div className={`mt-2 text-sm ${
                      result.success ? 'text-green-700' : 'text-red-700'
                    }`}>
                      <p>{result.message}</p>
                        {result.processed !== undefined && (
                        <p className="mt-1">New contacts processed: {result.processed}</p>
                      )}
                      
                      {result.skipped !== undefined && result.skipped > 0 && (
                        <p className="mt-1">Already existed: {result.skipped}</p>
                      )}
                      
                      {result.failed !== undefined && result.failed > 0 && (
                        <p className="mt-1">Failed: {result.failed}</p>
                      )}
                      
                      {result.entries !== undefined && (
                        <p className="mt-1">Total entries in spreadsheet: {result.entries}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Connection Test Results */}
            {result?.results && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Connection Test Results
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Google Sheets Status */}
                  <div className={`p-4 rounded-lg border-l-4 ${
                    result.results.googleSheets.connected 
                      ? 'bg-green-50 border-green-400' 
                      : 'bg-red-50 border-red-400'
                  }`}>
                    <h4 className={`font-medium ${
                      result.results.googleSheets.connected ? 'text-green-800' : 'text-red-800'
                    }`}>
                      Google Sheets
                    </h4>
                    <p className={`text-sm mt-1 ${
                      result.results.googleSheets.connected ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {result.results.googleSheets.connected 
                        ? `Connected successfully (${result.results.googleSheets.entries} entries)`
                        : result.results.googleSheets.error
                      }
                    </p>
                  </div>

                  {/* Mailchimp Status */}
                  <div className={`p-4 rounded-lg border-l-4 ${
                    result.results.mailchimp.connected 
                      ? 'bg-green-50 border-green-400' 
                      : 'bg-red-50 border-red-400'
                  }`}>
                    <h4 className={`font-medium ${
                      result.results.mailchimp.connected ? 'text-green-800' : 'text-red-800'
                    }`}>
                      Mailchimp
                    </h4>
                    <p className={`text-sm mt-1 ${
                      result.results.mailchimp.connected ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {result.results.mailchimp.connected 
                        ? `Connected to list: ${result.results.mailchimp.listName}`
                        : result.results.mailchimp.error
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Sync Statistics */}
            {result?.syncStats && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-blue-900 mb-4">
                  Sync Statistics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-blue-800">Total Processed</p>
                    <p className="text-2xl font-bold text-blue-600">{result.syncStats.total}</p>
                  </div>
                  <div>
                    <p className="font-medium text-green-800">Successful</p>
                    <p className="text-2xl font-bold text-green-600">{result.syncStats.successful}</p>
                  </div>
                  <div>
                    <p className="font-medium text-red-800">Failed</p>
                    <p className="text-2xl font-bold text-red-600">{result.syncStats.failed}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Last Sync</p>
                    <p className="text-sm text-gray-600">
                      {result.syncStats.lastSync 
                        ? new Date(result.syncStats.lastSync).toLocaleDateString()
                        : 'Never'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Preview Data */}
            {result?.preview && result.preview.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Spreadsheet Preview (First 5 entries)
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          First Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {result.preview.map((entry, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {entry.firstName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {entry.lastName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {entry.email}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Error Details */}
            {result?.errors && result.errors.length > 0 && (
              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-red-900 mb-4">
                  Failed Contacts
                </h3>
                <div className="space-y-2">
                  {result.errors.map((error, index) => (
                    <div key={index} className="text-sm text-red-700">
                      <strong>{error.email}:</strong> {error.error}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Instructions</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p>1. <strong>Test Connections</strong>: Verify that both Google Sheets and Mailchimp are properly configured and accessible.</p>
              <p>2. <strong>Check Spreadsheet Status</strong>: View how many entries are in your Google Spreadsheet and preview the first few entries.</p>
              <p>3. <strong>Sync to Mailchimp</strong>: Process all new entries from the spreadsheet and add them to your Mailchimp audience.</p>
              <p>4. The system automatically prevents duplicates by tracking processed emails.</p>
              <p>5. If you encounter connection issues, check the <code>GOOGLE_SHEETS_SETUP.md</code> file for detailed setup instructions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
