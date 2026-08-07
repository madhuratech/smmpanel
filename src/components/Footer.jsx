import { FaTiktok, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import RazorPay from "../assets/logos/RazorPay.png"
import Paytm from "../assets/logos/Paytm.svg"
import Paypal from "../assets/logos/PayPal.svg"
import PayU from "../assets/logos/PayU.svg"
import TikyTop from "../assets/logos/TikyTop.png"
import Cashfree from "../assets/logos/Cashfree.svg"
import Hero from "./Hero";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#3b0622] via-[#210438] to-[#0a0212] text-white pt-12 pb-8 px-5 md:pt-16 md:px-6 relative overflow-hidden">

      <div className="max-w-7xl mx-auto">
        {/* MOBILE LAYOUT (<768px) */}
        <div className="block md:hidden space-y-8">
          {/* 1. Logo & Description */}
          <div className="flex flex-col items-center space-y-4">
            <img src={TikyTop} alt="Logo" className="w-[160px] object-contain mb-2" />
            <p className="text-white/90 leading-snug max-w-[340px] text-[16px] text-center">
              Your trusted platform for smart shopping. Fast, secure, and reliable services.
            </p>
          </div>

          {/* 3. Social Media Icons */}
          <div className="flex items-center justify-center gap-4 py-2">
            <FaInstagram className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center cursor-pointer hover:scale-110 transition p-2 bg-white/5" />
            <FaYoutube className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center cursor-pointer hover:scale-110 transition p-2 bg-white/5" />
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-white/12 my-6" />

          {/* 4. Resources */}
          <div className="text-left">
            <h3 className="font-bold text-[22px] mb-4.5 text-pink-500">
              Resources
            </h3>
            <ul className="text-left text-[17px] leading-[1.8]">
              {["Blog", "Press", "Support", "Terms of Service", "Privacy Policy"].map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="cursor-pointer transition duration-300 min-h-[44px] flex items-center"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-white/12 my-6" />

          {/* 5. Services */}
          <div className="text-left">
            <h3 className="font-bold text-[22px] mb-4.5 text-pink-500">
              Services
            </h3>
            <ul className="text-left text-[17px] leading-[1.8]">
              {[
                { name: "Instagram Services", icon: <FaInstagram /> },
                { name: "Facebook Services", icon: <FaFacebook /> },
                { name: "Youtube Services", icon: <FaYoutube /> },
              ].map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center gap-4 cursor-pointer transition duration-300 min-h-[44px]"
                >
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-white/12 my-6" />

          {/* 6. Payments */}
          <div className="text-left">
            <h3 className="font-bold text-[22px] mb-4.5 text-pink-500">We accept</h3>
            <div className="flex flex-wrap gap-3">
              {[RazorPay, Paytm, Paypal, PayU, Cashfree].map((logo, i) => (
                <div
                  key={i}
                  className="backdrop-blur-md px-3 py-2 rounded-lg hover:bg-white/30 transition"
                >
                  <img src={logo} alt="payment" className="h-5 object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-white/12 my-6" />

          {/* 7. Copyright & Bottom Links */}
          <div className="flex flex-col items-center space-y-4 pt-4 text-center">
            <p className="text-white/80 text-[14px] leading-[1.6]">
              © {new Date().getFullYear()} TikyTop. All rights reserved.
            </p>
            <ul className="flex flex-col gap-4 text-[14px] font-medium text-white/70">
              <li className="cursor-pointer" onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}>Privacy Policy</li>
              <li className="cursor-pointer" onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}>Terms & Conditions</li>
              <li className="cursor-pointer" onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}>Refund Policy</li>
            </ul>
          </div>
        </div>

        {/* DESKTOP & TABLET LAYOUT (>=768px) */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-left">
          {/* LOGO */}
          <div className="flex flex-col items-start space-y-4">
            <img src={TikyTop} alt="Logo" className="h-24 object-contain" />
            <p className="text-white/90 leading-snug max-w-xs text-base">
              Your trusted platform for smart shopping. Fast, secure, and reliable services.
            </p>
          </div>

          {/* RESOURCES */}
          <div className="flex flex-col items-start">
            <div className="w-fit">
              <h3 className="font-semibold text-lg mb-4 text-pink-500">
                Resources
              </h3>
              <ul className="space-y-3 text-sm">
                {["Blog", "Press", "Support", "Terms of Service", "Privacy Policy"].map((item) => (
                  <li
                    key={item}
                    onClick={() => {
                      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="cursor-pointer transition duration-300 min-h-[44px] flex items-center"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SERVICES */}
          <div className="flex flex-col items-start">
            <div className="w-fit">
              <h3 className="font-semibold text-lg mb-4 text-pink-500">
                Services
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  { name: "Instagram Services", icon: <FaInstagram /> },
                  { name: "Facebook Services", icon: <FaFacebook /> },
                  { name: "Youtube Services", icon: <FaYoutube /> },
                ].map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center gap-3 cursor-pointer transition duration-300 min-h-[44px]"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* PAYMENTS */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-lg mb-4 text-pink-500">We accept</h3>
            <div className="flex flex-wrap gap-3">
              {[RazorPay, Paytm, Paypal, PayU, Cashfree].map((logo, i) => (
                <div
                  key={i}
                  className="backdrop-blur-md px-3 py-2 rounded-lg hover:bg-white/30 transition"
                >
                  <img src={logo} alt="payment" className="h-5 object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Divider line for desktop */}
          <div className="col-span-2 lg:col-span-4 border-t border-white/20 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/80 text-sm">
              © {new Date().getFullYear()} TikyTop. All rights reserved.
            </p>
            <div className="flex items-center gap-5 text-xl">
              <FaInstagram className="cursor-pointer hover:scale-110 transition" />
              <FaYoutube className="cursor-pointer hover:scale-110 transition" />
            </div>
          </div>
        </div>

      </div>

    </footer>
  );
}