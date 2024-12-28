import { cookies } from "next/headers";

export default function ProtectedPage() {
  const cookieStore = cookies();
  const user = cookieStore.get("user")?.value;

  if (!user) {
    return <p>You must log in to view this page.</p>;
  }

  const userData = JSON.parse(user);

  return (
    <div className="p-4">
      <h1>Welcome, {userData.name}</h1>
      <p>Email: {userData.email}</p>
    </div>
  );
}
