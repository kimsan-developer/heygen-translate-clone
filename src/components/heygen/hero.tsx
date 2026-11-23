"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  FileVideo,
  Link2,
  Loader2,
  RotateCcw,
  Trash2,
  UploadCloud,
  XCircle,
  Download,
} from "lucide-react";
import { PillButton, LinkPill, Waveform } from "./hg-ui";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  "English", "Chinese", "Spanish", "German", "French", "Japanese", "Portuguese", "Russian",
  "Hindi", "Arabic", "Italian", "Korean", "Dutch", "Polish", "Turkish", "Indonesian",
  "Vietnamese", "Thai", "Ukrainian", "Swedish", "Norwegian", "Danish", "Finnish", "Greek",
  "Hebrew", "Czech", "Hungarian", "Romanian", "Bulgarian", "Serbian", "Croatian", "Slovak",
  "Bangla", "Urdu", "Tamil", "Telugu", "Marathi", "Malayalam", "Filipino", "Malay",
  "Swahili", "Yoruba", "Hausa", "Amharic", "Persian", "Pashto", "Kurdish", "Azerbaijani",
  "Georgian", "Armenian", "Kazakh", "Uzbek", "Mongolian", "Nepali", "Sinhala", "Burmese",
  "Khmer", "Lao", "Catalan", "Basque", "Galician", "Afrikaans", "Albanian", "Bosnian",
];

/* Localized subtitle previews for the result card (top languages). */
const SUBTITLE_PREVIEW: Record<string, string> = {
  English: "Hello! This is your video, translated with HeyGen.",
  Chinese: "你好！这是用 HeyGen 翻译的你的视频。",
  Spanish: "¡Hola! Este es tu video traducido con HeyGen.",
  German: "Hallo! Dies ist dein Video, übersetzt mit HeyGen.",
  French: "Bonjour ! Voici votre vidéo traduite avec HeyGen.",
  Japanese: "こんにちは！これは HeyGen で翻訳された動画です。",
  Portuguese: "Olá! Este é o seu vídeo traduzido com o HeyGen.",
  Russian: "Привет! Это ваше видео, переведённое с HeyGen.",
  Hindi: "नमस्ते! यह आपका वीडियो है, HeyGen से अनुवादित।",
  Arabic: "مرحباً! هذا هو الفيديو الخاص بك مترجماً بواسطة HeyGen.",
  Korean: "안녕하세요! HeyGen으로 번역된 영상입니다.",
  Italian: "Ciao! Questo è il tuo video tradotto con HeyGen.",
};

const STEPS = [
  { label: "Uploading video", weight: 14 },
  { label: "Extracting audio", weight: 14 },
  { label: "Cloning your voice", weight: 20 },
  { label: "Translating", weight: 24 },
  { label: "Lip-syncing & rendering", weight: 28 },
];

const RESULT_SRC = "/assets/hero-still.png";

export function Hero() {
  const { toast } = useToast();
  const [file, setFile] = useState<{ name: string; size: string } | null>(null);
  const [url, setUrl] = useState("");
  const [lang, setLang] = useState("English");
  const [stage, setStage] = useState<"idle" | "running" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => stopTimer, [stopTimer]);

  const setFileFromList = (files: FileList | null) => {
    const f = files?.[0];
    if (!f) return;
    if (!f.type.startsWith("video/") && !/\.(mp4|mov|webm|avi|mkv)$/i.test(f.name)) {
      toast({
        title: "Unsupported file",
        description: "Please choose a video file (MP4, MOV, WebM, AVI).",
        variant: "destructive",
      });
      return;
    }
    setFile({ name: f.name, size: `${(f.size / (1024 * 1024)).toFixed(1)} MB` });
  };

  const startTranslate = () => {
    if (stage === "running") return;
    if (!file && !url.trim()) {
      toast({
        title: "Nothing to translate yet",
        description: "Upload a video file or paste a YouTube link first.",
        variant: "destructive",
      });
      return;
    }
    if (url.trim() && !/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url.trim())) {
      toast({
        title: "Invalid YouTube link",
        description: "Paste a link that starts with youtube.com or youtu.be.",
        variant: "destructive",
      });
      return;
    }
    setStage("running");
    setProgress(0);
    setCurrentStep(0);
    const total = STEPS.reduce((s, x) => s + x.weight, 0);
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + 100 / (total * 3.4));
        // find current step from progress
        let acc = 0;
        for (let i = 0; i < STEPS.length; i++) {
          acc += STEPS[i].weight;
          if (next < acc) {
            setCurrentStep(i);
            break;
          }
        }
        if (next >= 100) {
          stopTimer();
          setTimeout(() => setStage("done"), 350);
        }
        return next;
      });
    }, 48);
  };

  const reset = () => {
    stopTimer();
    setStage("idle");
    setProgress(0);
    setFile(null);
    setUrl("");
    setCurrentStep(0);
  };

  const stepPrefix = lang === "English" ? "" : ` to ${lang}`;

  return (
    <section className="relative overflow-hidden bg-white">
      {/* soft lavender backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(60%_80%_at_50%_0%,rgba(139,92,246,0.14),transparent_70%)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6">
        {/* breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-zinc-500">
          <a href="#" className="hover:text-zinc-800" onClick={(e) => e.preventDefault()}>
            Home
          </a>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-zinc-800">AI Video Translator</span>
        </nav>

        {/* headline */}
        <div className="mx-auto mt-8 max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl md:text-6xl">
            AI Video Translator
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-lg leading-relaxed text-zinc-600">
            Translate videos into 175+ languages with realistic AI voices, lip sync, and subtitles.
            Expand your global reach in minutes with no editing required.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <LinkPill variant="dark" size="lg" href="#translate-tool">
              Get Started for Free
            </LinkPill>
            <LinkPill variant="outline" size="lg" href="#translate-tool">
              Translate video
            </LinkPill>
          </div>
        </div>

        {/* --------------------------- translate widget -------------------------- */}
        <div
          id="translate-tool"
          className="mx-auto mt-12 w-full max-w-2xl scroll-mt-24 rounded-3xl border border-zinc-200 bg-white p-5 shadow-[0_30px_80px_-24px_rgba(88,44,180,0.28)] sm:p-7"
        >
          {stage === "idle" && (
            <div className="space-y-4">
              {/* dropzone */}
              <div
                role="button"
                tabIndex={0}
                aria-label="Upload a video"
                onClick={() => inputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  setFileFromList(e.dataTransfer.files);
                }}
                className={cn(
                  "cursor-pointer rounded-2xl border-2 border-dashed px-6 py-9 text-center transition-colors",
                  dragOver
                    ? "border-violet-500 bg-violet-50"
                    : "border-zinc-200 bg-zinc-50/60 hover:border-violet-400 hover:bg-violet-50/50"
                )}
              >
                <UploadCloud className="mx-auto h-9 w-9 text-violet-500" aria-hidden="true" />
                <p className="mt-3 text-[15px] font-semibold text-zinc-900">
                  Tap to upload a video!
                </p>
                <p className="mt-1 text-[13px] text-zinc-500">
                  See it in another language in just minutes. MP4, MOV, WebM &middot; up to 3 min on
                  the free plan.
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => setFileFromList(e.target.files)}
                />
              </div>

              {/* selected file chip */}
              {file && (
                <div className="flex items-center gap-3 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3">
                  <FileVideo className="h-5 w-5 shrink-0 text-violet-600" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-900">{file.name}</p>
                    <p className="text-xs text-zinc-500">{file.size}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="rounded-full p-1.5 text-zinc-400 transition-colors hover:bg-white hover:text-red-500"
                    aria-label="Remove selected file"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* youtube link */}
              <div>
                <label
                  htmlFor="yt-link"
                  className="mb-1.5 block text-[13px] font-medium text-zinc-600"
                >
                  Or paste a YouTube link:
                </label>
                <div className="relative">
                  <Link2
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                    aria-hidden="true"
                  />
                  <input
                    id="yt-link"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="h-11 w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                  />
                </div>
              </div>

              {/* language + CTA */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="flex-1">
                  <label className="mb-1.5 block text-[13px] font-medium text-zinc-600">
                    Translate to:
                  </label>
                  <Select value={lang} onValueChange={setLang}>
                    <SelectTrigger className="h-11 w-full rounded-xl border-zinc-200 text-sm font-medium focus:ring-violet-100">
                      <SelectValue placeholder="Choose language" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      <SelectGroup>
                        <SelectLabel>175+ languages available</SelectLabel>
                        {LANGUAGES.map((l) => (
                          <SelectItem key={l} value={l} className="text-sm">
                            {l}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <PillButton
                  variant="purple"
                  size="lg"
                  onClick={startTranslate}
                  className="sm:w-auto w-full"
                >
                  Translate video
                </PillButton>
              </div>
            </div>
          )}

          {stage === "running" && (
            <div className="py-2">
              <div className="flex items-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin text-violet-600" aria-hidden="true" />
                <p className="text-[15px] font-semibold text-zinc-900">
                  Translating to {lang}&hellip; {Math.floor(progress)}%
                </p>
                <span className="ml-auto rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                  {file ? file.name : url.slice(0, 34) + (url.length > 34 ? "…" : "")}
                </span>
              </div>
              <Progress value={progress} className="mt-4 h-2 bg-zinc-100 [&>div]:bg-violet-600" />
              <ul className="mt-5 space-y-2.5">
                {STEPS.map((s, i) => {
                  const done = i < currentStep || progress >= 100;
                  const active = i === currentStep && progress < 100;
                  return (
                    <li key={s.label} className="flex items-center gap-2.5 text-sm">
                      {done ? (
                        <CheckCircle2 className="h-4.5 w-4.5 h-[18px] w-[18px] text-emerald-500" />
                      ) : active ? (
                        <Loader2 className="h-[18px] w-[18px] animate-spin text-violet-600" />
                      ) : (
                        <span className="h-[18px] w-[18px] rounded-full border border-zinc-200" />
                      )}
                      <span
                        className={cn(
                          "font-medium",
                          done ? "text-zinc-500" : active ? "text-zinc-900" : "text-zinc-400"
                        )}
                      >
                        {s.label}
                        {s.label === "Translating" ? stepPrefix : ""}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <Waveform className="mt-5 h-6 opacity-80" bars={40} />
              <button
                onClick={reset}
                className="mx-auto mt-4 block text-sm font-medium text-zinc-500 hover:text-zinc-800"
              >
                Cancel
              </button>
            </div>
          )}

          {stage === "done" && (
            <div className="py-1">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-hidden="true" />
                <p className="text-[15px] font-semibold text-zinc-900">
                  Your video is ready in {lang}!
                </p>
              </div>
              <div className="relative mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-900">
                { }
                <img
                  src={RESULT_SRC}
                  alt={`Translated video preview in ${lang}`}
                  className="aspect-video w-full object-cover"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-x-3 bottom-3 rounded-xl bg-black/55 px-3.5 py-2.5 backdrop-blur-md">
                  <p className="text-[13px] font-medium leading-snug text-white sm:text-sm">
                    {SUBTITLE_PREVIEW[lang] ?? SUBTITLE_PREVIEW["English"]}
                  </p>
                </div>
                <span className="absolute right-3 top-3 rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white">
                  {lang}
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <PillButton
                  variant="dark"
                  className="flex-1"
                  onClick={() =>
                    toast({
                      title: "Download started",
                      description: `${lang} video with cloned voice & subtitles is on its way.`,
                    })
                  }
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download MP4
                </PillButton>
                <PillButton variant="outline" className="flex-1" onClick={reset}>
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Translate another
                </PillButton>
              </div>
            </div>
          )}
        </div>

        {/* sample gallery strip */}
        {stage === "idle" && (
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-zinc-500">
            <span className="inline-flex items-center gap-1.5">
              <XCircle className="h-3.5 w-3.5 text-zinc-300" aria-hidden="true" /> No credit card
              required
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" /> Free plan:
              3 videos / month
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" /> Voice
              cloning included
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
