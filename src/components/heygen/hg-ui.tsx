"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Play, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------------------------- Logo --------------------------------- */

export function SparkLogo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex select-none items-center gap-1.5",
        dark ? "text-white" : "text-foreground",
        className
      )}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 1.8c.95 5.6 3.65 8.3 9.25 9.25v1.9c-5.6.95-8.3 3.65-9.25 9.25h-1.9c-.95-5.6-3.65-8.3-9.25-9.25v-1.9c5.6-.95 8.3-3.65 9.25-9.25h1.9Z"
          fill="#8b5cf6"
        />
        <circle cx="18.5" cy="5.5" r="1.6" fill="#a78bfa" />
      </svg>
      <span className="text-[20px] font-bold tracking-tight">HeyGen</span>
    </span>
  );
}

/* --------------------------------- Buttons -------------------------------- */

type PillVariant = "dark" | "purple" | "outline" | "white";

const pillVariants: Record<PillVariant, string> = {
  dark: "bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm",
  purple: "bg-violet-600 text-white hover:bg-violet-700 shadow-sm",
  outline: "border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50",
  white: "bg-white text-zinc-900 hover:bg-zinc-100 shadow-sm",
};

export function PillButton({
  variant = "dark",
  size = "md",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: PillVariant;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 active:scale-[0.98]",
        size === "sm" && "h-9 px-4 text-sm",
        size === "md" && "h-11 px-6 text-[15px]",
        size === "lg" && "h-12 px-8 text-base",
        pillVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkPill({
  variant = "dark",
  size = "md",
  className,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: PillVariant;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 active:scale-[0.98]",
        size === "sm" && "h-9 px-4 text-sm",
        size === "md" && "h-11 px-6 text-[15px]",
        size === "lg" && "h-12 px-8 text-base",
        pillVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

/* -------------------------------- Count up -------------------------------- */

export function useCountUp(target: number, duration = 1800) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return { ref, val };
}

/* ------------------------------- Video still ------------------------------ */

export function VideoStill({
  src,
  alt,
  caption,
  langLabel,
  className,
  compact = false,
}: {
  src: string;
  alt: string;
  caption: string;
  langLabel?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <figure
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-900 shadow-[0_20px_60px_-20px_rgba(80,40,180,0.35)]",
        className
      )}
    >
      { }
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10" />

      {/* play button */}
      <span
        className={cn(
          "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-lg backdrop-blur transition-transform duration-300 group-hover:scale-110",
          compact ? "h-10 w-10" : "h-14 w-14"
        )}
        aria-hidden="true"
      >
        <Play className={cn("fill-current", compact ? "h-4 w-4" : "h-6 w-6")} />
      </span>

      {/* caption bar */}
      <figcaption className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-xl bg-black/55 px-3.5 py-2.5 backdrop-blur-md">
        <Volume2 className="h-4 w-4 shrink-0 text-violet-300" aria-hidden="true" />
        <span className="min-w-0 flex-1 truncate text-[13px] font-medium leading-snug text-white sm:text-sm">
          {caption}
        </span>
        {langLabel ? (
          <span className="shrink-0 rounded-full bg-violet-500/80 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
            {langLabel}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}

/* -------------------------------- Waveform -------------------------------- */

export function Waveform({ bars = 28, className }: { bars?: number; className?: string }) {
  return (
    <div className={cn("hg-wave flex h-8 items-center gap-[3px]", className)} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-violet-400"
          style={{
            height: `${20 + ((i * 37) % 80)}%`,
            animationDelay: `${(i % 9) * 0.09}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ----------------------------- Section helpers ---------------------------- */

export function SectionShell({
  children,
  className,
  dark = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("w-full", dark ? "bg-zinc-950 text-white" : "bg-white text-zinc-900", className)}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

export function CtaLink({ className }: { className?: string }) {
  return (
    <a
      href="#translate-tool"
      className={cn(
        "group inline-flex items-center gap-1.5 text-[15px] font-semibold text-violet-700 hover:text-violet-800",
        className
      )}
    >
      Get started for free
      <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
    </a>
  );
}
