import React from 'react'

const DashboardTable = ({slotDateFormat, appointments}) => {
    return (
        <section className="bg-white rounded-xl w-full lg:w-2/3 p-5 shadow-lg">
            <h2 className="text-lg font-semibold mb-3">Patient Appointments</h2>

            {/* Table Wrapper */}
            <div className="max-h-72 overflow-y-auto relative">
                <table className="w-full text-sm">
                    <thead className="sticky top-0 z-10 bg-gray-100">
                        <tr>
                            <th className="text-left p-3">Patient</th>
                            <th className="text-left p-3">Date</th>
                            <th className="text-left p-3">Time</th>
                            <th className="text-left p-3">Doctor</th>
                            <th className="text-left p-3">Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments && appointments.map((item, index) => (
                            <tr key={index} className="border-t">
                                <td className="py-3 px-3 text-gray-700">{item.userData.name}</td>
                                <td className="px-3">{slotDateFormat(item.slotDate)}</td>
                                <td className="px-3">{item.slotTime}</td>
                                <td className="px-3">{item.docData.name}</td>
                                <td className={`py-3 px-3 font-semibold ${item.payment ? 'text-green-500' : 'text-red-400'}`}>
                                    {item.payment ? "Paid" : "Pending"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default DashboardTable
