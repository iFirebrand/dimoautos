"use client";

import {
  LoginWithDimo,
  initializeDimoSDK,
  useDimoAuthState,
  DimoAuthProvider,
} from "@dimo-network/login-with-dimo";
import { useState } from "react";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export default function Home() {
  const [permissionsEnabled] = useState(true);

  // Initialize SDK first
  initializeDimoSDK({
    clientId: process.env.NEXT_PUBLIC_DIMO_CLIENT_ID!,
    redirectUri: process.env.NEXT_PUBLIC_DIMO_REDIRECT_URI!,
  });

  return (
    <DimoAuthProvider>
      <main className="flex min-h-screen items-center justify-center">
        <LoginWithDimo
          mode="popup"
          onSuccess={(authData: {
            jwt: string;
            email?: string;
            walletAddress?: string;
          }) => console.log("Success:", authData)}
          onError={(error) => console.error("Error:", error)}
          permissionTemplateId={permissionsEnabled ? "1" : undefined}
        />
      </main>
    </DimoAuthProvider>
  );
}

function AuthenticatedContent() {
  const { isAuthenticated, getValidJWT, getEmail, email, walletAddress } =
    useDimoAuthState();

  return <div>{/* Use the auth state here */}</div>;
}
