import React, { useState, useEffect, useRef } from "react";
import {
  FaStar,
  FaSearch,
  FaTiktok,
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaTelegram,
  FaPinterest,
  FaSpotify,
  FaLinkedin,
  FaReddit,
  FaTwitch,
  FaDiscord,
  FaSnapchat,
  FaSoundcloud,
  FaGoogle,
  FaGlobe,
  FaThLarge,
} from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Tiky from "../assets/images/Tikytopnew3.png";

const EXTRA_PLATFORMS = [
  { name: "Facebook", icon: <FaFacebook className="text-[#1877F2]" />, key: "facebook" },
  { name: "Twitter", icon: <FaXTwitter className="text-current" />, key: "twitter" },
  { name: "Telegram", icon: <FaTelegram className="text-[#0088cc]" />, key: "telegram" },
  { name: "Pinterest", icon: <FaPinterest className="text-[#E60023]" />, key: "pinterest" },
  { name: "Spotify", icon: <FaSpotify className="text-[#1DB954]" />, key: "spotify" },
  { name: "LinkedIn", icon: <FaLinkedin className="text-[#0A66C2]" />, key: "linkedin" },
  { name: "Reddit", icon: <FaReddit className="text-[#FF4500]" />, key: "reddit" },
  { name: "Threads", icon: <FaThreads className="text-current" />, key: "threads" },
  { name: "Twitch", icon: <FaTwitch className="text-[#9146FF]" />, key: "twitch" },
  { name: "Discord", icon: <FaDiscord className="text-[#5865F2]" />, key: "discord" },
  { name: "Snapchat", icon: <FaSnapchat className="text-[#FFFC00]" />, key: "snapchat" },
  { name: "SoundCloud", icon: <FaSoundcloud className="text-[#FF5500]" />, key: "soundcloud" },
  { name: "Google Reviews", icon: <FaGoogle className="text-[#4285F4]" />, key: "google" },
  { name: "Trustpilot", icon: <FaStar className="text-[#00B67A]" />, key: "trustpilot" },
  { name: "Website Traffic", icon: <FaGlobe className="text-[#00A86B]" />, key: "traffic" }
];

export default function Hero({ platform: propPlatform, onSearch }) {
  const location = useLocation();
  const [active, setActive] = useState(() => {
    const targetPlatform = propPlatform || location.state?.selectPlatform;
    if (targetPlatform) {
      const name = targetPlatform.toLowerCase();
      if (name === "tiktok") return "TikTok";
      if (name === "instagram") return "Instagram";
      if (name === "youtube") return "YouTube";
      if (name === "facebook") return "Facebook";
      const extra = EXTRA_PLATFORMS.find(p => p.key === name);
      if (extra) return extra.name;
    }
    return "TikTok";
  });
  const [activeTab, setActiveTab] = useState('channel');
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [username, setUsername] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [rotateIcon, setRotateIcon] = useState(false);
  const popupRef = useRef(null);

  // Platform Icon helper
  const getPlatformIcon = (platformName) => {
    const name = platformName.toLowerCase();
    if (name === "instagram") return <FaInstagram className="text-[#E1306C]" />;
    if (name === "tiktok") return <FaTiktok className="text-[#000000]" />;
    if (name === "youtube") return <FaYoutube className="text-[#FF0000]" />;
    if (name === "facebook") return <FaFacebook className="text-[#1877F2]" />;
    if (name === "twitter" || name === "twitter (x)" || name === "x") return <FaXTwitter className="text-[#000000]" />;
    if (name === "telegram") return <FaTelegram className="text-[#0088cc]" />;
    if (name === "spotify") return <FaSpotify className="text-[#1DB954]" />;
    if (name === "linkedin") return <FaLinkedin className="text-[#0A66C2]" />;
    if (name === "snapchat") return <FaSnapchat className="text-[#FFFC00]" />;
    if (name === "twitch") return <FaTwitch className="text-[#9146FF]" />;
    if (name === "pinterest") return <FaPinterest className="text-[#E60023]" />;
    if (name === "reddit") return <FaReddit className="text-[#FF4500]" />;
    if (name === "soundcloud") return <FaSoundcloud className="text-[#FF5500]" />;

    // Fallback lookups
    const extra = EXTRA_PLATFORMS.find(p => p.name.toLowerCase() === name || p.key === name);
    if (extra) return extra.icon;
    return <FaSearch className="text-gray-400" />;
  };

  // Placeholders helper
  const getPlaceholderText = (platformName) => {
    const name = platformName.toLowerCase();
    if (name === "instagram") return "Your username on Instagram";
    if (name === "tiktok") return "Your username on TikTok";
    if (name === "youtube") return "Your channel on YouTube";
    if (name === "twitter" || name === "twitter (x)" || name === "x") return "Your username on X";
    if (name === "facebook") return "Your Facebook page or profile";
    if (name === "telegram") return "Your Telegram username";
    if (name === "spotify") return "Your Spotify artist or playlist";
    if (name === "linkedin") return "Your LinkedIn profile";
    if (name === "pinterest") return "Your Pinterest profile";
    if (name === "reddit") return "Your Reddit profile";
    if (name === "twitch") return "Your Twitch channel";
    if (name === "snapchat") return "Your Snapchat profile";
    if (name === "soundcloud") return "Your SoundCloud track or profile";
    return `Your ${platformName} username`;
  };

  const navigate = useNavigate();

  const platforms = [
    { name: "TikTok", icon: <FaTiktok />, key: "tiktok" },
    { name: "Instagram", icon: <FaInstagram />, key: "instagram" },
    { name: "YouTube", icon: <FaYoutube />, key: "youtube" },
  ];

  const Platform_API_URLS = {
    Instagram: "http://localhost:5000/api/instagram/user/",
    YouTube: "http://localhost:5000/api/youtube/search/",
    TikTok: "http://localhost:5000/api/tiktok/user/",
    Facebook: "http://localhost:5000/api/facebook/user/all/"
  };

  const clearCaches = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("profile_data");
    localStorage.removeItem("preview");
    localStorage.removeItem("link");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("profile_data");
    sessionStorage.removeItem("preview");
    sessionStorage.removeItem("link");
    setUsername("");
  };

  const changePlatform = (platformName) => {
    clearCaches();
    setActive(platformName);
    setRotateIcon(true);
  };

  useEffect(() => {
    if (rotateIcon) {
      const timer = setTimeout(() => setRotateIcon(false), 300);
      return () => clearTimeout(timer);
    }
  }, [rotateIcon]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const targetPlatform = propPlatform || location.state?.selectPlatform;
    if (targetPlatform) {
      const name = targetPlatform.toLowerCase();
      let matchedName = "TikTok";
      if (name === "tiktok") matchedName = "TikTok";
      else if (name === "instagram") matchedName = "Instagram";
      else if (name === "youtube") matchedName = "YouTube";
      else if (name === "facebook") matchedName = "Facebook";
      else {
        const extra = EXTRA_PLATFORMS.find(p => p.key === name);
        if (extra) matchedName = extra.name;
      }
      setActive(matchedName);
      setRotateIcon(true);
      clearCaches();
    }
  }, [propPlatform, location.state]);

  const detectInputType = (input) => {
    const value = input.trim();

    // INSTAGRAM
    if (
      value.includes("instagram.com")
    ) {
      if (value.includes("/p/")) {
        return {
          type: "post",
          platform: "instagram",
          link: value
        };
      }
      return {
        type: "profile",
        platform: "instagram",
        link: value
      };
    }

    // TIKTOK
    if (
      value.includes("tiktok.com")
    ) {
      if (value.includes("/video/")) {
        return {
          type: "post",
          platform: "tiktok",
          link: value
        };
      }
      return {
        type: "profile",
        platform: "tiktok",
        link: value
      };
    }

    // YOUTUBE
    if (
      value.includes("youtube.com") ||
      value.includes("youtu.be")
    ) {
      if (
        value.includes("watch?v=")
      ) {
        return {
          type: "post",
          platform: "youtube",
          link: value
        };
      }
      return {
        type: "profile",
        platform: "youtube",
        link: value
      };
    }

    // USERNAME SEARCH
    return {
      type: "username",
      value
    };
  };

  const Getuser = async () => {
    if (!username) return;

    const input = username.trim();

    // =========================
    // DETECT PLATFORM
    // =========================
    let platformKey = "tiktok";
    if (active === "TikTok") platformKey = "tiktok";
    else if (active === "Instagram") platformKey = "instagram";
    else if (active === "YouTube") platformKey = "youtube";
    else {
      const matched = EXTRA_PLATFORMS.find(p => p.name === active);
      if (matched) platformKey = matched.key;
    }
    let platform = platformKey;

    const apiPlatforms = ["TikTok", "Instagram", "YouTube", "Facebook"];

    // =========================
    // NON-API PLATFORMS REDIRECT
    // =========================
    if (!apiPlatforms.includes(active)) {
      const isLink = input.includes(".") || input.includes("://") || input.includes("/");
      const isPost = input.includes("/p/") || input.includes("/reel/") || input.includes("/video/") || input.includes("/posts/") || input.includes("watch?v=") || input.includes("/videos/") || input.includes("/watch") || input.includes("/track/");

      navigate("/direct-order-service", {
        state: {
          directOrder: true,
          orderLink: input,
          platform,
          linkType: isPost ? "post" : "profile"
        }
      });
      return;
    }

    // =========================
    // PROFILE LINK CHECK
    // =========================
    const isProfileLink =
      (
        input.includes("instagram.com") &&
        !input.includes("/p/") &&
        !input.includes("/reel/")
      )
      ||
      (
        input.includes("tiktok.com") &&
        !input.includes("/video/")
      )
      ||
      (
        input.includes("youtube.com/@")
      )
      ||
      (
        input.includes("facebook.com") &&
        !input.includes("/posts/") &&
        !input.includes("/permalink.php") &&
        !input.includes("/photos/") &&
        !input.includes("/videos/") &&
        !input.includes("/watch") &&
        !input.includes("/reel/")
      );

    // =========================
    // POST LINK CHECK
    // =========================
    const isPostLink =
      input.includes("/p/")
      ||
      input.includes("/reel/")
      ||
      input.includes("/video/")
      ||
      input.includes("watch?v=")
      ||
      (
        input.includes("facebook.com") &&
        (
          input.includes("/posts/") ||
          input.includes("/permalink.php") ||
          input.includes("/photos/") ||
          input.includes("/videos/") ||
          input.includes("/watch") ||
          input.includes("/reel/")
        )
      );

    // DIRECT ORDER FLOW
    if (isProfileLink || isPostLink) {
      navigate("/direct-order-service", {
        state: {
          directOrder: true,
          orderLink: input,
          platform,
          linkType: isProfileLink ? "profile" : "post"
        }
      });
      return;
    }

    // USERNAME FLOW
    const API_URL = Platform_API_URLS[active];

    try {
      setIsSearching(true);
      const response = await fetch(`${API_URL}${input}`);
      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "User not found");
        return;
      }

      navigate("/profile-overview", {
        state: {
          userdata: data,
          platform,
          username: input
        }
      });
    } catch (error) {
      console.log(error);
      alert(
        "Profile fetch failed.\n\nPlease copy and paste profile/post URL for direct order."
      );
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section id="hero" className="relative w-full min-h-screen bg-[#1a0b2e] flex items-center justify-center">
      {/* Immersive background wrapper to restrict image zoom overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="w-full h-full bg-center bg-no-repeat transition-transform duration-300"
          style={{
            backgroundImage: `url(${Tiky})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            transform: "scale(1)",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      <div className="relative z-30 text-white px-6 w-full max-w-7xl pt-28 pb-10 flex flex-col justify-center min-h-screen">
        <div className="grid lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left Column content (7/12 width) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Rating */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 text-xs bg-white/10 rounded-full backdrop-blur border border-white/10 text-yellow-400 font-semibold">
              <FaStar className="fill-current" />
              <span>Rated 4.9 on Trustscore</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight font-righteous">
              Trusted Site to Turn Your Profile into a Powerful Platform
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl">
              Grow your audience and increase engagement across TikTok, Instagram, and YouTube with TikyTop.
            </p>

            {/* SEARCH + PLATFORM SELECT */}
            <div className="pt-2 w-full max-w-xl">
              {/* Tabs */}
              <div className="flex justify-start gap-4 mb-8 flex-wrap items-center">
                {platforms.map((platform) => (
                  <button
                    key={platform.name}
                    onClick={() => changePlatform(platform.name)}
                    className="flex flex-col items-center gap-2 group focus:outline-none transition duration-300"
                  >
                    <div className={`w-[60px] h-[60px] rounded-2xl flex items-center justify-center transition-all duration-300 ${active === platform.name
                      ? "bg-gradient-to-br from-[#ff008e] to-[#8b2cff] text-white shadow-lg scale-105 border-2 border-white"
                      : "bg-white/10 text-white hover:bg-white/20 hover:scale-105 border border-white/20"
                      }`}
                    >
                      <span className="text-2xl">{platform.icon}</span>
                    </div>
                    <span className={`text-xs font-semibold tracking-wide transition-colors ${active === platform.name ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                      {platform.name}
                    </span>
                  </button>
                ))}

                {/* Explore More Services Button and Mega Menu */}
                {(() => {
                  const isExtraActive = EXTRA_PLATFORMS.some(p => p.name === active);
                  const activeExtra = isExtraActive ? EXTRA_PLATFORMS.find(p => p.name === active) : null;
                  return (
                    <div className="relative" ref={popupRef}>
                      <button
                        onClick={() => setShowPopup(!showPopup)}
                        className="flex flex-col items-center gap-2 group focus:outline-none transition duration-300"
                      >
                        <div className={`w-[60px] h-[60px] rounded-2xl flex items-center justify-center transition-all duration-300 ${isExtraActive
                          ? "bg-gradient-to-br from-[#ff008e] to-[#8b2cff] text-white shadow-lg scale-105 border-2 border-white"
                          : showPopup
                            ? "bg-white/20 text-white border border-white/40 scale-105"
                            : "bg-white/10 text-white hover:bg-white/20 hover:scale-105 border border-white/20"
                          }`}
                        >
                          {isExtraActive && activeExtra ? (
                            <span className="text-2xl">{activeExtra.icon}</span>
                          ) : (
                            <FaThLarge className="text-xl" />
                          )}
                        </div>
                        <span className="text-xs font-semibold tracking-wide text-gray-300 group-hover:text-white">
                          {isExtraActive ? active : "Explore"}
                        </span>
                      </button>

                      {/* Explore Popup list */}
                      <AnimatePresence>
                        {showPopup && (
                          <div className="absolute left-0 top-full mt-3 z-50 w-[280px] sm:w-[320px] bg-white border border-gray-200 rounded-2xl p-4 shadow-2xl max-h-[300px] overflow-y-auto no-scrollbar">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Explore More</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {EXTRA_PLATFORMS.map((plat) => (
                                <button
                                  key={plat.name}
                                  onClick={() => {
                                    changePlatform(plat.name);
                                    setShowPopup(false);
                                  }}
                                  className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 hover:bg-[#ff008e]/10 hover:text-[#ff008e] text-gray-800 transition duration-200 border border-gray-100 text-left"
                                >
                                  <span className="text-sm">{plat.icon}</span>
                                  <span className="text-xs font-semibold truncate">{plat.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })()}
              </div>

              {/* Search Bar */}
              <div
                style={{
                  boxShadow: isFocused
                    ? "0 20px 50px rgba(0,0,0,0.12), 0 0 0 4px rgba(255, 0, 142, 0.25)"
                    : "0 20px 50px rgba(0,0,0,0.12)"
                }}
                className="flex items-center bg-white rounded-full p-1.5 w-full h-[60px] transition-all duration-300 transform hover:-translate-y-1 relative"
              >
                {/* Left Platform Icon Container */}
                <div
                  className={`flex-shrink-0 w-[44px] h-[44px] rounded-full bg-white border-2 border-dashed border-[#ff008e] flex items-center justify-center ml-1 transition-transform duration-300 ${rotateIcon ? "rotate-12 scale-95" : ""
                    }`}
                >
                  <span className="text-xl flex items-center justify-center">
                    {getPlatformIcon(active)}
                  </span>
                </div>

                {/* Input Field */}
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder={getPlaceholderText(active)}
                  className="flex-grow h-full px-3.5 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-[15px] sm:text-[16px] font-medium text-gray-800 placeholder-[#777777] min-w-0"
                />

                {/* Search Button */}
                <button
                  onClick={Getuser}
                  disabled={isSearching}
                  style={{
                    background: "linear-gradient(90deg, #ff008e, #8b2cff)"
                  }}
                  className="flex-shrink-0 flex items-center justify-center w-[120px] sm:w-[140px] h-[46px] rounded-full text-white text-[15px] font-semibold transition-all duration-300 mr-0.5 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,0,142,0.4)] disabled:opacity-80 disabled:cursor-not-allowed select-none cursor-pointer"
                >
                  {isSearching ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    "Search"
                  )}
                </button>
              </div>
            </div>


          </div>

          {/* Right Column illustration placeholder (Empty space because background image holds smartphone visuals) */}
          <div className="lg:col-span-5 hidden lg:block" />

        </div>

        {/* Stats Row */}
        <div className="w-full mt-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white/5 backdrop-blur rounded-[2rem] p-6 border border-white/10">
            {/* Stat 1 */}
            <div className="flex items-center gap-4 px-4 py-2 border-r border-white/10 last:border-0 justify-center lg:justify-start">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white text-xl shadow-md">
                🛒
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-black text-white leading-none">100K+</h3>
                <p className="text-[11px] text-gray-300 mt-1 font-semibold">Orders Completed</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-4 px-4 py-2 border-r border-white/10 last:border-0 justify-center lg:justify-start">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xl shadow-md">
                👤
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-black text-white leading-none">50K+</h3>
                <p className="text-[11px] text-gray-300 mt-1 font-semibold">Happy Customers</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-4 px-4 py-2 border-r border-white/10 last:border-0 justify-center lg:justify-start">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-600 flex items-center justify-center text-white text-xl shadow-md">
                📈
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-black text-white leading-none">99.9%</h3>
                <p className="text-[11px] text-gray-300 mt-1 font-semibold">Success Rate</p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-4 px-4 py-2 last:border-0 justify-center lg:justify-start">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white text-xl shadow-md">
                🎧
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-black text-white leading-none">24/7</h3>
                <p className="text-[11px] text-gray-300 mt-1 font-semibold">Customer Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Wave Transition Layer */}
      <div className="absolute bottom-[-3px] left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] md:h-[90px]"
        >
          {/* Layer 5: 10% opacity, subtle blur */}
          <path
            d="M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,58.7C1120,53,1280,43,1360,37.3L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill="#ffffff"
            opacity="0.10"
            className="animate-wave-slow-5"
            style={{ filter: "blur(2px)" }}
          />
          {/* Layer 4: 20% opacity */}
          <path
            d="M0,53L80,48C160,43,320,32,480,37.3C640,43,800,64,960,69.3C1120,75,1280,64,1360,58.7L1440,53L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill="#ffffff"
            opacity="0.20"
            className="animate-wave-slow-4"
          />
          {/* Layer 3: 40% opacity */}
          <path
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill="#ffffff"
            opacity="0.40"
            className="animate-wave-slow-3"
          />
          {/* Layer 2: 70% opacity */}
          <path
            d="M0,85L80,80C160,75,320,64,480,69.3C640,75,800,96,960,96C1120,96,1280,75,1360,64L1440,53L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill="#ffffff"
            opacity="0.70"
            className="animate-wave-slow-2"
          />
          {/* Layer 1: 100% opacity */}
          <path
            d="M0,96L80,90.7C160,85,320,75,480,80C640,85,800,107,960,107C1120,107,1280,85,1360,74.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill="#ffffff"
            opacity="1.00"
            className="animate-wave-slow-1"
          />
          {/* Solid white blocker at the bottom to seal any animation gap */}
          <rect x="0" y="110" width="1440" height="20" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}
