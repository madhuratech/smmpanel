import React, { useState, useEffect } from "react";
import API_URL from "../config/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Star,
  ShieldCheck,
  Zap,
  TrendingUp,
  Lock,
  Headphones,
  UserCheck,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  Shield,
  Heart,
} from "lucide-react";
import { FaInstagram, FaStar, FaFire } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";
import QuickPackageSelector from "../components/QuickPackageSelector";
import LiveDeliveryCounter from "../components/LiveDeliveryCounter";
import InputValidationPopup from "../components/InputValidationPopup";
import Tiky from "../assets/images/Instagramlikesbg.png";
import Username from "../assets/images/username.png";
import ViewCard from "../assets/images/igfollowers.png";
import Likes from "../assets/images/likes.png";
import InstagramLikesVideo from "../assets/images/ig-follower.mp4";
import InstaLikesImage from "../assets/images/followersimg.png";
import InstaLikesImage1 from "../assets/images/followersimg-1.png";

export default function BuyInstagramFollowers() {
  useScrollToTop();
  const navigate = useNavigate();

  // Search Flow States
  const [username, setUsername] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [validationError, setValidationError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  // Search input ref
  const searchInputRef = React.useRef(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // SEO Metadata from PDF
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Buy Instagram Followers | Follower Growth | Engagement Rate";

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
      "TikyTop is the #1-rated service in 2026. With our buy Instagram followers service, you can purchase at the best price and increase your profit."
    );
    setMetaTag(
      "name",
      "keywords",
      "buy instagram followers, buy real instagram followers, best place to buy instagram followers, buy followers instagram, how to buy instagram followers, buy real instagram followers that engage"
    );
    setMetaTag("name", "robots", "index, follow");

    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:title", "Buy Instagram Followers | Follower Growth | Engagement Rate");
    setMetaTag(
      "property",
      "og:description",
      "TikyTop is the #1-rated service in 2026. With our buy Instagram followers service, you can purchase at the best price and increase your profit."
    );
    setMetaTag("property", "og:url", "https://tikytop.com/buy-instagram-followers");
    setMetaTag("property", "og:site_name", "TikyTop");

    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", "Buy Instagram Followers | Follower Growth | Engagement Rate");
    setMetaTag(
      "name",
      "twitter:description",
      "TikyTop is the #1-rated service in 2026. With our buy Instagram followers service, you can purchase at the best price and increase your profit."
    );

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://tikytop.com/buy-instagram-followers");

    return () => {
      document.title = originalTitle;
      const removeMetaTag = (attrName, attrValue) => {
        const element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
        if (element) element.remove();
      };

      removeMetaTag("name", "description");
      removeMetaTag("name", "keywords");
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

  // Search Submit Handler (Preserves existing API integration for followers)
  const handleSearchSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const input = (username || "").trim();
    if (!input) {
      setValidationError("Please enter your Instagram username here...");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 450);
      searchInputRef.current?.focus();
      return;
    }

    const isProfileLink = input.includes("instagram.com") && !input.includes("/p/") && !input.includes("/reel/");
    const isPostLink = input.includes("instagram.com") && (input.includes("/p/") || input.includes("/reel/"));

    if (isProfileLink || isPostLink) {
      navigate("/direct-order-service", {
        state: {
          directOrder: true,
          orderLink: input,
          platform: "instagram",
          linkType: "profile",
          selectedPackage,
          quantity: selectedPackage ? selectedPackage.quantity : undefined,
        },
      });
      return;
    }

    // Default username search flow
    try {
      setIsSearching(true);
      const response = await fetch(`${API_URL}/api/instagram/user/${input}`);
      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "User not found");
        return;
      }

      navigate("/profile-overview", {
        state: {
          userdata: data,
          platform: "instagram",
          username: input,
          selectedServiceKey: "followers",
          entryPath: "/buy-instagram-followers",
          selectedPackage,
          quantity: selectedPackage ? selectedPackage.quantity : undefined,
        },
      });
    } catch (error) {
      console.error(error);
      alert("Profile fetch failed. Please copy and paste profile URL for direct order.");
    } finally {
      setIsSearching(false);
    }
  };

  const scrollToSearch = () => {
    document.getElementById("instagram-search-box")?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 400);
  };

  const handlePackagesClick = () => {
    document.getElementById("quick-package-section")?.scrollIntoView({ behavior: "smooth" });
  };

  // 8 FAQs from PDF
  const faqs = [
    {
      q: "When I buy Instagram followers, does it violate Instagram’s terms and conditions?",
      a: "No, it doesn't. When you buy Instagram followers from us, your account will not be suspended, and it doesn't violate Instagram’s terms and conditions. Just enter your username and select a quantity. Finally, choose how many followers you need, then pay.",
    },
    {
      q: "Can I get followers from the US?",
      a: "Of course, you can get followers from the US. And the interesting thing is, you can buy from any location. The only requirement is a public account. You can purchase from the US, UK, Canada, Germany, or any country; there are no restrictions.",
    },
    {
      q: "What is the difference between buy instagram followers and buy instagram likes?",
      a: "Buy Instagram followers and buy Instagram likes are both for Instagram growth. Followers are about your profile count, while likes are about engagement on a specific post. If you need to grow your profile, followers are the best option; if you want to improve post engagement, likes are more useful.",
    },
    {
      q: "Is this service worth buying?",
      a: "Yes, our service is designed for all users. We help them reach their goals. Your account can be larger or smaller; our services will suit you. If you are an influencer, content creator, small business, or personal brand on Instagram and want to reach more users and grow your follower count, TikyTop is the best option.",
    },
    {
      q: "Do new followers increase my visibility?",
      a: "Yes, the followers you get from us are from real accounts, so you don't need to worry about fake followers. Moreover, your follower count will increase, and you will have a chance to improve your visibility.",
    },
    {
      q: "What data do I need to provide?",
      a: "You don't need to provide any information. Just your username is enough. Make sure your account is public. We also don't ask for any confidential information.",
    },
    {
      q: "Will TikyTop assist us whenever we need it?",
      a: "Yes, we provide support and assist you anytime. Queries can be about the service, how to place an order, the payment process, and more. If you have any doubts, contact support@tikytop.com and get things done quickly.",
    },
    {
      q: "How to buy Instagram followers from TikyTop?",
      a: "Firstly, select the service and enter your username on it. Select packages and quantity. There is no limit to purchasing; you can customize followers as you like. Finally, pay for the packages and get followers instantly. Now your profile will be more professional, and many new users will come and watch your videos. So as your follower count increases, engagement also increases.",
    },
  ];

  // 10 Testimonials from PDF
  const testimonials = [
    {
      name: "Gordan",
      text: "I'm just enjoying the experience with TikyTop. Of course, if you want to try it, here you go! This is gonna be my comrade of all time.",
      rating: 5,
    },
    {
      name: "Binny",
      text: "Guys, they really did a great job with this Instagram follower service. Initially, I was stuck with this. And now my profile growth is something professional that I have never seen before.",
      rating: 5,
    },
    {
      name: "Alizeh",
      text: "Hi, I'm John, a vlogger. Whenever I travel to a spot, I used to post about it. But one thing I'm fed up with is my engagement. And finally, the TikyTop service has given me real Instagram followers online that have made my profile grow bigger.",
      rating: 5,
    },
    {
      name: "Danny",
      text: "Creating content, posting consistently, and following current trends these are things I used to follow. Then the follower count didn't improve. When I searched for affordable Instagram followers, I found this gem. And I could highly recommend this.",
      rating: 5,
    },
    {
      name: "Kay V",
      text: "Very satisfied. I never received results like this before. And I'm just in love with their high-quality Instagram followers. If you are a budding creator, definitely don't miss this chance; give it a try and see how it differs from other sites.",
      rating: 5,
    },
    {
      name: "Ayman",
      text: "Still, I haven't found any negative followers; they're real, and if you are a content creator, this service could be more useful.",
      rating: 5,
    },
    {
      name: "Andrews",
      text: "Hello! I'm Rya, a content creator. I've been a creator for the past 9 months. Even though I'm a budding creator, I wish to grow more popular like this. Then I found this hidden gem; now I'm able to get followers, and additionally, my post engagement has also increased.",
      rating: 5,
    },
    {
      name: "Larry",
      text: "I think this is one of the best services ever! Their Instagram follower packages are affordable, and I can purchase them whenever I need. You can also give it a try to buy followers Instagram at best price.",
      rating: 5,
    },
    {
      name: "Tony D’Souza",
      text: "First, I tried their free trials, then I purchased buy instagram followers. At first, I checked how the service works, but one thing I can say is that they are genuine.",
      rating: 5,
    },
    {
      name: "Jossie",
      text: "If you are looking to buy real Instagram followers, then I could highly recommend this. And you might wonder why I give 5 out of 5, from quality to service, packages, and support. This is what made me come back again and again.",
      rating: 5,
    },
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="w-full text-slate-800 font-sans antialiased overflow-x-hidden bg-white">
      {/* ── 1. HERO SECTION ── */}
      <section id="hero" className="relative w-full min-h-[auto] md:min-h-screen lg:min-h-[105vh] flex flex-col justify-center bg-[#16002d] text-white pt-28 pb-24 sm:pt-36 sm:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* HERO BACKGROUND IMAGE */}
        <img
          src={Tiky}
          alt=""
          className="absolute inset-0 z-0 w-full h-full object-cover"
          draggable={false}
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

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (Copy & Search Box) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs bg-white/10 rounded-full backdrop-blur border border-white/10 text-yellow-300 font-medium">
                  <FaStar className="fill-current text-yellow-400" />
                  <span>Rated 4.9 by 50,000+ Creators</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/40 text-pink-300 text-xs font-bold uppercase tracking-wider">
                  <FaInstagram className="text-pink-400" /> Instagram Growth
                </div>
              </div>

              {/* Main Heading H1 */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Buy{" "}
                <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-purple-400 bg-clip-text text-transparent">
                  Instagram Followers
                </span>{" "}
                with TikyTop to Grow Organically
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                Boost your growth with our 100% real followers, no passwords, no hidden charges, just simple and safe growth.
              </p>

              {/* 3 Highlight Benefits */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-lg pt-1">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200">
                  <UserCheck className="w-4 h-4 text-pink-400 flex-shrink-0" />
                  <span className="truncate">Active Followers</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-pink-400 flex-shrink-0" />
                  <span className="truncate">Highly Secured</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200">
                  <Headphones className="w-4 h-4 text-pink-400 flex-shrink-0" />
                  <span className="truncate">Complete Support</span>
                </div>
              </div>

              {/* CTA Input Search Box Container */}
              <div id="instagram-search-box" className="w-full max-w-xl pt-3 space-y-3">
                {/* CTA Callout Badge */}
                <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 border border-pink-500/30 rounded-2xl backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
                    <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                      Get IG Followers Now!
                    </span>
                  </div>
                  <span className="text-[11px] sm:text-xs text-pink-200 italic">
                    No more waiting, just growing
                  </span>
                </div>

                {/* Selected Package Banner if active */}
                {selectedPackage && (
                  <div className="flex items-center justify-between bg-pink-500/30 border border-pink-400/50 px-4 py-2 rounded-2xl text-white text-xs sm:text-sm font-semibold">
                    <span className="truncate">
                      Selected Package: <strong className="text-pink-300">{selectedPackage.quantity.toLocaleString()} Followers</strong> (${Number(selectedPackage.price).toFixed(2)})
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedPackage(null)}
                      className="ml-2 text-white/80 hover:text-white font-bold text-xs bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-full transition-colors flex-shrink-0"
                    >
                      Clear ✕
                    </button>
                  </div>
                )}

                {/* Input Search Form */}
                <form onSubmit={handleSearchSubmit} className="w-full relative">
                  <InputValidationPopup
                    show={!!validationError}
                    message={validationError}
                    onClose={() => setValidationError("")}
                  />
                  <div
                    className={`flex items-center bg-white rounded-full p-1.5 w-full h-[58px] sm:h-[62px] transition-all duration-300 shadow-2xl ${validationError
                      ? "ring-4 ring-pink-500/40 border-2 border-pink-500 shadow-pink-500/20"
                      : isFocused
                        ? "ring-4 ring-pink-500/30 border-2 border-pink-500"
                        : "border border-slate-200"
                      } ${isShaking ? "animate-input-shake" : ""}`}
                  >
                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 flex items-center justify-center ml-1 shadow-md">
                      <FaInstagram className="text-white text-xl" />
                    </div>

                    <input
                      ref={searchInputRef}
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        if (validationError) setValidationError("");
                      }}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder={
                        selectedPackage
                          ? `Enter IG username for ${selectedPackage.quantity.toLocaleString()} Followers`
                          : "Enter IG username or Profile URL"
                      }
                      className="flex-grow px-3 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-sm sm:text-base font-medium text-slate-800 placeholder-slate-400 min-w-0"
                    />

                    <button
                      type="submit"
                      disabled={isSearching}
                      className="flex-shrink-0 flex items-center justify-center px-4 sm:px-6 h-[46px] sm:h-[50px] rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 shadow-md hover:shadow-pink-500/25 disabled:opacity-75 cursor-pointer"
                    >
                      {isSearching ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        "Buy Real Followers"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram related statistics */}
        <div className="max-w-7xl mx-auto w-full mt-8 md:mt-16 relative z-30 px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white/5 backdrop-blur rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 border border-white/10">
            <div className="text-center p-2 sm:p-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-cyan-400">100K+</h3>
              <p className="text-[10px] sm:text-xs text-gray-300 mt-1 uppercase tracking-wider">ORDERS COMPLETED</p>
            </div>
            <div className="text-center p-2 sm:p-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-pink-500">50K+</h3>
              <p className="text-[10px] sm:text-xs text-gray-300 mt-1 uppercase tracking-wider">HAPPY IG CREATORS</p>
            </div>
            <div className="text-center p-2 sm:p-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-cyan-400">99.9%</h3>
              <p className="text-[10px] sm:text-xs text-gray-300 mt-1 uppercase tracking-wider">SUCCESS RATE</p>
            </div>
            <div className="text-center p-2 sm:p-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-pink-500">24/7</h3>
              <p className="text-[10px] sm:text-xs text-gray-300 mt-1 uppercase tracking-wider">CUSTOMER SUPPORT</p>
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
              d="M0,96L80,90.7C160,85,320,75,480,80C640,85,800,107,960,107C1120,107,1280,85,1360,74.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              fill="#ffffff"
              opacity="1.00"
            />
            <rect x="0" y="110" width="1440" height="20" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── 2. HOW TO BUY INSTAGRAM FOLLOWERS ── */}
      <section className="pt-14 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto">

          {/* Real-time Loop Delivery Counter */}
          <div className="flex justify-center mb-8 sm:mb-10">
            <LiveDeliveryCounter service="followers" platform="Instagram" />
          </div>

          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How to Buy Instagram Followers?
            </h2>
            <p className="text-[17px] sm:text-[19px] text-slate-600 font-medium">
              You are a few steps away from your Instagram followers!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 relative">
            {/* Step 1 */}
            <div className="group relative flex flex-col overflow-hidden rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(236,72,153,0.18)]">
              <div className="absolute right-6 top-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-pink-500 text-base font-bold text-white shadow-xl">
                01
              </div>

              <div className="relative h-[320px] sm:h-[360px] overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-100">
                <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-pink-400/30 blur-[120px] transition duration-700 group-hover:scale-125" />
                <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-purple-400/20 blur-[120px] transition duration-700 group-hover:scale-125" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_60%)]" />

                <img
                  src={Username}
                  alt="Enter Username"
                  className="relative z-10 h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:-rotate-2"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="absolute -left-40 top-0 h-full w-24 rotate-12 bg-white/40 blur-xl transition-all duration-1000 group-hover:left-[130%]" />
                </div>
              </div>

              <div className="relative bg-gradient-to-b from-white to-slate-50 p-6 sm:p-8 flex-grow">
                <span className="inline-flex rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-pink-600">
                  STEP 01
                </span>
                <h3 className="mt-4 text-xl sm:text-2xl font-bold text-slate-900">
                  Enter Username
                </h3>
                <p className="mt-3 text-[18px] leading-relaxed text-slate-600">
                  First, paste or type your username in the given box.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative flex flex-col overflow-hidden rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(236,72,153,0.18)]">
              <div className="relative h-[320px] sm:h-[360px] overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-100">
                <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-pink-400/30 blur-[120px]" />
                <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-rose-400/20 blur-[120px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(244,63,94,0.18),transparent_60%)]" />

                <img
                  src={ViewCard}
                  alt="Select Quantity"
                  className="relative z-10 h-full w-full object-cover scale-[1.04] sm:scale-[1.05] transition-all duration-700 group-hover:scale-[1.12] group-hover:rotate-2"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="absolute -left-40 top-0 h-full w-24 rotate-12 bg-white/40 blur-xl transition-all duration-1000 group-hover:left-[130%]" />
                </div>
              </div>

              <div className="relative bg-gradient-to-b from-white to-slate-50 p-6 sm:p-8 flex-grow">
                <span className="inline-flex rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-pink-600">
                  STEP 02
                </span>
                <h3 className="mt-4 text-xl sm:text-2xl font-bold text-slate-900">
                  Select Quantity
                </h3>
                <p className="mt-3 text-[18px] leading-relaxed text-slate-600">
                  Choose the total number of followers you need for the profile.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative flex flex-col overflow-hidden rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(168,85,247,0.18)]">
              <div className="absolute right-6 top-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-base font-bold text-white shadow-xl">
                03
              </div>

              <div className="relative h-[320px] sm:h-[360px] overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
                <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-purple-400/30 blur-[120px]" />
                <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-indigo-400/20 blur-[120px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.18),transparent_60%)]" />

                <img
                  src={Likes}
                  alt="Pay Securely"
                  className="relative z-10 h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:-rotate-2"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="absolute -left-40 top-0 h-full w-24 rotate-12 bg-white/40 blur-xl transition-all duration-1000 group-hover:left-[130%]" />
                </div>
              </div>

              <div className="relative bg-gradient-to-b from-white to-slate-50 p-6 sm:p-8 flex-grow">
                <span className="inline-flex rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-600">
                  STEP 03
                </span>
                <h3 className="mt-4 text-xl sm:text-2xl font-bold text-slate-900">
                  Pay Securely
                </h3>
                <p className="mt-3 text-[18px] leading-relaxed text-slate-600">
                  Once you've chosen the quantity, pay securely and get followers quickly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. LIVE ORDERING / PACKAGE SECTION ── */}
      {/* Reuses QuickPackageSelector for platform="instagram" & serviceKey="followers" */}
      <QuickPackageSelector
        platform="instagram"
        serviceKey="followers"
        serviceTitle="Followers"
        selectedPackage={selectedPackage}
        onSelectPackage={setSelectedPackage}
        scrollTargetId="instagram-search-box"
      />

      {/* ── CTA SECTION 1: SLOW GROWTH? WE FIX IT ── */}
      <section className="py-20 px-6 relative overflow-hidden bg-white text-gray-900">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-[#00f2fe]/20 to-[#4facfe]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-br from-[#ff0844]/20 to-[#ffb199]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-slate-900/5 backdrop-blur-xl rounded-[2.5rem] border border-slate-200/50 p-10 md:p-16 shadow-xl text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Slow Growth? We fix it
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Start seeing real results with our service. Place your first order and grow to new heights!
            </p>
            <button
              onClick={handlePackagesClick}
              className="px-10 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white rounded-full font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              Use Me
            </button>
          </div>
        </div>
      </section>

      {/* ── ZIG-ZAG ALTERNATING CONTENT SECTIONS ── */}

      {/* SECTION 1: Why Instagram Followers from TikyTop? (MEDIA LEFT, CONTENT RIGHT) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Media (Left on Desktop, Top on Mobile) */}
            <div className="w-full relative flex justify-center items-center">
              <div className="absolute -left-10 -top-10 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative w-full max-w-lg h-[480px] sm:h-[540px] lg:h-[580px] overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-gradient-to-br from-pink-50/50 via-white to-purple-50/50 p-3 sm:p-4 shadow-xl shadow-pink-500/5 transition-transform duration-500 hover:scale-[1.02] flex items-center justify-center">
                <video
                  src={InstagramLikesVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-[2rem] shadow-inner"
                />
              </div>
            </div>

            {/* Content (Right on Desktop, Bottom on Mobile) */}
            <div className="w-full space-y-5 text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Why Instagram Followers from TikyTop?
              </h2>
              <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-9 sm:leading-9 font-normal max-w-xl">
                <p>
                  Usually, as a creator, you create content and post it. But what about your Instagram growth? But your Instagram growth stays in the same place, doesn't it? Because of this, many creators get frustrated and fed up when they don't gain engagement. When Instagram changes its algorithm, it can feel like a competitive race to keep up. This can slow your growth; that is where TikyTop comes in to boost your reach. We understand every user’s struggle, which is why you can buy TikTok followers to grow your audience.
                </p>
                <p>
                  Moreover, TikyTop is a trustworthy site that can help you improve your Instagram followers. Thousands of creators and influencers have started using it and gotten the results they hoped for. You can buy real Instagram followers that engage, and you can choose packages that align with your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: How Fast Will You Get Your Results? (CONTENT LEFT, MEDIA RIGHT) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Content (Left on Desktop, Bottom on Mobile) */}
            <div className="w-full space-y-5 text-left lg:order-1 order-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-purple-600 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" /> The TikyTop Advantage
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                How Fast Will You Get Your Results?
              </h2>
              <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-9 sm:leading-9 font-normal max-w-xl">
                <p>
                  Once you place your order, you'll receive them within minutes. You don't have to sit for hours waiting for results. With quick delivery, you can make your growth experience even smoother. As your follower count increases, your profile will appear more often in the feed. This can help creators of all sizes. Purchasing is easier than ever; you can buy Instagram followers from your phone, desktop, or Mac on any device that feels comfortable for you.
                </p>
                <p>
                  When you purchase from us, you don't need to provide any personal information; your username is enough. While TikyTop helps you improve your followers, you can focus on posting content, engaging with users, and more. If you have any queries, you can contact us at our email: support@tikytop.com.
                </p>
              </div>
            </div>

            {/* Media (Right on Desktop, Top on Mobile) */}
            <div className="w-full relative flex justify-center items-center lg:order-2 order-1">
              <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-gradient-to-br from-purple-50/50 via-white to-pink-50/50 p-3 sm:p-4 shadow-xl shadow-purple-500/5 transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src={InstaLikesImage}
                  alt="How Fast Will You Get Your Results"
                  className="w-full h-auto max-h-[480px] object-cover rounded-[2rem] shadow-inner"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Do our Buy Instagram Followers make a Difference? (MEDIA LEFT, CONTENT RIGHT) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Media (Left on Desktop, Top on Mobile) */}
            <div className="w-full relative flex justify-center items-center">
              <div className="absolute -left-10 -bottom-10 w-72 h-72 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-gradient-to-br from-rose-50/50 via-white to-pink-50/50 p-3 sm:p-4 shadow-xl shadow-rose-500/5 transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src={InstaLikesImage1}
                  alt="Do our Buy Instagram Followers make a Difference"
                  className="w-full h-auto max-h-[420px] object-cover rounded-[2rem] shadow-inner"
                />
              </div>
            </div>

            {/* Content (Right on Desktop, Bottom on Mobile) */}
            <div className="w-full space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-600 text-xs font-bold uppercase tracking-wider">
                <UserCheck className="w-3.5 h-3.5 text-rose-500" /> Follower Growth
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Do our Buy Instagram Followers make a Difference?
              </h2>
              <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-9 sm:leading-9 font-normal max-w-xl">
                <p>
                  Of course, our service will help you make a difference. We'll share your profile with a wide audience, and active followers will follow your account. We verify each profile to ensure it is real. With our quality followers, you can beat the competition. Usually, Instagram favors videos with more engagement. When you buy Instagram followers from TikyTop, your audience count will increase. The more followers you get, the more social proof you will have. Your page will also appear more reliable and trustworthy.
                </p>
                <p>
                  Even if you are a big creator, you still need a push, and that’s why we always support you in any cause. With our service, you can grow your follower base easily. This is how we stand out from others.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION 2: POWER UP YOUR PROFILE (GRADIENT BANNER) ── */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Power up your Profile
          </h2>
          <p className="text-base sm:text-xl text-pink-100 font-medium max-w-2xl mx-auto">
            Now your profile growth is made simple. Buy active Instagram followers online!
          </p>
          <div>
            <button
              onClick={handlePackagesClick}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-pink-600 hover:bg-slate-100 font-extrabold text-base transition-all duration-200 shadow-xl hover:scale-105 cursor-pointer"
            >
              Buy Now <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION (8 FAQS FROM PDF) ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Questions? Learn More about our Buy Instagram Followers
            </h2>
            <p className="text-[20px] sm:text-[18px] text-slate-600 font-medium">
              With our Instagram followers service, you can definitely make a difference. And check our FAQs for more information.
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-base sm:text-lg hover:text-pink-600 transition-colors focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION 3: YOUR GROWTH STARTS HERE (DARK BANNER) ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Your Growth Starts Here
          </h2>
          <p className="text-sm sm:text-lg text-slate-300">
            Real followers delivered here. Don't wait; click the button to make your profile brighter.
          </p>
          <div>
            <button
              onClick={scrollToSearch}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-base hover:from-pink-600 hover:to-purple-700 shadow-lg shadow-pink-500/25 transition-all cursor-pointer"
            >
              Get Followers <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION (AUTO-SCROLLING CAROUSEL WITH PAUSE-ON-HOVER) ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-bold uppercase tracking-wider">
              Real Reviews
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Don't Just Take our Word for it; See Why Our Customers Come Back Again
            </h2>
            <p className="text-[20px] sm:text-[18px] text-slate-600 font-medium">
              TikyTop is the best place to buy Instagram followers, and see why many of the users love using our service.
            </p>
          </div>

          {/* Carousel container with pause-on-hover */}
          <div className="w-full overflow-hidden pause-hover relative py-4">
            {/* Subtle fade overlay on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee gap-6 flex">
              {duplicatedTestimonials.map((item, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[300px] sm:w-[350px] bg-slate-50 border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <FaStar key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                      "{item.text}"
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.name}</h4>
                      <p className="text-[10px] text-slate-400">Verified Customer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
