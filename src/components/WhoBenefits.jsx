export default function WhoBenefits() {
  const beneficiaries = [
    {
      title: 'Content Creators',
      description: 'Boost your online presence and reach a larger audience with increased engagement.',
      icon: '🎬',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Influencers',
      description: 'Increase your engagement to attract more brand deals and partnerships.',
      icon: '⭐',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Small Businesses',
      description: 'Build trust with potential customers by boosting your social media presence.',
      icon: '🏪',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Entrepreneurs',
      description: 'Expand your reach and establish credibility in your industry.',
      icon: '💼',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: 'Musicians & Artists',
      description: 'Showcase your talent to a wider audience and grow your fanbase.',
      icon: '🎵',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Educators',
      description: 'Share your knowledge with more students and build an educational community.',
      icon: '📚',
      gradient: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Who Can Benefit From Our Services
          </h2>
          <p className="text-lg text-gray-800 max-w-4xl mx-auto leading-relaxed">
            Our services are beneficial to a wide range of users in different industries.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {beneficiaries.map((item, index) => (
            <div 
              key={index}
              className="bg-white/50 backdrop-blur-xl rounded-3xl border border-white/60 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              {/* Icon with gradient background */}
              <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {item.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-black mb-4">{item.title}</h3>
              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="text-center bg-gradient-to-r from-[#FF6B35]/10 to-[#FFA500]/10 backdrop-blur-xl rounded-3xl border border-white/60 p-8 shadow-lg">
          <p className="text-xl text-gray-800 font-medium">
            Regardless of your niche and audience, our services can greatly boost your online content.
          </p>
        </div>

      </div>
    </div>
  );
}
