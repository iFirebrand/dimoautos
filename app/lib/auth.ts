import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export function getDimoAuthUrl() {
  const authUrl = `${process.env.DIMO_AUTH_URL || ""}?response_type=code&client_id=${process.env.DIMO_CLIENT_ID || ""}&redirect_uri=${encodeURIComponent(process.env.DIMO_REDIRECT_URI || "")}&scope=optimistck@gmail.com`;
  return authUrl;
}

export async function handleDimoCallback(code: string) {
  if (!code) throw new Error("Authorization code not provided");

  try {
    // Exchange authorization code for tokens
    const tokenResponse = await axios.post(
      process.env.DIMO_TOKEN_URL!,
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.DIMO_REDIRECT_URI!,
        client_id: process.env.DIMO_CLIENT_ID!,
        client_secret: process.env.DIMO_CLIENT_SECRET!,
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token } = tokenResponse.data;

    // Fetch user information
    const userResponse = await axios.get(process.env.DIMO_USER_INFO_URL!, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return userResponse.data; // Return user info
  } catch (error) {
    console.error("Error during callback", error);
    throw new Error("Failed to exchange tokens or fetch user info");
  }
}
