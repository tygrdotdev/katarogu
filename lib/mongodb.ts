import {
	Collection,
	MongoClient,
} from "mongodb";

if (!process.env.DATABASE_URI) {
	throw new Error("Please add your Mongo URI to .env.local");
}

interface UserDoc {
	_id: string;
	username: string;
	github_id: number;
}

interface SessionDoc {
	_id: string;
	expires_at: Date;
	user_id: string;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;
export let userCollection: Collection<UserDoc>;
export let sessionCollection: Collection<SessionDoc>;

if (process.env.NODE_ENV === "development") {
	// In development mode, use a global variable so that the value
	// is preserved across module reloads caused by HMR (Hot Module Replacement).
	let globalWithMongo = global as typeof globalThis & {
		_mongoClientPromise: Promise<MongoClient>;
		_mongoUsersCollection: Collection<UserDoc>;
		_mongoSessionsCollection: Collection<SessionDoc>;
	};

	if (!globalWithMongo._mongoClientPromise) {
		client = new MongoClient(process.env.DATABASE_URI);
		globalWithMongo._mongoClientPromise = client.connect();
		globalWithMongo._mongoUsersCollection = client.db().collection("users");
		globalWithMongo._mongoSessionsCollection = client.db().collection("sessions");
	}

	clientPromise = globalWithMongo._mongoClientPromise;
	sessionCollection = globalWithMongo._mongoSessionsCollection;
	userCollection = globalWithMongo._mongoUsersCollection;
} else {
	// In production mode, it's best to not use a global variable.
	client = new MongoClient(process.env.DATABASE_URI);
	clientPromise = client.connect();
	userCollection = client.db().collection("users");
	sessionCollection = client.db().collection("sessions");
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;