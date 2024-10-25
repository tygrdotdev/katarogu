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
} from "jsx-email";
import * as React from "react";

interface ResetPasswordEmailProps {
	resetToken: string;
}

const baseUrl = process.env.NODE_ENV === "production" ?
	"https://katarogu.tygr.dev" :
	"http://localhost:3000";

export const ResetPasswordEmail = ({
	resetToken,
}: ResetPasswordEmailProps) => (
	<Html>
		<Head />
		<Preview>Password reset request</Preview>
		<Body style={main}>
			<Container style={container}>
				<Img
					src={`${baseUrl}/email/logo.png`}
					width="42"
					height="42"
					alt="Katarogu"
					style={logo}
				/>
				<Heading style={heading}>Password reset request</Heading>
				<Section style={buttonContainer}>
					<Button style={button} height={25} width={100} href={`${baseUrl}/auth/reset?token=${resetToken}`}>
						Reset your password
					</Button>
				</Section>
				<Text style={paragraph}>
					This link will only be valid for the next hour. If you did not request this password reset, please ignore this email.
				</Text>
				<Hr style={hr} />
				<Text style={reportLink}>
					If you are concerned about the security of your account, please contact us at
					{" "}
					<Link href="mailto:support@katarogu.tygr.dev">
						support@katarogu.tygr.dev
					</Link>
				</Text>
			</Container>
		</Body>
	</Html>
);

ResetPasswordEmail.PreviewProps = {
	resetToken: "very-real-reset-token",
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;

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
