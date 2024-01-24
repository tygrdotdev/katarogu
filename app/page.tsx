"use client";

import { useAuth } from "@/components/auth/provider";
import DashboardPage from "./dashboard/page";
import HomePage from "./home/page";

export default function Home() {
  const { loggedIn } = useAuth();

  return (
    <>
      {loggedIn ? (
        <>
          <DashboardPage />
        </>
      ) : (
        <>
          <HomePage />
        </>
      )}
    </>
  );
}
