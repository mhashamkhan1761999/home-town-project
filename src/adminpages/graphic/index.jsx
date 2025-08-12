import React from 'react'
import Faqs from '../../components/Faqs';
import { Plus } from 'lucide-react';
import AddMedia from './AddMedia';

const Graphic = () => {
    const [activeTab, setActiveTab] = React.useState("tab2");

    const tabs = [
        {
            id: "tab1",
            label: "Media Libraray",
            content: (
                <>

                </>
            )
        },
        {
            id: "tab2",
            label: <span className='inline-flex items-center gap-3'><Plus size={15} /> Add New Media</span>,
            content: (
                <>
                    <AddMedia />
                </>
            )
        },
    ];


    return (
        <>
            <div className="border-2 border-[#D4BC6D] px-8 p-6 rounded-3xl">
                <h2 className='text-white font-bold text-3xl mb-16'>
                    Settings
                </h2>

                <div className="max-h-[75dvh] overflow-y-auto">
                    <div className="flex gap-4 mb-9">
                        {tabs?.map((tab) => (
                            <button
                                key={tab?.id}
                                onClick={() => setActiveTab(tab?.id)}
                                className={`${activeTab == tab?.id ? 'bg-[#D4BC6D]' : 'border border-[#D4BC6D]'} py-3.5 px-10 text-sm font-bold rounded-full text-white`}
                                type='button'
                            >
                                {tab?.label}
                            </button>
                        ))}
                    </div>


                    {tabs?.map((tab) => (
                        tab?.id == activeTab && (
                            <React.Fragment key={tab?.id}>
                                {tab?.content}
                            </React.Fragment>
                        )
                    ))}


                </div>
            </div>
        </>
    )
}

export default Graphic