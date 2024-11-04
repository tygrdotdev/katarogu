"use server";

import client from "@/lib/mongodb";
import PersonCollection from "@/types/database/person";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ query: string }> }) {
	const { query } = await params;

	await client.connect();
	const people = await client.db().collection<PersonCollection>("characters").find({ name: { $regex: query, $options: "i" } }).toArray();

	return NextResponse.json(people);
}