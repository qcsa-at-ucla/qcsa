import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables");
}

// Use service role key for server-side operations 
export const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

export type SponsorRecord = {
  id?: string;
  stripe_session_id: string;
  stripe_customer_id: string | null;
  stripe_payment_intent_id: string | null;
  company_name: string | null;
  contact_email: string;
  contact_name: string | null;
  tier: "silver" | "gold";
  amount_paid: number;
  currency: string;
  payment_status: string;
  created_at?: string;
};

export async function insertSponsor(sponsor: Omit<SponsorRecord, "id" | "created_at">) {
  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }

  const { data, error } = await supabase
    .from("qcf_sponsors")
    .insert(sponsor)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to insert sponsor: ${error.message}`);
  }

  return data;
}

export async function getSponsorBySessionId(sessionId: string) {
  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }

  const { data, error } = await supabase
    .from("qcf_sponsors")
    .select("*")
    .eq("stripe_session_id", sessionId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error(`Failed to get sponsor: ${error.message}`);
  }

  return data;
}
