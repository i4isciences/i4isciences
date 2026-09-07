import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const industry = (formData.get("industry") || "").toString().trim();
    const role = (formData.get("role") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();
    const resume = formData.get("resume");

    if (!name || !email || !industry || !role) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const attachments = [];
    if (resume && typeof resume === "object" && "arrayBuffer" in resume && resume.size > 0) {
      if (resume.size > MAX_RESUME_BYTES) {
        return NextResponse.json(
          { success: false, error: "Resume must be under 5MB." },
          { status: 400 }
        );
      }
      const bytes = await resume.arrayBuffer();
      attachments.push({
        filename: resume.name || "resume.pdf",
        content: Buffer.from(bytes),
      });
    }

    const { error } = await resend.emails.send({
      from: "i4iSciences Careers <careers@i4isciences.com>",
      to: ["i4isciences@gmail.com"],
      replyTo: email,

      subject: `New Career Interest — ${name}`,

      html: `
        <div style="font-family:Arial;padding:24px">
          <h2>New Career Interest Submission</h2>
          <hr/>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Career interest / industry:</strong> ${industry}</p>
          <p><strong>Role:</strong> ${role}</p>
          <br/>
          <h3>Message</h3>
          <p>${message ? message.replace(/\n/g, "<br/>") : "—"}</p>
        </div>
      `,

      attachments,
    });

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
