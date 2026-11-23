import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Jodhpur Food Recommendation MCP",
  description:
    "Terms of Service governing the use of the Jodhpur Food Recommendation MCP service and tools.",
};

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-white/50">
            Effective Date: November 17, 2026 &bull; Last Updated: November 17, 2026
          </p>
        </div>

        <div className="space-y-9 text-sm leading-relaxed text-white/75">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Agreement to Terms</h2>
            <p>
              By accessing or using the <strong>Jodhpur Food Recommendation MCP</strong> through ChatGPT, MCP client applications,
              or our website endpoints, you agree to be bound by these Terms of Service. If you do not agree to these terms,
              please refrain from using the service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Description of Service</h2>
            <p>
              The Jodhpur Food Recommendation MCP provides curated discovery tools and interactive recommendation widgets for dishes,
              street food items, localities, and restaurants in Jodhpur, Rajasthan.
            </p>
            <p>
              All recommendations, reviews, and ratings are provided for informational and discovery purposes only.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Accuracy of Information &amp; Disclaimer</h2>
            <p>
              While we make diligent efforts to maintain accurate and up-to-date information:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-white/70">
              <li>
                <strong>Operational Changes:</strong> Restaurant timings, menu availability, pricing, and operating status may change without notice.
              </li>
              <li>
                <strong>Dietary &amp; Allergy Responsibility:</strong> Users are solely responsible for verifying food ingredients, allergen information, hygiene standards, and dietary compatibility (e.g. Pure Vegetarian, Jain, Vegan) directly with each restaurant or vendor.
              </li>
              <li>
                <strong>No Affiliation / Endorsement:</strong> Mention of third-party restaurants or eateries does not constitute an official commercial sponsorship or endorsement.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Permitted &amp; Acceptable Use</h2>
            <p>
              You agree to use this service only for lawful personal or commercial discovery purposes. You agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-white/70">
              <li>Attempt to overload, disrupt, or launch denial-of-service attacks against our endpoints.</li>
              <li>Reverse engineer or misuse the MCP streamable transport in ways that bypass normal API limits.</li>
              <li>Impersonate any restaurant, business owner, or reviewer.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, the service is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis.
              We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of
              the recommendations, food consumption, travel to recommended locations, or external website links.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">6. Intellectual Property</h2>
            <p>
              The MCP server code, interactive widgets, and branding are protected by applicable intellectual property rights.
              Restaurant names, trademarks, and third-party photos remain the property of their respective owners.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">7. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">8. Contact Information</h2>
            <p>
              For legal inquiries or questions regarding these Terms, please reach out via our{" "}
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
