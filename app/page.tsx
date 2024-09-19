import { validateRequest } from "@/auth";
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
