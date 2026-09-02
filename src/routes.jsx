import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import ChangePassword from './pages/ChangePassword';
import Account from './pages/Account';
import TikTok from './pages/TikTok';
import Instagram from './pages/Instagram';
import Facebook from './pages/Facebook';
import YouTube from './pages/YouTube';
import ProfileOverview from './pages/ProfileOverview';
import PostsSelection from './pages/PostsSelection';
import ContentSelection from './pages/ContentSelection';
import QuantityPricing from './pages/QuantityPricing';
import Payment from './pages/Payment';
import Processing from './pages/Processing';
import Complete from './pages/Complete';
import Track from './pages/Track';
import FreeTrial from './pages/FreeTrial';
import FreeService from './pages/FreeService';
import DirectOrderService from './pages/DirectOrderService';
import BuyTikTokLikes from './pages/BuyTikTokLikes';
import BuyTikTokViews from './pages/BuyTikTokViews';
import BuyTikTokFollowers from './pages/BuyTikTokFollowers';
import BuyInstagramLikes from './pages/BuyInstagramLikes';
import BuyInstagramViews from './pages/BuyInstagramViews';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Terms from './pages/Terms';
import RefundPolicy from './pages/RefundPolicy';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/my-orders" element={<Orders />} />
      <Route path="/password" element={<ChangePassword />} />
      <Route path="/account" element={<Account />} />
      <Route path="/tiktok" element={<TikTok />} />
      <Route path="/buy-tiktok-likes" element={<BuyTikTokLikes />} />
      <Route path="/buy-tiktok-views" element={<BuyTikTokViews />} />
      <Route path="/buy-tiktok-followers" element={<BuyTikTokFollowers />} />
      <Route path="/buy-tiktok-shares" element={<TikTok />} />
      
      <Route path="/instagram" element={<Instagram />} />
      <Route path="/buy-instagram-likes" element={<BuyInstagramLikes />} />
      <Route path="/buy-instagram-views" element={<BuyInstagramViews />} />
      <Route path="/buy-instagram-followers" element={<Instagram />} />
      <Route path="/buy-instagram-comments" element={<Instagram />} />
      
      <Route path="/facebook" element={<Facebook />} />
      <Route path="/buy-facebook-likes" element={<Facebook />} />
      <Route path="/buy-facebook-followers" element={<Facebook />} />
      <Route path="/buy-facebook-views" element={<Facebook />} />
      
      <Route path="/youtube" element={<YouTube />} />
      <Route path="/buy-youtube-likes" element={<YouTube />} />
      <Route path="/buy-youtube-views" element={<YouTube />} />
      <Route path="/buy-youtube-subscribers" element={<YouTube />} />
      <Route path="/buy-youtube-comments" element={<YouTube />} />
      
      <Route path="/profile-overview" element={<ProfileOverview />} />
       <Route path="/posts-selection" element={<PostsSelection />} />
       <Route path="/content-selection" element={<ContentSelection />} />
       <Route path="/quantity-pricing" element={<QuantityPricing />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/processing" element={<Processing />} />
      <Route path="/complete" element={<Complete />} />
      <Route path="/track" element={<Track />} />
      <Route path="/free-trial" element={<FreeTrial />} />
      <Route path="/free-service" element={<FreeService />} />
      <Route path="/direct-order-service" element={<DirectOrderService />}/>
    </Routes>
  );
}
