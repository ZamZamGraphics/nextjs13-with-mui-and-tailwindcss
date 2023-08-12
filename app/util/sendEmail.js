import nodemailer from "nodemailer";

// Replace with your SMTP credentials
const smtpOptions = {
  host: process.env.emailHost,
  port: process.env.emailPort,
  secure: true,
  auth: {
    user: "process.env.emailUsername",
    pass: process.env.emailPassword,
  },
};

export const sendEmail = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      ...smtpOptions,
    });

    await transporter.sendMail({
      from: `${process.env.appTitle} ${process.env.emailUsername}`,
      ...data,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.response };
  }
};
