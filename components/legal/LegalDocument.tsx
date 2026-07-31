type LegalSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
};

export default function LegalDocument({
  eyebrow,
  title,
  intro,
  sections,
}: LegalDocumentProps) {
  return (
    <article className="bg-[#f9fbff] px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <header className="border-b border-[#0a2e8a]/15 pb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f5a623]">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#10204e] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
            {intro}
          </p>
          <p className="mt-5 text-sm font-medium text-slate-500">
            Last updated: August 1, 2026
          </p>
        </header>

        <div className="space-y-10 py-12">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-semibold tracking-tight text-[#10204e]">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-slate-600">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items && (
                  <ul className="list-disc space-y-2 pl-6 marker:text-[#f5a623]">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>

        <aside className="rounded-2xl border border-[#0a2e8a]/10 bg-white p-6 text-sm leading-7 text-slate-600 shadow-sm sm:p-8">
          Questions about this document? Please contact us through our contact page.
        </aside>
      </div>
    </article>
  );
}
