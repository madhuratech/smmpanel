import React, { useState, useEffect } from "react";
import API_URL from "../config/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Star,
  Users,
  Shield,
  Clock,
  ThumbsUp,
  Lock,
  Headphones,
  Zap,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { FaTiktok, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";
import QuickPackageSelector from "../components/QuickPackageSelector";
import LiveDeliveryCounter from "../components/LiveDeliveryCounter";
import Tiky from "../assets/images/Tiktoklike.png";

import Username from "../assets/images/username.png";
import Post from "../assets/images/Likeimage.png";
import Likes from "../assets/images/likes.png";

export default function BuyTikTokLikes() {
  useScrollToTop();
  const navigate = useNavigate();

  // Search Flow States matching main Hero.jsx
  const [username, setUsername] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  // Testimonials Auto-scroll Carousel Ref
  const scrollContainerRef = React.useRef(null);

  const testimonials = [
    {
      name: "Basil",
      text: "OMG! Guys, I can't believe this. It actually works better than my expectations! This is a big bang for all creators and business people.",
      rating: 4.5,
    },
    {
      name: "Cummins",
      text: "How to get more TikTok likes? This is all I was thinking about. Then one of my friends suggested me to buy TikTok likes, and now my TikTok visibility has increased, and I highly recommend it!",
      rating: 4,
    },
    {
      name: "Mosby",
      text: "Authentic TikTok likes, high-quality TikTok likes, and content visibility all at one place. Can't even imagine it, right? Yes, guys, I was a small creator, and now I'm able to reach a wider audience. I received exactly what I needed. It's your turn!",
      rating: 4.5,
    },
    {
      name: "Francis D’Souza",
      text: "This platform could be a great option for those who are looking to buy cheap TikTok likes and an affordable package.",
      rating: 4,
    },
    {
      name: "Joe Wilson",
      text: "Recently, I decided to buy likes on TikTok for one of my posts. From beginning to end, the entire process was smooth and easy. The likes that arrived were completely natural, and I never found any fake accounts. Kudos to the team! Thank you for the support.",
      rating: 4.5,
    },
    {
      name: "Jimmy",
      text: "Guys, if you are a creator, you might get confused and wonder how to buy TikTok likes. I have found this service where my TikTok performance has completely changed. Trust me, guys, this is the best TikTok likes provider I have ever seen.",
      rating: 4,
    },
    {
      name: "Anne M",
      text: "Even though I have purchased TikTok likes from other platforms, nothing matches this. If you want to buy cheap TikTok likes without sacrificing quality, I would highly recommend this.",
      rating: 4.5,
    },
    {
      name: "Janira",
      text: "This platform is one of the best place to buy TikTok likes, and there is no compromise in quality. The likes were delivered within a few minutes, and the best part is that the TikTok likes are from a real account. Thank you, team!",
      rating: 4,
    },
    {
      name: "Salt",
      text: "Just superb! And it has been almost 3 months since I have been using this service. Now I even recommend my friend to buy TikTok likes, and finally we are both satisfied with the results.",
      rating: 4,
    },
    {
      name: "Ally",
      text: "I have never seen an affordable TikTok likes service before. Friends, if you are a budding creator and don't have any support, trust me, you are not alone. The ordering process is easy: give your username, buy TikTok likes, complete payment, and get TikTok likes.",
      rating: 4.5,
    },
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  // Set page titles and meta description
  useEffect(() => {
    // 1. Title
    const originalTitle = document.title;
    document.title = "Buy TikTok Likes | Real & Instant TikTok Likes | TikyTop";

    // 2. Helper to set/update elements
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
      return element;
    };

    // Description & Keywords
    const metaDesc = setMetaTag('name', 'description', 'Ranked #1 service in 2026. TikyTop offers the best packages where you can customize and buy TikTok likes that is without providing your personal information.');
    const metaKeywords = setMetaTag('name', 'keywords', 'buy tiktok likes, how to buy tiktok likes, how to get more tiktok likes, buy tiktok likes and views, buy likes on tiktok, tiktok likes buy, buy real tiktok likes, buy cheap tiktok likes, how to buy likes on tiktok, best place to buy tiktok likes, buy 50 tiktok likes, instant tiktok likes, real tiktok engagement, tiktok growth, tiktok promotion, viral tiktok, tiktok marketing, increase tiktok likes');
    const metaRobots = setMetaTag('name', 'robots', 'index, follow');

    // OpenGraph Tags
    const ogType = setMetaTag('property', 'og:type', 'website');
    const ogTitle = setMetaTag('property', 'og:title', 'Buy TikTok Likes | Real & Instant TikTok Likes | TikyTop');
    const ogDesc = setMetaTag('property', 'og:description', 'Buy authentic TikTok Likes instantly with TikyTop. Fast delivery, secure payment, and real engagement to grow your TikTok profile.');
    const ogUrl = setMetaTag('property', 'og:url', 'https://tikytop.com/tiktok/buy-likes');
    const ogImage = setMetaTag('property', 'og:image', 'https://tikytop.com/images/tiktok-likes-banner.jpg');
    const ogSite = setMetaTag('property', 'og:site_name', 'TikyTop');

    // Twitter Tags
    const twitterCard = setMetaTag('name', 'twitter:card', 'summary_large_image');
    const twitterTitle = setMetaTag('name', 'twitter:title', 'Buy TikTok Likes | Real & Instant TikTok Likes | TikyTop');
    const twitterDesc = setMetaTag('name', 'twitter:description', 'Boost your TikTok profile with real TikTok Likes. Secure checkout, instant delivery, and premium support from TikyTop.');
    const twitterImage = setMetaTag('name', 'twitter:image', 'https://tikytop.com/images/tiktok-likes-banner.jpg');

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://tikytop.com/buy-tiktok-likes');

    // Clean up on component unmount
    return () => {
      document.title = originalTitle;

      const removeMetaTag = (attrName, attrValue) => {
        const element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
        if (element) element.remove();
      };

      removeMetaTag('name', 'description');
      removeMetaTag('name', 'keywords');
      removeMetaTag('name', 'robots');

      removeMetaTag('property', 'og:type');
      removeMetaTag('property', 'og:title');
      removeMetaTag('property', 'og:description');
      removeMetaTag('property', 'og:url');
      removeMetaTag('property', 'og:image');
      removeMetaTag('property', 'og:site_name');

      removeMetaTag('name', 'twitter:card');
      removeMetaTag('name', 'twitter:title');
      removeMetaTag('name', 'twitter:description');
      removeMetaTag('name', 'twitter:image');

      const canonicalEl = document.querySelector('link[rel="canonical"]');
      if (canonicalEl) canonicalEl.remove();
    };
  }, []);

  // Testimonials Auto-scroll carousel is now handled via GPU accelerated CSS keyframes
  useEffect(() => {
    // No timer code required - completely CSS driven marquee
  }, []);

  const faqs = [
    {
      q: "How to buy TikTok likes from TikyTop?",
      a: "​You can easily buy TikTok likes online within a few minutes. Search for TikyTop on the search engine and click on the link. Select the buy TikTok likes service. Once the service is chosen, type or paste your TikTok username, then hit Enter. Again, choose the service and click the Enter button. Select the post for which you need likes, next you can easily customize the package based on your needs. Once the order is placed, you receive TikTok likes within a few minutes.",
    },
    {
      q: "How to get more TikTok likes?",
      a: "Every creator and marketer who uses TikTok will be thinking about how to get more TikTok likes. This is one of the most common questions creators ask. The key to gaining engagement is posting consistently and following trending topics. Choosing a trusted likes provider from TikyTop can help your content gain more visibility and support your growth. You'll find a wide range of packages, and you can choose how many TikTok likes you want.",
    },
    {
      q: "Why do TikTok likes matter?",
      a: "TikTok likes matter more because they show how engaged viewers are with your content and how much they value it. This is why many creators buy likes on TikTok to give their videos an initial push. You can buy 50 TikTok likes or 5000 TikTok likes, but all likes are from real accounts, and they remain for the long term. Once you have ordered from us, the TikTok likes will be delivered within a few minutes. Over time, your content will stand out from others.",
    },
    {
      q: "Will my competitors know I have bought likes from TikyTop?",
      a: "No, not at all! Your competitors will never know that you have bought TikTok likes from us. Your order will remain hidden; no information is shared. Anyway, when you buy TikTok likes from us, they are from real accounts, so there is no chance of finding out whether the likes are fake or real. Yes, you can grow your account with confidence.",
    },
    {
      q: "What are the benefits of buying TikTok likes?",
      a: "When you buy real TikTok likes from us, you will receive high-retention likes. Here is what you can expect from us:\n\n• Trusted TikTok growth service.\n• Place your order without sharing your password.\n• Authentic TikTok likes.\n• Boost TikTok visibility and improve engagement.\n• Safe and secure service with no interruptions.",
    },
    {
      q: "Is it worth to buy tiktok likes in 2026?",
      a: "Why not? There is heavy competition, and it might be difficult for new creators. Low-quality likes might disappear within a short period, which is why we deliver quality likes to our customers. So, it is effective to buy TikTok likes from a trusted service provider like us to boost your TikTok profile. Engagement will still be a major part in 2026.",
    },
    {
      q: "What makes our service best among all?",
      a: "We always focus on our customers' satisfaction. We never ask for passwords, and customers do not need to share any personal information. From choosing TikTok likes to the payment process, everything is made simple and easier. If customers have any difficulties, they can reach our team for help. Also, many top creators, marketers, and business people buy TikTok likes from us. This is what makes us the best among all.",
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

    // Default username search flow
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
          selectedServiceKey: "likes",
          entryPath: "/buy-tiktok-likes",
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
    <div className=" text-white font-sans antialiased overflow-x-hidden">
      {/* ── REDESIGNED HERO SECTION ── */}
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

        {/* Animated Background blobs (Floating TikTok elements & particles) */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[110px] animate-pulse pointer-events-none" />
        <div className="absolute top-1/3 -right-48 w-96 h-96 bg-pink-500/10 rounded-full blur-[110px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

        <div className="max-w-7xl mx-auto w-full relative z-30 flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center text-center lg:text-left">

          {/* Left Column: Redesigned Copy & Input (Grid 7/12) */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8 flex flex-col items-center lg:items-start w-full">

            {/* Trust Badge & Premium Growth Pills */}
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
              Buy TikTok Likes <br />
              <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-rose-500 bg-clip-text text-transparent block sm:inline">
                with Instant Delivery
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-[340px] sm:max-w-xl mx-auto lg:mx-0">
              TikyTop helps you buy TikTok likes instantly and gain more real engagement. Our reliable
              growth service will make you stand out with ease
            </p>

            {/* Feature Row Badge Badges */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-[340px] sm:max-w-xl pt-2">
              <span className="flex items-center justify-center sm:justify-start gap-1.5 text-sm sm:text-base text-gray-300 bg-white/5 px-3 py-2 rounded-full border border-white/5 whitespace-nowrap">
                ❤️ Premium TikTok Likes
              </span>
              <span className="flex items-center justify-center sm:justify-start gap-1.5 text-sm sm:text-base text-gray-300 bg-white/5 px-3 py-2 rounded-full border border-white/5 whitespace-nowrap">
                📈 Real Engagement Rate
              </span>
              <span className="flex items-center justify-center sm:justify-start gap-1.5 text-sm sm:text-base text-gray-300 bg-white/5 px-3 py-2 rounded-full border border-white/5 whitespace-nowrap col-span-2 sm:col-span-1">
                👥 Active TikTok Users
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
                      Selected Package: <strong className="text-pink-400">{selectedPackage.quantity.toLocaleString()} Likes</strong> (${Number(selectedPackage.price).toFixed(2)})
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
                  {/* Active Platform Card style: TikTok Icon */}
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
                        ? `Enter TikTok username for ${selectedPackage.quantity.toLocaleString()} Likes`
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
                      "Get TikTok Likes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Premium TikTok Smartphone Illustration Visual (Grid 5/12) */}
          <div className="lg:col-span-5 relative flex justify-center items-center w-full max-w-[320px] lg:max-w-none mx-auto mt-6 lg:mt-0">
            {/* Visual Glassmorphic Card Frame with pink/purple glowing effects */}
            <div className="w-[80%] lg:w-[50%] h-[60px] lg:h-auto lg:aspect-square relative">

              {/* Internal Floating Decorative items */}
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

      {/* ── HOW IT WORKS SECTION ── */}
      <section className="pt-14 sm:pt-16 pb-20 px-6 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-7xl mx-auto">

          {/* Real-time Loop Delivery Counter */}
          <div className="flex justify-center mb-8 sm:mb-10">
            <LiveDeliveryCounter service="likes" platform="TikTok" />
          </div>

          {/* Heading */}
          <div className="max-w-3xl mx-auto text-center">

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              How to Buy TikTok Likes
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-500">
              You can easily buy real TikTok likes with a fast and secure ordering process. Just place your order, complete the payment, and receive high-quality TikTok likes instantly.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-20 grid gap-10 lg:grid-cols-3">

            {/* ================= CARD 1 ================= */}
            <div className="group relative flex flex-col overflow-hidden rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(6,182,212,0.18)]">

              {/* Number */}
              <div className="absolute right-6 top-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-lg font-bold text-white shadow-xl">
                01
              </div>

              {/* Image */}
              <div className="relative h-[380px] overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-cyan-100">

                {/* Background Glow */}
                <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-400/30 blur-[120px] transition duration-700 group-hover:scale-125" />

                <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-blue-400/20 blur-[120px] transition duration-700 group-hover:scale-125" />

                {/* Mesh Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_60%)]" />

                <img
                  src={Username}
                  alt="Username"
                  className="relative z-10 h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:-rotate-2"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />

                {/* Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5" />

                {/* Shine */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="absolute -left-40 top-0 h-full w-24 rotate-12 bg-white/40 blur-xl transition-all duration-1000 group-hover:left-[130%]" />
                </div>
              </div>

              {/* Content */}
              <div className="relative bg-gradient-to-b from-white to-slate-50 p-8 pb-12 flex-grow">

                <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-600">
                  Step 01
                </span>

                <h3 className="mt-5 text-2xl font-bold text-slate-900">
                  Enter your Username
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  Type or paste your TikTok username and ensure your account is public
                  before placing the order.
                </p>

              </div>
            </div>

            {/* ================= CARD 2 ================= */}
            <div className="group relative flex flex-col overflow-hidden rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(236,72,153,0.18)]">

              <div className="absolute right-6 top-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-pink-500 text-lg font-bold text-white shadow-xl">
                02
              </div>

              <div className="relative h-[380px] overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-100">

                <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-pink-400/30 blur-[120px]" />

                <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-rose-400/20 blur-[120px]" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(244,63,94,0.18),transparent_60%)]" />

                <img
                  src={Post}
                  alt=""
                  className="relative z-10 h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />

                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5" />

                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="absolute -left-40 top-0 h-full w-24 rotate-12 bg-white/40 blur-xl transition-all duration-1000 group-hover:left-[130%]" />
                </div>

              </div>

              <div className="relative bg-gradient-to-b from-white to-slate-50 p-8 pb-12 flex-grow">

                <span className="inline-flex rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-pink-600">
                  Step 02
                </span>

                <h3 className="mt-5 text-2xl font-bold text-slate-900">
                  Select the Post
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  Choose the TikTok post you want to improve your engagement for
                </p>

              </div>
            </div>

            {/* ================= CARD 3 ================= */}
            <div className="group relative flex flex-col overflow-hidden rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(139,92,246,0.18)]">

              <div className="absolute right-6 top-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-violet-500 text-lg font-bold text-white shadow-xl">
                03
              </div>

              <div className="relative h-[380px] overflow-hidden bg-gradient-to-br from-violet-50 via-white to-violet-100">

                <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-violet-400/30 blur-[120px]" />

                <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-indigo-400/20 blur-[120px]" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.18),transparent_60%)]" />

                <img
                  src={Likes}
                  alt=""
                  className="relative z-10 h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:-rotate-2"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />

                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5" />

                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="absolute -left-40 top-0 h-full w-24 rotate-12 bg-white/40 blur-xl transition-all duration-1000 group-hover:left-[130%]" />
                </div>

              </div>

              <div className="relative bg-gradient-to-b from-white to-slate-50 p-8 pb-12 flex-grow">

                <span className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-600">
                  Step 03
                </span>

                <h3 className="mt-5 text-2xl font-bold text-slate-900">
                  Get Instant Likes
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  Once you select the number of likes, double-check and complete the payment to get TikTok likes instantly.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── QUICK PACKAGE SELECTOR (FETCHED FROM DB) ── */}
      <QuickPackageSelector
        platform="tiktok"
        serviceKey="likes"
        serviceTitle="Likes"
        selectedPackage={selectedPackage}
        onSelectPackage={setSelectedPackage}
        scrollTargetId="tiktok-search-box"
      />

      {/* ── MIDDLE CTA SECTION ── */}
      <section className="py-16 md:py-24 px-4 bg-slate-50 relative overflow-hidden flex justify-center items-center">
        {/* Decorative background glow circles */}
        <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-[#ebfaff] rounded-full blur-[100px] opacity-[0.4] pointer-events-none" />
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-[#fff6fa] rounded-full blur-[100px] opacity-[0.4] pointer-events-none" />

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
            {/* Title */}
            <h2 className="text-[26px] sm:text-3xl md:text-[38px] font-extrabold text-[#111827] leading-[1.2] text-center tracking-tight mb-5">
              Try our Service Now!
            </h2>

            {/* Description */}
            <p className="text-[14px] md:text-[16px] font-normal text-[#4B5563] leading-[1.6] max-w-[620px] text-center mb-7">
              Need to stand out from the crowd? Then buy TikTok likes now and enhance your profile.
            </p>

            {/* Premium Button */}
            <button
              onClick={handleCTAClick}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full text-white font-bold text-sm sm:text-[15px] bg-[#ff1788] hover:bg-[#ff2e9c] hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,23,136,0.3)] transition-all duration-300 select-none cursor-pointer"
            >
              Buy Likes
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS SECTION ── */}
      <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc] text-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Benefits of Buying TikTok Likes
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Want to grow faster on TikTok? Then here is the simple solution: TikTok likes buy service from TikyTop helps boost audience engagement and improve the chance of going viral.
          </p>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Benefit 1 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-sky-500 flex items-center justify-center text-white mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Greater Visibility</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                TikTok will reward you when your videos gain more engagement. The more interaction you get, the more you will reach your audience. Many creators choose to buy TikTok likes online to strengthen their video’s engagement. As a result, your content visibility will be improved, and you will have the opportunity to reach the TikTok For You Page.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white mb-4">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Organic Growth</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Your content deserves to be seen. With more engagement, people are more likely to watch it and share it with others. We are here to help you, and with our TikTok growth service, you can increase your content visibility, attract new viewers, and support long-term growth. Now your growth is made simpler and easier!
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center text-white mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">More Credible</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Trust begins with credibility. Usually, a credible TikTok profile can build a lasting connection, isn't it? Yes, a lasting connection matters more than random viewers. You can buy TikTok likes from TikyTop, and we help your TikTok account appear more credible and encourage new viewers to see your content.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Saves Time</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Growing on TikTok needs consistency, and sometimes it might take time. It is easier to buy TikTok likes, and we will help speed up engagement. From now on, you can focus on creating quality content and what matters most. You can spend less time on engagement; we will handle the rest.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white mb-4">
                <ThumbsUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">High Engagement</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                The most important thing is that your content should not look inactive, and users should not skip your video. Each and every TikTok like matters more. That is where TikyTop comes in. We provide premium TikTok likes that receive strong engagement and visibility. As your engagement grows, connect with your audience globally.
              </p>
            </div>

            {/* Benefit 6 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white mb-4">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">100% Real Likes</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Having more TikTok likes for the video can add to your social proof. People are more likely to watch videos that have more views, likes, and shares. To make it simple, you can buy genuine TikTok likes from us and boost your credibility. As you get real likes, they never disappear for any reason.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US / EVERYTHING YOU NEED TO KNOW ── */}
      <section className="py-24 px-6 bg-slate-50 text-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            Everything You Need To Know About Buying TikTok Likes
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            We ensure that all TikTok likes are from real users. Increase TikTok video reach without compromising the quality.
          </p>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Password */}
            <div className="bg-white border border-slate-150 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition duration-300 relative group">
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-pink-500/20 transition-all duration-300 pointer-events-none" />
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-pink-100 text-pink-500 mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">No Password Required</h3>
              <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed">
                We always prioritize your privacy first. Yes, we never ask for your passwords. You can experience a smooth process from beginning to end. Only your username is required, along with other required details for payment. With our secure TikTok growth service, you can get instant TikTok likes.
              </p>
            </div>

            {/* Support */}
            <div className="bg-white border border-slate-150 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition duration-300 relative group">
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-pink-500/20 transition-all duration-300 pointer-events-none" />
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 mb-4">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Best Customer Support</h3>
              <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed">
                Do you need help with a TikTok likes buy order? No worries, you are not alone; our dedicated support team is always there to support you. The queries might be about service, how to place an order, or delivery. From placing an order to tracking delivery, our team will support you at any time.
              </p>
            </div>

            {/* Ordering */}
            <div className="bg-white border border-slate-150 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition duration-300 relative group">
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-pink-500/20 transition-all duration-300 pointer-events-none" />
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-purple-100 text-purple-600 mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Easy Ordering Process</h3>
              <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed">
                TikyTop is easy because you can buy high-retention likes in 3 steps. All you have to do is enter your TikTok username, select a service and package based on your needs and goals, and then choose a video to improve discoverability. Once the video is selected, pay and get likes instantly.
              </p>
            </div>

            {/* Premium */}
            <div className="bg-white border border-slate-150 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition duration-300 relative group">
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-pink-500/20 transition-all duration-300 pointer-events-none" />
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-orange-100 text-orange-600 mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Premium TikTok Likes</h3>
              <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed">
                Our premium service is for all users who are looking to strengthen their profile. We never put your account at risk. You can enjoy a simple ordering process, no fake likes, and customized likes packages. This is why many of the top creators and marketers buy likes for their TikTok account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-20 px-6 relative overflow-hidden bg-white text-gray-900">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-[#00f2fe]/20 to-[#4facfe]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-br from-[#ff0844]/20 to-[#ffb199]/10 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-slate-900/5 backdrop-blur-xl rounded-[2.5rem] border border-slate-200/50 p-12 md:p-16 shadow-xl text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-955 mb-6 leading-tight">
              Want to Boost Your TikTok Profile?
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
              We have premium-quality TikTok likes that deliver to your selected video instantly!
            </p>
            <button
              onClick={handleCTAClick}
              className="px-10 py-4.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105"
            >
              Get TikTok Likes
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION (ACCORDION) ── */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-100 text-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
              Frequently Asked Questions on Buy TikTok Likes
            </h2>
            <p className="mt-4 text-gray-500 text-sm sm:text-base">
              Have Questions About Buying TikTok Likes? We've got you covered! Here are the most commonly asked questions on how to buy likes on TikTok, packages, security, and more.
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

      {/* ── FINAL CTA SECTION ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#3b0622] via-[#210438] to-[#0a0212] text-white text-center relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-pink-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px]" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Grow Your Profile With Us!
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            We offer the best TikTok likes in the market. If you want to boost your profile, buy TikTok likes and views from us!
          </p>
          <div className="pt-4">
            <button
              onClick={handleCTAClick}
              className="px-12 py-5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white rounded-full font-extrabold text-lg hover:shadow-[0_0_35px_rgba(236,72,153,0.4)] hover:scale-105 transition-all duration-300 border border-pink-400/30"
            >
              Click Here
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ── */}
      <section className="py-24 px-6 bg-white overflow-hidden relative text-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Hear From Our Real Customers
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-16 text-sm sm:text-base">
            We are proud to have so many TikyTop customers coming back again and again to buy TikTok likes and increase their profile reach.
          </p>
        </div>

        {/* Carousel container */}
        <div className="w-full overflow-hidden pause-hover relative">
          {/* Subtle fade overlay on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee gap-6 flex">
            {duplicatedTestimonials.map((t, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[300px] sm:w-[350px] bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Star rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => {
                      const ratingValue = i + 1;
                      if (ratingValue <= Math.floor(t.rating)) {
                        return <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />;
                      } else if (ratingValue - 0.5 === t.rating) {
                        return (
                          <div key={i} className="relative w-4 h-4 text-gray-200">
                            {/* Gray Background Star */}
                            <Star className="w-4 h-4 fill-current text-gray-200" />
                            {/* Yellow Half-filled overlay Star */}
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
                  {/* Comment text */}
                  <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed italic mb-6">
                    "{t.text}"
                  </p>
                </div>

                {/* Customer Avatar & Name */}
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
