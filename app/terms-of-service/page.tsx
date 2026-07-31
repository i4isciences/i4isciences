import type { Metadata } from "next";

import LegalDocument from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing use of the i4iSciences website and services.",
};

export default function TermsOfServicePage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="i4iSciences Terms of Service"
      intro="Effective date: [July 6 th 2026] Last updated: [Aug 1 st 2026]"
      sections={[
        {
          title: "1. Agreement to these terms",
          paragraphs: [
            'These Terms of Service ("Terms") form a binding agreement between you and I4I Sciences LLC, a Missouri limited liability company doing business as i4iSciences ("i4iSciences," "we," "us," "our"), governing your access to and use of i4isciences.com, our regional sites, our platform, and every program operated under the i4iSciences name, including Teach the Teacher, OneCent Tutors, the Immigrant Parent Support Program (IPST), AI Olympiad, and LabTricks (collectively, the "Services").',
            'By creating an account, enrolling a student, registering as an educator, submitting a job application, or otherwise using the Services, you accept these Terms. If you are accepting on behalf of a child, an organization, or another individual, you represent that you have the authority to do so, and "you" in these Terms refers to both you and the party you represent. If you do not agree, do not use the Services.',
            'We may update these Terms from time to time. We will post the revised version with a new "Last updated" date, and for changes that materially affect your rights — particularly anything touching a child\'s data or a subscription\'s cost — we will provide additional notice, such as an email or in-platform message, before the change takes effect. Continued use of the Services after a change takes effect constitutes acceptance of the revised Terms.',
          ],
        },
        {
          title: "2. Definitions",
          paragraphs: [],
          items: [
            '"Services" means the i4iSciences website, platform, mobile experiences, AI-assisted tools, and all sub-brand programs listed in Section 1.',
            '"Content" means text, software, graphics, curricula, assessments, video, audio, and other material made available through the Services, whether created by i4iSciences, an educator, a partner, or a user.',
            '"Student" means an individual enrolled to receive instruction, tutoring, or competition participation through the Services, regardless of age.',
            '"Parent" means a parent or legal guardian who creates, manages, or is otherwise responsible for a Student\'s account.',
            '"Educator" means an individual who delivers instruction, tutoring, or certification training through the Services, including certified tutors under OneCent Tutors and certification candidates or graduates of Teach the Teacher.',
            '"Institutional Partner" means a school, district, employer, or other organization with a separate written agreement governing its use of the Services, to the extent that agreement addresses a matter differently than these Terms.',
            '"Applicant" means an individual who submits a job application through our careers page.',
          ],
        },
        {
          title: "3. Changes to the Services",
          paragraphs: [
            "We may add, modify, or discontinue features of the Services at any time. We will make reasonable efforts to notify enrolled Students and Parents before a change materially reduces a paid feature they are actively using, but we do not guarantee that any specific feature, curriculum module, or AI tool will remain available indefinitely.",
          ],
        },
        {
          title: "4. Eligibility and accounts",
          paragraphs: [
            "4.1 Who can hold an account",
            "An adult (18 or older, or the age of majority in your jurisdiction if higher) may create and hold an i4iSciences account directly. A Student who has not reached that age may use the Services only through an account created and supervised by a Parent. A parent has to sign the form provided on our website to give permission to their child to create an account.",
            "4.2 Parent and guardian responsibilities",
            "If you create or manage an account on behalf of a Student:",
          ],
          items: [
            "You represent that you are the Student's parent or legal guardian, or otherwise hold the legal authority to consent on the Student's behalf;",
            "You are responsible for the accuracy of the information provided, for the Student's conduct on the platform, and for supervising the Student's use of the Services consistent with your own household's judgment;",
            "Where a Service requires a parent's affirmative consent to a child's data being processed — as described in our Privacy Policy — you provide that consent by completing enrollment; and",
            "You may review, request correction of, or request deletion of your child's information at any time through the contact channels in Section 27.",
            "4.3 Account security: You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account, whether or not you authorized it. Notify us immediately at the contact address in Section 27 if you suspect unauthorized access. We use phone-based one-time-password verification for certain account actions; you are responsible for keeping the phone number on file current.",
            "4.4 Accuracy of information: Information you provide — your own, or a Student's on their behalf — must be true, current, and complete. If we have reasonable grounds to believe information provided is false or misleading, we may suspend or terminate the associated account.",
          ],
        },
        {
          title: "5. Description of the Services",
          paragraphs: [
            "i4iSciences provides education-related services that may include, depending on the program:",
          ],
          items: [
            "Teach the Teacher — training and certification programs for educators;",
            "OneCent Tutors — subscription-based tutoring for K-8 and other student populations;",
            "Immigrant Parent Support Program (IPST) — family-facing support programming;",
            "AI Olympiad — a student competition involving AI-related problem-solving; and",
            "LabTricks — [insert description of LabTricks' specific offering].",
            "Descriptions of each program, including pricing, format, and eligibility, are provided on the relevant program page and are incorporated into these Terms by reference. Where a specific program has its own supplemental terms, those terms govern in the event of a conflict with this general document, but only to the extent of the conflict.",
            "We do not guarantee specific academic, certification, or competition outcomes. Educational results depend on many factors outside our control, including a Student's engagement, an Educator's delivery, and factors specific to each learner. Statements about typical outcomes are illustrative, not a promise of individual results.",
          ],
        },
        {
          title: "6. Educators and tutors",
          paragraphs: [
            "This section applies if you register as an Educator through Teach the Teacher, OneCent Tutors, or a related program.",
            "6.1 Eligibility and vetting: We may require credentials, background information, references, or successful completion of a certification process before permitting you to teach through the Services. We reserve the right to decline, suspend, or terminate an Educator's participation at our discretion, including where information provided cannot be verified.",
            "6.2 Independent relationship: Unless a separate written agreement states otherwise, your participation as an Educator does not create an employment, partnership, joint venture, or agency relationship with i4iSciences.",
            "6.3 Conduct obligations: As an Educator, you agree to:",
          ],
          items: [
            "Conduct sessions professionally, and never engage in conduct that endangers a Student's physical or emotional wellbeing;",
            "Comply with all applicable laws concerning the education and supervision of minors;",
            "Not solicit a Student or Parent to engage your services outside the i4iSciences platform, and not accept payment from a Parent for instruction that circumvents the platform;",
            "Maintain the confidentiality of Student information and not use it for any purpose beyond delivering the Services; and",
            "Immediately report to us any concern about a Student's safety or wellbeing that arises during a session.",
            "We take reports of Educator misconduct seriously and will investigate and, where warranted, suspend or terminate the Educator's access pending or following that investigation.",
            "6.4 Content and materials: Curricula, worksheets, software, and branded materials provided to you for delivering instruction remain i4iSciences' property. You receive a limited right to use them to deliver the Services and acquire no ownership interest in them.",
          ],
        },
        {
          title: "7. Artificial intelligence features",
          paragraphs: [
            "Some Services are powered in part by artificial intelligence — including tutoring support, translation, and content generation. The following applies wherever you interact with an AI-powered feature:",
          ],
          items: [
            "AI output can be wrong. Treat AI-generated explanations, practice problems, and feedback as a study aid, not as an authoritative or final answer. We encourage Students and Educators to verify important information independently.",
            "No professional advice. AI features are not a substitute for professional educational assessment, medical, legal, or psychological advice, and should not be relied on as such.",
            "Human oversight on consequential decisions. We do not rely on AI alone to make decisions that meaningfully affect a Student — such as certification results or enrollment decisions — without human review.",
            "Children's interactions. Where a Student under the applicable age threshold interacts with an AI feature, the data-handling commitments in our Privacy Policy apply to that interaction the same as any other data we collect from that Student.",
          ],
        },
        {
          title: "8. Careers and job applications",
          paragraphs: [
            "If you submit an application through our careers page, you represent that the information in your application, including your resume, is accurate. Submitting an application does not guarantee an interview or an offer of employment. We use application materials to evaluate your candidacy and, unless you ask us not to, may retain them for consideration for future openings, consistent with our Privacy Policy.",
          ],
        },
        {
          title: "9. Subscriptions, payments, and refunds",
          paragraphs: [
            "9.1 Framework: Paid Services, including OneCent Tutors subscriptions and Teach the Teacher certification fees, are billed according to the pricing and cadence disclosed at the time of purchase. By subscribing, you authorize us to charge your payment method for the applicable fees, including recurring charges for subscription renewals unless you cancel in advance.",
            "9.2 What this section needs before publication: Rather than presenting invented numbers as company policy, this draft flags the decisions that belong in a dedicated Subscription, Pause, and Refund Policy, referenced here and published separately:",
          ],
          items: [
            'The missed-session ("no-show") threshold and whether a missed session is chargeable;',
            'Whether and how many "pause" days or session-reschedule allowances a subscriber receives, and how they are calculated;',
            "What happens to unused sessions at renewal (forfeiture, limited carry-forward, or another rule);",
            "The window in which a subscription can be cancelled for a refund, and which fees (if any) are non-refundable, such as an Educator certification or affiliation fee once training materials have been provided; and",
            "Retry logic and consequences for a failed renewal payment.",
            "9.3 General payment terms: You are responsible for keeping a valid payment method on file. We are not liable for interruption of Services caused by an expired or declined payment method. Fees are stated exclusive of applicable taxes unless noted otherwise, and you are responsible for any taxes associated with your purchase.",
          ],
        },
        {
          title: "10. Acceptable use",
          paragraphs: [
            "You agree not to:",
          ],
          items: [
            "Use the Services for any purpose other than their intended educational purpose, or in a way that violates applicable law;",
            "Attempt to access another user's account, or misrepresent your identity or your relationship to a Student;",
            "Upload or transmit content that is unlawful, harassing, defamatory, obscene, or that endangers or exploits a minor in any way;",
            "Interfere with the security, integrity, or normal operation of the Services, including by introducing malware, attempting unauthorized access, or using bots or scrapers to extract data;",
            "Reverse-engineer, decompile, or attempt to extract the source code of our software, except where applicable law expressly permits it;",
            "Use the Services to build a competing product, or to resell access to the Services without our written consent; or",
            "Circumvent the platform to transact directly with an Educator or Student in a manner that violates Section 6.3.",
            "We may investigate suspected violations and may suspend or terminate access, remove content, or take other action we consider appropriate, with or without prior notice, particularly where we believe a Student's safety may be at risk.",
          ],
        },
        {
          title: "11. User-generated content",
          paragraphs: [
            'If the Services allow you to submit reviews, testimonials, forum posts, or similar content ("Contributions"), you represent that you own or have the necessary rights to submit that content, and that it does not infringe any third party\'s rights or violate these Terms.',
            "You grant i4iSciences a non-exclusive, worldwide, royalty-free license to use, reproduce, and display your Contributions in connection with operating and promoting the Services. We may remove Contributions at our discretion, including content we determine is inaccurate, inappropriate, or otherwise inconsistent with these Terms — particularly anything that could expose a minor's identity or location without appropriate consent.",
          ],
        },
        {
          title: "12. Intellectual property",
          paragraphs: [
            "The Services, including their design, software, curricula, trademarks (including I4ISCIENCES and associated marks), and other content we create, are owned by or licensed to i4iSciences and are protected by applicable intellectual property law. Except for the limited license to use the Services for their intended purpose, nothing in these Terms transfers any ownership interest in our intellectual property to you. Any feedback or suggestions you provide about the Services may be used by us without obligation to you.",
          ],
        },
        {
          title: "13. Third-party services and links",
          paragraphs: [
            "We work with third-party providers — including hosting, payment processing, messaging (for account verification), and AI processing providers — to operate the Services. Their handling of your information is described in our Privacy Policy. The Services may also link to third-party websites we do not control; we are not responsible for their content or practices, and inclusion of a link is not an endorsement.",
          ],
        },
        {
          title: "14. Privacy",
          paragraphs: [
            "Our collection and use of personal information, including information about Students, is described in our Privacy Policy, which is incorporated into these Terms by reference. By using the Services, you agree to the practices described there.",
          ],
        },
        {
          title: "15. Disclaimers",
          paragraphs: [
            'The Services are provided "as is" and "as available." To the fullest extent permitted by law, we disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Services will be uninterrupted, error-free, or free of harmful components, and we do not warrant the accuracy or completeness of AI-generated or third-party content made available through the Services.',
            "Nothing in this section limits any warranty or protection that applicable consumer protection law does not permit us to disclaim, including protections that may apply specifically to services directed at children.",
          ],
        },
        {
          title: "16. Limitation of liability",
          paragraphs: [
            "To the fullest extent permitted by law, i4iSciences and its officers, employees, and agents will not be liable for indirect, incidental, consequential, special, or punitive damages arising from your use of the Services, even if advised of the possibility of such damages. Our total aggregate liability for any claim arising from these Terms or your use of the Services will not exceed the amount you paid us for the Service giving rise to the claim in the [insert period, e.g., three months] preceding the event.",
            "This limitation does not apply to liability that cannot be excluded or limited under applicable law, including liability for gross negligence, willful misconduct, or harm to a minor's safety arising from our own conduct.",
          ],
        },
        {
          title: "17. Indemnification",
          paragraphs: [
            "You agree to defend, indemnify, and hold harmless i4iSciences, its officers, employees, and agents from third-party claims, losses, and reasonable expenses (including attorneys' fees) arising from your violation of these Terms, your misuse of the Services, or content you submit, except to the extent the claim arises from our own breach of these Terms or violation of law.",
          ],
        },
        {
          title: "18. Term, suspension, and termination",
          paragraphs: [
            "These Terms remain in effect while you use the Services. We may suspend or terminate your access, with or without notice, for violation of these Terms, suspected fraud, non-payment, or conduct that we reasonably believe puts a Student's safety at risk. You may close your account at any time by contacting us or using the account settings, subject to the terms of any active subscription described in Section 9. Sections that by their nature should survive termination — including Sections 12, 15, 16, 17, and 20–25 — continue to apply after termination.",
          ],
        },
        {
          title: "19. Force majeure",
          paragraphs: [
            "We are not liable for delay or failure to perform caused by events beyond our reasonable control, including natural disasters, acts of war or terrorism, labor disputes, internet or infrastructure outages, or governmental action.",
          ],
        },
        {
          title: "20. Governing law and dispute resolution",
          paragraphs: [
            "20.1 General framework: These Terms are governed by the laws of the State of Missouri, without regard to conflict-of-law principles, except where the region-specific provisions in Sections 24–25 apply to you.",
            "20.2 Informal resolution first: Before filing a claim, you agree to contact us at the address in Section 27 and attempt in good faith to resolve the dispute informally. Most concerns can be resolved this way without further escalation.",
            "20.3 Arbitration: If a dispute cannot be resolved informally, and except for the disputes excluded in Section 20.4, it will be resolved by binding individual arbitration rather than in court, under the rules of [insert arbitration body, e.g., the American Arbitration Association], with the arbitration seated in [insert city, likely in Missouri]. Claims will proceed on an individual basis only; class actions and representative proceedings are waived to the extent permitted by law.",
            "20.4 Exceptions: Either party may bring a claim in small claims court where eligible, and either party may seek injunctive relief in court to protect intellectual property rights or to prevent an imminent risk to a Student's safety. Where mandatory local law overrides this framework for a specific user — as is the case for users in India and, to a more limited extent, Canada — Sections 24 and 25 govern instead, to the extent of the conflict.",
          ],
        },
        {
          title: "21. Assignment",
          paragraphs: [
            "You may not assign these Terms without our written consent. We may assign these Terms in connection with a merger, acquisition, or sale of assets, provided the commitments in these Terms and our Privacy Policy continue to apply to previously collected information, or you are notified of any material change.",
          ],
        },
        {
          title: "22. Severability and waiver",
          paragraphs: [
            "If any provision of these Terms is found unenforceable, the remaining provisions remain in full force. Our failure to enforce a provision is not a waiver of our right to do so later.",
          ],
        },
        {
          title: "23. Anti-bribery and anti-corruption",
          paragraphs: [
            "If you engage with i4iSciences as an Institutional Partner, Educator, vendor, or in another business capacity, you agree to comply with applicable anti-bribery and anti-corruption laws, and to promptly report to us any request for an improper advantage made in connection with our relationship.",
          ],
        },
        {
          title: "24. India-specific terms",
          paragraphs: [
            "If you access the Services from India, or through i4isciences.in, the following additional terms apply, consistent with the Information Technology Act, 2000, its associated rules, and the Digital Personal Data Protection Act, 2023:",
          ],
          items: [
            "Grievance Officer. In accordance with the Information Technology (Intermediary Guidelines) Rules, we designate a Grievance Officer for complaints related to these Terms or your personal data. Contact details are provided in Section 27.",
            "Prohibited content. In addition to Section 10, you agree not to host, upload, or transmit content that is grossly harmful, defamatory, obscene, invasive of another's privacy, or otherwise prohibited under Indian law, including content that in any way harms a minor.",
            "Consent to contact. By registering, you consent to being contacted by SMS, WhatsApp, email, or phone regarding your account and our Services, including where your number is registered under India's National Do Not Call framework, for the limited purposes of service delivery and account verification — not for unrelated promotional calls you have not opted into.",
            "Grievance and Data Protection Board. You may raise a grievance with our Grievance Officer before approaching the Data Protection Board of India, consistent with the process described in our Privacy Policy.",
          ],
        },
        {
          title: "25. Canada-specific terms",
          paragraphs: [
            "If you access the Services from Canada, or through i4isciences.ca, nothing in these Terms limits rights you hold under the Personal Information Protection and Electronic Documents Act (PIPEDA) or, where applicable, Quebec's Law 25. Consent on behalf of a minor is obtained consistent with the minor's capacity to understand the nature of that consent, or from a parent or guardian where that capacity does not exist.",
          ],
        },
        {
          title: "26. United States state-specific notices",
          paragraphs: [
            "Nothing in these Terms limits any right that applicable state law does not permit us to disclaim, including consumer protection rights available to California residents and rights under applicable state student-privacy law where the Services are used in an educational institution setting.",
          ],
        },
        {
          title: "27. Contact us",
          paragraphs: [
            "Questions about these Terms, requests to exercise a right described here, or complaints about the Services can be directed to:",
            "i4iSciences Email: executive@i4isciences.com, manager@i4isciences.in [Address: 8301 State Line Rd, Suite 220 # 959, Kansas City, MO 64114]",
          ],
        },
      ]}
    />
  );
}