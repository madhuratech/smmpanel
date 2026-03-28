export default function HowToOrder() {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Platform',
      description: 'Select TikTok, Instagram, YouTube, or Facebook',
      icon: '🎯'
    },
    {
      number: '02',
      title: 'Select Your Service',
      description: 'Pick followers, likes, views, or engagement',
      icon: '✨'
    },
    {
      number: '03',
      title: 'Enter Your Details',
      description: 'Provide your profile link and quantity',
      icon: '📝'
    },
    {
      number: '04',
      title: 'Complete Order',
      description: 'Checkout and start processing',
      icon: '✅'
    }
  ];

  return (
    <div className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            How to Place an Order
          </h2>
          <p className="text-lg text-gray-800 max-w-3xl mx-auto leading-relaxed">
            Getting started is quick and simple. Just follow these steps to boost your social media engagement.
          </p>
        </div>

        {/* Flowing Steps Design */}
        <div className="relative">
          
          {/* Connecting Dotted Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dotted border-gray-400 transform -translate-x-1/2 hidden lg:block"></div>
          
          {/* Steps */}
          <div className="space-y-16">
            
            {/* Step 1 - Right Side */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              <div className="lg:w-1/2 lg:text-right lg:pr-16">
                <div className="bg-gradient-to-r from-[#FF6B35] to-[#FFA500] rounded-full px-8 py-4 inline-flex items-center gap-4 shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">{steps[0].icon}</span>
                  </div>
                  <div className="text-white">
                    <h3 className="text-xl font-bold">{steps[0].title}</h3>
                    <p className="text-sm opacity-90">{steps[0].description}</p>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF6B35] to-[#FFA500] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl">
                  {steps[0].number}
                </div>
              </div>
              
              <div className="lg:w-1/2 lg:pl-16">
                <div className="text-4xl font-bold text-gray-300 lg:text-left text-center">
                  STEP
                </div>
              </div>
            </div>

            {/* Step 2 - Left Side */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              <div className="lg:w-1/2 lg:text-right lg:pr-16">
                <div className="text-4xl font-bold text-gray-300 lg:text-right text-center">
                  STEP
                </div>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FFA500] to-[#FFB3D9] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl">
                  {steps[1].number}
                </div>
              </div>
              
              <div className="lg:w-1/2 lg:pl-16">
                <div className="bg-gradient-to-r from-[#FFA500] to-[#FFB3D9] rounded-full px-8 py-4 inline-flex items-center gap-4 shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">{steps[1].icon}</span>
                  </div>
                  <div className="text-white">
                    <h3 className="text-xl font-bold">{steps[1].title}</h3>
                    <p className="text-sm opacity-90">{steps[1].description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 - Right Side */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              <div className="lg:w-1/2 lg:text-right lg:pr-16">
                <div className="bg-gradient-to-r from-[#FFB3D9] to-[#FF6B9D] rounded-full px-8 py-4 inline-flex items-center gap-4 shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">{steps[2].icon}</span>
                  </div>
                  <div className="text-white">
                    <h3 className="text-xl font-bold">{steps[2].title}</h3>
                    <p className="text-sm opacity-90">{steps[2].description}</p>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FFB3D9] to-[#FF6B9D] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl">
                  {steps[2].number}
                </div>
              </div>
              
              <div className="lg:w-1/2 lg:pl-16">
                <div className="text-4xl font-bold text-gray-300 lg:text-left text-center">
                  STEP
                </div>
              </div>
            </div>

            {/* Step 4 - Left Side */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              <div className="lg:w-1/2 lg:text-right lg:pr-16">
                <div className="text-4xl font-bold text-gray-300 lg:text-right text-center">
                  STEP
                </div>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF6B9D] to-[#8B5CF6] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl">
                  {steps[3].number}
                </div>
              </div>
              
              <div className="lg:w-1/2 lg:pl-16">
                <div className="bg-gradient-to-r from-[#FF6B9D] to-[#8B5CF6] rounded-full px-8 py-4 inline-flex items-center gap-4 shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">{steps[3].icon}</span>
                  </div>
                  <div className="text-white">
                    <h3 className="text-xl font-bold">{steps[3].title}</h3>
                    <p className="text-sm opacity-90">{steps[3].description}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-20 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 p-8 shadow-lg max-w-4xl mx-auto">
          <p className="text-gray-800 text-lg leading-relaxed">
            Once confirmed, your selected engagement will start appearing on your profile or content.
          </p>
        </div>

      </div>
    </div>
  );
}
