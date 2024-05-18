import { MangaProgress } from "../manga/progress";

export interface User {
	avatar: string;
	banner: string;
	collectionId: string;
	collectionName: string;
	created: string;
	emailVisibility: boolean;
	expand?: {
		manga_list: MangaProgress[];
	};
	id: string;
	manga_list: string[];
	name: string;
	updated: string;
	username: string;
	verified: boolean;
	visibility: string;
}
