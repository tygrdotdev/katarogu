import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components";
import * as React from "react";

interface VerifyAccountEmailProps {
	verificationCode: string;
}

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "https://beta.katarogu.tygr.dev";

export const VerifyAccountEmail = ({
	verificationCode,
}: VerifyAccountEmailProps) => (
	<Html>
		<Head />
		<Preview>Welcome to Katarogu!</Preview>
		<Body style={main}>
			<Container style={container}>
				<Img
					src={`${baseUrl}/email/logo.png`}
					width="42"
					height="42"
					alt="Katarogu"
					style={logo}
				/>
				<Heading style={heading}>Welcome to Katarogu!</Heading>
				<Section style={buttonContainer}>
					<Button style={button} href={`${baseUrl}/auth/verify?code=${verificationCode}`}>
						Verify Account
					</Button>
				</Section>
				<Text style={paragraph}>
					This link and code will only be valid for the next 15 minutes. If the
					link does not work, you can use the login verification code directly:
				</Text>
				<code style={code}>{verificationCode}</code>
				<Hr style={hr} />
				<Link href="https://tygr.dev" style={reportLink}>
					By @tygrdev
				</Link>
			</Container>
		</Body>
	</Html>
);

VerifyAccountEmail.PreviewProps = {
	verificationCode: "123456",
} as VerifyAccountEmailProps;

export default VerifyAccountEmail;

const logo = {
	width: 42,
	height: 42,
};

const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: "0 auto",
	padding: "20px 0 48px",
	maxWidth: "560px",
};

const heading = {
	fontSize: "24px",
	letterSpacing: "-0.5px",
	lineHeight: "1.3",
	fontWeight: "400",
	color: "#484848",
	padding: "17px 0 0",
};

const paragraph = {
	margin: "0 0 15px",
	fontSize: "15px",
	lineHeight: "1.4",
	color: "#3c4149",
};

const buttonContainer = {
	padding: "27px 0 27px",
};

const button = {
	backgroundColor: "#121212",
	borderRadius: "3px",
	fontWeight: "600",
	color: "#fff",
	fontSize: "15px",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "block",
	padding: "11px 23px",
};

const reportLink = {
	fontSize: "14px",
	color: "#b4becc",
};

const hr = {
	borderColor: "#dfe1e4",
	margin: "42px 0 26px",
};

const code = {
	fontFamily: "monospace",
	fontWeight: "700",
	padding: "1px 4px",
	backgroundColor: "#dfe1e4",
	letterSpacing: "-0.3px",
	fontSize: "21px",
	borderRadius: "4px",
	color: "#3c4149",
};
