import React from 'react'
import { assets } from '../assets/assets'

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-white px-6 py-10 mt-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

                {/* Left Section */}
                <div className="md:w-1/5 flex gap-2">
                    <div>
                        <img className='w-12' src={assets.logo} alt="" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">Healthcare</h2>
                        <p className="text-sm">
                            Copyright © <span>{currentYear}</span> BRIX Templates<br />
                            | All Rights Reserved
                        </p>
                    </div>
                </div>

                {/* Link Sections */}
                <div className="flex flex-wrap gap-10 justify-between md:justify-around md:w-4/5">

                    {/* Product */}
                    <div>
                        <h3 className="font-semibold mb-2">Product</h3>
                        <ul className="space-y-1 text-sm text-gray-200">
                            <li>Features</li>
                            <li>Pricing</li>
                            <li>Reviews</li>
                            <li>Updates</li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold mb-2">Company</h3>
                        <ul className="space-y-1 text-sm text-gray-200">
                            <li><NavLink onClick={() => scrollTo(0, 0)} to="/">Home</NavLink></li>
                            <li><NavLink onClick={() => scrollTo(0, 0)} to="/about">About</NavLink></li>
                            <li><NavLink onClick={() => scrollTo(0, 0)} to="/contact">Contact Us</NavLink></li>
                            <li><NavLink onClick={() => scrollTo(0, 0)} to="/contact">Carrers</NavLink></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold mb-2">Support</h3>
                        <ul className="space-y-1 text-sm text-gray-200">
                            <li className='cursor-pointer' onClick={() => window.location.href = `https://github.com/Atishay180/Healthcare-Website`}>Getting started</li>
                            <li className='cursor-pointer' onClick={() => window.location.href = `https://github.com/Atishay180/Healthcare-Website`}>Help center</li>
                            <li>Chat support</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-semibold mb-2">Follow us</h3>
                        <ul className="space-y-2 text-sm text-gray-200">
                            <li className="flex items-center gap-2"><FaFacebookF /> Facebook</li>
                            <li className="flex items-center gap-2"><FaTwitter /> Twitter</li>
                            <li className="flex items-center gap-2"><FaInstagram /> Instagram</li>
                            <li className="flex items-center gap-2"><FaLinkedinIn /> LinkedIn</li>
                            <li className="flex items-center gap-2"><FaYoutube /> YouTube</li>
                        </ul>
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer
