import { motion } from "framer-motion";

export default function Steps() {
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
        <div className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="relative bg-white border border-gray-200 global-card text-left transition-all duration-300"
            >

              {/* Step Badge */}
              <span className="absolute -top-4 left-5 bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                {item.step}
              </span>

              {/* Big Number */}
              <h3 className="text-6xl font-extrabold text-pink-100 tracking-tight">
                {item.number}
              </h3>

              {/* Title */}
              <h4 className="mt-5 text-lg font-semibold text-gray-900">
                {item.title}
              </h4>

              {/* Description */}
              <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>

              {/* Glow Effect Layer */}
              <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition duration-300 pointer-events-none 
              bg-gradient-to-br from-pink-200/20 to-pink-500/10 blur-xl"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}