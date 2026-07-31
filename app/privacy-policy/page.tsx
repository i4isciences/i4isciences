import type { Metadata } from "next";

import LegalDocument from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how i4iSciences collects, uses, and protects personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="i4iSciences Privacy Policy"
      intro="Effective date: [July 6th 2026] Last updated: [Aug 1 st 2026]"
      sections={[
        {
          title: "1. Who this policy covers",
          paragraphs: [
            'This policy explains how I4I Sciences LLC, operating as i4iSciences ("i4iSciences," "we," "us," "our"), collects, uses, discloses, and protects information when you interact with:',
          ],
          items: [
            "Our website at i4isciences.com and our regional sites (.in, .us, .ca);",
            "Our platform and mobile experiences, including account creation, dashboards, and AI-assisted learning tools;",
            "Our programs and sub-brands, including Teach the Teacher, OneCent Tutors, the Immigrant Parent Support Program (IPST), AI Olympiad, and LabTricks;",
            "Our careers page and job application process; and",
            "Any other service that links to this policy.",
            "This policy applies to students, parents and guardians, teachers, tutors, institutional partners, job applicants, and visitors. If you are a parent or guardian reviewing this on behalf of a child, Section 4 is written specifically for you.",
            "If you do not agree with the practices described here, please do not use our services. Questions can be directed to executive@i4isciences.com, manager@i4isciences.in",
          ],
        },
        {
          title: "2. The short version",
          paragraphs: [
            "For readers who want the summary before the detail:",
          ],
          items: [
            "We serve children, and we take that seriously. Where a child under the applicable age threshold uses our services, we require verifiable consent from a parent or guardian before we collect personal information, and we limit what we collect from that child to what the service genuinely needs.",
            "We do not sell personal information. We do not exchange your data, or your child's data, for money.",
            "We use artificial intelligence to deliver parts of our service — tutoring support, translation, content generation, and administrative automation — and we tell you where AI is involved and what stays under human review.",
            "We share information only with the vendors who help us run the service (hosting, communications, payment processing, AI processing) under contracts that restrict what they can do with it, and with law enforcement or regulators only where legally required.",
            "Your rights depend on where you live. We describe the specific rights available to residents of the United States, the European Economic Area and United Kingdom, Canada, and India in Section 12, because the law is not the same in each place and we do not want to overstate what any one region's law actually gives you.",
            "You can reach a real person about your data. Use the contact details in Section 15, and we aim to respond within the timeframe required by the law that applies to you.",
          ],
        },
        {
          title: "3. Information we collect",
          paragraphs: [
            "3.1 Information you provide directly",
            "Identity and contact information: Name, email address, phone number, mailing address, date of birth (Applies to: All registered users)",
            "Account credentials: Username, password (stored in hashed form), security questions (Applies to: All registered users)",
            "Guardian and family information: Parent/guardian name and contact details, relationship to student, household information relevant to family programs (Applies to: Students under the age of majority; IPST participants)",
            "Academic and learning information: Grade level, subjects studied, assessment results, tutoring session history, AI Olympiad submissions, coursework and lab activity through LabTricks (Applies to: Students)",
            "Teacher certification information: Credentials, prior teaching experience, certification exam results, professional references (Applies to: Teach the Teacher applicants and enrollees)",
            "Employment application information: Resume or CV, cover letter, work history, references, responses to screening questions (Applies to: Careers applicants)",
            "Payment information: Billing name and address, and payment card or bank details, processed through our payment processor (Applies to: Paying customers)",
            "Communications: Messages you send us through forms, email, chat, or support tickets, including AI chatbot conversations (Applies to: Any user who contacts us)",
            "3.2 Information collected automatically",
            "When you use our website or platform, our systems automatically collect technical information, including your IP address, device and browser type, operating system, pages visited, time spent on the platform, referring URLs, and general location inferred from your IP address. We collect this through server logs, analytics tools, and the cookies and similar technologies described in Section 8.",
            "3.3 Information collected through identity and account verification",
            "To verify accounts and reduce fraud, we use a one-time password (OTP) system delivered by SMS or WhatsApp through our messaging provider. This process collects and temporarily processes your phone number and the verification code sent to it. We retain a record that verification occurred; we do not retain the content of the OTP message beyond what is operationally necessary.",
            "3.4 Information we do not seek to collect",
            "We do not intentionally collect sensitive categories of information — such as government identification numbers, precise biometric data, health records, or financial account credentials beyond what is needed to process a payment — unless a specific program requires it and a separate, explicit consent process governs that collection. If we ever expand into collecting such categories, we will update this policy and, where legally required, obtain renewed consent before doing so.",
            "3.5 Information from third parties",
            "We generally collect information directly from you rather than acquiring it from third-party data brokers. Limited exceptions include: information from an institutional partner (such as a school) that enrolls students in bulk, information from a professional reference you provide during a job application, and information from a social login provider if you choose to register that way.",
          ],
        },
        {
          title: "4. Children's privacy and parental consent",
          paragraphs: [
            "Because several of our programs — including tutoring, family support services, and student competitions — are designed for or attract users under the age of majority, we apply the following framework rather than a generic children's privacy clause.",
            "United States. For any user we know to be under 13, we comply with the Children's Online Privacy Protection Act (COPPA) and the Federal Trade Commission's amended COPPA Rule. Before collecting personal information from a child under 13, we obtain verifiable consent from a parent or guardian, using a method designed to reasonably ensure the person providing consent is the parent. We limit collection from children under 13 to what is reasonably necessary for the service, we do not condition participation on a child disclosing more information than necessary, we do not use a child's information for targeted advertising, and we do not share a child's information with third parties for purposes beyond delivering the service without separate parental consent. Parents may review, request deletion of, or refuse further collection of their child's information at any time by contacting us at the address in Section 15.",
            "India. For any user under 18, we treat parental or guardian consent as required under the Digital Personal Data Protection Act, 2023, and its implementing rules. We do not use a child's personal data for behavioral monitoring, tracking, or targeted advertising directed at that child, and we apply age-verification and consent-verification steps appropriate to the program before processing a minor's data.",
            "Canada. Consent for a minor is assessed based on the minor's capacity to understand the nature of the consent, consistent with applicable federal and provincial law (including Quebec's Law 25 where applicable); where a minor cannot reasonably provide informed consent, we obtain it from a parent or guardian.",
            "General approach across regions. Where age thresholds differ by jurisdiction, we apply whichever threshold is more protective to the individual concerned. If we learn that we have collected personal information from a child without the required consent, we will delete it promptly, and parents may contact us to request this directly.",
          ],
        },
        {
          title: "5. How we use information",
          paragraphs: [
            "We use the information described in Section 3 to:",
          ],
          items: [
            "Create and administer accounts for students, parents, teachers, and institutional partners;",
            "Deliver tutoring, certification, competition, and family-support services, including matching students with appropriate tutors or curricula;",
            "Operate AI-assisted features such as tutoring support, translation, and content generation, as described in Section 7;",
            "Process payments and manage billing;",
            "Communicate with you about your account, respond to inquiries, and provide support;",
            "Send service updates and, where you have opted in, marketing communications, which you may opt out of at any time;",
            "Evaluate and improve our curricula, platform, and AI systems, generally using de-identified or aggregated data where feasible;",
            "Administer competitions such as AI Olympiad, including judging and awarding recognition;",
            "Review and process job applications;",
            "Maintain the security of our platform, detect and prevent fraud, and enforce our terms of service; and",
            "Comply with legal obligations, respond to lawful requests from public authorities, and establish, exercise, or defend legal claims.",
            "Legal bases for processing (EEA/UK users): Where the General Data Protection Regulation or UK GDPR applies, we rely on one or more of the following legal bases for each use above: performance of a contract with you, your consent (which you may withdraw at any time), our legitimate interests in operating and improving the service (balanced against your rights), and compliance with a legal obligation. Where processing rests on consent — including most processing of children's data — we will identify that clearly at the point of collection.",
          ],
        },
        {
          title: "6. Artificial intelligence and automated processing",
          paragraphs: [
            "AI is part of how i4iSciences operates, and we believe you're entitled to know where it sits in the system.",
          ],
          items: [
            "Where we use it. AI models support our tutoring chatbot, translation features, generation of practice content and explanations, and certain internal content-generation and administrative workflows. Where you interact with an AI chatbot or tutor, the substance of that conversation is processed to generate a response and may be retained to improve the quality and safety of the feature.",
            "Third-party AI processing. Some AI features are powered by models provided by a third-party AI provider under a contract that restricts that provider from using your data to train its own models outside the scope of providing the service to us, and requires it to apply appropriate security safeguards.",
            "Human oversight. We do not use AI to make decisions that produce legal or similarly significant effects about a student or family — such as denial of enrollment or a final certification outcome — without meaningful human review. AI-generated assessments and recommendations are treated as a support tool for educators and staff, not as the final word.",
            "Children and AI. Where a child under the applicable age threshold interacts with an AI feature, the same parental consent and data-minimization principles in Section 4 apply to information generated through that interaction.",
          ],
        },
        {
          title: "7. Cookies and similar technologies",
          paragraphs: [
            "Our platform uses a cookie consent system that detects your general region and presents the choices required there — for example, an opt-in banner in jurisdictions that require prior consent, or an opt-out mechanism where that is the applicable standard. We use the following categories of cookies:",
          ],
          items: [
            "Strictly necessary cookies, which keep you logged in and keep the platform functioning, and which cannot be switched off through the consent tool;",
            "Functional cookies, which remember your preferences, such as language;",
            "Analytics cookies, which help us understand how the platform is used, generally in aggregate; and",
            "Marketing cookies, used only where you have opted in, to measure the effectiveness of our own communications.",
            "You can manage your cookie preferences at any time through the cookie settings link in our website footer, and through your browser settings. Disabling non-essential cookies will not prevent you from using the core platform, but some personalization features may not work as intended.",
          ],
        },
        {
          title: "8. How and with whom we share information",
          paragraphs: [
            "We do not sell your personal information. We share it only in the following circumstances:",
          ],
          items: [
            "Service providers. We share information with vendors who perform functions on our behalf, including cloud hosting, communications and OTP delivery, AI processing, payment processing, email delivery, and analytics. These providers are contractually restricted to using your information only to provide services to us.",
            "Institutional and program partners. Where you or your child is enrolled through a school, employer, or partner organization, we share the information necessary to administer that relationship with the partner.",
            "Professional and career-related sharing. For job applicants, we may share application materials internally with hiring staff and, where relevant, with reference contacts you provide.",
            "Legal and safety reasons. We may disclose information where required by law, in response to a valid legal process, or where we believe in good faith that disclosure is necessary to protect the rights, property, or safety of i4iSciences, our users, or the public — including, where a child's safety is at risk, notifying a parent, guardian, or appropriate authority.",
            "Business transfers. If i4iSciences is involved in a merger, acquisition, financing, or sale of assets, personal information may be transferred as part of that transaction, subject to the commitments in this policy continuing to apply or you being notified of any material change.",
            "With your direction. Where you affirmatively choose to share information — for example, posting a testimonial or connecting a social account — we process it according to your instruction.",
            "A current list of categories of service providers is available on request at the contact address in Section 15.",
          ],
        },
        {
          title: "9. International data transfers",
          paragraphs: [
            "i4iSciences operates across the United States, India, and Canada, and your information may be transferred to, stored in, and processed in countries other than the one where you live, including the United States. Where we transfer personal information out of the European Economic Area, the United Kingdom, or other jurisdictions with data transfer restrictions, we rely on recognized transfer mechanisms — such as the European Commission's Standard Contractual Clauses or an equivalent safeguard — and we take steps to ensure the receiving party protects your information consistent with this policy.",
            "For transfers governed by India's Digital Personal Data Protection Act, we take account of any government restrictions on transfers to specific countries or entities in effect at the time of transfer.",
          ],
        },
        {
          title: "10. Data retention",
          paragraphs: [
            "We retain personal information for as long as necessary to provide the service, meet the purpose it was collected for, and satisfy legal, accounting, or reporting obligations. In general:",
          ],
          items: [
            "Account and academic records are retained for the duration of an active enrollment and for a defined period after account closure, to support academic history requests and legal recordkeeping;",
            "Children's personal information is retained only as long as reasonably necessary to fulfill the purpose for which it was collected, and is deleted or de-identified once that purpose is fulfilled, consistent with COPPA's retention limits;",
            "Job application materials are retained for a defined period following the close of the relevant hiring process, unless you ask us to delete them sooner or applicable law requires a different period; and",
            "Payment records are retained as required by applicable tax and financial recordkeeping law.",
            "[Insert specific retention periods, in days or years, once determined internally — this section should not be published with placeholder language.]",
          ],
        },
        {
          title: "11. Data security",
          paragraphs: [
            "We maintain administrative, technical, and physical safeguards designed to protect personal information, including encryption of data in transit, access controls limiting internal access to information on a need-to-know basis, phone-based identity verification through OTP for account actions, and monitoring for unauthorized access. Where required by law — including the FTC's amended COPPA Rule — we maintain a written information security program addressing the collection and handling of children's information specifically.",
            "No method of transmission or storage is completely secure, and we cannot guarantee absolute security. If we become aware of a breach affecting your personal information, we will notify you and any applicable regulator as required by the law that applies to you.",
          ],
        },
        {
          title: "12. Your privacy rights",
          paragraphs: [
            "Your rights depend on where you live. We describe the frameworks that apply to our users below; if a request references a specific law, we will evaluate it under that law.",
            "United States: Depending on your state of residence, you may have rights to know what personal information we hold about you, correct it, delete it, and opt out of certain sharing or targeted advertising, under state privacy laws such as those in California, and other states with comparable laws. We do not sell personal information and do not currently engage in the sale of data as defined under these laws.",
            "European Economic Area and United Kingdom: If GDPR or UK GDPR applies to you, you have the right to access, correct, delete, or restrict processing of your personal information, to receive a portable copy of it, to object to processing based on legitimate interests or direct marketing, to withdraw consent at any time without affecting prior processing, and to lodge a complaint with your local data protection authority.",
            "Canada: You have the right to access personal information we hold about you and to request correction of inaccurate information, under the Personal Information Protection and Electronic Documents Act (PIPEDA) and, where applicable, provincial law such as Quebec's Law 25. You may also withdraw consent for processing that depends on it, subject to legal or contractual restrictions.",
            "India: Under the Digital Personal Data Protection Act, 2023, you have the right to access a summary of personal data we process about you and the processing activities involved, to correct or update it, to have it erased once the purpose for processing is no longer being served (subject to legal retention requirements), to withdraw consent, and to nominate another individual to exercise your rights on your behalf in the event of death or incapacity. You may also raise a grievance with our designated contact before approaching the Data Protection Board of India.",
            "Exercising your rights: To exercise any of the rights above, contact us using the details in Section 15 or submit a request through the privacy request form on our website. We will verify your identity before acting on a request, and we aim to respond within the timeframe required by the law applicable to you — generally 30 days, though some frameworks specify a different period. If you are a parent or guardian acting on behalf of a child, please indicate that in your request.",
          ],
        },
        {
          title: "13. Do-not-track and marketing preferences",
          paragraphs: [
            'Our systems do not currently respond to browser "Do Not Track" signals, given the lack of a common industry standard for interpreting them. You can control non-essential tracking through the cookie settings described in Section 7. You may opt out of marketing emails at any time using the unsubscribe link included in those messages, or by contacting us directly; you will still receive transactional and service-related communications necessary to your account.',
          ],
        },
        {
          title: "14. Other important information",
          paragraphs: [
            "Social media login. If you choose to create or log into your account using a third-party social media account, that provider may share certain profile information with us, consistent with your settings on that platform and the terms you agreed to with them.",
            "Testimonials. If you submit a testimonial for use on our website or in marketing materials, we will only publish it with your consent, and we will include your name only as you have authorized.",
            "Job applicants. Information you submit through our careers page, including your resume, is reviewed by hiring staff for the purpose of evaluating your candidacy and, if applicable, retained for consideration for future openings unless you ask us not to.",
            "Third-party links. Our website and platform may link to third-party sites we do not control. This policy does not apply to those sites, and we encourage you to review their privacy practices separately.",
            "Changes to this policy. We will update this policy as our practices evolve or as law requires, and we will post the revised version with an updated effective date. Where a change is material — particularly one affecting how we handle children's information — we will provide additional notice, such as an email or an in-platform notification, before the change takes effect.",
          ],
        },
        {
          title: "15. Contact us",
          paragraphs: [
            "If you have a question, request, or concern about this policy or your personal information, contact us at:",
            "i4iSciences Email: executive@i4isciences.com or manager@i4isciences.in [Address: 8301 State Line Rd, Suite 220 # 959, Kansas City, MO 64114]",
            "We aim to acknowledge inquiries promptly and will work with you in good faith to resolve any concern about how your information, or your child's information, is handled.",
          ],
        },
      ]}
    />
  );
}