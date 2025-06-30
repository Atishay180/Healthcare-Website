import React from 'react'

const DashboardNotification = () => {
    return (
        <section className="bg-white rounded-xl w-full lg:w-1/3 p-5 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Notifications</h2>
            <ul className="space-y-4 text-sm text-gray-700">
                <li className="border-l-4 border-blue-500 pl-3">
                    New appointment booked by John Doe
                    <p className="text-xs text-gray-400">10 mins ago</p>
                </li>
                <li className="border-l-4 border-green-500 pl-3">
                    Payment received from Alice
                    <p className="text-xs text-gray-400">30 mins ago</p>
                </li>
                <li className="border-l-4 border-yellow-500 pl-3">
                    Dr. Smith updated his availability
                    <p className="text-xs text-gray-400">1 hour ago</p>
                </li>
            </ul>
        </section>
    )
}

export default DashboardNotification
