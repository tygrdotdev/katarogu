import { Lucia, type Session, type User } from "lucia";
import { GitHub } from "arctic";

import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { sessionCollection, userCollection } from "./mongodb";

import { cookies } from "next/headers";
import { cache } from "react";

const adapter = new MongodbAdapter(sessionCollection, userCollection);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: process.env.NODE_ENV === "production" ? true : false,
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production",
		}
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username,
			github_id: attributes.github_id
		}
	}
});

export const github = new GitHub(process.env.GITHUB_CLIENT_ID!, process.env.GITHUB_CLIENT_SECRET!);

export const validateRequest = cache(
	async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null
			};
		}

		const result = await lucia.validateSession(sessionId);
		// next.js throws when you attempt to set cookie when rendering page
		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
		} catch { }
		return result;
	}
);

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
	github_id: number;
}