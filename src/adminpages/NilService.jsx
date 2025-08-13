// NilService.jsx
import React, { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query';
import { getRequest, postRequest } from '../api';
import { useForm } from 'react-hook-form';
import { queryClient } from '../main';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import { convertToFormData } from './helpers';

// --- keep images object with unique keys only
const categoryImages = {
  "Clothing": "/serviceImages/clothes.jpg",
  "Acid Wash": "/serviceImages/acid-wash.jpg",
  "Jersey": "/serviceImages/Jerseys.jpg",
  "Footwear": "/serviceImages/footwear.png",
  "Home & Lifestyle": "/serviceImages/home-and-lifestyle.jpg",
  "Accessories": "/serviceImages/accesorries.png",
  "Strength Supplements": "/serviceImages/strength-supplements.jpg",
  "Self Care": "/serviceImages/self-care.jpg",
  "Health": "/serviceImages/health.jpg",
  "Coffee": "/serviceImages/coffee.jpg",
  "Player Card": "/serviceImages/player-card.jpg"
};

const NilService = () => {
  // This component remains mostly a wrapper to show NilCategory
  return (
    <>
      <NilCategory />
    </>
  )
}

/**
 * NilCategory: lifted selectedProducts + popup state here so ItemModal can
 * inform parent about newly added product and parent can update ProductType UI.
 */
const NilCategory = () => {
  const navigate = useNavigate();

  // 🔹 The category the user clicked
  const [selectedCardId, setSelectedCardId] = useState(null);

  // 🔹 The product type selected from the product list
  const [selectedProductTypeId, setSelectedProductTypeId] = useState(null);

  // 🔹 Controls which main screen is visible
  // false = category list
  // 1 = product list
  // 2 = product description form
  const [isShow, setIsShow] = useState(false);

  // 🔹 The currently selected product
  const [selectedItem, setSelectedItem] = useState(null);

  // 🔹 Track which products have been added
  const [selectedProducts, setSelectedProducts] = useState([]);

  // 🔹 Popups
  const [showAddedPopup, setShowAddedPopup] = useState(false);
  const [showLaunchPopup, setShowLaunchPopup] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [showFinalizeConfirm, setShowFinalizeConfirm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // 🔹 NEW — controls the Launch Service / Graphic Designing form
  const [showLaunchService, setShowLaunchService] = useState(false);

    const [isShowForm, setIsShowForm] = useState(false);

  // 1️⃣ Click category → open Launch Service modal
  const handleCategoryClick = (id) => {
    setSelectedCardId(id);
    setShowLaunchService(true);
  };

  // 2️⃣ After Launch Service form → go to product list
  const handleLaunchServiceComplete = () => {
    setShowLaunchService(false);
    setIsShow(1); // product list
  };

  // 3️⃣ Click product → open product description form
  const handleProductType = (product) => {
    if (selectedProducts.includes(product?.id)) return;
    setSelectedItem(product);
    setSelectedProductTypeId(product?.id);
    setSelectedCardId(product?.category_id);
    setIsShow(2); // product description form
  };

  // Called by ItemModal after creating product
  const handleProductCreated = (productId) => {
    if (!productId) return;
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev : [...prev, productId]
    );
    setShowAddedPopup(true);
  };

//   // Finalize → splash → navigate
//   const confirmFinalize = () => {
//     setShowLaunchPopup(false);
//     setShowAddedPopup(false);
//     setShowSplash(true);
//     setTimeout(() => {
//       setShowSplash(false);
//       navigate("/athlete/my-products");
//     }, 4000);
//   };


  return (
    <>
      {/* Category view */}
      {!isShow && !showLaunchService && (
        <Category 
        handleActive={handleCategoryClick} 
        selectedCard={selectedCardId} 
        setSelectedCardId={setSelectedCardId} 
        />
      )}

      {/* Launch Service / Graphic Designing form */}
        {showLaunchService && isShowForm && (
            <ItemModal2                        
                onClose={() => setShowLaunchService(false)}
                onSuccesActive={handleLaunchServiceComplete}
            />
            // <ItemModal2
            //     onClose={() => setIsShowForm(false)}
            //     onSuccesActive={handleLaunchServiceComplete}
            // />
        )}

        {showLaunchService && (
             <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-black border border-[#4B4C46] rounded-2xl p-6 w-full max-w-xl">
                {/* Video Section */}
                <div className="mb-6">
                    <video
                        className="w-full h-[300px] rounded-lg"
                        src="/video23.mp4"
                        muted
                        autoPlay
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Text Content */}
                <div className="text-[#D4BC6D] space-y-4">
                    <h2 className="text-2xl font-bold text-center">
                        Start Your Own Clothing Line — Free to Launch
                    </h2>
                    <p className="text-sm">
                        Create custom, premium-quality merch for your fans — and earn from it through NIL.
                    </p>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">🧢</span> Free to Start — No setup cost
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">🎨</span> 1 Free Custom Graphic — Designed by our team, unlimited revisions
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">🛠️</span> Full Customization — Choose colors, pricing, placements & more
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">🚀</span> Fast Turnaround — Graphic in 12 hrs, products live in 12 hrs
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">📱</span> Social Media Feature — Boost visibility on our NIL platforms
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">💸</span> No Fees After 1 Sale — Make 1 sale, keep it fee-free forever
                        </li>
                    </ul>
                    <p className="text-sm italic">
                        NIL earnings available for college & pro athletes (HS NIL not allowed in TX, MO, NJ, NY, IL, IA)
                    </p>
                    <p className="text-sm">
                        <span className="mr-2">👉</span> Click “Launch Service” to drop your first line and build your brand
                    </p>
                </div>

                {/* Footer with Submit Button */}
                <div className="mt-8 flex justify-end">
                    <button
                        type='button'
                        onClick={() => { // Hide product type modal
                            setIsShowForm(true); // Show form modal
                        }}
                        className="px-6 py-2 bg-[#D4BC6D] text-black rounded-full hover:bg-[#b89f4e] transition"
                    >
                        Launch Service
                    </button>
                </div>
            </div>
        </div>
        )}
      



    
      {/* Product list */}
      {isShow === 1 && (
        <ProductType
          handleActive={handleProductType}
          selectedCard={selectedProductTypeId}
          category={selectedCardId}
          reload={() => setIsShow(false)}
          selectedProducts={selectedProducts}
        />
      )}

      {/* Product description form */}
      {isShow === 2 && selectedItem && (
        <ItemModal
          item={{
            ...selectedItem,
            selectedCardId,
            selectedProductTypeId,
          }}
          onClose={() => setIsShow(1)}
          onSuccesActive={(productId) => {
            setIsShow(1);
            handleProductCreated(productId);
          }}
        />
      )}

      {/* Add More popup
      {showAddedPopup && (
        <Popup
          title="Product Added!"
          message="Do you want to add more products or finalize?"
          onAddMore={() => setShowAddedPopup(false)}
          onFinalize={() => setShowLaunchPopup(true)}
        />
      )} */}

      {/* Finalize popup */}
      {showLaunchPopup && (
        <Popup
          title="Finalize Your Store"
          message="Are you ready to launch your store?"
          onConfirm={confirmFinalize}
          onCancel={() => setShowLaunchPopup(false)}
        />
      )}

      {/* Splash */}
      {showSplash && (
        <Splash message="Launching your store..." />
      )}
    </>
  );
};

/* ---------- Category (unchanged) ---------- */
// In Category (receive it as prop)
const Category = ({ handleActive, selectedCard, setSelectedCardId }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useQuery({
    queryKey: ['category'],
    queryFn: () => getRequest('/categories'),
  });

  const filteredCategories = data?.filter((category) =>
    category?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="card-gradient !border-[1.5px] p-6 rounded-3xl">
      <div className="flex mb-11">
        <h2 className='text-white font-bold text-3xl '>Category List</h2>
     
        <div className="ms-auto">
          <input
            type="text"
            placeholder="Search categories..."
            className="border border-[#d4bc6d] text-white p-2 w-full mb-4 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories?.length > 0 &&
            filteredCategories.map((item) => (
              <div
                key={item.id}
                className="relative rounded-xl w-full cursor-pointer overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => {
                  setSelectedCardId(item?.id); // comes from NilCategory
                  handleActive(item?.id); // opens Launch Service modal
                }}
                style={{
                  border: selectedCard === item?.id ? '3px solid #a855f7' : '3px solid transparent',
                  backgroundImage: `url(${categoryImages[item?.name] || '/images/default.jpg'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '220px',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h4 className="text-white font-extrabold text-2xl tracking-wide text-center px-4 drop-shadow-lg">
                    {item?.name}
                  </h4>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

/**
 * ProductType: now accepts `selectedProducts` prop so it can render Select vs Selected,
 * and prevent opening modal when product already selected.
 */
const ProductType = ({ handleActive, selectedCard, category, reload, selectedProducts = [] }) => {
  const { data } = useQuery({
    queryKey: ['product-type', category],
    queryFn: () => getRequest(`/product-types?category_id=${category}`),
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showFinalizeConfirm, setShowFinalizeConfirm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const navigate = useNavigate();

  const uniqueCategories = Array.from(new Set(data?.map(item => item?.sub_category?.name)));
  const filterUniqueCategories = Array.from(new Set(
    data?.map(item => item?.sub_category?.name)
      ?.filter(name => name?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
  ));

  const filteredProducts = data?.filter((product) => {
    const categoryMatch = product?.sub_category?.name
      ?.toLowerCase()
      ?.includes(searchTerm?.toLowerCase());
    return categoryMatch;
  });

  return (
    <>
      <div className="card-gradient !border-[1.5px] p-6 rounded-3xl">
        <div className="flex mb-11 gap-5">
          <button
            onClick={() => reload()}
            className="bg-[#d4bc6d] rounded-full h-[40px] uppercase px-6 py-3 text-black text-sm font-semibold"
          >
            Back to Service
          </button>
             <button
                onClick={() => setShowFinalizeConfirm(true)}
                className="bg-[#d4bc6d] rounded-full h-[40px] uppercase px-6 py-3 text-black text-sm font-semibold"
            >
                Complete Service Launch
            </button>
          <div className="ms-auto">
            <select
              className="border border-[#d4bc6d] text-white p-2 w-full mb-4 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            >
              <option className="bg-[#1e1e1e] text-white" value="">Select Sub Category</option>
              {uniqueCategories?.length > 0 && uniqueCategories?.map((category) => (
                <option value={category} className="bg-[#1e1e1e] text-white">{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="">
          {filterUniqueCategories?.length > 0 && filterUniqueCategories?.map((uniqueItem, index) => (
            <div key={index} className="mb-14">
              <h2 className='text-white font-bold text-3xl mb-4'>
                {uniqueItem}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-7 wrap">
                {filteredProducts?.length > 0 &&
                  filteredProducts
                    ?.filter((i) => i.sub_category?.name == uniqueItem)
                    ?.map((item) => {
                      const isSelected = selectedProducts.includes(item?.id);
                      return (
                        <div
                          key={item?.id}
                          onClick={() => {
                            // prevent opening modal if already selected
                            if (!isSelected) handleActive(item);
                          }}
                          typeof="button"
                          style={{
                            border:
                              selectedCard === item?.id
                                ? "2px solid #D4BC6D"
                                : "1.5px solid transparent",
                          }}
                          className="p-2 rounded-3xl w-[19.5rem] bg-[#111] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer border"
                        >
                          {/* Image Section */}
                          <div className="relative bg-[url('/mark.jpeg')] bg-cover bg-no-repeat rounded-3xl overflow-hidden h-[13.5rem] flex justify-center items-center">
                            <img
                              src={
                                "https://hometown.eagleeblaze.com/storage/app/public/" +
                                item?.icon
                              }
                              alt={item?.name}
                              className="h-[14rem] object-center object-contain transition-transform duration-300 hover:scale-105"
                            />
                            {selectedCard === item?.id && (
                              <div className="absolute inset-0 bg-[rgba(212,188,109,0.2)] pointer-events-none"></div>
                            )}
                          </div>

                          {/* Details */}
                          <div className="p-4 space-y-2">
                            <h4 className="text-[#D4BC6D] text-xs uppercase tracking-wide">
                              {item?.category?.name}
                            </h4>
                            <h4 className="text-gray-400 text-xs">
                              {item?.sub_category?.name}
                            </h4>

                            <h3 className="text-white font-bold text-lg leading-tight">
                              {item?.name}
                            </h3>
                            <p className="text-gray-300 text-sm">Size: {item?.size}</p>

                            <p className="text-gray-500 text-xs italic">
                              Branded and premium packaging
                            </p>

                            {/* Select Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!isSelected) handleActive(item);
                              }}
                              type="button"
                              className={`w-full py-2.5 ${
                                isSelected
                                  ? "bg-gray-500 text-white cursor-not-allowed"
                                  : "bg-gradient-to-r from-[#D4BC6D] to-[#b89f4e] text-black"
                              } font-bold text-sm rounded-full hover:opacity-90 transition`}
                              disabled={isSelected}
                            >
                              {isSelected ? "Selected" : "Select"}
                            </button>
                          </div>
                        </div>
                      )
                    })}
              </div>

            </div>
          ))}
        </div>
      </div>
      {/* FINALIZE CONFIRM MODAL */}
        {showFinalizeConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">
                Are you sure you want to finalize?
            </h2>
            <div className="flex justify-end gap-3">
                <button
                onClick={() => setShowFinalizeConfirm(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                Cancel
                </button>
                <button
                onClick={() => {
                    setShowFinalizeConfirm(false);
                    setShowSuccessPopup(true);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded"
                >
                Yes
                </button>
            </div>
            </div>
        </div>
        )}

        {/* SUCCESS POPUP */}
        {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full text-black">
            <h2 className="text-2xl font-bold text-green-700 mb-4">🎉 You Did It!</h2>
            <p className="mb-3">
                Your NIL Service Launch is officially underway.
            </p>
            <p className="mb-3">✅ Next Steps:</p>
            <p className="mb-3">
                Our team is crafting your custom graphic — you’ll receive it from your NIL Agent within 12 hours.
            </p>
            <p className="mb-3">
                You can request any tweaks with your NIL Agent before we lock it in.
            </p>
            <p className="mb-3">
                Once your design is locked in, your products will drop in your storefront within 12 hours — ready to wow your fans and dominate the spotlight.
            </p>
            <p>🚀 YOUR STORY. YOUR BRAND. YOUR LEGACY.</p>
            <div className="flex justify-end mt-6">
                <button
                onClick={() => {
                    setShowSuccessPopup(false);
                    setShowSplash(true);
                }}
                className="px-4 py-2 bg-[#D4BC6D] text-black rounded-full"
                >
                Continue
                </button>
            </div>
            </div>
        </div>
        )}

        {/* SPLASH SCREEN */}
        {showSplash && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center text-center text-white z-50 p-6">
            <h2 className="text-3xl font-bold mb-6">🚀 Let's Go!</h2>
            <div className="flex gap-4">
            <button
                onClick={() => navigate("/athlete/my-products")}
                className="px-4 py-2 bg-green-500 rounded"
            >
                See Status
            </button>
            <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-gray-500 rounded"
            >
                Back to NIL Service Page
            </button>
            </div>
        </div>
        )}

    </>
  )
}


/* ---------- ItemModal (product add/edit form) ----------
   NOTE: mutation.onSuccess DOES NOT navigate to /athlete/my-products anymore.
   Instead it triggers the provided callbacks so parent (NilCategory) marks
   the product selected and shows the "Product Added" popup.
*/
const ItemModal = ({ item, onClose, onSuccesActive }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [colorList, setColorList] = useState([]);
  const [image, setImage] = useState(null);

  const mutation = useMutation({
    mutationKey: ['add-product'],
    mutationFn: (form) => postRequest('/products', form, true),
    onSuccess: (response) => {
      // Important: DO NOT navigate here. Let parent handle next steps.
      // Close modal and inform parent which product was added (use item.id)
      onClose && onClose();
      onSuccesActive && onSuccesActive(item?.id);
      queryClient.invalidateQueries({ queryKey: ['get-products'] });
    },
  });

  const onSubmit = (values) => {
    if (values?.price && Number(values.price) < 10) {
      alert("Minimum price should be 10");
      return;
    }

    const formData = new FormData();
    formData.append("category_id", item?.selectedCardId);
    formData.append("product_type_id", item?.selectedProductTypeId);
    formData.append("name", values?.name || item?.name || '');
    formData.append("description", values?.description || '');
    formData.append("price", values?.price || 10);
    formData.append("colors", JSON.stringify(colorList?.map((i) => i?.value)));
    if (image) formData.append("image", image);
    formData.append("design_service", values?.design_service || false);

    mutation.mutate(formData);
  };

  const options = [
    { label: 'Crimson', value: 'crimson' },
    { label: 'Teal', value: 'teal' },
    { label: 'OrangeRed', value: 'orangered' },
    { label: 'MediumSeaGreen', value: 'mediumseagreen' },
    { label: 'SlateBlue', value: 'slateblue' },
    { label: 'Tomato', value: 'tomato' },
    { label: 'DarkCyan', value: 'darkcyan' },
    { label: 'GoldenRod', value: 'goldenrod' },
    { label: 'DeepPink', value: 'deeppink' },
    { label: 'OliveDrab', value: 'olivedrab' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-black border border-[#4B4C46] rounded-2xl p-6 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-[#D4BC6D] mb-6">Edit Item</h2>
       <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" id="product-form">
  
            {/* Description */}
            <div className="mb-8">
                <label className="text-base font-semibold text-[#D4BC6D] mb-3 inline-block">
                Description (for fans/family)
                </label>
                <div className="flex items-center bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] rounded-t-lg">
                <div className="p-4">
                    <svg className="w-5 h-5 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                    </svg>
                </div>
                <div className="flex-grow">
                    <textarea
                    {...register('description', { required: 'Description is required' })}
                    placeholder="Describe your product for your fans (e.g. This is my official merch hoodie...)"
                    defaultValue=""
                    className="w-full h-full border-0 outline-0 text-[#6B6B6B] text-sm bg-transparent"
                    rows="4"
                    />
                </div>
                </div>
                {errors?.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
            </div>

            {/* Color Options */}
            <div className="mb-8">
                <label className="text-base font-semibold text-[#D4BC6D] mb-3 inline-block">
                Color options
                </label>
                <Select
                isMulti
                options={options.map(opt => ({
                    ...opt,
                    label: (
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: opt.value }}></span>
                        {opt.label}
                    </div>
                    )
                }))}
                value={colorList}
                onChange={(selected) => setColorList(selected)}
                closeMenuOnSelect={false}
                className="text-[#6B6B6B] text-sm"
                styles={{
                    control: (base) => ({
                    ...base,
                    background: 'rgba(217,217,217,0.03)',
                    border: '1px solid #4B4C46',
                    borderRadius: '0.5rem',
                    color: '#6B6B6B',
                    }),
                    menu: (base) => ({
                    ...base,
                    background: '#1a1a1a',
                    color: '#6B6B6B',
                    }),
                    option: (base, { isFocused }) => ({
                    ...base,
                    background: isFocused ? '#4B4C46' : '#1a1a1a',
                    color: '#6B6B6B',
                    }),
                    multiValue: (base) => ({
                    ...base,
                    background: '#4B4C46',
                    color: '#D4BC6D',
                    }),
                    multiValueLabel: (base) => ({
                    ...base,
                    color: '#D4BC6D',
                    }),
                }}
                />
            </div>

            {/* Price */}
            <div className="mb-8">
                <label className="text-base font-semibold text-[#D4BC6D] mb-3 inline-block">
                Price (Minimum: ${25})
                </label>
                <div className="flex items-center bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] rounded-t-lg">
                <div className="p-4">
                    <svg className="w-5 h-5 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <div className="flex-grow">
                    <input
                    type="number"
                    min={25}
                    {...register('price', {
                        required: 'Price is required',
                        min: { value: 25, message: `Minimum price is ${25}` }
                    })}
                    placeholder={`Enter price (min ${25})`}
                    defaultValue={25}
                    className="w-full h-full border-0 outline-0 text-[#6B6B6B] text-sm bg-transparent"
                    />
                </div>
                </div>
                {errors?.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                )}
            </div>

            {/* Graphic Placement */}
            <div className="mb-8">
                <label className="text-base font-semibold text-[#D4BC6D] mb-3 inline-block">
                Graphic placement instructions
                </label>
                <textarea
                {...register('graphicPlacement', { required: 'Please specify placement' })}
                placeholder="E.g. Front center, back side, left shoulder..."
                className="w-full p-3 border border-[#4B4C46] rounded-lg bg-transparent text-sm text-gray-300 focus:border-[#D4BC6D] outline-none"
                rows="3"
                />
                {errors?.graphicPlacement && (
                <p className="text-red-500 text-sm mt-1">{errors.graphicPlacement.message}</p>
                )}
            </div>

            {/* Buttons */}
            <div className="mt-8 flex justify-end space-x-3">
                <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[#4B4C46] text-[#D4BC6D] rounded-full hover:bg-[#5a5b54] transition"
                >
                Cancel
                </button>
                <button
                form="product-form"
                type="submit"
                className="px-4 py-2 bg-[#D4BC6D] text-black rounded-full hover:bg-[#b89f4e] transition"
                >
                Save
                </button>
            </div>
        </form>

      </div>
    </div>
  );
};



const ItemModal2 = ({ item = null, onClose, onSuccesActive }) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        setValue,
    } = useForm();

    const [name, setName] = useState(item?.name || '');
    const [description, setDescription] = useState(item?.description || '');
    const [price, setPrice] = useState(10); // default min price = 10
    const [colorList, setColorList] = useState([]);
    const [image, setImage] = useState(null);

    const mutation = useMutation({
        mutationKey: ['store-concept'],
        mutationFn: (form) => postRequest('/store-concept', form, true),
        onSuccess: () => {
            // onClose();
            onSuccesActive();
            queryClient.invalidateQueries({ queryKey: ['get-products'] });

        },
    });

    const onSubmit = (values) => {
        // if (price < 10) {
        //     alert("Minimum price should be 10");
        //     return;
        // }

        const newData = convertToFormData(values);

        mutation.mutate(newData);


        console.log('item', newData);
    };



    const options = [
        { label: 'Crimson', value: 'crimson' },
        { label: 'Teal', value: 'teal' },
        { label: 'OrangeRed', value: 'orangered' },
        { label: 'MediumSeaGreen', value: 'mediumseagreen' },
        { label: 'SlateBlue', value: 'slateblue' },
        { label: 'Tomato', value: 'tomato' },
        { label: 'DarkCyan', value: 'darkcyan' },
        { label: 'GoldenRod', value: 'goldenrod' },
        { label: 'DeepPink', value: 'deeppink' },
        { label: 'OliveDrab', value: 'olivedrab' },
    ];

    return (
       <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[100]">
            <div className="bg-black border border-[#4B4C46] rounded-2xl p-6 w-full max-w-3xl">
                <h2 className="text-2xl font-bold text-[#D4BC6D] mb-6">Upload Your Assets</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" id="product-form">
                <div className="h-[400px] overflow-y-auto pr-2 space-y-8">
                    
                    {/* Multiple Image Upload */}
                    <div>
                    <label className="text-base font-semibold text-[#D4BC6D] mb-3 block">
                        Upload Your Exact Photos (Multiple Allowed)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                        const existing = watch("image2") || [];
                        const files = Array.from(e.target.files);
                        setValue("image2", [...existing, ...files]); // APPEND instead of replace
                        }}
                        className="block w-full text-sm text-gray-300 bg-transparent border border-[#4B4C46] rounded-lg p-2 focus:outline-none"
                    />
                    {/* Preview */}
                    <div className="flex flex-wrap gap-2 mt-3">
                        {watch("image2")?.map((file, idx) => (
                        <img
                            key={idx}
                            src={URL.createObjectURL(file)}
                            alt="preview"
                            className="w-20 h-20 object-cover rounded-lg border border-gray-600"
                        />
                        ))}
                    </div>
                    </div>

                    {/* Content / Theme Ideas */}
                    <div>
                    <label className="text-base font-semibold text-[#D4BC6D] mb-3 block">
                        Tell Us Your Content, Theme, and Layout Ideas:
                    </label>
                    <textarea
                        {...register("content", { required: "Content is required" })}
                        placeholder="Describe your vision..."
                        className="w-full p-3 border border-[#4B4C46] rounded-lg bg-transparent text-sm text-gray-300 focus:border-[#D4BC6D] outline-none"
                        rows="4"
                    />
                    {errors?.content && (
                        <p className="text-red-500 text-sm mt-1">{errors?.content?.message}</p>
                    )}
                    </div>


                   {/* Radio Select for Category */}
                    <div className="mt-6">
                    <label className="text-base font-semibold text-[#D4BC6D] mb-3 block">
                        Select One Category
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                        { id: "merch", label: "Merch Collage", example: "/2.jpeg" },
                        { id: "favorite", label: "Favorite Picture", example: "/1.jpeg" },
                        { id: "logo", label: "Logo", example: "/3.jpeg" },
                        ].map(({ id, label, example }) => {
                        const isSelected = watch("selectedCategory") === id;
                        return (
                            <label
                            key={id}
                            className={`relative p-3 rounded-lg border cursor-pointer transition 
                                ${isSelected ? "border-[#D4BC6D] bg-[rgba(212,188,109,0.1)] shadow-lg" : "border-[#4B4C46] hover:border-[#D4BC6D]"}`}
                            >
                            <input
                                type="radio"
                                value={id}
                                {...register("selectedCategory", { required: true })}
                                className="absolute top-2 left-2"
                            />
                            <span className="block font-semibold text-[#D4BC6D] mb-2 px-5">{label}</span>
                            <img src={example} alt={label} className="w-full h-24 object-cover rounded-md" />
                            </label>
                        );
                        })}
                    </div>
                    {errors?.selectedCategory && (
                        <p className="text-red-500 text-sm mt-1">Please select one category</p>
                    )}
                    </div>

                    

                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-[#4B4C46] text-[#D4BC6D] rounded-full hover:bg-[#5a5b54] transition"
                    >
                    Cancel
                    </button>
                    <button
                    form="product-form"
                    type="submit"
                    className="px-4 py-2 bg-[#D4BC6D] text-black rounded-full hover:bg-[#b89f4e] transition"
                    >
                    Save
                    </button>
                </div>
                </form>
            </div>
            </div>

    );
};


export default NilService;
