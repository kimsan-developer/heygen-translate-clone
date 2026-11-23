"use client";

import { Sparkles, Globe2, Users } from "lucide-react";
import { useCountUp, SectionShell, CtaLink, Waveform } from "./hg-ui";

/* --------------------------------- Stats ---------------------------------- */

function Stat({ target, label }: { target: number; label: string }) {
  const { ref, val } = useCountUp(target);
  return (
    <div className="flex flex-col items-center gap-1 px-4 py-6 text-center sm:py-7">
      <span ref={ref} className="text-2xl font-extrabold tabular-nums tracking-tight text-zinc-950 sm:text-[28px]">
        {val.toLocaleString("en-US")}
      </span>
      <span className="text-[13px] font-medium text-zinc-500">{label}</span>
    </div>
  );
}

export function StatsBar() {
  return (
    <SectionShell>
      <div className="grid grid-cols-1 divide-y divide-zinc-100 rounded-2xl border border-zinc-100 bg-zinc-50/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <Stat target={183723334} label="Videos generated" />
        <Stat target={158834567} label="Avatars generated" />
        <Stat target={27239616} label="Videos translated" />
      </div>
    </SectionShell>
  );
}

/* ------------------------------- Logo strip ------------------------------- */

const LOGOS = ["NVIDIA", "Salesforce", "Hyundai", "Miro", "trivago", "Workday", "MIT", "Bosch"];

export function LogoStrip() {
  return (
    <SectionShell className="py-14">
      <p className="text-center text-[15px] font-medium text-zinc-600">
        Trusted by over 1,000,000 developers and leading companies.
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-14">
        {LOGOS.map((logo) => (
          <span
            key={logo}
            className="select-none text-lg font-bold tracking-wide text-zinc-300 transition-colors duration-300 hover:text-zinc-500 sm:text-xl"
          >
            {logo}
          </span>
        ))}
      </div>
    </SectionShell>
  );
}

/* ------------------------------ Why leading ------------------------------- */

const CHIPS = [
  { icon: Sparkles, text: "Voice cloned" },
  { icon: Globe2, text: "175+ languages" },
  { icon: Users, text: "Perfect lip sync" },
];

export function WhyLeading() {
  return (
    <SectionShell className="py-16 sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
            Why HeyGen is the leading AI video translator
          </h2>
          <p className="mt-5 leading-relaxed text-zinc-600">
            Powered by advanced AI translation and voice cloning technology, HeyGen delivers the
            most accurate video translator available today. Our solution seamlessly converts speech
            and syncs lip movements in real time, helping creators and businesses break language
            barriers and connect with global audiences.
          </p>
          <CtaLink className="mt-6" />
          <Waveform className="mt-8 h-7 max-w-[320px] opacity-90" bars={34} />
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-zinc-100 bg-zinc-900 shadow-[0_30px_80px_-24px_rgba(88,44,180,0.4)]">
            { }
            <img
              src="/assets/hero-still.png"
              alt="Presenter speaking in a studio, being translated live"
              className="aspect-[4/3] w-full object-cover"
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* floating chips */}
          <div className="absolute -bottom-5 left-4 flex flex-wrap gap-2.5">
            {CHIPS.map((chip) => (
              <span
                key={chip.text}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-100 bg-white px-3.5 py-2 text-[13px] font-semibold text-zinc-800 shadow-lg"
              >
                <chip.icon className="h-3.5 w-3.5 text-violet-600" aria-hidden="true" />
                {chip.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
