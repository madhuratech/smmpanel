import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu as MenuIcon, X, LogOut, Globe } from 'lucide-react';
import { getFromStorage, removeFromStorage } from '../utils';
import TikyTop from "../assets/logos/TikyTop.png";
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
        { name: 'TikTok Views', service: 'views' },
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

  const handleServiceClick = (platformPath) => {
    navigate(platformPath);
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

  const getMenuClass = (pathOrName, isDropdownTrigger = false) => {
    const isCurrentActive = isDropdownTrigger
      ? activeDropdown === pathOrName
      : isActive(pathOrName);

    const baseClass = "whitespace-nowrap flex items-center gap-1.5 px-3.5 py-2 text-[14px] font-semibold transition-all duration-300 ease-in-out cursor-pointer select-none";
    if (isCurrentActive) {
      return `${baseClass} bg-white border-2 border-[#ff1681] text-[#ff1681] rounded-full`;
    }
    return `${baseClass} bg-transparent border-2 border-transparent text-[#1d3557] hover:text-[#ff1681]`;
  };

  return (
    <nav className="z-50 py-4 font-sans absolute top-0 left-0 right-0 bg-transparent">
      {/* Floating White Navbar container */}
      <motion.div
        ref={navContainerRef}
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mx-auto w-[92%] h-[82px] bg-white rounded-full px-6 lg:px-8 flex justify-between items-center shadow-[0_15px_40px_rgba(0,0,0,0.01)] relative border border-gray-100"
      >
        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center flex-shrink-0 z-10"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src={TikyTop}
            alt="TikyTop"
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Center: Navigation Menu */}
        <div className="hidden lg:flex justify-end ml-[80px]">

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
                <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
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
                          onClick={() => handleServiceClick(service.path || plat.path)}
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
              <ChevronDown className="w-3.5 h-3.5 mt-0.5" />

              {/* NEW Badge */}
              <span className="absolute -top-2.5 -right-2 bg-[#2d32ff] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-[0_4px_12px_rgba(45,50,255,0.25)] uppercase tracking-wider scale-[0.85]">
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
                  style={{ position: 'absolute', top: '100%', left: 0, zIndex: 9999, paddingTop: '12px' }}
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
              <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
            </Link>

            <AnimatePresence>
              {activeDropdown === 'free-trials' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  style={{ position: 'absolute', top: '100%', left: 0, zIndex: 9999, paddingTop: '12px' }}
                  onMouseEnter={() => handleMouseEnter('free-trials')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="w-52 bg-white rounded-xl shadow-xl py-2 border border-gray-100">
                    {freeTrials.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleServiceClick(item.path)}
                        className="w-full text-left px-4 py-1.5 text-[13px] font-medium text-gray-700 hover:bg-pink-50 hover:text-[#ff1681] transition-all flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        {item.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Our Company */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('company')}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={getMenuClass('company', true)}
              onClick={() => toggleDropdown('company')}
            >
              <span>Our Company</span>
              <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
            </div>

            <AnimatePresence>
              {activeDropdown === 'company' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  style={{ position: 'absolute', top: '100%', left: 0, zIndex: 9999, paddingTop: '12px' }}
                  onMouseEnter={() => handleMouseEnter('company')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="w-52 bg-white rounded-xl shadow-xl py-2 border border-gray-100">
                    {companyLinks.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleServiceClick(item.path)}
                        className="w-full text-left px-4 py-1.5 text-[13px] font-medium text-gray-700 hover:bg-pink-50 hover:text-[#ff1681] transition-all flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                        {item.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Right: User Login/Register Buttons */}
        <div className="hidden lg:flex items-center gap-3 z-10">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors border border-gray-150"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-[#ff2d95] to-[#7b2cff] rounded-full flex items-center justify-center text-white font-semibold shadow-sm text-[10px]">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold text-[#16345f] text-xs">{user.name}</span>
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
                      My Profile
                    </Link>
                    <Link
                      to="/my-orders"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-1.5 text-xs text-gray-700 hover:bg-pink-50 hover:text-[#ff1681] font-medium transition-colors"
                    >
                      My Orders
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
            <div className="flex items-center gap-2">
              <Link to="/login">
                <button className="h-[30px] w-[80px] rounded-[12px] bg-white border-2 border-[#d9d9d9] text-[#1d3557] font-semibold text-xs hover:border-[#ff1681] hover:text-[#ff1681] transition-all duration-300">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="h-[30px] w-[80px] rounded-[12px] bg-[#ff1681] text-white font-semibold text-xs hover:from-[#ff1681] hover:to-[#ff1681] hover:scale-[1.03] transition-all duration-300 shadow-md">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger menu */}
        <button
          className="lg:hidden p-2 rounded-full hover:bg-gray-50 transition-colors z-10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5.5 h-5.5 text-[#1d3557]" /> : <MenuIcon className="w-5.5 h-5.5 text-[#1d3557]" />}
        </button>

      </motion.div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mx-auto w-[90%] bg-white rounded-3xl mt-3 p-6 shadow-xl border border-gray-100 overflow-hidden relative z-50 pointer-events-auto"
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
                        className="block text-sm text-gray-600 py-1 hover:text-[#ff1681]"
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
                      className="block text-sm text-gray-600 py-1 hover:text-[#ff1681]"
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
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
                    <button className="w-full h-[40px] rounded-[14px] border-2 border-[#d9d9d9] text-[#1d3557] font-semibold text-xs">
                      Login
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <button className="w-full h-[40px] rounded-[14px] bg-gradient-to-r from-[#ff9f1c] to-[#ff6b00] text-white font-semibold text-xs">
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
