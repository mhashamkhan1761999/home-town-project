// src/components/ServicesSection.jsx
import React, { useState } from "react";
import ServiceModal from "./ServiceModal";

// sample categoryImages mapping (if you want background images)
const categoryImages = {
  "Clothing Drop": "/category-images/clothing.jpg",
  "Acid Wash Clothing Drop": "/category-images/acid-wash.jpg",
};

export default function ServicesSection({ filteredCategories = [] }) {
  const [openService, setOpenService] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleLaunch = (serviceKey) => {
    // called when user clicks "Launch Service" inside modal
    setShowForm(true);
    // optionally close modal: setOpenService(null);
    // or you might redirect to a form page
  };

  return (
    <>
      <div className="mb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories?.map((item, idx) => (
            <div
              key={idx}
              role="button"
              tabIndex={0}
              onClick={() => { setOpenService(item?.name); setSelectedCard(item?.id); }}
              onKeyDown={(e) => { if (e.key === "Enter") { setOpenService(item?.name); setSelectedCard(item?.id); } }}
              className={`relative rounded-xl cursor-pointer overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105`}
              style={{
                height: "220px",
                backgroundImage: `url(${categoryImages[item?.name] || "/category-images/default.jpg"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: selectedCard === item?.id ? "3px solid #a855f7" : "3px solid transparent",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <h4 className="text-white font-extrabold text-2xl tracking-wide text-center drop-shadow-lg">
                  {item?.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <ServiceModal
        serviceKey={openService}
        onClose={() => setOpenService(null)}
        onLaunch={handleLaunch}
      />

      {/* Optional: show form when launching */}
      {showForm && (
        <div>
          {/* your existing ItemModal2 or form */}
          {/* <ItemModal2 onClose={() => setShowForm(false)} ... /> */}
        </div>
      )}
    </>
  );
}
