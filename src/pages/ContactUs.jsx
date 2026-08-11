import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare } from "lucide-react";
import useScrollToTop from "../hooks/useScrollToTop";
import API_URL from "../config/api";

export default function ContactUs() {
  useScrollToTop();
  const [form, setForm] = useState({
    name: "",
    email: "",
    helpType: "",
    orderNumber: "",
    message: ""
  });
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [apiError, setApiError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setFile(null);
      setFileError("");
      return;
    }

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!allowedMimeTypes.includes(selectedFile.type)) {
      setFileError("Only JPG, JPEG, PNG, WEBP, and PDF files are allowed.");
      setFile(null);
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (selectedFile.size > maxSize) {
      setFileError("File size must be less than 10 MB.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setFileError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.helpType || !form.message) {
      alert("Please fill out all required fields.");
      return;
    }

    setSubmitting(true);
    setApiError("");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("helpType", form.helpType);
      formData.append("orderNumber", form.orderNumber);
      formData.append("message", form.message);
      if (file) {
        formData.append("attachment", file);
      }

      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        body: formData
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
        helpType: "",
        orderNumber: "",
        message: ""
      });
      setFile(null);
    } catch (err) {
      console.error(err);
      setApiError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-[#223a5e] pt-32 pb-16 md:pt-40 md:pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#11223f] tracking-tight mb-4">
            Got Questions? We can help you!
          </h1>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            If you have any questions, you can reach out to us at any time. Just fill out the form, and we will get back to you soon.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-[#ff1681] font-semibold text-sm">
            <Mail className="w-4 h-4" />
            <a href="mailto:support@tikytop.com" className="hover:underline">support@tikytop.com</a>
          </div>
        </div>

        {/* Contact Form / Info Grid */}
        <div className="bg-white border border-gray-150 rounded-[32px] p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-[#11223f] mb-3">Your message has been submitted successfully.</h2>
              <p className="text-gray-500">Our support team will review your request and get back to you soon.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 bg-gray-100 hover:bg-gray-250 text-gray-700 text-sm font-semibold rounded-full transition-all"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {apiError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm text-red-600">{apiError}</p>
                </div>
              )}

              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-[#11223f]">
                    Name <span className="text-[#ff1681]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff1681]/25 focus:border-[#ff1681] text-sm text-[#11223f]"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-[#11223f]">
                    Email Address <span className="text-[#ff1681]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="example@mail.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff1681]/25 focus:border-[#ff1681] text-sm text-[#11223f]"
                  />
                </div>
              </div>

              {/* Row 2: Help Type and Order Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="helpType" className="block text-sm font-semibold text-[#11223f]">
                    What do you need help with <span className="text-[#ff1681]">*</span>
                  </label>
                  <select
                    id="helpType"
                    required
                    value={form.helpType}
                    onChange={(e) => setForm({ ...form, helpType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff1681]/25 focus:border-[#ff1681] text-sm text-[#11223f] bg-white cursor-pointer"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="Order Issue">Order Issue</option>
                    <option value="Payment Issue">Payment Issue</option>
                    <option value="Delivery Issue">Delivery Issue</option>
                    <option value="Account Issue">Account Issue</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="orderNumber" className="block text-sm font-semibold text-[#11223f]">
                    Order Number
                  </label>
                  <input
                    type="text"
                    id="orderNumber"
                    value={form.orderNumber}
                    onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
                    placeholder="e.g. #12345 (Optional)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff1681]/25 focus:border-[#ff1681] text-sm text-[#11223f]"
                  />
                </div>
              </div>

              {/* Attachment / File Upload */}
              <div className="space-y-2">
                <label htmlFor="attachment" className="block text-sm font-semibold text-[#11223f]">
                  Attachment / Support Document
                </label>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    id="attachment"
                    accept=".jpg,.jpeg,.png,.webp,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="attachment"
                      className="cursor-pointer px-4 py-2.5 bg-gray-100 hover:bg-gray-250 text-gray-700 font-semibold text-xs rounded-xl border border-gray-200 transition-all flex items-center gap-1.5"
                    >
                      📎 Choose File
                    </label>
                    <span className="text-xs text-gray-500">
                      {file ? file.name : "No file selected (Max 10MB; JPG, PNG, WEBP, PDF)"}
                    </span>
                    {file && (
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="text-red-500 hover:text-red-700 text-xs font-semibold"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {fileError && <p className="text-xs text-red-500 font-medium">{fileError}</p>}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-semibold text-[#11223f]">
                  Message <span className="text-[#ff1681]">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff1681]/25 focus:border-[#ff1681] text-sm text-[#11223f] resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 text-center md:text-right">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full md:w-auto px-10 py-4 bg-gradient-to-r from-[#ff1681] to-[#b5179e] text-white font-bold text-[14px] uppercase tracking-wider rounded-full shadow-lg hover:shadow-pink-500/25 transition-all duration-300 ${submitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
                >
                  {submitting ? "Sending..." : "SEND MESSAGE"}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
