import LoginForm from "@/components/LoginForm";
import { signIn } from "./action";

export default function Login() {
  return <LoginForm login={signIn} />;
}
