"use client";

import { useAuth } from "@/components/auth/provider";
import AccountCard from "@/components/account/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Suspense, useState } from "react";
import pb from "@/lib/pocketbase";
import { toast } from "sonner";
import Spinner from "@/components/spinner";
import Alert from "@/components/alert";

export default function AccountPrivacyPage() {
	const {
		user,
		oauth,
		refreshOAuth,
		unlinkOAuth,
		createPasskey,
		deletePasskey,
	} = useAuth();
	const [unlinkGithub, setUnlinkGithub] = useState(false);
	const [unlinkGoogle, setUnlinkGoogle] = useState(false);
	const [unlinkDiscord, setUnlinkDiscord] = useState(false);

	return (
		<>
			{user && (
				<div className="flex flex-col gap-4 pb-4 sm:gap-8">
					<AccountCard
						title="OAuth Providers"
						description="Connect your Katarogu account with a third-party service to enable additional features."
						footer={`You can use OAuth to login to your account quickly and securely.`}
					>
						<div className="flex flex-wrap gap-3">
							{oauth.github ? (
								<Suspense fallback={<Spinner />}>
									<Button
										className="w-fit"
										variant="secondary"
										onClick={() => setUnlinkGithub(true)}
									>
										<Icons.Github className="w-4 h-4 mr-2" />
										Unlink GitHub
									</Button>
									<Alert
										title="Disconnect GitHub?"
										description="Are you sure you want to disconnect your GitHub account?"
										onSubmit={async () => await unlinkOAuth("github")}
										onCancel={() => setUnlinkGithub(false)}
										open={unlinkGithub}
										setOpen={setUnlinkGithub}
									/>
								</Suspense>
							) : (
								<>
									<Button
										className="w-fit"
										variant="outline"
										onClick={async () => {
											await pb
												.collection("users")
												.authWithOAuth2({ provider: "github" })
												.then(async (res) => {
													await refreshOAuth();
												})
												.catch((err) => {
													toast.error(err);
												});
										}}
									>
										<Icons.Github className="w-4 h-4 mr-2" /> Connect with
										GitHub
									</Button>
								</>
							)}
							{oauth.google ? (
								<Suspense fallback={<Spinner />}>
									<Button
										className="w-fit"
										variant="secondary"
										onClick={() => setUnlinkGoogle(true)}
									>
										<Icons.Google className="w-4 h-4 mr-2" />
										Unlink Google
									</Button>
									<Alert
										title="Disconnect Google?"
										description="Are you sure you want to disconnect your Google account?"
										onSubmit={async () => await unlinkOAuth("google")}
										onCancel={() => setUnlinkGoogle(false)}
										open={unlinkGoogle}
										setOpen={setUnlinkGoogle}
									/>
								</Suspense>
							) : (
								<>
									<Button
										className="w-fit"
										variant="outline"
										onClick={async () => {
											await pb
												.collection("users")
												.authWithOAuth2({ provider: "google" })
												.then(async (res) => {
													await refreshOAuth();
												})
												.catch((err) => {
													toast.error(err);
												});
										}}
									>
										<Icons.Google className="w-4 h-4 mr-2" /> Connect with
										Google
									</Button>
								</>
							)}

							{oauth.discord ? (
								<Suspense fallback={<Spinner />}>
									<Button
										className="w-fit"
										variant="secondary"
										onClick={() => setUnlinkDiscord(true)}
									>
										<Icons.Discord className="w-4 h-4 mr-2" />
										Unlink Discord
									</Button>
									<Alert
										title="Disconnect Discord?"
										description="Are you sure you want to disconnect your Discord account?"
										onSubmit={async () => await unlinkOAuth("discord")}
										onCancel={() => setUnlinkDiscord(false)}
										open={unlinkDiscord}
										setOpen={setUnlinkDiscord}
									/>
								</Suspense>
							) : (
								<>
									<Button
										className="w-fit"
										variant="outline"
										onClick={async () => {
											await pb
												.collection("users")
												.authWithOAuth2({ provider: "discord" })
												.then(async (res) => {
													await refreshOAuth();
												})
												.catch((err) => {
													toast.error(err);
												});
										}}
									>
										<Icons.Discord className="w-4 h-4 mr-2" /> Connect with
										Discord
									</Button>
								</>
							)}
						</div>
					</AccountCard>

					<AccountCard
						title="Passkeys"
						description="Create a passkey to use as an alternative to your password."
						footer={`Note: Passkeys are in beta and may not be available to all users.`}
						beta
					>
						<div className="flex flex-row gap-4">
							{user.passkey_id ? (
								<>
									<Button
										className="w-fit"
										variant="destructive"
										onClick={async () => {
											await deletePasskey();
										}}
									>
										<Icons.Passkey className="w-4 h-4 mr-2" /> Remove Passkey
									</Button>
								</>
							) : (
								<Button
									className="w-fit"
									variant="outline"
									onClick={async () => {
										await createPasskey(user.username);
									}}
								>
									<Icons.Passkey className="w-4 h-4 mr-2" /> Create Passkey
								</Button>
							)}
						</div>
					</AccountCard>
				</div>
			)}
		</>
	);
}
