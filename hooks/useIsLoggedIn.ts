import { createClient } from "@/utils/supabase/server";

export const useIsLoggedIn = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user, "user");

  if (user) {
    return true;
  }

  return false;
};
