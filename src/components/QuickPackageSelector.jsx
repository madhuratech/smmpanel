import React, { useState, useEffect } from "react";
import API_URL from "../config/api";
import { FaFire, FaCheck, FaUserCheck, FaClock, FaHeadset, FaShieldAlt, FaLock, FaBolt } from "react-icons/fa";

export default function QuickPackageSelector({
  platform = "tiktok",
  serviceKey = "views",
  serviceTitle = "Views",
  selectedPackage,
  onSelectPackage,
  scrollTargetId = "tiktok-search-box"
}) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/pricing/all`, { cache: "no-store" });
        const data = await res.json();
        
        if (!isMounted) return;

        if (data.success && Array.isArray(data.data)) {
          const matchedItem = data.data.find((item) => {
            const itemPlatform = item.platform?.toLowerCase().trim();
            const itemKey = item.serviceKey?.toLowerCase().trim();
            const targetPlatform = platform.toLowerCase().trim();
            const targetKey = serviceKey.toLowerCase().trim();
            const fullTargetKey = `${targetPlatform}_${targetKey}`;

            const isPlatformMatch = itemPlatform === targetPlatform;
            const isKeyMatch = itemKey === targetKey || itemKey === fullTargetKey || item.service?.toLowerCase().includes(targetKey);
            return isPlatformMatch && isKeyMatch && item.status !== "Inactive";
          });

          if (matchedItem) {
            if (matchedItem.packages && matchedItem.packages.length > 0) {
              const sorted = [...matchedItem.packages].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0) || a.quantity - b.quantity);
              setPackages(sorted);
            } else if (matchedItem.price && matchedItem.price > 0) {
              // Generate tiers from base price if no custom package array exists
              const tiers = [500, 1000, 2500, 5000, 10000, 25000];
              const generated = tiers.map((qty, idx) => {
                const pkgPrice = ((qty / (matchedItem.baseQuantity || 1000)) * matchedItem.price).toFixed(2);
                let badge = null;
                if (idx === 0) badge = "STARTER";
                if (idx === 1) badge = "POPULAR";
                if (idx === 3) badge = "BEST VALUE";
                return {
                  quantity: qty,
                  price: Number(pkgPrice),
                  badge,
                  badgeColor: badge === "POPULAR" ? "bg-pink-500" : "bg-purple-600"
                };
              });
              setPackages(generated);
            }
          }
        }
      } catch (err) {
        console.error("QuickPackageSelector Fetch Error:", err);
        if (isMounted) setError("Failed to load packages");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPackages();
    return () => { isMounted = false; };
  }, [platform, serviceKey]);

  const handleCardClick = (pkg) => {
    if (onSelectPackage) {
      onSelectPackage(pkg);
    }

    if (scrollTargetId) {
      const el = document.getElementById(scrollTargetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  if (loading) {
    return (
      <div className="py-12 px-4 text-center bg-slate-50">
        <div className="inline-flex items-center gap-2 text-pink-600 font-semibold text-sm animate-pulse">
          <div className="w-4 h-4 border-2 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
          Loading {serviceTitle} Packages...
        </div>
      </div>
    );
  }

  if (!packages || packages.length === 0) {
    return null;
  }

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 bg-slate-50 relative overflow-hidden text-slate-800 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 text-pink-600 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4 shadow-sm">
            <FaFire className="text-pink-500" /> Quick Package Selection
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Select Your <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">TikTok {serviceTitle}</span> Package
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-slate-600 font-medium px-2">
            Pick a pre-configured package to jump straight into your order with instant processing.
          </p>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {packages.map((pkg, index) => {
            const isSelected = selectedPackage?.quantity === pkg.quantity;
            const badgeText = pkg.badge || (index === 1 ? "POPULAR" : index === 3 ? "BEST VALUE" : null);

            return (
              <div
                key={index}
                onClick={() => handleCardClick(pkg)}
                className={`group relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 border ${
                  isSelected
                    ? "border-2 border-pink-500 ring-4 ring-pink-500/10 bg-gradient-to-b from-pink-50/60 via-white to-white shadow-lg"
                    : "border-slate-200/90 hover:border-pink-300"
                }`}
              >
                {/* Highlight Badge */}
                {badgeText && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[10px] font-extrabold tracking-wider text-white uppercase rounded-full bg-gradient-to-r from-pink-500 to-purple-600 shadow-sm">
                      {badgeText}
                    </span>
                  </div>
                )}

                {/* Card Top: Quantity */}
                <div className="text-center pt-1 pb-3 sm:pt-2 sm:pb-4 border-b border-slate-100">
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight group-hover:text-pink-600 transition-colors">
                    {pkg.quantity.toLocaleString()}
                  </div>
                  <div className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-slate-400 mt-1">
                    TikTok {serviceTitle}
                  </div>
                </div>

                {/* Static Feature List */}
                <ul className="py-4 sm:py-5 space-y-2 sm:space-y-2.5 text-xs text-slate-600 font-medium">
                  <li className="flex items-center gap-2">
                    <FaUserCheck className="text-pink-500 flex-shrink-0 text-xs" />
                    <span className="truncate">Active TikTok {serviceTitle}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaHeadset className="text-pink-500 flex-shrink-0 text-xs" />
                    <span>24/7 Support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaBolt className="text-pink-500 flex-shrink-0 text-xs" />
                    <span>Instant Delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaLock className="text-pink-500 flex-shrink-0 text-xs" />
                    <span>No Password Required</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaShieldAlt className="text-pink-500 flex-shrink-0 text-xs" />
                    <span>Highly Secured</span>
                  </li>
                </ul>

                {/* Price & Selection Footer */}
                <div className="pt-3 sm:pt-4 border-t border-slate-100 text-center">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 mb-0.5">
                    ${Number(pkg.price).toFixed(2)}{" "}
                    <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase">USD</span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium mb-2.5 sm:mb-3">per order</div>

                  <button
                    type="button"
                    className={`w-full py-2.5 px-3 sm:px-4 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                      isSelected
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20"
                        : "bg-pink-50 group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-600 text-pink-600 group-hover:text-white"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <FaCheck className="text-xs" /> Selected
                      </>
                    ) : (
                      "Select Package"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
