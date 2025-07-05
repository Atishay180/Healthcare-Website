import React, { useEffect, useState } from 'react';

import { FaTimes } from 'react-icons/fa';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Prompt = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const hasSeen = localStorage.getItem('hasSeenServerNotice');
        if (!hasSeen) {
            setShow(true);
            localStorage.setItem('hasSeenServerNotice', 'true');
        }

        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true,
        });
    }, []);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div data-aos="fade-up" className="bg-gray-50 rounded-xl shadow-lg w-[90%] max-w-lg p-6 text-center animate-scale-in relative">
                {/* Close Button */}
                <button
                    onClick={() => setShow(false)}
                    className="absolute top-3 right-3 text-gray-700 hover:text-red-500"
                >
                    <FaTimes />
                </button>

                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    ⚠️ The backend is hosted on a Render free instance.
                </h2>
                <p className="text-sm text-gray-700 mb-2">
                    It may take <span className="font-medium text-gray-900">30–40 seconds</span> to start.
                </p>
                <p className="text-sm text-blue-600 mb-2">
                    🔁 <strong>Note:</strong> If the backend still doesn't load, kindly refresh the page.
                </p>
                <p className="text-sm text-red-600">
                    🚫 This app is for demonstration & testing only. Please do not misuse it.
                </p>
            </div>
        </div>
    );
};

export default Prompt;
