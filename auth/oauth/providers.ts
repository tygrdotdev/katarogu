import { Discord, GitHub, Google } from "arctic";

export const github = new GitHub(
	process.env.GITHUB_CLIENT_ID!,
	process.env.GITHUB_CLIENT_SECRET!,
	null
);

export const google = new Google(
	process.env.GOOGLE_CLIENT_ID!,
	process.env.GOOGLE_CLIENT_SECRET!,
	`${process.env.NEXT_PUBLIC_URL}/oauth/google/callback`
);

export const discord = new Discord(
	process.env.DISCORD_CLIENT_ID!,
	process.env.DISCORD_CLIENT_SECRET!,
	`${process.env.NEXT_PUBLIC_URL}/oauth/discord/callback`
)