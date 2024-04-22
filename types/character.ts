import Manga from "./manga";

export default interface Character {
	id: string;
	name: string;
	portrait: string;
	biography: string;
	manga: Manga[];
}