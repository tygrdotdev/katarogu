import * as Minio from "minio"

const minio = new Minio.Client({
	endPoint: process.env.NODE_ENV === "production" ? process.env.S3_ENDPOINT! : "127.0.0.1",
	port: process.env.NODE_ENV === "production" ? parseInt(process.env.S3_PORT!) : 9000,
	useSSL: process.env.S3_SECURE === "true",
	accessKey: process.env.S3_ACCESS_KEY!,
	secretKey: process.env.S3_SECRET_KEY!
});

export default minio;