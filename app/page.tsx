import { Form } from "@/components/form";
import { validateRequest } from "@/lib/auth";
import Link from "next/link";
import { logout } from "./auth/actions";

export default async function Home() {
  const { user } = await validateRequest();

  return (
    <div className="flex flex-col w-full">
      {user ? (
        <div>
          <h1>Welcome back, {user.username} ({user.id})</h1>
          <Form action={logout}>
            <button>Log out</button>
          </Form>
        </div>
      ) : (
        <div>
          <Link href="/auth/login">
            <button>
              Log in
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
