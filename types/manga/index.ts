export default interface Manga {
	collectionId: string;
	collectionName: string;

	id: string;
	created: string;
	updated: string;

	title: string;
	alternative_titles: {
		[key: string]: string;
	};
	cover: string;
	volumes: number;
	chapters: number;
	synopsis: string;
	background: string;
	start_date: string;
	end_date: string;
	nsfw: "nsfw" | "suggestive" | "sfw";
	status: "unpublished" | "publishing" | "finished";
	authors: string[];
	genres: string[];
	media: string[];
	characters: any[];
}
