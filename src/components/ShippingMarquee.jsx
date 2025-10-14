import React from 'react';

const ShippingMarquee = () => {
  // Create the message content
  const message = "FREE SHIPPING WITH THE PURCHASE OF TWO OR MORE ITEMS";
  
  // Duplicate the message multiple times for seamless infinite scroll
  const scrollContent = Array(10).fill(message).join(" • ");

  return (
    <div className="shipping-marquee-container">
      <div className="shipping-marquee-wrapper">
        <div className="shipping-marquee-content">
          <span className="shipping-marquee-text">{scrollContent}</span>
          <span className="shipping-marquee-text">{scrollContent}</span>
        </div>
      </div>
      
      <style jsx>{`
        .shipping-marquee-container {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          border-top: 3px solid #D4BC6D;
          border-bottom: 3px solid #D4BC6D;
          position: relative;
          overflow: hidden;
          height: 50px;
          display: flex;
          align-items: center;
          box-shadow: 0 4px 15px rgba(212, 188, 109, 0.3);
        }
        
        .shipping-marquee-wrapper {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          position: relative;
        }
        
        .shipping-marquee-content {
          display: inline-flex;
          animation: marqueeScroll 40s linear infinite;
          will-change: transform;
        }
        
        .shipping-marquee-text {
          color: #D4BC6D;
          font-weight: 800;
          font-size: 16px;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-shadow: 0 0 10px rgba(212, 188, 109, 0.5);
          padding: 0 40px;
          display: inline-block;
          white-space: nowrap;
        }
        
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .shipping-marquee-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.8) 0%,
            transparent 5%,
            transparent 95%,
            rgba(0, 0, 0, 0.8) 100%
          );
          pointer-events: none;
          z-index: 1;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .shipping-marquee-container {
            height: 45px;
          }
          
          .shipping-marquee-text {
            font-size: 14px;
            letter-spacing: 1.5px;
            padding: 0 30px;
          }
          
          .shipping-marquee-content {
            animation: marqueeScroll 30s linear infinite;
          }
        }
        
        @media (max-width: 480px) {
          .shipping-marquee-container {
            height: 40px;
          }
          
          .shipping-marquee-text {
            font-size: 12px;
            letter-spacing: 1px;
            padding: 0 25px;
          }
          
          .shipping-marquee-content {
            animation: marqueeScroll 25s linear infinite;
          }
        }
        
        /* Hover Effect */
        .shipping-marquee-container:hover .shipping-marquee-content {
          animation-play-state: paused;
        }
        
        /* Enhanced Glow Effect */
        .shipping-marquee-container::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(212, 188, 109, 0.1) 0%, transparent 70%);
          animation: pulseGlow 3s ease-in-out infinite alternate;
          pointer-events: none;
          z-index: 0;
        }
        
        @keyframes pulseGlow {
          0% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(0.8);
          }
          100% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default ShippingMarquee;