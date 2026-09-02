export type LegalSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

export type LegalContent = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
};

export const termsOfServiceContent: LegalContent = {
  eyebrow: "Legal",
  title: "i4iSciences Terms of Service",
  intro: "Effective date: [July 6 th 2026] Last updated: [Aug 1 st 2026]",
  sections: [
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
      paragraphs: ["You agree not to:"],
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
  ],
};

export const privacyPolicyContent: LegalContent = {
  eyebrow: "Legal",
  title: "i4iSciences Privacy Policy",
  intro: "Effective date: [July 6th 2026] Last updated: [Aug 1 st 2026]",
  sections: [
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
      paragraphs: ["For readers who want the summary before the detail:"],
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
        "To verify accounts and reduce fraud, we use a one-time password (OTP) system delivered by SMS, WhatsApp, or email through our messaging provider. This process collects and temporarily processes your contact detail and the verification code sent to it. We retain a record that verification occurred; we do not retain the content of the OTP message beyond what is operationally necessary.",
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
      paragraphs: ["We use the information described in Section 3 to:"],
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
        "We maintain administrative, technical, and physical safeguards designed to protect personal information, including encryption of data in transit, access controls limiting internal access to information on a need-to-know basis, one-time-password identity verification for account actions, and monitoring for unauthorized access. Where required by law — including the FTC's amended COPPA Rule — we maintain a written information security program addressing the collection and handling of children's information specifically.",
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
  ],
};
