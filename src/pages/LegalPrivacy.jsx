import React, { useEffect } from "react";
import useScrollToTop from "../hooks/useScrollToTop";
import { Shield, Database, CheckCircle, Share2, Lock, Cookie, RefreshCw } from "lucide-react";

export default function PrivacyPolicy() {
  useScrollToTop();

  // Page-specific SEO metadata
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "TikyTop Privacy Policy | Your Privacy Matters";

    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
      return element;
    };

    setMetaTag(
      "name",
      "description",
      "Read TikyTop's Privacy Policy to learn how we collect, use, and protect your information when using TikyTop.com."
    );
    setMetaTag("name", "robots", "index, follow");

    // OpenGraph
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:title", "TikyTop Privacy Policy | Your Privacy Matters");
    setMetaTag(
      "property",
      "og:description",
      "Read TikyTop's Privacy Policy to learn how we collect, use, and protect your information when using TikyTop.com."
    );
    setMetaTag("property", "og:url", "https://tikytop.com/privacy-policy");
    setMetaTag("property", "og:site_name", "TikyTop");

    // Twitter
    setMetaTag("name", "twitter:card", "summary");
    setMetaTag("name", "twitter:title", "TikyTop Privacy Policy | Your Privacy Matters");
    setMetaTag(
      "name",
      "twitter:description",
      "Read TikyTop's Privacy Policy to learn how we collect, use, and protect your information when using TikyTop.com."
    );

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://tikytop.com/privacy-policy");

    return () => {
      document.title = originalTitle;
      const removeMetaTag = (attrName, attrValue) => {
        const element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
        if (element) element.remove();
      };
      removeMetaTag("name", "description");
      removeMetaTag("name", "robots");
      removeMetaTag("property", "og:type");
      removeMetaTag("property", "og:title");
      removeMetaTag("property", "og:description");
      removeMetaTag("property", "og:url");
      removeMetaTag("property", "og:site_name");
      removeMetaTag("name", "twitter:card");
      removeMetaTag("name", "twitter:title");
      removeMetaTag("name", "twitter:description");

      const canonicalEl = document.querySelector('link[rel="canonical"]');
      if (canonicalEl) canonicalEl.remove();
    };
  }, []);

  return (
    <div className="bg-slate-50/50 min-h-screen font-sans antialiased text-[#223a5e] overflow-x-hidden">
      {/* ── HERO / HEADER ── */}
      <section className="relative pt-32 pb-14 md:pt-40 md:pb-20 px-6 overflow-hidden bg-gradient-to-b from-[#fdf2f8] via-[#faf5ff] to-slate-50/50 text-center">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[260px] bg-gradient-to-tr from-pink-300/20 via-purple-300/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200/70 text-[#ff1681] text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <Shield className="w-4 h-4" />
            <span>TikyTop Trust & Safety</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#11223f] tracking-tight">
            Privacy Policy
          </h1>

          {/* Perfectly centered & symmetrically spaced gradient accent line */}
          <div className="w-20 h-1 bg-gradient-to-r from-[#ff1681] to-[#b5179e] rounded-full my-4" />

          <p className="text-lg sm:text-xl text-[#ff1681] font-medium tracking-wide">
            Your privacy matters to us.
          </p>
        </div>
      </section>

      {/* ── CONTENT CONTAINER ── */}
      <main className="max-w-4xl mx-auto px-6 pb-20 md:pb-28">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-slate-900/5 p-6 sm:p-10 md:p-14 space-y-10">
          {/* Introduction */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-pink-50/50 via-rose-50/30 to-purple-50/40 border border-pink-100/80">
            <p className="text-base sm:text-lg text-[#223a5e] leading-relaxed">
              Your privacy matters to us. This policy explains how we use, collect, and protect your information when you are using TikyTop.com. By using our service, you agree to the collection and use of your data as mentioned in this Privacy Policy.
            </p>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Section: Information we Collect */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff1681] flex-shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#11223f] tracking-tight">
                Information we Collect
              </h2>
            </div>
            <div className="pl-12">
              <p className="text-base sm:text-lg text-[#223a5e] leading-relaxed">
                Note: The information we collect from you is only to improve the user experience.
              </p>
            </div>
          </section>

          <div className="h-px bg-gray-100" />

          {/* Section: How We Use Your Information */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff1681] flex-shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#11223f] tracking-tight">
                How We Use Your Information
              </h2>
            </div>
            <div className="pl-12 space-y-4">
              <p className="text-base sm:text-lg text-[#223a5e] leading-relaxed">
                We use your information to:
              </p>
              <ul className="space-y-2.5 text-base sm:text-lg text-[#223a5e]">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#ff1681] flex-shrink-0" />
                  <span>Provide and manage our services</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#ff1681] flex-shrink-0" />
                  <span>Process payments and orders</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#ff1681] flex-shrink-0" />
                  <span>Improve our website and services</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#ff1681] flex-shrink-0" />
                  <span>Prevent fraud or misuse</span>
                </li>
              </ul>
              <p className="text-base sm:text-lg text-[#223a5e] leading-relaxed pt-2">
                We do not sell or rent your personal information to third parties.
              </p>
            </div>
          </section>

          <div className="h-px bg-gray-100" />

          {/* Section: Social Media Information */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff1681] flex-shrink-0">
                <Share2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#11223f] tracking-tight">
                Social Media Information
              </h2>
            </div>
            <div className="pl-12">
              <p className="text-base sm:text-lg text-[#223a5e] leading-relaxed">
                If you connect a social media account with our service, we do not access or use your account beyond what is required.
              </p>
            </div>
          </section>

          <div className="h-px bg-gray-100" />

          {/* Section: Payments */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff1681] flex-shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#11223f] tracking-tight">
                Payments
              </h2>
            </div>
            <div className="pl-12">
              <p className="text-base sm:text-lg text-[#223a5e] leading-relaxed">
                Payments may be processed through a secure process. We do not store your complete payment or card details on our servers.
              </p>
            </div>
          </section>

          <div className="h-px bg-gray-100" />

          {/* Section: Cookies */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff1681] flex-shrink-0">
                <Cookie className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#11223f] tracking-tight">
                Cookies
              </h2>
            </div>
            <div className="pl-12 space-y-4 text-base sm:text-lg text-[#223a5e] leading-relaxed">
              <p>
                Our website may use cookies and similar technologies to improve your experience and understand how visitors use our website.
              </p>
              <p>
                We use cookies to improve your browsing experience.
              </p>
              <p>
                Cookies are small text files stored on your device when you agree to them. These cookies will not harm any code or software.
              </p>
              <p>
                Generally, only the website that placed them can access cookies. So, ensure that TikyTop does not use cookies to access personal information on your device.
              </p>
            </div>
          </section>

          <div className="h-px bg-gray-100" />

          {/* Section: Changes to This Policy */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff1681] flex-shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#11223f] tracking-tight">
                Changes to This Policy
              </h2>
            </div>
            <div className="pl-12">
              <p className="text-base sm:text-lg text-[#223a5e] leading-relaxed">
                Any changes will be posted on this page with an updated date.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
