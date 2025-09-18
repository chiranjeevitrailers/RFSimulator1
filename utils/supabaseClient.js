// Supabase client initialization for 5GLabX Cloud.
// Reads URL and anon key from environment variables injected by Netlify at build / runtime.

const SUPABASE_URL = window?.env?.SUPABASE_URL || import.meta?.env?.VITE_SUPABASE_URL || "${SUPABASE_URL}";
const SUPABASE_ANON_KEY = window?.env?.SUPABASE_ANON_KEY || import.meta?.env?.VITE_SUPABASE_ANON_KEY || "${SUPABASE_ANON_KEY}";

// eslint-disable-next-line no-undef
const supabase = window.supabase?.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;