import React from "react";

const Card = ({
  name,
  image,
  rating,
  subTitle,
  isTrending = false,
  sport = "",
  homeTown = [],
  backContent,
}) => {
  const isFlippable = !!backContent;

  return (
    <div className={`card-outer ${isFlippable ? "flip-on-hover" : ""}`}>
      <div className="card-inner">
        {/* Front Face */}
        <div
          className="card-face card-front bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        >
          {isTrending && (
            <div className="absolute top-1 right-1 z-10">
              <img
                src="/advance-star.svg"
                alt="star"
                className="w-[6.25rem] h-[6.25rem] object-contain"
              />
            </div>
          )}

          {!isTrending && rating > 0 && (
            <div className="absolute top-[23px] right-[11px] z-10 flex gap-0">
              {Array(rating)
                .fill()
                .map((_, i) => (
                  <img
                    key={i}
                    src="/star.svg"
                    alt="rating"
                    className="w-[18px] h-[16px] object-contain"
                  />
                ))}
            </div>
          )}

          <div className="absolute bottom-3 left-0 w-full">
            <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-[#2f2f2f] rounded-2xl py-3 px-6 mx-3">
              <div className="flex items-center justify-between">
                <div>
                  <h6 className="text-base font-bold text-[#d4bc6d] mb-2.5">
                    {subTitle}
                  </h6>
                  <h2 className="text-xl font-extrabold text-white">{name}</h2>
                </div>
                <div>
                  <h6 className="text-sm font-bold text-end text-white mb-2.5">
                    {sport}
                  </h6>
                  <h6 className="text-sm font-bold text-end text-white">
                    {homeTown?.join(", ")}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Face */}
        {isFlippable && (
          <div className="card-face card-back">
            <div className="p-6 h-full w-full text-white text-center flex items-center justify-center text-base sm:text-lg leading-relaxed">
              {backContent}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
