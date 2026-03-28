import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import instagramIcon from '../assets/icons/insta.png'
import youtubeIcon from '../assets/icons/yt.png'
import facebookIcon from '../assets/icons/fb.png'
import tiktokIcon from '../assets/icons/tiktok.png';

export default function Hero() {
  const navigate = useNavigate()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showBlast, setShowBlast] = useState(false)

  useEffect(() => {
    // Check if user has visited before
    const visited = localStorage.getItem('hasVisitedHeroBefore')
    if (!visited) {
      // First time visitor - trigger blast after a short delay
      const timer = setTimeout(() => {
        setShowBlast(true)
        localStorage.setItem('hasVisitedHeroBefore', 'true')
        
        // Hide blast after animation completes
        setTimeout(() => {
          setShowBlast(false)
        }, 3000)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="relative min-h-screen overflow-hidden pt-12 sm:pt-20 pb-12 sm:pb-20" onMouseMove={handleMouseMove}>
      <style>{`.card-shadow { box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15); }`}</style>

      {/* Blast Animation Overlay - Only in Hero Section */}
      {showBlast && (
        <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
          {/* Color Blast from Get Started Button */}
          <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {/* Main blast circle */}
            <div className="absolute inset-0 animate-ping">
              <div className="w-20 h-20 bg-gradient-to-r from-[#FF6B35] to-[#FFA500] rounded-full opacity-90 animate-pulse"></div>
            </div>
            
            {/* Secondary blast circles */}
            <div className="absolute inset-0 animate-ping animation-delay-300">
              <div className="w-32 h-32 bg-gradient-to-r from-[#FFB3D9] to-[#FF6B35] rounded-full opacity-70 animate-pulse"></div>
            </div>
            
            <div className="absolute inset-0 animate-ping animation-delay-600">
              <div className="w-48 h-48 bg-gradient-to-r from-[#FFE5D9] to-[#FFB3D9] rounded-full opacity-50 animate-pulse"></div>
            </div>
            
            <div className="absolute inset-0 animate-ping animation-delay-900">
              <div className="w-64 h-64 bg-gradient-to-r from-[#FFF5E6] to-[#FFE5D9] rounded-full opacity-30 animate-pulse"></div>
            </div>
          </div>
          
          {/* Spreading Color Waves */}
          <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {/* Wave 1 */}
            <div className="animate-ping animation-delay-1200">
              <div className="w-80 h-80 border-4 border-[#FF6B35] rounded-full opacity-60"></div>
            </div>
            
            {/* Wave 2 */}
            <div className="animate-ping animation-delay-1500">
              <div className="w-96 h-96 border-4 border-[#FFA500] rounded-full opacity-40"></div>
            </div>
            
            {/* Wave 3 */}
            <div className="animate-ping animation-delay-1800">
              <div className="w-[500px] h-[500px] border-4 border-[#FFB3D9] rounded-full opacity-30"></div>
            </div>
          </div>
          
          {/* Particle Effects radiating from button */}
          <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-gradient-to-r from-[#FF6B35] to-[#FFA500] rounded-full animate-ping"
                style={{
                  transform: `rotate(${i * 45}deg) translateX(80px)`,
                  animationDelay: `${i * 150 + 2100}ms`,
                  animationDuration: '1.5s'
                }}
              ></div>
            ))}
          </div>
          
          {/* Sparkle Effects around the hero area */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full animate-ping"
                style={{
                  top: `${30 + Math.random() * 40}%`,
                  left: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 1500 + 1500}ms`,
                  animationDuration: `${Math.random() * 800 + 600}ms`
                }}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* Decorative backgrounds */}
      <div className="absolute top-0 left-0 w-full h-[900px] overflow-hidden pointer-events-none z-0">
        <div className="absolute left-0 top-0 w-[300px] sm:w-[450px] h-full">
          <svg className="w-full h-full" viewBox="0 0 450 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0 C180 120, 140 280, 200 450 C260 620, 160 750, 120 900 L0 900 Z" fill="url(#leftGradient)" />
            <defs><linearGradient id="leftGradient" x1="0%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.5" /><stop offset="30%" stopColor="#FFB3D9" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#FFE5D9" stopOpacity="0.3" /><stop offset="100%" stopColor="#FFE5D9" stopOpacity="0" />
            </linearGradient></defs>
          </svg>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-full h-[900px] overflow-hidden pointer-events-none z-0">
        <div className="absolute right-0 top-0 w-[300px] sm:w-[450px] h-full">
          <svg className="w-full h-full" viewBox="0 0 450 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M450 0 C270 120, 310 280, 250 450 C190 620, 290 750, 330 900 L450 900 Z" fill="url(#rightGradient)" />
            <defs><linearGradient id="rightGradient" x1="100%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFA500" stopOpacity="0.5" /><stop offset="30%" stopColor="#FFB3D9" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#FFFACD" stopOpacity="0.3" /><stop offset="100%" stopColor="#FFFACD" stopOpacity="0" />
            </linearGradient></defs>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Hero Content */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-white/40 rounded-full px-4 py-2 mb-6 sm:mb-8 shadow-xl">
            <div className="w-2 h-2 bg-[#FFA500] rounded-full"></div>
            <span className="text-xs sm:text-sm font-medium text-black">Trusted by Creators Worldwide</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-black">
            Turn Your Social Profiles Into Powerful Platforms
          </h1>
          <p className="text-sm sm:text-lg text-gray-800 max-w-3xl mx-auto mb-8 sm:mb-10 px-2">
            Grow your audience and increase engagement across TikTok, Instagram, Facebook, and YouTube with reliable social media growth services.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-20">
            <button onClick={() => navigate('/tiktok')} className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FFA500] text-white rounded-full font-semibold hover:shadow-lg hover:shadow-[#FF6B35]/40 transition-all hover:scale-105">
              Get Started Now
            </button>
          </div>
        </div>

        {/* Profile Cards - Desktop fan layout, mobile horizontal scroll */}
        <div className="hidden lg:block relative h-96 mb-20">
          {/* Floating social icons - desktop only */}
          <div className="absolute top-8 left-8 z-40 rotate-[-25deg]" style={{ transform: `translate(${(mousePosition.x - 400) * 0.01}px, ${(mousePosition.y - 300) * 0.01}px) rotate(-25deg)` }}>
            <img src={tiktokIcon} alt="TikTok" className="w-12 h-12 drop-shadow-lg" />
          </div>
          <div className="absolute top-8 right-12 z-40 rotate-[30deg]" style={{ transform: `translate(${(mousePosition.x - 800) * -0.015}px, ${(mousePosition.y - 150) * 0.012}px) rotate(30deg)` }}>
            <img src={instagramIcon} alt="Instagram" className="w-14 h-14 drop-shadow-lg" />
          </div>
          <div className="absolute bottom-4 left-2 z-40 rotate-[-15deg]" style={{ transform: `translate(${(mousePosition.x - 300) * 0.012}px, ${(mousePosition.y - 600) * -0.01}px) rotate(-15deg)` }}>
            <img src={facebookIcon} alt="Facebook" className="w-16 h-16 drop-shadow-lg" />
          </div>
          <div className="absolute bottom-8 right-2 z-40 rotate-[20deg]" style={{ transform: `translate(${(mousePosition.x - 900) * -0.01}px, ${(mousePosition.y - 650) * -0.015}px) rotate(20deg)` }}>
            <img src={youtubeIcon} alt="YouTube" className="w-16 h-16 drop-shadow-lg" />
          </div>

          <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center h-full">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 rotate-[-15deg] z-[5]">
              <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl shadow-2xl border border-white/60 p-4 card-shadow w-64 h-80 overflow-hidden">
                <div className="w-full h-72 bg-white rounded-2xl overflow-hidden"><img src="/src/assets/images/1.png" alt="User" className="w-full h-full object-cover" /></div>
              </div>
            </div>
            <div className="absolute left-36 top-1/2 -translate-y-1/2 rotate-[-8deg] z-10">
              <div className="bg-gradient-to-br from-pink-400 to-orange-500 rounded-3xl shadow-2xl border border-white/60 p-4 card-shadow w-72 h-88 overflow-hidden">
                <div className="w-full h-80 bg-white rounded-2xl overflow-hidden"><img src="/src/assets/images/2.png" alt="User" className="w-full h-full object-cover" /></div>
              </div>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl shadow-2xl border-4 border-white/70 p-5 card-shadow w-80 h-96 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-full h-64 bg-white rounded-2xl overflow-hidden mb-4"><img src="/src/assets/images/5.png" alt="User" className="w-full h-full object-cover" /></div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    </div>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute right-36 top-1/2 -translate-y-1/2 rotate-[8deg] z-10">
              <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-3xl shadow-2xl border border-white/60 p-4 card-shadow w-72 h-88 overflow-hidden">
                <div className="w-full h-80 bg-white rounded-2xl overflow-hidden"><img src="/src/assets/images/4.png" alt="User" className="w-full h-full object-cover" /></div>
              </div>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-[15deg] z-[5]">
              <div className="bg-gradient-to-br from-yellow-400 to-red-500 rounded-3xl shadow-2xl border border-white/60 p-4 card-shadow w-64 h-80 overflow-hidden">
                <div className="w-full h-72 bg-white rounded-2xl overflow-hidden"><img src="/src/assets/images/3.png" alt="User" className="w-full h-full object-cover" /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile cards - horizontal scroll */}
        <div className="lg:hidden mb-12">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory px-2 -mx-2">
            {[
              { img: '/src/assets/images/1.png', gradient: 'from-blue-400 to-purple-500' },
              { img: '/src/assets/images/2.png', gradient: 'from-pink-400 to-orange-500' },
              { img: '/src/assets/images/5.png', gradient: 'from-purple-500 to-purple-600' },
              { img: '/src/assets/images/4.png', gradient: 'from-green-400 to-teal-500' },
              { img: '/src/assets/images/3.png', gradient: 'from-yellow-400 to-red-500' },
            ].map((card, i) => (
              <div key={i} className={`flex-shrink-0 snap-center bg-gradient-to-br ${card.gradient} rounded-2xl shadow-xl border border-white/60 p-3 w-48 h-64 overflow-hidden`}>
                <div className="w-full h-full bg-white rounded-xl overflow-hidden">
                  <img src={card.img} alt="User" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA and Services */}
        <div className="max-w-6xl mx-auto px-2 sm:px-6 text-center mb-12 sm:mb-20">
          <div className="mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">Start Your Growth Journey</h2>
          </div>
          <div className="bg-white/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/50 p-6 sm:p-8 md:p-12 shadow-2xl">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6">Our Social Media Growth Services</h3>
            <p className="text-sm sm:text-lg text-gray-800 max-w-4xl mx-auto leading-relaxed">
              Increase social media engagement, visibility and credibility across multiple platforms. Enhance your social presence and get the attention your content deserves.
            </p>
            <div className="mt-6 sm:mt-8">
              <button onClick={() => navigate('/tiktok')} className="px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-[#FF6B35] to-[#FFA500] text-white rounded-full font-semibold text-base sm:text-lg hover:shadow-lg hover:shadow-[#FF6B35]/40 transition-all hover:scale-105">
                Explore Our Services
              </button>
            </div>
          </div>
        </div>

        {/* Platform phones - responsive grid */}
        <div className="max-w-7xl mx-auto px-2 sm:px-6 mb-12 sm:mb-20">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 items-start justify-items-center">
            {[
              { name: 'TikTok', icon: tiktokIcon, desc: 'Boost your TikTok presence and reach a wider audience.', buttons: ['Buy TikTok followers', 'Buy TikTok likes', 'Buy TikTok views'], btnClass: 'bg-black hover:bg-gray-800', path: '/tiktok', bgColor: 'bg-gradient-to-br from-pink-50 to-rose-50' },
              { name: 'Instagram', icon: instagramIcon, desc: 'Strengthen your Instagram and attract more attention.', buttons: ['Buy Instagram followers', 'Buy Instagram likes', 'Buy Instagram views'], btnClass: 'bg-gradient-to-r from-pink-500 to-rose-500', path: '/instagram', bgColor: 'bg-gradient-to-br from-pink-50 to-purple-50' },
              { name: 'YouTube', icon: youtubeIcon, desc: 'Gain more visibility and grow your subscriber base.', buttons: ['Buy YouTube subscribers', 'Buy YouTube views', 'Buy YouTube likes'], btnClass: 'bg-red-600 hover:bg-red-700', path: '/youtube', bgColor: 'bg-gradient-to-br from-red-50 to-pink-50' },
              { name: 'Facebook', icon: facebookIcon, desc: 'Build a stronger Facebook presence and engagement.', buttons: ['Buy Facebook followers', 'Buy Facebook likes', 'Buy Facebook views'], btnClass: 'bg-blue-600 hover:bg-blue-700', path: '/facebook', bgColor: 'bg-gradient-to-br from-blue-50 to-pink-50' },
            ].map((platform) => (
              <div key={platform.name} onClick={() => navigate(platform.path)}
                className={`${platform.bgColor} backdrop-blur-xl rounded-[2rem] sm:rounded-[3rem] border-4 sm:border-8 border-gray-900 shadow-2xl p-3 sm:p-4 w-full max-w-[250px] sm:max-w-[260px] h-[380px] sm:h-[500px] flex flex-col relative hover:scale-105 transition-all duration-300 cursor-pointer`}>
                <div className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-4 sm:h-7 bg-gray-900 rounded-b-2xl sm:rounded-b-3xl flex items-center justify-center">
                  <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-gray-700 rounded-full"></div>
                </div>
                <div className="flex flex-col h-full pt-6 sm:pt-8 px-1 sm:px-2">
                  <div className="flex items-center justify-center gap-2 mb-3 sm:mb-6">
                    <img src={platform.icon} alt={platform.name} className="w-6 h-6 sm:w-8 sm:h-8" />
                    <h4 className="text-sm sm:text-lg font-bold text-black">{platform.name}</h4>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-600 mb-4 sm:mb-8 leading-relaxed text-center">{platform.desc}</p>
                  <div className="space-y-2 sm:space-y-4 mt-auto mb-3 sm:mb-6">
                    {platform.buttons.map((btn, i) => (
                      <button key={i} className={`w-full px-2 sm:px-4 py-2 sm:py-3 ${platform.btnClass} text-white rounded-xl sm:rounded-2xl text-[10px] sm:text-sm font-medium transition-all shadow-lg hover:scale-105`}>
                        {btn}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-center"><div className="w-20 sm:w-32 h-0.5 sm:h-1 bg-gray-400 rounded-full"></div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        .animation-delay-900 { animation-delay: 900ms; }
        .animation-delay-1200 { animation-delay: 1200ms; }
        .animation-delay-1500 { animation-delay: 1500ms; }
        .animation-delay-1800 { animation-delay: 1800ms; }
        
        @keyframes hero-blast {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(0.7) rotate(180deg); opacity: 0.8; }
          100% { transform: scale(1.2) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
