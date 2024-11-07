import { generateIdFromEntropySize } from "@/auth/crypto";
import { getCurrentSession } from "@/auth/sessions";
import client from "@/lib/mongodb";
import { MAX_FILE_SIZE } from "@/lib/utils";
import Character from "@/types/character";
import { CharacterCollection } from "@/types/database/character";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const { user } = await getCurrentSession();

	if (!user) return Response.json({ error: true, message: "Unauthorized" }, { status: 401 });

	const character: Character & { id: string } = await req.json();

	if (typeof character.english_name === undefined || typeof character.english_name !== "string") {
		return Response.json({ error: true, message: "English name is required" }, { status: 400 });
	}

	if (character.english_name.length < 2 || character.english_name.length > 32) {
		return Response.json({ error: true, message: "English name must be between 2 and 32 characters" }, { status: 400 });
	}

	if (typeof character.japanese_name === undefined || typeof character.japanese_name !== "string") {
		return Response.json({ error: true, message: "Japanese name is required" }, { status: 400 });
	}

	if (character.japanese_name.length < 1 || character.japanese_name.length > 32) {
		return Response.json({ error: true, message: "Japanese name must be between 2 and 32 characters" }, { status: 400 });
	}

	if (typeof character.biography === undefined || typeof character.biography !== "string") {
		return Response.json({ error: true, message: "Biography is required" }, { status: 400 });
	}

	if (character.biography.length < 2 || character.biography.length > 500) {
		return Response.json({ error: true, message: "Biography must be between 2 and 500 characters" }, { status: 400 });
	}

	const id = character.id ?? generateIdFromEntropySize(10);

	await client.connect();
	await client.db().collection<Omit<CharacterCollection, "cover"> & { cover: any }>("characters").insertOne({
		_id: id,
		created: new Date(),
		updated: new Date(),
		status: "pending",
		english_name: character.english_name,
		japanese_name: character.japanese_name,
		alternate_names: character.alternate_names,
		cover: null,
		anime_relations: [],
		manga_relations: [],
		biography: character.biography,
		media: []
	});

	return Response.json({ error: false, message: "Person created successfully" }, { status: 200 });
}
