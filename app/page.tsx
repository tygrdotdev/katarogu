import { getCurrentSession } from "@/auth/sessions";
import DashboardPage from "./dashboard/page";
import HomePage from "./home/page";

export default async function Home() {
  const { user } = await getCurrentSession();

  return (
    <>
      {user ? (
        <DashboardPage />
      ) : (
          <HomePage />
      )}
    </>
  );
}