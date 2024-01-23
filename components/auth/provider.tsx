"use client";

import { pb } from "@/lib/pocketbase";
import React, { useEffect } from "react";
import { toast } from "sonner";

interface ClientError {
    url: string;
    status: number;
    response: {
        code: number;
        message: string;
        data: {
            [x: string]: {
                code: string;
                message: string;
            },
        }
    },
    isAbort: boolean;
    originalError: any;
    name: string;
}

export interface AuthSession {
    authStore: typeof pb.authStore;

    user: typeof pb.authStore.model;
    loggedIn: typeof pb.authStore.isValid;

    avatar: string;
    banner: string;

    signIn: (email: string, password: string) => Promise<boolean>;
    signOut: () => void;

    register: (name: string, username: string, email: string, password: string, passwordConfirm: string) => Promise<boolean>;
    resetPassword: (email: string) => Promise<void>;

    update: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthSession>({
    authStore: pb.authStore,

    user: pb.authStore.model,
    loggedIn: pb.authStore.isValid,

    avatar: pb.authStore.model?.avatar ?
        `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.avatar}` :
        `https://api.dicebear.com/7.x/lorelei-neutral/png?seed=${pb.authStore.model?.username}&radius=50`,
    banner: pb.authStore.model?.banner ?
        `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.banner}` :
        `https://preview.redd.it/jn8jyih8obj71.jpg?width=1060&format=pjpg&auto=webp&s=00093bf1491726eea4a752290353e0e169522b66`,

    signIn: async () => false,
    signOut: () => { },

    register: async () => false,
    resetPassword: async () => { },

    update: async () => { }
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = React.useState(false);

    const [loggedIn, setLoggedIn] = React.useState(pb.authStore.isValid);
    const [user, setUser] = React.useState(pb.authStore.model);
    const [avatar, setAvatar] = React.useState(pb.authStore.model?.avatar ?
        `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.avatar}` :
        `https://api.dicebear.com/7.x/lorelei-neutral/png?seed=${pb.authStore.model?.username}&radius=50`);
    const [banner, setBanner] = React.useState(pb.authStore.model?.banner ?
        `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.banner}` :
        `https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=80?w=1380&t=st=1705966073~exp=1705966673~hmac=b8a5b4d0ece52da95b8c863cfde28ef6c9355603a80dea71cbd1412fa5bcdb78`)

    const signIn = async (email: string, password: string) => {
        let res = false;
        await pb.collection("users").authWithPassword(email, password).then((record) => {
            setLoggedIn(true);
            setUser(pb.authStore.model);
            toast.success("Success!", {
                description: `Welcome back, ${record.record.username}`
            });

            res = true;
        }).catch((err: ClientError) => {
            console.error(JSON.stringify(err, null, 2));
            let title = "Invalid ";
            if (err.response.message === "Failed to authenticate.") title += "credentials."
            if (!err.response.data) return toast.error("An unexpected error occured!", {
                description: "Check the console for more details."
            });
            if (err.response.data.identity && err.response.data.identity.code === "validation_required") title += "email"
            if (err.response.data.password && err.response.data.password.code === "validation_required") title.length <= 8 ? title += "password." : title += " and password."

            toast.error(title, {
                description: err.response.message
            });

            res = false;
        })

        return res;
    }

    const signOut = () => {
        setUser(null);
        pb.authStore.clear();
        toast.success("Logged out. See you soon!")
    }

    const register = async (
        name: string,
        username: string,
        email: string,
        password: string,
        passwordConfirm: string,
    ) => {
        let res = false;
        async function createUser() {
            if (!name || name.length < 2) return toast.error("Missing required field!", { description: "Please enter a valid name with at least 2 characters." });
            if (!username || username.length < 2) return toast.error("Missing required field!", { description: "Please enter a valid username with at least 2 characters." });
            if (!email || !email.includes("@")) return toast.error("Missing required field!", { description: "Please enter a valid email." });
            if (!password || password.length < 8 || password.length > 72) return toast.error("Missing required field!", { description: "Please enter a valid password between 3 and 72 characters long." });
            if (password !== passwordConfirm) return toast.error("Passwords mismatch!", { description: "The passwords do not match. Please try again." });

            await pb.collection("users").create({
                name,
                username,
                email,
                password,
                passwordConfirm
            }).then(async () => {
                await pb.collection("users").requestVerification(email);
                toast.success("Success!", {
                    description: "Please check your email for a verification link."
                });
                res = true;
            }).catch((err: ClientError) => {
                if (err.response.data) {
                    let e = Object.values(err.response.data)[0];

                    toast.error("Something went wrong sending your request.", {
                        description: e.message
                    });
                } else {
                    toast.error("Something went wrong sending your request.", {
                        description: "Please try again later."
                    });
                }

                res = false;
            });
        }

        await createUser();

        return res;
    }

    const resetPassword = async (email: string) => {
        toast.promise(pb.collection("users").requestPasswordReset(email), {
            loading: "Sending...",
            success: (data) => {
                return "If your email is registered, you should receive an email shortly.";
            },
            error: (err) => {
                return "An invalid email was provided. Please try again.";
            }
        });

        return;
    }

    async function update() {
        await pb.collection("users").authRefresh().then((response) => {
            setUser(response.record);
            setAvatar(response.record?.avatar ?
                `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${response.record.id}/${response.record.avatar}` :
                `https://api.dicebear.com/7.x/lorelei-neutral/png?seed=${pb.authStore.model?.username}&radius=50`);

            setBanner(pb.authStore.model?.banner ?
                `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.banner}` :
                `https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=80`)
        }).catch((err) => {
            console.error(err);
        })
    }

    useEffect(() => {
        setMounted(true);

        if (pb.authStore.model && pb.authStore.isValid) {
            pb.collection("users").subscribe(pb.authStore.model.id, (res) => {
                // If email has changed, the cookie is invalidated and the user is logged out.
                // if (res.record.email !== user?.email) {
                //     setUser(null);
                //     pb.authStore.clear();
                //     toast.info("Head's up!", {
                //         description: "We noticed that your email changed. Please log in again to continue.",
                //         duration: 10000
                //     });
                // }
                update();
            })
        }

        setLoggedIn(pb.authStore.isValid);
        setUser(pb.authStore.model);

        setAvatar(pb.authStore.model?.avatar ?
            `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.avatar}` :
            `https://api.dicebear.com/7.x/lorelei-neutral/png?seed=${pb.authStore.model?.username}&radius=50`);

        setBanner(pb.authStore.model?.banner ?
            `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.banner}` :
            `https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=80`)

        return () => {
            pb.collection("users").unsubscribe("*");
            setMounted(false);
        }
    }, [pb.authStore.isValid])

    const value = React.useMemo(() => ({
        authStore: pb.authStore,

        user,
        avatar,
        banner,
        loggedIn,

        signIn,
        signOut,

        register,
        resetPassword,

        update,
    }), [avatar, loggedIn, user]);

    return (
        <>
            <AuthContext.Provider value={value}>
                {mounted && children}
            </AuthContext.Provider>
        </>
    )
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}