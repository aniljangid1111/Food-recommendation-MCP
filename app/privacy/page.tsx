import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Jodhpur Food Recommendation MCP",
  description:
    "Privacy Policy for the Jodhpur Food Recommendation MCP service and ChatGPT application.",
};

export default function PrivacyPolicyPage() {
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
              href="/terms"
              className="rounded-lg px-2.5 py-1.5 text-white/70 hover:bg-white/[0.06] hover:text-white transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/support"
              className="rounded-lg px-2.5 py-1.5 text-white/70 hover:bg-white/[0.06] hover:text-white transition-colors"
            >
              Support
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Legal Content */}
      <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-10 border-b border-white/10 pb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d57943]/30 bg-[#d57943]/10 px-3 py-1 text-[11px] font-mono tracking-widest text-[#efb68e] uppercase">
            LEGAL DOCUMENT
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-white/50">
            Effective Date: November 17, 2026 &bull; Last Updated: November 17, 2026
          </p>
        </div>

        <div className="space-y-9 text-sm leading-relaxed text-white/75">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Introduction</h2>
            <p>
              Welcome to the <strong>Jodhpur Food Recommendation MCP</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
              We provide a Model Context Protocol (MCP) server designed to assist users in discovering authentic dishes, street food,
              and restaurants across Jodhpur, Rajasthan.
            </p>
            <p>
              This Privacy Policy explains how information is handled when you interact with our MCP tools, interactive carousel cards,
              and public web interfaces through ChatGPT or any MCP-compatible application.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Information We Collect</h2>
            <p>
              Our service operates on a strict principle of data minimization:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-white/70">
              <li>
                <strong>Search Queries:</strong> Parameters provided to tools such as city, dish name, area, or category are processed in real time solely to filter and return matching recommendations.
              </li>
              <li>
                <strong>No Personal Accounts:</strong> We do not require accounts, sign-ups, passwords, or personal identity profiles to use the food recommendations.
              </li>
              <li>
                <strong>No Tracking or Cookies:</strong> We do not use advertising trackers, persistent cookies, or behavioral profiling trackers.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. How Information is Used</h2>
            <p>
              Search inputs are used exclusively for:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-white/70">
              <li>Querying curated local food databases (e.g. verified Google Sheet entries).</li>
              <li>Calculating relevance, ratings, and top-pick rankings for dish recommendations.</li>
              <li>Generating Google Maps search links so users can navigate to food locations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Third-Party Services</h2>
            <p>
              When using this MCP server, the following third-party integrations may be involved:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-white/70">
              <li>
                <strong>OpenAI / ChatGPT:</strong> Your chat messages and tool executions are processed according to OpenAI&apos;s Privacy Policy.
              </li>
              <li>
                <strong>Google Maps:</strong> Clicking on &ldquo;View on Google Maps&rdquo; opens an external Google Maps link subject to Google&apos;s Terms of Service and Privacy Policy.
              </li>
              <li>
                <strong>Hosting (Vercel):</strong> Standard server connection logs (such as IP addresses and request timestamps) are processed by our cloud hosting provider for security and reliability.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Data Retention &amp; Security</h2>
            <p>
              Search queries processed by the MCP tools are ephemeral and are not stored in any permanent marketing database. We implement modern HTTPS encryption for all MCP transport endpoints.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">6. Children&apos;s Privacy</h2>
            <p>
              Our food recommendation guide is designed for general audiences and does not knowingly collect any personal information from children under the age of 13.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">7. Changes to this Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any updates will be published on this page with an updated &ldquo;Effective Date&rdquo;.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or data handling, please visit our{" "}
              <Link href="/support" className="text-[#efb68e] underline underline-offset-4 hover:text-white">
                Support &amp; Contact page
              </Link>.
            </p>
          </section>
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
