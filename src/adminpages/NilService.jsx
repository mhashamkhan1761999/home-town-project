import React, { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query';
import { getRequest, postRequest } from '../api';
import { Controller, useForm } from 'react-hook-form';
import { queryClient } from '../main';
import Select from 'react-select';
import NilServiceViewModal from '../components/NilServiceViewModal';
import { Link, useNavigate } from 'react-router-dom';
import { convertToFormData } from './helpers';




const NilService = () => {

    const { data, isLoading, error } = useQuery({
        queryKey: ['get-products'], // Unique key for caching
        queryFn: () => getRequest('/my-products'), // Fetch function

    });


    const [isView, setIsView] = useState(false);
    const [active, setActive] = useState(1);
    return (
        <>
            <NilCategory setActive={setActive} />
        </>
    )
}


const NilCategory = ({ setActive }) => {
    const [selectedCardId, setSelectedCardId] = useState(null); // Track selected card
    const [selectedProductTypeId, setSelectedProductTypeId] = useState(null); // Track selected product type
    const [itemName, setItemName] = useState(''); // Track item name
    const [isShow, setIsShow] = useState(false); // Track visibility of product type

    const handleCategoryClick = (id) => {
        setSelectedCardId(id === selectedCardId ? null : id); // Toggle selection
        setTimeout(() => {
            setIsShow(1); // Show product type when a category is selected    
        }, 1000);
    }
    const handleproductType = (values) => {
        setSelectedProductTypeId(values?.id === selectedProductTypeId ? null : values?.id);
        setItemName(values?.name) // Reset product type selection when category changes
        setTimeout(() => {
            setIsShow(2); // Show product type when a category is selected    
        }, 1000);

    }
    const handleClose = () => {
        setIsShow(false); // Hide product type
        setSelectedProductTypeId(null); // Reset product type selection
        setSelectedCardId(null); // Reset category selection
    }

    console.log('selectedProductTypeId', selectedProductTypeId)
    return (
        <>
            {isShow ? '' : <Category handleActive={handleCategoryClick} selectedCard={selectedCardId} />}
            {isShow == 1 && <ProductType handleActive={handleproductType} selectedCard={selectedProductTypeId} category={selectedCardId} reload={() => setIsShow(false)} />}

            {isShow == 2 && (
                <ItemModal
                    item={{ selectedProductTypeId, selectedCardId, name: itemName }}
                    onClose={handleClose}
                    onSuccesActive={() => setActive(1)}
                />
            )}
        </>
    )
}

const Category = ({ handleActive, selectedCard }) => {
    const [isShow, setIsShow] = useState(false); // Track visibility of product type
    const [isShowForm, setIsShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const { data, isLoading, error } = useQuery({
        queryKey: ['category'], // Unique key for caching
        queryFn: () => getRequest('/categories'), // Fetch function
    });

    const filteredCategories = data?.filter((category) =>
        category?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

    return (
        <>
            <div className="card-gradient !border-[1.5px] p-6 rounded-3xl">
                <div className="flex mb-11">
                    <h2 className='text-white font-bold text-3xl '>
                        Category List
                    </h2>
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


                <div className=" mb-4">

                    <div className="mb-14">
                        <div className="grid grid-cols-1 gap-2 wrap">
                            {filteredCategories?.length > 0 && filteredCategories?.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-2 border-2 !border-[1.5px] rounded-0 w-[19.5rem] w-full"
                                    onClick={() => setIsShow(item?.id)}
                                    style={{
                                        border: selectedCard === item?.id ? '3px solid green' : '3px solid #ddd',
                                    }}
                                    type='button'
                                >
                                    <div className="p-4 w-full">
                                        <div className="flex items-center mb-2.5 w-full">
                                            <div className="ms-3 w-full">
                                                <h4 className='text-white font-semibold text-2xl text-center'>
                                                    {item?.name}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                <h2 className='text-white font-bold text-3xl mb-11'>
                    Service List
                </h2>

                <div className="">

                    <div className="mb-14">
                        <div className="grid grid-cols-1 gap-2 wrap">
                            <div
                                className="p-2 border-2 !border-[1.5px] rounded-0 w-[19.5rem] w-full"
                                style={{
                                    border: '3px solid #ddd',
                                }}
                                type='button'
                            >
                                <Link to="/athlete/bundles" className="p-4 w-full">
                                    <div className="flex items-center mb-2.5 w-full">
                                        <div className="ms-3 w-full">
                                            <h4 className='text-white font-semibold text-2xl text-center'>
                                                Custom Graphic & AI Video Drop
                                            </h4>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>




            {isShowForm && (
                <ItemModal2
                    onClose={() => setIsShowForm(false)}
                    onSuccesActive={() => {
                        setIsShowForm(false); // Hide form modal
                        handleActive(isShow); // Reset category selection
                        setIsShow(false);
                    }}
                />
            )}


            {isShow && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                    <div className="bg-black border border-[#4B4C46] rounded-2xl p-6 w-full max-w-xl">
                        {/* Video Section */}
                        <div className="mb-6">
                            <video
                                className="w-full h-[300px] rounded-lg"
                                src="/video23.mp4"
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
        </>
    )
}

const ProductType = ({ handleActive, selectedCard, category, reload }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['product-type', category], // Unique key for caching
        queryFn: () => getRequest(`/product-types?category_id=${category}`), // Fetch function
    });
    const [searchTerm, setSearchTerm] = useState("");


    // map only unique categories name
    const uniqueCategories = Array.from(new Set(data?.map(item => item?.sub_category?.name)))
    const filterUniqueCategories = Array.from(new Set(data?.map(item => item?.sub_category?.name)?.filter(name => name?.toLowerCase()?.includes(searchTerm?.toLowerCase()))))


    // Filtered products
    const filteredProducts = data?.filter((product) => {
        const categoryMatch = product?.sub_category?.name
            ?.toLowerCase()
            ?.includes(searchTerm?.toLowerCase());

        return categoryMatch;
    });


    console.log('filteredProducts', filteredProducts)

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
                    <div className="ms-auto">
                        <select
                            className="border border-[#d4bc6d] text-white p-2 w-full mb-4 rounded"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        >
                            <option value="">Select Sub Category</option>
                            {uniqueCategories?.length > 0 && uniqueCategories?.map((category) => (
                                <option value={category}>{category}</option>
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
                                {filteredProducts?.length > 0 && filteredProducts?.filter((i) => i.sub_category?.name == uniqueItem)?.map((item) => (
                                    <div
                                        key={item?.id}
                                        className="p-2 border !border-[1.5px] rounded-3xl w-[19.5rem]"
                                        onClick={() => {
                                            handleActive(item)
                                        }}
                                        style={{
                                            border: selectedCard === item?.id ? '2px solid green' : '1.5px solid transparent',
                                        }}
                                        typeof='button'
                                    >
                                        <div className="bg-[url('/mark.jpeg')] bg-cover bg-no-repeat rounded-3xl h-[13.5rem] flex justify-center items-center overflow-hidden">
                                            <img src={"https://hometown.eagleeblaze.com/storage/app/public/" + item?.icon} alt="shirt" className='h-[14rem] object-center object-contain' />
                                        </div>
                                        <div className="p-4">
                                            <div className="flex items-center mb-2.5">

                                                <div className="ms-3">
                                                    <h4 className='text-white font-semibold text-sm'>
                                                        Category: {item?.category?.name}
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="flex items-center mb-2.5">
                                                <div className="ms-3">
                                                    <h4 className='text-white font-semibold text-sm'>
                                                        Sub Category: {item?.sub_category?.name}
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="">
                                                <h4 className='text-white font-medium text-base'>
                                                    {item?.name}
                                                </h4>
                                                <h4 className='text-white font-medium text-base'>
                                                    Size: {item?.size}
                                                </h4>
                                                <p className='text-[#6B6B6B] font-semibold text-sm mb-3'>
                                                    Branded and premium packaging
                                                </p>
                                                <a className='bg-[#57430D] py-2.5 inline-flex items-center justify-center text-white rounded-full w-full font-bold text-sm'
                                                    onClick={() => {
                                                        handleActive(item)
                                                    }}
                                                    type='button'
                                                >
                                                    Select
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

const ItemModal = ({ item, onClose, onSuccesActive }) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [name, setName] = useState(item?.name || '');
    const [description, setDescription] = useState(item?.description || '');
    const [price, setPrice] = useState(10); // default min price = 10
    const [colorList, setColorList] = useState([]);
    const [image, setImage] = useState(null);

    const mutation = useMutation({
        mutationKey: ['add-product'],
        mutationFn: (form) => postRequest('/products', form, true),
        onSuccess: () => {
            onClose();
            onSuccesActive();
            queryClient.invalidateQueries({ queryKey: ['get-products'] });
            if (watch('design_service')) {
                navigate('/athlete/bundles');
            }
            navigate('/athlete/my-products');
        },
    });

    const onSubmit = (values) => {
        if (price < 10) {
            alert("Minimum price should be 10");
            return;
        }

        const formData = new FormData();
        formData.append("category_id", item?.selectedCardId);
        formData.append("product_type_id", item?.selectedProductTypeId);
        formData.append("name", values?.name);
        formData.append("description", values?.description);
        formData.append("price", values?.price);
        formData.append("colors", JSON.stringify(colorList?.map((item) => item?.value)));
        formData.append("image", image);
        formData.append("design_service", values?.design_service);


        mutation.mutate(formData);
    };

    console.log('item', image);

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
                    <div className="mb-8">
                        <label className="text-base font-semibold text-[#D4BC6D] mb-3 inline-block">
                            Name
                        </label>
                        <div className="flex items-center bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] rounded-t-lg">
                            <div className="p-4">
                                <svg className="w-5 h-5 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7m-7 7v6"></path>
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <input
                                    type="text"
                                    {...register('name', { required: 'Name is required' })}
                                    placeholder="Enter Item Name"
                                    value={item?.name}
                                    disabled
                                    className="w-full h-full border-0 outline-0 text-[#6B6B6B] text-sm bg-transparent"
                                />
                            </div>
                        </div>
                        {errors?.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="mb-8">
                        <label className="text-base font-semibold text-[#D4BC6D] mb-3 inline-block">
                            Descriptions (for fans/family)
                        </label>
                        <div className="flex items-center bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] rounded-t-lg">
                            <div className="p-4">
                                <svg className="w-5 h-5 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <textarea
                                    {...register('description', { required: 'Description is required' })}
                                    placeholder="Enter Item Description"
                                    className="w-full h-full border-0 outline-0 text-[#6B6B6B] text-sm bg-transparent"
                                    rows="4"
                                />
                            </div>
                        </div>
                        {errors?.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="mb-8">
                        <label className="text-base font-semibold text-[#D4BC6D] mb-3 inline-block">
                            Color options
                        </label>
                        <Select
                            isMulti
                            options={options}
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

                    <div className="mb-8">
                        <label className="text-base font-semibold text-[#D4BC6D] mb-3 inline-block">
                            Price (Minimal athlete price)
                        </label>
                        <div className="flex items-center bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] rounded-t-lg">
                            <div className="p-4">
                                <svg className="w-5 h-5 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <input
                                    type="number"
                                    min={10}
                                    {...register('price', { required: 'Price is required', min: { value: 10, message: 'Minimum price is 10' } })}
                                    placeholder="Enter Minimum Price"
                                    className="w-full h-full border-0 outline-0 text-[#6B6B6B] text-sm bg-transparent"
                                />
                            </div>
                        </div>
                        {errors?.price && (
                            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                        )}
                    </div>

                    <div className="mb-8">
                        <label className="text-base font-semibold text-[#D4BC6D] mb-3 inline-block">
                            Graphic placement
                        </label>
                        <div className="flex items-center bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] rounded-t-lg">
                            <div className="p-4">
                                <svg className="w-5 h-5 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register('image', { required: false })}
                                    onChange={(e) => setImage(e?.target?.files[0])}
                                    className="w-full h-full border-0 outline-0 text-[#6B6B6B] text-sm bg-transparent"
                                />
                            </div>
                        </div>
                        {errors?.image && (
                            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                        )}
                    </div>

                    <div className="mb-8">
                        <label className="flex items-start space-x-2 text-[#D4BC6D]">
                            <input
                                type="checkbox"
                                {...register("design_service")}
                                className="h-5 w-5 text-[#D4BC6D] rounded focus:ring-[#D4BC6D] border-[#4B4C46] bg-[rgba(217,217,217,0.03)]"
                            />
                            <span className="text-sm">
                                If you don’t have a design, check out our{' '}
                                <a href="/athlete/bundles" className="text-[#D4BC6D] hover:underline">
                                    Custom Graphic and AI Video Service
                                </a>.
                            </span>
                        </label>
                    </div>

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
                <h2 className="text-2xl font-bold text-[#D4BC6D] mb-6"></h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" id="product-form">

                    <div className="h-[400px] overflow-y-auto">

                        <div className="flex justify-between">
                            <div className="mb-8 w-[75%]">
                                <label className="text-base font-semibold text-[#D4BC6D] mb-3 inline-block">
                                    Upload Your Exact Photos
                                </label>
                                <div className="flex items-center bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] rounded-t-lg">
                                    <div className="p-4">
                                        <svg className="w-5 h-5 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-grow">
                                        <Controller
                                            name="image2"
                                            control={control}
                                            render={({ field: { onChange, ref } }) => (
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        onChange(e?.target?.files?.[0]); // push file into RHF form state
                                                    }}
                                                    ref={ref}
                                                    className="w-full h-full border-0 outline-0 text-[#6B6B6B] text-sm bg-transparent"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                {errors?.image2 && (
                                    <p className="text-red-500 text-sm mt-1">{errors?.image2?.message}</p>
                                )}
                            </div>
                            <div className="">

                            </div>
                        </div>

                        <div className="flex">
                            <div className="mb-8 w-[75%]">
                                <label className="text-base font-semibold text-[#D4BC6D] mb-3 inline-block">
                                    Tell Us Your Content, theme, and Layout ideas:
                                </label>
                                <div className="flex items-center bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] rounded-t-lg">
                                    <div className="p-4">
                                        <svg className="w-5 h-5 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-grow">
                                        <textarea
                                            {...register('content', { required: 'Content 1 is required' })}
                                            placeholder="Enter Content 1"
                                            className="w-full h-full border-0 outline-0 text-[#6B6B6B] text-sm bg-transparent"
                                            rows="4"
                                        />
                                    </div>
                                </div>
                                {errors?.content && (
                                    <p className="text-red-500 text-sm mt-1">{errors?.content?.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex">
                            <div className="mb-8 w-[75%]">
                                <label className="text-base font-semibold text-[#D4BC6D] mb-3 inline-block">
                                    Upload any Example or inspiration
                                </label>
                                <div className="flex items-center bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] rounded-t-lg">
                                    <div className="p-4">
                                        <svg className="w-5 h-5 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-grow">
                                        <Controller
                                            name="image"
                                            control={control}
                                            render={({ field: { onChange, ref } }) => (
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        onChange(e?.target?.files?.[0]); // push file into RHF form state
                                                    }}
                                                    ref={ref}
                                                    className="w-full h-full border-0 outline-0 text-[#6B6B6B] text-sm bg-transparent"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                {errors?.image && (
                                    <p className="text-red-500 text-sm mt-1">{errors?.image?.message}</p>
                                )}
                            </div>
                        </div>


                        <div className="flex justify-between items-center">
                            <div className="mb-8 w-[75%]">
                                <label className="text-base font-semibold text-[#D4BC6D] mb-3 inline-block">
                                    Merch Collage Graphic
                                </label>
                                <div className="flex items-center bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] rounded-t-lg">
                                    <div className="p-4">
                                        <svg className="w-5 h-5 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-grow">
                                        <Controller
                                            name="picture"
                                            control={control}
                                            render={({ field: { onChange, ref } }) => (
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        onChange(e?.target?.files?.[0]); // push file into RHF form state
                                                    }}
                                                    ref={ref}
                                                    className="w-full h-full border-0 outline-0 text-[#6B6B6B] text-sm bg-transparent"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                {errors?.picture && (
                                    <p className="text-red-500 text-sm mt-1">{errors?.picture?.message}</p>
                                )}
                            </div>
                            <div className="">
                                <label className="text-base font-semibold text-[#D4BC6D] mb-3 inline-block">
                                    Examples
                                </label>
                                <img src="/2.jpeg" alt="one" className='w-[100px]' />
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="mb-8 w-[75%]">
                                <label className="text-base font-semibold text-[#D4BC6D] mb-3 inline-block">
                                    Favotite Picture Graphic
                                </label>
                                <div className="flex items-center bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] rounded-t-lg">
                                    <div className="p-4">
                                        <svg className="w-5 h-5 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-grow">
                                        <Controller
                                            name="graphic_picture"
                                            control={control}
                                            render={({ field: { onChange, ref } }) => (
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        onChange(e?.target?.files?.[0]); // push file into RHF form state
                                                    }}
                                                    ref={ref}
                                                    className="w-full h-full border-0 outline-0 text-[#6B6B6B] text-sm bg-transparent"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                {errors?.graphic_picture && (
                                    <p className="text-red-500 text-sm mt-1">{errors?.graphic_picture?.message}</p>
                                )}
                            </div>
                            <div className="">
                                <img src="/1.jpeg" alt="one" className='w-[100px]' />
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="mb-8 w-[75%]">
                                <label className="text-base font-semibold text-[#D4BC6D] mb-3 inline-block">
                                    Logo
                                </label>
                                <div className="flex items-center bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] rounded-t-lg">
                                    <div className="p-4">
                                        <svg className="w-5 h-5 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-grow">
                                        <Controller
                                            name="logo"
                                            control={control}
                                            render={({ field: { onChange, ref } }) => (
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        onChange(e?.target?.files?.[0]); // push file into RHF form state
                                                    }}
                                                    ref={ref}
                                                    className="w-full h-full border-0 outline-0 text-[#6B6B6B] text-sm bg-transparent"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                {errors?.logo && (
                                    <p className="text-red-500 text-sm mt-1">{errors?.logo?.message}</p>
                                )}
                            </div>
                            <div className="">
                                <img src="/3.jpeg" alt="one" className='w-[100px]' />
                            </div>
                        </div>


                        <div className="mb-8">
                            <label className="text-base font-semibold text-[#D4BC6D] mb-3 inline-block">
                                Content 2:
                            </label>
                            <div className="flex items-center bg-[rgba(217,217,217,0.03)] border-b border-[#4B4C46] rounded-t-lg">
                                <div className="p-4">
                                    <svg className="w-5 h-5 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                                    </svg>
                                </div>
                                <div className="flex-grow">
                                    <textarea
                                        {...register('description', { required: 'Content 2 is required' })}
                                        placeholder="Enter Content 1"
                                        className="w-full h-full border-0 outline-0 text-[#6B6B6B] text-sm bg-transparent"
                                        rows="4"
                                    />
                                </div>
                            </div>
                            {errors?.description && (
                                <p className="text-red-500 text-sm mt-1">{errors?.description?.message}</p>
                            )}
                        </div>
                    </div>





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

export default NilService