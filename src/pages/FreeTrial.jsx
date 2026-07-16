import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const FreeTrialPage = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

 const handleGenerateClick = async (
  service
) => {

  const token =
    localStorage.getItem("token");

  // NOT LOGGED IN
  if (!token) {

    setShowPopup(true);

    return;
  }

  try {

    // CLAIM FREE TRIAL
    const response = await fetch(
      "http://localhost:5000/api/freetrial/claim-free-trial",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    const result =
      await response.json();


    // =========================
    // ALREADY CLAIMED
    // =========================

    if (!response.ok) {

      // USER ALREADY CLAIMED
      if (
        result.message ===
        "Free trial already claimed"
      ) {

        navigate(
          `/${service.platform}`
        );

        return;
      }

      alert(result.message);

      return;
    }


    // =========================
    // SUCCESS
    // =========================

    const localUser =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    // UPDATE BALANCE
    localUser.balance =
      result.balance;

    localStorage.setItem(
      "user",
      JSON.stringify(localUser)
    );

    alert(
      "50 Coins Added Successfully 🎉"
    );

    navigate(
      `/${service.platform}`
    );

  } catch (error) {

    console.error(
      "Error claiming free trial:",
      error
    );

    alert(
      "Error claiming free trial"
    );
  }
};



  const freeServices = [
    { id: 'likes', title: 'Instagram Likes Service', description:  "Boost your Instagram engagement with free trial likes instantly.", icon: '❤️', buttonText: 'Generate Likes', gradient: "from-pink-500 to-orange-400", platform: 'instagram' },
    { id: 'followers', title: "Instagram Followers Boost", description: "Try free Instagram followers and grow your profile visibility.", icon: '👥', buttonText: 'Generate Followers', gradient:  "from-purple-500 to-pink-500", platform: 'instagram' },
    { id: 'views', title: 'Instagram Views Service ', description:  "Increase your Instagram reel reach using free trial views.", icon: '👁️', buttonText: 'Generate Views', gradient: "from-orange-400 to-pink-400", platform: 'instagram' }
  ]

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-8 sm:pt-36 sm:pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Test it Free. Pay Nothing</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Test our services before buying. Start your free trial today with zero hidden fees.
          </p>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#FFA500] text-white px-6 py-3 rounded-full font-semibold shadow-lg">
            <span className="text-xl">🎁</span>
            <span>Get 50 Free Coins to Try Selected Services</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {freeServices.map((service, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                  <span className="text-3xl sm:text-4xl">{service.icon}</span>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center">{service.title}</h3>
              <p className="text-gray-600 text-sm text-center mb-6">{service.description}</p>
              <button onClick={() => handleGenerateClick(service)}
                className={`w-full bg-gradient-to-r ${service.gradient} text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105`}>
                {service.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">How Free Trial Works</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
               {step: "1", title: "Choose Service", desc: "Select Instagram trial service",},
               {step: "2", title: "Create Account", desc: "Login or register instantly",},
               {step: "3", title: "Claim Coins", desc: "Get 50 free trial coins",},
               {step: "4",title: "See Results", desc: "Experience fast delivery",},
             ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#FF6B35] to-[#FFA500] text-white rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mx-auto mb-3">{item.step}</div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showPopup && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="text-5xl mb-4">
          🎁
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Free Trial Access
        </h2>
        <p className="text-gray-600 mb-6">
          Login or create an account
          to claim your free trial coins.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="flex-1 bg-gradient-to-r from-[#FF6B35] to-[#FFA500] text-white py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="flex-1 bg-pink-500 text-white py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Register
          </button>
        </div>
        <button
          onClick={() => setShowPopup(false)}
          className="mt-4 text-gray-500 text-sm"
        >
          Close
        </button>
      </div>
    </div>
  )}
    </div>
  )
}

export default FreeTrialPage
