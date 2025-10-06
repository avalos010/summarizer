import { createBrowserClient } from "@supabase/ssr";

// TODO: Move sensitive operations to server-side to reduce client-side key exposure
// - Create API routes for data operations instead of direct client calls
// - Use server-side Supabase client for sensitive operations
// - Keep client-side client only for authentication and non-sensitive operations
// - This will improve security and reduce public key exposure

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
