import React from 'react';
import { useMutation } from "@tanstack/react-query";
import { postRequest } from "../api/index.js";
import { queryClient } from "../main.jsx";
import { LoaderCircle, X } from "lucide-react";

const AdminModal = ({ onClose }) => {

    const mutation = useMutation({
        mutationKey: ['add-agree'],
        mutationFn: () => postRequest('/accept', {}),
        onSuccess: () => {
            // queryClient.invalidateQueries({ queryKey: ['get-timing'] });
            onClose();
        }
    })

    const onAgree = () => {
        mutation.mutate()
    }

    return (
        <>
            <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white w-full max-w-5xl rounded-lg shadow-lg flex flex-col max-h-[90vh]">

                    {/* Modal Header */}
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Terms & Conditions</h2>
                        <button onClick={() => onClose()} className="text-gray-500 hover:text-black" type='button'>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="px-6 py-4 overflow-y-auto flex-1">
                        <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
                            <section>
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">Clothing Drop</h1>
                                <p className="mb-4">Launch a bold, custom clothing line for your fans, friends, and family — and earn NIL from it.</p>
                                <p className="mb-4">Your clothing should speak before you do. With full customization and premium quality, you can create merchandise your supporters actually want to wear.</p>
                                <p className="mb-4 font-semibold">This isn’t just apparel — it’s a uniform your community wears with pride.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">How It Works</h2>
                                <ul className="list-disc list-inside space-y-2">
                                    <li><span className="font-semibold">Every Launch is Free:</span> No cost to start. Launch the service to unlock products.</li>
                                    <li><span className="font-semibold">Pro Tip:</span> Drop small batches to drive engagement.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Free Custom Graphic Included</h2>
                                <ol className="list-decimal list-inside space-y-2">
                                    <li>Fill out the graphic design inquiry form</li>
                                    <li>Submit your vision (images, colors, themes)</li>
                                    <li>Receive graphic in 12 hours with unlimited revisions</li>
                                </ol>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Product Customization</h2>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Set pricing, colors, descriptions, placement, sizing</li>
                                    <li>Request additional customizations</li>
                                    <li>Products go live within 12 hours</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Social Media Feature</h2>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Standard: Collab post on @HometownHeroNILUpNext</li>
                                    <li>Pro: Collab post on @HometownHeroNIL</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Additional Notes</h2>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Full creative control and customization</li>
                                    <li>Update anytime</li>
                                    <li>Direct support from your NIL agent</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Service Policy</h2>
                                <p className="mb-2">Completely free to launch. If no sale within 60 days, a $25 fee applies. Fee is waived after first sale.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">NIL Policy & Legal Information</h2>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>You're responsible for accurate personal info</li>
                                    <li>NIL not allowed for high school athletes in: TX, MO, NJ, NY, IL, IA</li>
                                    <li>NIL legal in 40+ states for high school, all 50 for college/pro</li>
                                    <li>International athletes: confirm local NIL laws</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Ready to Launch?</h2>
                                <p className="mb-4">Click <span className="text-blue-600 underline cursor-pointer">Launch Service</span> to build your brand and leave your mark.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Background Design Notes (for WebApp Designer)</h2>
                                <ul className="list-disc list-inside space-y-2">
                                    <li><span className="font-semibold">Text:</span> YOUR STORY. YOUR BRAND. YOUR LEGACY.</li>
                                    <li><span className="font-semibold">Pro Tip:</span> Drop small batches to drive engagement.</li>
                                    <li><span className="font-semibold">Font:</span> Anton</li>
                                    <li><span className="font-semibold">Color:</span> Gold</li>
                                    <li><span className="font-semibold">Placement:</span> Stretched across the full screen width</li>
                                    <li><span className="font-semibold">Behavior:</span> Fixed background element behind scrollable dashboard content</li>
                                    <li><span className="font-semibold">Style:</span> Minimal, premium, consistent across all service pages</li>
                                </ul>
                            </section>
                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acid Wash Clothing Drop</h2>
                                <p className="text-lg text-gray-700 mb-4">
                                    Launch a bold, retro-inspired acid wash collection for your fans, friends, and family — and earn NIL from it.
                                    With its gritty texture, washed finish, and vintage look, acid wash apparel creates a one-of-a-kind style that stands out in any setting. From heavyweight tees to faded hoodies and comfy shorts, every piece delivers a premium, eye-catching feel straight out of the box. This drop blends comfort, quality, and aesthetic — designed to turn heads while staying timeless.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-2">How It Works</h3>
                                <p className="text-lg text-gray-700 mb-4">Every Launch is Free. There’s no cost to get started. Scroll down, explore the product options, and click <strong>Launch Service</strong>.</p>

                                <p className="text-lg text-gray-700 mb-4">Once you launch, the full product list for this category will appear at the top of this page.</p>

                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li><span className="font-semibold">Pro Tip:</span> Drop products in small batches to build momentum and drive engagement.</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Custom Graphic Included</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    Every NIL Clothing Drop includes one free custom graphic designed by our team.
                                    To begin:
                                </p>

                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li>Fill out the graphic design inquiry form.</li>
                                    <li>Submit the form with your design vision (images, colors, themes, layout ideas, etc.).</li>
                                </ul>

                                <p className="text-lg text-gray-700 mb-4">Our design team will deliver your graphic within 12 hours. You’ll receive unlimited revisions to make sure it’s exactly how you want it.</p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Product Customization</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    Once your graphic is ready, return to this page to finalize your drop. You can:
                                </p>

                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li>Set pricing.</li>
                                    <li>Select colors.</li>
                                    <li>Write product descriptions.</li>
                                    <li>Choose graphic placement and sizing.</li>
                                </ul>

                                <p className="text-lg text-gray-700 mb-4">
                                    Or — let our team handle the full customization process for you.
                                    Products will go live within 24 hours after customization details are submitted.
                                </p>
                            </section>
                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Social Media Feature</h2>
                                <p className="text-lg text-gray-700 mb-4">
                                    When you launch your clothing drop, you’ll be featured on our social platforms to drive traffic and visibility.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Standard Dashboard:</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    Featured in a collab post on <strong>@HometownHeroNILUpNext</strong>
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro Dashboard:</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    Featured in a collab post on <strong>@HometownHeroNIL</strong>
                                </p>

                                <p className="text-lg text-gray-700 mb-4">
                                    This exposure helps boost your drop and introduces your brand to new audiences.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Notes</h3>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li>All products in this category are fully customizable.</li>
                                    <li>You maintain full creative control and can update at any time.</li>
                                    <li>Our NIL team is here to support you throughout the process.</li>
                                    <li>Have questions? Message your NIL agent directly through your dashboard.</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Policy</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    This service is completely free to launch. To ensure platform quality and active participation:
                                </p>
                                <p className="text-lg text-gray-700 mb-4">
                                    If you do not make at least one sale within 60 days, a $25 service fee will be deducted from your account balance.
                                </p>
                                <p className="text-lg text-gray-700 mb-4">
                                    As soon as you make your first sale, this policy is permanently waived for this drop.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">NIL Policy & Legal Information</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    You are responsible for providing accurate personal information and confirming that you are eligible to participate in NIL deals.
                                </p>

                                <h4 className="text-lg font-semibold text-gray-900 mb-2">High School Athlete Restrictions</h4>
                                <p className="text-lg text-gray-700 mb-4">
                                    NIL is currently not permitted for high school athletes in the following states:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li>Texas</li>
                                    <li>Missouri</li>
                                    <li>New Jersey</li>
                                    <li>New York</li>
                                    <li>Illinois</li>
                                    <li>Iowa</li>
                                </ul>
                                <p className="text-lg text-gray-700 mb-4">
                                    If you live in one of these states, you can still build your brand on the platform — but you cannot receive earnings or withdraw funds until NIL becomes legal in your state.
                                </p>

                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Eligibility Overview</h4>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li>NIL is legal in 40+ states for high school athletes.</li>
                                    <li>NIL is legal in all 50 states for college and professional athletes.</li>
                                    <li>International athletes should confirm NIL eligibility in their home country before launching.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Launch Your Acid Wash Line?</h2>
                                <p className="text-lg text-gray-700 mb-4">
                                    Click <strong>Launch Service</strong> to start building your brand — and bring vintage energy to your legacy.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Background Design Notes (for WebApp Designer)</h3>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li><span className="font-semibold">Text:</span> YOUR STORY. YOUR BRAND. YOUR LEGACY.</li>
                                    <li><span className="font-semibold">Font:</span> Anton</li>
                                    <li><span className="font-semibold">Color:</span> Gold</li>
                                    <li><span className="font-semibold">Placement:</span> Stretched across the full screen width</li>
                                    <li><span className="font-semibold">Behavior:</span> Fixed background element behind scrollable dashboard content</li>
                                    <li><span className="font-semibold">Style:</span> Minimal, premium, consistent across all service pages</li>
                                </ul>

                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Jersey Drop</h2>
                                <p className="text-lg text-gray-700 mb-4">
                                    Launch your specialized jersey for your fans, friends, and family — and earn NIL from it. Now you have the chance to earn direct commission on your own jersey sales — even the pros don’t get that. Every athlete deserves a jersey with their name on it. Whether it’s a throwback look, gameday-ready design, or limited-edition drop, your jersey represents Your Story, Your Brand, and Your Legacy. Give your fans a piece of your journey they can wear with pride.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    Every Launch is Free. There’s no cost to get started. Scroll down, explore the product options, and click <strong>Launch Service</strong>.
                                </p>
                                <p className="text-lg text-gray-700 mb-4">Once you launch, the full product list for this category will appear at the top of this page.</p>

                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li><span className="font-semibold">Pro Tip:</span> Drop products in small batches to build momentum and drive engagement.</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Free Custom Graphic Included</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    Every NIL Clothing Drop includes one free custom graphic designed by our team. To begin:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li>Fill out the graphic design inquiry form.</li>
                                    <li>Submit the form with your design vision (images, colors, themes, layout ideas, etc.).</li>
                                </ul>
                                <p className="text-lg text-gray-700 mb-4">
                                    Our design team will deliver your graphic within 12 hours. You’ll receive unlimited revisions to make sure it’s exactly how you want it.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Customization</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    Once your graphic is ready, return to this page to finalize your drop. You can:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li>Set pricing.</li>
                                    <li>Select colors.</li>
                                    <li>Choose graphic placement and sizing.</li>
                                </ul>
                                <p className="text-lg text-gray-700 mb-4">
                                    Or — let our team handle the full customization process for you. Products will go live within 24 hours after customization details are submitted.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Media Feature</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    When you launch your clothing drop, you’ll be featured on our social platforms to drive traffic and visibility.
                                </p>

                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Standard Dashboard:</h4>
                                <p className="text-lg text-gray-700 mb-4">
                                    Featured in a collab post on <strong>@HometownHeroNILUpNext</strong>
                                </p>

                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Pro Dashboard:</h4>
                                <p className="text-lg text-gray-700 mb-4">
                                    Featured in a collab post on <strong>@HometownHeroNIL</strong>
                                </p>

                                <p className="text-lg text-gray-700 mb-4">
                                    This exposure helps boost your drop and introduces your brand to new audiences.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Notes</h3>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li>All products in this category are fully customizable.</li>
                                    <li>You maintain full creative control and can update at any time.</li>
                                    <li>Our NIL team is here to support you throughout the process.</li>
                                    <li>Have questions? Message your NIL agent directly through your dashboard.</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Policy</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    This service is completely free to launch. To ensure platform quality and active participation:
                                </p>
                                <p className="text-lg text-gray-700 mb-4">
                                    If you do not make at least one sale within 60 days, a $25 service fee will be deducted from your account balance.
                                </p>
                                <p className="text-lg text-gray-700 mb-4">
                                    As soon as you make your first sale, this policy is permanently waived for this drop.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">NIL Policy & Legal Information</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    You are responsible for providing accurate personal information and confirming that you are eligible to participate in NIL deals.
                                </p>

                                <h4 className="text-lg font-semibold text-gray-900 mb-2">High School Athlete Restrictions</h4>
                                <p className="text-lg text-gray-700 mb-4">
                                    NIL is currently not permitted for high school athletes in the following states:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li>Texas</li>
                                    <li>Missouri</li>
                                    <li>New Jersey</li>
                                    <li>New York</li>
                                    <li>Illinois</li>
                                    <li>Iowa</li>
                                </ul>
                                <p className="text-lg text-gray-700 mb-4">
                                    If you live in one of these states, you can still build your brand on the platform — but you cannot receive earnings or withdraw funds until NIL becomes legal in your state.
                                </p>

                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Eligibility Overview</h4>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li>NIL is legal in 40+ states for high school athletes.</li>
                                    <li>NIL is legal in all 50 states for college and professional athletes.</li>
                                    <li>International athletes should confirm NIL eligibility in their home country before launching.</li>
                                </ul>

                                <p className="text-lg text-gray-700 mb-4">
                                    Ready to Launch Your Jersey Line? Click <strong>Launch Service</strong> to start building your brand — and give your fans a way to wear your name with pride.
                                </p>

                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Launch Your Footwear Line?</h2>
                                <p className="text-lg text-gray-700 mb-4">
                                    Click <strong>Launch Service</strong> to start building your brand — and leave your mark with every step.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Background Design Notes (for WebApp Designer)</h3>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li><span className="font-semibold">Text:</span> YOUR STORY. YOUR BRAND. YOUR LEGACY.</li>
                                    <li><span className="font-semibold">Font:</span> Anton</li>
                                    <li><span className="font-semibold">Color:</span> Gold</li>
                                    <li><span className="font-semibold">Placement:</span> Stretched across the full screen width</li>
                                    <li><span className="font-semibold">Behavior:</span> Fixed background element behind scrollable dashboard content</li>
                                    <li><span className="font-semibold">Style:</span> Minimal, premium, consistent across all service pages</li>
                                </ul>
                            </section>

                            <section>

                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Home & Lifestyle Drop</h2>
                                <p className="text-lg text-gray-700 mb-4">
                                    Launch your home and lifestyle line for your fans, friends, and family — and earn NIL from it. From custom mugs to posters, pillows to blankets, this drop gives you the chance to bring something different into your supporters’ everyday life. Turn ordinary spaces into inspiration hubs — and let your brand become part of the daily routine, from the kitchen to the living room.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    Every Launch is Free. There’s no cost to get started. Scroll down, explore the product options, and click <strong>Launch Service</strong>.
                                </p>
                                <p className="text-lg text-gray-700 mb-4">Once you launch, the full product list for this category will appear at the top of this page.</p>

                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li><span className="font-semibold">Pro Tip:</span> Drop products in small batches to build momentum and drive engagement.</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Free Custom Graphic Included</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    Every NIL Clothing Drop includes one free custom graphic designed by our team. To begin:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li>Fill out the graphic design inquiry form.</li>
                                    <li>Submit the form with your design vision (images, colors, themes, layout ideas, etc.).</li>
                                </ul>
                                <p className="text-lg text-gray-700 mb-4">
                                    Our design team will deliver your graphic within 12 hours. You’ll receive unlimited revisions to make sure it’s exactly how you want it.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Customization</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    Once your graphic is ready, return to this page to finalize your drop. You can:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li>Set pricing.</li>
                                    <li>Select colors.</li>
                                    <li>Choose graphic placement and sizing.</li>
                                </ul>
                                <p className="text-lg text-gray-700 mb-4">
                                    Or — let our team handle the full customization process for you. Products will go live within 24 hours after customization details are submitted.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Media Feature</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    When you launch your clothing drop, you’ll be featured on our social platforms to drive traffic and visibility.
                                </p>

                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Standard Dashboard:</h4>
                                <p className="text-lg text-gray-700 mb-4">
                                    Featured in a collab post on <strong>@HometownHeroNILUpNext</strong>
                                </p>

                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Pro Dashboard:</h4>
                                <p className="text-lg text-gray-700 mb-4">
                                    Featured in a collab post on <strong>@HometownHeroNIL</strong>
                                </p>

                                <p className="text-lg text-gray-700 mb-4">
                                    This exposure helps boost your drop and introduces your brand to new audiences.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Notes</h3>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li>All products in this category are fully customizable.</li>
                                    <li>You maintain full creative control and can update at any time.</li>
                                    <li>Our NIL team is here to support you throughout the process.</li>
                                    <li>Have questions? Message your NIL agent directly through your dashboard.</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Policy</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    This service is completely free to launch. To ensure platform quality and active participation:
                                </p>
                                <p className="text-lg text-gray-700 mb-4">
                                    If you do not make at least one sale within 60 days, a $25 service fee will be deducted from your account balance.
                                </p>
                                <p className="text-lg text-gray-700 mb-4">
                                    As soon as you make your first sale, this policy is permanently waived for this drop.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">NIL Policy & Legal Information</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    You are responsible for providing accurate personal information and confirming that you are eligible to participate in NIL deals.
                                </p>

                                <h4 className="text-lg font-semibold text-gray-900 mb-2">High School Athlete Restrictions</h4>
                                <p className="text-lg text-gray-700 mb-4">
                                    NIL is currently not permitted for high school athletes in the following states:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li>Texas</li>
                                    <li>Missouri</li>
                                    <li>New Jersey</li>
                                    <li>New York</li>
                                    <li>Illinois</li>
                                    <li>Iowa</li>
                                </ul>
                                <p className="text-lg text-gray-700 mb-4">
                                    If you live in one of these states, you can still build your brand on the platform — but you cannot receive earnings or withdraw funds until NIL becomes legal in your state.
                                </p>

                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Eligibility Overview</h4>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li>NIL is legal in 40+ states for high school athletes.</li>
                                    <li>NIL is legal in all 50 states for college and professional athletes.</li>
                                    <li>International athletes should confirm NIL eligibility in their home country before launching.</li>
                                </ul>

                                <p className="text-lg text-gray-700 mb-4">
                                    Ready to Launch Your Home & Lifestyle Line? Click <strong>Launch Service</strong> to start building your brand — and become part of your supporters’ everyday space.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Background Design Notes (for WebApp Designer)</h3>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li><span className="font-semibold">Text:</span> YOUR STORY. YOUR BRAND. YOUR LEGACY.</li>
                                    <li><span className="font-semibold">Font:</span> Anton</li>
                                    <li><span className="font-semibold">Color:</span> Gold</li>
                                    <li><span className="font-semibold">Placement:</span> Stretched across the full screen width</li>
                                    <li><span className="font-semibold">Behavior:</span> Fixed background element behind scrollable dashboard content</li>
                                    <li><span className="font-semibold">Style:</span> Minimal, premium, consistent across all service pages</li>
                                </ul>


                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Accessories Drop</h2>
                                <p className="text-lg text-gray-700 mb-4">
                                    Launch your custom accessories for your fans, friends, and family — and earn NIL from it. Small details. Big impact. Sometimes it’s the little things that leave the biggest impression. Keychains, phone cases, bags, and more — accessories are perfect for giveaways, fan drops, and content packs. Affordable, creative, and memorable, they’re an easy way to expand your brand and reach every corner of your community.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    Every Launch is Free. There’s no cost to get started. Scroll down, explore the product options, and click <strong>Launch Service</strong>.
                                </p>
                                <p className="text-lg text-gray-700 mb-4">Once you launch, the full product list for this category will appear at the top of this page.</p>

                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li><span className="font-semibold">Pro Tip:</span> Drop products in small batches to build momentum and drive engagement.</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Free Custom Graphic Included</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    Every NIL Clothing Drop includes one free custom graphic designed by our team. To begin:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li>Fill out the graphic design inquiry form.</li>
                                    <li>Submit the form with your design vision (images, colors, themes, layout ideas, etc.).</li>
                                </ul>
                                <p className="text-lg text-gray-700 mb-4">
                                    Our design team will deliver your graphic within 12 hours. You’ll receive unlimited revisions to make sure it’s exactly how you want it.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Customization</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    Once your graphic is ready, return to this page to finalize your drop. You can:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li>Set pricing.</li>
                                    <li>Select colors.</li>
                                    <li>Choose graphic placement and sizing.</li>
                                </ul>
                                <p className="text-lg text-gray-700 mb-4">
                                    Or — let our team handle the full customization process for you. Products will go live within 24 hours after customization details are submitted.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Media Feature</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    When you launch your clothing drop, you’ll be featured on our social platforms to drive traffic and visibility.
                                </p>

                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Standard Dashboard:</h4>
                                <p className="text-lg text-gray-700 mb-4">
                                    Featured in a collab post on <strong>@HometownHeroNILUpNext</strong>
                                </p>

                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Pro Dashboard:</h4>
                                <p className="text-lg text-gray-700 mb-4">
                                    Featured in a collab post on <strong>@HometownHeroNIL</strong>
                                </p>

                                <p className="text-lg text-gray-700 mb-4">
                                    This exposure helps boost your drop and introduces your brand to new audiences.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Notes</h3>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li>All products in this category are fully customizable.</li>
                                    <li>You maintain full creative control and can update at any time.</li>
                                    <li>Our NIL team is here to support you throughout the process.</li>
                                    <li>Have questions? Message your NIL agent directly through your dashboard.</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Policy</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    This service is completely free to launch. To ensure platform quality and active participation:
                                </p>
                                <p className="text-lg text-gray-700 mb-4">
                                    If you do not make at least one sale within 60 days, a $25 service fee will be deducted from your account balance.
                                </p>
                                <p className="text-lg text-gray-700 mb-4">
                                    As soon as you make your first sale, this policy is permanently waived for this drop.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">NIL Policy & Legal Information</h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    You are responsible for providing accurate personal information and confirming that you are eligible to participate in NIL deals.
                                </p>

                                <h4 className="text-lg font-semibold text-gray-900 mb-2">High School Athlete Restrictions</h4>
                                <p className="text-lg text-gray-700 mb-4">
                                    NIL is currently not permitted for high school athletes in the following states:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li>Texas</li>
                                    <li>Missouri</li>
                                    <li>New Jersey</li>
                                    <li>New York</li>
                                    <li>Illinois</li>
                                    <li>Iowa</li>
                                </ul>
                                <p className="text-lg text-gray-700 mb-4">
                                    If you live in one of these states, you can still build your brand on the platform — but you cannot receive earnings or withdraw funds until NIL becomes legal in your state.
                                </p>

                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Eligibility Overview</h4>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li>NIL is legal in 40+ states for high school athletes.</li>
                                    <li>NIL is legal in all 50 states for college and professional athletes.</li>
                                    <li>International athletes should confirm NIL eligibility in their home country before launching.</li>
                                </ul>

                                <p className="text-lg text-gray-700 mb-4">
                                    Ready to Launch Your Accessories Line? Click <strong>Launch Service</strong> to start building your brand — one detail at a time.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Background Design Notes (for WebApp Designer)</h3>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li><span className="font-semibold">Text:</span> YOUR STORY. YOUR BRAND. YOUR LEGACY.</li>
                                    <li><span className="font-semibold">Font:</span> Anton</li>
                                    <li><span className="font-semibold">Color:</span> Gold</li>
                                    <li><span className="font-semibold">Placement:</span> Stretched across the full screen width</li>
                                    <li><span className="font-semibold">Behavior:</span> Fixed background element behind scrollable dashboard content</li>
                                    <li><span className="font-semibold">Style:</span> Minimal, premium, consistent across all service pages</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Strength Supplements Drop</h2>
                                <p className="text-lg mb-4">Launch your custom sports supplements for your fans, friends, and family — and earn NIL from it.</p>
                                <p className="text-lg mb-4"><strong>Fuel your grind. Build your brand.</strong></p>
                                <p className="mb-4">Athletes aren’t just selling a look — they’re selling a lifestyle. With this service, you can launch high-quality supplements that match your performance. Whether it’s pre-workout, recovery, or protein blends, you're giving fans, teammates, and supporters a product they can trust. Power your brand with what powers you.</p>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h3>
                                <p className="text-lg mb-4"><strong>Every Launch is Free:</strong> There’s no cost to get started. Scroll down, explore the product options, and click Launch Service.</p>
                                <p className="text-lg mb-4">Once you launch:</p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>The full product list for this category will appear at the top of this page.</li>
                                </ul>
                                <p className="text-lg mb-4"><strong>Pro Tip:</strong> Drop products in small batches to build momentum and drive engagement.</p>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Free Custom Graphic Included</h3>
                                <p className="text-lg mb-4">Every NIL Clothing Drop includes one free custom graphic designed by our team.</p>
                                <p className="mb-4"><strong>To begin:</strong></p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Fill out the graphic design inquiry form.</li>
                                    <li>Submit the form with your design vision (images, colors, themes, layout ideas).</li>
                                </ul>
                                <p className="text-lg mb-4">Our design team will deliver your graphic within 12 hours. You’ll receive unlimited revisions to make sure it’s exactly how you want it.</p>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Customization</h3>
                                <p className="text-lg mb-4">Once your graphic is ready, return to this page to finalize your drop. You can:</p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Set pricing</li>
                                    <li>Select flavors or blends (where applicable)</li>
                                    <li>Choose label placement and design direction</li>
                                    <li>Or — let our team handle the full customization process for you.</li>
                                </ul>
                                <p className="text-lg mb-4">Products will go live within 24 hours after customization details are submitted.</p>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Media Feature</h3>
                                <p className="text-lg mb-4">When you launch your clothing drop, you’ll be featured on our social platforms to drive traffic and visibility.</p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li><strong>Standard Dashboard:</strong> Featured in a collab post on @HometownHeroNILUpNext</li>
                                    <li><strong>Pro Dashboard:</strong> Featured in a collab post on @HometownHeroNIL</li>
                                </ul>
                                <p className="text-lg mb-4">This exposure helps boost your drop and introduces your brand to new audiences.</p>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Notes</h3>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>All products in this category are fully customizable.</li>
                                    <li>You maintain full creative control and can update at any time.</li>
                                    <li>Our NIL team is here to support you throughout the process.</li>
                                    <li>Have questions? Message your NIL agent directly through your dashboard.</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Policy</h3>
                                <p className="text-lg mb-4">This service is completely free to launch. To ensure platform quality and active participation:</p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>If you do not make at least one sale within 60 days, a $25 service fee will be deducted from your account balance.</li>
                                    <li>As soon as you make your first sale, this policy is permanently waived for this drop.</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">NIL Policy & Legal Information</h3>
                                <p className="text-lg mb-4">You are responsible for providing accurate personal information and confirming that you are eligible to participate in NIL deals.</p>
                                <h4 className="font-semibold text-lg mb-2">High School Athlete Restrictions</h4>
                                <p className="text-lg mb-4">NIL is currently not permitted for high school athletes in the following states:</p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Texas, Missouri, New Jersey, New York, Illinois, Iowa</li>
                                </ul>
                                <p className="text-lg mb-4">If you live in one of these states, you can still build your brand on the platform — but you cannot receive earnings or withdraw funds until NIL becomes legal in your state.</p>

                                <h4 className="font-semibold text-lg mb-2">Eligibility Overview</h4>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>NIL is legal in 40+ states for high school athletes</li>
                                    <li>NIL is legal in all 50 states for college and professional athletes</li>
                                    <li>International athletes should confirm NIL eligibility in their home country before launching.</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Launch Your Supplement Line?</h3>
                                <p className="text-lg mb-4">Click Launch Service to fuel your brand — and help others power their performance.</p>
                            </section>


                            <section className="bg-fixed bg-cover bg-center text-white py-16 px-6">
                                <h2 className="text-4xl font-bold text-center mb-4">YOUR STORY. YOUR BRAND. YOUR LEGACY.</h2>
                                <p className="text-lg text-center">Font: Anton | Color: Gold | Style: Minimal, premium, consistent across all service pages.</p>
                            </section>



                        </main>
                    </div>






                    {/* Modal Footer */}
                    <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                        <button
                            onClick={onAgree}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition inline-flex items-center justify-center"
                        >
                            Agree &nbsp;
                            {mutation?.isPending && (
                                <LoaderCircle className="animate-spin" size={17} />
                            )}

                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default AdminModal;