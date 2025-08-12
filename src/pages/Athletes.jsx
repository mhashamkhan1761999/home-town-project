import React, { useState } from 'react';

import CarouselSlider from '../components/CarouselSlider'
import { Link } from 'react-router-dom';



const featureList = [
  {
    id: 1,
    title: 'Clothing',
    description: "This isn’t just your gear — this reflects your game. Your clothing line should tell your story before you even say a word. Whether you're rocking it at the gym, on campus, or out with friends, each piece represents your grind, your mindset, and your movement. With full customization and top-tier quality, you’re not just selling a product — you’re building a uniform for your supporters to wear with pride. This is your everyday legacy.",
    image: '/clothing.jpg',
    locked: false,
  },
  {
    id: 2,
    title: 'Acid Wash Clothing',
    description: "A bold, vintage look for athletes who don’t follow trends — they set them. Acid wash is for those who stand out. This collection brings raw energy and retro vibes to your brand. Whether it’s tees, hoodies, or shorts, this line lets you drop a statement with every launch. It’s gritty, it’s unique, and it reflects the battles you’ve fought on and off the field. Let your personality show in every thread.",
    image: '/acid_wash.png',
    locked: false,
  },
  {
    id: 3,
    title: 'Jerseys',
    description: "You're not just repping a name. You're representing a legacy. Every athlete deserves a jersey with their name on it. Whether it's a throwback look, gameday-ready design, or a limited-edition drop, your jersey represents your team, your supporters, and your mission. Fans don’t just want merch — they want to be part of something. Give them a piece of your journey they can wear with pride.",
    image: '/jerseys.png',
    locked: false,
  },
  {
    id: 4,
    title: 'Footwear',
    description: "Walk your own path — now do it in style. Custom footwear is more than a flex — it’s a platform. Drop sneakers and slides designed with your personal flair, built for comfort and movement. Whether it’s pre-game walk-ins or streetwear statements, you’ll be remembered for every step. This is where fashion meets ambition — lace it up and lead the way.",
    image: '/footwear.png',
    locked: false,
  },
  {
    id: 5,
    title: 'Home & Lifestyle',
    description: "Bring your brand into the daily lives of your fans. Your brand doesn’t stop at what you wear. From custom mugs to posters, pillows to blankets, this category allows your supporters to live with your story. Turn everyday spaces into inspiration hubs and let your brand become a part of people’s lives — from the kitchen to the living room.",
    image: '/home_lifestyle.png',
    locked: false,
  },
  {
    id: 6,
    title: 'Accessories',
    description: "Small details. Big impact.Sometimes it’s the little things that leave the biggest impression. Keychains, phone cases, bags, and more — accessories are perfect for giveaways, fan drops, and content packs. Affordable, creative, and memorable — they’re an easy way to expand your brand and reach every corner of your community.",
    image: '/accessories.png',
    locked: false,
  },
  {
    id: 7,
    title: 'Strength Supplements',
    description: 'Fuel your grind. Build your brand. Athletes aren’t just selling a look — they’re selling a lifestyle. With this service, you can launch high-quality supplements that match your performance. Whether it’s pre-workout, recovery, or protein blends, you’re giving fans and teammates a product they can trust. Power your brand with what powers you.',
    image: '/strength.png',
    locked: false,
  },
  {
    id: 8,
    title: 'Health',
    description: "More than a product — it’s a lifestyle shift. This category is about pushing the importance of long-term health. From immunity teas to clean energy blends and superfoods, these products let you promote balance, focus, and longevity. Your audience doesn’t just look up to your hustle — they want to learn from your habits. Lead the next generation of athletes in and out of the game.",
    image: '/health.png',
    locked: false,
  },
  {
    id: 9,
    title: 'Graphics and AI Video',
    description: "Your moment deserves more than just a post. Whether it’s a commitment, an announcement, or just a statement — we combine professional graphics with AI-powered videos to help you stand out. Get next-level visuals made just for you. From commitment graphics to custom video edits, this is where your story gets seen.",
    image: '/book.png',
    locked: false,
  },
  {
    id: 10,
    title: 'Player Card',
    description: "Turn your moment into a collectible. Your official player card is more than a photo and a name — it’s a snapshot of your legacy. Fans will want to collect it, trade it, and show it off. Whether it’s glossy, signed, or limited edition, this is your chance to create something iconic. Cement your presence. Make it official",
    image: '/player_card.png',
    locked: false,
  },
  {
    id: 11,
    title: 'Coffee',
    description: "More than a caffeine fix — it’s part of the routine. \n This category highlights the daily habits that keep athletes locked in. Whether it’s a morning jumpstart or an evening reset, coffee becomes a steady part of focus, energy, and rhythm. By sharing your blend, you’re letting others tap into the pace that drives you — on and off the court.",
    image: '/coffee.png',
    locked: false,
  },
  {
    id: 12,
    title: 'Ambassador Program',
    description: `Earn by bringing your teammates, friends, or network into the platform.

  When someone signs up using your unique referral code (provided by our team), you’ll receive 5% of the revenue they generate on the platform for their first 1–2 months.

  It’s simple:
  - Share your custom referral code  
  - They enter it during sign-up  
  - You earn 5% of their sales for up to 60 days  

  There’s no limit to how many athletes you can refer — grow your network, help others monetize, and earn while you do it.`,
    image: '/Abassador.png',
    locked: false,
  },
  {
    id: 13,
    title: 'Brand Marketplace',
    description: "Hometown Hero connects athletes with brands through a streamlined digital marketplace. Athletes can land brand deals as either micro or NIL influencers, ranging from product-based promotions to paid sponsorships, affiliate partnerships, and event appearances.",
    image: '/question-mark.jpeg',
    locked: true,
  },
  {
    id: 14,
    title: 'LMS Online Course',
    description: "Athletes can create and sell personalized online courses (e.g., training, skills, mindset) to their audience. Courses are linked to their merchandise store for cross-promotion, offering a new revenue stream and deeper fan engagement. We help set up a social community (e.g., Instagram) before launching the course.",
    image: '/question-mark.jpeg',
    locked: true,
  },
  {
    id: 15,
    title: 'Press',
    description: `Get Featured. Get Noticed. Get Recruited.

  We offer premium media coverage that puts you in front of the right eyes — fans, scouts, recruiters, and decision-makers. With strategic placements in top media outlets across sports, culture, and lifestyle, we help athletes turn their journey into powerful press that builds real credibility.

  Whether you're chasing a scholarship, entering the draft, or growing your personal brand, professional media exposure is what separates you from the noise. A well-written feature or spotlight can open doors, spark opportunities, and legitimize your presence on and off the field.

  We don’t just share your story — we amplify it.

  This is more than promotion — it’s positioning.`,
    image: '/question-mark.jpeg',
    locked: true,
  },
  {
    id: 16,
    title: 'Newsroom',
    description: "The Newsroom is your space to get promoted, build your brand, and elevate your NIL. From athlete features and highlight reels to interviews and custom media, it’s all connected to your storefront — so fans see the full picture. Whether you're selected or choose to boost your visibility, this is where you get noticed and start standing out.",
    image: '/question-mark.jpeg',
    locked: true,
  },
  {
    id: 17,
    title: 'Books',
    description: "Turn your story into something real — a novel, magazine, coffee table book, or anything in between. Fully customized with your own photos, graphics, and words, your book becomes a one-of-a-kind reflection of your journey. Whether it’s your athletic career, life story, or personal message — this is your chance to create something lasting, powerful, and uniquely yours.",
    image: '/question-mark.jpeg',
    locked: true,
  },
  {
    id: 18,
    title: "Fan's Room",
    description: `Your fans support you — now it’s your turn to give them something unforgettable.

  The Fan Room is where you can offer signed merch, trading cards, and personalized video shoutouts — all while getting paid. From birthdays to pep talks, every product or video is a chance to grow your fanbase, build your brand, and deepen your connection.

  The Fan Room gives you another way to monetize your story and give fans something they’ll never forget.`,
    image: '/question-mark.jpeg',
    locked: true,
  },
  {
    id: 19,
    title: 'Enterprise Support (MVP)',
    description: "Ai powered analytics and instant cashouts\nPlay at the next level\nSocial media promotion\nPro Dashboard\nIndustry leading profit sharing",
    image: '/question-mark.jpeg',
    locked: true,
  },
];



const Athletes = () => {
  const [activeFeature, setActiveFeature] = useState(featureList[0]);

  return (
    <>
      {/* first section */}
      <section className="relative w-full bg-no-repeat bg-center bg-contain sm:bg-cover bg-[url('/athlete-bg.jpg')]">
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] z-0" />

        <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 md:px-15 py-20 sm:py-38 text-center w-full max-w-screen-xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6.875rem] uppercase font-extrabold bg-gradient-to-r from-[#d4bc6d] to-[#57430d] bg-clip-text text-transparent mb-4 sm:mb-5 leading-tight">
            HOMETOWN HERO FOR <br className="hidden md:block" /> ATHLETES
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#adadad] font-medium w-full max-w-[1200px] mb-6">
            We support athletes through every step of their NIL journey, providing a range of opportunities designed to maximize earnings and build lasting value. At Hometown Hero, we offer 50% commissions — the highest-percentage earning opportunities in the NIL marketplace — because we care about athletes, their futures, and making sure they win on and off the field.
          </p>

          <Link
            to="/athlete-signup"
            className="inline-block bg-[#d4bc6d] hover:bg-[#c2a851] text-black font-black text-sm sm:text-base md:text-lg rounded-xl px-6 sm:px-8 py-3 transition duration-300"
          >
            Join the Family
          </Link>
        </div>
      </section>


      {/* third section */}
      <section className="pt-24 sm:pt-28 lg:pt-[195px] pb-16 sm:pb-20 lg:pb-[98px]">
        <div className="max-w-7xl 2xl:max-w-[1764px] lg:max-w-[1284px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-[4.588rem] font-extrabold capitalize leading-tight bg-gradient-to-r from-[#d4bc6d] to-[#57430d] bg-clip-text text-transparent mb-6 sm:mb-8 lg:mb-10">
                Sign Up and Launch Your Brand
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-white mb-6 sm:mb-8 lg:mb-10">
                Hometown Hero is a platform built for athletes, by athletes, designed to empower players at every stage of their journey—whether they are building their brand for the future or actively monetizing their name, image, and likeness (NIL).
                <br className="hidden sm:block" /><br className="hidden sm:block" />
                For athletes currently earning through NIL, Hometown Hero offers a comprehensive, AI-powered platform that helps players monetize their talents, secure brand collaborations, and maximize their earning potential. With advanced tools for real-time earnings tracking, data-driven insights, and automated brand connections, we streamline the process of building and managing your NIL success. Whether it's selling products through your storefront, such as online courses, player cards, and merchandise, securing sponsorship deals, or monetizing content, our platform provides athletes with all the tools they need to grow their brand, expand their influence, and take full control of their financial future.
              </p>

              <Link
                to="/athlete-signup"
                className="inline-block bg-[#d4bc6d] hover:bg-[#c2a851] rounded-full px-6 sm:px-8 py-3 text-black font-semibold text-sm sm:text-base transition duration-300"
              >
                Join the Family
              </Link>
            </div>

            {/* Right Image */}
            <div>
              <img
                src="/phone.svg"
                alt="about us"
                className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-[26rem] xl:max-w-[34rem] mx-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>



      {/* third section */}
      <div className="w-full h-[1px] bg-[#d4bc6d] opacity-30 my-1"></div>

      {/* Features Section: Mobile Accordion + Desktop Grid */}
      <section className="pt-[50px] pb-[60px] px-4 sm:px-6 md:px-12">
        <div className="max-w-[1764px] mx-auto">
          {/* Mobile Heading/Button */}
          <div className="sm:hidden mb-6">
            <button className="bg-[#2e2e2e] rounded-full px-6 py-3 text-[#d4bc6d] font-medium text-sm mb-6">
              Why Choose Us
            </button>
          </div>
          {/* Mobile FAQ Accordion */}
          <div className="sm:hidden">
            {featureList.map((feature) => (
              <div
                key={feature.id}
                className={`mb-4 rounded-2xl bg-[#ffffff19] transition
                      ${activeFeature.id === feature.id ? 'border-2 border-[#d4bc6d]' : 'border border-[#d4bc6d]'}
                    `}
              >
                <button
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                  onClick={() => setActiveFeature(feature)}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm transition
                            ${activeFeature.id === feature.id ? 'bg-[#d4bc6d] text-[#57430d]' : 'bg-[#666666] text-white'}
                          `}
                    >
                      {feature.id}
                    </span>
                    <span
                      className={`font-bold text-base transition
                            ${activeFeature.id === feature.id ? 'text-[#d4bc6d]' : 'text-[#d4bc6d]'}
                          `}
                    >
                      {feature.title}
                    </span>
                  </span>
                  <span className="ml-2">{activeFeature.id === feature.id ? '−' : '+'}</span>
                </button>
                {activeFeature.id === feature.id && (
                  <div className="px-4 pb-4">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full max-w-full h-auto object-contain border-4 border-[#C29A4B] rounded-2xl shadow-md mb-4"
                    />
                    <p className="text-base text-white whitespace-pre-line">{feature.description}</p>
                  </div>
                )}
              </div>
            ))}
            {/* Locked Features Accordion */}
            <div className="mb-4 border border-[#d4bc6d] rounded-xl bg-[#ffffff19]">
              <button className="w-full flex items-center justify-between px-4 py-3 text-left">
                <span className="font-bold text-base text-[#d4bc6d]">Coming Soon</span>
              </button>
              <div className="px-4 pb-4">
                {[...Array(6)].map((_, index) => {
                  const id = index + 12;
                  const titles = [
                    "Brand Marketplace",
                    "LMS Online Course",
                    "Press",
                    "Newsroom",
                    "Books",
                    "Fan's Room",
                    "Enterprise Support (MVP)",
                  ];
                  return (
                    <div key={id} className="flex items-center mb-2">
                      <div className="h-10 w-10 rounded-full bg-[#666666] flex items-center justify-center text-white font-medium mr-3">
                        {id}
                      </div>
                      <div className="text-white font-bold text-base">{titles[index]}</div>
                      <div className="ml-auto mr-4 flex items-center">
                        <img src="/mask_lock.svg" alt="locked" className="w-6 h-6" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Desktop/Tablet Grid */}
          <div className="hidden sm:block">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-start">
              {/* Left Side */}
              <div>
                <button className="bg-[#2e2e2e] rounded-full px-6 py-3 text-[#d4bc6d] font-medium text-sm sm:text-base mb-6">
                  Why Choose Us
                </button>
                <h2 className="text-[2.25rem] sm:text-[3rem] lg:text-[4.125rem] font-bold capitalize bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent tracking-tight mb-6">
                  {activeFeature.title}
                </h2>
                <div className="w-full">
                  <img
                    src={activeFeature.image}
                    alt={activeFeature.title}
                    className="w-full max-w-full sm:max-w-[35rem] h-auto object-contain border-4 border-[#C29A4B] rounded-2xl shadow-md mb-6"
                  />
                  <p className="text-base sm:text-lg text-white mb-8 whitespace-pre-line">
                    {activeFeature?.description}
                  </p>
                </div>
              </div>
              {/* Right Side - Feature List */}
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Unlocked Features */}
                  <div className="flex flex-col gap-4">
                    {featureList?.slice(0, 12)?.map((feature) => (
                      <div
                        key={feature.id}
                        onClick={() => {
                          if (!feature.locked) setActiveFeature(feature);
                        }}
                        className={`bg-[#ffffff19] flex items-center p-3 rounded-full cursor-pointer hover:bg-[#ffffff2d] transition ${feature.id === activeFeature.id ? 'border border-[#d4bc6d]' : ''
                          }`}
                      >
                        <div
                          className={`relative h-12 w-12 rounded-full text-white text-lg sm:text-xl font-medium flex items-center justify-center ${feature.id === activeFeature.id ? 'bg-[#d4bc6d]' : 'bg-[#666666]'
                            }`}
                        >
                          {feature.id}
                          {feature.locked && (
                            <span className="absolute -top-1 -right-1 text-xs bg-black rounded-full px-1 py-0.5">
                              🔒
                            </span>
                          )}
                        </div>
                        <div
                          className={`font-bold text-base sm:text-lg ml-4 ${feature.id === activeFeature.id
                            ? 'text-[#d4bc6d]'
                            : 'text-white'
                            }`}
                        >
                          {feature.title}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Locked Features */}
                  <div className="flex flex-col gap-4">
                    <div className="p-2">
                      <h4 className="text-xl font-bold text-[#D4BC6D]">Coming Soon</h4>
                    </div>
                    {featureList?.slice(12)?.map((item, index) => {
                      const id = index + 12;

                      return (
                        <div
                          key={id}
                          onClick={() => {
                            setActiveFeature(item);
                          }}
                          className={`bg-[#ffffff19] flex items-center p-3 rounded-full cursor-pointer hover:bg-[#ffffff2d] transition ${item?.id === activeFeature.id ? 'border border-[#d4bc6d]' : ''
                            }`}
                        >
                          <div className={`relative h-12 w-12 rounded-full text-white text-lg sm:text-xl font-medium flex items-center justify-center ${item?.id === activeFeature.id ? 'bg-[#d4bc6d]' : 'bg-[#666666]'}`}>
                            {id}
                          </div>
                          <div
                            className={`font-bold text-base sm:text-lg ml-4 ${item.id == activeFeature.id
                              ? 'text-[#d4bc6d]'
                              : 'text-white'
                              }`}>
                            {item?.title}
                          </div>
                          <div className="ml-auto mr-4 flex items-center">
                            <img src="/mask_lock.svg" alt="locked" className="w-6 h-6" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>










      <section className="w-full h-[100dvh] relative hidden">
        <img src="/download-app.svg" alt="download" className="w-full h-full object-contain" />
        <div className="absolute right-[24px] bottom-[47px] z-10">
          <a href="#" className="bg-black rounded-full px-[56px] inline-block py-[32px] text-[#d4bc6d] font-extrabold text-[1.25rem] mb-9">
            Download the App
          </a>
        </div>
      </section>
    </>
  )

}




export default Athletes