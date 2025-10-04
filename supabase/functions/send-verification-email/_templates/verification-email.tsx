import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "npm:@react-email/components@0.0.22";
import * as React from "npm:react@18.3.1";

interface VerificationEmailProps {
  verificationLink: string;
  email: string;
}

export const VerificationEmail = ({
  verificationLink,
  email,
}: VerificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Verify your FanVerse account</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          <span style={brandText}>FanVerse</span>
        </Heading>
        
        <Section style={section}>
          <Heading style={h2}>Verify Your Email</Heading>
          <Text style={text}>
            Welcome to FanVerse! We're excited to have you join the future of concert experiences.
          </Text>
          
          <Text style={text}>
            Please verify your email address ({email}) by clicking the button below:
          </Text>

          <Section style={buttonContainer}>
            <Link href={verificationLink} style={button}>
              Verify Email Address
            </Link>
          </Section>

          <Text style={textSmall}>
            This link will expire in 24 hours. If you didn't create a FanVerse account, you can safely ignore this email.
          </Text>

          <Section style={divider} />

          <Text style={helpText}>
            <strong>Need help?</strong>
          </Text>
          <Text style={textSmall}>
            • Make sure to check your spam folder if you can't find this email
            <br />
            • The verification link expires after 24 hours
            <br />
            • You can request a new verification email from the sign-in page
          </Text>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            © 2025 FanVerse. All rights reserved.
          </Text>
          <Text style={footerText}>
            Secure concert ticketing with biometric verification
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default VerificationEmail;

// Styles
const main = {
  backgroundColor: "#0a0a0a",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
};

const brandText = {
  background: "linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontSize: "32px",
  fontWeight: "bold",
};

const h1 = {
  textAlign: "center" as const,
  marginBottom: "40px",
};

const h2 = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 20px",
  textAlign: "center" as const,
};

const section = {
  backgroundColor: "#1a1a1a",
  border: "1px solid #2a2a2a",
  borderRadius: "12px",
  padding: "32px",
};

const text = {
  color: "#e5e5e5",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const textSmall = {
  color: "#a3a3a3",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "12px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#06b6d4",
  borderRadius: "8px",
  color: "#000000",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 32px",
  boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
};

const divider = {
  borderTop: "1px solid #2a2a2a",
  margin: "24px 0",
};

const helpText = {
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "bold",
  margin: "16px 0 8px",
};

const footer = {
  marginTop: "32px",
  paddingTop: "24px",
  borderTop: "1px solid #2a2a2a",
};

const footerText = {
  color: "#737373",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  margin: "4px 0",
};
