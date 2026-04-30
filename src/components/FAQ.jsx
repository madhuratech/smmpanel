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
      question: "Can I order multiple services at the same time?",
      answer:
        "Of course, yes! You can combine followers, likes, views, and comments to set a balanced growth strategy and yield better results from it",
    },
    {
      question: "What if I face an issue with my order?",
      answer:
        "Don’t get tense! TikyTop provides 24*7 customer support to resolve any issues or concerns as soon as possible.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-b from-pink-50 to-white py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

        {/* LEFT */}
        <div className="space-y-6">
          <span className="inline-block px-5 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-medium">
            FAQs
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Frequently asked <br /> question
          </h2>

          <p className="text-gray-500 text-lg max-w-lg">
            Everything you need to know to get started and solve common issues.
          </p>

        
        </div>

        {/* RIGHT */}
        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "shadow-lg border-pink-200"
                    : "shadow-sm border-gray-100"
                }`}
              >
                {/* HEADER */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-8 py-6"
                >
                  <span className="text-lg font-semibold text-gray-800">
                    {faq.question}
                  </span>

                  {/* ICON ANIMATION */}
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-pink-500"
                  >
                    <Plus size={22} />
                  </motion.div>
                </button>

                {/* CONTENT ANIMATION */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 text-gray-600 text-base leading-relaxed">
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
    </section>
  );
}