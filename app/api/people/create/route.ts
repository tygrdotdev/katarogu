import { generateIdFromEntropySize } from "@/auth/crypto";
import { getCurrentSession } from "@/auth/sessions";
import client from "@/lib/mongodb";
import { MAX_FILE_SIZE } from "@/lib/utils";
import PersonCollection from "@/types/database/person";
import Person from "@/types/person";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const { user } = await getCurrentSession();

	if (!user) return Response.json({ error: true, message: "Unauthorized" }, { status: 401 });

	const person: Person & { id: string } = await req.json();

	if (typeof person.name === undefined || typeof person.name !== "string") {
		return Response.json({ error: true, message: "Name is required" }, { status: 400 });
	}

	if (person.name.length < 1 || person.name.length > 32) {
		return Response.json({ error: true, message: "Name must be between 1 and 32 characters" }, { status: 400 });
	}

	if (typeof person.given_name === undefined || typeof person.given_name !== "string") {
		return Response.json({ error: true, message: "Given name is required" }, { status: 400 });
	}

	if (person.given_name.length < 1 || person.given_name.length > 32) {
		return Response.json({ error: true, message: "Given name must be between 1 and 32 characters" }, { status: 400 });
	}

	if (typeof person.family_name === undefined || typeof person.family_name !== "string") {
		return Response.json({ error: true, message: "Family name is required" }, { status: 400 });
	}

	if (person.family_name.length < 1 || person.family_name.length > 32) {
		return Response.json({ error: true, message: "Family name must be between 1 and 32 characters" }, { status: 400 });
	}

	if (typeof person.biography === undefined || typeof person.biography !== "string") {
		return Response.json({ error: true, message: "Biography is required" }, { status: 400 });
	}

	if (person.biography.length < 2 || person.biography.length > 500) {
		return Response.json({ error: true, message: "Biography must be between 2 and 500 characters" }, { status: 400 });
	}

	const id = person.id ?? generateIdFromEntropySize(10);

	await client.connect();
	await client.db().collection<Omit<PersonCollection, "cover"> & { cover: any }>("people").insertOne({
		_id: id,
		created: new Date(),
		updated: new Date(),
		name: person.name,
		given_name: person.given_name,
		family_name: person.family_name,
		alternate_names: [],
		anime_relations: [],
		manga_relations: [],
		biography: person.biography,
		cover: null
	});

	return Response.json({ error: false, message: "Person created successfully" }, { status: 200 });
}
