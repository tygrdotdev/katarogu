import { getCurrentSession } from "@/auth/sessions";
import DashboardPage from "@/app/dashboard/page";
import HomePage from "@/app/home/page";

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