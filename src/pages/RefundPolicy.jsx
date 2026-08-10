import React, { useState } from "react";
import useScrollToTop from "../hooks/useScrollToTop";

export default function RefundPolicy() {
  useScrollToTop();
  const [form, setForm] = useState({
    name: "",
    email: "",
    orderNumber: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.orderNumber || !form.message) {
      alert("Please fill out all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setApiError("");

    try {
      const response = await fetch("http://localhost:5000/api/refunds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      // Clear form after success
      setForm({
        name: "",
        email: "",
        orderNumber: "",
        message: ""
      });
    } catch (err) {
      console.error(err);
      setApiError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-[#223a5e] pt-32 pb-16 md:pt-40 md:pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Large bold page heading */}
        <div className="border-b border-gray-100 pb-8 mb-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#11223f] tracking-tight relative inline-block pb-3">
            Refund Policy
            <span className="absolute bottom-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-16 h-1 bg-gradient-to-r from-[#ff1681] to-[#b5179e] rounded-full" />
          </h1>
        </div>

        {/* Content Area */}
        <div className="space-y-8 text-base md:text-lg leading-relaxed text-[#223a5e]">
          
          <section className="space-y-3">
            <p>
              At TikyTop, we deliver on our promises. The majority of orders are completed on time. We also understand issues may arise. But you don't need to worry about it; we are here to resolve it.
            </p>
            <p>
              Before you need a refund, first contact us at <a href="mailto:support@tikytop.com" className="text-[#ff1681] hover:underline font-semibold">support@tikytop.com</a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-[#11223f]">When will a Refund be Accepted?</h2>
            
            <div className="pl-4 space-y-4 border-l-2 border-pink-100">
              <h3 className="text-lg font-bold text-[#11223f]">Key Conditions and Terms:</h3>

              <div className="space-y-2">
                <h4 className="text-base font-semibold text-[#ff1681]">7-Day Non-Delivery Window:</h4>
                <p>
                  If short-term orders (e.g., estimated for hours or 3-7 days) are not fulfilled within 7 days of payment confirmation, you qualify for a refund of the undelivered portion.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-semibold text-[#ff1681]">How to Request:</h4>
                <p>
                  Contact customer support with your specific order ID if your delivery window has elapsed. You can review common queries on the TikyTop FAQ page.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-semibold text-[#ff1681]">Completed Services:</h4>
                <p>
                  Orders that have been fully delivered or are successfully in progress are non-refundable under their TikyTop Terms of Service.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-semibold text-[#ff1681]">Refill Protection:</h4>
                <p>
                  Eligible services include a separate 6-month refill guarantee for metric drops rather than an automatic cash refund.
                </p>
              </div>
            </div>
          </section>

          {/* Refund Request Form Card */}
          <div className="bg-white border border-gray-150 rounded-[24px] p-6 md:p-10 shadow-lg max-w-3xl mx-auto mt-12">
            <h3 className="text-xl md:text-2xl font-bold text-center text-[#11223f] mb-8">
              Submit a Refund Request
            </h3>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">✓</div>
                <h4 className="text-lg font-bold text-[#11223f] mb-2">Your refund request has been submitted successfully.</h4>
                <p className="text-gray-500 text-sm">Our support team will review your request and contact you regarding the next steps.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-full transition-all"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {apiError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-600">{apiError}</p>
                  </div>
                )}

                {/* Row 1: Name and E-mail */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-semibold text-gray-700">
                      Name <span className="text-[#ff1681]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Name"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff1681]/25 focus:border-[#ff1681] text-sm text-[#11223f]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-semibold text-gray-700">
                      E-mail <span className="text-[#ff1681]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="E-mail"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff1681]/25 focus:border-[#ff1681] text-sm text-[#11223f]"
                    />
                  </div>
                </div>

                {/* Row 2: Order Number */}
                <div className="space-y-1.5">
                  <label htmlFor="orderNumber" className="block text-xs font-semibold text-gray-700">
                    Your Order No. <span className="text-[#ff1681]">*</span>
                  </label>
                  <input
                    type="text"
                    id="orderNumber"
                    required
                    value={form.orderNumber}
                    onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
                    placeholder="12345"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff1681]/25 focus:border-[#ff1681] text-sm text-[#11223f]"
                  />
                </div>

                {/* Row 3: Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-700">
                    Message <span className="text-[#ff1681]">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your problem in at least 250 characters"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff1681]/25 focus:border-[#ff1681] text-sm text-[#11223f] resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-3.5 bg-gradient-to-r from-[#ff1681] to-[#b5179e] text-white font-bold text-[14px] uppercase tracking-wider rounded-full shadow-md hover:shadow-pink-500/20 transition-all duration-300 ${submitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.01] active:scale-[0.99]'}`}
                >
                  {submitting ? "Submitting..." : "SUBMIT REQUEST"}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
