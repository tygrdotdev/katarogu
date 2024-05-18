"use client";

import { useAuth } from "@/components/auth/provider";
import AccountCard from "@/components/account/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Suspense, useEffect, useState } from "react";
import pb from "@/lib/pocketbase";
import { toast } from "sonner";
import Spinner from "@/components/spinner";

export default function AccountPrivacyPage() {
	const { user, oauth, refreshOAuth } = useAuth();

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
								<>
									<Suspense fallback={<Spinner />}>
										<Button className="w-fit" variant="outline" disabled>
											<Icons.Github className="w-4 h-4 mr-2" />
											Linked with GitHub
										</Button>
									</Suspense>
								</>
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
								<>
									<Suspense fallback={<Spinner />}>
										<Button className="w-fit" variant="outline" disabled>
											<Icons.Google className="w-4 h-4 mr-2" />
											Linked with Google
										</Button>
									</Suspense>
								</>
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
								<>
									<Button className="w-fit" variant="outline" disabled>
										<Icons.Discord className="w-4 h-4 mr-2" /> Linked with
										Discord
									</Button>
								</>
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

					{/* <AccountCard
						title="Passkeys"
						description="Create a passkey to use as an alternative to your password."
						footer={`Note: Passkeys are in beta and may not be available to all users.`}
					>
						<div className="flex flex-row gap-4">
							<Button className="w-fit" variant="outline">
								<Icons.Passkey className="w-4 h-4 mr-2" /> Create Passkey
							</Button>
						</div>
					</AccountCard> */}
				</div>
			)}
		</>
	);
}
