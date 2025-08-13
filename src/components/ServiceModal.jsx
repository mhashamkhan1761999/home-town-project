// src/components/ServiceModal.jsx
import React, { useEffect } from "react";
import { serviceContent } from "../data/serviceContent";

export default function ServiceModal({ serviceKey, onClose, onLaunch }) {
  if (!serviceKey) return null; // nothing open

  const data = serviceContent[serviceKey];
  if (!data) return null; // key not found

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 overflow-auto"
      onClick={onClose} // clicking overlay closes
    >
      <div
        className="relative bg-black border border-[#4B4C46] rounded-2xl w-full max-w-3xl p-6"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        {/* Close button */}
        <button
          aria-label="Close"
          className="absolute top-3 right-3 text-sm rounded-full p-2 hover:bg-white/5"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Video (optional) */}
        {data.video && (
          <div className="mb-6">
            <video
              src={data.video}
              controls
              className="w-full h-[300px] rounded-lg bg-black"
            />
          </div>
        )}

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-[#D4BC6D] mb-4">
          {data.title}
        </h2>

        {/* Content (JSX from mapping) */}
        <div className="text-[#D4BC6D]">{data.content}</div>

        {/* CTA */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => onLaunch && onLaunch(serviceKey)}
            className="px-6 py-2 bg-[#D4BC6D] text-black rounded-full hover:bg-[#b89f4e] transition"
          >
            {data.cta || "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
