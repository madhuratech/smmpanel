import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu as MenuIcon, X, LogOut, Globe } from 'lucide-react';
import { getFromStorage, removeFromStorage } from '../utils';
import TikyTop from "../assets/logos/TikyTop.png";
import HandCursor from "../assets/images/cursor.png";
import {
  FaFacebook,
  FaTelegram,
  FaPinterest,
  FaSpotify,
  FaLinkedin,
  FaReddit,
  FaTwitch,
  FaDiscord,
  FaSnapchat,
  FaSoundcloud,
  FaGoogle,
  FaGlobe,
  FaStar,
} from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [closeTimeout, setCloseTimeout] = useState(null);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navContainerRef = useRef(null);

  const [animState, setAnimState] = useState('idle');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const animTimeouts = useRef([]);

  const clearAllAnimTimeouts = () => {
    animTimeouts.current.forEach(t => clearTimeout(t));
    animTimeouts.current = [];
  };

  const startAnimationSequence = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 1024) {
      setAnimState('done');
      return;
    }
    clearAllAnimTimeouts();
    setAnimState('idle');

    const t1 = setTimeout(() => setAnimState('cursor-appeared'), 1000); // 1s delay
    const t2 = setTimeout(() => setAnimState('moving'), 1400); // 1.2s movement starts after appearing
    const t3 = setTimeout(() => setAnimState('clicking'), 2600); // 150ms click starts
    const t4 = setTimeout(() => setAnimState('clicked-success'), 2750); // 500ms success transition starts
    const t5 = setTimeout(() => setAnimState('fading-out'), 3250); // 300ms fade out starts
    const t6 = setTimeout(() => {
      setAnimState('done');
    }, 3550);

    animTimeouts.current = [t1, t2, t3, t4, t5, t6];
  };

  const hasManuallyClicked = useRef(false);

  useEffect(() => {
    if (animState === 'idle') {
      startAnimationSequence();
    }
  }, [animState]);

  useEffect(() => {
    if (animState === 'done' && !showRegisterModal && !hasManuallyClicked.current) {
      const loopTimeout = setTimeout(() => {
        setAnimState('idle');
      }, 3000); // 
      return () => clearTimeout(loopTimeout);
    }
  }, [animState, showRegisterModal]);

  const handleManualRegisterClick = (e) => {
    if (e) e.preventDefault();
    hasManuallyClicked.current = true;
    clearAllAnimTimeouts();
    setAnimState('done');
    navigate('/register');
  };

  useEffect(() => {
    const loggedInUser = getFromStorage('user');
    setUser(loggedInUser);
  }, [location]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    removeFromStorage('token');
    removeFromStorage('user');
    setUser(null);
    setShowUserMenu(false);
    navigate('/');
  };

  const platforms = [
    {
      name: 'TikTok',
      path: '/tiktok',
      services: [
        { name: 'TikTok Views', service: 'views', path: '/tiktok/buy-views' },
        { name: 'TikTok Followers', service: 'followers' },
        { name: 'TikTok Likes', service: 'likes', path: '/tiktok/buy-likes' },
        { name: 'TikTok Comments', service: 'comments' }
      ]
    },
    {
      name: 'Instagram',
      path: '/instagram',
      services: [
        { name: 'Instagram Followers', service: 'followers' },
        { name: 'Instagram Likes', service: 'likes' },
        { name: 'Instagram Views', service: 'views' },
        { name: 'Instagram Comments', service: 'comments' }
      ]
    },
    {
      name: 'YouTube',
      path: '/youtube',
      services: [
        { name: 'YouTube Views', service: 'views' },
        { name: 'YouTube Subscribers', service: 'subscribers' },
        { name: 'YouTube Likes', service: 'likes' },
        { name: 'YouTube Comments', service: 'comments' }
      ]
    }
  ];

  const freeTrials = [
    { name: 'Free TikTok Views', path: '/tiktok' },
    { name: 'Free Instagram Followers', path: '/instagram' },
    { name: 'Free YouTube Subscribers', path: '/youtube' }
  ];

  const companyLinks = [
    { name: 'About Us', path: '/' },
    { name: 'Contact Support', path: '/' },
    { name: 'Terms of Service', path: '/' }
  ];

  const extraPlatforms = [
    { name: "Facebook", icon: <FaFacebook className="text-[#1877F2]" />, path: "/facebook" },
    { name: "Twitter", icon: <FaXTwitter className="text-black" />, path: "/", state: { selectPlatform: "twitter" } },
    { name: "Telegram", icon: <FaTelegram className="text-[#0088cc]" />, path: "/", state: { selectPlatform: "telegram" } },
    { name: "Pinterest", icon: <FaPinterest className="text-[#E60023]" />, path: "/", state: { selectPlatform: "pinterest" } },
    { name: "Spotify", icon: <FaSpotify className="text-[#1DB954]" />, path: "/", state: { selectPlatform: "spotify" } },
    { name: "LinkedIn", icon: <FaLinkedin className="text-[#0A66C2]" />, path: "/", state: { selectPlatform: "linkedin" } },
    { name: "Reddit", icon: <FaReddit className="text-[#FF4500]" />, path: "/", state: { selectPlatform: "reddit" } },
    { name: "Threads", icon: <FaThreads className="text-black" />, path: "/", state: { selectPlatform: "threads" } },
    { name: "Twitch", icon: <FaTwitch className="text-[#9146FF]" />, path: "/", state: { selectPlatform: "twitch" } },
    { name: "Discord", icon: <FaDiscord className="text-[#5865F2]" />, path: "/", state: { selectPlatform: "discord" } },
    { name: "Snapchat", icon: <FaSnapchat className="text-[#FFFC00]" />, path: "/", state: { selectPlatform: "snapchat" } },
    { name: "SoundCloud", icon: <FaSoundcloud className="text-[#FF5500]" />, path: "/", state: { selectPlatform: "soundcloud" } },
    { name: "Google Reviews", icon: <FaGoogle className="text-[#4285F4]" />, path: "/", state: { selectPlatform: "google" } },
    { name: "Trustpilot", icon: <FaStar className="text-[#00B67A]" />, path: "/", state: { selectPlatform: "trustpilot" } },
    { name: "Website Traffic", icon: <FaGlobe className="text-[#00A86B]" />, path: "/", state: { selectPlatform: "traffic" } }
  ];

  const isActive = (path) => location.pathname === path;

  const handleServiceClick = (service, plat) => {
    navigate(service.path || plat.path, {
      state: { selectedServiceKey: service.service }
    });
    setActiveDropdown(null);
  };

  const handleMouseEnter = (dropdown) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 250);
    setCloseTimeout(timeout);
  };

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const pointerStyle = (() => {
    let style = {
      opacity: 0,
      transform: 'translate(40px, 80px) rotate(15deg)',
      transition: 'all 0.3s ease-out',
    };
    if (animState === 'cursor-appeared') {
      style = {
        opacity: 1,
        transform: 'translate(40px, 36px) rotate(15deg)',
        transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
      };
    } else if (animState === 'moving') {
      style = {
        opacity: 1,
        transform: 'translate(-15px, 2px) rotate(0deg)',
        transition: 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
      };
    } else if (animState === 'clicking') {
      style = {
        opacity: 1,
        transform: 'translate(-17px, 5px) rotate(0deg)',
        transition: 'transform 0.1s ease-in-out',
      };
    } else if (animState === 'clicked-success' || animState === 'fading-out') {
      style = {
        opacity: 0,
        transform: 'translate(-17px, 11px) rotate(0deg)',
        transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
      };
    }
    return style;
  })();

  const getMenuClass = (pathOrName, isDropdownTrigger = false) => {
    const isCurrentActive = isDropdownTrigger
      ? activeDropdown === pathOrName
      : isActive(pathOrName);

    const baseClass = "whitespace-nowrap inline-flex items-center font-semibold transition-all duration-300 ease-in-out cursor-pointer select-none text-[#223A5E] hover:text-[#ff1681] text-[14px] xl:text-[14px]";
    return `${baseClass} bg-transparent border-2 border-transparent`;
  };

  return (
    <nav className="z-50 font-sans absolute top-0 left-0 right-0 bg-transparent w-full">
      <style>{`
        @keyframes ripple {
          0% {
            transform: scale(0.5);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.0);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 0.4s ease-out forwards;
        }
        @keyframes register-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes register-shine {
          0%, 65% {
            transform: translateX(-150%) skewX(-20deg);
          }
          85% {
            transform: translateX(300%) skewX(-20deg);
          }
          100% {
            transform: translateX(300%) skewX(-20deg);
          }
        }
        @keyframes register-pulse {
          0%, 100% {
            box-shadow: 0 0 0 rgba(255, 0, 140, 0);
          }
          50% {
            box-shadow: 
              0 0 18px rgba(255, 0, 140, 0.45),
              0 0 35px rgba(140, 0, 255, 0.25);
          }
        }
        .animate-register-gradient {
          background-size: 200% 200%;
          animation: register-gradient 4.5s ease infinite;
        }
        .animate-shine {
          animation: register-shine 4s ease-in-out infinite;
        }
        .animate-register-pulse {
          background-size: 200% 200%;
          animation: register-gradient 4.5s ease infinite, register-pulse 3s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-shine, .animate-register-gradient, .animate-register-pulse {
            animation: none !important;
          }
        }
      `}</style>
      <div className="max-w-[1600px] mx-auto px-6 w-full">
        {/* Floating White Navbar container */}
        <motion.div
          ref={navContainerRef}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-[68px] md:h-[76px] lg:h-[81px] bg-white rounded-[42px] px-8 flex justify-between items-center shadow-[0_15px_40px_rgba(0,0,0,0.01)] relative border border-gray-100 mt-4 overflow-visible"
        >
          {/* Left: Logo (18% width) */}
          <div className="flex items-center flex-shrink-0 pr-12 xl:pr-6">
            <Link
              to="/"
              className="flex items-center"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src={TikyTop}
                alt="TikyTop"
                className="w-[150px] h-auto object-contain"
              />
            </Link>
          </div>

          {/* Center: Navigation Menu (52% width, max-width 720px, margin: auto) */}
          <div className="inline-flex relative left-12 items-center justify-center gap-4 xl:gap-5">

            {/* Platforms: TikTok, Instagram, YouTube */}
            {platforms.map((plat) => (
              <div
                key={plat.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(plat.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={plat.path}
                  className={getMenuClass(plat.path)}
                >
                  <span>{plat.name}</span>
                  <ChevronDown className="w-4 h-4 ml-2 mt-0.5" />
                </Link>

                <AnimatePresence>
                  {activeDropdown === plat.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                      style={{ position: 'absolute', top: '100%', left: 0, zIndex: 9999, paddingTop: '12px' }}
                      onMouseEnter={() => handleMouseEnter(plat.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="w-52 bg-white rounded-xl shadow-xl py-2 border border-gray-100">
                        {plat.services.map((service, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleServiceClick(service, plat)}
                            className="w-full text-left px-4 py-1.5 text-[13px] font-medium text-gray-700 hover:bg-pink-50 hover:text-[#ff1681] transition-all flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ff2d95]"></span>
                            {service.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Explore Services Megamenu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('explore-services')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => toggleDropdown('explore-services')}
                className={getMenuClass('explore-services', true)}
              >
                <span>Explore More Services</span>
                <ChevronDown className="w-4 h-4 ml-2 mt-0.5" />

                {/* NEW Badge */}
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2d32ff] text-white text-[10px] font-bold h-[20px] px-2 flex items-center justify-center rounded-full shadow-[0_4px_12px_rgba(45,50,255,0.25)] uppercase tracking-wider">
                  NEW
                </span>
              </button>

              {/* Megamenu Dropdown */}
              <AnimatePresence>
                {activeDropdown === 'explore-services' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                    style={{ position: 'absolute', top: '100%', left: '50%', x: '-50%', zIndex: 9999, paddingTop: '12px' }}
                    onMouseEnter={() => handleMouseEnter('explore-services')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="w-[660px] bg-white rounded-[24px] shadow-2xl p-6 border border-gray-150 grid grid-cols-3 gap-3">
                      <div className="col-span-3 flex justify-between items-center mb-1">
                        <h4 className="text-[12px] font-bold text-[#1d3557] uppercase tracking-wider font-sans">
                          Additional Platforms
                        </h4>
                        <span className="text-[11px] text-gray-500 font-sans">Select any platform below</span>
                      </div>

                      {extraPlatforms.map((plat) => (
                        <button
                          key={plat.name}
                          onClick={() => {
                            setActiveDropdown(null);
                            navigate(plat.path, { state: plat.state });
                          }}
                          className="flex items-center gap-3 px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-800 text-left transition duration-200 hover:bg-pink-50 hover:border-pink-200/50 hover:text-[#ff1681]"
                        >
                          <span className="text-[18px] flex-shrink-0 flex items-center">{plat.icon}</span>
                          <span className="truncate">{plat.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* About Us */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('about-us')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/about"
                className={getMenuClass('/about')}
              >
                <span>About Us</span>
              </Link>
            </div>

            {/* Free Trials */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('free-trials')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/free-trial"
                className={getMenuClass('/free-trial')}
              >
                <span>Free Trials</span>
              </Link>
            </div>


          </div>

          {/* Right: User Login/Register Buttons (30% width) */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5 pl-12 xl:pl-16 flex-shrink-0">            {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors border border-gray-150"
              >
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="w-6 h-6 rounded-full object-cover shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-6 h-6 bg-gradient-to-br from-[#ff2d95] to-[#7b2cff] rounded-full flex items-center justify-center text-white font-semibold shadow-sm text-[10px]">
                    {(user.fullname || user.name || user.email)?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="font-semibold text-[#16345f] text-xs">
                  {user.fullname || user.name || user.email}
                </span>
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-2xl py-2 border border-gray-100 z-50"
                  >
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-1.5 text-xs text-gray-700 hover:bg-pink-50 hover:text-[#ff1681] font-medium transition-colors"
                    >
                      Profile / Account
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-1.5 text-xs text-red-600 hover:bg-red-50 font-medium transition-colors flex items-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-3 xl:gap-2">
              <Link to="/login">
                <button className="h-[32px] px-[20px] rounded-[24px] bg-white border-2 border-[#d9d9d9] text-[#1d3557] font-semibold text-[16px] transition-all duration-300 hover:border-[#ff1681]/60 hover:text-[#ff1681] hover:bg-pink-50/20 hover:scale-[1.02] hover:shadow-[0_0_12px_rgba(255,22,129,0.15)] active:scale-[0.97]">
                  Login
                </button>
              </Link>
              <div onClick={handleManualRegisterClick} className="relative group cursor-pointer">
                {/* Tiny Micro Badge */}
                {animState !== 'fading-out' && animState !== 'done' && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[8px] font-bold py-0.5 px-1.5 rounded-full uppercase tracking-wider scale-90 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none select-none z-30 whitespace-nowrap">
                    JOIN FREE
                  </span>
                )}
                <button
                  style={{
                    opacity: animState === 'fading-out' ? 0 : 1,
                    transform: animState === 'fading-out' ? 'scale(0.85)' : animState === 'clicking' ? 'scale(0.96)' : undefined,
                    transition: 'transform 0.2s ease-out, opacity 0.25s ease-out'
                  }}
                  className={`relative h-[32px] w-[124px] rounded-[24px] text-white font-bold text-[15px] transition-all duration-300 hover:brightness-110 hover:scale-[1.06] active:scale-[0.97] hover:shadow-[0_8px_25px_rgba(255,20,150,0.40),0_0_35px_rgba(140,50,255,0.30)] flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#ff1681] focus:ring-offset-2 ${animState === 'clicked-success'
                    ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 shadow-[0_0_30px_rgba(255,22,129,0.7)] animate-register-gradient'
                    : 'bg-gradient-to-r from-[#ff1681] via-[#d800ff] to-[#ff1681] animate-register-pulse'
                    }`}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    {animState === 'clicked-success' ? "✓ Register" : (
                      <>
                        Register
                        <span className="transition-transform duration-300 group-hover:translate-x-1 inline-block">→</span>
                      </>
                    )}
                  </span>
                  <span className="absolute inset-y-0 -left-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] animate-shine pointer-events-none z-20" />
                </button>

                {/* Click ripple element */}
                {(animState === 'clicking' || animState === 'clicked-success') && (
                  <span className="absolute left-[62px] top-[16px] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-pink-500 bg-pink-500/20 animate-ripple z-40 pointer-events-none" />
                )}

                {/* Realistic Computer Hand Pointer Cursor */}
                {animState !== 'done' && animState !== 'idle' && (
                  <div
                    style={pointerStyle}
                    className="absolute bottom-[-10px] right-[-20px] pointer-events-none z-50 select-none hidden lg:block"
                  >
                    <img src={HandCursor} alt="" className="w-[55px] lg:w-[65px] h-auto pointer-events-none select-none" />
                  </div>
                )}
              </div>
            </div>
          )}
          </div>

          {/* Mobile Hamburger menu */}
          <button
            className="lg:hidden p-2 rounded-full hover:bg-gray-50 transition-colors z-10 flex-shrink-0"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5.5 h-5.5 text-[#1d3557]" /> : <MenuIcon className="w-5.5 h-5.5 text-[#1d3557]" />}
          </button>

        </motion.div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 right-0 top-full mt-3 mx-auto w-[92%] bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 overflow-hidden z-50"
          >
            <div className="space-y-4">

              {/* Dynamic mobile rendering of platforms */}
              {platforms.map((plat) => (
                <div key={plat.name} className="space-y-2">
                  <div className="font-bold text-[#1d3557] text-lg flex items-center gap-2">
                    <span>
                      {plat.name === 'TikTok' && '🎵'}
                      {plat.name === 'Instagram' && '📸'}
                      {plat.name === 'YouTube' && '▶️'}
                    </span>
                    <span>{plat.name} Services</span>
                  </div>
                  <div className="pl-4 space-y-1">
                    {plat.services.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          handleServiceClick(s.path || plat.path);
                          setIsOpen(false);
                        }}
                        className="block text-sm text-gray-600 py-2 hover:text-[#ff1681]"
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Free Trials */}
              <div className="space-y-2">
                <div className="font-bold text-[#1d3557] text-lg">🎁 Free Trials</div>
                <div className="pl-4 space-y-1">
                  {freeTrials.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        handleServiceClick(s.path);
                        setIsOpen(false);
                      }}
                      className="block text-sm text-gray-600 py-2 hover:text-[#ff1681]"
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* About Us */}
              <div className="pt-1">
                <Link
                  to="/about"
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-bold text-[#1d3557] hover:text-[#ff1681]"
                >
                  ℹ️ About Us
                </Link>
              </div>

              <hr />

              {/* User options */}
              {user ? (
                <div className="space-y-2 pt-2">
                  <div className="text-sm font-semibold text-gray-500">Logged in as {user.name}</div>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="block py-2 text-gray-700 font-medium">
                    My Profile
                  </Link>
                  <Link to="/my-orders" onClick={() => setIsOpen(false)} className="block py-2 text-gray-700 font-medium">
                    My Orders
                  </Link>
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full text-left py-2 text-red-600 font-medium">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <button className="w-full h-[52px] rounded-full border-2 border-[#d9d9d9] text-[#1d3557] font-semibold text-[15px]">
                      Login
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <button className="w-full h-[52px] rounded-full bg-[#ff1681] text-white font-semibold text-[15px]">
                      Register
                    </button>
                  </Link>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </nav>
  );
};

export default Navbar;
