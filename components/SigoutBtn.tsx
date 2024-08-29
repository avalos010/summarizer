"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

function SigoutBtn() {
  const router = useRouter();
  const handleSignout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();

    router.refresh();
  };

  return <button onClick={handleSignout}>Signout</button>;
}

export default SigoutBtn;
