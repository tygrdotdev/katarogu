import Character from "@/types/character";

export interface CharacterCollection extends Character {
	created: Date;
	updated: Date;
	_id: string;
}