"use client";

import { User } from "lucia";
import React, { useEffect } from "react";

export interface AuthSession {
	user: User | null;
}

export const AuthContext = React.createContext<AuthSession>({
	user: null
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [mounted, setMounted] = React.useState(false);

	const [loggedIn, setLoggedIn] = React.useState(false);
	const [user, setUser] = React.useState<User | null>(null);

	useEffect(() => {
		setMounted(true);

		fetch("/api/auth/user").then((res) => {
			if (res.ok) {
				setLoggedIn(true);
				res.json().then((data) => setUser(data.user));
			}
		});
	}, []);

	const value = React.useMemo(
		() => ({
			user,
		}),
		[
			user,
		]
	);

	return (
		<AuthContext.Provider value={value}>
			{mounted && children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = React.useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return context;
};