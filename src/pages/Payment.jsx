import { useState, useEffect } from 'react'
import API_URL from '../config/api'
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

  // Read state from location.state or restore from sessionStorage if returning from PayPal redirect
  const getInitialOrderData = () => {
    if (location.state && Object.keys(location.state).length > 0) {
      return location.state;
    }
    const saved = sessionStorage.getItem("tikytop_paypal_pending");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {};
  };

  const orderData = getInitialOrderData()
  const {
    username,
    platform,
    selectedService,
    userdata,
    selectedPosts = [],
    orders        = [],
    totalPrice    = 0,
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

  // Strip bracket metadata + country codes from raw API service names
  const cleanServiceName = (name) => {
    if (!name) return ''
    let clean = name.replace(/\[.*?\]/g, '').trim()
    clean = clean.replace(/^[A-Z]{2,3}\s+/g, '').trim()
    return clean
  }
  const displayServiceName = cleanServiceName(selectedService?.name)

  // Guard & PayPal Redirect return handler
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paypalStatus = searchParams.get("paypal_status");
    const token = searchParams.get("token");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      window.history.replaceState({}, document.title, location.pathname);
      if (errorParam === "payment_userCancelled" || errorParam === "userCancelled") {
        alert("Payment was cancelled.");
      } else {
        alert("Payment failed or could not be completed. Please try again.");
      }
      return;
    }

    if (paypalStatus === "cancel") {
      window.history.replaceState({}, document.title, location.pathname);
      sessionStorage.removeItem("tikytop_paypal_pending");
      alert("PayPal payment was cancelled.");
      return;
    }

    if (paypalStatus === "success" && token) {
      window.history.replaceState({}, document.title, location.pathname);

      const savedCheckout = sessionStorage.getItem("tikytop_paypal_pending");
      let checkoutInfo = orderData;
      if (savedCheckout) {
        try {
          checkoutInfo = JSON.parse(savedCheckout);
        } catch (e) {}
      }

      const ordersToCapture = checkoutInfo.orders || orders;
      const amountToCapture = checkoutInfo.totalPrice || total;
      const platformToCapture = checkoutInfo.platform || platform;
      const usernameToCapture = checkoutInfo.username || username;

      const processCapture = async () => {
        setPaying(true);
        try {
          const res = await fetch(`${API_URL}/api/payment/paypal/capture`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderID: token,
              orders: ordersToCapture,
              amount: amountToCapture,
              platform: platformToCapture,
              username: usernameToCapture,
              directOrder: checkoutInfo.directOrder,
              orderLink: checkoutInfo.orderLink,
            }),
          });
          const data = await res.json();
          if (data.success) {
            sessionStorage.removeItem("tikytop_paypal_pending");
            alert("PayPal Payment Successful 🎉 Your order is being processed!");
            navigate("/complete", {
              state: {
                orderId: data.orderId || data.order?.order_id,
                username: usernameToCapture,
                platform: platformToCapture,
                service: checkoutInfo.selectedService?.name || selectedService?.name || "SMM Service",
                quantity: ordersToCapture?.[0]?.quantity || 50,
                price: amountToCapture,
              },
            });
          } else {
            alert(data.message || "PayPal payment verification failed. Contact support.");
          }
        } catch (err) {
          console.error("PayPal capture error:", err);
          alert("Error capturing PayPal payment. Please contact support.");
        } finally {
          setPaying(false);
        }
      };

      processCapture();
      return;
    }

    if (!directOrder && (!username || !userdata)) {
      navigate('/' + (platform || 'instagram'), { replace: true });
      return;
    }
    if (orders.length > 0 && orders[0].link) {
      setProfileUrl(orders[0].link);
    }
  }, [location.search]);

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
      const response = await fetch(`${API_URL}/api/payment/order`, {
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
            const verifyRes = await fetch(`${API_URL}/api/payment/verify`, {
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

  // Load PayPal SDK dynamically
  const loadPaypalSDK = async () => {
    if (window.paypal) return true;
    try {
      const res = await fetch(`${API_URL}/api/payment/paypal/config`);
      const data = await res.json();
      if (!data.clientId) {
        throw new Error("PayPal Client ID missing");
      }
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "paypal-js-sdk";
        script.src = `https://www.paypal.com/sdk/js?client-id=${data.clientId}&currency=USD`;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    } catch (err) {
      console.error("PayPal SDK load error:", err);
      return false;
    }
  };

  // Render PayPal Buttons dynamically when PayPal payment method is selected
  useEffect(() => {
    let paypalButtonsInstance = null;
    let isMounted = true;

    if (paymentMethod === "paypal") {
      loadPaypalSDK().then((loaded) => {
        if (!loaded || !isMounted) return;

        const container = document.getElementById("paypal-button-container");
        if (!container) return;
        container.innerHTML = "";

        if (window.paypal && window.paypal.Buttons) {
          paypalButtonsInstance = window.paypal.Buttons({
            style: {
              layout: "vertical",
              color: "gold",
              shape: "rect",
              label: "paypal"
            },

            createOrder: async (data, actions) => {
              if (!validateOrdersPlatform()) {
                throw new Error("Validation failed");
              }
              const response = await fetch(`${API_URL}/api/payment/paypal/order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  amount: total,
                  orders,
                  platform,
                  username: directOrder ? (orderLink || "Direct Order") : username,
                  directOrder,
                  orderLink,
                }),
              });
              const resData = await response.json();
              if (!resData.success || !resData.orderID) {
                throw new Error(resData.message || "PayPal order creation failed");
              }
              return resData.orderID;
            },

            onApprove: async (data, actions) => {
              setPaying(true);
              try {
                const res = await fetch(`${API_URL}/api/payment/paypal/capture`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    orderID: data.orderID,
                    orders,
                    amount: total,
                    platform,
                    username: directOrder ? (orderLink || "Direct Order") : username,
                    directOrder,
                    orderLink,
                  }),
                });
                const captureData = await res.json();
                if (captureData.success) {
                  alert("PayPal Payment Successful 🎉 Your order is being processed!");
                  navigate("/complete", {
                    state: {
                      orderId: captureData.orderId || captureData.order?.order_id,
                      username: directOrder ? (orderLink || "Direct Order") : username,
                      platform,
                      service: selectedService?.name || "SMM Service",
                      quantity: orders?.[0]?.quantity || 50,
                      price: total,
                    },
                  });
                } else {
                  alert(captureData.message || "PayPal payment verification failed. Contact support.");
                }
              } catch (err) {
                console.error("PayPal capture error:", err);
                alert("PayPal payment could not be completed. Please try again.");
              } finally {
                setPaying(false);
              }
            },

            onCancel: (data) => {
              console.log("PayPal payment cancelled by user:", data);
              alert("Payment cancelled. You can try PayPal again or choose another payment method.");
              setPaying(false);
            },

            onError: (err) => {
              console.error("PayPal SDK error:", err);
              alert("PayPal payment could not be completed. Please try again.");
              setPaying(false);
            }
          });

          if (paypalButtonsInstance.isEligible && paypalButtonsInstance.isEligible()) {
            paypalButtonsInstance.render("#paypal-button-container");
          }
        }
      });
    }

    return () => {
      isMounted = false;
      const container = document.getElementById("paypal-button-container");
      if (container) container.innerHTML = "";
    };
  }, [paymentMethod, total, platform, username, orders, directOrder, orderLink]);

  // handle Paypal fallback
  const handlePaypalPayment = async () => {
    // PayPal buttons are rendered directly via PayPal SDK
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
        `${API_URL}/api/payment/verify`,
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

  // PayU Payment
  const handlePayuPayment = async () => {
    if (paying) return;
    setPaying(true);

    if (!validateOrdersPlatform()) {
      setPaying(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/payu/create-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          platform,
          username: directOrder ? (orderLink || "Direct Order") : username,
          orders,
          directOrder,
          orderLink,
          email: user?.email || "",
          phone: user?.phone || "",
        }),
      });

      const data = await response.json();

      if (!data.success || !data.params || !data.payuUrl) {
        alert(data.message || "PayU payment initialization failed");
        setPaying(false);
        return;
      }

      // Dynamically create and submit HTML form to PayU gateway
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.payuUrl;

      Object.keys(data.params).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = data.params[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

    } catch (error) {
      console.error("PayU Payment Error:", error);
      alert("PayU payment failed to connect. Please try again.");
      setPaying(false);
    }
  };

  // Handle payment method dispatch
  const handlePayment = () => {
    if (paymentMethod === "coins") {
      handleCoinsPayment();
    } else if (paymentMethod === "payu") {
      handlePayuPayment();
    } else {
      handleRazorpayPayment();
    }
  };

  // JSX 
  return (
    <div className={`min-h-screen bg-transparent py-8 px-4`}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="relative text-center mb-8">
          <div className="flex items-center justify-between max-w-6xl mx-auto mb-4 px-2">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 text-sm font-semibold rounded-full shadow-md border border-gray-200 transition-all hover:scale-105"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
            <div className="inline-block bg-white px-6 py-2 rounded-full shadow-md">
              <span className="text-sm text-gray-600">Final Step</span>
            </div>
            <div className="w-20 hidden sm:block"></div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-600">Fast & Secure Checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left: Order info ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-8 border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Order Details</h2>

               {/* Orders list */}
               <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-100 mb-6">
                 <div className="flex justify-between items-start gap-3 mb-4">
                     <div className="min-w-0 flex-1">
                       <h3 className="text-lg sm:text-2xl font-bold text-gray-900 capitalize leading-tight break-words">
                         {displayServiceName || selectedService?.name}
                       </h3>
                       <p className="text-xs sm:text-sm text-gray-500 mt-1">
                         {orders.length === 1 ? '1 Target Link' : `${orders.length} Posts Selected`}
                       </p>
                     </div>
                     <div className={`text-base sm:text-xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent capitalize flex-shrink-0`}>
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
                           <div key={idx} className="text-xs sm:text-sm font-medium text-gray-800 bg-white px-3 py-2 rounded-xl border border-gray-100 break-all flex items-center justify-between gap-2 sm:gap-3">
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
          

              {/* Payment methods section */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <div>
                    <div className="font-semibold text-sm sm:text-base text-gray-900">Select Payment Method</div>
                    <div className="text-xs sm:text-sm text-gray-600">Cards, Net Banking, UPI, Wallets accepted</div>
                  </div>
                </div>
               
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-4">
                  <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all cursor-pointer ${paymentMethod === 'coins' ? 'border-pink-500 bg-pink-50/70 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                    <input type="radio" name="payment" value="coins" checked={paymentMethod === "coins"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-pink-600"
                    />
                    <span className="font-semibold text-xs sm:text-sm text-gray-800 whitespace-nowrap">
                     🎁 Coins
                    </span>
                  </label>
       
                  <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all cursor-pointer ${paymentMethod === 'razorpay' ? 'border-purple-500 bg-purple-50/70 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="razorpay"
                      checked={paymentMethod === "razorpay"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-purple-600"
                    />
                    <img
                      src={Razorpay}
                      alt="Razorpay"
                      className="h-4 sm:h-5 object-contain max-w-[65px] sm:max-w-[75px]"
                    />
                  </label>

                  <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all cursor-pointer ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50/70 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-blue-600"
                    />
                    <img
                      src={Paypal}
                      alt="PayPal"
                      className="h-4 sm:h-5 object-contain max-w-[65px] sm:max-w-[75px]"
                    />  
                  </label>

                  <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all cursor-pointer ${paymentMethod === 'payu' ? 'border-emerald-500 bg-emerald-50/70 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="payu"
                      checked={paymentMethod === "payu"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-emerald-600"
                    />
                    <span className="font-black text-xs text-white bg-gradient-to-r from-emerald-600 to-green-500 px-2 py-0.5 rounded shadow-sm">
                      PayU
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Summary + Pay button ── */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 border border-gray-100 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-150 pt-4 flex justify-between font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {paymentMethod === "coins" && (
                <div className="mb-6 p-3 bg-pink-50 text-pink-600 rounded-xl text-xs font-semibold flex justify-between">
                  <span>Your Balance:</span>
                  <span>${balance.toFixed(2)} Coins</span>
                </div>
              )}

              {paymentMethod === "paypal" ? (
                <div className="w-full min-h-[120px] flex flex-col justify-center items-center">
                  <div id="paypal-button-container" className="w-full"></div>
                </div>
              ) : (
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
                      Pay ${total.toFixed(2)}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default OrderPayment
