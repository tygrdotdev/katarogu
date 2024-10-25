import { Collection, MongoClient, MongoClientOptions } from "mongodb";

if (!process.env.DATABASE_URI) {
	throw new Error('Invalid/Missing environment variable: "DATABASE_URI"');
}

const uri = process.env.DATABASE_URI;
const options: MongoClientOptions = {
	appName: "Katarogu"
};

interface UserDoc {
	_id: string;
	name: string;
	username: string;
	email: string;
	email_verified: boolean;
	avatar: string;
	banner: string;
	two_factor_secret: string | null;
}

interface SessionDoc {
	_id: string;
	expires_at: Date;
	user_id: string;
}

let client: MongoClient;
export let userCollection: Collection<UserDoc>;
export let sessionCollection: Collection<SessionDoc>;

if (process.env.NODE_ENV === "development") {
	// In development mode, use a global variable so that the value
	// is preserved across module reloads caused by HMR (Hot Module Replacement).
	const globalWithMongo = global as typeof globalThis & {
		_mongoClient?: MongoClient;
		_mongoUsersCollection: Collection<UserDoc>;
		_mongoSessionsCollection: Collection<SessionDoc>;
	};

	if (!globalWithMongo._mongoClient) {
		globalWithMongo._mongoClient = new MongoClient(uri, options);
	}

	client = globalWithMongo._mongoClient;
	await client.connect();

	if (!globalWithMongo._mongoUsersCollection) {
		const db = client.db();
		globalWithMongo._mongoUsersCollection = db.collection<UserDoc>("users");
	}

	userCollection = globalWithMongo._mongoUsersCollection;

	if (!globalWithMongo._mongoSessionsCollection) {
		const db = client.db();
		globalWithMongo._mongoSessionsCollection = db.collection<SessionDoc>("sessions");
	}

	sessionCollection = globalWithMongo._mongoSessionsCollection;
} else {
	// In production mode, it's best to not use a global variable.
	client = new MongoClient(uri, options);
	await client.connect();
	userCollection = client.db().collection<UserDoc>("users");
	sessionCollection = client.db().collection<SessionDoc>("sessions");
}

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default client;