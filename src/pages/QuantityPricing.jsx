import { useState, useEffect, useCallback } from 'react'
import API_URL_BASE from '../config/api'
import { useNavigate, useLocation } from 'react-router-dom'
import useScrollToTop from '../hooks/useScrollToTop'

const MIN_PER_POST = 50

const detectServiceType = (name, category) => {
  const n = (name || "").toLowerCase();
  const c = (category || "").toLowerCase();

  if (n.includes("reels views") || n.includes("reels view") || c.includes("reels views") || c.includes("reels view") || n.includes("reels") || c.includes("reels")) {
    return "reels_views";
  }
  if (n.includes("story views") || n.includes("story view") || c.includes("story views") || c.includes("story view") || n.includes("story") || c.includes("story")) {
    return "story_views";
  }
  if (n.includes("story poll") || n.includes("poll votes") || n.includes("poll vote") || c.includes("story poll") || c.includes("poll votes")) {
    return "story_poll_votes";
  }
  if (n.includes("watch time") || n.includes("watchtime") || c.includes("watch time") || c.includes("watchtime")) {
    return "watch_time";
  }
  if (n.includes("live view") || c.includes("live view")) {
    return "live_views";
  }
  if (n.includes("follower") || c.includes("follower")) {
    return "followers";
  }
  if (n.includes("subscriber") || c.includes("subscriber")) {
    return "subscribers";
  }
  if (n.includes("like") || c.includes("like")) {
    return "likes";
  }
  if (n.includes("comment") || c.includes("comment")) {
    return "comments";
  }
  if (n.includes("share") || c.includes("share")) {
    return "shares";
  }
  if (n.includes("view") || c.includes("view")) {
    return "views";
  }
  return "likes"; // default fallback
};

const serviceConfigs = {
  followers: {
    quantityLabel: "Followers",
    targetLabel: "Selected Profile",
    unitLabel: "Follower",
    totalLabel: "Total Followers",
    isProfile: true
  },
  subscribers: {
    quantityLabel: "Subscribers",
    targetLabel: "Selected Channel",
    unitLabel: "Subscriber",
    totalLabel: "Total Subscribers",
    isProfile: true
  },
  likes: {
    quantityLabel: "Likes",
    targetLabel: "Selected Posts",
    unitLabel: "Like",
    totalLabel: "Total Likes",
    isProfile: false
  },
  comments: {
    quantityLabel: "Comments",
    targetLabel: "Selected Posts",
    unitLabel: "Comment",
    totalLabel: "Total Comments",
    isProfile: false
  },
  shares: {
    quantityLabel: "Shares",
    targetLabel: "Selected Posts",
    unitLabel: "Share",
    totalLabel: "Total Shares",
    isProfile: false
  },
  views: {
    quantityLabel: "Views",
    targetLabel: "Selected Posts",
    unitLabel: "View",
    totalLabel: "Total Views",
    isProfile: false
  },
  reels_views: {
    quantityLabel: "Reels Views",
    targetLabel: "Selected Reels",
    unitLabel: "View",
    totalLabel: "Total Reels Views",
    isProfile: false
  },
  story_views: {
    quantityLabel: "Story Views",
    targetLabel: "Selected Stories",
    unitLabel: "View",
    totalLabel: "Total Story Views",
    isProfile: false
  },
  story_poll_votes: {
    quantityLabel: "Votes",
    targetLabel: "Selected Stories",
    unitLabel: "Vote",
    totalLabel: "Total Votes",
    isProfile: false
  },
  watch_time: {
    quantityLabel: "Watch Time",
    targetLabel: "Selected Videos",
    unitLabel: "Hour",
    totalLabel: "Total Watch Time",
    isProfile: false
  },
  live_views: {
    quantityLabel: "Live Views",
    targetLabel: "Selected Streams",
    unitLabel: "View",
    totalLabel: "Total Live Views",
    isProfile: false
  }
};

const getServiceKey = (platform, serviceName) => {
  const p = (platform || "").toLowerCase().trim();
  const s = (serviceName || "").toLowerCase().trim();

  let key = "";
  if (s.includes("reels") || s.includes("reel")) {
    key = "reels";
  } else if (s.includes("story") || s.includes("stories")) {
    key = "story";
  } else if (s.includes("follower")) {
    key = "followers";
  } else if (s.includes("subscriber")) {
    key = "subscribers";
  } else if (s.includes("comment")) {
    key = "comments";
  } else if (s.includes("like")) {
    key = "likes";
  } else if (s.includes("share")) {
    key = "shares";
  } else if (s.includes("view")) {
    key = "views";
  } else {
    key = s.replace(/[^a-z0-9]/g, "_");
  }

  return `${p}_${key}`;
};

const QuantityPricing = () => {
  useScrollToTop()

  const navigate = useNavigate()
  const location = useLocation()

  const isDirectOrder = location.state?.directOrder
  const linkType = location.state?.linkType
  const orderLink = location.state?.orderLink

  const username = location.state?.username
  const platform = location.state?.platform || "instagram"
  const selectedPosts = location.state?.selectedPosts || location.state?.posts || []
  const selectedService = location.state?.selectedService
  const userdata = location.state?.userdata
  const entryPath = location.state?.entryPath

  const contentType = location.state?.contentType
  const singleLink = location.state?.link
  const selectedItems = location.state?.selectedItems || (contentType ? (location.state?.selectedPosts || []) : [])

  const [loading, setLoading] = useState(false)
  const [prices, setPrices] = useState({})
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [total, setTotal] = useState(0)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [orderLimits, setOrderLimits] = useState({ min: 50, max: 10000, step: 50 })
  const [quantity, setQuantity] = useState(location.state?.quantity || 50)
  const [splitQuantities, setSplitQuantities] = useState(() => {
    const passed = location.state?.splitQuantities || {}
    const isMultiPost = location.state?.contentType && (location.state?.selectedItems || []).length > 0
    if (isMultiPost) {
      const minReq = (location.state?.selectedItems || []).length * 50
      const qty = location.state?.quantity || 50
      if (qty < minReq) {
        return {}
      }
    }
    return passed
  })

  useEffect(() => {
    if (!isDirectOrder && (!username || !userdata)) {
      navigate("/instagram", { replace: true })
    }
  }, [username, userdata, navigate, isDirectOrder])

  const directServiceKey = location.state?.service
  const serviceTypeKey = detectServiceType(selectedService?.name || directServiceKey || "", selectedService?.category || "")
  const serviceKey = selectedService?.serviceKey || getServiceKey(platform, selectedService?.name || directServiceKey || "")
  const currentConfig = serviceConfigs[serviceTypeKey] || serviceConfigs.likes
  const currentPricing = prices?.[serviceKey]
  const isProfileService = currentConfig.isProfile

  const posts = selectedPosts.length > 0 ? selectedPosts : (userdata?.posts || [])
  const postCount = isProfileService
    ? 1
    : (contentType && selectedItems.length > 0)
      ? selectedItems.length
      : (contentType && singleLink ? 1 : posts.length)

  const contentMinRequired = contentType && selectedItems.length > 0
    ? selectedItems.length * MIN_PER_POST
    : 0

  const API_URL = `${API_URL_BASE}/api/pricing/calculate`

  useEffect(() => {
    setPrices({})
    setTotal(0)
  }, [platform, serviceKey])

  const fetchPrices = async (qty) => {
    if (qty === undefined || qty === null) return
    try {
      setLoading(true)
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" },
        cache: "no-store",
        body: JSON.stringify({
          platform,
          serviceId: selectedService?._id || selectedService?.id,
          serviceName: selectedService?.name,
          values: { [serviceKey]: qty }
        })
      })
      const data = await response.json()
      if (data.success) {
        setPrices(data.data.items)
        setTotal(data.data.total)
        const item = data.data.items?.[serviceKey]
        if (item) {
          const min = item.minOrder !== undefined ? Number(item.minOrder) : 50
          const max = item.maxOrder !== undefined ? Number(item.maxOrder) : 10000
          setOrderLimits({ min, max, step: min >= 1000 ? 100 : 50 })
          setQuantity((prev) => {
            const minValue = Number(min)
            const maxValue = Number(max)
            if (!prev) return minValue
            if (prev === orderLimits.min) return minValue
            if (prev < minValue) return minValue
            if (prev > maxValue) return maxValue
            return prev
          })
        }
      }
    } catch (error) {
      console.log("PRICE ERROR:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrices(quantity)
    const interval = setInterval(() => { fetchPrices(quantity) }, 3000)
    return () => clearInterval(interval)
  }, [quantity, platform, serviceKey])

  // Auto-split quantity among selected items
  const recalcSplits = useCallback((totalQty) => {
    if (selectedItems.length === 0) return
    const minReq = selectedItems.length * 50
    if (totalQty < minReq) {
      setSplitQuantities((prev) => {
        if (Object.keys(prev).length === 0) return prev
        return {}
      })
      return
    }
    const base = Math.floor(totalQty / selectedItems.length)
    const remainder = totalQty % selectedItems.length
    const newSplit = {}
    selectedItems.forEach((item, index) => {
      newSplit[item.id] = base + (index < remainder ? 1 : 0)
    })
    setSplitQuantities(newSplit)
  }, [selectedItems])

  useEffect(() => {
    if (contentType && selectedItems.length > 0) {
      const minReq = selectedItems.length * 50
      if (quantity >= minReq) {
        recalcSplits(quantity)
      } else {
        setSplitQuantities((prev) => {
          if (Object.keys(prev).length === 0) return prev
          return {}
        })
      }
    }
  }, [quantity, recalcSplits, contentType, selectedItems.length])

  const handleSplitChange = (itemId, newValue) => {
    let val
    if (newValue === '') {
      val = ''
    } else {
      const parsed = Number(newValue)
      val = isNaN(parsed) ? newValue : parsed
    }

    if (selectedItems.length === 0) return

    const otherCount = selectedItems.length - 1

    if (otherCount > 0 && typeof val === 'number' && !isNaN(val)) {
      const remaining = quantity - val
      const base = Math.floor(remaining / otherCount)
      const remainder = remaining % otherCount
      setSplitQuantities((prev) => {
        const next = { ...prev, [itemId]: val }
        const others = selectedItems.filter((s) => s.id !== itemId)
        others.forEach((item, index) => {
          next[item.id] = base + (index < remainder ? 1 : 0)
        })
        return next
      })
    } else {
      setSplitQuantities((prev) => ({ ...prev, [itemId]: val }))
    }
  }

  const validateSplits = () => {
    if (!(contentType && selectedItems.length > 0)) return ''
    const minReq = selectedItems.length * 50
    if (quantity < minReq) return ''

    let sum = 0
    for (const item of selectedItems) {
      const val = splitQuantities[item.id]
      if (val === undefined || val === null || val === '') {
        return `Every ${currentConfig.unitLabel.toLowerCase()} quantity is required.`
      }
      const num = Number(val)
      if (isNaN(num)) {
        return 'Quantity must be a valid number.'
      }
      if (num < 0) {
        return 'No negative values allowed.'
      }
      if (!Number.isInteger(num)) {
        return 'No decimal values allowed.'
      }
      if (num < MIN_PER_POST) {
        return `Every ${currentConfig.unitLabel.toLowerCase()} quantity must be at least ${MIN_PER_POST}.`
      }
      sum += num
    }
    if (sum !== quantity) {
      return `Split total (${sum}) must equal total quantity (${quantity}).`
    }
    return ''
  }

  const splitError = validateSplits()

  const idToShortcodeInFrontend = (id) => {
    if (!id) return null
    try {
      const longId = id.toString().split('_')[0]
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
      let n = BigInt(longId)
      let res = ''
      while (n > 0n) { res = alphabet[Number(n % 64n)] + res; n = n / 64n }
      return res
    } catch (e) { return null }
  }

  const links = posts?.map((p) => {
    if (p.link) return p.link
    if (platform === 'instagram') {
      const sc = p.shortcode || p.code || idToShortcodeInFrontend(p.id || p.pk)
      if (sc) return `https://www.instagram.com/p/${sc}/`
    }
    return null
  }).filter(Boolean)

  const link = links && links.length > 0 ? links.join(', ') : null

  const buildOrders = () => {
    // DIRECT ORDER (URL flow)
    if (isDirectOrder && orderLink) {
      const serviceId = Number(selectedService?._id ||
        selectedService?.id || selectedService?.provider_service_id) ||
        Number(prices?.[serviceKey]?.serviceId) || 0
      return [{
        platform,
        order: { [serviceKey]: quantity },
        link: orderLink,
        serviceId: Number(selectedService?.provider_service_id),
        directOrder: true,
      }]
    }

    // CONTENT TYPE FLOW: multi-post split
    if (contentType && selectedItems.length > 0) {
      const serviceId = selectedService?.provider_service_id || prices?.[serviceKey]?.serviceId
      return selectedItems.map(item => ({
        platform,
        order: { [serviceKey]: splitQuantities[item.id] || 0 },
        link: item.link,
        serviceId,
        contentType,
        id: item.id
      }))
    }

    // CONTENT TYPE FLOW: single link (backward compat)
    if (contentType && singleLink) {
      const serviceId = selectedService?.provider_service_id || prices?.[serviceKey]?.serviceId
      return [{
        platform,
        order: { [serviceKey]: quantity },
        link: singleLink,
        serviceId,
        contentType
      }]
    }

    const serviceId = selectedService?.provider_service_id || prices?.[serviceKey]?.serviceId
    if (!serviceId) {
      alert("Service ID is missing")
      return
    }

    const qtyPerPost = postCount > 0 ? Math.floor(quantity / postCount) : quantity

    if (isProfileService) {
      const profileLink = platform === 'youtube'
        ? `https://www.youtube.com/@${username}`
        : platform === 'facebook'
          ? `https://www.facebook.com/${username}`
          : platform === 'tiktok'
            ? `https://www.tiktok.com/@${username}`
            : `https://www.instagram.com/${username}/`
      return [{
        platform,
        order: { [serviceKey]: quantity },
        link: profileLink,
        serviceId
      }]
    }

    if (!posts || posts.length === 0) {
      return [{
        platform,
        order: { [serviceKey]: quantity },
        link: platform === "instagram"
          ? `https://www.instagram.com/${username}/`
          : platform === "tiktok"
            ? `https://www.tiktok.com/@${username}`
            : orderLink,
        serviceId
      }]
    }

    return posts.map((p) => {
      let postLink = p.link || p.permalink
      if (!postLink) {
        if (platform === 'youtube') {
          const videoId = p.videoId || p.id || p.video_id
          postLink = videoId ? `https://www.youtube.com/watch?v=${videoId}` : `https://www.youtube.com/@${username}`
        } else if (platform === 'facebook') {
          postLink = p.link || p.url || `https://www.facebook.com/${username}/posts/${p.id || p.post_id}`
        } else if (platform === 'instagram') {
          const sc = p.shortcode || p.code || idToShortcodeInFrontend(p.id || p.pk)
          postLink = sc ? `https://www.instagram.com/p/${sc}/` : null
        }
      }
      return {
        platform,
        order: { [serviceKey]: qtyPerPost },
        link: postLink,
        serviceId
      }
    })
  }

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

  const config = platformConfig[platform] || platformConfig.instagram

  // FRONTEND PRICE CALCULATION LOGIC
  const getPricingDetails = () => {
    const packages = currentPricing?.packages || selectedService?.packages || selectedService?.pricing?.packages || [];

    if (packages && packages.length > 0) {
      const sortedPackages = [...packages].sort((a, b) => (Number(a.displayOrder) || 0) - (Number(b.displayOrder) || 0) || Number(a.quantity) - Number(b.quantity));

      const exact = sortedPackages.find(p => Number(p.quantity) === Number(quantity));
      if (exact) {
        const price = Number(exact.price);
        return { price, unitPrice: price / quantity, packages: sortedPackages };
      }

      if (quantity <= sortedPackages[0].quantity) {
        const unitPrice = sortedPackages[0].price / sortedPackages[0].quantity;
        return { price: unitPrice * quantity, unitPrice, packages: sortedPackages };
      }

      const maxPkg = sortedPackages[sortedPackages.length - 1];
      if (quantity >= maxPkg.quantity) {
        const unitPrice = maxPkg.price / maxPkg.quantity;
        return { price: unitPrice * quantity, unitPrice, packages: sortedPackages };
      }

      let lower = sortedPackages[0];
      let upper = maxPkg;
      for (let i = 0; i < sortedPackages.length - 1; i++) {
        if (quantity >= sortedPackages[i].quantity && quantity <= sortedPackages[i + 1].quantity) {
          lower = sortedPackages[i];
          upper = sortedPackages[i + 1];
          break;
        }
      }

      const fraction = (quantity - lower.quantity) / (upper.quantity - lower.quantity);
      const price = lower.price + fraction * (upper.price - lower.price);
      return { price, unitPrice: price / quantity, packages: sortedPackages };
    }

    const apiPrice = currentPricing?.price || prices?.[serviceTypeKey]?.price || 0;
    const apiUnitPrice = currentPricing?.unitPrice || prices?.[serviceTypeKey]?.unitPrice || 0;
    return { price: apiPrice, unitPrice: apiUnitPrice, packages: [] };
  };

  const { price: computedSubtotal, unitPrice: computedUnitPrice, packages: computedPackages } = getPricingDetails();

  const getEffectiveSubtotal = () => computedSubtotal || 0

  const calculatePrice = () => {
    const subtotal = getEffectiveSubtotal()
    return appliedCoupon ? +(subtotal - subtotal * appliedCoupon.discount).toFixed(2) : subtotal
  }

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
    if (contentType && selectedItems.length > 0) {
      const splitTotal = Object.values(splitQuantities).reduce((s, q) => s + q, 0)
      if (splitTotal !== quantity) {
        alert(`Split total (${splitTotal}) must equal total quantity (${quantity})`)
        return
      }
      const hasBelowMin = Object.values(splitQuantities).some(q => q < MIN_PER_POST)
      if (hasBelowMin) {
        alert(`Each ${currentConfig.unitLabel.toLowerCase()} must have at least ${MIN_PER_POST} quantity`)
        return
      }
    }

    const orders = buildOrders()

    if (isDirectOrder) {
      navigate('/payment', {
        state: {
          directOrder: true, orderLink, platform, linkType,
          selectedService: selectedService || { name: serviceTypeKey, serviceKey: serviceTypeKey },
          orders, totalPrice: calculatePrice(), appliedCoupon,
        }
      })
      return
    }

    navigate('/payment', {
      state: {
        username, platform, selectedService, userdata, selectedPosts,
        orders, totalPrice: calculatePrice(), appliedCoupon,
        selectedItems: contentType ? selectedItems : undefined
      }
    })
  }

  const handleBackToPosts = () => {
    if (isProfileService) {
      if (entryPath) {
        navigate(entryPath, { replace: true })
      } else {
        navigate("/profile-overview", {
          state: { username, platform, selectedService, userdata },
          replace: true
        })
      }
      return
    }

    navigate('/posts-selection', {
      state: {
        username, platform, selectedService, userdata, quantity,
        selectedPostsIds: selectedPosts.map((p, i) => p.id || p.videoId || p.pk || i),
        splitQuantities: location.state?.splitQuantities || {},
        entryPath
      },
      replace: true
    })
  }

  const orderTotalQty = Object.values(splitQuantities).reduce((s, q) => s + (Number(q) || 0), 0)
  const splitValid = contentType && selectedItems.length > 0
    ? (quantity >= selectedItems.length * 50 && orderTotalQty === quantity && !splitError)
    : true

  return (
    <div className={`min-h-screen bg-transparent py-8 px-4`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={isDirectOrder ? () => navigate(-1) : handleBackToPosts}
            className="group flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-900 transition-all duration-300 text-[10px] font-bold">
              ←
            </span>
            <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
              Back
            </span>
          </button>
        </div>

        {isDirectOrder ? (
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                {linkType === 'profile' ? '👤' : '📄'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h1 className="text-xl font-bold text-gray-900 capitalize">{platform} Direct Order</h1>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${linkType === 'profile' ? 'bg-violet-100 text-violet-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                    {linkType === 'profile' ? 'Profile' : 'Post'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate mb-2">{orderLink}</p>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <span>Service: <span className="font-semibold capitalize">{serviceTypeKey}</span></span>
                  <span className="text-gray-300">•</span>
                  <span>Platform: <span className="font-semibold capitalize">{platform}</span></span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-2 border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                {userdata?.avatar ? (
                  <img
                    src={userdata.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `${API_URL_BASE}/api/instagram/image?url=${encodeURIComponent(userdata?.avatar)}`
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
                  <span>{currentConfig.targetLabel}: <span className="font-semibold">{postCount}</span></span>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  {isProfileService ? (
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
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Select Quantity for <span className={`bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>{selectedService?.name}</span>
              </h2>

              <div className="mb-8">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-700 font-semibold text-lg">Select Package</span>
                    <span className="text-2xl font-bold text-pink-600">{quantity}</span>
                  </div>
                  {computedPackages && computedPackages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 gap-6 mb-8 pt-4 justify-items-center">
                      {computedPackages.map((pkg, index) => {
                        const hasBadge = pkg.badge && pkg.badge.toLowerCase().trim() !== "none" && pkg.badge.toLowerCase().trim() !== "null" && pkg.badge.trim() !== "";

                        const getCardTheme = (color, badge) => {
                          const c = (color || "").toLowerCase().trim();
                          const b = (badge || "").toLowerCase().trim();

                          let themeKey = "default";
                          if (c === "orange" || b === "best selling") themeKey = "orange";
                          else if (c === "blue" || b === "bulk price" || b === "most popular") themeKey = "blue";
                          else if (c === "purple" || b === "premium") themeKey = "purple";
                          else if (c === "red" || b === "hot deal" || b === "limited offer") themeKey = "red";
                          else if (c === "green" || b === "recommended") themeKey = "green";
                          else if (c === "pink" || c === "yellow") themeKey = c;

                          switch (themeKey) {
                            case "orange":
                              return {
                                badgeClass: "bg-orange-500 text-white",
                                cardClass: "bg-orange-50/20 hover:bg-orange-50/40 border-orange-200 hover:border-orange-300 hover:shadow-orange-500/10",
                                selectedClass: "bg-orange-50 border-orange-500 shadow-orange-500/30 shadow-xl scale-105 animate-cardFloat",
                                offerClass: "bg-orange-100 text-orange-700",
                                borderVarClass: "border-orange"
                              };
                            case "blue":
                              return {
                                badgeClass: "bg-blue-600 text-white",
                                cardClass: "bg-blue-50/20 hover:bg-blue-50/40 border-blue-200 hover:border-blue-300 hover:shadow-blue-500/10",
                                selectedClass: "bg-blue-50 border-blue-500 shadow-blue-500/30 shadow-xl scale-105 animate-cardFloat",
                                offerClass: "bg-blue-100 text-blue-700",
                                borderVarClass: "border-blue"
                              };
                            case "purple":
                              return {
                                badgeClass: "bg-purple-600 text-white",
                                cardClass: "bg-gradient-to-br from-purple-50/10 to-pink-50/10 hover:from-purple-50/20 hover:to-pink-50/20 border-purple-200 hover:border-purple-300 hover:shadow-purple-500/10",
                                selectedClass: "bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 border-purple-500 shadow-purple-500/30 shadow-xl scale-105 animate-cardFloat",
                                offerClass: "bg-purple-100 text-purple-700",
                                borderVarClass: "border-purple"
                              };
                            case "red":
                              return {
                                badgeClass: "bg-red-500 text-white",
                                cardClass: "bg-red-50/20 hover:bg-red-50/40 border-red-200 hover:border-red-300 hover:shadow-red-500/10",
                                selectedClass: "bg-red-50 border-red-500 shadow-red-500/30 shadow-xl scale-105 animate-cardFloat",
                                offerClass: "bg-red-100 text-red-700",
                                borderVarClass: "border-red"
                              };
                            case "green":
                              return {
                                badgeClass: "bg-emerald-500 text-white",
                                cardClass: "bg-emerald-50/20 hover:bg-emerald-50/40 border-emerald-200 hover:border-emerald-300 hover:shadow-emerald-500/10",
                                selectedClass: "bg-emerald-50 border-emerald-500 shadow-emerald-500/30 shadow-xl scale-105 animate-cardFloat",
                                offerClass: "bg-emerald-100 text-emerald-700",
                                borderVarClass: "border-green"
                              };
                            case "pink":
                              return {
                                badgeClass: "bg-pink-500 text-white",
                                cardClass: "bg-pink-50/20 hover:bg-pink-50/40 border-pink-200 hover:border-pink-300 hover:shadow-pink-500/10",
                                selectedClass: "bg-pink-50 border-pink-500 shadow-pink-500/30 shadow-xl scale-105 animate-cardFloat",
                                offerClass: "bg-pink-100 text-pink-700",
                                borderVarClass: "border-pink"
                              };
                            case "yellow":
                              return {
                                badgeClass: "bg-amber-400 text-slate-900",
                                cardClass: "bg-amber-50/20 hover:bg-amber-50/40 border-amber-200 hover:border-amber-300 hover:shadow-amber-500/10",
                                selectedClass: "bg-amber-50 border-amber-500 shadow-amber-500/30 shadow-xl scale-105 animate-cardFloat",
                                offerClass: "bg-amber-100 text-amber-700",
                                borderVarClass: "border-yellow"
                              };
                            default:
                              return {
                                badgeClass: "bg-pink-600 text-white",
                                cardClass: "bg-white hover:bg-gray-50 border-gray-200 hover:border-pink-200 hover:shadow-md",
                                selectedClass: "bg-pink-50 border-pink-500 shadow-pink-500/20 shadow-xl scale-105 animate-cardFloat",
                                offerClass: "bg-pink-100 text-pink-700",
                                borderVarClass: "border-default"
                              };
                          }
                        };

                        const isSelected = quantity === pkg.quantity;
                        const theme = hasBadge ? getCardTheme(pkg.badgeColor, pkg.badge) : getCardTheme(pkg.badgeColor, "default");

                        return (
                          <button
                            key={index}
                            onClick={() => {
                              setSelectedPackage(pkg);
                              setQuantity(pkg.quantity);
                            }}
                            className={`relative rounded-[20px] transition-all duration-300 flex flex-col items-center justify-center p-4 cursor-pointer select-none w-[145px] h-[135px] ${isSelected
                              ? `animate-border-run ${theme.borderVarClass} ${theme.selectedClass} shadow-xl scale-105`
                              : `border-2 hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-lg ${theme.cardClass}`
                              }`}
                            style={{ overflow: 'visible' }}
                          >
                            {/* Badge is outside overflow-hidden, so it remains fully visible */}
                            {hasBadge && (
                              <span
                                className={`absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider whitespace-nowrap shadow-sm border border-white/20 animate-badgePulse z-20 ${theme.badgeClass}`}
                              >
                                {pkg.badge}
                              </span>
                            )}

                            {/* Content wrapper */}
                            <div className="relative z-10 flex flex-col  items-center justify-center h-full">
                              <h3 className="text-3xl font-black text-gray-900">{pkg.quantity}</h3>

                              {pkg.offerText && pkg.offerText.trim() !== "" && (
                                <span className={`mt-2 px-2 py-0.5 rounded font-extrabold text-[10px] tracking-wide ${theme.offerClass}`}>
                                  {pkg.offerText}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600 font-medium capitalize">{currentConfig.quantityLabel}</span>
                    <span className="text-2xl font-bold text-gray-900">{quantity.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={computedPackages?.[0]?.quantity || 50}
                    max={computedPackages?.[computedPackages.length - 1]?.quantity || 1000}
                    step={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer bg-gray-200"
                  />
                  <div className="flex justify-between text-xs mt-2 text-gray-400">
                    <span>{computedPackages?.[0]?.quantity || 50}</span>
                    <span className="font-semibold text-pink-600">{quantity}</span>
                    <span>{computedPackages?.[computedPackages.length - 1]?.quantity || 1000}</span>
                  </div>
                </div>
              </div>

              {contentType && selectedItems.length > 0 && quantity < contentMinRequired && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
                  <p className="text-red-700 font-semibold text-sm">
                    Minimum quantity is {contentMinRequired} because you selected {selectedItems.length} {currentConfig.targetLabel.toLowerCase()} (50 each).
                  </p>
                </div>
              )}

              {/* Distribution Breakdown */}
              <div className="bg-blue-50 rounded-2xl p-6 mb-8">
                <h3 className="font-semibold text-blue-900 mb-3">Distribution Breakdown</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">Total {currentConfig.quantityLabel}:</span>
                    <span className="font-bold text-blue-900 ml-2">{quantity.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Unit Rate:</span>
                    <span className="font-medium text-gray-700">${(computedUnitPrice || 0).toFixed(4)}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">{currentConfig.targetLabel}:</span>
                    <span className="font-bold text-blue-900 ml-2">{postCount}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Platform:</span>
                    <span className="font-bold text-blue-900 ml-2 capitalize">{platform}</span>
                  </div>
                </div>
              </div>

              {/* Per-Post Split Editor */}
              {contentType && selectedItems.length > 0 && quantity >= contentMinRequired && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Per-{currentConfig.unitLabel} Quantity Split</h3>
                  <div className="space-y-3 mb-4">
                    {selectedItems.map((item) => {
                      const qty = splitQuantities[item.id] || 0
                      return (
                        <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                            {item.image ? (
                              <img src={item.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">📄</div>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 truncate flex-1 max-w-[120px]">{item.link}</span>
                          <input
                            type="number"
                            min={MIN_PER_POST}
                            step={1}
                            value={qty}
                            onChange={(e) => handleSplitChange(item.id, e.target.value)}
                            className="w-20 px-3 py-2 border-2 border-gray-200 rounded-xl text-center font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Total: <strong className="text-gray-900">{orderTotalQty}</strong> / {quantity}
                    </span>
                    {splitError ? (
                      <span className="text-red-600 text-xs font-medium">{splitError}</span>
                    ) : orderTotalQty === quantity ? (
                      <span className="text-green-600 text-xs font-medium">✓ Each {currentConfig.unitLabel.toLowerCase()} has minimum {MIN_PER_POST}</span>
                    ) : null}
                  </div>
                </div>
              )}

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
                  <span className="text-gray-600">{currentConfig.targetLabel}:</span>
                  <span className="font-semibold">{postCount}</span>
                </div>
                <div className="flex justify-between text-sm py-1 border-b border-gray-50">
                  <span className="text-gray-500">Unit Rate:</span>
                  <span className="font-medium text-gray-700">${(computedUnitPrice || 0).toFixed(4)}</span>
                </div>
                <div className="flex justify-between text-sm py-1">
                  <span className="text-gray-600 font-semibold">Cost Per {currentConfig.unitLabel}:</span>
                  <span className="font-bold text-gray-900">${(calculatePrice() / (postCount || 1)).toFixed(2)}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">${getEffectiveSubtotal().toFixed(2)}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-sm text-green-600 mb-2">
                      <span>Discount ({(appliedCoupon.discount * 100).toFixed(0)}%):</span>
                      <span>${(getEffectiveSubtotal() * appliedCoupon.discount).toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900">Total:</span>
                    <span className={`font-bold text-2xl bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                      ${calculatePrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleContinue}
                disabled={quantity < contentMinRequired || !splitValid}
                className={`w-full bg-gradient-to-r ${config.color} text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
              >
                Proceed to Payment
              </button>

              {quantity < contentMinRequired && (
                <p className="text-red-500 text-xs text-center mt-2">
                  Minimum quantity: {contentMinRequired}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuantityPricing
