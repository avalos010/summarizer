import { useIsLoggedIn } from "@/hooks/useIsLoggedIn";
import React from "react";
import SigoutBtn from "./SigoutBtn";

async function Navbar() {
  const auth = await useIsLoggedIn();

  return (
    <div className="navbar">
      <div className="navbar-start justify-around">
        <a className="navbar-item text-2xl">Summarizer</a>

        {auth ? <SigoutBtn /> : <p>Not Logged In</p>}
      </div>
    </div>
  );
}

export default Navbar;
