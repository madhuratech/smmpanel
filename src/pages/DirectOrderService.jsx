import { useLocation, useNavigate } from "react-router-dom";
import API_URL from "../config/api";
import { useState, useEffect, useRef } from "react";
import InputValidationPopup from "../components/InputValidationPopup";
import bgImage from "../assets/images/direct_link_bg.png";

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
  const { orderLink, platform, linkType, selectedPackage, quantity } = location.state || {};
  const [hoveredService, setHoveredService] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [pricingMap, setPricingMap] = useState({});
  const [localLink, setLocalLink] = useState(orderLink || "");
  const [currentLinkType, setCurrentLinkType] = useState(linkType || "profile");
  const [validationError, setValidationError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef(null);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const input = (localLink || "").trim();
    if (!input) {
      setValidationError("Please enter your profile link or username here...");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 450);
      inputRef.current?.focus();
      return;
    }
    const isPost = input.includes("/p/") || input.includes("/reel/") || input.includes("/video/") || input.includes("/posts/") || input.includes("/watch?v=") || input.includes("/watch") || input.includes("/track/");
    setCurrentLinkType(isPost ? "post" : "profile");
  };

  const PRICING_API = `${API_URL}/api/pricing/all`;

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

  // ── Navigate to Quantity Page ─────────────────────────────────
  const handleService = (service) => {
    const input = (localLink || "").trim();
    if (!input) {
      setValidationError("Please enter your profile link or username first...");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 450);
      inputRef.current?.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const key = getServiceKey(platform, service.name);
    const pricing = pricingMap[key] || {};
    navigate("/quantity-pricing", {
      state: {
        directOrder: true,
        orderLink: localLink,
        platform,
        linkType: currentLinkType,
        service: key,
        selectedPackage,
        quantity: quantity || selectedPackage?.quantity,
        selectedService: {
          name: service.name,
          serviceKey: key,
          packages: pricing.packages || [],
          pricing: pricing.pricing || null
        },
      },
    });
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
  const serviceStyles = {
    followers: {
      gradient: "linear-gradient(135deg, #F9E8FF, #E9D5FF, #F5E9FF)",
      iconBg: "from-[#8b5cf6] to-[#ec4899]",
      textColor: "text-[#111827]",
      descColor: "text-[#4b5563]",
      priceColor: "text-[#8b5cf6]",
      dividerColor: "border-[#e5e7eb]",
      glow: "shadow-[0_10px_25px_rgba(233,213,255,0.35)]"
    },
    subscribers: {
      gradient: "linear-gradient(135deg, #E8F7FF, #DDF3FF, #EAF5FF)",
      iconBg: "from-[#3b82f6] to-[#06b6d4]",
      textColor: "text-[#111827]",
      descColor: "text-[#4b5563]",
      priceColor: "text-[#3b82f6]",
      dividerColor: "border-[#e5e7eb]",
      glow: "shadow-[0_10px_25px_rgba(221,243,255,0.35)]"
    },
    likes: {
      gradient: "linear-gradient(135deg, #FFF0F2, #FFE4E8, #FFF5F6)",
      iconBg: "from-[#fb7185] to-[#f43f5e]",
      textColor: "text-[#111827]",
      descColor: "text-[#4b5563]",
      priceColor: "text-[#f43f5e]",
      dividerColor: "border-[#e5e7eb]",
      glow: "shadow-[0_10px_25px_rgba(255,228,232,0.35)]"
    },
    views: {
      gradient: "linear-gradient(135deg, #FFFDF5, #FEF3C7, #FFFDF5)",
      iconBg: "from-[#fbbf24] to-[#f59e0b]",
      textColor: "text-[#111827]",
      descColor: "text-[#4b5563]",
      priceColor: "text-[#f59e0b]",
      dividerColor: "border-[#e5e7eb]",
      glow: "shadow-[0_10px_25px_rgba(254,243,199,0.35)]"
    },
    comments: {
      gradient: "linear-gradient(135deg, #F0FDF4, #DCFCE7, #F0FDF4)",
      iconBg: "from-[#34d399] to-[#10b981]",
      textColor: "text-[#111827]",
      descColor: "text-[#4b5563]",
      priceColor: "text-[#10b981]",
      dividerColor: "border-[#e5e7eb]",
      glow: "shadow-[0_10px_25px_rgba(220,252,231,0.35)]"
    },
    shares: {
      gradient: "linear-gradient(135deg, #F5F3FF, #EDE9FE, #F5F3FF)",
      iconBg: "from-[#818cf8] to-[#6366f1]",
      textColor: "text-[#111827]",
      descColor: "text-[#4b5563]",
      priceColor: "text-[#6366f1]",
      dividerColor: "border-[#e5e7eb]",
      glow: "shadow-[0_10px_25px_rgba(237,233,254,0.35)]"
    }
  };

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

  const services = currentLinkType === "profile" ? profileServices : postServices;
  return (
    <div className="min-h-screen bg-[#0f0817] text-white relative overflow-hidden font-sans">

      {/* ── Background Hero Image Overlay ── */}
      <div className="absolute top-0 left-0 right-0 h-[600px] w-full z-0 overflow-hidden pointer-events-none">
        <img src={bgImage} alt="" className="w-full h-full object-cover opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0817]/70 to-[#0f0817]" />
      </div>

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

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-44 pb-24">

        {/* ── Back Button ── */}
        <button
          onClick={() => navigate(-1)}
          className="mb-10 flex items-center gap-2 text-gray-400 hover:text-white transition-all group"
        >
          <span
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/10 transition-all text-sm"
          >
            ←
          </span>
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* ── Hero Section ── */}
        <div
          className="relative z-10 py-12 md:py-16 max-w-4xl space-y-8 text-left"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-300 uppercase tracking-wider">
              ✨ Social Media Growth
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
              Choose Your{" "}
              <span className={`bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                Service
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-xl">
              Select what you'd like to boost for this link. Build instant social proof with our high-retention services.
            </p>
          </div>

          {/* Profile / Target Link search bar */}
          <form
            onSubmit={handleSearchSubmit}
            className={`w-full max-w-2xl bg-white rounded-full p-1.5 flex items-center shadow-lg border relative transition-all duration-300 ${
              validationError
                ? "border-pink-500 ring-4 ring-pink-500/40 shadow-pink-500/20"
                : "border-white/20"
            } ${isShaking ? "animate-input-shake" : ""}`}
          >
            <InputValidationPopup
              show={!!validationError}
              message={validationError}
              onClose={() => setValidationError("")}
            />

            {/* Platform Circular Badge */}
            <div className="flex-shrink-0 w-11 h-11 rounded-full bg-slate-900 flex items-center justify-center ml-1 text-lg shadow">
              {config.icon}
            </div>

            {/* Input Field */}
            <input
              ref={inputRef}
              type="text"
              value={localLink}
              onChange={(e) => {
                setLocalLink(e.target.value);
                if (validationError) setValidationError("");
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit(e);
                }
              }}
              placeholder="Enter your profile link / username"
              className="flex-grow h-full px-4 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-sm font-medium text-gray-800 placeholder-gray-400 min-w-0"
            />

            {/* Search Button */}
            <button
              type="submit"
              onClick={handleSearchSubmit}
              style={{
                background: `linear-gradient(90deg, #ff008e, #8b2cff)`
              }}
              className="flex-shrink-0 flex items-center justify-center px-6 h-11 rounded-full text-white text-sm font-bold transition-all duration-300 mr-0.5 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(255,0,142,0.35)] select-none cursor-pointer capitalize"
            >
              {currentLinkType === "profile" ? "Profile" : "Post"}
            </button>
          </form>

          {/* Optional supporting tags */}
          <div className="flex flex-wrap gap-3 pt-2">
            {["⚡ Fast Delivery", "🔒 Secure Checkouts", "💯 Real Results"].map(tag => (
              <span key={tag} className="text-xs text-gray-300 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Service Section Title ── */}
        <div className="text-center mb-8 relative z-10">
          <h2 className="text-2xl font-bold text-white">Choose a service for this link</h2>
        </div>

        {/* ── Service Cards Grid ── */}
        <div
          className="flex flex-wrap justify-center gap-6 relative z-10 mx-auto max-w-5xl"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s cubic-bezier(0.4,0,0.2,1) 0.2s",
          }}
        >
          {services.map((service, idx) => {
            const pricing = getServicePricing(service.name);
            const style = serviceStyles[service.key] || serviceStyles.followers;
            return (
              <button
                key={service.key}
                onClick={() => handleService(service)}
                onMouseEnter={() => setHoveredService(service.key)}
                onMouseLeave={() => setHoveredService(null)}
                className={`group text-left focus:outline-none w-[340px] rounded-[24px] transition-all duration-300 transform ${style.glow} hover:scale-[1.02] hover:-translate-y-1`}
                style={{
                  background: style.gradient,
                  transitionDelay: `${idx * 60}ms`
                }}
              >
                <div className={`relative overflow-hidden rounded-[24px] border ${style.dividerColor} p-7 flex flex-col justify-between h-full min-h-[240px]`}>

                  {/* Top section: Icon, badge, Arrow */}
                  <div className="flex items-start justify-between w-full mb-4 relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.iconBg} flex items-center justify-center text-2xl shadow-sm`}>
                      <span className="text-white">{service.icon}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {service.badge && (
                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6]`}>
                          {service.badge}
                        </span>
                      )}
                      <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-700 font-bold transition-all duration-300 group-hover:scale-105 shadow-sm border border-gray-100">
                        →
                      </span>
                    </div>
                  </div>

                  {/* Middle section: Content */}
                  <div className="space-y-2 relative z-10">
                    <h3 className={`text-xl font-bold ${style.textColor}`}>
                      {service.name}
                    </h3>
                    <p className={`text-sm leading-relaxed ${style.descColor} font-medium`}>
                      {pricing.description || service.desc}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className={`my-4 border-t ${style.dividerColor}`} />

                  {/* Bottom section: Pricing */}
                  <div className="relative z-10 flex items-center justify-between">
                    {pricing.startingPrice !== undefined && pricing.startingPrice !== null ? (
                      <span className={`text-base font-bold ${style.priceColor}`}>
                        From ${pricing.startingPrice}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500">Checking price...</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Trust Badges ── */}
        <div
          className="mt-16 flex flex-wrap justify-center gap-6 text-gray-500 text-xs"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.6s 0.5s",
          }}
        >
          {["🔒 100% Secure", "⚡ Instant Delivery", "💯 Real Engagement", "🛡️ Money-Back Guarantee"].map(
            (badge) => (
              <span
                key={badge}
                className="backdrop-blur-md bg-white/5 border border-white/10 px-4 py-2 rounded-full font-medium"
              >
                {badge}
              </span>
            )
          )}
        </div>
      </div>

      {/* ── Bottom Wave UI SVG ── */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-0 pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] md:h-[90px]"
        >
          <path
            d="M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,58.7C1120,53,1280,43,1360,37.3L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill="#ffffff"
            opacity="0.10"
            style={{ filter: "blur(2px)" }}
          />
          <path
            d="M0,53L80,48C160,43,320,32,480,37.3C640,43,800,64,960,69.3C1120,75,1280,64,1360,58.7L1440,53L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill="#ffffff"
            opacity="0.20"
          />
          <path
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill="#ffffff"
            opacity="0.40"
          />
          <path
            d="M0,85L80,80C160,75,320,64,480,69.3C640,75,800,96,960,96C1120,96,1280,75,1360,64L1440,53L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill="#ffffff"
            opacity="0.70"
          />
          <path
            d="M0,96L80,90.7C160,85,320,75,480,80C640,75,800,107,960,107C1120,107,1280,85,1360,74.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill="#ffffff"
            opacity="1.00"
          />
          <rect x="0" y="110" width="1440" height="20" fill="#ffffff" />
        </svg>
      </div>
    </div>
  );
}