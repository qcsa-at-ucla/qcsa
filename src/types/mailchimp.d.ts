declare module '@mailchimp/mailchimp_marketing' {
  interface MailchimpConfig {
    apiKey?: string;
    server?: string;
  }

  interface ListMember {
    email_address: string;
    status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending';
    merge_fields?: {
      FNAME?: string;
      LNAME?: string;
      [key: string]: string;
    };
  }

  interface List {
    id: string;
    name: string;
    [key: string]: unknown;
  }

  interface MemberResponse {
    id: string;
    email_address: string;
    status: string;
  }

  interface ListsAPI {
    addListMember(listId: string, memberInfo: ListMember): Promise<MemberResponse>;
    updateListMember(listId: string, subscriberHash: string, memberInfo: Partial<ListMember>): Promise<MemberResponse>;
    getList(listId: string): Promise<List>;
  }

  interface Mailchimp {
    setConfig(config: MailchimpConfig): void;
    lists: ListsAPI;
  }

  const mailchimp: Mailchimp;
  export default mailchimp;
}
