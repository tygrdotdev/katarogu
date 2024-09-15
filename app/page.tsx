import { validateRequest } from "@/lib/auth";
import DashboardPage from "./dashboard/page";
import HomePage from "./home/page";

export default async function Home() {
  const { user } = await validateRequest();

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
