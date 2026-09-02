import Navbar from "@/components/Navbar";

import {
  worklogMeta,
  worklogStages,
  independentDecisions,
  aiMistakes,
  manualChanges,
  verification,
  futureImprovements,
} from "@/content/worklog";

export default function WorklogPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-neutral-200">
      <Navbar />

      {/* HERO */}
      <section className="mx-auto max-w-[1400px] px-8 pb-24 pt-40">
        <div className="max-w-4xl">
          <p className="text-[10px] uppercase tracking-[0.45em] text-violet-400/60">
            Development Chronicle
          </p>

          <h1 className="mt-6 font-serif text-6xl tracking-[-0.04em] text-neutral-100 md:text-8xl">
            AI Worklog
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-neutral-500">
            A transparent record of how the Riftkeeper interface was designed,
            implemented and refined with AI assistance.
          </p>
        </div>

        {/* META */}
        <div className="mt-16 grid gap-px overflow-hidden border border-white/[0.06] bg-white/[0.06] md:grid-cols-3">
          <MetaItem label="AI TOOL" value={worklogMeta.tool} />
          <MetaItem label="DEVELOPMENT TIME" value={worklogMeta.time} />
          <MetaItem label="TOKEN USAGE" value="Not tracked" />
        </div>

        <p className="mt-4 max-w-3xl text-xs leading-5 text-neutral-700">
          {worklogMeta.tokens}
        </p>
      </section>

      {/* DEVELOPMENT TIMELINE */}
      <section className="border-t border-white/[0.05]">
        <div className="mx-auto max-w-[1400px] px-8 py-24">
          <SectionHeader
            index="01"
            eyebrow="PROCESS"
            title="Development timeline"
            description="Основные этапы разработки и разделение моей работы и работы AI."
          />

          <div className="mt-20">
            {worklogStages.map((stage) => (
              <article
                key={stage.id}
                className="grid border-t border-white/[0.06] py-14 lg:grid-cols-[160px_1fr]"
              >
                {/* NUMBER */}
                <div>
                  <span className="font-serif text-5xl text-white/[0.08]">
                    {String(stage.id).padStart(2, "0")}
                  </span>
                </div>

                {/* CONTENT */}
                <div>
                  <h2 className="font-serif text-3xl tracking-tight text-neutral-100">
                    {stage.title}
                  </h2>

                  <div className="mt-10 grid gap-10 xl:grid-cols-2">
                    <WorkColumn title="MY WORK" items={stage.myWork} />

                    <WorkColumn
                      title="AI CONTRIBUTION"
                      items={stage.aiWork}
                      accent
                    />
                  </div>

                  {stage.extra && (
                    <div className="mt-10 border-l border-violet-400/30 pl-5">
                      {stage.extra.map((item) => (
                        <p
                          key={item}
                          className="mb-2 text-sm leading-6 text-neutral-400 last:mb-0"
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="mt-10">
                    <p className="text-[9px] uppercase tracking-[0.35em] text-neutral-700">
                      KEY PROMPT
                    </p>

                    <div className="mt-4 space-y-3">
                      {stage.prompts.map((prompt) => (
                        <div
                          key={prompt}
                          className="border border-violet-400/[0.12] bg-violet-400/[0.025] px-5 py-4"
                        >
                          <p className="font-mono text-xs leading-6 text-neutral-500">
                            “{prompt}”
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* INDEPENDENT DECISIONS */}
      <section className="border-t border-white/[0.05]">
        <div className="mx-auto max-w-[1400px] px-8 py-24">
          <SectionHeader
            index="02"
            eyebrow="OWNERSHIP"
            title="Independent decisions"
            description="Решения, которые я принимал самостоятельно в процессе разработки."
          />

          <CardGrid items={independentDecisions} />
        </div>
      </section>

      {/* AI MISTAKES */}
      <section className="border-t border-white/[0.05]">
        <div className="mx-auto max-w-[1400px] px-8 py-24">
          <SectionHeader
            index="03"
            eyebrow="ITERATION"
            title="Where AI was wrong"
            description="Ошибки и неудачные реализации AI, обнаруженные во время проверки."
          />

          <CardGrid items={aiMistakes} />
        </div>
      </section>

      {/* MANUAL CHANGES */}
      <section className="border-t border-white/[0.05]">
        <div className="mx-auto max-w-[1400px] px-8 py-24">
          <SectionHeader
            index="04"
            eyebrow="MANUAL WORK"
            title="Manual refinements"
            description="Что было дополнительно изменено и настроено вручную."
          />

          <div className="mt-14 max-w-4xl border-l border-violet-400/30 pl-8">
            {manualChanges.map((item) => (
              <p
                key={item}
                className="mb-6 text-sm leading-7 text-neutral-400 last:mb-0"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* VERIFICATION */}
      <section className="border-t border-white/[0.05]">
        <div className="mx-auto max-w-[1400px] px-8 py-24">
          <SectionHeader
            index="05"
            eyebrow="VERIFICATION"
            title="How I checked it"
            description="Как проверялась работоспособность приложения."
          />

          <div className="mt-14 max-w-4xl border-l border-violet-400/30 pl-8">
            <p className="text-sm leading-7 text-neutral-400">
              {verification}
            </p>
          </div>
        </div>
      </section>

      {/* FUTURE */}
      <section className="border-y border-white/[0.05]">
        <div className="mx-auto max-w-[1400px] px-8 py-24">
          <SectionHeader
            index="06"
            eyebrow="FUTURE"
            title="If this were a real product"
            description="Что я бы добавил при дальнейшем развитии проекта."
          />

          <CardGrid items={futureImprovements} />
        </div>
      </section>

      {/* END */}
      <footer className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-10">
        <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-800">
          Riftkeeper / AI Worklog
        </p>

        <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-800">
          End of record
        </p>
      </footer>
    </main>
  );
}

function MetaItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#030303] px-6 py-6">
      <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-700">
        {label}
      </p>

      <p className="mt-3 font-serif text-xl text-neutral-300">{value}</p>
    </div>
  );
}

function SectionHeader({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[160px_1fr]">
      <span className="font-serif text-5xl text-white/[0.06]">{index}</span>

      <div>
        <p className="text-[9px] uppercase tracking-[0.4em] text-violet-400/50">
          {eyebrow}
        </p>

        <h2 className="mt-4 font-serif text-4xl tracking-tight text-neutral-100 md:text-5xl">
          {title}
        </h2>

        <p className="mt-5 max-w-2xl text-sm leading-6 text-neutral-600">
          {description}
        </p>
      </div>
    </div>
  );
}

function WorkColumn({
  title,
  items,
  accent = false,
}: {
  title: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <div>
      <p
        className={`text-[9px] uppercase tracking-[0.35em] ${
          accent ? "text-violet-400/60" : "text-neutral-700"
        }`}
      >
        {title}
      </p>

      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <p key={item} className="text-sm leading-7 text-neutral-500">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function CardGrid({
  items,
}: {
  items: {
    title: string;
    text: string;
  }[];
}) {
  return (
    <div className="mt-16 grid gap-px overflow-hidden border border-white/[0.06] bg-white/[0.06] md:grid-cols-2">
      {items.map((item, index) => (
        <article
          key={item.title}
          className="min-h-[220px] bg-[#030303] p-8 transition-colors duration-300 hover:bg-white/[0.015]"
        >
          <span className="font-mono text-[10px] text-violet-400/40">
            {String(index + 1).padStart(2, "0")}
          </span>

          <h3 className="mt-8 font-serif text-2xl text-neutral-200">
            {item.title}
          </h3>

          <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-600">
            {item.text}
          </p>
        </article>
      ))}
    </div>
  );
}