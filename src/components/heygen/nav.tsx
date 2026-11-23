"use client";

import { useState } from "react";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import { SparkLogo, LinkPill } from "./hg-ui";
import { cn } from "@/lib/utils";

type MenuItem = { title: string; desc: string };
type Menu = { label: string; blurb: string; items: MenuItem[] };

const MENUS: Menu[] = [
  {
    label: "Platform",
    blurb: "Everything you need to create and localize video with AI.",
    items: [
      { title: "AI Video Generator", desc: "Turn any script into a polished video" },
      { title: "AI Avatars", desc: "300+ stock avatars & custom avatars" },
      { title: "AI Voices", desc: "Natural text-to-speech in 175+ languages" },
      { title: "Video Translator", desc: "Translate & dub with one click" },
      { title: "Talking Photo", desc: "Make any photo speak" },
      { title: "AI Dubbing", desc: "Studio-grade multilingual dubbing" },
    ],
  },
  {
    label: "Use cases",
    blurb: "Built for teams that ship video at scale.",
    items: [
      { title: "Marketing", desc: "Localized campaigns that convert" },
      { title: "E-Learning", desc: "Courses in every language" },
      { title: "Sales Outreach", desc: "Personalized video prospecting" },
      { title: "Training & L&D", desc: "Onboarding without reshoots" },
      { title: "Localization", desc: "Go global in minutes" },
    ],
  },
  {
    label: "Developers",
    blurb: "Programmatic video, powered by a simple API.",
    items: [
      { title: "API Docs", desc: "Start building in minutes" },
      { title: "API Pricing", desc: "Transparent usage-based plans" },
      { title: "Integrations", desc: "Zapier, HubSpot, Canva & more" },
      { title: "System Status", desc: "Live platform uptime" },
    ],
  },
  {
    label: "Resources",
    blurb: "Guides, stories and best practices.",
    items: [
      { title: "Blog", desc: "Product updates & playbooks" },
      { title: "Customer Stories", desc: "How teams use HeyGen" },
      { title: "Webinars", desc: "Live demos and workshops" },
      { title: "Help Center", desc: "Answers when you need them" },
      { title: "Community", desc: "Join 100k+ creators" },
    ],
  },
];

export function Navbar() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/85 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-6xl items-center gap-1 px-4 sm:px-6"
        onMouseLeave={() => setOpen(null)}
      >
        <a href="#" className="mr-4 flex items-center" aria-label="HeyGen home">
          <SparkLogo />
        </a>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {MENUS.map((menu) => (
            <li key={menu.label}>
              <button
                className={cn(
                  "flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950",
                  open === menu.label && "bg-zinc-100 text-zinc-950"
                )}
                onMouseEnter={() => setOpen(menu.label)}
                onFocus={() => setOpen(menu.label)}
                aria-expanded={open === menu.label}
              >
                {menu.label}
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 text-zinc-400 transition-transform duration-200",
                    open === menu.label && "rotate-180"
                  )}
                />
              </button>
            </li>
          ))}
          <li>
            <a
              href="#pricing-footer"
              className="rounded-full px-3.5 py-2 text-[15px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
              onMouseEnter={() => setOpen(null)}
            >
              Pricing
            </a>
          </li>
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <button
            className="hidden h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 sm:flex"
            aria-label="Change language, English"
          >
            <Globe className="h-4 w-4" />
            EN
          </button>
          <LinkPill size="sm" variant="dark" href="#translate-tool" className="hidden sm:inline-flex">
            Book a demo
          </LinkPill>
          <a
            href="#translate-tool"
            className="hidden text-[15px] font-medium text-zinc-700 hover:text-zinc-950 sm:block sm:px-2"
          >
            Sign in
          </a>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 hover:bg-zinc-100 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Desktop dropdown panel */}
      {open && (
        <div
          className="absolute inset-x-0 top-16 hidden border-b border-zinc-100 bg-white shadow-[0_24px_48px_-16px_rgba(24,24,27,0.15)] lg:block"
          onMouseEnter={() => setOpen(open)}
        >
          <div className="mx-auto grid w-full max-w-6xl grid-cols-3 gap-x-8 gap-y-2 px-6 py-6">
            <div className="col-span-1 self-start pr-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                {open}
              </p>
              <p className="mt-2 text-lg font-semibold leading-snug text-zinc-900">
                {MENUS.find((m) => m.label === open)?.blurb}
              </p>
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-x-6 gap-y-1">
              {MENUS.find((m) => m.label === open)?.items.map((item) => (
                <a
                  key={item.title}
                  href="#"
                  className="group rounded-xl p-3 transition-colors hover:bg-violet-50"
                  onClick={(e) => e.preventDefault()}
                >
                  <p className="text-[15px] font-semibold text-zinc-900 group-hover:text-violet-700">
                    {item.title}
                  </p>
                  <p className="text-[13px] text-zinc-500">{item.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-zinc-100 bg-white px-4 pb-6 pt-2 lg:hidden">
          {MENUS.map((menu) => (
            <div key={menu.label} className="border-b border-zinc-50 py-3">
              <p className="text-sm font-semibold text-zinc-900">{menu.label}</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {menu.items.map((item) => (
                  <span
                    key={item.title}
                    className="rounded-full bg-zinc-100 px-3 py-1.5 text-[13px] text-zinc-600"
                  >
                    {item.title}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-4 flex items-center gap-3">
            <LinkPill size="sm" variant="dark" href="#translate-tool" onClick={() => setMobileOpen(false)}>
              Book a demo
            </LinkPill>
            <a href="#translate-tool" className="text-sm font-medium text-zinc-700" onClick={() => setMobileOpen(false)}>
              Sign in
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
