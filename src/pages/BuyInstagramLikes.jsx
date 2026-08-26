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
  Heart,
  Award,
  Sparkles,
  ArrowRight,
  Shield,
} from "lucide-react";
import { FaInstagram, FaStar, FaFire } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";
import QuickPackageSelector from "../components/QuickPackageSelector";
import Tiky from "../assets/images/Instagramlikesbg.png";
import Username from "../assets/images/username.png";
import Post from "../assets/images/Likeimage.png";
import InstagramLikesVideo from "../assets/images/Instagramlikesvidieo.mp4";
import Likes from "../assets/images/likes.png";
import ViewCard from "../assets/images/viewscard.png";
import InstaLikesImage from "../assets/images/Instagramzigzaglike.jpg";
import InstaLikesImage1 from "../assets/images/Instagramlikezigzag1.png";

export default function BuyInstagramLikes() {
  useScrollToTop();
  const navigate = useNavigate();

  // Search Flow States
  const [username, setUsername] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // SEO Metadata
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Buy Instagram Likes | Improve Visibility | Instant & Real";

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
      "You can buy Instagram likes from TikyTop and grow your engagement rate effortlessly. With no password, get likes delivered quickly to your Instagram profile."
    );
    setMetaTag(
      "name",
      "keywords",
      "buy instagram likes, buy real instagram likes, instant instagram likes, buy ig likes, cheap instagram likes, instagram post likes, instagram reel likes, tikytop instagram"
    );
    setMetaTag("name", "robots", "index, follow");

    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:title", "Buy Instagram Likes | Improve Visibility | Instant & Real");
    setMetaTag(
      "property",
      "og:description",
      "You can buy Instagram likes from TikyTop and grow your engagement rate effortlessly. With no password, get likes delivered quickly to your Instagram profile."
    );
    setMetaTag("property", "og:url", "https://tikytop.com/buy-instagram-likes");
    setMetaTag("property", "og:site_name", "TikyTop");

    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", "Buy Instagram Likes | Improve Visibility | Instant & Real");
    setMetaTag(
      "name",
      "twitter:description",
      "You can buy Instagram likes from TikyTop and grow your engagement rate effortlessly. With no password, get likes delivered quickly to your Instagram profile."
    );

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://tikytop.com/buy-instagram-likes");

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

  // Search Submit Handler (Preserves existing API integration)
  const handleSearchSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const input = username.trim();
    if (!input) return;

    const isProfileLink = input.includes("instagram.com") && !input.includes("/p/") && !input.includes("/reel/");
    const isPostLink = input.includes("instagram.com") && (input.includes("/p/") || input.includes("/reel/"));

    if (isProfileLink || isPostLink) {
      navigate("/direct-order-service", {
        state: {
          directOrder: true,
          orderLink: input,
          platform: "instagram",
          linkType: isProfileLink ? "profile" : "post",
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
          selectedServiceKey: "likes",
          entryPath: "/buy-instagram-likes",
          selectedPackage,
          quantity: selectedPackage ? selectedPackage.quantity : undefined,
        },
      });
    } catch (error) {
      console.error(error);
      alert("Profile fetch failed. Please copy and paste profile/post URL for direct order.");
    } finally {
      setIsSearching(false);
    }
  };

  const scrollToSearch = () => {
    document.getElementById("instagram-search-box")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // 7 FAQs from PDF
  const faqs = [
    {
      q: "Is it a risk to buy Instagram likes from TikyTop?",
      a: "No, when you buy Instagram likes from us, you will never be at risk. Many people get confused about which site is trustworthy for improving Instagram visibility. But TikyTop is something different and will make you satisfied. Yes, there are no additional charges, and no digital footprints are left. You will not be at risk, and the likes that you get are genuine and from authentic accounts.",
    },
    {
      q: "Can I purchase IG likes for multiple posts?",
      a: "Yes, you can buy Instagram likes for multiple posts. There are no restrictions on purchasing likes from a trusted service like us. So you don't need to worry about account suspension or being banned. Of course, we help improve your Instagram engagement, and under no circumstances will your account look like it is engaging in abnormal activities.",
    },
    {
      q: "How quickly IG likes will be delivered?",
      a: "It doesn't take any longer; you will receive likes instantly. Just enter your IG username, select the post you want to improve, choose the quantity, and finalize your payment. Once you're done, you can make your profile more engaging. Now your Instagram engagement rate will be trustworthy.",
    },
    {
      q: "Will it be effective when I buy Instagram post likes?",
      a: "Definitely, the likes that you get from us will be effective, and they never disappear for any reason. Plus, your Instagram visibility will improve, increasing your engagement rate, bringing in new followers, and building a positive impression.",
    },
    {
      q: "Is it really possible to buy likes for Instagram?",
      a: "Why not? You can easily buy Instagram likes. Make it an effortless experience with TikyTop. We offer a wide range of features, affordable packages, easy customization, and a user-friendly interface. If you want to buy likes on Instagram at a minimal cost, you can, and if you want to purchase in larger quantities, you can also customize your order.",
    },
    {
      q: "Which Instagram likes package can I buy?",
      a: "There are no guidelines to buy packages. It depends on your needs and preferences. You can choose and customize it. All package sizes are available. Whether you're a small creator or a big influencer, our services will help. And the package prices aren't too costly; with no confusion, you can buy likes instantly.",
    },
    {
      q: "How many times can I buy Instagram likes from TikyTop?",
      a: "There are no restrictions; you can make as many purchases as you like. With no limitations, you can enjoy purchasing various services. But before you choose, check twice that you have selected the right service.",
    },
  ];

  // 10 Testimonials from PDF
  const testimonials = [
    {
      name: "Damian",
      text: "OMG! This is outstanding. I opened my account 3 months ago; still, my profile hasn't improved. Then my friend recommended me to use this service, and now the results are vice versa.",
      rating: 5,
    },
    {
      name: "Wendy",
      text: "You can easily buy likes instagram; there are no complicated steps. You can easily go and enter your username, select a post, and specify the quantity. Finally, pay for the packages, and the likes will be delivered instantly. Guys, this is easy and user-friendly.",
      rating: 5,
    },
    {
      name: "Devon",
      text: "Awesome service, and I highly recommend this. They are real, and I never expected this could be effective.",
      rating: 5,
    },
    {
      name: "Amanda",
      text: "Finally, I decided to buy Instagram likes. First, I purchased 100 IG likes, then started buying more. I also bought Instagram views, which was the best service. And guys, if you really want to improve your engagement, the Instagram likes service is the best for you.",
      rating: 5,
    },
    {
      name: "Kristen",
      text: "I just loved the packages. Yes, my Instagram post performance has improved gradually. I was very happy with my results. And this is just different from others. And I would say that this is the best one.",
      rating: 5,
    },
    {
      name: "Sana",
      text: "High-quality likes, and I still keep on purchasing likes here. Guys, if you are looking for Instagram likes packages, then I would strongly recommend this. Yes, whether you're a creator or an influencer, try it once, and you will come back for more.",
      rating: 5,
    },
    {
      name: "Ruth",
      text: "Initially, I thought How does it work? But now I have become their regular customer. Yes friends, you will thank me later. And if you are looking for Instagram likes buy, then this will definitely work for you.",
      rating: 5,
    },
    {
      name: "Greenbug",
      text: "This is genuine, and no extra charges are asked. You can pay only for the quantity you choose. So no more confusion about extra charges. It is very easy to get real Instagram likes from TikyTop, and I recommend you try it at least once.",
      rating: 5,
    },
    {
      name: "Zoltan",
      text: "I could come back again and again. Nothing has satisfied me like TikyTop. You can buy real Instagram likes from them and improve your growth. Again, I'm gonna purchase 500 IG likes now. Guys, don't wait; go and get likes for your videos.",
      rating: 5,
    },
    {
      name: "Hal",
      text: "I have decided not to leave this platform. Because this is what I was expecting; if you are looking to grow your account, this could be the best place.",
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
                  Instagram Likes
                </span>{" "}
                Safely with TikyTop
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                We provide real IG likes at affordable prices. Easily boost your engagement and get things done quickly.
              </p>

              {/* 3 Highlight Benefits */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-lg pt-1">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-pink-400 flex-shrink-0" />
                  <span className="truncate">No Drops</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200">
                  <UserCheck className="w-4 h-4 text-pink-400 flex-shrink-0" />
                  <span className="truncate">Real Likes</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200">
                  <Lock className="w-4 h-4 text-pink-400 flex-shrink-0" />
                  <span className="truncate">100% Safety</span>
                </div>
              </div>

              {/* CTA Input Search Box Container */}
              <div id="instagram-search-box" className="w-full max-w-xl pt-3 space-y-3">
                {/* CTA Callout Badge */}
                <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 border border-pink-500/30 rounded-2xl backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
                    <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                      Get IG Likes Now!
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
                      Selected Package: <strong className="text-pink-300">{selectedPackage.quantity.toLocaleString()} Likes</strong> (${Number(selectedPackage.price).toFixed(2)})
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
                <form onSubmit={handleSearchSubmit} className="w-full">
                  <div
                    className={`flex items-center bg-white rounded-full p-1.5 w-full h-[58px] sm:h-[62px] transition-all duration-300 shadow-2xl ${isFocused ? "ring-4 ring-pink-500/30 border-2 border-pink-500" : "border border-slate-200"
                      }`}
                  >
                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 flex items-center justify-center ml-1 shadow-md">
                      <FaInstagram className="text-white text-xl" />
                    </div>

                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder={
                        selectedPackage
                          ? `Enter IG username for ${selectedPackage.quantity.toLocaleString()} Likes`
                          : "Enter IG username or Post URL"
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
                        "Buy Real Likes"
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

      {/* ── 2. HOW DOES IT WORK? ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How Does it Work?
            </h2>
            <p className="text-[17px] sm:text-[19px] text-slate-600 font-medium">
              Are you still confused? Here are the three simple steps to buy Instagram likes quickly.
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
                  alt="Enter IG Username"
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
                  Enter IG Username
                </h3>
                <p className="mt-3 text-[18px] leading-relaxed text-slate-600">
                  Enter your IG username in the given box.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative flex flex-col overflow-hidden rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(236,72,153,0.18)]">
              <div className="absolute right-6 top-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-pink-500 text-base font-bold text-white shadow-xl">
                02
              </div>

              <div className="relative h-[320px] sm:h-[360px] overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-100">
                <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-pink-400/30 blur-[120px]" />
                <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-rose-400/20 blur-[120px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(244,63,94,0.18),transparent_60%)]" />

                <img
                  src={Post}
                  alt="Select the Post"
                  className="relative z-10 h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
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
                  Select the Post
                </h3>
                <p className="mt-3 text-[18px] leading-relaxed text-slate-600">
                  Select the required post or multiple posts at a time.
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
                  alt="Get Instant IG Likes"
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
                  Get Instant IG Likes
                </h3>
                <p className="mt-3 text-[18px] leading-relaxed text-slate-600">
                  Next, choose your payment method and get likes instantly!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. EXISTING LIVE ORDERING / PACKAGE SECTION ── */}
      {/* Reuses QuickPackageSelector for platform="instagram" & serviceKey="likes" */}
      <QuickPackageSelector
        platform="instagram"
        serviceKey="likes"
        serviceTitle="Likes"
        selectedPackage={selectedPackage}
        onSelectPackage={setSelectedPackage}
        scrollTargetId="instagram-search-box"
      />

      {/* ── CTA SECTION: GET IG LIKES NOW ── */}
      <section className="py-20 px-6 relative overflow-hidden bg-white text-gray-900">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-[#00f2fe]/20 to-[#4facfe]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-br from-[#ff0844]/20 to-[#ffb199]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-slate-900/5 backdrop-blur-xl rounded-[2.5rem] border border-slate-200/50 p-10 md:p-16 shadow-xl text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Get IG Likes Now!
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              No more waiting, just growing
            </p>
            <button
              onClick={scrollToSearch}
              className="px-10 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white rounded-full font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              Buy Real Likes
            </button>
          </div>
        </div>
      </section>

      {/* ── ZIG-ZAG ALTERNATING CONTENT SECTIONS ── */}

      {/* SECTION 1: Why do Creators Buy Instagram Likes from TikyTop? (IMAGE LEFT, CONTENT RIGHT) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          {/* Top Section Header */}
          <div className="text-center max-w-5xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-snug lg:leading-tight">
              Let Your Account Fill with Hearts —{" "}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Buy Instagram Likes with Instant Delivery
              </span>
            </h2>
            <p className="text-base sm:text-[22px] text-slate-600 font-medium leading-10 max-w-4xl mx-auto">
              You can purchase Instagram likes within a few minutes! Unlock the potential of your Instagram page with TikyTop. Relax and observe an increase in likes; you will see how they play the role of social proof on your profile.
            </p>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image (Left on Desktop, Top on Mobile) */}
            <div className="w-full relative flex justify-center items-center">
              <div className="absolute -left-10 -top-10 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-gradient-to-br from-pink-50/50 via-white to-purple-50/50 p-3 sm:p-4 shadow-xl shadow-pink-500/5 transition-transform duration-500 hover:scale-[1.02]">
                <video
                  src={InstagramLikesVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto max-h-[420px] object-cover rounded-[2rem] shadow-inner"
                />
              </div>
            </div>

            {/* Content (Right on Desktop, Bottom on Mobile) */}
            <div className="w-full space-y-5 text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Why do Creators Buy Instagram Likes from TikyTop?
              </h3>
              <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-9 sm:leading-9 font-normal max-w-xl">
                <p>
                  Everyone has dreamt of becoming famous on Instagram, but still many lag behind. But there is a simple and easy way to gain more visibility for your profile. TikyTop is one of the best sites to buy Instagram post likes. Of course, many creators have gained more authentic likes. We offer a wide range of packages where users can buy Instagram reel likes and get them instantly. You don't need to wait hours; we deliver likes quickly.
                </p>
                <p>
                  We provide full security, and we won't charge any hidden fees. Your payment methods will also be safe. Whenever you need to use our service, you can use it and enjoy. We are here to assist you and amplify your reach. It is not only for creators; all types of users can use TikyTop to buy automatic Instagram likes and stand out from the crowd.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: What Makes Us So Special? (CONTENT LEFT, IMAGE RIGHT) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Content (Left on Desktop, Bottom on Mobile) */}
            <div className="w-full space-y-5 text-left lg:order-1 order-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-purple-600 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" /> The TikyTop Advantage
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                What Makes Us So Special?
              </h2>
              <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-9 sm:leading-9 font-normal max-w-xl">                <p>
                Within a few moments, you can buy Instagram likes. There are no hard steps; within a few clicks, you can get results. All you need to do is provide your username, select the post you want to improve visibility for, and complete payment. Good to go! None of your sensitive or personal information is required.
              </p>
                <p>
                  Another interesting thing about our service is that you can purchase any service and customize a package to fit your needs. As a user, you can buy Instagram likes cheap and enlarge your profile. Once your likes increase, the TikTok algorithm will make your videos appear on the For You Page.
                </p>
              </div>
            </div>

            {/* Image (Right on Desktop, Top on Mobile) */}
            <div className="w-full relative flex justify-center items-center lg:order-2 order-1">
              <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-gradient-to-br from-purple-50/50 via-white to-pink-50/50 p-3 sm:p-4 shadow-xl shadow-purple-500/5 transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src={InstaLikesImage}
                  alt="What Makes Us So Special"
                  className="w-full h-auto max-h-[480px] object-cover rounded-[2rem] shadow-inner"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Why do you need to Buy Instagram Likes? (IMAGE LEFT, CONTENT RIGHT) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image (Left on Desktop, Top on Mobile) */}
            <div className="w-full relative flex justify-center items-center">
              <div className="absolute -left-10 -bottom-10 w-72 h-72 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-gradient-to-br from-rose-50/50 via-white to-pink-50/50 p-3 sm:p-4 shadow-xl shadow-rose-500/5 transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src={InstaLikesImage1}
                  alt="Why do you need to Buy Instagram Likes"
                  className="w-full h-auto max-h-[420px] object-cover rounded-[2rem] shadow-inner"
                />
              </div>
            </div>

            {/* Content (Right on Desktop, Bottom on Mobile) */}
            <div className="w-full space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-600 text-xs font-bold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> Engagement Boost
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Why do you need to Buy Instagram Likes?
              </h2>
              <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-9 sm:leading-9 font-normal max-w-xl">
                <p>
                  Instagram likes play a major role and are considered one of the most important metrics. If you have many likes on the video you have posted, then you are lucky. Sometimes many creators fail to reach viewers. In that case, TikyTop will never leave you alone. Yes, you can buy IG likes and boost engagement on your videos.
                </p>
                <p>
                  The main thing users see is likes; when there are few likes, they skip to the next video. So there is no need to worry; we have packages that fit your needs. Now you are safe, and your account will not be removed because all the likes are from real accounts. Now the process is simpler!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. CTA SECTION ── */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Join with us Now!
          </h2>
          <p className="text-base sm:text-xl text-pink-100 font-medium max-w-2xl mx-auto">
            We provide affordable, quality likes to all our customers!
          </p>
          <div>
            <button
              onClick={scrollToSearch}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-pink-600 hover:bg-slate-100 font-extrabold text-base transition-all duration-200 shadow-xl hover:scale-105 cursor-pointer"
            >
              Purchase Likes <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ SECTION ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions on Buy Instagram Likes
            </h2>
            <p className="text-[20px] sm:text-[18px] text-slate-600 font-medium">
              Got questions? Just read our FAQs to learn more about the most commonly asked questions.
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

      {/* ── 9. READY TO ORDER CTA ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Order?
          </h2>
          <p className="text-sm sm:text-lg text-slate-300">
            Join with us and grow your presence with our active likes.
          </p>
          <div>
            <button
              onClick={scrollToSearch}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-base hover:from-pink-600 hover:to-purple-700 shadow-lg shadow-pink-500/25 transition-all cursor-pointer"
            >
              Buy Instagram Likes <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 10. CUSTOMER TESTIMONIALS (AUTO-SCROLLING CAROUSEL WITH PAUSE-ON-HOVER) ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-bold uppercase tracking-wider">
              Real Reviews
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Hear From Our Real Customers
            </h2>
            <p className="text-[20px] sm:text-[18px] text-slate-600 font-medium">
              Don't just take our word for it; hear from our real customers. From now on, make your profile look more professional.
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
