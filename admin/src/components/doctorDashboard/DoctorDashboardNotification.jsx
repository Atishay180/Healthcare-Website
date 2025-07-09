import React, { useContext } from 'react'
import { FaTimes } from 'react-icons/fa';
import { DoctorContext } from '../../context/DoctorContext';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const DoctorDashboardNotification = () => {

  const { docNotifications } = useContext(DoctorContext);
  const colors = ['border-blue-500', 'border-green-500', 'border-yellow-500'];

  return (
    <section className="bg-white rounded-xl w-full px-5 py-4 max-h-72 shadow-lg">
      <h2 className="text-lg font-semibold mb-2">Notifications</h2>

      {docNotifications && docNotifications.length > 0 ? (
        <ul className="flex flex-col gap-4 text-sm text-gray-700 max-h-52 overflow-auto">
          {docNotifications.map((notification, index) => (
            <li
              key={notification._id}
              className={`relative border-l-4 pl-3 pr-6 ${colors[index % colors.length]}`}
            >
              <div className="flex justify-between items-start gap-2">
                <p className="flex-1">{notification.message}</p>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {dayjs(notification.createdAt).fromNow()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-sm">No notifications found</p>
      )}
    </section>
  )
}

export default DoctorDashboardNotification
