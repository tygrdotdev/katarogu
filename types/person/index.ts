export default interface Person {
	name: string;
	given_name: string;
	family_name: string;
	alternate_names: string[];
	anime_relations: {
		role: "director" | "writer" | "voice_actor" | "producer" | "composer" | "editor" | "artist", id: string
	}[];
	manga_relations: { role: "author" | "writier" | "artist", id: string }[];
	biography: string;
	cover: string;
}