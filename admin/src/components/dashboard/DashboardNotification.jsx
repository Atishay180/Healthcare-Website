import React from 'react';

import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

import axios from 'axios';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const colors = ['border-blue-500', 'border-green-500', 'border-yellow-500'];

const DashboardNotification = ({ Icon }) => {

    const { token, getAllNotifications, backendUrl, notifications } = useContext(AdminContext);

    const deleteNotification = async (notificationId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/notification/delete-notification`, { notificationId }, { headers: { token } })
            console.log(data.message);
            getAllNotifications();
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong")
        }
    }

    return (
        <section className="bg-white rounded-xl w-full lg:w-1/3 p-5 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Notifications</h2>

            {notifications && notifications.length > 0 ? (
                <ul className="space-y-4 text-sm text-gray-700 max-h-72 overflow-auto">
                    {notifications.map((notification, index) => (
                        <li
                            key={notification._id}
                            className={`relative border-l-4 pl-3 pr-6 ${colors[index % colors.length]}`}
                        >
                            <div className="flex justify-between items-start gap-2">
                                <p className="flex-1">{notification.message}</p>

                                <button onClick={() => deleteNotification(notification._id)} className='mt-1'>
                                    <Icon className="text-gray-400 cursor-pointer" />
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
            )}
        </section>
    );
};

export default DashboardNotification;
