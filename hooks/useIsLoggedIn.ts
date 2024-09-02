import { createClient } from "@/utils/supabase/server";

export const useIsLoggedIn = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return true;
  }

  return false;
};
