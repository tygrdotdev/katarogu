"use client";

import pb, { ClientError } from "@/lib/pocketbase";
import { AuthProviderInfo, ExternalAuthModel } from "pocketbase";
import React, { useCallback, useEffect } from "react";
import { toast } from "sonner";

export interface AuthSession {
	authStore: typeof pb.authStore;

	user: typeof pb.authStore.model;
	oauth: {
		github: ExternalAuthModel | null;
		google: ExternalAuthModel | null;
		discord: ExternalAuthModel | null;
	};
	loggedIn: typeof pb.authStore.isValid;

	avatar: string;
	isDefaultAvatar: boolean;

	banner: string;
	isDefaultBanner: boolean;

	signIn: (email: string, password: string) => Promise<boolean>;
	signOut: () => void;

	signInWithOAuth: (
		provider: "github" | "google" | "discord"
	) => Promise<boolean>;
	unlinkOAuth: (provider: "github" | "google" | "discord") => Promise<void>;
	refreshOAuth: () => Promise<void>;

	register: (
		name: string,
		username: string,
		email: string,
		password: string,
		passwordConfirm: string
	) => Promise<boolean>;
	resetPassword: (email: string) => Promise<void>;

	uploadAvatar: (file: File) => Promise<void>;
	removeAvatar: () => Promise<void>;

	uploadBanner: (file: File) => Promise<void>;
	removeBanner: () => Promise<void>;

	deleteAccount: () => Promise<void>;

	update: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthSession>({
	authStore: pb.authStore,

	user: pb.authStore.model,
	oauth: {
		github: null,
		google: null,
		discord: null,
	},
	loggedIn: pb.authStore.isValid,

	avatar: pb.authStore.model?.avatar
		? `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.avatar}`
		: `https://api.dicebear.com/7.x/lorelei-neutral/png?seed=${pb.authStore.model?.username}&radius=50`,

	isDefaultAvatar: pb.authStore.model?.avatar ? false : true,

	banner: pb.authStore.model?.banner
		? `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.banner}`
		: `https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=20`,

	isDefaultBanner: pb.authStore.model?.banner ? false : true,

	signIn: async () => false,
	signOut: () => {},

	signInWithOAuth: async () => false,
	refreshOAuth: async () => {},
	unlinkOAuth: async () => {},

	register: async () => false,
	resetPassword: async () => {},

	uploadAvatar: async () => {},
	removeAvatar: async () => {},

	uploadBanner: async () => {},
	removeBanner: async () => {},

	deleteAccount: async () => {},

	update: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [mounted, setMounted] = React.useState(false);

	const [loggedIn, setLoggedIn] = React.useState(pb.authStore.isValid);
	const [user, setUser] = React.useState(pb.authStore.model);

	const [oauth, setOauth] = React.useState<{
		github: ExternalAuthModel | null;
		google: ExternalAuthModel | null;
		discord: ExternalAuthModel | null;
	}>({
		github: null,
		google: null,
		discord: null,
	});

	const [avatar, setAvatar] = React.useState(
		pb.authStore.model?.avatar
			? `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.avatar}`
			: `https://api.dicebear.com/7.x/lorelei-neutral/png?seed=${pb.authStore.model?.username}&radius=50`
	);
	const [isDefaultAvatar, setIsDefaultAvatar] = React.useState(
		pb.authStore.model?.avatar ? false : true
	);

	const [banner, setBanner] = React.useState(
		pb.authStore.model?.banner
			? `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.banner}`
			: `https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=50`
	);
	const [isDefaultBanner, setIsDefaultBanner] = React.useState(
		pb.authStore.model?.banner ? false : true
	);

	const signIn = async (email: string, password: string) => {
		let res = false;
		await pb
			.collection("users")
			.authWithPassword(email, password)
			.then(async (record) => {
				setLoggedIn(true);
				setUser(pb.authStore.model);

				toast.success("Success!", {
					description: `Welcome back, ${record.record.username}`,
				});

				res = true;
			})
			.catch((err: ClientError) => {
				console.error(JSON.stringify(err, null, 2));
				let title = "Invalid ";
				if (err.response.message === "Failed to authenticate.")
					title += "credentials.";
				if (err.response.code === 403) {
					title += "Email.";
				}
				if (!err.response.data)
					return toast.error("An unexpected error occured!", {
						description: "Check the console for more details.",
					});
				if (
					err.response.data.identity &&
					err.response.data.identity.code === "validation_required"
				)
					title += "email";
				if (
					err.response.data.password &&
					err.response.data.password.code === "validation_required"
				)
					title.length <= 8
						? (title += "password.")
						: (title += " and password.");

				toast.error(title, {
					description: err.response.message,
				});

				res = false;
			});

		return res;
	};

	const signInWithOAuth = async (provider: "github" | "google" | "discord") => {
		let res = false;
		await pb
			.collection("users")
			.authWithOAuth2({
				provider,
				createData: {
					visibility: "public",
					name: "Katarogu User",
				},
			})
			.then(async (record) => {
				setLoggedIn(true);
				setUser(pb.authStore.model);

				toast.success("Success!", {
					description: `Welcome back, ${record.record.username}`,
				});

				res = true;
			})
			.catch((err: ClientError) => {
				console.error(JSON.stringify(err, null, 2));
				let title = "Invalid ";

				if (err.response.message === "Failed to authenticate.")
					title += "credentials.";

				if (!err.response.data)
					return toast.error("An unexpected error occured!", {
						description: "Check the console for more details.",
					});

				toast.error(title, {
					description: err.response.message,
				});

				res = false;
			});

		return res;
	};

	const refreshOAuth = async () => {
		const data = await pb
			.collection("users")
			.listExternalAuths(pb.authStore.model?.id as string)
			.then((res) => res)
			.catch((err) => {
				console.error(err);
				return [] as ExternalAuthModel[];
			});

		setOauth({
			github: data.find((r) => r.provider === "github") || null,
			google: data.find((r) => r.provider === "google") || null,
			discord: data.find((r) => r.provider === "discord") || null,
		});
	};

	const unlinkOAuth = async (provider: "github" | "google" | "discord") => {
		await pb
			.collection("users")
			.unlinkExternalAuth(pb.authStore.model?.id, provider)
			.then(() =>
				toast.success("Success!", {
					description: `Successfully unlinked ${provider}.`,
				})
			)
			.then(async () => await refreshOAuth())
			.catch((err) => {
				toast.error("Failed to unlink provider.", {
					description: "Please try again later.",
				});
			});
	};

	const signOut = (msg = true) => {
		setUser(null);
		setLoggedIn(false);
		setAvatar("");
		setBanner("");
		setIsDefaultAvatar(false);
		setIsDefaultBanner(false);

		pb.authStore.clear();
		if (msg) toast.success("Logged out. See you soon!");
	};

	const register = async (
		name: string,
		username: string,
		email: string,
		password: string,
		passwordConfirm: string
	) => {
		let res = false;
		async function createUser() {
			if (!name || name.length < 2)
				return toast.error("Missing required field!", {
					description: "Please enter a valid name with at least 2 characters.",
				});
			if (!username || username.length < 2)
				return toast.error("Missing required field!", {
					description:
						"Please enter a valid username with at least 2 characters.",
				});
			if (!email || !email.includes("@"))
				return toast.error("Missing required field!", {
					description: "Please enter a valid email.",
				});
			if (!password || password.length < 8 || password.length > 72)
				return toast.error("Missing required field!", {
					description:
						"Please enter a valid password between 3 and 72 characters long.",
				});
			if (password !== passwordConfirm)
				return toast.error("Passwords mismatch!", {
					description: "The passwords do not match. Please try again.",
				});

			await pb
				.collection("users")
				.create({
					name,
					username,
					email,
					password,
					passwordConfirm,
					visibility: "public",
				})
				.then(async () => {
					await pb.collection("users").requestVerification(email);
					toast.success("Success!", {
						description: "Please check your email for a verification link.",
					});
					res = true;
				})
				.catch((err: ClientError) => {
					if (err.response.data) {
						let e = Object.values(err.response.data)[0];

						toast.error("Something went wrong sending your request.", {
							description: e.message,
						});
					} else {
						toast.error("Something went wrong sending your request.", {
							description: "Check the console for more details.",
						});
					}

					res = false;
				});
		}

		await createUser();

		return res;
	};

	const resetPassword = async (email: string) => {
		toast.promise(pb.collection("users").requestPasswordReset(email), {
			loading: "Sending...",
			success: (data) => {
				return "If your email is registered, you should receive an email shortly.";
			},
			error: (err) => {
				return "An invalid email was provided. Please try again.";
			},
		});

		return;
	};

	async function uploadAvatar(file: File) {
		const formData = new FormData();
		formData.append("avatar", file);

		toast.promise(
			pb.collection("users").update(pb.authStore.model?.id as string, formData),
			{
				loading: "Uploading...",
				success: (data) => {
					setAvatar(
						`${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${data.id}/${data.avatar}`
					);
					return "Successfully uploaded avatar.";
				},
				error: (err) => {
					return "Failed to upload your avatar.";
				},
			}
		);
	}

	async function removeAvatar() {
		toast.promise(
			pb
				.collection("users")
				.update(pb.authStore.model?.id as string, { avatar: null }),
			{
				loading: "Removing...",
				success: (data) => {
					setAvatar(
						`https://api.dicebear.com/7.x/lorelei-neutral/png?seed=${pb.authStore.model?.username}&radius=50`
					);
					return "Successfully removed avatar.";
				},
				error: (err) => {
					return "Failed to reset your avatar.";
				},
			}
		);
	}

	async function uploadBanner(file: File) {
		const formData = new FormData();
		formData.append("banner", file);

		toast.promise(
			pb.collection("users").update(pb.authStore.model?.id as string, formData),
			{
				loading: "Uploading...",
				success: (data) => {
					setBanner(
						`${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${data.id}/${data.banner}`
					);
					return "Successfully uploaded banner.";
				},
				error: (err) => {
					return "Failed to upload your banner.";
				},
			}
		);
	}

	async function removeBanner() {
		toast.promise(
			pb
				.collection("users")
				.update(pb.authStore.model?.id as string, { banner: null }),
			{
				loading: "Removing...",
				success: (data) => {
					setBanner(
						`https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=50`
					);
					return "Successfully removed banner.";
				},
				error: (err) => {
					return "Failed to reset your banner.";
				},
			}
		);
	}

	const deleteAccount = useCallback(async () => {
		toast.promise(
			pb.collection("users").delete(pb.authStore.model?.id as string),
			{
				loading: "Loading...",
				success: (data) => {
					signOut(false);
					return "Successfully deleted your account. So long, partner.";
				},
				error: (err) => {
					return "Something went wrong. Please contact support for assistance.";
				},
			}
		);
	}, []);

	const update = useCallback(async () => {
		await pb
			.collection("users")
			.authRefresh({ expand: "manga_list" })
			.then((response) => {
				setLoggedIn(true);
				setUser(response.record);
				setAvatar(
					response.record?.avatar
						? `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${response.record.id}/${response.record.avatar}`
						: `https://api.dicebear.com/7.x/lorelei-neutral/png?seed=${pb.authStore.model?.username}&radius=50`
				);
				setIsDefaultAvatar(response.record?.avatar ? false : true);

				setBanner(
					pb.authStore.model?.banner
						? `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.banner}`
						: `https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=80`
				);
				setIsDefaultBanner(response.record?.banner ? false : true);

				// Grab the user's OAuth providers
				pb.collection("users")
					.listExternalAuths(response.record.id as string)
					.then((res) => {
						console.log(res);
						if (res) {
							setOauth({
								github: res.find((r) => r.provider === "github") || null,
								google: res.find((r) => r.provider === "google") || null,
								discord: res.find((r) => r.provider === "discord") || null,
							});
						}
					})
					.catch((err) => {
						console.error(err);
					});
			})
			.catch((err: ClientError) => {
				console.error(JSON.stringify(err, null, 2));
				if (err.status === 401) {
					signOut(false);
					toast.warning("Session expired!", {
						description: "Please log in again to continue.",
					});
				} else if (err.isAbort) {
					console.log("Aborted request.");
				} else if (err.status === 0) {
					toast.warning("Failed to connect to the database.", {
						description: "Some functionality may not work.",
						action: {
							label: "Retry",
							onClick: async () => await update(),
						},
						dismissible: true,
						duration: Infinity,
					});
				} else {
					toast.warning("Failed to update state.", {
						description: "You may need to log in again.",
					});
				}
			});
	}, []);

	useEffect(() => {
		// Once we are in the client, we can allow the provider to render children
		setMounted(true);

		// Check if the user has a valid session
		if (pb.authStore.isValid) {
			// Get the updated state from the server and update the context
			update();

			// Grab the user's OAuth providers
			pb.collection("users")
				.listExternalAuths(pb.authStore.model?.id as string)
				.then((res) => {
					console.log(res);
					if (res) {
						setOauth({
							github: res.find((r) => r.provider === "github") || null,
							google: res.find((r) => r.provider === "google") || null,
							discord: res.find((r) => r.provider === "discord") || null,
						});
					}
				})
				.catch((err) => {
					console.error(err);
				});

			// Subscribe to changes to the user's record
			pb.collection("users").subscribe(pb.authStore.model?.id, (res) => {
				switch (res.action.toLowerCase()) {
					case "update": {
						// Any updates to the record will be reflected in the context
						console.log(res.action);
						console.log(res.record);
						update();
						break;
					}
					case "delete": {
						// If the user's record is deleted, log them out and show a toast
						console.log(res.action);
						console.log(res.record);
						signOut(false);
						toast.warning("Your account has been deleted.");
						break;
					}
				}
			});
		} else {
			// If the user does not have a valid session, log them out and clear the local data
			signOut(false);
		}

		return () => {
			pb.collection("users").unsubscribe();
			setMounted(false);
		};

		// I want to run this effect when the isValid property changes, shut up eslint
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [update, pb.authStore.isValid]);

	const value = React.useMemo(
		() => ({
			authStore: pb.authStore,
			oauth,
			user,

			avatar,
			isDefaultAvatar,
			banner,
			isDefaultBanner,
			loggedIn,

			signIn,
			signOut,

			signInWithOAuth,
			refreshOAuth,
			unlinkOAuth,

			register,
			resetPassword,
			deleteAccount,

			uploadAvatar,
			removeAvatar,

			uploadBanner,
			removeBanner,

			update,
		}),
		[
			avatar,
			banner,
			oauth,
			deleteAccount,
			isDefaultAvatar,
			isDefaultBanner,
			loggedIn,
			update,
			user,
		]
	);

	return (
		<>
			<AuthContext.Provider value={value}>
				{mounted && children}
			</AuthContext.Provider>
		</>
	);
};

export const useAuth = () => {
	const context = React.useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return context;
};
