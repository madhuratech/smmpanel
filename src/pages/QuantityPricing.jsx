import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useScrollToTop from '../hooks/useScrollToTop'

const QuantityPricing = () => {
  useScrollToTop()

  const navigate = useNavigate();
  const location = useLocation();

  const username = location.state?.username;
  const platform = location.state?.platform || "instagram";
  const selectedPosts = location.state?.selectedPosts || [];
  const selectedService = location.state?.selectedService;
  const userdata = location.state?.userdata;
  const [loading, setLoading] = useState(false);


  // Use selectedPosts for link building (not all posts)
 const posts =
    selectedPosts.length > 0
      ? selectedPosts
      : (userdata?.posts || []);

        const postCount = posts.length;



  // Redirect Safety;
  useEffect(() => {
    if (!username || !userdata) {
      navigate("/instagram", { replace: true });
    }
  }, [username, userdata, navigate]);

  // Single quantity for the selected service
  const [quantity,      setQuantity]      = useState(100);
  const [prices,        setPrices]        = useState({});
  const [total,         setTotal]         = useState(0);
  const [couponCode,    setCouponCode]    = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Reset when service changes
  useEffect(() => {
    setQuantity(100);
    setPrices({});
    setTotal(0);
  }, [selectedService?.id]);


  // Only Instagram pricing backend is live.
  // YouTube/TikTok use frontend fallback pricing.
  const API_URL = {
    instagram: "http://localhost:5000/api/instaprice/calculate",
    youtube: "http://localhost:5000/api/youtubeprice/calculate",
    tiktok: "http://localhost:5000/api/tiktokprice/calculate",
    facebook: "http://localhost:5000/api/facebookprice/calculate"
  };

   

  const Api_Url = API_URL[platform]


  // Frontend fallback pricing (₹ per unit) - Sync with backend
  const FALLBACK = {
    instagram: { likes: 0.91, views: 0.69, followers: 1.82, shares: 0.55 },
    youtube:   { likes: 0.1,  views: 1.08, subscribers: 1.82, comments: 0.55 },
    tiktok:    { likes: 1.99, views: 0.99, followers: 3.99, shares: 2.99 },
    facebook:  { likes: 1.50, views: 0.80, followers: 2.50, shares: 1.20 },
  };


  // Determine the service type key from the selected service name
  const getServiceKey = (name) => {
    const n = name.toLowerCase();
    if (n.includes("like")) return "likes";
    if (n.includes("view")) return "views";
    if (n.includes("subscriber")) return "subscribers";
    if (n.includes("follower")) return "followers";
    if (n.includes("comment")) return "comments";
    return "likes";
  };

const serviceTypeKey = getServiceKey(selectedService?.name || "");

 const fetchPrices = async (qty) => {
    if (!qty) return

    try {
      setLoading(true)

      const response = await fetch(Api_Url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          values: { [serviceTypeKey]: qty }
        })
      })

      const data = await response.json()

      if (data.success) {
        setPrices(data.data.items)
        setTotal(data.data.total)
      }

    } catch (error) {
      console.error("Price fetch error:", error)
    } finally {
      setLoading(false)
    }
  };

  // Fetch on mount and when quantity changes
  useEffect(() => { fetchPrices(quantity); }, [quantity]);

  //url shortcode;
  const idToShortcodeInFrontend = (id) => {
    if (!id) return null;
    try {
      const longId = id.toString().split('_')[0];
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
      let n = BigInt(longId);
      let res = '';
      while (n > 0n) { res = alphabet[Number(n % 64n)] + res; n = n / 64n; }
      return res;
    } catch (e) { return null; }
  };

  const links = posts?.map((p) => {
    if (p.link) return p.link;
    if (platform === 'instagram') {
      const sc = p.shortcode || p.code || idToShortcodeInFrontend(p.id || p.pk);
      if (sc) return `https://www.instagram.com/p/${sc}/`;
    }
    return null;
  }).filter(Boolean);

  const link = links && links.length > 0 ? links.join(', ') : null;

// get youtube id





  // Build a single order for the selected service
  const buildOrders = () => {
    const serviceId = Number(selectedService?.id);

    if (!serviceId) {
      alert("Service ID missing ");
      return [];
    }

    const isProfileService =
      serviceTypeKey === 'followers' ||
      serviceTypeKey === 'subscribers';

    const qtyPerPost = Math.floor(quantity / postCount) || 1;

    if (isProfileService) {
      const profileLink = platform === 'youtube'
        ? `https://www.youtube.com/@${username}`
        : platform === 'facebook'
          ? `https://www.facebook.com/${username}`
          : `https://www.instagram.com/${username}/`;

      return [{
        platform,
        order: { [serviceTypeKey]: quantity },
        link: profileLink,
        serviceId: serviceId, 
      }];
    }

    return posts.map((p) => {
      let postLink = p.link || p.permalink;

      if (!postLink) {
        if (platform === 'youtube') {
          const videoId = p.videoId || p.id || p.video_id;
          postLink = videoId ? `https://www.youtube.com/watch?v=${videoId}` : `https://www.youtube.com/@${username}`;
        } else if (platform === 'facebook') {
          postLink = p.link || p.url || `https://www.facebook.com/${username}/posts/${p.id || p.post_id}`;
        } else if (platform === 'instagram') {
          const sc = p.shortcode || p.code || idToShortcodeInFrontend(p.id || p.pk);
          postLink = sc ? `https://www.instagram.com/p/${sc}/` : null;
        }
      }

      return {
        platform,
        order: { [serviceTypeKey]: qtyPerPost },
        link: postLink,
        serviceId: serviceId, 
      };
    });
  };


  const coupons = {
    'FIRST10': { discount: 0.10, minOrder: 0, description: '10% off first order' },
    'BULK20': { discount: 0.20, minOrder: 50, description: '20% off orders above $50' },
    'SAVE15': { discount: 0.15, minOrder: 25, description: '15% off orders above $25' }
  }

  const platformConfig = {
    instagram: { color: 'from-pink-500 to-purple-600', name: 'Instagram', bgColor: 'bg-gradient-to-br from-pink-50 to-purple-50' },
    youtube: { color: 'from-red-500 to-red-600', name: 'YouTube', bgColor: 'bg-gradient-to-br from-red-50 to-orange-50' },
    facebook: { color: 'from-blue-600 to-blue-700', name: 'Facebook', bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50' },
    tiktok: { color: 'from-black to-gray-800', name: 'TikTok', bgColor: 'bg-gradient-to-br from-gray-50 to-slate-50' }
  }

  const config = platformConfig[platform] || platformConfig.instagram;

  // Per-post distribution
    const getQuantityPerPost = () =>
    postCount > 0
      ? Math.floor(quantity / postCount)
      : quantity;

  const getEffectiveSubtotal = () => {
    if (total > 0) return total;
    // Fallback calculation for immediate UI response
    const rate = FALLBACK[platform]?.[serviceTypeKey] || 0;
    return quantity * rate;
  };

  const calculatePrice = () => {
    const subtotal = getEffectiveSubtotal();
    return appliedCoupon ? +(subtotal - subtotal * appliedCoupon.discount).toFixed(2) : subtotal;
  };



  const applyCoupon = () => {
    const coupon = coupons[couponCode.toUpperCase()]
    if (coupon && calculatePrice() >= coupon.minOrder) {
      setAppliedCoupon(coupon)
      setCouponCode('')
    } else {
      alert('Invalid coupon code or minimum order not met')
    }
  }

  const handleContinue = () => {
    const orders = buildOrders();
    navigate('/payment', {
      state: {
        username,
        platform,
        selectedService,
        userdata,
        selectedPosts,
        orders: buildOrders(),
        totalPrice: calculatePrice(),
        appliedCoupon,
      }
    });
  };

  return (
    <div className={`min-h-screen ${config.bgColor} py-8 px-4`}>
      <div className="max-w-6xl mx-auto">

        {/* Profile Section */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
              {userdata?.avatar ? (
                <img
                  src={userdata.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `http://localhost:5000/api/instagram/image?url=${encodeURIComponent(userdata?.avatar)}`
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                  {userdata?.username?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">@{userdata?.username?.startsWith('@') ? userdata.username.slice(1) : userdata?.username}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Service: <span className="font-semibold">{selectedService?.name}</span></span>
                <span>•</span>
                <span>Posts: <span className="font-semibold">{postCount}</span></span>
              </div>
              
              {/* Display IDs based on service type */}
              <div className="mt-3 flex flex-wrap gap-4 text-sm">
                {(serviceTypeKey === 'followers' || serviceTypeKey === 'subscribers') ? (
                  <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100 flex items-center gap-2">
                    <span className="font-bold">{platform === 'youtube' ? 'Channel ID' : 'Account ID'}:</span>
                    <code>{userdata?.channelId || userdata?.instagramId || userdata?.id || 'N/A'}</code>
                  </div>
                ) : (
                  <div className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg border border-purple-100 flex flex-col gap-1 w-full max-w-md">
                    <span className="font-bold">{platform === 'youtube' ? 'Video IDs' : 'Post/Shortcodes'}:</span>
                    <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pr-2">
                      {posts.map((p, idx) => (
                        <code key={idx} className="bg-white/50 px-2 py-0.5 rounded text-xs border border-purple-200">
                          {p.id || p.videoId || p.shortcode || p.pk}
                        </code>
                      ))}
                    </div>
                  </div>
                )}
                <div className="bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg border border-gray-100 flex items-center gap-2">
                  <span className="font-bold">Username:</span>
                  <code>{username || userdata?.username}</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Quantity Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Select Quantity for <span className={`bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>{selectedService?.name}</span>
              </h2>

              {/* Single quantity slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 font-medium capitalize">{serviceTypeKey}</span>
                  <span className="text-2xl font-bold text-gray-900">{quantity.toLocaleString()}</span>
                </div>

                <input
                  type="range"
                  min={10}
                  max={serviceTypeKey === 'views' || serviceTypeKey === 'subscribers' ? 50000 : 10000}
                  step={serviceTypeKey === 'views' || serviceTypeKey === 'subscribers' ? 50 : 10}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer bg-gray-200"
                />

                <div className="flex justify-between text-xs mt-2 text-gray-400">
                  <span>10</span>
                  <span className="font-semibold text-gray-700">{quantity.toLocaleString()}</span>
                  <span>{(serviceTypeKey === 'views' || serviceTypeKey === 'subscribers' ? 50000 : 10000).toLocaleString()}</span>
                </div>

                {/* Quick-pick buttons */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {[100, 500, 1000, 2000, 5000].map((pkg) => (
                    <button
                      key={pkg}
                      onClick={() => setQuantity(pkg)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                        quantity === pkg
                          ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {pkg >= 1000 ? `${pkg / 1000}K` : pkg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Distribution Info */}
              <div className="bg-blue-50 rounded-2xl p-6 mb-8">
                <h3 className="font-semibold text-blue-900 mb-3">Distribution Breakdown</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">Total {selectedService?.name}:</span>
                    <span className="font-bold text-blue-900 ml-2">{quantity.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Unit Rate:</span>
                 <span className="font-medium text-gray-700"> ₹{(FALLBACK[platform]?.[serviceTypeKey] || 0).toFixed(2)}</span>

                  </div>
                  <div>
                    <span className="text-blue-700">Selected Posts:</span>
                    <span className="font-bold text-blue-900 ml-2">{postCount}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Platform:</span>
                    <span className="font-bold text-blue-900 ml-2 capitalize">{platform}</span>
                  </div>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Apply Coupon Code</h3>
                <div className="flex gap-3 mb-4">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {/* Available Coupons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.entries(coupons).map(([code, coupon]) => (
                    <div
                      key={code}
                      onClick={() => setCouponCode(code)}
                      className="border-2 border-dashed border-green-300 bg-green-50 p-3 rounded-xl cursor-pointer hover:bg-green-100 transition-colors"
                    >
                      <div className="font-semibold text-green-700">{code}</div>
                      <div className="text-sm text-green-600">{coupon.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-semibold">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-semibold">{quantity.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Posts:</span>
                 <span className="font-semibold">
                  {postCount}
                   </span>
                </div>
                <div className="flex justify-between text-sm py-1 border-b border-gray-50">
                  <span className="text-gray-500">Unit Rate:</span>
                  <span className="font-medium text-gray-700">₹{(FALLBACK[platform]?.[serviceTypeKey] || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm py-1">
                  <span className="text-gray-600 font-semibold">Cost Per Post:</span>
                  <span className="font-bold text-gray-900">
                    ₹{(calculatePrice() / (postCount || 1)).toFixed(2)}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">₹{getEffectiveSubtotal().toFixed(2)}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-sm text-green-600 mb-2">
                      <span>Discount ({(appliedCoupon.discount * 100).toFixed(0)}%):</span>
                      <span>₹{(getEffectiveSubtotal() * appliedCoupon.discount).toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900">Total:</span>
                    <span className={`font-bold text-2xl bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                      ₹{calculatePrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleContinue}
                className={`w-full bg-gradient-to-r ${config.color} text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuantityPricing;