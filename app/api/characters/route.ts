import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
	await client.connect();
	const characters = await client.db().collection("characters").find().limit(50).toArray();

	return NextResponse.json(characters);
}