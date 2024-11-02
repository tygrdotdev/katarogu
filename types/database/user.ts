export type UsersCollection = {
	_id: string;
	name: string | null;
	username: string;
	email: string;
	email_verified: boolean;
	avatar: string;
	banner: string;
	password_hash: string | null;
	visibility: "public" | "unlisted" | "private";
	oauth_auto_link: boolean;
	github_id: string | null;
	google_id: string | null;
	discord_id: string | null;
};

export interface User {
	id: string;
	name: string | null;
	username: string;
	email: string;
	email_verified: boolean;
	avatar: string;
	banner: string;
	visibility: "public" | "unlisted" | "private";
	oauth_auto_link: boolean;
	github_id: string | null;
	google_id: string | null;
	discord_id: string | null;
}
