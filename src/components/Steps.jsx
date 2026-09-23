import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaTiktok, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Steps({ platform }) {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const isTikTok = platform === "tiktok" || path.includes("tiktok");
  const isInstagram = platform === "instagram" || path.includes("instagram");

  const getQuickServices = () => {
    if (isTikTok) {
      return [
        {
          name: "Buy Instagram likes",
          path: "/buy-instagram-likes",
          icon: <FaInstagram className="text-[#E1306C] text-xs" />,
        },
        {
          name: "Buy Instagram followers",
          path: "/buy-instagram-followers",
          icon: <FaInstagram className="text-[#E1306C] text-xs" />,
        },
        {
          name: "Buy YouTube views",
          path: "/buy-youtube-views",
          icon: <FaYoutube className="text-[#FF0000] text-xs" />,
        },
        {
          name: "Buy YouTube likes",
          path: "/buy-youtube-likes",
          icon: <FaYoutube className="text-[#FF0000] text-xs" />,
        },
      ];
    }

    if (isInstagram) {
      return [
        {
          name: "Buy TikTok likes",
          path: "/buy-tiktok-likes",
          icon: <FaTiktok className="text-slate-900 text-xs" />,
        },
        {
          name: "Buy TikTok views",
          path: "/buy-tiktok-views",
          icon: <FaTiktok className="text-slate-900 text-xs" />,
        },
        {
          name: "Buy YouTube views",
          path: "/buy-youtube-views",
          icon: <FaYoutube className="text-[#FF0000] text-xs" />,
        },
        {
          name: "Buy YouTube likes",
          path: "/buy-youtube-likes",
          icon: <FaYoutube className="text-[#FF0000] text-xs" />,
        },
      ];
    }

    // Default (Home & other pages)
    return [
      {
        name: "Buy TikTok likes",
        path: "/buy-tiktok-likes",
        icon: <FaTiktok className="text-slate-900 text-xs" />,
      },
      {
        name: "Buy TikTok views",
        path: "/buy-tiktok-views",
        icon: <FaTiktok className="text-slate-900 text-xs" />,
      },
      {
        name: "Buy Instagram likes",
        path: "/buy-instagram-likes",
        icon: <FaInstagram className="text-[#E1306C] text-xs" />,
      },
      {
        name: "Buy Instagram followers",
        path: "/buy-instagram-followers",
        icon: <FaInstagram className="text-[#E1306C] text-xs" />,
      },
    ];
  };

  const quickServices = getQuickServices();

  const steps = [
    {
      step: "Step 1",
      number: "01",
      title: "Choose Your Platform",
      desc: "Select the platform you want to grow, such as TikTok, Instagram, YouTube, or Facebook.",
    },
    {
      step: "Step 2",
      number: "02",
      title: "Pick Your Service",
      desc: "Pick the service that fits your goal. This could be followers, likes, views, or other engagement options.",
    },
    {
      step: "Step 3",
      number: "03",
      title: "Add Your Details",
      desc: "Provide the required information, such as your profile or content link, and choose the quantity you want.",
    },
    {
      step: "Step 4",
      number: "04",
      title: "Complete Checkout",
      desc: "Finish the checkout process and your order will begin processing shortly.",
    },
    {
      step: "Step 5",
      number: "05",
      title: "Watch It Grow",
      desc: "Once confirmed, your selected engagement will start appearing on your profile or content.",
    },
  ];

  return (
    <section className="bg-[#f8f8fb] section-spacing">
      <div className="global-container text-center">


        {/* Heading */}
        <h2 className="section-heading text-gray-900 mt-4 leading-tight">
          How to Place an Order
        </h2>

        {/* Subtext */}
        <p className="global-paragraph text-gray-500 mt-6 max-w-2xl mx-auto leading-relaxed">
          Getting started is quick and simple. Just follow these steps to boost your
          social media engagement.
        </p>

        {/* Cards - 5 columns on desktop, 2 columns on tablet, 1 column on mobile */}
        <div className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="relative bg-white border border-gray-200 global-card text-left transition-all duration-300 p-6 sm:p-6"
            >

              {/* Step Badge */}
              <span className="absolute -top-3.5 sm:-top-4 left-5 bg-pink-500 text-white text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md">
                {item.step}
              </span>

              {/* Big Number */}
              <h3 className="text-5xl sm:text-6xl font-extrabold text-pink-100 tracking-tight">
                {item.number}
              </h3>

              {/* Title */}
              <h4 className="mt-3 sm:mt-5 text-base sm:text-lg font-semibold text-gray-900">
                {item.title}
              </h4>

              {/* Description */}
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>

              {/* Glow Effect Layer */}
              <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition duration-300 pointer-events-none 
              bg-gradient-to-br from-pink-200/20 to-pink-500/10 blur-xl"></div>
            </motion.div>
          ))}
        </div>

        {/* ── Boost Your Profile CTA Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-10 sm:mt-16 w-full max-w-5xl mx-auto blob-border-card"
        >
          {/* Animated Blobs along borders */}
          <div className="blob-border-blob" />
          <div className="blob-border-blob" style={{ animationDelay: '-2.5s', opacity: 0.8 }} />

          {/* Inner Content Card (bg) */}
          <div className="blob-border-bg px-3 py-6 sm:py-10 sm:px-8 text-center flex flex-col items-center justify-center">
            {/* Decorative Glow */}
            <div className="absolute -top-12 -left-12 w-32 sm:w-44 h-32 sm:h-44 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-32 sm:w-44 h-32 sm:h-44 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Title */}
            <h3 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2 sm:mb-3">
              Boost Your Profile Now
            </h3>

            {/* Subtext */}
            <p className="text-xs sm:text-lg font-medium text-gray-600 max-w-xl mx-auto mb-4 sm:mb-8 leading-relaxed px-2">
              Want to enhance your profile? Yes! You are in the right spot.
            </p>

            {/* CTA Button */}
            {/* <button
              onClick={() => {
                document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center px-9 py-4 rounded-full text-white font-bold text-base sm:text-lg bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-purple-700 shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Choose Service
            </button> */}

            {/* Quick Access Services (Slow Infinite Loop) */}
            <div className="mt-1 sm:mt-4 w-full overflow-hidden relative pause-hover select-none touch-pan-y [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
              <div className="animate-marquee gap-2 sm:gap-3 flex py-1.5 sm:py-2 items-center">
                {[...quickServices, ...quickServices, ...quickServices, ...quickServices].map((service, idx) => (
                  <Link
                    key={idx}
                    to={service.path}
                    className="group inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-white hover:bg-pink-50/70 text-gray-700 hover:text-pink-600 text-xs sm:text-sm font-semibold border border-gray-200/90 hover:border-pink-300 shadow-sm hover:shadow-md hover:shadow-pink-500/15 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gray-50 group-hover:bg-white transition-colors shrink-0 text-[10px] sm:text-xs">
                      {service.icon}
                    </span>
                    <span className="text-xs sm:text-sm">{service.name}</span>
                    <span className="text-gray-300 group-hover:text-pink-500 group-hover:translate-x-0.5 transition-all text-[10px] sm:text-xs font-bold">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}