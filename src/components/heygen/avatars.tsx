"use client";

import { useState } from "react";
import { Clock3, Clapperboard, HeartHandshake } from "lucide-react";
import { SectionShell, LinkPill, VideoStill } from "./hg-ui";
import { cn } from "@/lib/utils";

const AVATAR_LANGS = ["English", "German", "Chinese", "Spanish"];

const AVATAR_CAPTIONS: Record<string, string> = {
  English: "One script, every market — your avatar does the talking.",
  German: "Ein Skript, jeder Markt — Ihr Avatar spricht für sich.",
  Chinese: "一份脚本，覆盖每个市场——让数字人替你开口。",
  Spanish: "Un guion, todos los mercados: tu avatar habla por ti.",
};

const CARDS = [
  {
    icon: Clock3,
    title: "Translate existing videos in minutes",
    body: "Have footage you already love? Upload any video or paste a YouTube link, and HeyGen will translate it into 175+ languages, preserving the original speaker's voice, lip movements, and expressions. No reshoots needed.",
  },
  {
    icon: Clapperboard,
    title: "Create avatar videos in any language",
    body: "Generate multilingual content from scratch. Write one script, pick your avatar, and produce videos in multiple languages simultaneously — perfect for scaling across global markets without recording a single take.",
  },
  {
    icon: HeartHandshake,
    title: "Avatars that actually feel human",
    body: "Choose from a wide range of pre-built personalities or customize your own. With Voice Director and Voice Mirroring, every avatar delivers natural tone, emotion, and pacing, so your videos never feel robotic.",
  },
];

export function AvatarsSection() {
  const [lang, setLang] = useState("English");

  return (
    <SectionShell dark className="py-16 sm:py-24" id="avatars">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Not just your videos&mdash;our video translator lets your avatars speak 175+ languages
          too.
        </h2>
        <p className="mt-5 leading-relaxed text-zinc-300">
          Two ways to go global. Translate your existing videos or YouTube links into 175+
          languages with accurate voice and lip sync. Or create avatar videos in multiple languages
          from day one using one script for unlimited reach. Powered by advanced facial animation
          and voice sync technology, every video feels authentic.
        </p>
        <LinkPill variant="white" size="md" href="#translate-tool" className="mt-7">
          Get started for free &rarr;
        </LinkPill>
      </div>

      {/* tabbed avatar demo */}
      <div className="mx-auto mt-12 max-w-3xl">
        <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Avatar language">
          {AVATAR_LANGS.map((l) => (
            <button
              key={l}
              role="tab"
              aria-selected={lang === l}
              onClick={() => setLang(l)}
              className={cn(
                "rounded-full px-4 py-1.5 text-[13px] font-semibold transition-all duration-200",
                lang === l
                  ? "bg-white text-zinc-950 shadow-sm"
                  : "bg-white/10 text-zinc-300 hover:bg-white/20 hover:text-white"
              )}
            >
              {l}
            </button>
          ))}
        </div>
        <VideoStill
          src="/assets/avatar-demo.png"
          alt={`AI avatar speaking ${lang}`}
          caption={AVATAR_CAPTIONS[lang]}
          langLabel={lang}
          className="mt-6 border-white/10"
        />
      </div>

      {/* three cards */}
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {CARDS.map((c) => (
          <article
            key={c.title}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:bg-white/[0.08]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
              <c.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-[17px] font-bold leading-snug">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{c.body}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
