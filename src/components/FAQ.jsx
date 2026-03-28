import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What service does Booster provide?',
      answer: 'We have TikTok, Instagram, YouTube, and Facebook social media growth services, such as, but not limited to, followers, likes, views, and engagement.'
    },
    {
      question: 'When does my order start?',
      answer: 'Most of our orders are processed within minutes of you placing an order. However, delivery speed varies depending on the service and how many you ordered.'
    },
    {
      question: 'Do I have to give you my account password?',
      answer: 'No. We do not ask for passwords or any kind of sensitive login information. All we need is only the link to your profile or the content you would like to grow.'
    },
    {
      question: 'What are the platforms I can grow using these services?',
      answer: 'Our services will allow you to grow your account on TikTok, Instagram, YouTube, and Facebook.'
    },
    {
      question: 'Who are these services for?',
      answer: 'Anyone who wants to grow their social media engagement and presence can benefit from our services, especially creators, influencers, and business owners.'
    }
  ];

  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/30 transition-colors"
              >
                <span className="text-lg font-bold text-black pr-8">{faq.question}</span>
                <svg 
                  className={`w-6 h-6 text-[#FF6B35] transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-8 pb-6 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
