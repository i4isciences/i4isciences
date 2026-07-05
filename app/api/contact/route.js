import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      organization,
      message,
      interests,
      who,
    } = body;

    const { error } = await resend.emails.send({
      from: "i4iSciences <contact@i4isciences.com>",
      to: ["i4isciences@gmail.com"],
      replyTo: email,

      subject: `New Contact Form Submission - ${name}`,

      html: `
        <div style="font-family:Arial;padding:24px">

          <h2>New Contact Form Submission</h2>

          <hr/>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Organization:</strong> ${organization}</p>

          <p><strong>I am a:</strong> ${who.join(", ")}</p>

          <p><strong>Interested In:</strong> ${interests.join(", ")}</p>

          <br/>

          <h3>Message</h3>

          <p>${message.replace(/\n/g, "<br/>")}</p>

        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (err) {

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );

  }
}