import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support & Contact | Jodhpur Food Recommendation MCP",
  description:
    "Support, inquiries, and FAQ for the Jodhpur Food Recommendation Model Context Protocol (MCP) service.",
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#111512] text-[#e8e4dc] antialiased font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#111512]/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-[#e2a36f]/30 bg-[#d57943]/10 text-[#f2bd91] transition-transform group-hover:scale-105">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M4 12h16M6.5 8.5h11M8 5h8M6.5 15.5h11M8 19h8"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="text-sm font-semibold tracking-wide text-white group-hover:text-[#e49a68] transition-colors">
              Jodhpur Food MCP
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-xs font-medium">
            <Link
              href="/"
              className="rounded-lg px-2.5 py-1.5 text-white/70 hover:bg-white/[0.06] hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/privacy"
              className="rounded-lg px-2.5 py-1.5 text-white/70 hover:bg-white/[0.06] hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="rounded-lg px-2.5 py-1.5 text-white/70 hover:bg-white/[0.06] hover:text-white transition-colors"
            >
              Terms
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Support Content */}
      <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-10 border-b border-white/10 pb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d57943]/30 bg-[#d57943]/10 px-3 py-1 text-[11px] font-mono tracking-widest text-[#efb68e] uppercase">
            HELP &amp; INQUIRIES
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Support &amp; Contact
          </h1>
          <p className="mt-2 text-sm text-white/50">
            Need help using the Jodhpur Food MCP in ChatGPT, or have a recommendation to suggest?
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Card 1: Contact */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#d57943]/15 text-[#f2bd91]">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m22 6-10 7L2 6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-base font-bold text-white">Email Inquiries</h2>
            <p className="mt-2 text-xs leading-relaxed text-white/60">
              For support, spot suggestions, bug reports, or partnership queries, contact our developer team:
            </p>
            <p className="mt-4 font-mono text-sm font-semibold text-[#f2bd91]">
              support@food-recommendation-mcp.vercel.app
            </p>
            <p className="mt-1 text-[11px] text-white/40">Response time: within 24-48 business hours.</p>
          </div>

          {/* Card 2: MCP Connection */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-base font-bold text-white">MCP Endpoint</h2>
            <p className="mt-2 text-xs leading-relaxed text-white/60">
              Use this endpoint to connect the server to ChatGPT Desktop, Claude, or any MCP client:
            </p>
            <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-2.5">
              <code className="block truncate font-mono text-xs text-[#efb68e]">
                https://food-recommendation-mcp.vercel.app/mcp
              </code>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-12 space-y-6">
          <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>

          <div className="space-y-4 text-sm text-white/75">
            <details className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-white">
                How do I use this MCP in ChatGPT?
                <span className="text-xs text-white/40 transition-transform group-open:rotate-180">&#9660;</span>
              </summary>
              <p className="mt-3 text-xs leading-relaxed text-white/65">
                In ChatGPT Desktop App or developer settings, add an MCP server pointing to{" "}
                <code className="text-[#efb68e]">https://food-recommendation-mcp.vercel.app/mcp</code>.
                You can then ask questions like &ldquo;Find the best Mirchi Bada in Jodhpur&rdquo; or &ldquo;Show top rated sweet shops in Sardarpura&rdquo;.
              </p>
            </details>

            <details className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-white">
                How are food spots and ratings collected?
                <span className="text-xs text-white/40 transition-transform group-open:rotate-180">&#9660;</span>
              </summary>
              <p className="mt-3 text-xs leading-relaxed text-white/65">
                Recommendations are curated from authentic local food submissions, verified community ratings, and real dining experiences in Jodhpur, Rajasthan.
              </p>
            </details>

            <details className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-white">
                Can I suggest a new restaurant or famous dish?
                <span className="text-xs text-white/40 transition-transform group-open:rotate-180">&#9660;</span>
              </summary>
              <p className="mt-3 text-xs leading-relaxed text-white/65">
                Yes! Send us the dish name, restaurant/vendor, area, and photo via email, and our team will verify and add it to the recommendations catalog.
              </p>
            </details>
          </div>
        </div>

        {/* Footer Back Button */}
        <div className="mt-14 border-t border-white/10 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-white/[0.05] border border-white/10 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/[0.1]"
          >
            &larr; Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
