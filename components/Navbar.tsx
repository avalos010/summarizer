import { useIsLoggedIn } from "@/hooks/useIsLoggedIn";
import SignoutBtn from "./SignoutBtn";
import Link from "next/link";

async function Navbar() {
  const auth = await useIsLoggedIn();

  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          Summarizer
        </Link>
      </div>
      <div className="navbar-end">
        {auth ? (
          <div className="flex items-center gap-4">
            <Link href="/summarizer-pro" className="btn btn-primary btn-sm">
              Pro Dashboard
            </Link>
            <SignoutBtn />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/summarizer-free" className="btn btn-ghost btn-sm">
              Free Version
            </Link>
            <Link href="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
