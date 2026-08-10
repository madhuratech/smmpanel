import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Shield,
  Zap,
  Check,
  Star,
  Lock,
  ArrowRight,
} from "lucide-react";
import { FaTiktok, FaInstagram, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";
import Tiky from "../assets/images/Landingpage2.png";

export default function About() {
  useScrollToTop();
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate("/");
  };

  const whyChooseUs = [
    {
      title: "Affordable Packages",
      desc: "Affordable packages designed for creators, influencers, and businesses.",
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
    },
    {
      title: "Social Media Growth",
      desc: "Improve your visibility across TikTok, Instagram, and YouTube.",
      icon: <TrendingUp className="w-6 h-6 text-pink-400" />,
    },
    {
      title: "Trusted by 50K+ Users",
      desc: "More than 50K users worldwide have used TikyTop.",
      icon: <Users className="w-6 h-6 text-violet-400" />,
    },
    {
      title: "Built for Everyone",
      desc: "Whether you are a small business, large business, creator, or influencer, TikyTop is built to help you grow.",
      icon: <Check className="w-6 h-6 text-emerald-400" />,
    },
  ];

  const platforms = [
    {
      name: "TikTok",
      desc: "Boost your TikTok presence and reach more people.",
      icon: <FaTiktok className="w-8 h-8 text-[#00f2fe]" />,
      path: "/tiktok",
    },
    {
      name: "Instagram",
      desc: "Improve your Instagram visibility and engagement.",
      icon: <FaInstagram className="w-8 h-8 text-[#ff0844]" />,
      path: "/instagram",
    },
    {
      name: "YouTube",
      desc: "Grow your YouTube presence and reach a wider audience.",
      icon: <FaYoutube className="w-8 h-8 text-[#ff0000]" />,
      path: "/youtube",
    },
  ];

  return (
    <div className="bg-[#0a0212] text-white font-sans antialiased overflow-x-hidden min-h-screen">

      {/* ── SECTION 1: ABOUT HERO ── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 md:px-12 overflow-hidden bg-[#1a0b2e]">
        {/* HERO IMAGE - BACKGROUND */}
        <img
          src={Tiky}
          alt=""
          className="absolute inset-0 z-0 w-full h-full object-cover"
        />

        {/* Main dark purple base overlay */}
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

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-pink-400 shadow-inner">
              <Star className="w-3.5 h-3.5 fill-current" />
              About TikyTop
            </span>

            <h1 className="text-4xl sm:text-6xl font-bold leading-tight font-righteous tracking-tight">
              Helping You Grow <br />
              <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-rose-500 bg-clip-text text-transparent block sm:inline">
                Your Social Presence
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              TikyTop was created in 2025 by expert teams. We help creators, business people, and influencers get noticed on social media platforms.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={handleCTAClick}
                className="px-8 py-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-full font-bold shadow-lg hover:shadow-pink-500/20 hover:scale-105 transition-all duration-300"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate("/tiktok")}
                className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-bold hover:scale-105 transition-all duration-300"
              >
                Explore Our Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: WHO WE ARE ── */}
      <section className="py-24 px-6 relative overflow-hidden bg-white text-gray-800">
        <div className="max-w-4xl mx-auto relative z-10">

          <div className="text-center mb-12 text-[#11223f]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Who We Are
            </h2>
          </div>

          {/* Clean Card for Light Background */}
          <div className="rounded-[36px] bg-gray-50 border border-gray-150 p-8 md:p-12 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />

            <div className="relative z-10 space-y-6 text-[#223a5e] text-base sm:text-lg leading-relaxed">
              <p>
                TikyTop was created in 2025 by expert teams. We have helped creators, business people, and influencers get noticed on social media platforms.
              </p>
              <p>
                Our main goal is to help both small and large businesses succeed on social media. We offer affordable packages to our customers without charging excessive prices.
              </p>
              <p>
                We have achieved successful milestones and continue working to become a trusted place for social media growth.
              </p>
            </div>

            {/* Soft decorative elements */}
            <div className="mt-8 pt-8 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-pink-500" /> Secure Encryption</span>
              <span>Est. 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: OUR IMPACT (STATS) ── */}
      <section className="py-20 px-6 relative overflow-hidden bg-gray-50 text-gray-800">
        <div className="max-w-7xl mx-auto relative z-10">

          <div className="max-w-3xl mx-auto text-center mb-16 text-[#11223f]">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Our Impact</h2>
            <p className="text-[#223a5e] text-base sm:text-lg leading-relaxed">
              TikyTop has helped more than 50K users worldwide improve their visibility on TikTok, Instagram, and YouTube.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* Stat card 1 */}
            <div className="bg-white border border-gray-150 rounded-[28px] p-8 text-center shadow-md hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">
                50K+
              </div>
              <div className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                Users Worldwide
              </div>
            </div>

            {/* Stat card 2 */}
            <div className="bg-white border border-gray-150 rounded-[28px] p-8 text-center shadow-md hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl sm:text-5xl font-extrabold text-[#00f2fe] mb-2 flex items-center justify-center gap-2">
                <FaTiktok className="w-8 h-8 text-black" /> TikTok
              </div>
              <div className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                Growth Platform
              </div>
            </div>

            {/* Stat card 3 */}
            <div className="bg-white border border-gray-150 rounded-[28px] p-8 text-center shadow-md hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl sm:text-5xl font-extrabold text-[#ff0844] mb-2 flex items-center justify-center gap-2">
                <FaInstagram className="w-8 h-8 text-[#ff0844]" /> Instagram
              </div>
              <div className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                Growth Platform
              </div>
            </div>

            {/* Stat card 4 */}
            <div className="bg-white border border-gray-150 rounded-[28px] p-8 text-center shadow-md hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl sm:text-5xl font-extrabold text-[#ff0000] mb-2 flex items-center justify-center gap-2">
                <FaYoutube className="w-8 h-8 text-[#ff0000]" /> YouTube
              </div>
              <div className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                Growth Platform
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 4: WHY TIKYTOP ── */}
      <section className="py-24 px-6 bg-white relative overflow-hidden text-gray-800">
        <div className="max-w-7xl mx-auto relative z-10">

          <div className="text-center mb-16 text-[#11223f]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Why Choose TikyTop?
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-150 rounded-[28px] p-8 text-left shadow-md hover:shadow-lg transition duration-300 relative group"
              >
                <div className="absolute inset-0 rounded-[28px] border-2 border-transparent group-hover:border-pink-500/20 transition-all duration-300 pointer-events-none" />
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-gray-200 mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#11223f] mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: OUR GOAL ── */}
      <section className="py-24 px-6 relative overflow-hidden text-center bg-gray-50 text-gray-800">

        {/* Neon Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5 blur-[130px] pointer-events-none" />

        {/* Floating Icons */}
        <div className="absolute top-10 left-[15%] text-gray-200/40 text-7xl select-none pointer-events-none hover:text-cyan-500/10 transition duration-1000">
          <FaTiktok />
        </div>
        <div className="absolute bottom-10 right-[15%] text-gray-200/40 text-7xl select-none pointer-events-none hover:text-pink-500/10 transition duration-1000">
          <FaInstagram />
        </div>
        <div className="absolute top-1/3 right-[10%] text-gray-200/40 text-6xl select-none pointer-events-none hover:text-red-500/10 transition duration-1000">
          <FaYoutube />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">
            Our Goal Is Your Growth
          </h2>
          <p className="text-lg md:text-xl text-[#223a5e] leading-relaxed max-w-2xl mx-auto">
            If you want to become more visible on social media platforms, TikyTop is here to help.
          </p>
        </div>
      </section>

      {/* ── SECTION 6: SOCIAL PLATFORMS ── */}
      <section className="py-24 px-6 bg-white relative overflow-hidden text-gray-800">
        <div className="max-w-7xl mx-auto relative z-10">

          <div className="text-center mb-16 text-[#11223f]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Grow Across Your Favorite Platforms
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {platforms.map((p, idx) => (
              <div
                key={idx}
                onClick={() => navigate(p.path)}
                className="bg-gray-50 border border-gray-150 rounded-[32px] p-8 text-center shadow-md hover:-translate-y-2 hover:bg-gray-100/50 cursor-pointer transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex justify-center mb-6">
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#11223f]">{p.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{p.desc}</p>
                <div className="inline-flex items-center justify-center gap-1.5 text-xs text-pink-500 font-bold tracking-wider uppercase pt-4 border-t border-gray-200 group mt-auto">
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 transition duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: FINAL CTA ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#3b0622] via-[#210438] to-[#0a0212] text-white text-center relative overflow-hidden">

        {/* Soft corner glows */}
        <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-pink-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px]" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Ready to Grow Your Social Presence?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Join thousands of creators and businesses using TikyTop to improve their social media visibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={handleCTAClick}
              className="px-10 py-4.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white rounded-full font-bold text-lg hover:shadow-[0_0_35px_rgba(236,72,153,0.4)] hover:scale-105 transition-all duration-300 border border-pink-400/30"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/tiktok")}
              className="px-10 py-4.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300"
            >
              View Services
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
