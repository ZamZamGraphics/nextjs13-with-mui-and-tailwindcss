import {
  Body,
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

const appTitle = process.env.appTitle;
const logo = `${process.env.serverURL}/assets/logo.png`;

export const ResetSuccessEmail = () => {
  return (
    <Html>
      <Head />
      <Preview>Password has been successfully changed</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Img
              src={logo}
              style={logoStyle}
              width="225"
              height="39"
              alt={appTitle}
            />
          </Section>
          <Hr style={hr} />
          <Section>
            <Text style={text}>Your password has been changed</Text>
            <Text style={text}>
              Thank you.
              <br />
              <strong>{appTitle}</strong>
            </Text>
            <Hr style={hr} />
            <Text style={footer}>
              Copyright ©2022 {appTitle} | All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ResetSuccessEmail;

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

const text = {
  fontSize: "18px",
  color: "#484848",
  lineHeight: "1.4",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  textAlign: "center",
};
