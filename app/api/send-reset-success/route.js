import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import ResetSuccessEmail from "../../components/reset-success";
import { sendEmail } from "../../util/sendEmail";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, subject } = body;

    const data = await sendEmail({
      to: email,
      subject: subject,
      html: render(<ResetSuccessEmail />),
    });

    if (!data.success) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
