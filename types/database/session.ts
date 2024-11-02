import { User } from "@/types/database/user";

export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };

export interface Session {
	id: string;
	user_id: string;
	expires_at: Date;
}

export type SessionCollection = {
	_id: string;
	user_id: string;
	expires_at: Date;
};