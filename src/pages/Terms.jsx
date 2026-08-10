import React from "react";
import useScrollToTop from "../hooks/useScrollToTop";

export default function Terms() {
  useScrollToTop();

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-[#223a5e] pt-32 pb-16 md:pt-40 md:pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Large bold page heading */}
        <div className="border-b border-gray-100 pb-8 mb-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#11223f] tracking-tight relative inline-block pb-3">
            Terms
            <span className="absolute bottom-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-16 h-1 bg-gradient-to-r from-[#ff1681] to-[#b5179e] rounded-full" />
          </h1>
        </div>

        {/* Content Area */}
        <div className="space-y-8 text-base md:text-lg leading-relaxed text-[#223a5e]">
          
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-[#11223f]">Welcome to TikyTop!</h2>
            <p>
              Thank you for choosing us! TikyTop is an online service provider offering social media growth services for TikTok, Instagram, and YouTube.
            </p>
            <p>
              By using our service, you agree to our terms and conditions mentioned below:
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-[#11223f]">You Agree to:</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Get access and download by using only a public account.</li>
              <li>You should not use your private account or private data while using our services and tools.</li>
              <li>You should follow our ethical and legal guidelines.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-[#11223f]">No Affiliation:</h2>
            <p>
              TikyTop is a standalone platform and does not integrate with any other social media network. All brand names, content, and logos belong to the respective holders.
            </p>
            <p>
              Our services and tools are for personal use only. Commercial use is prohibited unless you get permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-[#11223f]">Content Ownership:</h2>
            <p>
              If you want to download using TikyTop, the content remains the owner's property only. Or if you want to reuse or resell content, you need to get permission from the owner. If there is any resale or illegal use of content you download or view, then it will lead to copyright issues.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-[#11223f]">What do we Collect?</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your name and email for updates and support.</li>
              <li>Social media username(public account only).</li>
            </ul>
            <p>
              We never ask for your passwords or any sensitive data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-[#11223f]">Dos and Don'ts:</h2>
            
            <div className="pl-4 space-y-3">
              <h3 className="text-lg font-semibold text-[#ff1681]">Dos:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>You can use TikyTop for personal use, not for commercial use.</li>
                <li>You can enjoy using our services and tools for growing your content.</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#ff1681]">Don'ts:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reselling content without permission.</li>
                <li>Misuse of our service and tools.</li>
                <li>Collecting data from other users.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-[#11223f]">User Eligibility:</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To use our TikyTop service, you should be above 18 years old.</li>
              <li>If you are between 12 and 18 years old, your parent ot guardian is responsible.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-[#11223f]">Updates:</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Whenever we update the terms and conditions policy, you can find the new version here. So please check our page before making any payment.</li>
              <li>We are not responsible for any service disruptions, including cyberattacks, natural disasters, or other events beyond our control.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-[#11223f]">Our Rights:</h2>
            <p>
              If you violate any of our terms and conditions, we will revoke your access at any time without notice. If necessary, legal action will be taken.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-[#11223f]">The Law that Applies:</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Local and international laws govern these terms. Legal disputes will be handled in the appropriate court.</li>
              <li>If you have any questions or concerns about our terms and conditions, please email us. <a href="mailto:support@tikytop.com" className="text-[#ff1681] hover:underline font-semibold">support@tikytop.com</a></li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
