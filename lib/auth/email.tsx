import { alphabet, generateRandomString } from "oslo/crypto";
import client from "../mongodb";
import { createTransport } from "nodemailer";
import { render } from "@react-email/components";
import VerifyAccountEmail from "./emails/verify-email";

export async function generateEmailVerificationCode(userId: string, email: string): Promise<string> {
	await client.connect();

	// Remove all existing codes for this email
	const existing_codes = client.db().collection("verification_codes").find({ $or: [{ email: email }, { user_id: userId }] });

	for await (const code of existing_codes) {
		await client.db().collection("verification_codes").deleteOne({ _id: code._id });
	}

	// Generate a new code
	const code = generateRandomString(6, alphabet("0-9"));

	// Insert the new code
	await client.db().collection("verification_codes").insertOne({
		user_id: userId,
		email,
		code,
		expires_at: new Date(Date.now() + 1000 * 60 * 15) // 15 minutes
	});

	await client.close();

	return code;
}

export async function sendVerificationEmail(email: string, code: string) {
	const transporter = createTransport({
		host: process.env.SMTP_HOST,
		secure: process.env.SMTP_SECURE === "true" ?? false,
		port: parseInt(process.env.SMTP_PORT!),
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD
		},
		debug: process.env.NODE_ENV === "development"
	});

	const emailHTML = await render(<VerifyAccountEmail verificationCode={code} />);

	const info = await transporter.sendMail({
		from: process.env.SMTP_FROM,
		to: email,
		subject: "Verify your account",
		html: emailHTML
	});

	await transporter.sendMail(info).then((res) => {
		console.log(res);
	}).catch((err) => {
		console.error(err);
	})
}