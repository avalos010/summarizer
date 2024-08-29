import SignupForm from "@/components/SignupForm";
import React from "react";
import { signUp } from "./action";

function page() {
  return <SignupForm signup={signUp} />;
}
export default page;
