"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Icons } from "../icons";

export default function OAuthProviders() {
	const router = useRouter();
	return (
		<>
			<div className="w-full flex flex-row gap-4 items-center justify-center">
				<Button
					className="w-full"
					variant="outline"
					onClick={() => {
						console.log("github clicked")
						const popup = window.open(`${process.env.NEXT_PUBLIC_URL}/oauth/github`, "popup", "popup=true, width=600, height=600");
						console.log("popup", popup)
						const checkPopup = setInterval(() => {
							if (!popup) return;
							if (!popup.window.location.href.includes("/oauth")) { popup.close() }
							if (!popup.closed) return;
							clearInterval(checkPopup);
							router.refresh()
						}, 500);
					}}
				>
					<Icons.Github className="w-4 h-4 mr-2" />
					GitHub
				</Button>

				<Button
					className="w-full"
					variant="outline"
					onClick={() => {
						const popup = window.open(`${process.env.NEXT_PUBLIC_URL}/oauth/google`, "popup", "popup=true, width=600, height=600");
						const checkPopup = setInterval(() => {
							if (!popup) return;
							if (popup.window.location.href.includes("/oauth/success")) { popup.close() }
							if (!popup.closed) return;
							clearInterval(checkPopup);
							router.refresh()
						}, 500);
					}}
				>
					<Icons.Google className="w-4 h-4 mr-2" />
					Google
				</Button>

				{/* <Button
						className="w-full"
						variant="outline"
						onClick={async () => await onOAuthSignIn("discord")}
					>
						<Icons.Discord className="w-4 h-4 mr-2" />
						Discord
					</Button> */}
			</div>
		</>
	)
}