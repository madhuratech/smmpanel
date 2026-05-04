import { FaTiktok, FaInstagram, FaYoutube } from "react-icons/fa";
import RazorPay from "../assets/logos/RazorPay.png"
import Paytm from "../assets/logos/Paytm.svg"
import PayPal from "../assets/logos/PayPal.svg"
import PayU from "../assets/logos/PayU.svg"
import cashfreeLogo from "../assets/logos/cashfreeLogo.png"

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-16 pb-8 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* TikTok */}
          <div>
            <h3 className="text-lg font-semibold text-pink-500 flex items-center gap-2 mb-4">
              <FaTiktok /> TikTok Services
            </h3>
            <ul className="space-y-2">
              {[
                "Buy TikTok Likes",
                "Buy TikTok Views",
                "Buy TikTok Followers/Fans",
                "Buy TikTok Comments",
                "Buy TikTok Saves",
                "Buy TikTok Shares",
                "Buy TikTok Mentions",
              ].map((item, i) => (
                <li
                  key={i}
                  className="hover:text-pink-400 hover:translate-x-1 transition duration-300 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>

          </div>

          {/* Instagram */}
          <div>
            <h3 className="text-lg font-semibold text-pink-500 flex items-center gap-2 mb-4">
              <FaInstagram /> Instagram Services
            </h3>
            <ul className="space-y-2">
              {[
                "Buy Instagram Likes",
                "Buy Instagram Followers",
                "Buy Instagram Impressions",
                "Buy Instagram Reach",
                "Buy Instagram Story Views",
                "Buy Instagram Story Likes"
              ].map((item, i) => (
                <li
                  key={i}
                  className="hover:text-pink-400 hover:translate-x-1 transition duration-300 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
            
          </div>

          {/* Instagram Story & Reels */}
          <div>
            <h3 className="text-lg font-semibold text-pink-500 flex items-center gap-2 mb-4">
              <FaInstagram /> Instagram Reels
            </h3> 
            <ul className="space-y-2">
              <li className="hover:text-pink-400 hover:translate-x-1 transition cursor-pointer">
                Buy Instagram Reels Likes
              </li>
              <li className="hover:text-pink-400 hover:translate-x-1 transition cursor-pointer">
                Buy Instagram Reels Views
              </li>
              <li className="hover:text-pink-400 hover:translate-x-1 transition cursor-pointer">
                Buy Instagram Reels Shares
              </li>
              <li className="hover:text-pink-400 hover:translate-x-1 transition cursor-pointer">
                Buy Instagram Reels Saves
              </li>
            </ul>
          </div>

          {/* YouTube */}
          <div>
            <h3 className="text-lg font-semibold text-pink-500 flex items-center gap-2 mb-4">
              <FaYoutube /> YouTube Services
            </h3>
            <ul className="space-y-2">
              {[
                "Buy YouTube Shorts Likes",
                "Buy YouTube Shorts Views",
                "Buy YouTube Video Likes",
                "Buy YouTube Video Views",
              ].map((item, i) => (
                <li
                  key={i}
                  className="hover:text-pink-400 hover:translate-x-1 transition duration-300 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Line */}
      <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">

  {/* LEFT SIDE */}
  <div>
    © {new Date().getFullYear()} TikyTop. All rights reserved.
  </div>

  {/* RIGHT SIDE - PAYMENT LOGOS */}
  <div className="flex items-center gap-6 opacity-80">

    <img
      src={RazorPay}
      alt="Razorpay"
      className="h-6 object-contain hover:scale-110 transition"
    />

    <img
      src={Paytm}
      alt="Paytm"
      className="h-6 object-contain hover:scale-110 transition"
    />

    <img
      src={PayPal}
      alt="PayPal"
      className="h-6 object-contain hover:scale-110 transition"
    />

    <img
      src={PayU}
      alt="PayU"
      className="h-6 object-contain hover:scale-110 transition"
    />

    <img
      src={cashfreeLogo}
      alt="Cashfree"
      className="h-6 object-contain hover:scale-110 transition"
    />

  </div>
</div>

      </div>
    </footer>
  );
}