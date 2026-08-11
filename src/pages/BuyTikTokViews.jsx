import React, { useState, useEffect } from "react";
import API_URL from "../config/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Star,
  Shield,
  Eye,
  Clock,
  ThumbsUp,
  Tag,
  Headphones,
  Zap,
  TrendingUp,
  UserCheck,
  Lock,
} from "lucide-react";
import { FaTiktok, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";
import Tiky from "../assets/images/Tiktoklike.png";

import Username from "../assets/images/username.png";
import Post from "../assets/images/viewscard2.png";
import Likes from "../assets/images/viewscard.png";

export default function BuyTikTokViews() {
  useScrollToTop();
  const navigate = useNavigate();

  // Search Flow States matching main Hero.jsx
  const [username, setUsername] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  // Testimonials Auto-scroll Carousel Ref
  const scrollContainerRef = React.useRef(null);

  const testimonials = [
    {
      name: "Niya",
      text: "Hi guys, I'm Ken, a TikTok content creator. I was searching for the best site to buy TikTok views. Then I found this gem. This is really awesome and the best of the best.",
      rating: 4.5,
    },
    {
      name: "Ken",
      text: "I purchased 100 TikTok views from TikyTop, and the results are instant. Thank you, team!",
      rating: 4,
    },
    {
      name: "Thames",
      text: "Hello guys, I'm a travel vlogger. Usually, I used to create videos and post them. The videos are about new hidden spots and travel-based. Initially, the videos that I posted never gained visibility. But now it is totally the opposite; thank you, TikyTop, for supporting me.",
      rating: 4.5,
    },
    {
      name: "Elyssa A",
      text: "I was looking for reliable service, and then I found this. The support is friendly, and this is what I need. Guys, you can buy TikTok views here and see the results. You will be surprised as I was.",
      rating: 4,
    },
    {
      name: "Meg",
      text: "Excellent service, guys. If you want to buy likes and views TikTok, then I strongly recommend this service. And one more thing: it's transparent, which makes it easier and more trustworthy.",
      rating: 4.5,
    },
    {
      name: "Maxine K Black",
      text: "As they said, your next video will be a momentum for you. And it happened. I used TikTok views buy from TikyTop, and I'm ordering TikTok views again for my next video. Before this, my video was not watched by many, but as I dreamt, many started to watch.",
      rating: 4,
    },
    {
      name: "Bishop D’Souza",
      text: "I would proudly say that I have made the best decision. I was always thinking that my growth should speak louder and my video should grab attention. And finally, I made it happen with this service.",
      rating: 4.5,
    },
    {
      name: "Tazman",
      text: "User interaction, appeared on the For You Page, organic traffic, and video exposure all at one place. Interesting, isn't it? I was planning to buy TikTok views from a trusted source, and this is all I found in TikyTop. Thank you for making me the best.",
      rating: 4,
    },
    {
      name: "Aalia",
      text: "I just wanted to tell you how much I loved this platform. I don't even know how much time I have purchased. All those results are consistent, and it has boosted TikTok video performance.",
      rating: 4.5,
    },
    {
      name: "Marlee",
      text: "Outstanding service with strong encryption. Need to increase TikTok view visibility? This platform works well for you. And I would tell you this is definitely worth trying. Believe me, guys, I have become a regular customer now.",
      rating: 4.5,
    },
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  // Set page titles and meta description
  useEffect(() => {
    // 1. Title
    const originalTitle = document.title;
    document.title = "Buy TikTok Views | Organic Reach | 100% Real | TikyTop";

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
    const metaDesc = setMetaTag('name', 'description', 'Need to buy TikTok views from a trusted platform? Then TikyTop will be your ultimate supporter. Buy TikTok views from TikyTop and increase your TikTok video views. Try us now for better video engagement and grab more audience attention.');
    const metaKeywords = setMetaTag('name', 'keywords', 'buy tiktok views, how to buy tiktok views, how to get more tiktok views, buy tiktok views and likes, buy views on tiktok, tiktok views buy, buy real tiktok views, buy cheap tiktok views, how to buy views on tiktok, best place to buy tiktok views, instant tiktok views, real tiktok engagement, tiktok growth, tiktok promotion, viral tiktok, tiktok marketing');
    const metaRobots = setMetaTag('name', 'robots', 'index, follow');

    // OpenGraph Tags
    const ogType = setMetaTag('property', 'og:type', 'website');
    const ogTitle = setMetaTag('property', 'og:title', 'Buy TikTok Views | Organic Reach | 100% Real | TikyTop');
    const ogDesc = setMetaTag('property', 'og:description', 'Boost your TikTok profile with real TikTok Views. Secure checkout, instant delivery, and premium support from TikyTop.');
    const ogUrl = setMetaTag('property', 'og:url', 'https://tikytop.com/tiktok/buy-views');
    const ogImage = setMetaTag('property', 'og:image', 'https://tikytop.com/images/tiktok-views-banner.jpg');
    const ogSite = setMetaTag('property', 'og:site_name', 'TikyTop');

    // Twitter Tags
    const twitterCard = setMetaTag('name', 'twitter:card', 'summary_large_image');
    const twitterTitle = setMetaTag('name', 'twitter:title', 'Buy TikTok Views | Organic Reach | 100% Real | TikyTop');
    const twitterDesc = setMetaTag('name', 'twitter:description', 'Boost your TikTok profile with real TikTok Views. Secure checkout, instant delivery, and premium support from TikyTop.');
    const twitterImage = setMetaTag('name', 'twitter:image', 'https://tikytop.com/images/tiktok-views-banner.jpg');

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://tikytop.com/tiktok/buy-views');

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
      q: "How to buy views on TikTok?",
      a: "Buying TikTok views from us makes your experience simpler. You can see the TikTok button at the top; click and select to buy TikTok views. Next, enter your username; choose which post you want more views. Next, customize the package; for example, if you need 100 views or 500 views, the count doesn't matter. Go ahead and finalize the total count and complete payment. Once the order is placed, instant views will be delivered for the post. Look how simple the process is—no more difficulties in placing an order.",
    },
    {
      q: "Is there any best time to buy TikTok views?",
      a: "It doesn't mean that there is a best time to purchase. It is all about requirements. But it is better to get views earlier because TikTok will be favoring content that has more visibility. Unfortunately, if your video has low visibility, then this could be a disadvantage. That is why we are here to support you. Once the video is uploaded, it is better to purchase TikTok video views from us so that the video can get more responses from the audience.",
    },
    {
      q: "Do TikTok views make a change in TikTok?",
      a: "Yes definitely. When you place an order, the views will be delivered automatically to your selected post. And the views are from an organic account, so they will not disappear; they remain for the long term. As they remain, your videos will improve visibility, users will start searching for your other videos, you'll get a chance to collaborate, and more.",
    },
    {
      q: "Can you buy views on TikTok?",
      a: "Of course you can purchase from a trusted platform like TikyTop. You get views from authentic accounts, so without any second thought, you can place an order. We offer fast TikTok views delivery with flexible packages. Our packages will be suitable for all types of users, creators, businesses, or brands. With no restrictions and no complicated steps, get secure TikTok growth.",
    },
    {
      q: "Can I buy TikTok views for my private TikTok account?",
      a: "Our service applies only to public TikTok accounts, and you will not be able to get views for private TikTok accounts. If you want affordable TikTok views, then set your account to public. Unless the video or account is public, you will not be able to place the order. So before placing an order, make sure your account is public.",
    },
    {
      q: "Is there any option to customize the package?",
      a: "Why not? We have flexible packages. The quantity of views can be anything; just customize one that fits your needs. For example, if you want to buy TikTok views and likes, choose the service and then customize. Everything is made easier for our customers. So there is no need to hold off on your work; get what you actually prefer.",
    },
  ];

  const handleSearchSubmit = async () => {
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
          selectedServiceKey: "views",
          entryPath: "/tiktok/buy-views"
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
      <section id="hero" className="relative w-full min-h-screen bg-[#1a0b2e] flex flex-col items-center justify-center pt-28 pb-20 px-5 md:px-6 overflow-hidden">
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
                <span>⭐ Rated 4.9 by 50,000+ TikTok Creators</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider">
                <FaTiktok className="w-3.5 h-3.5" /> Premium TikTok Growth
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-[34px] sm:text-5xl lg:text-6xl font-bold leading-tight font-righteous tracking-tight">
              Buy TikTok Views Online <br />
              <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-rose-500 bg-clip-text text-transparent block sm:inline">
                Safe and Secure
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-[340px] sm:max-w-xl mx-auto lg:mx-0">
              Your TikTok videos deserve some spotlight.
              Yes, at TikyTop, you can buy TikTok views with secure payment
              and customize packages based on your needs.
            </p>

            {/* Feature Row Badge Badges */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-[340px] sm:max-w-xl pt-2">
              <span className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-gray-300 bg-white/5 px-3 py-2 rounded-full border border-white/5 whitespace-nowrap">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                Secure Service
              </span>
              <span className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-gray-300 bg-white/5 px-3 py-2 rounded-full border border-white/5 whitespace-nowrap">
                <Tag className="w-3.5 h-3.5 text-pink-400" />
                Affordable Price
              </span>
              <span className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-gray-300 bg-white/5 px-3 py-2 rounded-full border border-white/5 whitespace-nowrap col-span-2 sm:col-span-1">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                Quality Views
              </span>
            </div>

            {/* Search Bar / Input flow */}
            <div id="tiktok-search-box" className="pt-2 w-full max-w-xl">
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
                  placeholder="Enter your TikTok Username"
                  className="flex-grow h-full px-3.5 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-[15px] sm:text-[16px] font-medium text-gray-800 placeholder-gray-400 min-w-0"
                />

                {/* Search Button */}
                <button
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
                    "Get TikTok Views"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Premium TikTok Smartphone Illustration Visual (Grid 5/12) */}
          <div className="lg:col-span-5 relative flex justify-center items-center w-full max-w-[320px] lg:max-w-none mx-auto mt-6 lg:mt-0">
            {/* Visual Glassmorphic Card Frame with pink/purple glowing effects */}
            <div className="w-[80%] lg:w-[50%] aspect-square relative">

              {/* Internal Floating Decorative items */}
              <div className="absolute -top-6 -right-6 w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-tr from-cyan-400 to-pink-500 rounded-2xl flex items-center justify-center text-white text-xl lg:text-2xl shadow-lg shadow-pink-500/30 animate-bounce">
                <FaTiktok />
              </div>
              <div className="absolute -bottom-8 -left-6 w-14 h-14 lg:w-16 lg:h-16 bg-pink-500/20 backdrop-blur rounded-full border border-pink-500/40 flex items-center justify-center text-white text-xl lg:text-2xl shadow-lg shadow-pink-500/30">
                ❤️
              </div>
            </div>
          </div>

        </div>

        {/* TikTok related statistics */}
        <div className="max-w-7xl mx-auto w-full mt-20 relative z-30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/5 backdrop-blur rounded-[2rem] p-6 border border-white/10">
            <div className="text-center p-4">
              <h3 className="text-3xl font-extrabold text-cyan-400">100K+</h3>
              <p className="text-xs text-gray-300 mt-1 uppercase tracking-wider">Orders Completed</p>
            </div>
            <div className="text-center p-4">
              <h3 className="text-3xl font-extrabold text-pink-500">50K+</h3>
              <p className="text-xs text-gray-300 mt-1 uppercase tracking-wider">Happy TikTok Creators</p>
            </div>
            <div className="text-center p-4">
              <h3 className="text-3xl font-extrabold text-cyan-400">99.9%</h3>
              <p className="text-xs text-gray-300 mt-1 uppercase tracking-wider">Success Rate</p>
            </div>
            <div className="text-center p-4">
              <h3 className="text-3xl font-extrabold text-pink-500">24/7</h3>
              <p className="text-xs text-gray-300 mt-1 uppercase tracking-wider">Customer Support</p>
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
      <section className="py-24 px-6 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="max-w-3xl mx-auto text-center">

            <h2 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              How to Buy TikTok Views?
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-500">
              Ordering is made easier as 1,2,3! No complicated steps,
              just easier than you think. Experience real growth, extend your growth globally.
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
                  Enter your TikTok profile name in the given
                  box and click the Get TikTok Views button.
                </p>

              </div>
            </div>

            {/* ================= CARD 2 ================= */}
            <div className="group relative flex flex-col overflow-hidden rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(236,72,153,0.18)]">

              <div className="absolute right-6 top-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-pink-500 text-lg font-bold text-white shadow-xl">
                02
              </div>

              <div className="relative h-[405px] overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-100">

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

              <div className="relative bg-gradient-to-b from-white to-slate-50 p-8 pb-12 flex-grow -mt-6 z-20">

                <span className="inline-flex rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-pink-600">
                  Step 02
                </span>

                <h3 className="mt-5 text-2xl font-bold text-slate-900">
                  Select the Post
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  You can choose one or more posts to instantly get views.
                </p>

              </div>
            </div>

            {/* ================= CARD 3 ================= */}
            <div className="group relative flex flex-col overflow-hidden rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(139,92,246,0.18)]">

              <div className="absolute right-6 top-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-violet-500 text-lg font-bold text-white shadow-xl">
                03
              </div>

              <div className="relative h-[405px] overflow-hidden bg-gradient-to-br from-violet-50 via-white to-violet-100">

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

              <div className="relative bg-gradient-to-b from-white to-slate-50 p-8 pb-12 flex-grow -mt-6 z-20">

                <span className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-600">
                  Step 03
                </span>

                <h3 className="mt-5 text-2xl font-bold text-slate-900">
                  Payment Process
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  Finally, select the number of views and recheck before proceeding with payment.
                  Once the order is placed, you will get it within a few moments.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>
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
              Want to Boost your TikTok Video Views
            </h2>

            {/* Description */}
            <p className="text-[14px] md:text-[16px] font-normal text-[#4B5563] leading-[1.6] max-w-[620px] text-center mb-7">
              No more waiting for the right moment. Reach out to us, and we will make it happen.
              Get reach like never before.
            </p>

            {/* Premium Button */}
            <button
              onClick={handleCTAClick}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full text-white font-bold text-sm sm:text-[15px] bg-[#ff1788] hover:bg-[#ff2e9c] hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,23,136,0.3)] transition-all duration-300 select-none cursor-pointer"
            >
              Buy Views
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS SECTION ── */}
      <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc] text-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Why Buy TikTok Views From TikyTop?
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            We always provide authenticity over fake promises. You can start growing your TikTok account without any interruptions. You get clean, quick results and a seamless experience.
          </p>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Benefit 1 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-sky-500 flex items-center justify-center text-white mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Increased Profile Traffic</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Make your content visible to your non-followers as well. Gaining more views as a creator is one of the main goals, and we help you out with that, which truly makes a change. You can buy TikTok views safely by using our service and improve your audience engagement. As more people discover your profile, the more you will reach globally.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white mb-4">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Get Premium Views</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Now getting high-quality views is easier. With TikyTop, you can experience reliable service, and there is no need to worry about engagement. You can choose one or more videos; the quality will remain the same. Once the order is placed, you will get them in a few moments. With premium views, your content will be visible more than usual.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center text-white mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Strong Video Presence</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Can you buy views on TikTok to strengthen your video? Of course you can do it. We help you reach a new audience and improve your video performance. The video can be about a brand, a promotional video, or an entertaining video; we help you out. Whenever you need a video boost, we will support you.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Gain More Exposure</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Being a creator or an influencer is not so easy today. The reason is that millions of users use TikTok. Thousands of videos are posted in one day. To overcome all those challenges, you need to build a strategy and maintain consistency. We are here to support you. Yes, buy real TikTok views from us and increase your chances of your video appearing on FYP.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white mb-4">
                <ThumbsUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Affordable Views Cost</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                You might think social media services are expensive and that you need to spend more on them. But the fact is, we don't do that. At TikyTop, you can customize packages, making it simple to choose one that fits your goals. No additional payment and no hidden fees; visit our site and you'll see.
              </p>
            </div>

            {/* Benefit 6 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white mb-4">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Friendly User Access</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Whether you're a budding or experienced creator looking to increase TikTok views, TikyTop is the best place to use it. No additional information is required; enter your username, choose the post, select the quantity and package, and complete the payment. Get your TikTok views instantly—smooth, convenient access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US / EVERYTHING YOU NEED TO KNOW ── */}
      <section className="py-24 px-6 bg-slate-50 text-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            Why Do Creators Buy TikTok Views From Us?
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            We always offer the best and help your content stand out from the competition. With our premium TikTok views service, you can reach new heights.
          </p>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Password */}
            <div className="bg-white border border-slate-150 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition duration-300 relative group">
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-pink-500/20 transition-all duration-300 pointer-events-none" />
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-pink-100 text-pink-500 mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Multiple Payment Options</h3>
              <p className="text-gray-500 text-xs md:text-[13px] leading-relaxed">
                When you buy TikTok views, the payment options should be easy. This is why we offer multiple options, so you can choose the one that works for you. Whether the package is small or large, a wide range of payment options is available. You can easily complete the payment in a few steps with our strong encryption.              </p>
            </div>

            {/* Support */}
            <div className="bg-white border border-slate-150 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition duration-300 relative group">
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-pink-500/20 transition-all duration-300 pointer-events-none" />
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 mb-4">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Easily Customize Packages</h3>
              <p className="text-gray-500 text-xs md:text-[13px] leading-relaxed">
                Each creator and business has a different set of goals. This is why we provide a wide range of options where you can buy TikTok likes and views instantly. Just enter your username, select the post, the number of views you need, and finally make a payment. Now make your growth incredible and achieve more than ever before              </p>
            </div>

            {/* Ordering */}
            <div className="bg-white border border-slate-150 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition duration-300 relative group">
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-pink-500/20 transition-all duration-300 pointer-events-none" />
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-purple-100 text-purple-600 mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">100% Trusted Performance</h3>
              <p className="text-gray-500 text-xs md:text-[13px] leading-relaxed">
                We never make fake promises under any circumstances. You can get TikTok views instantly, and there is no compromise in quality. Thousands of creators have gained organic reach, and they come back to us again. This is not only about their success; it's about the commitment, quality, and reliability that we provide.              </p>
            </div>

            {/* Premium */}
            <div className="bg-white border border-slate-150 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition duration-300 relative group">
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-pink-500/20 transition-all duration-300 pointer-events-none" />
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-orange-100 text-orange-600 mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">High Security Access</h3>
              <p className="text-gray-500 text-xs md:text-[13px] leading-relaxed">
                While using our service, your payment, right from choosing your order to making payment, is done securely. We also use strong encryption so your details are kept safe from being shared or stolen. You can buy TikTok views with confidence. We prioritize your safety, so there is no need to worry about security.              </p>
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
              Looking To Buy Views Without a Password?
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
              You can purchase real TikTok views without sharing any of your details. Just your username is enough, and no more details are required.             </p>
            <button
              onClick={handleCTAClick}
              className="px-10 py-4.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105"
            >
              Grow Account Now
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION (ACCORDION) ── */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-100 text-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
              Frequently Asked Questions on TikTok Views
            </h2>
            <p className="mt-4 text-gray-500 text-sm sm:text-base">
              No more confusion. We answer all your questions so you can learn more about our service. Explore your queries and get views instantly.            </p>
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
            Order TikTok Views
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            With proper support and simple ordering, you can get results within a few moments. Your account growth starts here.           </p>
          <div className="pt-4">
            <button
              onClick={handleCTAClick}
              className="px-12 py-5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white rounded-full font-extrabold text-lg hover:shadow-[0_0_35px_rgba(236,72,153,0.4)] hover:scale-105 transition-all duration-300 border border-pink-400/30"
            >
              Purchase Now
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ── */}
      <section className="py-24 px-6 bg-white overflow-hidden relative text-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            TikTok Views: Hear From Our Real Customers
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-16 text-sm sm:text-base">
            Our customer satisfaction is our top priority. See what our customers say about our service and how satisfied they are.          </p>
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
