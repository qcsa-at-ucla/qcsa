import fs from 'fs';
import path from 'path';

interface SyncRecord {
  email: string;
  processedAt: string;
  status: 'success' | 'failed';
  error?: string;
}

interface SyncLog {
  lastSync: string;
  records: SyncRecord[];
}

class SyncTracker {
  private logPath: string;

  constructor() {
    // Store the log in the project root (you might want to change this to a database in production)
    this.logPath = path.join(process.cwd(), 'sync-log.json');
  }

  private readLog(): SyncLog {
    try {
      if (fs.existsSync(this.logPath)) {
        const data = fs.readFileSync(this.logPath, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error reading sync log:', error);
    }
    
    return {
      lastSync: '',
      records: [],
    };
  }

  private writeLog(log: SyncLog): void {
    try {
      fs.writeFileSync(this.logPath, JSON.stringify(log, null, 2));
    } catch (error) {
      console.error('Error writing sync log:', error);
    }
  }

  getProcessedEmails(): Set<string> {
    const log = this.readLog();
    return new Set(log.records
      .filter(record => record.status === 'success')
      .map(record => record.email.toLowerCase()));
  }

  recordSync(records: SyncRecord[]): void {
    const log = this.readLog();
    
    // Remove old records for the same emails
    const emailsToUpdate = new Set(records.map(r => r.email.toLowerCase()));
    log.records = log.records.filter(r => !emailsToUpdate.has(r.email.toLowerCase()));
    
    // Add new records
    log.records.push(...records);
    log.lastSync = new Date().toISOString();
    
    this.writeLog(log);
  }

  getLastSyncDate(): Date | null {
    const log = this.readLog();
    return log.lastSync ? new Date(log.lastSync) : null;
  }

  getStats(): { total: number; successful: number; failed: number; lastSync: string | null } {
    const log = this.readLog();
    const successful = log.records.filter(r => r.status === 'success').length;
    const failed = log.records.filter(r => r.status === 'failed').length;
    
    return {
      total: log.records.length,
      successful,
      failed,
      lastSync: log.lastSync || null,
    };
  }

  // Get records that failed in previous syncs (for retry functionality)
  getFailedRecords(): SyncRecord[] {
    const log = this.readLog();
    return log.records.filter(r => r.status === 'failed');
  }

  // Remove specific email(s) from sync tracker to force re-sync
  removeProcessedEmails(emails: string[]): void {
    const log = this.readLog();
    const emailsToRemove = new Set(emails.map(email => email.toLowerCase()));
    
    // Filter out the specified emails
    log.records = log.records.filter(record => 
      !emailsToRemove.has(record.email.toLowerCase())
    );
    
    this.writeLog(log);
    console.log(`Removed ${emails.length} email(s) from sync tracker:`, emails);
  }

  // Clear all sync records (for full re-sync)
  clearAllRecords(): void {
    const log = this.readLog();
    log.records = [];
    log.lastSync = new Date().toISOString();
    
    this.writeLog(log);
    console.log('Cleared all sync records - all emails will be re-synced on next sync');
  }

  // Get all processed emails with their details
  getAllProcessedEmails(): SyncRecord[] {
    const log = this.readLog();
    return log.records.filter(record => record.status === 'success');
  }
}

export { SyncTracker };
export type { SyncRecord };
