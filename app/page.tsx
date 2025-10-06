import { useIsLoggedIn } from "@/hooks/useIsLoggedIn";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const isLoggedIn = await useIsLoggedIn();

  if (isLoggedIn) {
    redirect("/summarizer-pro");
  } else {
    redirect("/summarizer-free");
  }
}
