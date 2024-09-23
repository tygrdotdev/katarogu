import * as Minio from "minio"

const minio = new Minio.Client({
	endPoint: process.env.NODE_ENV === "production" ? process.env.S3_ENDPOINT! : "127.0.0.1",
	port: process.env.NODE_ENV === "production" ? parseInt(process.env.S3_PORT!) : 9000,
	useSSL: process.env.S3_SECURE === "true",
	accessKey: process.env.S3_ACCESS_KEY!,
	secretKey: process.env.S3_SECRET_KEY!
});

export async function publicBucketExists() {
	const exists = await minio.bucketExists("public");

	if (!exists) {
		await minio.makeBucket("public");
		await minio.setBucketPolicy("public", JSON.stringify({
			"Version": "2012-10-17",
			"Statement": [
				{
					"Sid": "PublicRead",
					"Effect": "Allow",
					"Principal": "*",
					"Action": ["s3:GetObject"],
					"Resource": ["arn:aws:s3:::public/*"]
				}
			]
		}));
	}
}

export default minio;