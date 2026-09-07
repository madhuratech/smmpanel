import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExclamationCircle } from "react-icons/fa";

export default function InputValidationPopup({
  show,
  message = "Please enter your username here...",
  position = "top", // 'top' | 'bottom'
  onClose,
  className = ""
}) {
  useEffect(() => {
    if (show && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: position === "top" ? 8 : -8, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: position === "top" ? 6 : -6, scale: 0.94 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={onClose}
          className={`absolute left-3 sm:left-6 z-50 pointer-events-auto flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-[0_12px_30px_rgba(255,0,142,0.4)] backdrop-blur-xl border border-pink-500/70 bg-[#19062e]/95 text-white cursor-pointer select-none max-w-[calc(100vw-32px)] sm:max-w-md ${
            position === "top" ? "bottom-[calc(100%+10px)]" : "top-[calc(100%+10px)]"
          } ${className}`}
        >
          {/* Caret / Pointer Arrow */}
          <div
            className={`absolute left-7 sm:left-10 w-2.5 h-2.5 bg-[#19062e] border-pink-500/70 rotate-45 ${
              position === "top"
                ? "-bottom-1.5 border-r border-b"
                : "-top-1.5 border-l border-t"
            }`}
          />

          {/* Icon */}
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center shadow-md shadow-pink-500/30">
            <FaExclamationCircle className="text-white text-[11px]" />
          </div>

          {/* Text Message */}
          <span className="text-xs sm:text-[13px] font-bold tracking-wide text-white drop-shadow whitespace-nowrap overflow-hidden text-ellipsis">
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
