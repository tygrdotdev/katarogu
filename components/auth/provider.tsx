"use client";

import { pb } from "@/lib/pocketbase";
import React, { useCallback, useEffect } from "react";
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
    isDefaultAvatar: boolean;
    banner: string;
    isDefaultBanner: boolean;

    signIn: (email: string, password: string) => Promise<boolean>;
    signOut: () => void;

    register: (name: string, username: string, email: string, password: string, passwordConfirm: string) => Promise<boolean>;
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
    loggedIn: pb.authStore.isValid,

    avatar: pb.authStore.model?.avatar ?
        `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.avatar}` :
        `https://api.dicebear.com/7.x/lorelei-neutral/png?seed=${pb.authStore.model?.username}&radius=50`,

    isDefaultAvatar: pb.authStore.model?.avatar ? false : true,

    banner: pb.authStore.model?.banner ?
        `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.banner}` :
        `https://preview.redd.it/jn8jyih8obj71.jpg?width=1060&format=pjpg&auto=webp&s=00093bf1491726eea4a752290353e0e169522b66`,

    isDefaultBanner: pb.authStore.model?.banner ? false : true,

    signIn: async () => false,
    signOut: () => { },

    register: async () => false,
    resetPassword: async () => { },

    uploadAvatar: async () => { },
    removeAvatar: async () => { },

    uploadBanner: async () => { },
    removeBanner: async () => { },

    deleteAccount: async () => { },

    update: async () => { }
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = React.useState(false);

    const [loggedIn, setLoggedIn] = React.useState(pb.authStore.isValid);
    const [user, setUser] = React.useState(pb.authStore.model);
    const [avatar, setAvatar] = React.useState(pb.authStore.model?.avatar ?
        `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.avatar}` :
        `https://api.dicebear.com/7.x/lorelei-neutral/png?seed=${pb.authStore.model?.username}&radius=50`);
    const [isDefaultAvatar, setIsDefaultAvatar] = React.useState(pb.authStore.model?.avatar ? false : true);
    const [banner, setBanner] = React.useState(pb.authStore.model?.banner ?
        `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.banner}` :
        `https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=80?w=1380&t=st=1705966073~exp=1705966673~hmac=b8a5b4d0ece52da95b8c863cfde28ef6c9355603a80dea71cbd1412fa5bcdb78`)
    const [isDefaultBanner, setIsDefaultBanner] = React.useState(pb.authStore.model?.banner ? false : true);

    const signIn = async (email: string, password: string) => {
        let res = false;
        await pb.collection("users").authWithPassword(email, password).then((record) => {
            setLoggedIn(true);
            setUser(pb.authStore.model);
            update(false);
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

    const signOut = (msg = true) => {
        setUser(null);
        setLoggedIn(false);
        setAvatar("");
        setBanner("");
        setIsDefaultAvatar(false);
        setIsDefaultBanner(false);

        pb.authStore.clear();
        if (msg) toast.success("Logged out. See you soon!")
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

    async function uploadAvatar(file: File) {
        const formData = new FormData();
        formData.append("avatar", file);

        toast.promise(pb.collection("users").update(pb.authStore.model?.id as string, formData),
            {
                loading: "Uploading...",
                success: (data) => {
                    setAvatar(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${data.id}/${data.avatar}`);
                    return "Successfully uploaded avatar.";
                },
                error: (err) => {
                    return "Failed to upload avatar. Please try again later."
                }
            })
    }

    async function removeAvatar() {
        toast.promise(pb.collection("users").update(pb.authStore.model?.id as string, { avatar: null }),
            {
                loading: "Removing...",
                success: (data) => {
                    setAvatar(`${process.env.NEXT_PUBLIC_URL}/assets/auth/avatar.jpg`);
                    return "Successfully removed avatar.";
                },
                error: (err) => {
                    return "Failed to remove avatar. Please try again later."
                }
            });
    }

    async function uploadBanner(file: File) {
        const formData = new FormData();
        formData.append("banner", file);

        toast.promise(pb.collection("users").update(pb.authStore.model?.id as string, formData),
            {
                loading: "Uploading...",
                success: (data) => {
                    setBanner(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${data.id}/${data.banner}`);
                    return "Successfully uploaded banner.";
                },
                error: (err) => {
                    return "Failed to upload banner. Please try again later."
                }
            })
    }

    async function removeBanner() {
        toast.promise(pb.collection("users").update(pb.authStore.model?.id as string, { banner: null }),
            {
                loading: "Removing...",
                success: (data) => {
                    setBanner(`${process.env.NEXT_PUBLIC_URL}/assets/auth/banner.jpg`);
                    return "Successfully removed banner.";
                },
                error: (err) => {
                    return "Failed to remove banner. Please try again later."
                }
            })
    }

    const deleteAccount = useCallback(async () => {
        toast.promise(pb.collection("users").delete(pb.authStore.model?.id as string), {
            loading: "Deleting...",
            success: (data) => {
                signOut(false);
                return "Successfully deleted your account. So long, partner.";
            },
            error: (err) => {
                return "Something went wrong. Please try again later.";
            }
        })
    }, []);

    async function update(authRefresh = true) {
        if (authRefresh) {
            await pb.collection("users").authRefresh().then((response) => {
                setLoggedIn(true);
                setUser(response.record);
                setAvatar(response.record?.avatar ?
                    `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${response.record.id}/${response.record.avatar}` :
                    `https://api.dicebear.com/7.x/lorelei-neutral/png?seed=${pb.authStore.model?.username}&radius=50`);
                setIsDefaultAvatar(response.record?.avatar ? false : true);

                setBanner(pb.authStore.model?.banner ?
                    `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.banner}` :
                    `https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=80`)
                setIsDefaultBanner(response.record?.banner ? false : true);
            }).catch((err: ClientError) => {
                console.error(err)
                if (err.status === 401) {
                    signOut(false);
                    toast.warning("Session expired!", {
                        description: "Please log in again to continue."
                    });
                }
            })
        } else {
            setLoggedIn(true);
            setUser(pb.authStore.model);
            setAvatar(pb.authStore.model?.avatar ?
                `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.avatar}` :
                `https://api.dicebear.com/7.x/lorelei-neutral/png?seed=${pb.authStore.model?.username}&radius=50`);
            setIsDefaultAvatar(pb.authStore.model?.avatar ? false : true);

            setBanner(pb.authStore.model?.banner ?
                `${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/_pb_users_auth_/${pb.authStore.model.id}/${pb.authStore.model.banner}` :
                `https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=80`)
            setIsDefaultBanner(pb.authStore.model?.banner ? false : true);
        }
    }

    useEffect(() => {
        setMounted(true);

        // check if a model exists and if it's valid
        if (pb.authStore.model && !pb.authStore.isValid) {
            signOut(false);
            toast.warning("Session expired!", {
                description: "Please log in again to continue."
            });
        } else if (pb.authStore.model && pb.authStore.isValid) {
            pb.collection("users").subscribe(pb.authStore.model.id, (res) => {
                // If email has changed, the cookie is invalidated and the user is logged out.
                console.log(res.record)
                // if (res.record.email !== user?.email) {
                //     setUser(null);
                //     pb.authStore.clear();
                //     toast.info("Head's up!", {
                //         description: "We noticed that your email changed. Please log in again to continue.",
                //         duration: 10000
                //     });
                // }
                update(false);
            })
        } else {
            setLoggedIn(false);
            setUser(null);
        }

        return () => {
            pb.collection("users").unsubscribe("*");
            setMounted(false);
        }
    }, [pb.authStore.isValid])

    const value = React.useMemo(() => ({
        authStore: pb.authStore,

        user,
        avatar,
        isDefaultAvatar,
        banner,
        isDefaultBanner,
        loggedIn,

        signIn,
        signOut,

        register,
        resetPassword,
        deleteAccount,

        uploadAvatar,
        removeAvatar,

        uploadBanner,
        removeBanner,

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