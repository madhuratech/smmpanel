import React, { useState, useEffect, useRef } from "react";
import API_URL from "../config/api";
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
  FaTimes,
} from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Tiky from "../assets/images/Landingpage2.png";

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
    // 1) First check URL path for SEO structure (/buy-platform-service)
    if (location.pathname.startsWith('/buy-')) {
      const parts = location.pathname.split('-'); // ["", "buy", "instagram", "likes"]
      if (parts.length >= 3) {
        const pName = parts[2].toLowerCase();
        if (pName === "tiktok") return "TikTok";
        if (pName === "instagram") return "Instagram";
        if (pName === "youtube") return "YouTube";
        if (pName === "facebook") return "Facebook";
        const extra = EXTRA_PLATFORMS.find(p => p.key === pName);
        if (extra) return extra.name;
      }
    }

    // 2) Fallback to prop or location state
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
    Instagram: `${API_URL}/api/instagram/user/`,
    YouTube: `${API_URL}/api/youtube/search/`,
    TikTok: `${API_URL}/api/tiktok/user/`,
    Facebook: `${API_URL}/api/facebook/user/all/`
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
    let targetPlatform = propPlatform || location.state?.selectPlatform;
    if (location.pathname.startsWith('/buy-')) {
      const parts = location.pathname.split('-');
      if (parts.length >= 3) {
        targetPlatform = parts[2];
      }
    }

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
  }, [propPlatform, location.state, location.pathname]);

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

  const Getuser = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
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
          username: input,
          selectedServiceKey: location.state?.selectedServiceKey,
          entryPath: location.pathname
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
    <section id="hero" className="relative w-full min-h-screen bg-[#1a0b2e] flex items-center justify-center pt-28 pb-10 overflow-x-clip overflow-y-visible">
      {/* HERO IMAGE - BACKGROUND */}
      <img
        src={Tiky}
        alt=""
        className="absolute inset-0 z-0 w-full h-full object-cover"
      />

      {/* Main dark purple base */}
      <div className="absolute inset-0 z-[1] bg-[#16002d]/35 pointer-events-none" />

      {/* TOP PINK/PURPLE GLOW */}
      <div
        className="absolute inset-x-0 top-0 z-[2] h-[45%] pointer-events-none bg-[radial-gradient(ellipse_at_12%_0%,rgba(255,0,128,0.72)_0%,rgba(190,0,120,0.42)_28%,rgba(80,0,100,0.18)_55%,transparent_78%)]"
      />

      {/* TOP RIGHT BLUE GLOW */}
      <div
        className="absolute inset-x-0 top-0 z-[2] h-[50%] pointer-events-none bg-[radial-gradient(ellipse_at_90%_0%,rgba(20,30,180,0.55)_0%,rgba(20,20,100,0.25)_45%,transparent_75%)]"
      />

      {/* BOTTOM PINK/PURPLE GLOW */}
      <div
        className="absolute inset-x-0 bottom-0 z-[2] h-[45%] pointer-events-none bg-[radial-gradient(ellipse_at_12%_100%,rgba(255,0,128,0.68)_0%,rgba(180,0,120,0.42)_30%,rgba(70,0,100,0.18)_58%,transparent_80%)]"
      />

      {/* BOTTOM RIGHT BLUE/PURPLE GLOW */}
      <div
        className="absolute inset-x-0 bottom-0 z-[2] h-[45%] pointer-events-none bg-[radial-gradient(ellipse_at_88%_100%,rgba(35,20,180,0.48)_0%,rgba(30,10,120,0.25)_45%,transparent_78%)]"
      />

      <div className="relative z-10 text-white w-full global-container flex flex-col justify-center min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full text-center md:text-center lg:text-left">
          {/* Left Column content (7/12 width in lg, full in mobile/tablet) */}
          <div className="lg:col-span-7 space-y-8 flex flex-col items-center lg:items-start">
            {/* Rating */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 text-xs bg-white/10 rounded-full backdrop-blur border border-white/10 text-yellow-400 font-semibold w-fit">
              <FaStar className="fill-current" />
              <span>Rated 4.9 on Trustscore</span>
            </div>

            {/* Title */}
            <h1 className="hero-heading font-bold leading-tight">
              Trusted Site to Turn Your Profile into a Powerful Platform
            </h1>

            {/* Description */}
            <p className="global-paragraph text-gray-300 leading-relaxed max-w-xl">
              Grow your audience and increase engagement across TikTok, Instagram, and YouTube with TikyTop.
            </p>

            {/* SEARCH + PLATFORM SELECT */}
            <div className="pt-2 w-full max-w-xl flex flex-col items-center lg:items-start">
              {/* Tabs */}
              <div className="flex justify-center lg:justify-start gap-4 mb-8 flex-wrap items-center">
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
                        {showPopup && (() => {
                          const w = window.innerWidth;
                          if (w < 768) {
                            // MobileExploreMenu with absolute positioning
                            return (
                              <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 15 }}
                                transition={{ duration: 0.25 }}
                                style={{
                                  position: 'absolute',
                                  top: 'calc(100% + 12px)',
                                  right: '-28px',
                                  left: 'auto',
                                  transform: 'none',
                                  zIndex: 99999,
                                  width: 'min(360px, calc(100vw - 24px))'
                                }}
                                className="bg-white border border-gray-200 rounded-[24px] p-4 shadow-2xl max-h-[70vh] overflow-y-auto overflow-x-hidden no-scrollbar"
                              >
                                <div className="flex justify-between items-center mb-3">
                                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Explore More</h4>
                                  <button
                                    onClick={() => setShowPopup(false)}
                                    className="p-1 rounded-full text-gray-400 hover:text-[#ff008e] hover:bg-gray-100 transition-colors"
                                  >
                                    <FaTimes className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  {EXTRA_PLATFORMS.map((plat) => (
                                    <button
                                      key={plat.name}
                                      onClick={() => {
                                        changePlatform(plat.name);
                                        setShowPopup(false);
                                      }}
                                      className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-[#ff008e]/10 hover:text-[#ff008e] text-gray-800 transition duration-200 border border-gray-100 text-left h-12 w-full"
                                    >
                                      <span className="text-base flex-shrink-0">{plat.icon}</span>
                                      <span className="text-xs font-semibold truncate leading-none">{plat.name}</span>
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            );
                          } else if (w < 1024) {
                            // TabletMegaMenu
                            return (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                  position: 'absolute',
                                  top: 'calc(100% + 12px)',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  zIndex: 9999,
                                  width: '520px'
                                }}
                                className="bg-white border border-gray-200 rounded-[24px] p-5 shadow-2xl max-h-[400px] overflow-y-auto no-scrollbar"
                              >
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Explore More</h4>
                                <div className="grid grid-cols-2 gap-3">
                                  {EXTRA_PLATFORMS.map((plat) => (
                                    <button
                                      key={plat.name}
                                      onClick={() => {
                                        changePlatform(plat.name);
                                        setShowPopup(false);
                                      }}
                                      className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-[#ff008e]/10 hover:text-[#ff008e] text-gray-800 transition duration-200 border border-gray-100 rounded-xl text-sm font-semibold text-left"
                                    >
                                      <span className="text-lg flex-shrink-0">{plat.icon}</span>
                                      <span className="truncate">{plat.name}</span>
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            );
                          } else {
                            // DesktopMegaMenu
                            return (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                  position: 'absolute',
                                  top: 'calc(100% + 12px)',
                                  left: '0',
                                  transform: 'none',
                                  zIndex: 99999,
                                  width: '680px'
                                }}
                                className="bg-white border border-gray-200 rounded-[24px] p-6 shadow-2xl"
                              >
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Explore More</h4>
                                <div className="grid grid-cols-3 gap-3">
                                  {EXTRA_PLATFORMS.map((plat) => (
                                    <button
                                      key={plat.name}
                                      onClick={() => {
                                        changePlatform(plat.name);
                                        setShowPopup(false);
                                      }}
                                      className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-[#ff008e]/10 hover:text-[#ff008e] text-gray-800 transition duration-200 border border-gray-100 rounded-xl text-sm font-semibold text-left"
                                    >
                                      <span className="text-lg flex-shrink-0">{plat.icon}</span>
                                      <span className="truncate">{plat.name}</span>
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            );
                          }
                        })()}
                      </AnimatePresence>
                    </div>
                  );
                })()}
              </div>

              {/* Search Bar Wrapper */}
              <form
                onSubmit={Getuser}
                className="global-input-wrapper max-w-xl w-full"
              >
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        Getuser(e);
                      }
                    }}
                    placeholder={getPlaceholderText(active)}
                    className="flex-grow h-full px-3.5 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-[15px] sm:text-[16px] font-medium text-gray-800 placeholder-[#777777] min-w-0"
                  />

                  {/* Search Button */}
                  <button
                    type="submit"
                    onClick={Getuser}
                    disabled={isSearching}
                    style={{
                      background: "linear-gradient(90deg, #ff008e, #8b2cff)"
                    }}
                    className="flex-shrink-0 flex items-center justify-center w-[100px] sm:w-[140px] h-[46px] rounded-full text-white text-[14px] sm:text-[15px] font-semibold transition-all duration-300 mr-0.5 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,0,142,0.4)] disabled:opacity-80 disabled:cursor-not-allowed select-none cursor-pointer"
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
              </form>
            </div>


          </div>

          {/* Right Column illustration placeholder (Empty space because background image holds smartphone visuals) */}
          <div className="lg:col-span-5 hidden lg:block" />

        </div>

        {/* Stats Row */}
        <div className="w-full mt-10">
          <div className="relative bg-white/5 backdrop-blur rounded-[32px] p-6 border border-white/10 overflow-hidden">
            {/* Intersecting Dividers */}
            {/* Horizontal Divider (hidden on desktop/tablet, shown on mobile) */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 -translate-y-1/2 md:hidden" />
            {/* Vertical Divider (hidden on desktop/tablet, shown on mobile) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 md:hidden" />

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 md:gap-6 relative z-10">
              {/* Stat 1 */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-2 py-2 lg:border-r lg:border-white/10 justify-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white text-xl shadow-md flex-shrink-0">
                  🛒
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-[34px] font-bold text-white leading-none">100K+</h3>
                  <p className="text-[17px] font-medium text-gray-300 mt-1.5 leading-snug">Orders Completed</p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-2 py-2 lg:border-r lg:border-white/10 justify-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xl shadow-md flex-shrink-0">
                  👤
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-[34px] font-bold text-white leading-none">50K+</h3>
                  <p className="text-[17px] font-medium text-gray-300 mt-1.5 leading-snug">Happy Customers</p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-2 py-2 lg:border-r lg:border-white/10 justify-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-600 flex items-center justify-center text-white text-xl shadow-md flex-shrink-0">
                  📈
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-[34px] font-bold text-white leading-none">99.9%</h3>
                  <p className="text-[17px] font-medium text-gray-300 mt-1.5 leading-snug">Success Rate</p>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-2 py-2 justify-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white text-xl shadow-md flex-shrink-0">
                  🎧
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-[34px] font-bold text-white leading-none">24/7</h3>
                  <p className="text-[17px] font-medium text-gray-300 mt-1.5 leading-snug">Customer Support</p>
                </div>
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
