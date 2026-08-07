import { Check } from "lucide-react";

export default function WhyUSer() {
  const features = [
    {
      title: "Ideal for Everyone",
      desc: "Everyone starts somewhere, and growth takes time. TikyTop is there to support you at every stage, whether you are new or already posting regularly.",
    },
    {
      title: "Make Every Post Count",
      desc: "Every post you create deserves attention. TikTok gives each post a better chance to perform well and lets you sustain the competition. ",
    },
    {
      title: "Grow at Your Own Pace",
      desc: "There’s no pressure to go big instantly. You can take it step by step and grow your account in a way that feels right.",
    },
    {
      title: "Stay Consistent, See Results",
      desc: "When your posts start getting attention, it becomes easier to keep going. TikyTop helps you stay on track without feeling stuck.",
    },
  ];

  return (
    <section className="bg-[#f7f7f9] section-spacing">
      {/* Header */}
      <div className="global-container text-center">
  
        <h2 className="section-heading font-bold text-gray-900 leading-tight">
          Why Social Media Users{" "}
          <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Love TikyTop
          </span>
        </h2>

        <p className="mt-4 text-gray-500 global-paragraph">
          At the end of the day, people want something easy and effective. TikyTop keeps things simple while helping your profile look more engaging.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto px-4">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-white border border-gray-200 global-card transition duration-300"
          >
            {/* Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
              <Check className="text-white w-5 h-5" />
            </div>

            {/* Text */}
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}