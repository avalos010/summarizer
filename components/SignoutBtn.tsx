"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

function SignoutBtn() {
  const router = useRouter();
  const handleSignout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <button 
      onClick={handleSignout}
      className="btn btn-ghost btn-sm"
    >
      Sign Out
    </button>
  );
}

export default SignoutBtn;