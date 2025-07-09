import React from 'react';

const DoctorDashboardSkeleton = () => {
    return (
        <div className='py-4 px-1 w-full flex flex-col gap-4 animate-pulse h-screen overflow-scroll'>

            {/* Profile Skeleton */}
            <section className="bg-white p-6 rounded-xl shadow-md flex flex-col sm:flex-row items-start gap-10 w-full">
                <div className="w-full sm:w-64 h-64 bg-gray-200 rounded-xl"></div>
                <div className="flex-1 w-full space-y-4">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-20 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
            </section>

            {/* Bottom Section Skeleton */}
            <div className="flex flex-col lg:flex-row justify-between md:h-64 gap-4 w-full">
                {/* Appointments Table Skeleton */}
                <div className="bg-white p-4 rounded-xl shadow-md flex-1 space-y-3">
                    <div className="h-5 bg-gray-300 rounded w-1/3"></div>
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="grid grid-cols-4 gap-4">
                            <div className="h-4 bg-gray-200 rounded col-span-1"></div>
                            <div className="h-4 bg-gray-200 rounded col-span-1"></div>
                            <div className="h-4 bg-gray-200 rounded col-span-1"></div>
                            <div className="h-4 bg-gray-200 rounded col-span-1"></div>
                        </div>
                    ))}
                </div>

                {/* Notifications Skeleton */}
                <div className="bg-white p-4 rounded-xl shadow-md w-full lg:w-1/3 space-y-3">
                    <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboardSkeleton;
