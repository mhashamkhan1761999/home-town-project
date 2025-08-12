import { useState } from 'react';
import { featuresData } from '../data/featuresData';

const FeatureSection = () => {
  const [activeFeature, setActiveFeature] = useState(featuresData[0]);

  const handleFeatureClick = (feature) => {
    if (!feature.locked) {
      setActiveFeature(feature);
    }
  };

  return (
    <div className="flex gap-10">
      {/* Left List */}
      <div className="flex flex-col gap-3.5">
        {featuresData.map((feature, index) => (
          <div
            key={feature.id}
            className={`bg-[#ffffff19] flex items-center p-2 rounded-full cursor-pointer ${
              feature.locked ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => handleFeatureClick(feature)}
          >
            <div className={`h-[3.125rem] w-[3.125rem] rounded-full text-white text-2xl font-medium ${
              index === 0 ? 'bg-[#d4bc6d]' : 'bg-[#666666]'
            } flex items-center justify-center`}>
              {feature.id}
            </div>
            <div className={`ms-[20px] font-bold text-lg ${
              feature.locked ? 'text-[#888]' : index === 0 ? 'text-[#d4bc6d]' : 'text-white'
            }`}>
              {feature.title}
            </div>
          </div>
        ))}
      </div>

      {/* Right Panel */}
      <div>
        <button className="bg-[#2e2e2e] rounded-full px-[38px] py-[13px] text-[#d4bc6d] font-medium text-[0.875rem] mb-9">
          Why Choose Us
        </button>
        <h2 className="text-[4.125rem] font-bold capitalize bg-[linear-gradient(to_right,#d4bc6d,#57430d)] bg-clip-text text-transparent tracking-[-1.98px]">
          {activeFeature.title}
        </h2>
        <div className="w-[43rem] mx-auto">
          <img
            src={activeFeature.image}
            alt={activeFeature.title}
            className="w-full h-[37.625rem] object-contain mb-3.5"
          />
          <p className="text-[1.125rem] font-medium text-white mb-10">
            {activeFeature.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
