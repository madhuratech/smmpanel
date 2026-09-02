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
  Eye,
  Award,
  Sparkles,
  ArrowRight,
  Shield,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import { FaInstagram, FaStar, FaFire } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";
import QuickPackageSelector from "../components/QuickPackageSelector";
import LiveDeliveryCounter from "../components/LiveDeliveryCounter";
import Tiky from "../assets/images/Instagramlikesbg.png";
import Username from "../assets/images/username.png";
import Post from "../assets/images/Likeimage.png";
import InstagramViewsVideo from "../assets/images/instagram_views_video.mp4";
import Likes from "../assets/images/likes.png";
import ViewCard from "../assets/images/viewscard.png";
import ViewCard1 from "../assets/images/viewcard1.png";
import InstaViews from "../assets/images/InstaViews.png";
import InstaViewsImg2 from "../assets/images/InstaViewsImg2.png";

export default function BuyInstagramViews() {
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
    document.title = "Buy Instagram Views | Boost Engagement | Active Likes";

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
      "Buy Instagram views at the best price from TikyTop. Boost your engagement rate just by giving your username, selecting the post, and finally get instant views."
    );
    setMetaTag(
      "name",
      "keywords",
      "buy instagram views, buy views instagram, buy instagram reels views, buy instagram video views, buy instagram live views, how to buy instagram views, tikytop instagram views"
    );
    setMetaTag("name", "robots", "index, follow");

    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:title", "Buy Instagram Views | Boost Engagement | Active Likes");
    setMetaTag(
      "property",
      "og:description",
      "Buy Instagram views at the best price from TikyTop. Boost your engagement rate just by giving your username, selecting the post, and finally get instant views."
    );
    setMetaTag("property", "og:url", "https://tikytop.com/buy-instagram-views");
    setMetaTag("property", "og:site_name", "TikyTop");

    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", "Buy Instagram Views | Boost Engagement | Active Likes");
    setMetaTag(
      "name",
      "twitter:description",
      "Buy Instagram views at the best price from TikyTop. Boost your engagement rate just by giving your username, selecting the post, and finally get instant views."
    );

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://tikytop.com/buy-instagram-views");

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
          selectedServiceKey: "views",
          entryPath: "/buy-instagram-views",
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
      q: "How to buy Instagram views?",
      a: "To buy Instagram reel views, you can choose the required service and enter your username. Next, select the post for which you need to improve the view count. Finally, select the quantity and package. Finalize and make the payment. Note: We don't collect any of your passwords… Once the payment is done, you will receive it within a few moments. Just as simple as you think.",
    },
    {
      q: "Do Instagram views providers still work in 2026?",
      a: "Why not? Still, it works in 2026. But the thing is, you have to choose based on your needs. Firstly, analyze what you need. It can be anything you might look for, like likes, views, or followers. TikyTop is a one-stop destination for creators and influencers. You can buy views Instagram and improve your content's performance.",
    },
    {
      q: "Will my account get banned?",
      a: "Not at all! Under no circumstances will your account be suspended or get banned. This is because all views you get from our service are organic. You can buy any of our services and give it a try. Once you start using our service, you will feel satisfied and come back for more.",
    },
    {
      q: "Is it legal to buy Instagram views?",
      a: "Yes, it is legal to buy Instagram views. It doesn't mean you'll be offended or get banned. We always aim to provide active and real views to our customers. Also, we don't ask for any of your passwords, and no additional payment is required. You will always remain in control.",
    },
    {
      q: "Do I need to provide any sensitive data?",
      a: "As mentioned, we don't ask for any sensitive data, passwords, or anything confidential. We keep ordering simple and easy. Even a beginner can understand and use it. Based on the service you choose, the only information you'll need to provide is your username. Because we prioritize your privacy, we never ask for sensitive information.",
    },
    {
      q: "How many Instagram video views can I buy?",
      a: "There is no limit to purchasing. You can get Instagram views by choosing the package. Moreover, it is possible to purchase or choose a package one at a time. At the same time, you can choose multiple posts and customize the package.",
    },
    {
      q: "Does TikyTop provide views from real users?",
      a: "Yes, we provide IG views from real and active users. No fake ID’s or bot accounts. And TikyTop is said to be the #1 service for TikTok and Instagram. That's why many Instagram content creators and influencers still choose us. And now no more confusion about using our service. Check our Terms page for more details. Or if you have any questions, email us at support@tikytop.com.",
    },
  ];

  // 10 Testimonials from PDF
  const testimonials = [
    {
      name: "Richard",
      text: "When I searched for a reliable platform, I found TikyTop. And guys, without any confusion, you can buy Instagram live views and make your profile the best.",
      rating: 5,
    },
    {
      name: "Bobby",
      text: "So far, this is one of the best among all. And nothing has satisfied me as much as TikyTop. And now my Instagram reach is on another level. Like other top profiles, my account has become famous too.",
      rating: 5,
    },
    {
      name: "Caden",
      text: "Initially, I bought 100 Instagram views, and now I have become their regular customer. But I couldn't even imagine this. And friends, I can tell you this is something you should try.",
      rating: 5,
    },
    {
      name: "Sweety",
      text: "Hi, I'm a content creator, and usually I look for content performance. All of a sudden, my content doesn't reach. Then later I searched for the best Instagram service. And now my profile has gained more reach. Thank you, team, for the support.",
      rating: 5,
    },
    {
      name: "Keira",
      text: "You can also be a small influencer. If you aim to reach a wide audience, then this will help you out. And guys, you need to worry about how big your account is; even I was a beginner, and now my profile looks more professional.",
      rating: 5,
    },
    {
      name: "Gia",
      text: "Omg! This is outstanding. I was struggling to buy Instagram video views, and my friend recommended this to me. And now I could amplify my reach. Finally, guys, I could recommend this service.",
      rating: 5,
    },
    {
      name: "Bryn",
      text: "I have never reached this many views before. If you want to increase Instagram views, you are in the right place. This is just super friendly and easy to handle. Just the username is enough: selecting the post and finally making a payment. Then you will be all set.",
      rating: 5,
    },
    {
      name: "Brown",
      text: "Nah! I'm not gonna leave this service. And friends, if you are a budding creator, you should definitely give it a try. Yes, you should buy views on Instagram and improve your online presence. Don't wait; start today.",
      rating: 5,
    },
    {
      name: "Walter",
      text: "I would give 5/5. I couldn't even imagine I would get such positive results. The best part is the fast delivery; even though I have used other services, delivery isn't this fast. This is phenomenal!",
      rating: 5,
    },
    {
      name: "Steve",
      text: "I recommend TikyTop for creators of all sizes because, as a small creator, I was looking to improve my account. And now, finally, I was able to grow like a professional. Highly recommended to use.",
      rating: 5,
    },
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  // Comparison Table Data from PDF
  const comparisonData = [
    {
      tikytop: "Instant Delivery",
      others: "Takes Time",
    },
    {
      tikytop: "No Password Asked",
      others: "May Ask",
    },
    {
      tikytop: "Customizable Package",
      others: "No Customizable Option",
    },
    {
      tikytop: "Transparency and No Hidden Cost",
      others: "Unclear Pricing",
    },
    {
      tikytop: "Real Views",
      others: "Bots",
    },
  ];

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
                  <FaInstagram className="text-pink-400" /> Instagram Views
                </div>
              </div>

              {/* Main Heading H1 */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                #1 TikyTop Is The Best Site To{" "}
                <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-purple-400 bg-clip-text text-transparent">
                  Buy Instagram Views
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                Maximize your video views and gain more attention from new viewers. At TikyTop, we help you make your account look more engaging.
              </p>

              {/* 3 Highlight Benefits from PDF */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-lg pt-1">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200">
                  <TrendingUp className="w-4 h-4 text-pink-400 flex-shrink-0" />
                  <span className="truncate">Audience growth</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200">
                  <Sparkles className="w-4 h-4 text-pink-400 flex-shrink-0" />
                  <span className="truncate">Low-cost packages</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-pink-400 flex-shrink-0" />
                  <span className="truncate">Proven Results</span>
                </div>
              </div>

              {/* CTA Input Search Box Container */}
              <div id="instagram-search-box" className="w-full max-w-xl pt-3 space-y-3">
                {/* CTA Callout Badge */}
                <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 border border-pink-500/30 rounded-2xl backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
                    <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                      Get IG Views Now!
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
                      Selected Package: <strong className="text-pink-300">{selectedPackage.quantity.toLocaleString()} Views</strong> (${Number(selectedPackage.price).toFixed(2)})
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
                          ? `Enter IG username for ${selectedPackage.quantity.toLocaleString()} Views`
                          : "Enter IG username or Reel/Post URL"
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
                        "Buy Real Views"
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

      {/* ── 2. HOW DOES IT WORK? (3 STEPS FROM PDF) ── */}
      <section className="pt-14 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto">

          {/* Real-time Loop Delivery Counter */}
          <div className="flex justify-center mb-8 sm:mb-10">
            <LiveDeliveryCounter service="views" platform="Instagram" />
          </div>

          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How Does it Work in Just 3 Steps?
            </h2>
            <p className="text-[17px] sm:text-[19px] text-slate-600 font-medium">
              Our real Instagram views help you reach greater visibility—power up your presence with our exclusive deals and packages.
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
                  Enter your username or paste it into the search box.
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
                  alt="Picking the Post"
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
                  Picking the Post
                </h3>
                <p className="mt-3 text-[18px] leading-relaxed text-slate-600">
                  Choose a post to improve your views. You can select one or multiple posts.
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
                  You can choose a payment mode and pay safely. Finally, get IG views instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. LIVE ORDERING / PACKAGE SECTION ── */}
      <QuickPackageSelector
        platform="instagram"
        serviceKey="views"
        serviceTitle="Views"
        selectedPackage={selectedPackage}
        onSelectPackage={setSelectedPackage}
        scrollTargetId="instagram-search-box"
      />

      {/* ── CTA SECTION: INSTAGRAM VIEWS PACKAGES ── */}
      <section className="py-20 px-6 relative overflow-hidden bg-white text-gray-900">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-[#00f2fe]/20 to-[#4facfe]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-br from-[#ff0844]/20 to-[#ffb199]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-slate-900/5 backdrop-blur-xl rounded-[2.5rem] border border-slate-200/50 p-10 md:p-16 shadow-xl text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Instagram Views Packages
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Get your Instagram views in just a few moments! Finally, make your profile have quality engagement.
            </p>
            <button
              onClick={scrollToSearch}
              className="px-10 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white rounded-full font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              Click Here
            </button>
          </div>
        </div>
      </section>

      {/* ── ZIG-ZAG ALTERNATING CONTENT SECTIONS ── */}

      {/* SECTION 1: Why Do You Need To Buy Instagram Views To Elevate Your Presence? (IMAGE LEFT, CONTENT RIGHT) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image (Left on Desktop, Top on Mobile) */}
            <div className="w-full relative flex justify-center items-center">
              <div className="absolute -left-10 -top-10 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-gradient-to-br from-pink-50/50 via-white to-purple-50/50 p-3 sm:p-4 shadow-xl shadow-pink-500/5 transition-transform duration-500 hover:scale-[1.02]">
                <video
                  src={InstagramViewsVideo}
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-pink-600 text-xs font-bold uppercase tracking-wider">
                <Eye className="w-3.5 h-3.5" /> Boost Visibility
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Why Do You Need To Buy Instagram Views To Elevate Your Presence?
              </h2>
              <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-9 sm:leading-9 font-normal max-w-xl">
                <p>
                  Everyone’s dream is to become popular, and that is where buy Instagram views comes in. Usually, Instagram prioritizes content with more views and maximum visibility. That’s why we deliver real Instagram views to our customers and help their videos appear on the For You Page. If you create top-quality videos but they don't get popular, we're here to help. At TikyTop, we make your videos more popular and help you reach out to new followers. With our buy Instagram reels views service, you can increase your reach. You can focus on creating videos that truly engage with your audience, and we amplify the visibility.
                </p>
                <p>
                  We always prioritize our users’ success, and you deserve it. No matter how big your profile is, select posts, customize the quantity, and make the payment. All you have to do is choose the right package and get views instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: What Makes You Different From Others? (CONTENT LEFT, IMAGE RIGHT) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Content (Left on Desktop, Bottom on Mobile) */}
            <div className="w-full space-y-5 text-left lg:order-1 order-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-purple-600 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" /> The TikyTop Advantage
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                What Makes You Different From Others?
              </h2>
              <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-9 sm:leading-9 font-normal max-w-xl">
                <p>
                  Instagram has become a famous platform, and many users have gained popularity. Social media visibility is something built differently when you want to grow your profile. At TikyTop, we always focus on making the process easier and more convenient for all users. We offer real Instagram views, a high engagement rate, organic reach, and content performance; this sets us apart from others. If you are looking to improve your social proof, we're here to help.
                </p>
                <p>
                  We also understand that every user has different goals, so we offer a range of packages. Users can choose the package that best fits their needs. This way, you don't have to spend more time on it, and you can focus on creating content. Our goal isn't just to improve your posts or profile; we also help you build strong social proof.
                </p>
              </div>
            </div>

            {/* Image (Right on Desktop, Top on Mobile) */}
            <div className="w-full relative flex justify-center items-center lg:order-2 order-1">
              <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-gradient-to-br from-purple-50/50 via-white to-pink-50/50 p-3 sm:p-4 shadow-xl shadow-purple-500/5 transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src={InstaViews}
                  alt="What Makes You Different From Others"
                  className="w-full h-auto max-h-[480px] object-cover rounded-[2rem] shadow-inner"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Does TikyTop Really Set Up Your Engagement? (IMAGE LEFT, CONTENT RIGHT) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image (Left on Desktop, Top on Mobile) */}
            <div className="w-full relative flex justify-center items-center">
              <div className="absolute -left-10 -bottom-10 w-72 h-72 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-gradient-to-br from-rose-50/50 via-white to-pink-50/50 p-3 sm:p-4 shadow-xl shadow-rose-500/5 transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src={InstaViewsImg2}
                  alt="Does TikyTop Really Set Up Your Engagement?"
                  className="w-full h-auto max-h-[420px] object-cover rounded-[2rem] shadow-inner"
                />
              </div>
            </div>

            {/* Content (Right on Desktop, Bottom on Mobile) */}
            <div className="w-full space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-600 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> Engagement Boost
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Does TikyTop Really Set Up Your Engagement?
              </h2>
              <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-9 sm:leading-9 font-normal max-w-xl">
                <p>
                  Of course, we are designed to help your profile gain more visibility. For instance, when a post receives more engagement, it's seen as active, and more people start following you. And if there is no engagement, people skip to the next video and don't find your account interesting enough to follow. And that’s why we are here for you. However, likes and views alone won't help; your content plays a major role. In conclusion, provide your username, select the required post, choose the quantity, and make the payment.
                </p>
                <p>
                  Because we provide high-quality views and premium service, your IG account will always stay protected. All the views you get will be delivered reliably. As a result, you get positive results. Start saving your amount on a huge package with our service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CTA SECTION: NEED TO BUY INSTAGRAM REEL VIEWS? ── */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Need to Buy Instagram Reel Views?
          </h2>
          <p className="text-base sm:text-xl text-pink-100 font-medium max-w-2xl mx-auto">
            Easy customization, a simple ordering process, and delivery in a few seconds.
          </p>
          <div>
            <button
              onClick={scrollToSearch}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-pink-600 hover:bg-slate-100 font-extrabold text-base transition-all duration-200 shadow-xl hover:scale-105 cursor-pointer"
            >
              Grow Profile <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 5. COMPARISON TABLE SECTION ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How Buy Instagram Views from TikyTop Makes It Easier
            </h2>
            <p className="text-[17px] sm:text-[19px] text-slate-600 font-medium">
              At TikyTop, we prioritize exceptional service.
            </p>
          </div>

          {/* Comparison Table Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-900 text-white">
                    <th className="w-1/2 py-5 px-6 sm:px-8 font-extrabold text-sm sm:text-base uppercase tracking-wider text-pink-400 bg-slate-800/80 border-r border-slate-700/50">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
                        <span>TikyTop.com</span>
                      </div>
                    </th>
                    <th className="w-1/2 py-5 px-6 sm:px-8 font-extrabold text-sm sm:text-base uppercase tracking-wider text-slate-400">
                      Others
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm sm:text-base">
                  {comparisonData.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white hover:bg-slate-50/80 transition-colors" : "bg-slate-50/40 hover:bg-slate-50 transition-colors"}
                    >
                      <td className="py-4.5 px-6 sm:px-8 font-semibold text-slate-900 bg-pink-50/30 border-r border-slate-100">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-pink-500 flex-shrink-0" />
                          <span className="font-semibold text-slate-900">{row.tikytop}</span>
                        </div>
                      </td>
                      <td className="py-4.5 px-6 sm:px-8 text-slate-500 font-medium">
                        <div className="flex items-center gap-3">
                          <XCircle className="w-5 h-5 text-slate-400 flex-shrink-0" />
                          <span>{row.others}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CTA SECTION: LOG IN & USE OUR IG VIEWS ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Log In & Use Our IG Views
          </h2>
          <p className="text-sm sm:text-lg text-slate-300">
            Get more Instagram views and make your profile the best, never like before
          </p>
          <div>
            <button
              onClick={scrollToSearch}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-base hover:from-pink-600 hover:to-purple-700 shadow-lg shadow-pink-500/25 transition-all cursor-pointer"
            >
              Click Here <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 7. FAQ SECTION (7 FAQS FROM PDF) ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              FAQs on Buy Instagram Views
            </h2>
            <p className="text-[20px] sm:text-[18px] text-slate-600 font-medium">
              You are in the right place if you want more details about our service. Otherwise, reach out to us via email to learn more details.
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
                        <div className="px-6 pb-5 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 whitespace-pre-line">
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

      {/* ── 8. CUSTOMER TESTIMONIALS (10 REVIEWS FROM PDF AUTO-SCROLLING CAROUSEL WITH PAUSE-ON-HOVER) ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-bold uppercase tracking-wider">
              Real Reviews
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Know More About What Our Customers Say About Us
            </h2>
            <p className="text-[20px] sm:text-[18px] text-slate-600 font-medium">
              Want to gain more exposure? Then check out our reviews and see how our affordable Instagram views packages helped our users.
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
