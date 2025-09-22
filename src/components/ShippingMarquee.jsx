import React from 'react';

const ShippingMarquee = () => {
  return (
    <div className="bg-green-600 overflow-hidden whitespace-nowrap relative py-2 md:py-3 shadow-lg">
      <div className="animate-scroll inline-block text-white font-semibold text-sm md:text-base lg:text-lg tracking-wide">
        <span className="mx-8 inline-flex items-center gap-2">
          Free Shipping Available with the Purchase of Two or More Items
        </span>
        <span className="mx-8 inline-flex items-center gap-2">
          Free Shipping Available with the Purchase of Two or More Items
        </span>
        <span className="mx-8 inline-flex items-center gap-2">
          Free Shipping Available with the Purchase of Two or More Items
        </span>
        <span className="mx-8 inline-flex items-center gap-2">
          Free Shipping Available with the Purchase of Two or More Items
        </span>
        <span className="mx-8 inline-flex items-center gap-2">
          Free Shipping Available with the Purchase of Two or More Items
        </span>
      </div>
      
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
        
        @media (max-width: 768px) {
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
        }
        
        @media (max-width: 480px) {
          .animate-scroll {
            animation: scroll 15s linear infinite;
          }
        }
      `}</style>
    </div>
  );
};

export default ShippingMarquee;