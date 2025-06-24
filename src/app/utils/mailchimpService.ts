import mailchimp from '@mailchimp/mailchimp_marketing';
import crypto from 'crypto';

interface MailchimpContact {
  firstName: string;
  lastName: string;
  email: string;
}

interface MailchimpResult {
  success: boolean;
  email: string;
  error?: string;
}

interface MailchimpError {
  status?: number;
  response?: {
    body?: {
      title?: string;
    };
  };
  message?: string;
}

class MailchimpService {
  constructor() {
    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMP_API_KEY,
      server: process.env.MAILCHIMP_DATA_CENTER, // e.g., 'us1'
    });
  }

  async addContact(contact: MailchimpContact): Promise<MailchimpResult> {
    const listId = process.env.MAILCHIMP_LIST_ID;

    if (!listId) {
      throw new Error('Mailchimp List ID not configured');
    }

    try {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: contact.email,
        status: 'subscribed',
        merge_fields: {
          FNAME: contact.firstName,
          LNAME: contact.lastName,
        },
      });

      console.log(`Successfully added ${contact.email} to Mailchimp:`, response.id);
      return {
        success: true,
        email: contact.email,
      };    } catch (error: unknown) {
      console.error(`Error adding ${contact.email} to Mailchimp:`, error);
        // Handle the case where the email is already subscribed
      const mailchimpError = error as MailchimpError;
      if (mailchimpError.status === 400 && mailchimpError.response?.body?.title === 'Member Exists') {
        console.log(`${contact.email} is already subscribed to Mailchimp`);
        return {
          success: true,
          email: contact.email,
          error: 'Already subscribed',
        };
      }

      return {
        success: false,
        email: contact.email,
        error: mailchimpError.message || 'Unknown error',
      };
    }
  }

  async addMultipleContacts(contacts: MailchimpContact[]): Promise<MailchimpResult[]> {
    const results: MailchimpResult[] = [];

    // Process contacts one by one to avoid rate limiting
    for (const contact of contacts) {
      const result = await this.addContact(contact);
      results.push(result);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    return results;
  }

  async updateContact(contact: MailchimpContact): Promise<MailchimpResult> {
    const listId = process.env.MAILCHIMP_LIST_ID;

    if (!listId) {
      throw new Error('Mailchimp List ID not configured');
    }

    try {
      // Get subscriber hash for the email
      const subscriberHash = this.getSubscriberHash(contact.email);
      
      const response = await mailchimp.lists.updateListMember(listId, subscriberHash, {
        merge_fields: {
          FNAME: contact.firstName,
          LNAME: contact.lastName,
        },
      });

      console.log(`Successfully updated ${contact.email} in Mailchimp:`, response.id);
      return {
        success: true,
        email: contact.email,
      };    } catch (error: unknown) {
      console.error(`Error updating ${contact.email} in Mailchimp:`, error);
      const mailchimpError = error as { message?: string };
      return {
        success: false,
        email: contact.email,
        error: mailchimpError.message || 'Unknown error',
      };
    }
  }
  private getSubscriberHash(email: string): string {
    return crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  }
}

export { MailchimpService };
export type { MailchimpContact, MailchimpResult };
