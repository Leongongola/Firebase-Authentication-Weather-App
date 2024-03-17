"use client"
import { useState } from "react";
import Link from "next/link";
import { useUserAuth } from "./auth-context"; // Assuming this is the correct path

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  // TODO: Implement handleSignIn and handleSignOut functions using gitHubSignIn and firebaseSignOut from useUserAuth
  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue">
      <div className="container mx-auto p-4">
        {user ? (
          <>
            <p className="text-lg font-bold mb-4">Welcome, {user.displayName}</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              <Link href="/weather">Click to view Weather</Link>
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <>
            <p className="text-lg font-bold mb-4">Please sign in to access the weather information.</p>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleSignIn}>Sign In</button>
          </>
        )}
      </div>
    </div>
  );
}
