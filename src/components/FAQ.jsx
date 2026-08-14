import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What service does Tikytop provide?",
      answer:
        "We offer TikTok, Instagram, YouTube, and Facebook social media growth services, including but not limited to followers, likes, views, and engagement.",
    },
    {
      question: "Do I have to give you my account password?",
      answer:
        "No. We do not ask for passwords or any kind of sensitive login information. All we need is only the link to your profile or the content you would like to grow.",
    },
    {
      question: "When does my order start being delivered?",
      answer:
        "Most of our orders are processed within minutes of you placing an order. However, delivery speed varies depending on the service and how many you ordered.",
    },
    {
      question: "Can Tikytop help if my account growth is stuck?",
      answer:
        "Absolutely. Tikytop is commonly used by creators who are experiencing slow or stagnant growth and need an initial push.",
    },
    {
      question: " Can I choose how many followers or likes I want?",
      answer:
        "Yes, Tikytop offers flexible packages so you can select the amount that fits your needs and budget.",
    },
    {
      question: "Can businesses use TikyTop for promotion?",
      answer: "Definitely. Many small businesses use TikyTop to boost product visibility and build social proof on TikTok"
    },
    {
      question: "Can I order multiple services at the same time?",
      answer:
        "Of course, yes! You can combine followers, likes, views, and comments to set a balanced growth strategy and yield better results from it",
    },
    {
      question: "What if I face an issue with my order?",
      answer:
        "Don’t get tense! TikyTop provides 24*7 customer support to resolve any issues or concerns as soon as possible.",
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section bg-gradient-to-b from-pink-50 to-white section-spacing">
      <style>{`
        .faq-section .global-card {
          padding: 0px !important;
        }
      `}</style>
      <div className="global-container w-full max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Centered Heading above columns */}
        <div className="mb-10 md:mb-14 text-center">
          <h2 className="section-heading text-gray-900 leading-tight text-center md:whitespace-nowrap text-3xl sm:text-4xl md:text-5xl font-bold">
            Frequently asked question
          </h2>
        </div>

        {/* 2-column Grid */}
        <div className="grid lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-16 items-start">

          {/* LEFT */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            {faqs.slice(0, 4).map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={`bg-white global-card border transition-all duration-300 h-auto min-h-0 ${isOpen
                    ? "shadow-lg border-pink-200"
                    : "shadow-sm border-gray-100"
                    }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center px-4 py-4 sm:px-6 sm:py-5 lg:py-7 text-left"
                  >
                    <span className="text-[16px] sm:text-lg font-semibold text-gray-800 pr-4 flex-1 min-w-0">
                      {faq.question}
                    </span>

                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-pink-500 flex-shrink-0"
                    >
                      <Plus size={20} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 sm:px-6 sm:pb-5 lg:pb-7 text-gray-600 text-sm sm:text-base">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* RIGHT */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            {faqs.slice(4, 8).map((faq, index) => {
              const actualIndex = index + 4;

              const isOpen = openIndex === actualIndex;

              return (
                <div
                  key={actualIndex}
                  className={`bg-white global-card border transition-all duration-300 h-auto min-h-0 ${isOpen
                    ? "shadow-lg border-pink-200"
                    : "shadow-sm border-gray-100"
                    }`}
                >
                  <button
                    onClick={() => toggleFAQ(actualIndex)}
                    className="w-full flex justify-between items-center px-4 py-4 sm:px-6 sm:py-5 lg:py-7 text-left"
                  >
                    <span className="text-[16px] sm:text-lg font-semibold text-gray-800 pr-4 flex-1 min-w-0">
                      {faq.question}
                    </span>

                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-pink-500 flex-shrink-0"
                    >
                      <Plus size={20} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 sm:px-6 sm:pb-5 lg:pb-7 text-gray-600 text-sm sm:text-base">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}