"use client";

// importing necessary functions
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  // checking if sessions exists
  if (session) {
    //logged in code
  }

  const handleButton = () => {
    if (session) {
      signOut();
      return;
    }
    signIn();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>HomePage</h1>
      <button onClick={() => handleButton()}>
        {session ? "signOut" : "signIn"}
      </button>
    </main>
  );
}
