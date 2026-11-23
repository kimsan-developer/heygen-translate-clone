"use client";

import { useCountUp, SectionShell, CtaLink } from "./hg-ui";

/* --------------------------------- Steps ---------------------------------- */

const STEPS = [
  {
    n: "1",
    title: "Step 1",
    body: "Upload your video from your device or paste a YouTube link. Select the translation engine and choose up to 10 languages to translate simultaneously.",
  },
  {
    n: "2",
    title: "Step 2",
    body: "Hit translate and let HeyGen do the work. Your existing video will be translated with matched voice, lip sync, and expressions — ready to publish.",
  },
  {
    n: "3",
    title: "Step 3",
    body: "Want more control? Click Edit & Review to proofread your translated script before finalizing and make sure every word lands exactly right.",
  },
];

export function HowTo() {
  return (
    <SectionShell className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
          How to translate a video with HeyGen
        </h2>
        <CtaLink className="mt-4" />
      </div>

      <div className="relative mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
        {/* connector line */}
        <div
          aria-hidden="true"
          className="absolute left-[16%] right-[16%] top-7 hidden border-t-2 border-dashed border-violet-200 md:block"
        />
        {STEPS.map((s) => (
          <article key={s.n} className="relative text-center md:text-left">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-xl font-extrabold text-white shadow-lg shadow-violet-200 md:mx-0">
              {s.n}
            </span>
            <h3 className="mt-5 text-lg font-bold text-zinc-950">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">{s.body}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

/* ------------------------------- Case study ------------------------------- */

export function CaseStudy() {
  return (
    <SectionShell className="py-8">
      <div className="relative overflow-hidden rounded-3xl bg-zinc-950 px-6 py-10 text-white sm:px-12 sm:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl"
        />
        <div className="relative grid items-center gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-300">
              Customer story
            </p>
            <h3 className="mt-3 text-2xl font-extrabold leading-snug sm:text-3xl">
              Trivago saves 50% on post production time
            </h3>
            <p className="mt-4 max-w-xl leading-relaxed text-zinc-300">
              Trivago leveraged HeyGen to localize their TV ads across 30 markets, cutting
              post-production time in half and saving 3&ndash;4 months per campaign.
            </p>
          </div>
          <div className="flex items-center gap-5 lg:justify-end">
            <span className="select-none text-3xl font-bold tracking-tight text-white/90">
              trivago<sup className="text-xs text-violet-300">&reg;</sup>
            </span>
            <span className="h-10 w-px bg-white/15" aria-hidden="true" />
            <span className="text-[13px] leading-snug text-zinc-400">
              30 markets
              <br />
              localized
            </span>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

/* -------------------------------- Metrics --------------------------------- */

function Metric({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix?: string;
  label: string;
}) {
  const { ref, val } = useCountUp(target, 1400);
  return (
    <div className="text-center">
      <p ref={ref} className="text-5xl font-extrabold tracking-tight text-zinc-950 sm:text-6xl">
        {val}
        {suffix}
      </p>
      <p className="mx-auto mt-3 max-w-[220px] text-[15px] leading-snug text-zinc-600">{label}</p>
    </div>
  );
}

export function Metrics() {
  return (
    <SectionShell className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
          The numbers speak for themselves
        </h2>
        <p className="mt-4 leading-relaxed text-zinc-600">
          The impact is clear. Businesses achieve real results with HeyGen&rsquo;s video translator.
          By translating videos instantly, you can save both money and time while effortlessly
          expanding your global reach.
        </p>
        <CtaLink className="mt-4" />
      </div>
      <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6">
        <Metric target={80} suffix="%" label="reduction in video translation costs" />
        <Metric target={30} label="markets localized instantly" />
        <Metric target={1} label="day per video instead of weeks or months" />
      </div>
    </SectionShell>
  );
}
