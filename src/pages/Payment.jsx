import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useScrollToTop from '../hooks/useScrollToTop'
import { getPlatformFromUrl } from '../utils/urlGenerator'
const RAZORPAY_KEY = 'rzp_live_SlBaGyXkNhPC8U'
import Razorpay from "../assets/icons/Razorpay.png"
import Paypal from "../assets/icons/Paypal.jpeg"

const platformConfig = {
  instagram: { color: 'from-pink-500 to-purple-600', name: 'Instagram', bgColor: 'bg-gradient-to-br from-pink-50 to-purple-50' },
  youtube:   { color: 'from-red-500 to-red-600',    name: 'YouTube',   bgColor: 'bg-gradient-to-br from-red-50 to-orange-50' },
  facebook:  { color: 'from-blue-600 to-blue-700',  name: 'Facebook',  bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50' },
  tiktok:    { color: 'from-black to-gray-800',     name: 'TikTok',    bgColor: 'bg-gradient-to-br from-gray-50 to-slate-50' },
}

const OrderPayment = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const location = useLocation()

  //  Read state from QuantityPricing 
  const orderData = location.state || {}
  const {
    username,
    platform,
    selectedService,
    userdata,
    selectedPosts = [],
    orders        = [],
    totalPrice    = 0,
    appliedCoupon,
    // Direct order extras
    directOrder   = false,
    orderLink     = '',
    linkType      = '',
  } = orderData

  const [paying,     setPaying]     = useState(false)
  const [profileUrl, setProfileUrl] = useState('')

  const user = JSON.parse(localStorage.getItem("user"));
  const balance = user?.balance || 0;

  console.log("USER:", user);
  console.log("BALANCE:", balance);

  const [paymentMethod, setPaymentMethod] = useState("coins");
  const config = platformConfig[platform] || platformConfig.instagram

  //  Guard — skip redirect for direct orders (no username/userdata needed)
  useEffect(() => {
    if (!directOrder && (!username || !userdata)) {
      navigate('/' + (platform || 'instagram'), { replace: true })
      return
    }
    if (orders.length > 0 && orders[0].link) {
      setProfileUrl(orders[0].link)
    }
  }, [])

  if (!directOrder && (!username || !userdata)) return null

  //  Total to charge 
  const total = totalPrice || 0
  console.log("TOTAL:", total);

  const validateOrdersPlatform = () => {
    for (const o of orders) {
      if (!o.link) continue;
      const detectedPlatform = getPlatformFromUrl(o.link);
      if (detectedPlatform && platform && detectedPlatform !== platform.toLowerCase()) {
        alert(`Checkout Blocked: URL (${o.link}) does not match the selected platform (${platform}).`);
        return false;
      }
      
      const linkLower = o.link.toLowerCase();
      if (platform && platform.toLowerCase() === 'tiktok') {
        if (linkLower.includes('instagram.com')) {
          alert("Checkout Blocked: TikTok services must never generate an Instagram URL.");
          return false;
        }
      }
      if (platform && platform.toLowerCase() === 'instagram') {
        if (linkLower.includes('tiktok.com')) {
          alert("Checkout Blocked: Instagram services must never generate a TikTok URL.");
          return false;
        }
      }
      if (platform && platform.toLowerCase() === 'youtube') {
        if (linkLower.includes('instagram.com') || linkLower.includes('tiktok.com')) {
          alert("Checkout Blocked: YouTube services must never generate Instagram or TikTok URLs.");
          return false;
        }
      }
    }
    return true;
  };

  // Load Razorpay SDK dynamically if not already loaded 
  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true)
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload  = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })

  //  Main payment handler (exact flow you provided) 
  const handleRazorpayPayment  = async () => {
    if (paying) return
    setPaying(true)

    if (!validateOrdersPlatform()) {
      setPaying(false)
      return
    }

    const loaded = await loadRazorpay()
    if (!loaded) {
      alert('Failed to load Razorpay. Please check your connection.')
      setPaying(false)
      return
    }

    try {
      // 1 — Create Razorpay order on backend
      const response = await fetch('http://localhost:5000/api/payment/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          platform,
          username: directOrder ? (orderLink || 'Direct Order') : username,
          orders,
          directOrder,
          orderLink,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        alert('Could not create payment order. Please try again.')
        setPaying(false)
        return
      }

      // 2 — Open Razorpay checkout
      const options = {
        key:       RAZORPAY_KEY,
        amount:    data.order.amount,     
        currency:  'INR',
        name:   platform === 'youtube'
                ? 'YouTube Services'
                : platform === 'tiktok'
                 ? 'TikTok Services'
                : 'Instagram Services',
        description: selectedService?.name || 'SMM Service',
        order_id:  data.order.id,
        prefill: {
          name:  userdata?.username || username,
          email: '',
          contact: '',
        },
        theme: { color: '#7c3aed' },

        // 3 — On successful payment: verify on backend
        handler: async function (razorpayResponse) {
          try {
            const verifyRes = await fetch('http://localhost:5000/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id:   razorpayResponse.razorpay_order_id,
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_signature:  razorpayResponse.razorpay_signature,
                orders,
                amount:   total,
                platform,
                username,
              }),
            })

            const verifyData = await verifyRes.json()

            if (verifyData.success) {
              alert('Payment Successful 🎉 Your order is being processed!')
              navigate('/')     
            } else {
              alert('Payment verification failed. Contact support.')
            }
          } catch (err) {
            console.error('Verify error:', err)
            alert('Verification error. Contact support.')
          } finally {
            setPaying(false)
          }
        },

        modal: {
          ondismiss: () => setPaying(false),
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()

    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment server error. Please try again.')
      setPaying(false)
    }

  }

  // handle Paypal 
  const handlePaypalPayment = async () => {
    if (!validateOrdersPlatform()) {
      return
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/payment/paypal/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalPrice,
            orders,
            platform,
            username: directOrder ? (orderLink || 'Direct Order') : username,
            directOrder,
            orderLink,
          }),
        }
      );

      // IMPORTANT
      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw new Error("Paypal API failed");
      }

      const data = await response.json();
      console.log("Paypal Response:", data);

      if (!data.success || !data.approvalUrl) {
        throw new Error("PayPal order creation failed");
      }

      navigate('/')
      // Redirect to PayPal
      window.location.href = data.approvalUrl;

    } catch (error) {
      console.log("Paypal Error:", error);
      alert("Paypal payment failed");
    }
  };

  // Coins Use payment
  const handleCoinsPayment = async () => {
    if (!validateOrdersPlatform()) {
      return
    }

    try {
      if (balance < total) {
        alert("Insufficient Coins");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/payment/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: total,
            username,
            orders,
            userId: user._id,
            useCoins: true
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Free Trial Order Placed Successfully 🎉");
        // UPDATE BALANCE
        user.balance = user.balance - total;
        localStorage.setItem("user", JSON.stringify(user));
        navigate('/');
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log(error);
      alert("Coins payment failed");
    }
  };

  // Handle Paypal payment (placeholder)
  const handlePayment = () => {
    if(paymentMethod === "coins"){
      handleCoinsPayment();
    }else if(paymentMethod === "paypal"){
      handlePaypalPayment();
    }else{
      handleRazorpayPayment();
    }
  };

  // JSX 
  return (
    <div className={`min-h-screen bg-transparent py-8 px-4`}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white px-6 py-2 rounded-full shadow-md mb-4">
            <span className="text-sm text-gray-600">Final Step</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-600">Powered by Razorpay — 100% secure</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left: Order info ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Details</h2>

               {/* Orders list */}
               <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 mb-6">
                 <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 capitalize">
                        {selectedService?.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {orders.length === 1 ? '1 Target Link' : `${orders.length} Posts Selected`}
                      </p>
                    </div>
                    <div className={`text-xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent capitalize`}>
                      {platform}
                    </div>
                  </div>

                  {/* Show delivery targets */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                      Delivery Target Link(s):
                    </span>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                       {orders.map((o, idx) => {
                         const orderQty = o.order ? Object.values(o.order)[0] : 0
                         return (
                           <div key={idx} className="text-sm font-medium text-gray-800 bg-white px-3 py-2 rounded-xl border border-gray-100 break-all flex items-center justify-between gap-3">
                             <span className="truncate max-w-[60%]">{o.link || "Profile Link"}</span>
                             <span className="font-semibold text-pink-600 shrink-0">{orderQty}</span>
                             <a href={o.link || "Profile Link"} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline shrink-0 font-semibold">
                               View
                             </a>
                           </div>
                         )
                       })}
                     </div>
                  </div>
               </div>  
          

              {/* Razorpay trust badge */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <div>
                    <div className="font-semibold text-gray-900">Secure Payment via Razorpay</div>
                    <div className="text-sm text-gray-600">UPI, Cards, Net Banking, Wallets accepted</div>
                  </div>
                </div>
               
                <div className="flex items-center gap-6 mt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="payment" value="coins" checked={paymentMethod === "coins"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="font-semibold text-sm">
                     🎁 Free Coins
                    </span>
                  </label>
       
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="razorpay"
                      checked={paymentMethod === "razorpay"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <img
                      src={Razorpay}
                      alt="Razorpay"
                      className="h-5"
                    />
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <img
                      src={Paypal}
                      alt="PayPal"
                      className="h-5"
                    />  
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Summary + Pay button ── */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({appliedCoupon.description})</span>
                    <span>-₹{(total * appliedCoupon.discount).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-150 pt-4 flex justify-between font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              {paymentMethod === "coins" && (
                <div className="mb-6 p-3 bg-pink-50 text-pink-600 rounded-xl text-xs font-semibold flex justify-between">
                  <span>Your Balance:</span>
                  <span>₹{balance.toFixed(2)} Coins</span>
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={paying}
                className={`w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r ${config.color} hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
              >
                {paying ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    Pay ₹{total.toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default OrderPayment
