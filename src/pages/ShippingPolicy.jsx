import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";
import { PackageCheck, Clock, Search, AlertCircle, Zap } from "lucide-react";

export default function ShippingPolicy() {
  useScrollToTop();

  // Page-specific SEO metadata
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Shipping & Tracking Policy | TikyTop";

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
      "Read TikyTop's Shipping and Tracking Policy to understand our digital service fulfillment, delivery times, and order tracking process."
    );
    setMetaTag("name", "robots", "index, follow");

    // OpenGraph
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:title", "Shipping & Tracking Policy | TikyTop");
    setMetaTag(
      "property",
      "og:description",
      "Read TikyTop's Shipping and Tracking Policy to understand our digital service fulfillment, delivery times, and order tracking process."
    );
    setMetaTag("property", "og:url", "https://tikytop.com/shipping-policy");
    setMetaTag("property", "og:site_name", "TikyTop");

    // Twitter
    setMetaTag("name", "twitter:card", "summary");
    setMetaTag("name", "twitter:title", "Shipping & Tracking Policy | TikyTop");
    setMetaTag(
      "name",
      "twitter:description",
      "Read TikyTop's Shipping and Tracking Policy to understand our digital service fulfillment, delivery times, and order tracking process."
    );

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://tikytop.com/shipping-policy");

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
            <PackageCheck className="w-4 h-4" />
            <span>Digital Delivery & Fulfillment</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#11223f] tracking-tight">
            Shipping & Tracking Policy
          </h1>

          {/* Symmetrically spaced accent line */}
          <div className="w-20 h-1 bg-gradient-to-r from-[#ff1681] to-[#b5179e] rounded-full my-4" />

          <p className="text-lg sm:text-xl text-[#ff1681] font-medium tracking-wide">
            Fast, secure, and reliable digital service delivery.
          </p>
        </div>
      </section>

      {/* ── CONTENT CONTAINER ── */}
      <main className="max-w-4xl mx-auto px-6 pb-20 md:pb-28">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-slate-900/5 p-6 sm:p-10 md:p-14 space-y-10">
          {/* Digital Service Notice */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-pink-50/50 via-rose-50/30 to-purple-50/40 border border-pink-100/80 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#ff1681] flex-shrink-0 mt-0.5">
              <Zap className="w-5 h-5" />
            </div>
            <p className="text-base sm:text-lg text-[#11223f] font-medium leading-relaxed">
              We provide digital social media services, so there is no physical product to ship.
            </p>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Section: Delivery & Fulfillment */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff1681] flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#11223f] tracking-tight">
                Order Delivery & Processing
              </h2>
            </div>
            <div className="pl-12">
              <p className="text-base sm:text-lg text-[#223a5e] leading-relaxed">
                After you place an order and your payment is confirmed, we will start working on your service. The delivery time depends on the service you choose and the details of your order.
              </p>
            </div>
          </section>

          <div className="h-px bg-gray-100" />

          {/* Section: Order Tracking */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff1681] flex-shrink-0">
                <Search className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#11223f] tracking-tight">
                Order Tracking & Status
              </h2>
            </div>
            <div className="pl-12">
              <p className="text-base sm:text-lg text-[#223a5e] leading-relaxed">
                You can <Link to="/track" className="text-[#ff1681] hover:underline font-semibold">check your order status through our website</Link> or <Link to="/contact-us" className="text-[#ff1681] hover:underline font-semibold">contact us</Link> if you need an update.
              </p>
            </div>
          </section>

          <div className="h-px bg-gray-100" />

          {/* Section: Potential Delays */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center text-[#ff1681] flex-shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#11223f] tracking-tight">
                Potential Delays
              </h2>
            </div>
            <div className="pl-12">
              <p className="text-base sm:text-lg text-[#223a5e] leading-relaxed">
                Sometimes, delivery may take longer than expected because of technical issues, social media platform changes, provider-side maintenance, server updates, or other unexpected reasons. We will do our best to keep you informed if there is any delay.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
