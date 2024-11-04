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
	/// TODO
	nsfw: "nsfw" | "suggestive" | "sfw";
	status: "unpublished" | "publishing" | "finished";
	/// TODO
	authors: string[];
	genres: string[];
	/// TODO
	media: string[];
	characters: any[];
}