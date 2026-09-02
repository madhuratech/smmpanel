import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

const serviceTiers = {
  views: {
    name: "Views",
    tiers: [
      { amount: "1,000", time: "2 mins" },
      { amount: "2,500", time: "3 mins" },
      { amount: "5,000", time: "5 mins" },
      { amount: "10,000", time: "8 mins" },
      { amount: "25,000", time: "15 mins" },
      { amount: "50,000", time: "25 mins" },
    ],
  },
  likes: {
    name: "Likes",
    tiers: [
      { amount: "500", time: "2 mins" },
      { amount: "1,000", time: "3 mins" },
      { amount: "2,500", time: "5 mins" },
      { amount: "5,000", time: "8 mins" },
      { amount: "10,000", time: "15 mins" },
      { amount: "25,000", time: "30 mins" },
    ],
  },
  shares: {
    name: "Shares",
    tiers: [
      { amount: "500", time: "2 mins" },
      { amount: "1,000", time: "3 mins" },
      { amount: "2,500", time: "5 mins" },
      { amount: "5,000", time: "8 mins" },
      { amount: "10,000", time: "15 mins" },
    ],
  },
  followers: {
    name: "Followers",
    tiers: [
      { amount: "250", time: "3 mins" },
      { amount: "500", time: "5 mins" },
      { amount: "1,000", time: "8 mins" },
      { amount: "2,500", time: "15 mins" },
      { amount: "5,000", time: "25 mins" },
    ],
  },
  subscribers: {
    name: "Subscribers",
    tiers: [
      { amount: "100", time: "2 mins" },
      { amount: "250", time: "5 mins" },
      { amount: "500", time: "8 mins" },
      { amount: "1,000", time: "15 mins" },
      { amount: "2,500", time: "25 mins" },
    ],
  },
  comments: {
    name: "Comments",
    tiers: [
      { amount: "25", time: "2 mins" },
      { amount: "50", time: "3 mins" },
      { amount: "100", time: "5 mins" },
      { amount: "250", time: "8 mins" },
      { amount: "500", time: "15 mins" },
    ],
  },
};

export default function LiveDeliveryCounter({ service = "views", platform = "TikTok", className = "" }) {
  const data = serviceTiers[service.toLowerCase()] || serviceTiers.views;
  const tiers = data.tiers;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % tiers.length);
    }, 2800); // Changes automatically every 2.8s in loop mode

    return () => clearInterval(timer);
  }, [tiers.length]);

  const current = tiers[index];

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="inline-flex items-center justify-center gap-3 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white/95 border border-slate-200/90 shadow-md shadow-slate-200/40 backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:border-slate-300 w-[350px] sm:w-[385px] max-w-[92vw]">
        
        {/* Live indicator */}
        <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>

        {/* Looping Content: Quantity + Delivery Time */}
        <div className="h-6 sm:h-7 overflow-hidden flex items-center justify-center flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold whitespace-nowrap text-slate-800 w-full"
            >
              {/* Quantity */}
              <span className="font-extrabold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200/60 tabular-nums min-w-[105px] sm:min-w-[115px] text-center inline-block">
                {current.amount} {data.name}
              </span>

              <span className="text-slate-400 font-normal">delivered in</span>

              {/* Time */}
              <span className="inline-flex items-center justify-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60 min-w-[76px] sm:min-w-[82px] text-center">
                <Clock className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                {current.time}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
