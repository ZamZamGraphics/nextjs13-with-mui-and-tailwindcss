import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.appURL;
const logo = `${process.env.serverURL}/assets/logo.png`;

export const ResetPasswordEmail = ({ fullName, token, userId }) => {
  const resetPasswordLink = `${baseUrl}/reset?token=${token}&id=${userId}`;
  return (
    <Html>
      <Head />
      <Preview>AL MADINA IT reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Img
              src={logo}
              style={logoStyle}
              width="225"
              height="39"
              alt="AL MADINA IT"
            />
          </Section>
          <Hr style={hr} />
          <Section>
            <Text style={heading}>Hi {fullName},</Text>
            <Text style={text}>
              Someone recently requested a password change for your{" "}
              <strong>AL MADINA IT </strong>
              account. If this was you, you can set a new password here:
            </Text>
            <Section style={{ textAlign: "center" }}>
              <Button pX={20} pY={10} style={button} href={resetPasswordLink}>
                Reset password
              </Button>
            </Section>
            <Text style={text}>
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone.
            </Text>
            <Text style={text}>
              Thank you.
              <br />
              <strong>AL MADINA IT</strong>
            </Text>
            <Hr style={hr} />
            <Text style={footer}>
              Copyright ©2022 AL-MADINA IT | All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ResetPasswordEmail;

const main = {
  backgroundColor: "#f5f5f5",
  padding: "10px 0",
  fontFamily:
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  borderRadius: "10px",
};

const logoStyle = {
  margin: "0 auto",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const heading = {
  fontSize: "22px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const text = {
  fontSize: "18px",
  color: "#484848",
  lineHeight: "1.4",
};

const button = {
  backgroundColor: "#4dac27",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "18px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  width: "250px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  textAlign: "center",
};
