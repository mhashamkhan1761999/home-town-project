import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { getRequest } from '../api';
import NilServiceViewModal from '../components/NilServiceViewModal';

const MyProducts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['get-products'],
    queryFn: () => getRequest('/my-products'),
  });

  const [isView, setIsView] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');

  // Sort in descending order by created_at (latest first)
  const sortedData = [...(data || [])].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  // Group products by category name
  const categoryMap =
    sortedData.reduce((acc, product) => {
      const categoryName = product?.category?.name || 'Uncategorized';
      if (!acc[categoryName]) acc[categoryName] = [];
      acc[categoryName].push(product);
      return acc;
    }, {}) || {};

  const categories = Object.keys(categoryMap);

  // Set default active category
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories]);

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">Error loading products</p>;

  return (
    
    <>
      <div className="card-gradient !border-[1.5px] p-6 rounded-3xl">
        {/* PROMINENT ALERT MESSAGE */}
        <div className="mb-8 p-5 rounded-xl border-l-8 border-yellow-500 bg-yellow-100 shadow-lg">
          <p className="text-base font-semibold text-yellow-900">
            Production team is working on your request. It will take around{' '}
            <strong>12 hours</strong> to make your storefront live and upload
            your products.
          </p>
        </div>

        <div className="flex gap-4 w-full justify-between mb-8">
          <h2 className="text-white font-bold text-3xl">Storefront Products</h2>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-500">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-colors duration-300 
                ${
                  activeCategory === cat
                    ? 'bg-[#57430D] text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products for Active Category */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {categoryMap[activeCategory]?.map((item, index) => {
            return (
            <div
                key={index}
                className="p-2 bg-black/30 border border-gray-700 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
                {/* Image Section */}
                <div
                className="bg-cover bg-center rounded-2xl h-[13.5rem] flex justify-center items-center overflow-hidden"
                style={{
                    backgroundImage: `url(${
                    item?.icon
                        ? `https://hometown.eagleeblaze.com/storage/app/public/${item.icon}`
                        : '/mark.jpeg'
                    })`,
                }}
                >
                <img
                    src={
                    item?.icon
                        ? `https://hometown.eagleeblaze.com/storage/app/public/${item.icon}`
                        : '/shirt.svg'
                    }
                    alt={item?.name}
                    className="h-[15rem] object-contain drop-shadow-xl"
                />
                </div>
                <div className="p-4">
                <p className="text-sm font-semibold text-white mb-1">
                    Category:{' '}
                    <span className="text-gray-300">{item?.category?.name}</span>
                </p>
                <p className="text-sm font-semibold text-white mb-1">
                    Sub Category:{' '}
                    <span className="text-gray-300">
                    {item?.sub_category?.name || '-'}
                    </span>
                </p>
                <h4 className="text-lg font-bold text-white mb-1">{item?.name}</h4>
                <p className="text-gray-400 text-sm mb-3">{item?.description}</p>
                <p className="text-yellow-500 font-semibold mb-3">
                    Status: {item?.status}
                </p>
                <button
                    onClick={() => setIsView(item)}
                    className="bg-[#57430D] py-2.5 w-full text-white rounded-full font-bold text-sm hover:bg-[#6b5615] transition-colors duration-300"
                >
                    View
                </button>
                </div>
            </div>
            );
        })}
        </div>



      </div>

      {/* Modal */}
      {isView && (
        <NilServiceViewModal
          product={isView}
          onClose={() => setIsView(false)}
        />
      )}
    </>
  );
};

export default MyProducts;
