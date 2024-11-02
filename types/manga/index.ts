export default interface Manga {
	created: string;
	updated: string;
	english_title: string;
	japanese_title: string;
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