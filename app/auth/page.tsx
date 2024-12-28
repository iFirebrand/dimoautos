import { redirect } from "next/navigation";
import { getDimoAuthUrl } from "../lib/auth";

export default function LoginPage() {
  const authUrl = getDimoAuthUrl();

  // Redirect immediately to the DIMO login page
  redirect(authUrl);
}
