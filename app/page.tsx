"use client";

import { useState } from "react";
import Link from "next/link";

const MCP_ENDPOINT = "https://food-recommendation-mcp.vercel.app/mcp";

const tools = [
  {
    number: "01",
    name: "search_food",
    description: "Find a dish, restaurant, or food spot by area.",
    fields: "CITY · DISH · AREA · CATEGORY",
  },
  {
    number: "02",
    name: "get_top_foods",
    description: "Explore the highest-rated food recommendations.",
    fields: "CITY · CATEGORY · LIMIT",
  },
];

export default function Home() {
  const [copied, setCopied] = useState(false);

  async function copyEndpoint() {
    try {
      await navigator.clipboard.writeText(MCP_ENDPOINT);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#111512] text-[#f5f2e9]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-48 h-[620px] w-[620px] rounded-full bg-[#c05a2b]/15 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-64 -left-36 h-[520px] w-[520px] rounded-full bg-[#718047]/10 blur-[100px]"
      />

      <section className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-12">
        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <Link href="/" className="flex items-center gap-3" aria-label="Jodhpur Food MCP home">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#e2a36f]/30 bg-[#d57943]/10 text-[#f2bd91]">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path d="M4 12h16M6.5 8.5h11M8 5h8M6.5 15.5h11M8 19h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-wide">JODHPUR FOOD</span>
              <span className="block text-[10px] tracking-[0.24em] text-white/45">RECOMMENDATION MCP</span>
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <nav className="flex items-center gap-3 sm:gap-4 text-xs font-medium text-white/60">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/support" className="hover:text-white transition-colors">Support</Link>
            </nav>

            <div className="hidden xs:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/65">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              MCP server
            </div>
          </div>
        </header>

        <div id="home" className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1fr_0.92fr] lg:gap-20 lg:py-16">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d57943]/25 bg-[#d57943]/10 px-3.5 py-2 text-xs font-medium tracking-wide text-[#efb68e]">
              <span aria-hidden="true">✦</span>
              JODHPUR, RAJASTHAN
            </div>

            <h1 className="max-w-xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-[76px]">
              Find your next
              <span className="mt-1 block font-serif font-normal italic text-[#e49a68]">favourite bite.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              A local food guide for Jodhpur, powered by simple MCP tools. Search by dish, explore top picks, and open directions in Maps.
            </p>

            <div className="mt-9 flex flex-wrap gap-2.5">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white/70">Street food</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white/70">Local favourites</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white/70">Google Maps</span>
            </div>
          </div>

          <div className="w-full max-w-[580px] justify-self-center lg:justify-self-end">
            <div className="overflow-hidden rounded-[26px] border border-white/10 bg-[#191e19]/90 shadow-[0_30px_100px_-40px_rgba(0,0,0,0.85)] backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-6">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#df7956]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e2b16d]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#8ca26a]" />
                </div>
                <span className="font-mono text-[11px] text-white/40">FOOD MCP · TOOLS</span>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-medium text-emerald-300">READY</span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">Available tools</p>
                  <span className="font-mono text-[11px] text-white/35">02</span>
                </div>

                <div className="space-y-3">
                  {tools.map((tool) => (
                    <article key={tool.name} className="group rounded-2xl border border-white/[0.09] bg-white/[0.025] p-4 transition-colors hover:border-[#d57943]/35 hover:bg-[#d57943]/[0.045] sm:p-5">
                      <div className="flex items-start gap-4">
                        <span className="pt-0.5 font-mono text-xs text-[#d99063]">{tool.number}</span>
                        <div className="min-w-0 flex-1">
                          <h2 className="font-mono text-sm font-medium text-[#f4d3bb]">{tool.name}</h2>
                          <p className="mt-2 text-sm leading-6 text-white/55">{tool.description}</p>
                          <p className="mt-3 font-mono text-[9px] tracking-[0.14em] text-white/30">{tool.fields}</p>
                        </div>
                        <svg viewBox="0 0 20 20" fill="none" className="mt-1 h-4 w-4 shrink-0 text-white/25 transition group-hover:translate-x-0.5 group-hover:text-[#e49a68]" aria-hidden="true">
                          <path d="M4 10h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-white/[0.08] bg-[#101410] p-4 sm:p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-xs font-medium text-white/55">Connect this MCP server</p>
                    <span className="font-mono text-[10px] text-white/30">STREAMABLE HTTP</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.035] p-2.5 pl-3">
                    <code className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[11px] text-[#d8c7b9] sm:text-xs">{MCP_ENDPOINT}</code>
                    <button
                      type="button"
                      onClick={copyEndpoint}
                      className="shrink-0 rounded-lg bg-[#d57943] px-3 py-2 text-xs font-semibold text-[#1d130e] transition hover:bg-[#e7925c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1bb94]"
                    >
                      {copied ? "Copied" : "Copy URL"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-[11px] tracking-wide text-white/35 lg:text-right">Built for curious eaters and local discoveries.</p>
          </div>
        </div>

        <footer className="flex flex-col gap-3 border-t border-white/10 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-white/60">JODHPUR FOOD RECOMMENDATION MCP</span>
            <span>&bull;</span>
            <span>SEARCH LOCAL · EAT WELL</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-white/60">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/support" className="hover:text-white transition-colors">Support &amp; Contact</Link>
          </div>
        </footer>
      </section>
    </main>
  );
}
