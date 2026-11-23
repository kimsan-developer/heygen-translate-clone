"use client";

import { useState } from "react";
import {
  Zap,
  Globe2,
  Mic,
  SlidersHorizontal,
  ScanFace,
  Languages,
} from "lucide-react";
import { SectionShell, CtaLink, VideoStill } from "./hg-ui";
import { cn } from "@/lib/utils";

const TAB_LANGS = [
  "English", "Chinese", "Spanish", "German", "French", "Polish",
  "Arabic", "Hindi", "Portuguese", "Russian", "Japanese",
];

const TAB_CAPTIONS: Record<string, string> = {
  English: "Hi! Welcome to HeyGen — let's translate your video.",
  Chinese: "你好！欢迎来到 HeyGen，让我们为你的视频添加多语言。",
  Spanish: "¡Hola! Te damos la bienvenida a HeyGen.",
  German: "Hallo! Willkommen bei HeyGen.",
  French: "Bonjour ! Bienvenue sur HeyGen.",
  Polish: "Cześć! Witaj w HeyGen.",
  Arabic: "مرحباً! أهلاً بك في HeyGen.",
  Hindi: "नमस्ते! HeyGen में आपका स्वागत है।",
  Portuguese: "Olá! Boas-vindas ao HeyGen.",
  Russian: "Привет! Добро пожаловать в HeyGen.",
  Japanese: "こんにちは！HeyGenへようこそ。",
};

const FEATURES = [
  {
    icon: Zap,
    title: "Fast, easy, and cost-effective",
    body: "Traditional video translation can be slow and expensive. Our online video translator makes it effortless. Simply upload your file or paste a YouTube link, and instantly translate a video in just one click. No need for costly reshoots or manual dubbing. It's fast, budget-friendly, and easy for creators and businesses of any size.",
  },
  {
    icon: Globe2,
    title: "Expand your global reach",
    body: "Whether you are a solo creator or enterprise, AI video translation helps unlock new markets. With cultural nuance, voice accuracy, and precise lip-sync, your videos resonate internationally in ways subtitles alone cannot. More reach means more engagement and growth.",
  },
  {
    icon: Mic,
    title: "Preserve your voice",
    body: "Our video language translator goes far beyond word substitution. Using advanced AI and voice cloning, your unique tone and delivery are preserved across 175+ languages and dialects. Even when you translate a video to English or any other language, it still sounds like your authentic and consistent self.",
  },
  {
    icon: SlidersHorizontal,
    title: "Customize your localization",
    body: "Add subtitles, refine tone, and adjust settings to match your brand's style. With one-click access to 175+ languages and dialects, videos in a collection also gain access to a multi-lingual player, which can be easily embedded on any page or LMS for seamless viewing in multiple languages.",
  },
  {
    icon: ScanFace,
    title: "Perfect lip-sync",
    body: "Forget mismatched timing. HeyGen goes beyond AI dubbing with lip-syncing that aligns translated speech perfectly with facial movements. This makes your localized content feel native, keeping audiences engaged.",
  },
  {
    icon: Languages,
    title: "Smarter translations, greater control",
    body: "Our improved brand glossary now supports forced translations, protected terms, and correct pronunciation. You can create and manage collections, add new translations easily, and modify translations to generate multiple translations from one video.",
  },
];

export function WhyUse() {
  const [lang, setLang] = useState("English");

  return (
    <SectionShell className="bg-violet-50/50 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
          Why you should use AI video translator
        </h2>
        <CtaLink className="mt-4" />
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-5 lg:gap-12">
        {/* video preview with language tabs */}
        <div className="lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
          <div
            role="tablist"
            aria-label="Preview language"
            className="flex flex-wrap gap-2"
          >
            {TAB_LANGS.map((l) => (
              <button
                key={l}
                role="tab"
                aria-selected={lang === l}
                onClick={() => setLang(l)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-all duration-200",
                  lang === l
                    ? "bg-zinc-900 text-white shadow-sm"
                    : "bg-white text-zinc-600 hover:bg-violet-100 hover:text-zinc-900"
                )}
              >
                {l}
              </button>
            ))}
          </div>

          <VideoStill
            src="/assets/hero-still.png"
            alt={`Translation demo preview in ${lang}`}
            caption={TAB_CAPTIONS[lang]}
            langLabel={lang}
            className="mt-5"
          />
          <p className="mt-3 text-center text-[13px] text-zinc-500">
            Live preview &middot; voice &amp; lips move in sync with {lang}
          </p>
        </div>

        {/* feature list */}
        <div className="space-y-8 lg:col-span-3">
          {FEATURES.map((f) => (
            <article key={f.title} className="flex gap-4 sm:gap-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                <f.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-zinc-950">{f.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-zinc-600">{f.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
