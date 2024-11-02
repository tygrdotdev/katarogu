"use server";

import client from "@/lib/mongodb";
import { CharacterCollection } from "@/types/database/character";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ query: string }> }) {
	const { query } = await params;

	await client.connect();
	const characters = await client.db().collection<CharacterCollection>("characters").find({ english_name: { $regex: query, $options: "i" } }).toArray();

	return NextResponse.json(characters);
}