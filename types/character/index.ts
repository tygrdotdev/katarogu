export default interface Character {
	created: string;
	updated: string;
	english_name: string;
	japanese_name: string;
	alternate_names: string[];
	cover: string;
	anime_relations: { role: "main" | "supporting" | "background", id: string }[];
	manga_relations: { role: "main" | "supporting" | "background", id: string }[];
	biography: string;
	media: string[];
}