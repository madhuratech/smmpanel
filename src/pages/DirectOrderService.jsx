import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const detectServiceType = (name, category) => {
  const n = (name || "").toLowerCase();
  const c = (category || "").toLowerCase();

  if (n.includes("reels views") || n.includes("reels view") || c.includes("reels views") || c.includes("reels view") || n.includes("reels") || c.includes("reels")) {
    return "reels_views";
  }
  if (n.includes("story views") || n.includes("story view") || c.includes("story views") || c.includes("story view") || n.includes("story") || c.includes("story")) {
    return "story_views";
  }
  if (n.includes("story poll") || n.includes("poll votes") || n.includes("poll vote") || c.includes("story poll") || c.includes("poll votes")) {
    return "story_poll_votes";
  }
  if (n.includes("watch time") || n.includes("watchtime") || c.includes("watch time") || c.includes("watchtime")) {
    return "watch_time";
  }
  if (n.includes("live view") || c.includes("live view")) {
    return "live_views";
  }
  if (n.includes("follower") || c.includes("follower")) {
    return "followers";
  }
  if (n.includes("subscriber") || c.includes("subscriber")) {
    return "subscribers";
  }
  if (n.includes("like") || c.includes("like")) {
    return "likes";
  }
  if (n.includes("comment") || c.includes("comment")) {
    return "comments";
  }
  if (n.includes("share") || c.includes("share")) {
    return "shares";
  }
  if (n.includes("view") || c.includes("view")) {
    return "views";
  }
  return "likes"; // default fallback
};

const getServiceKey = (platform, serviceName) => {
  const p = (platform || "").toLowerCase().trim();
  const s = (serviceName || "").toLowerCase().trim();

  let key = "";
  if (s.includes("reels") || s.includes("reel")) {
    key = "reels";
  } else if (s.includes("story") || s.includes("stories")) {
    key = "story";
  } else if (s.includes("follower")) {
    key = "followers";
  } else if (s.includes("subscriber")) {
    key = "subscribers";
  } else if (s.includes("comment")) {
    key = "comments";
  } else if (s.includes("like")) {
    key = "likes";
  } else if (s.includes("share")) {
    key = "shares";
  } else if (s.includes("view")) {
    key = "views";
  } else {
    key = s.replace(/[^a-z0-9]/g, "_");
  }
  
  return `${p}_${key}`;
};

export default function DirectOrderService() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderLink, platform, linkType } = location.state || {};
  const [hoveredService, setHoveredService] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [pricingMap, setPricingMap] = useState({});

  const PRICING_API = "http://localhost:5000/api/pricing/all";

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await fetch(PRICING_API, { cache: "no-store" });
        const data = await res.json();
        if (data.success) {
          const map = {};
          data.data.forEach((item) => {
            if (item.platform?.toLowerCase() === platform?.toLowerCase()) {
              const key = item.serviceKey;
              map[key] = {
                startingPrice: item.startingPrice,
                description: item.description || "",
                packages: item.packages || [],
                pricing: item
              };
            }
          });
          setPricingMap(map);
        }
      } catch (err) {
        console.log("PRICING FETCH ERROR:", err);
      }
    };
    fetchPricing();
  }, [platform]);

  const getServicePricing = (serviceName) => {
    const key = getServiceKey(platform, serviceName);
    const pricing = pricingMap[key] || {};
    return {
      startingPrice: pricing.startingPrice,
      description: pricing.description,
    };
  };

  // ── Platform Configuration ────────────────────────────────────
  const platformConfig = {
    instagram: {
      gradient: "from-pink-500 via-purple-500 to-indigo-500",
      cardGlow: "group-hover:shadow-pink-500/20",
      badge: "bg-gradient-to-r from-pink-500 to-purple-600",
      orb1: "bg-pink-600",
      orb2: "bg-purple-700",
      name: "Instagram",
      icon: "📸",
    },
    youtube: {
      gradient: "from-red-500 via-red-600 to-orange-500",
      cardGlow: "group-hover:shadow-red-500/20",
      badge: "bg-gradient-to-r from-red-500 to-red-700",
      orb1: "bg-red-700",
      orb2: "bg-orange-700",
      name: "YouTube",
      icon: "▶️",
    },
    tiktok: {
      gradient: "from-cyan-400 via-sky-500 to-pink-500",
      cardGlow: "group-hover:shadow-cyan-500/20",
      badge: "bg-gradient-to-r from-cyan-500 to-pink-500",
      orb1: "bg-cyan-700",
      orb2: "bg-pink-800",
      name: "TikTok",
      icon: "🎵",
    },
    facebook: {
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      cardGlow: "group-hover:shadow-blue-500/20",
      badge: "bg-gradient-to-r from-blue-500 to-indigo-600",
      orb1: "bg-blue-700",
      orb2: "bg-indigo-800",
      name: "Facebook",
      icon: "👥",
    },
  };

  const config = platformConfig[platform] || platformConfig.instagram;

  // ── Services ──────────────────────────────────────────────────
  const profileServices = [
    {
      name: "Followers",
      key: "followers",
      icon: "👥",
      desc: "Grow your follower count with real, active accounts",
      color: "from-violet-500 to-purple-600",
      badge: "Most Popular",
    },
    {
      name: "Subscribers",
      key: "subscribers",
      icon: "🔔",
      desc: "Expand your subscriber base for long-term growth",
      color: "from-blue-500 to-cyan-500",
      badge: null,
    },
  ];

  const postServices = [
    {
      name: "Likes",
      key: "likes",
      icon: "❤️",
      desc: "Boost your post engagement and social proof",
      color: "from-red-500 to-pink-500",
      badge: "Most Popular",
    },
    {
      name: "Comments",
      key: "comments",
      icon: "💬",
      desc: "Generate authentic discussions on your content",
      color: "from-green-500 to-emerald-600",
      badge: null,
    },
    {
      name: "Views",
      key: "views",
      icon: "👁️",
      desc: "Maximize your content reach and visibility",
      color: "from-orange-500 to-amber-500",
      badge: null,
    },
    {
      name: "Shares",
      key: "shares",
      icon: "🔄",
      desc: "Amplify your content and drive virality",
      color: "from-teal-500 to-cyan-600",
      badge: null,
    },
  ];

  const services = linkType === "profile" ? profileServices : postServices;

  // ── Navigate to Quantity Page ─────────────────────────────────
  const handleService = (service) => {
    const key = getServiceKey(platform, service.name);
    const pricing = pricingMap[key] || {};
    navigate("/quantity-pricing", {
      state: {
        directOrder: true,
        orderLink,
        platform,
        linkType,
        service: key,
        selectedService: {
          name: service.name,
          serviceKey: key,
          packages: pricing.packages || [],
          pricing: pricing.pricing || null
        },
      },
    });
  };
  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">

      {/* ── Animated Background Orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full ${config.orb1} opacity-[0.07] blur-[80px]`}
          style={{ animation: "pulse 6s ease-in-out infinite" }}
        />
        <div
          className={`absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full ${config.orb2} opacity-[0.07] blur-[80px]`}
          style={{ animation: "pulse 6s ease-in-out infinite", animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-white opacity-[0.015] blur-[120px]" />

        {/* Grid lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">

        {/* ── Back Button ── */}
        <button
          onClick={() => navigate(-1)}
          className="mb-10 flex items-center gap-2 text-gray-500 hover:text-white transition-all group"
        >
          <span
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/10 transition-all"
          >
            ←
          </span>
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* ── Header ── */}
        <div
          className="text-center mb-10 text-black"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {/* Platform badge */}
          <div className="flex justify-center mb-5">
            <span
              className={`${config.badge} text-white px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-xl`}
            >
              <span>{config.icon}</span>
              {config.name}
              <span className="mx-1 opacity-50">·</span>
              {linkType === "profile" ? "Profile Link" : "Post / Video Link"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-3 leading-tight">
            Choose Your{" "}
            <span
              className={`bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}
            >
              Service
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Select what you'd like to boost for this link
          </p>
        </div>

        {/* ── Link Preview Card ── */}
        <div
          className="mb-10"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s cubic-bezier(0.4,0,0.2,1) 0.1s",
          }}
        >
          <div className="backdrop-blur-xl bg-black/[1.01] border border-white/[0.08] rounded-2xl p-5 flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}
            >
              {linkType === "profile" ? "👤" : "📄"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-white mb-1 font-semibold uppercase tracking-widest">
                Target Link
              </p>
              <p className="text-gray-200 text-sm font-mono truncate">
                {orderLink || "No link provided"}
              </p>
            </div>
            <span
              className={`text-xs px-3 py-1.5 rounded-full font-semibold flex-shrink-0 border ${
                linkType === "profile"
                  ? "bg-violet-500/10 text-violet-300 border-violet-500/20"
                  : "bg-orange-500/10 text-orange-300 border-orange-500/20"
              }`}
            >
              {linkType === "profile" ? "Profile" : "Post"}
            </span>
          </div>
        </div>

        {/* ── Service Cards ── */}
        <div
          className={`grid ${
            services.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2"
          } gap-4`}
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s cubic-bezier(0.4,0,0.2,1) 0.2s",
          }}
        >
          {services.map((service, idx) => (
            <button
              key={service.key}
              onClick={() => handleService(service)}
              onMouseEnter={() => setHoveredService(service.key)}
              onMouseLeave={() => setHoveredService(null)}
              className="group relative text-left"
              style={{
                transitionDelay: `${idx * 60}ms`,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(12px)",
                transition: `all 0.5s cubic-bezier(0.4,0,0.2,1) ${0.2 + idx * 0.06}s`,
              }}
            >
              <div
             className={`relative overflow-hidden rounded-2xl border transition-all duration-300 p-6 ${
              hoveredService === service.key
             ? `border-black/20 bg-white text-black  scale-[1.02] 
             shadow-2xl 
            ${config.cardGlow}`
           : "border-black/[0.07] bg-black text-white hover:border-white/10"
         }`}>
                {/* Inner glow overlay */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.07] transition-opacity duration-300`}
                />

                {/* Most popular badge */}
                {service.badge && (
                  <div className="absolute top-4 right-4">
                    <span
                      className={`text-[10px] px-2.5 py-1 rounded-full font-bold bg-gradient-to-r ${service.color} text-white shadow-lg`}
                    >
                      {service.badge}
                    </span>
                  </div>
                )}

                {/* Icon + Arrow */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {service.icon}
                  </div>
                  <span
                    className={`mt-1 w-8 h-8 rounded-full border flex items-center justify-center text-sm transition-all duration-300 ${
                      hoveredService === service.key
                        ? "border-white/30 bg-white/10 text-white"
                        : "border-white/10 text-gray-600"
                    }`}
                  >
                    →
                  </span>
                </div>

                {/* Text */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-black transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-500 text-sm group-hover:text-gray-400 transition-colors leading-relaxed">
                  {getServicePricing(service.name).description || `Boost your ${service.name} instantly.`}
                </p>

                <div className="mt-3">
                  {getServicePricing(service.name).startingPrice !== undefined && getServicePricing(service.name).startingPrice !== null && (
                    <span className="inline-block text-xs font-bold text-green-400 group-hover:text-green-600 transition-colors">
                      From ${getServicePricing(service.name).startingPrice}
                    </span>
                  )}
                </div>

                {/* Bottom gradient bar */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${service.color} transition-opacity duration-300 ${
                    hoveredService === service.key ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            </button>
          ))}
        </div>

        {/* ── Trust Badges ── */}
        <div
          className="mt-12 flex flex-wrap justify-center gap-6 text-gray-700 text-xs"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.6s 0.5s",
          }}
        >
          {["🔒 100% Secure", "⚡ Instant Delivery", "💯 Real Engagement", "🛡️ Money-Back Guarantee"].map(
            (badge) => (
              <span
                key={badge}
                className="backdrop-blur-md bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-full"
              >
                {badge}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}