import React, { useState, useEffect } from "react";
import API_URL from "../config/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Star,
  Shield,
  Clock,
  Tag,
  Headphones,
  Zap,
  TrendingUp,
  UserCheck,
  Lock,
  ThumbsUp,
  Users,
} from "lucide-react";
import { FaTiktok, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";
import QuickPackageSelector from "../components/QuickPackageSelector";
import Tiky from "../assets/images/Tiktoklike.png";

import Username from "../assets/images/username.png";
import Post from "../assets/images/viewcard1.png";
import Likes from "../assets/images/viewscard.png";

export default function BuyTikTokFollowers() {
  useScrollToTop();
  const navigate = useNavigate();

  // Search Flow States matching BuyTikTokViews
  const [username, setUsername] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  const testimonials = [
    {
      name: "Douglas",
      text: "Honestly, I was not expecting this much. The results took it to the next level. Guys, you can really give it a try!",
      rating: 5,
    },
    {
      name: "Luke",
      text: "While searching for TikTok buy followers, I recently came across TikyTop and never thought this could be the place for my growth. The reason I come again and again is that the results are genuine.",
      rating: 5,
    },
    {
      name: "K",
      text: "Nothing makes you happier than reaching your success. And this happened when I used TikyTop. When I buy followers for TikTok from them, they never disappoint me. No matter how much time I purchase, it is worth the money.",
      rating: 5,
    },
    {
      name: "Lue P",
      text: "No cap, this service has understood exactly what I need. Even though I have used many sites, this is unique and the best of all. Overall, it is just awesome.",
      rating: 5,
    },
    {
      name: "Travis",
      text: "I really had a great experience, and now I am very happy because my TikTok account has started growing. No words to explain. Thank you so much, team!",
      rating: 5,
    },
    {
      name: "Rodriguez",
      text: "You can easily buy active TikTok followers here. At first, I thought order processing would be challenging. But it is the opposite: from start to finish, the process is simple and beginner-friendly.",
      rating: 4.5,
    },
    {
      name: "Ramsey",
      text: "Hey guys, as a small creator, I am looking for ways to gain followers. And for the past 3 months, I was not able to increase my follower count. But now my profile has seen massive growth, and my followers remain consistent and maintain strong engagement.",
      rating: 5,
    },
    {
      name: "Mirren H",
      text: "I would say this service is totally a vibe because it is fast, beginner-friendly, and just a wow experience. If you are looking to buy TikTok followers safely, then I would highly recommend this service.",
      rating: 5,
    },
    {
      name: "Lyon",
      text: "No, I don't need to look back at my account because all the followers I received are from real accounts.",
      rating: 4.5,
    },
    {
      name: "Emma",
      text: "My TikTok account performance was very low, and I literally thought the account was dead. And with TikyTop, I made a comeback. Usually I don't get much response, but the real account users have started building a strong relationship with me. Kudos to the team!",
      rating: 5,
    },
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  // Dynamic Metadata
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "TikyTop | Buy TikTok Followers | Social Media Growth";

    const updateOrCreateMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateOrCreateMetaTag('name', 'description', 'Buy TikTok followers from TikyTop and improve your TikTok analytics. Our 100% real followers will make your profile more engaging than ever before.');
    updateOrCreateMetaTag('name', 'keywords', 'Buy tiktok followers, tiktok followers buy, buy 1000 tiktok followers, how to buy tiktok followers, tiktok buy followers, can you buy tiktok followers');
    updateOrCreateMetaTag('name', 'robots', 'index, follow');

    updateOrCreateMetaTag('property', 'og:type', 'website');
    updateOrCreateMetaTag('property', 'og:title', 'TikyTop | Buy TikTok Followers | Social Media Growth');
    updateOrCreateMetaTag('property', 'og:description', 'Buy TikTok followers from TikyTop and improve your TikTok analytics. Our 100% real followers will make your profile more engaging than ever before.');
    updateOrCreateMetaTag('property', 'og:url', 'https://tikytop.com/tiktok/buy-followers');
    updateOrCreateMetaTag('property', 'og:site_name', 'TikyTop');

    updateOrCreateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateOrCreateMetaTag('name', 'twitter:title', 'TikyTop | Buy TikTok Followers | Social Media Growth');
    updateOrCreateMetaTag('name', 'twitter:description', 'Buy TikTok followers from TikyTop and improve your TikTok analytics. Our 100% real followers will make your profile more engaging than ever before.');

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://tikytop.com/tiktok/buy-followers');

    return () => {
      document.title = originalTitle;
    };
  }, []);

  const faqs = [
    {
      q: "How to buy TikTok followers?",
      a: "Just simple! Before you buy TikTok followers, make sure your account is public. First, open TikyTop, then enter your username. Next, choose the service (TikTok followers). Once the service is chosen, it takes you to the profile page; next, choose how many followers you need. Once you've finalized your order, make the payment and get followers instantly.",
    },
    {
      q: "Can you buy TikTok followers?",
      a: "Of course you can buy TikTok followers from a trusted site like TikyTop. All followers are from real accounts, and none are fake or temporary. Many top creators and marketers use our service to enhance their TikTok profile. Since our priority is to provide the best, we ensure nothing goes wrong.",
    },
    {
      q: "What qualities can I expect from TikyTop?",
      a: "We always focus on high-quality service. Under no circumstances do we disappoint our customers. Once you buy TikTok followers from us, you can expect fast ordering and a user-friendly experience. The followers are 100% real accounts used regularly on TikTok. As they are from real accounts, they increase your reach.",
    },
    {
      q: "Is buying TikTok followers enough for growth?",
      a: "Definitely, you will get a chance to improve your profile when you buy high-quality TikTok followers from us. However, it is one way to improve your presence. As a creator or marketer, you can also focus on consistency, following current trends, and building relationships with your audience. All of these make your profile stronger and support growth.",
    },
    {
      q: "Why is it important to buy TikTok followers?",
      a: "The reason buying followers is important: it can strengthen your profile, make it engaging, and help you reach more audiences. Also, a high follower count can create a positive impression and encourage more people to follow your account. You can be any user and use a trusted site like TikyTop to buy TikTok followers with secure payment.",
    },
    {
      q: "Which is better to buy TikTok followers or views?",
      a: "They all help you grow and improve your overall performance. Whether it is followers or views, it helps boost your profile. Choose based on your needs and goals. Check what you need the most.",
    },
  ];

  const handleSearchSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const input = username.trim();
    if (!input) return;

    const isProfileLink = input.includes("tiktok.com") && !input.includes("/video/");
    const isPostLink = input.includes("tiktok.com") && input.includes("/video/");

    if (isProfileLink || isPostLink) {
      navigate("/direct-order-service", {
        state: {
          directOrder: true,
          orderLink: input,
          platform: "tiktok",
          linkType: isProfileLink ? "profile" : "post",
          selectedPackage,
          quantity: selectedPackage ? selectedPackage.quantity : undefined
        },
      });
      return;
    }

    try {
      setIsSearching(true);
      const response = await fetch(`${API_URL}/api/tiktok/user/${input}`);
      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "User not found");
        return;
      }

      navigate("/profile-overview", {
        state: {
          userdata: data,
          platform: "tiktok",
          username: input,
          selectedServiceKey: "followers",
          entryPath: "/tiktok/buy-followers",
          selectedPackage,
          quantity: selectedPackage ? selectedPackage.quantity : undefined
        },
      });
    } catch (error) {
      console.log(error);
      alert("Profile fetch failed. Please copy and paste profile/post URL for direct order.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleCTAClick = () => {
    document.getElementById("tiktok-search-box")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="text-white font-sans antialiased overflow-x-hidden">
      {/* ── REDESIGNED HERO SECTION (MATCHING BUY TIKTOK VIEWS) ── */}
      <section id="hero" className="relative w-full min-h-[auto] md:min-h-screen bg-[#1a0b2e] flex flex-col items-center justify-center pt-24 pb-12 sm:pt-28 sm:pb-20 px-5 md:px-6 overflow-hidden">
        {/* HERO IMAGE - BACKGROUND */}
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

        {/* Animated Background blobs */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[110px] animate-pulse pointer-events-none" />
        <div className="absolute top-1/3 -right-48 w-96 h-96 bg-pink-500/10 rounded-full blur-[110px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

        <div className="max-w-7xl mx-auto w-full relative z-30 flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center text-center lg:text-left">

          {/* Left Column: Headline & Search Bar */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8 flex flex-col items-center lg:items-start w-full">

            {/* Trust Badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-4 lg:mt-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 text-xs bg-white/10 rounded-full backdrop-blur border border-white/10 text-yellow-400 font-semibold">
                <FaStar className="fill-current" />
                <span>Rated 4.9 by 50,000+ TikTok Creators</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider">
                <FaTiktok className="w-3.5 h-3.5" /> Premium TikTok Growth
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-[34px] sm:text-5xl lg:text-6xl font-bold leading-tight font-righteous tracking-tight">
              Buy TikTok Followers <br />
              <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-rose-500 bg-clip-text text-transparent block sm:inline">
                For Viral Reach
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-[340px] sm:max-w-xl mx-auto lg:mx-0">
              Make your growth extraordinary with TikyTop. Yes, buy TikTok followers with our multiple growth packages.
            </p>

            {/* Feature Row Badges */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-[340px] sm:max-w-xl pt-2">
              <span className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-gray-300 bg-white/5 px-3 py-2 rounded-full border border-white/5 whitespace-nowrap">
                <Headphones className="w-3.5 h-3.5 text-cyan-400" />
                Reliable Support
              </span>
              <span className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-gray-300 bg-white/5 px-3 py-2 rounded-full border border-white/5 whitespace-nowrap">
                <TrendingUp className="w-3.5 h-3.5 text-pink-400" />
                Maximum Growth
              </span>
              <span className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-gray-300 bg-white/5 px-3 py-2 rounded-full border border-white/5 whitespace-nowrap col-span-2 sm:col-span-1">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                Privacy Focused
              </span>
            </div>

            {/* Search Bar / Input flow */}
            <div
              id="tiktok-search-box"
              className="w-full max-w-xl pt-2 flex flex-col gap-2.5 relative"
            >
              {selectedPackage && (
                <div className="w-full flex items-center justify-between bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 border border-pink-500/40 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs sm:text-sm font-semibold shadow-lg">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-base flex-shrink-0 animate-bounce">✨</span>
                    <span className="truncate">
                      Selected Package: <strong className="text-pink-400">{selectedPackage.quantity.toLocaleString()} Followers</strong> (${Number(selectedPackage.price).toFixed(2)})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedPackage(null)}
                    className="ml-2 text-white/80 hover:text-white font-bold text-xs bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full transition-colors flex-shrink-0"
                  >
                    Clear ✕
                  </button>
                </div>
              )}
              <form onSubmit={handleSearchSubmit} className="w-full relative">
                <div
                  style={{
                    boxShadow: isFocused
                      ? "0 20px 50px rgba(0,0,0,0.12), 0 0 0 4px rgba(255, 0, 142, 0.25)"
                      : "0 20px 50px rgba(0,0,0,0.12)"
                  }}
                  className="flex items-center bg-white rounded-full p-1.5 w-full h-[60px] transition-all duration-300 transform hover:-translate-y-1 relative"
                >
                  {/* TikTok Icon */}
                  <div className="flex-shrink-0 w-[44px] h-[44px] rounded-full bg-slate-900 border border-pink-500/50 flex items-center justify-center ml-1 animate-pulse shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                    <FaTiktok className="text-cyan-400 text-lg" />
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
                        handleSearchSubmit(e);
                      }
                    }}
                    placeholder={
                      selectedPackage
                        ? `Enter TikTok username for ${selectedPackage.quantity.toLocaleString()} Followers`
                        : "Enter your TikTok Username"
                    }
                    className="flex-grow h-full px-3.5 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-[15px] sm:text-[16px] font-medium text-gray-800 placeholder-gray-400 min-w-0"
                  />

                  {/* Search Button */}
                  <button
                    type="submit"
                    onClick={handleSearchSubmit}
                    disabled={isSearching}
                    style={{
                      background: "linear-gradient(90deg, #ff008e, #8b2cff)"
                    }}
                    className="flex-shrink-0 flex items-center justify-center w-[120px] sm:w-[160px] h-[48px] rounded-full text-white text-[13px] sm:text-[15px] font-bold transition-all duration-300 mr-0.5 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,0,142,0.4)] disabled:opacity-80 disabled:cursor-not-allowed select-none cursor-pointer"
                  >
                    {isSearching ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      "Get TikTok Followers"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Visual Frame matching BuyTikTokViews */}
          <div className="lg:col-span-5 relative flex justify-center items-center w-full max-w-[320px] lg:max-w-none mx-auto mt-6 lg:mt-0">
            <div className="w-[80%] lg:w-[50%] h-[60px] lg:h-auto lg:aspect-square relative">
              <div className="absolute -top-2 -right-2 md:-top-6 md:-right-6 w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-tr from-cyan-400 to-pink-500 rounded-2xl flex items-center justify-center text-white text-xl lg:text-2xl shadow-lg shadow-pink-500/30 animate-bounce">
                <FaTiktok />
              </div>
              <div className="absolute -bottom-2 -left-2 md:-bottom-8 md:-left-6 w-14 h-14 lg:w-16 lg:h-16 bg-pink-500/20 backdrop-blur rounded-full border border-pink-500/40 flex items-center justify-center text-white text-xl lg:text-2xl shadow-lg shadow-pink-500/30">
                ❤️
              </div>
            </div>
          </div>

        </div>

        {/* TikTok related statistics */}
        <div className="max-w-7xl mx-auto w-full mt-8 md:mt-20 relative z-30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white/5 backdrop-blur rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 border border-white/10">
            <div className="text-center p-2 sm:p-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-cyan-400">100K+</h3>
              <p className="text-[10px] sm:text-xs text-gray-300 mt-1 uppercase tracking-wider">Orders Completed</p>
            </div>
            <div className="text-center p-2 sm:p-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-pink-500">50K+</h3>
              <p className="text-[10px] sm:text-xs text-gray-300 mt-1 uppercase tracking-wider">Happy TikTok Creators</p>
            </div>
            <div className="text-center p-2 sm:p-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-cyan-400">99.9%</h3>
              <p className="text-[10px] sm:text-xs text-gray-300 mt-1 uppercase tracking-wider">Success Rate</p>
            </div>
            <div className="text-center p-2 sm:p-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-pink-500">24/7</h3>
              <p className="text-[10px] sm:text-xs text-gray-300 mt-1 uppercase tracking-wider">Customer Support</p>
            </div>
          </div>
        </div>

        {/* Premium Wave Transition Layer (Matching BuyTikTokViews) */}
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

      {/* ── HOW TO BUY TIKTOK FOLLOWERS SECTION (WHITE THEME) ── */}
      <section className="py-24 px-6 bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              How to Buy TikTok Followers?
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-500">
              We deliver our service quickly and securely. You can check our deals, and your growth will begin shortly.
            </p>
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-3">
            {/* Step 1 */}
            <div className="group relative flex flex-col overflow-hidden rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(6,182,212,0.18)]">
              <div className="absolute right-6 top-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-lg font-bold text-white shadow-xl">
                01
              </div>
              <div className="relative h-[380px] overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-cyan-100">
                <img
                  src={Username}
                  alt="Enter Username"
                  className="relative z-10 h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:-rotate-2"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
              </div>
              <div className="relative bg-gradient-to-b from-white to-slate-50 p-8 pb-12 flex-grow">
                <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-600">
                  Step 01
                </span>
                <h3 className="mt-5 text-2xl font-bold text-slate-900">
                  Enter Username
                </h3>
                <p className="mt-4 leading-7 text-slate-600">
                  Firstly, enter your TikTok username in the given box.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative flex flex-col overflow-hidden rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(236,72,153,0.18)]">
              <div className="absolute right-6 top-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-pink-500 text-lg font-bold text-white shadow-xl">
                02
              </div>
              <div className="relative h-[380px] overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-100">
                <img
                  src={Post}
                  alt="Confirm Purchase"
                  className="relative z-10 h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
              </div>
              <div className="relative bg-gradient-to-b from-white to-slate-50 p-8 pb-12 flex-grow">
                <span className="inline-flex rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-pink-600">
                  Step 02
                </span>
                <h3 className="mt-5 text-2xl font-bold text-slate-900">
                  Confirm Purchase
                </h3>
                <p className="mt-4 leading-7 text-slate-600">
                  Choose the package that you want to improve your follower count for.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative flex flex-col overflow-hidden rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(139,92,246,0.18)]">
              <div className="absolute right-6 top-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-violet-500 text-lg font-bold text-white shadow-xl">
                03
              </div>
              <div className="relative h-[380px] overflow-hidden bg-gradient-to-br from-violet-50 via-white to-violet-100">
                <img
                  src={Likes}
                  alt="Pay Securely"
                  className="relative z-10 h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:-rotate-2"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
              </div>
              <div className="relative bg-gradient-to-b from-white to-slate-50 p-8 pb-12 flex-grow">
                <span className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-600">
                  Step 03
                </span>
                <h3 className="mt-5 text-2xl font-bold text-slate-900">
                  Pay Securely
                </h3>
                <p className="mt-4 leading-7 text-slate-600">
                  Finally, select the payment button to pay and get followers instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK PACKAGE SELECTOR SECTION ── */}
      <QuickPackageSelector
        platform="tiktok"
        serviceKey="followers"
        serviceTitle="Followers"
        selectedPackage={selectedPackage}
        onSelectPackage={setSelectedPackage}
        scrollTargetId="tiktok-search-box"
      />

      {/* ── MID-PAGE CTA BANNER 1 ── */}
      <section className="py-16 md:py-24 px-4 bg-slate-50 relative overflow-hidden flex justify-center items-center">
        <div className="max-w-4xl w-[92%] md:w-full mx-auto relative z-10 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              background: 'linear-gradient(135deg, rgba(235, 250, 255, 0.95), rgba(255, 246, 250, 0.95))',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 30px 80px rgba(0,0,0,.12), 0 10px 30px rgba(255,0,140,.08)'
            }}
            className="w-full rounded-[24px] md:rounded-[36px] p-8 md:py-16 md:px-12 text-center flex flex-col items-center justify-center overflow-hidden border border-white/60 relative"
          >
            <h2 className="text-[26px] sm:text-3xl md:text-[38px] font-extrabold text-[#111827] leading-[1.2] text-center tracking-tight mb-5">
              Grow Your Following with TikyTop
            </h2>
            <p className="text-[14px] md:text-[16px] font-normal text-[#4B5563] leading-[1.6] max-w-[620px] text-center mb-7">
              TikyTop supports creators' growth and needs, consistently providing innovative solutions to our customers.
            </p>
            <button
              onClick={handleCTAClick}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full text-white font-bold text-sm sm:text-[15px] bg-[#ff1788] hover:bg-[#ff2e9c] hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,23,136,0.3)] transition-all duration-300 select-none cursor-pointer"
            >
              Get followers now!
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── WHY IS TIKYTOP THE #1 SERVICE TO BUY TIKTOK FOLLOWERS (WHITE THEME) ── */}
      <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc] text-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Why is TikyTop the #1 Service to Buy TikTok Followers?
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Make your TikTok account stand out from your competitors. Start growing your account with our real followers.
          </p>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* 1 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Get Real Followers</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                When you buy TikTok followers from us, you will get real and active engagement. Many creators and influencers gain more engagement. No matter how engaged you are, more followers can help your profile grow even faster. TikyTop will connect you with real followers who align with your goals and needs.
              </p>
            </div>

            {/* 2 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center text-white mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">No Login Required</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                You don't need to create an account to use our service or tools. All you need is a public TikTok account. This keeps your data safe and saves you time. This supports long-term growth and keeps your account free from spam. Yes, your account will stay safe, and you can focus on what matters more.
              </p>
            </div>

            {/* 3 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-sky-500 flex items-center justify-center text-white mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Get Fast Delivery</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                When you want to grow online, it might take some time to reach new heights. That is why our service provides a smart way for customers. As soon as you order, you can get results within a few moments. With fast delivery, you will not miss the moment, and your efforts will be clearly visible when users check you out.
              </p>
            </div>

            {/* 4 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white mb-4">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">More Profile Visits</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                A profile should be steady and popular. Even follower count matters more. We help you improve your follower count at affordable prices. When you use our service, you will gain more real opportunities, trust, and more eyes on your profile. When your profile looks active, new visitors have a reason to follow your account.
              </p>
            </div>

            {/* 5 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Expand Your Reach</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Make a push to your profile because it deserves more engagement. Expand your reach with our instant TikTok followers to easily improve your engagement rate. Now you are in safe hands; TikyTop will go the extra mile to support your profile. Because maintaining your account reputation is important, we will support you throughout the process.
              </p>
            </div>

            {/* 6 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Build Social Proof</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Social proof is important because it shows that people’s opinions matter when they're making a purchase. Whether it's about reviews or finding the best site to buy TikTok followers, we are the trusted choice. So without any confusion, you can purchase as much as you want and grow organically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT CAN YOU EXPECT FROM TIKYTOP (WHITE THEME) ── */}
      <section className="py-24 px-6 bg-slate-50 text-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            What Can You Expect from TikyTop?
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            You can also buy 1000 TikTok followers; the quantity doesn't matter. Even for small packages, your account becomes more popular.
          </p>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white border border-slate-150 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-pink-100 text-pink-500 mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Satisfaction Guaranteed</h3>
              <p className="text-gray-500 text-xs md:text-[13px] leading-relaxed">
                All users of our service will never be disappointed, as our priority is to meet their needs. As we provide quality followers, they enjoy real followers. Of course, we help our customers at every stage of their TikTok journey.
              </p>
            </div>

            <div className="bg-white border border-slate-150 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 mb-4">
                <Tag className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Multiple Payment Options</h3>
              <p className="text-gray-500 text-xs md:text-[13px] leading-relaxed">
                We understand our users, so we offer multiple payment options. You can pay using a digital wallet, cards, or bank transfer. And this is why TikyTop stands out from other competitors.
              </p>
            </div>

            <div className="bg-slate-white border border-slate-150 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-purple-100 text-purple-600 mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Highly Secure Encryption</h3>
              <p className="text-gray-500 text-xs md:text-[13px] leading-relaxed">
                Safety comes first; many people think buying TikTok followers is unsafe. But the thing is, we don't ask for any of your passwords, and all transactions are fully encrypted. So, you can order without any hesitation.
              </p>
            </div>

            <div className="bg-white border border-slate-150 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 mb-4">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Trustworthy & Reliable</h3>
              <p className="text-gray-500 text-xs md:text-[13px] leading-relaxed">
                Many users prefer TikyTop because of our trustworthiness and the quality we provide. Purchasing any one of our TikTok fan packages can improve your profile growth. Also, we help you stand out from other users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MID-PAGE CTA BANNER 2 ── */}
      <section className="py-20 px-6 relative overflow-hidden bg-white text-gray-900">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-slate-900/5 backdrop-blur-xl rounded-[2.5rem] border border-slate-200/50 p-12 md:p-16 shadow-xl text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-955 mb-6 leading-tight">
              What Makes Your Profile Look Better?
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
              Everyone is chasing growth, and you can start working smartly with TikyTop!
            </p>
            <button
              onClick={handleCTAClick}
              className="px-10 py-4.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105"
            >
              See our Packages
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION (ACCORDION - WHITE THEME) ── */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-100 text-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
              Frequently Asked Questions on Buy TikTok Followers
            </h2>
            <p className="mt-4 text-gray-500 text-sm sm:text-base">
              Here are the most asked questions about our followers service. This will help you out of confusion. Start to buy TikTok followers and grow consistently!
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex justify-between items-center px-6 py-5 text-left font-bold text-gray-900 hover:text-pink-600 transition-colors"
                  >
                    <span className="text-[15px] sm:text-[17px] pr-4">{faq.q}</span>
                    <span className="text-pink-500 flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-sm sm:text-[15px] text-gray-600 leading-relaxed border-t border-slate-50 pt-4 whitespace-pre-line">
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

      {/* ── FINAL CTA SECTION (MATCHING BUY TIKTOK VIEWS) ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#3b0622] via-[#210438] to-[#0a0212] text-white text-center relative overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-pink-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px]" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-yellow-300 text-xs font-bold uppercase tracking-wider">
            ✨ Do You Know?
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            With TikTok followers buy, you can get instant followers with lightning-fast delivery!
          </h2>
          <div className="pt-4">
            <button
              onClick={handleCTAClick}
              className="px-12 py-5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white rounded-full font-extrabold text-lg hover:shadow-[0_0_35px_rgba(236,72,153,0.4)] hover:scale-105 transition-all duration-300 border border-pink-400/30 cursor-pointer"
            >
              Buy TikTok Followers
            </button>
          </div>
        </div>
      </section>

      {/* ── REVIEWS SECTION (MATCHING BUY TIKTOK VIEWS) ── */}
      <section className="py-24 px-6 bg-white overflow-hidden relative text-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Buy TikTok Followers Reviews
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-16 text-sm sm:text-base">
            Hear from our top creators and users on what they think about our service. Thousands of users have used our service, and now it is your turn to enhance!
          </p>
        </div>

        {/* Carousel container */}
        <div className="w-full overflow-hidden pause-hover relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee gap-6 flex">
            {duplicatedTestimonials.map((t, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[300px] sm:w-[350px] bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => {
                      const ratingValue = i + 1;
                      if (ratingValue <= Math.floor(t.rating)) {
                        return <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />;
                      } else if (ratingValue - 0.5 === t.rating) {
                        return (
                          <div key={i} className="relative w-4 h-4 text-gray-200">
                            <Star className="w-4 h-4 fill-current text-gray-200" />
                            <div className="absolute top-0 left-0 h-full w-[50%] overflow-hidden">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            </div>
                          </div>
                        );
                      } else {
                        return <Star key={i} className="w-4 h-4 text-gray-200 fill-current" />;
                      }
                    })}
                  </div>
                  <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed italic mb-6">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-200/50">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900">{t.name}</h4>
                    <p className="text-[10px] text-gray-400">Verified TikyTop Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
