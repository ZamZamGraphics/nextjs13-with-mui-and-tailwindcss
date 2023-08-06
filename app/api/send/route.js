import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import ResetPasswordEmail from "../../components/reset-password";
import { sendEmail } from "../../util/sendEmail";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, subject, fullname, token, userId } = body;

    const data = await sendEmail({
      to: email,
      subject: subject,
      html: render(
        <ResetPasswordEmail fullName={fullname} token={token} userId={userId} />
      ),
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
