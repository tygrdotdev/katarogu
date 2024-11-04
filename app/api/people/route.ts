import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
	await client.connect();
	const people = await client.db().collection("people").find().limit(50).toArray();

	return NextResponse.json(people);
}