import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

export default function QuickServicesLoopNav({ excludePath }) {
  const location = useLocation();
  const currentPath = (excludePath || location.pathname || "").toLowerCase().trim();

  // Master list of TikTok & Instagram services
  const allServices = [
    {
      id: "tiktok-followers",
      name: "Buy TikTok Followers",
      path: "/buy-tiktok-followers",
      platform: "tiktok",
      badge: "Popular",
      desc: "Real & Active Creators",
    },
    {
      id: "tiktok-likes",
      name: "Buy TikTok Likes",
      path: "/buy-tiktok-likes",
      platform: "tiktok",
      badge: "Instant",
      desc: "Fast Video Engagement",
    },
    {
      id: "tiktok-views",
      name: "Buy TikTok Views",
      path: "/buy-tiktok-views",
      platform: "tiktok",
      badge: "Viral Reach",
      desc: "Boost FYP Ranking",
    },
    {
      id: "instagram-followers",
      name: "Buy Instagram Followers",
      path: "/buy-instagram-followers",
      platform: "instagram",
      badge: "High Retention",
      desc: "100% Genuine Profiles",
    },
    {
      id: "instagram-likes",
      name: "Buy Instagram Likes",
      path: "/buy-instagram-likes",
      platform: "instagram",
      badge: "Instant",
      desc: "Quick Post & Reel Boost",
    },
    {
      id: "instagram-views",
      name: "Buy Instagram Views",
      path: "/buy-instagram-views",
      platform: "instagram",
      badge: "Trending",
      desc: "Explore Page Exposure",
    },
  ];

  // Exclude current inner page service
  const filteredServices = allServices.filter(
    (service) => service.path.toLowerCase() !== currentPath
  );

  // Duplicate list to achieve a seamless 50% translation infinite loop
  const loopChunk = [...filteredServices, ...filteredServices];
  const fullLoopedList = [...loopChunk, ...loopChunk];

  return (
    <section className="py-2.5 sm:py-4 md:py-5 bg-gradient-to-b from-white via-pink-50/20 to-slate-50 border-y border-slate-100 relative overflow-hidden select-none touch-pan-y">
      {/* Subtle background ambient glows */}
      <div className="absolute top-1/2 left-4 sm:left-10 -translate-y-1/2 w-32 sm:w-48 h-32 sm:h-48 bg-pink-300/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 right-4 sm:right-10 -translate-y-1/2 w-32 sm:w-48 h-32 sm:h-48 bg-cyan-300/10 rounded-full blur-2xl pointer-events-none" />

      {/* Infinite loop marquee container */}
      <div className="w-full overflow-hidden relative pause-hover py-1 sm:py-1.5 [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] sm:[-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="animate-marquee gap-2 sm:gap-3.5 flex items-center">
          {fullLoopedList.map((service, index) => {
            const isTikTok = service.platform === "tiktok";

            return (
              <Link
                key={`${service.id}-${index}`}
                to={service.path}
                className="group flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white hover:bg-gradient-to-r hover:from-white hover:to-pink-50/50 active:scale-95 border border-slate-200/80 hover:border-pink-300 shadow-sm hover:shadow-md hover:shadow-pink-500/10 transition-all duration-200 hover:-translate-y-0.5 shrink-0 cursor-pointer"
              >
                {/* Platform Icon */}
                <div
                  className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                    isTikTok
                      ? "bg-slate-950 text-white shadow-sm shadow-slate-900/20"
                      : "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-sm shadow-pink-500/25"
                  }`}
                >
                  {isTikTok ? (
                    <FaTiktok className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  ) : (
                    <FaInstagram className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-white" />
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs sm:text-[13px] md:text-sm font-bold text-gray-900 group-hover:text-[#ff1681] transition-colors whitespace-nowrap">
                      {service.name}
                    </span>
                    <span
                      className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                        isTikTok
                          ? "bg-slate-100 text-slate-700 border border-slate-200"
                          : "bg-pink-50 text-pink-600 border border-pink-100"
                      }`}
                    >
                      {service.badge}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-gray-400 group-hover:text-gray-600 transition-colors whitespace-nowrap">
                    {service.desc}
                  </span>
                </div>

                {/* Interactive Arrow Button */}
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-50 group-hover:bg-[#ff1681] text-gray-400 group-hover:text-white flex items-center justify-center transition-all duration-200 group-hover:translate-x-0.5 shrink-0 ml-0.5">
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
