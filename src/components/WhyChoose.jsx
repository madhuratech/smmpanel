export default function WhyChoose() {
  const features = [
    {
      title: 'Reliable Growth',
      description: 'We focus on steady and dependable delivery so your followers, likes, and views appear naturally and consistently.',
      icon: '📈',
      gradient: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-400 to-cyan-500',
      size: 'large',
      textColor: 'text-white'
    },
    {
      title: 'All Major Platforms Covered',
      description: 'Grow your presence across TikTok, Instagram, YouTube, and Facebook from one place without managing multiple services.',
      icon: '🌐',
      gradient: 'from-slate-700 to-slate-900',
      bgColor: 'bg-gradient-to-br from-slate-700 to-slate-900',
      size: 'medium',
      textColor: 'text-white'
    },
    {
      title: 'Quick Start, No Complications',
      description: 'Choose your platform, select your service, and place your order. The process is simple and takes only a few moments.',
      icon: '⚡',
      gradient: 'from-orange-400 to-pink-400',
      bgColor: 'bg-gradient-to-br from-orange-400 to-pink-400',
      size: 'large',
      textColor: 'text-white'
    },
    {
      title: 'Fast Processing',
      description: 'Engagement begins processing quickly, so your content can gain attention at the right time.',
      icon: '🚀',
      gradient: 'from-teal-400 to-blue-500',
      bgColor: 'bg-gradient-to-br from-teal-400 to-blue-500',
      size: 'small',
      textColor: 'text-white'
    },
    {
      title: 'Flexible Growth Options',
      description: 'Whether you want followers, likes, or views, our services allow you to choose what best supports your goals.',
      icon: '🎯',
      gradient: 'from-pink-400 to-rose-400',
      bgColor: 'bg-gradient-to-br from-pink-400 to-rose-400',
      size: 'small',
      textColor: 'text-white'
    },
    {
      title: 'Safe and Secure',
      description: 'We never ask for passwords or sensitive login details, keeping your account safe while you grow.',
      icon: '🔒',
      gradient: 'from-blue-500 to-purple-600',
      bgColor: 'bg-gradient-to-br from-blue-500 to-purple-600',
      size: 'medium',
      textColor: 'text-white'
    },
    {
      title: 'Built for Creators and Brands',
      description: 'From influencers and creators to businesses and entrepreneurs, our services support anyone looking to strengthen their social presence.',
      icon: '✨',
      gradient: 'from-purple-500 to-pink-600',
      bgColor: 'bg-gradient-to-br from-purple-500 to-pink-600',
      size: 'medium',
      textColor: 'text-white'
    },
    {
      title: '24/7 Customer Support',
      description: 'Our dedicated support team is available around the clock to help you with any questions or concerns about your growth journey.',
      icon: '💬',
      gradient: 'from-emerald-400 to-teal-500',
      bgColor: 'bg-gradient-to-br from-emerald-400 to-teal-500',
      size: 'medium',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Why Choose Booster
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Discover what makes our social media growth services the perfect choice for creators, influencers, and businesses.
          </p>
        </div>

        {/* Masonry Grid Layout - 3+2 Layout */}
        <div className="space-y-4">
          
          {/* Top Row - 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Card 1 - Large Feature Card */}
            <div className="group cursor-pointer">
              <div className={`${features[0].bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden h-56`}>
                {/* Category Label */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-medium text-white/70 uppercase tracking-wider">GROWTH</span>
                </div>
                
                {/* Main Icon - Centered */}
                <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <div className="text-3xl">{features[0].icon}</div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 pt-8">
                  <h3 className={`text-xl font-bold mb-3 ${features[0].textColor} leading-tight`}>
                    {features[0].title}
                  </h3>
                  <p className={`${features[0].textColor} opacity-80 text-sm leading-relaxed`}>
                    {features[0].description}
                  </p>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              </div>
            </div>

            {/* Card 2 - Dark Architecture Style */}
            <div className="group cursor-pointer">
              <div className={`${features[1].bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden h-56`}>
                {/* Category Label */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-medium text-white/70 uppercase tracking-wider">PLATFORMS</span>
                </div>
                
                {/* Geometric Pattern */}
                <div className="absolute bottom-4 right-4 w-20 h-20">
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 border-4 border-white/20 rounded-lg transform rotate-12"></div>
                    <div className="absolute inset-2 border-4 border-white/30 rounded-lg transform -rotate-12"></div>
                    <div className="absolute inset-4 border-4 border-white/40 rounded-lg"></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 pt-8">
                  <h3 className={`text-xl font-bold mb-3 ${features[1].textColor} leading-tight`}>
                    {features[1].title}
                  </h3>
                  <p className={`${features[1].textColor} opacity-80 text-sm leading-relaxed`}>
                    {features[1].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 - Warm Tone with Hand Gesture */}
            <div className="group cursor-pointer">
              <div className={`${features[2].bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden h-56`}>
                {/* Category Label */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-medium text-white/70 uppercase tracking-wider">SPEED</span>
                </div>
                
                {/* Abstract Hand/Gesture Element */}
                <div className="absolute bottom-0 right-0 w-24 h-24 opacity-30">
                  <div className="w-full h-full bg-white/20 rounded-tl-full"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/30 rounded-full"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 pt-8">
                  <h3 className={`text-xl font-bold mb-3 ${features[2].textColor} leading-tight`}>
                    {features[2].title}
                  </h3>
                  <p className={`${features[2].textColor} opacity-80 text-sm leading-relaxed`}>
                    {features[2].description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Card 4 - Fast Processing */}
            <div className="group cursor-pointer">
              <div className={`${features[3].bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden h-48`}>
                {/* Category Label */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-medium text-white/70 uppercase tracking-wider">PROCESSING</span>
                </div>
                
                {/* Rocket Icon */}
                <div className="absolute bottom-6 left-6 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <div className="text-2xl">{features[3].icon}</div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 pt-8">
                  <h3 className={`text-lg font-bold mb-2 ${features[3].textColor} leading-tight`}>
                    {features[3].title}
                  </h3>
                  <p className={`${features[3].textColor} opacity-80 text-sm`}>
                    {features[3].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 5 - Flexible Growth Options */}
            <div className="group cursor-pointer">
              <div className={`${features[4].bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden h-48`}>
                {/* Category Label */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-medium text-white/70 uppercase tracking-wider">OPTIONS</span>
                </div>
                
                {/* Target Icon */}
                <div className="absolute bottom-6 left-6 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <div className="text-2xl">{features[4].icon}</div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 pt-8">
                  <h3 className={`text-lg font-bold mb-2 ${features[4].textColor} leading-tight`}>
                    {features[4].title}
                  </h3>
                  <p className={`${features[4].textColor} opacity-80 text-sm`}>
                    {features[4].description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Third Row - 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Card 6 - Safe and Secure */}
            <div className="group cursor-pointer">
              <div className={`${features[5].bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden h-56`}>
                {/* Category Label */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-medium text-white/70 uppercase tracking-wider">SECURITY</span>
                </div>
                
                {/* Security Shield Pattern */}
                <div className="absolute bottom-4 right-4 w-20 h-20">
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
                    <div className="absolute inset-3 border-2 border-white/30 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl opacity-30">{features[5].icon}</div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 pt-8">
                  <h3 className={`text-xl font-bold mb-3 ${features[5].textColor} leading-tight`}>
                    {features[5].title}
                  </h3>
                  <p className={`${features[5].textColor} opacity-80 text-sm leading-relaxed`}>
                    {features[5].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 7 - Built for Creators and Brands */}
            <div className="group cursor-pointer">
              <div className={`${features[6].bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden h-56`}>
                {/* Category Label */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-medium text-white/70 uppercase tracking-wider">CREATORS</span>
                </div>
                
                {/* Star Burst Pattern */}
                <div className="absolute bottom-0 right-0 w-24 h-24 opacity-30">
                  <div className="w-full h-full relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white/40 rounded-full"></div>
                    <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full"></div>
                    <div className="absolute bottom-2 left-2 w-3 h-3 bg-white/20 rounded-full"></div>
                    <div className="absolute top-6 left-6 w-1 h-1 bg-white/50 rounded-full"></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 pt-8">
                  <h3 className={`text-xl font-bold mb-3 ${features[6].textColor} leading-tight`}>
                    {features[6].title}
                  </h3>
                  <p className={`${features[6].textColor} opacity-80 text-sm leading-relaxed`}>
                    {features[6].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 8 - 24/7 Customer Support */}
            <div className="group cursor-pointer">
              <div className={`${features[7].bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden h-56`}>
                {/* Category Label */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-medium text-white/70 uppercase tracking-wider">SUPPORT</span>
                </div>
                
                {/* Chat Bubble Pattern */}
                <div className="absolute bottom-0 right-0 w-24 h-24 opacity-30">
                  <div className="w-full h-full relative">
                    <div className="absolute bottom-4 right-4 w-12 h-8 bg-white/20 rounded-2xl"></div>
                    <div className="absolute bottom-2 right-6 w-8 h-6 bg-white/30 rounded-xl"></div>
                    <div className="absolute bottom-1 right-8 w-2 h-2 bg-white/40 rounded-full"></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 pt-8">
                  <h3 className={`text-xl font-bold mb-3 ${features[7].textColor} leading-tight`}>
                    {features[7].title}
                  </h3>
                  <p className={`${features[7].textColor} opacity-80 text-sm leading-relaxed`}>
                    {features[7].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <button className="px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FFA500] text-white rounded-full font-semibold text-base hover:shadow-lg hover:shadow-[#FF6B35]/40 transition-all hover:scale-105">
            Get Started Today
          </button>
        </div>

      </div>
    </div>
  );
}
