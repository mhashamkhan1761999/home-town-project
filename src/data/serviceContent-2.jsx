// src/data/serviceContent.js
import React from "react";

export const serviceContent = {
  "Clothing Drop": {
    video: "/videos/video23.mp4", // add this file to public/videos/
    title: "“Clothing” Drop",
    cta: "Launch Service",
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          Launch a bold, custom clothing line for your fans, friends, and family — and earn NIL from it.
          Your clothing should speak before you do. With full customization and premium quality, you can
          create merchandise your supporters actually want to wear. This isn’t just apparel — it’s a uniform
          your community wears with pride.
        </p>

        <h3 className="text-white font-semibold">How It Works</h3>
        <p><strong>Every Launch is Free</strong> — There’s no cost to get started. Scroll down, explore the product options, and click Launch Service.</p>
        <p>Once you launch: The full product list for this category will appear at the top of this page.</p>
        <p className="italic">Pro Tip: Drop products in small batches to build momentum and drive engagement.</p>

        <h4 className="text-white font-semibold">Free Custom Graphic Included</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Fill out the graphic design inquiry form.</li>
          <li>Submit your design vision (images, colors, themes, layout ideas).</li>
          <li>Our design team will deliver your graphic within 12 hours.</li>
          <li>Unlimited revisions until you love it.</li>
        </ul>

        <h4 className="text-white font-semibold">Product Customization</h4>
        <p>Once your graphic is ready, return to this page to finalize your drop. You can:</p>
        <ul className="list-disc pl-5">
          <li>Set pricing</li>
          <li>Select colors</li>
          <li>Write product descriptions</li>
          <li>Choose graphic placement and sizing</li>
        </ul>
        <p>Products will go live within 12 hours after customization details are submitted.</p>

        <h4 className="text-white font-semibold">Social Media Feature</h4>
        <p>Featured on our feeds to drive visibility: Standard — @HometownHeroNILUpNext; Pro — @HometownHeroNIL</p>

        <h4 className="text-white font-semibold">Additional Notes</h4>
        <ul className="list-disc pl-5">
          <li>All products fully customizable</li>
          <li>You maintain full creative control</li>
          <li>Message your NIL agent directly through your dashboard</li>
        </ul>

        <h4 className="text-white font-semibold">Service Policy</h4>
        <p>If you do not make at least one sale within 60 days, a $25 service fee will be deducted. Waived after first sale.</p>

        <h4 className="text-white font-semibold">NIL Policy & Legal Information</h4>
        <p>High School restrictions: Texas, Missouri, New Jersey, New York, Illinois, Iowa. College/pro athletes: check local rules.</p>

        <p className="font-semibold mt-2">Ready to Launch Your Clothing Line? Click Launch Service to start building your brand.</p>
      </div>
    ),
  },

  "Acid Wash Clothing Drop": {
    video: null, // optional: add a video file if you want
    title: "Acid Wash Clothing Drop",
    cta: "Launch Service",
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          Launch a bold, retro-inspired acid wash collection for your fans, friends, and family — and earn NIL from it.
          With its gritty texture, washed finish, and vintage look, acid wash apparel creates a one-of-a-kind style that stands out.
        </p>

        <h3 className="text-white font-semibold">How It Works</h3>
        <p><strong>Every Launch is Free</strong> — There’s no cost to get started. Scroll down, explore the product options, and click Launch Service.</p>
        <p className="italic">Pro Tip: Drop products in small batches to build momentum and drive engagement.</p>

        <h4 className="text-white font-semibold">Free Custom Graphic Included</h4>
        <ul className="list-disc pl-5">
          <li>Fill out the graphic design inquiry form and submit your vision.</li>
          <li>Design delivered within 12 hours with unlimited revisions.</li>
        </ul>

        <h4 className="text-white font-semibold">Product Customization</h4>
        <ul className="list-disc pl-5">
          <li>Set pricing</li>
          <li>Select colors</li>
          <li>Write product descriptions</li>
          <li>Choose graphic placement and sizing</li>
        </ul>
        <p>Products will go live within 24 hours after customization details are submitted.</p>

        <h4 className="text-white font-semibold">Social Media Feature</h4>
        <p>Featured on @HometownHeroNILUpNext (Standard) or @HometownHeroNIL (Pro).</p>

        <h4 className="text-white font-semibold">Service Policy & NIL Notes</h4>
        <p>If you do not make at least one sale within 60 days, a $25 fee applies — waived after first sale. Check HS restrictions by state.</p>

        <p className="font-semibold mt-2">Ready to Launch Your Acid Wash Line? Click Launch Service to start building your brand.</p>
      </div>
    ),
  },
};
