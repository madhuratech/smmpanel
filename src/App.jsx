import { useState, useEffect } from 'react';
import API_URL from './config/api';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Routes from './routes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function AppLayout() {
  const location = useLocation();
  const hasHero = ['/', '/tiktok', '/instagram', '/youtube', '/facebook', '/free-trial', '/free-service', '/login', '/register', '/tiktok/buy-likes', '/tiktok/buy-views', '/about', '/contact-us', '/terms', '/refund-policy', '/direct-order-service'].includes(location.pathname);
  const [showRewardPopup, setShowRewardPopup] = useState(false);
  const [rewardCoins, setRewardCoins] = useState(20);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        // If they have not claimed, attempt to claim automatically
        if (user.freeTrialClaimed === false) {
          fetch(`${API_URL}/api/freetrial/claim-free-trial`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            throw new Error("Already claimed or error");
          })
          .then(data => {
            // Update local user object
            user.balance = data.balance;
            user.freeTrialClaimed = true;
            localStorage.setItem("user", JSON.stringify(user));
            // Show popup with calculated coins
            setRewardCoins(data.coinsAdded || 20);
            setShowRewardPopup(true);
            // Trigger storage update so other parts of the app sync balance
            window.dispatchEvent(new Event("storage"));
          })
          .catch(() => {
            // If API rejected because already claimed on DB, sync locally
            user.freeTrialClaimed = true;
            localStorage.setItem("user", JSON.stringify(user));
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [location.pathname]);

  const getDynamicBg = () => {
    const path = location.pathname;
    const state = location.state || {};
    const platform = (state.platform || '').toLowerCase().trim();

    if (['/', '/tiktok', '/instagram', '/youtube', '/facebook', '/tiktok/buy-likes', '/tiktok/buy-views', '/about', '/contact-us', '/terms', '/refund-policy', '/direct-order-service'].includes(path)) {
      return '';
    }

    const platformBgs = {
      instagram: 'bg-gradient-to-br from-pink-50 to-purple-50',
      youtube: 'bg-gradient-to-br from-red-50 to-orange-50',
      facebook: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      tiktok: 'bg-gradient-to-br from-gray-50 to-slate-50'
    };

    if (['/quantity-pricing', '/content-selection', '/posts-selection', '/profile-overview'].includes(path)) {
      return platformBgs[platform] || 'bg-gradient-to-br from-pink-50 to-purple-50';
    }

    return 'bg-gradient-to-br from-[#FFD9E8] to-[#FFF5E6]';
  };

  return (
    <div className={`min-h-screen flex flex-col ${getDynamicBg()}`}>
      <Navbar />
      <main className={`flex-grow ${hasHero ? '' : 'pt-[114px]'}`}>
        <Routes />
      </main>
      <Footer />

      {/* Welcome Reward Popup */}
      <AnimatePresence>
        {showRewardPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#0f0817] border border-white/10 rounded-[32px] p-8 max-w-sm w-full text-center shadow-[0_0_50px_rgba(255,22,129,0.25)] relative overflow-hidden"
            >
              {/* Confetti Glow Backdrops */}
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-pink-500/20 rounded-full blur-[40px] pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-500/20 rounded-full blur-[40px] pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="text-6xl animate-bounce duration-1000">🎉</div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-[#d800ff] to-purple-500 bg-clip-text text-transparent">
                    Welcome to TikyTop!
                  </h3>
                  <div className="flex items-center justify-center gap-1.5 text-lg font-bold text-white">
                    <span>🪙</span>
                    <span>You’re getting {rewardCoins} free coins!</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed">
                  You have received {rewardCoins} coins to get started. Use them to try our high-quality social services.
                </p>

                <button
                  onClick={() => setShowRewardPopup(false)}
                  className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm rounded-full shadow-lg hover:shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
