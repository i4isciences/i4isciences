import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Escape user-supplied text before it goes into the notification email's HTML.
const esc = (v) =>
  String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(req) {
  try {
    const formData = await req.formData();

    // This endpoint does not accept files. Reject any upload outright.
    for (const [, value] of formData.entries()) {
      if (typeof value !== "string") {
        return NextResponse.json(
          { success: false, error: "File uploads are not accepted." },
          { status: 400 }
        );
      }
    }

    if (formData.get("privacyConsent") !== "true") {
      return NextResponse.json(
        { success: false, error: "You must confirm you have read the Applicant Privacy Notice." },
        { status: 400 }
      );
    }

    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const industry = (formData.get("industry") || "").toString().trim();
    const role = (formData.get("role") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();
    const cvLink = (formData.get("cvLink") || "").toString().trim();

    if (!name || !email || !industry || !role) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (cvLink && !/^https?:\/\/\S+\.\S+$/i.test(cvLink)) {
      return NextResponse.json(
        { success: false, error: "The CV or profile link must start with http:// or https://." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "i4iSciences Careers <careers@i4isciences.com>",
      to: ["i4isciences@gmail.com", "hr@i4isciences.com"],
      replyTo: email,

      subject: `New Career Interest — ${name.replace(/[\r\n]+/g, " ")}`,

      html: `
        <div style="font-family:Arial;padding:24px">
          <h2>New Career Interest Submission</h2>
          <hr/>
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Email:</strong> ${esc(email)}</p>
          <p><strong>Career interest / industry:</strong> ${esc(industry)}</p>
          <p><strong>Role:</strong> ${esc(role)}</p>
          <p><strong>CV / profile link:</strong> ${cvLink ? `<a href="${esc(cvLink)}">${esc(cvLink)}</a>` : "—"}</p>
          <br/>
          <h3>Message</h3>
          <p>${message ? esc(message).replace(/\n/g, "<br/>") : "—"}</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
