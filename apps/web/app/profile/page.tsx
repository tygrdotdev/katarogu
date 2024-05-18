"use client";

import { useQueryState } from "nuqs";
import ProtectedPage from "@/components/auth/protected";
import { useAuth } from "@/components/auth/provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileStats from "./overview";
import ProfileAnimeList from "./anime";
import ProfileMangaList from "./manga";
import ProfileHeader from "@/components/profile/header";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
	const [currentTab, setCurrentTab] = useQueryState("tab");
	const { user } = useAuth();

	return (
		<ProtectedPage>
			{user && (
				<>
					<div className="flex h-full w-full flex-col sm:gap-2 md:gap-4">
						<ProfileHeader>
							<Link href="/account">
								<Button size="sm">Edit Account</Button>
							</Link>
						</ProfileHeader>
						<div className="flex flex-row items-center gap-3 px-2">
							<div className="flex w-full flex-col gap-3">
								<Tabs
									defaultValue="overview"
									className="w-full"
									value={currentTab ?? "overview"}
									onValueChange={(e) => setCurrentTab(e)}
								>
									<TabsList className="w-full justify-start">
										<TabsTrigger value="overview" className="w-full">
											Overview
										</TabsTrigger>
										<TabsTrigger value="manga" className="w-full">
											Manga List
										</TabsTrigger>
										<TabsTrigger value="anime" className="w-full">
											Anime List
										</TabsTrigger>
									</TabsList>
									<TabsContent value="overview">
										<ProfileStats />
									</TabsContent>
									<TabsContent value="manga">
										<ProfileMangaList />
									</TabsContent>
									<TabsContent value="anime">
										<ProfileAnimeList />
									</TabsContent>
								</Tabs>
							</div>
						</div>
					</div>
				</>
			)}
		</ProtectedPage>
	);
}
