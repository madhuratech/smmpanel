import { BrowserRouter, useLocation } from 'react-router-dom';
import Routes from './routes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function AppLayout() {
  const location = useLocation();
  const hasHero = ['/', '/tiktok', '/instagram', '/youtube', '/facebook', '/free-trial', '/free-service', '/login', '/register'].includes(location.pathname);

  const getDynamicBg = () => {
    const path = location.pathname;
    const state = location.state || {};
    const platform = (state.platform || '').toLowerCase().trim();

    if (['/', '/tiktok', '/instagram', '/youtube', '/facebook'].includes(path)) {
      return '';
    }

    const platformBgs = {
      instagram: 'bg-gradient-to-br from-pink-50 to-purple-50',
      youtube: 'bg-gradient-to-br from-red-50 to-orange-50',
      facebook: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      tiktok: 'bg-gradient-to-br from-gray-50 to-slate-50'
    };

    if (['/quantity-pricing', '/content-selection', '/posts-selection', '/profile-overview', '/direct-order-service'].includes(path)) {
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
