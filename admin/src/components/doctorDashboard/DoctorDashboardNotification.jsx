import React from 'react'
import { FaTimes } from 'react-icons/fa';

const DoctorDashboardNotification = () => {
  return (
    <section className="bg-white rounded-xl w-full p-5 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>

      {/* {notifications && notifications.length > 0 ? (
        <ul className="space-y-4 text-sm text-gray-700 max-h-72 overflow-auto">
          {notifications.map((notification, index) => (
            <li
              key={notification._id}
              className={`relative border-l-4 pl-3 pr-6 ${colors[index % colors.length]}`}
            >
              <div className="flex justify-between items-start gap-2">
                <p className="flex-1">{notification.message}</p>

                <button onClick={() => deleteNotification(notification._id)} className='mt-1'>
                  <FaTimes className="text-gray-400 cursor-pointer" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {dayjs(notification.createdAt).fromNow()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-sm">No notifications found</p>
      )} */}
    </section>
  )
}

export default DoctorDashboardNotification
