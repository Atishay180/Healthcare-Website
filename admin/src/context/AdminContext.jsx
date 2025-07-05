import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from "react-hot-toast"
import { useEffect } from "react";
export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const [doctors, setDoctors] = useState([]);
    const [specialities, setSpecialities] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [dashboardData, setDashboardData] = useState({});

    //speciality id 
    const [speciality, setSpeciality] = useState('');

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/all-doctors`, {}, { headers: { token } })

            setDoctors(data.doctors)

        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong")
        }
    }

    const getAllSpecialities = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/all-specialities`, { headers: { token } })
            setSpecialities(data.specialities)
            setSpeciality(data.specialities?.[0]?._id || '')
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong")
        }
    }

    const changeAvailability = async (doctorId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/change-availability`, { doctorId }, { headers: { token } })

            toast.success(data.message || "Availability Changed")
            getAllDoctors();
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong");
        }
    }

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, { headers: { token } })

            setAppointments(data.appointments);

        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong");
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/cancel-appointment`, { appointmentId }, { headers: { token } });

            getAllAppointments();
            toast.success(data.message || "Appointment Cancelled")
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong");
        }
    }

    // const fetchDashboard = async () => {
    //     try {
    //         const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, { headers: { token } })
    //         setDashboardData(data.dashboardData)
    //     } catch (error) {
    //         toast.error(error.response?.data?.message || error.message || "Something went wrong")
    //     }
    // }

    const getAllNotifications = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/notification/notifications`, { headers: { token } });
            setNotifications(data.notifications);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong")
        }
    }

    useEffect(() => {
        if (token) {
            getAllDoctors();
            getAllSpecialities();
            getAllAppointments();
        }
    }, [token])

    useEffect(() => {
        if (token) {
            getAllNotifications();
        }
    }, [changeAvailability])

    const value = {
        token, setToken,
        backendUrl,
        doctors,
        specialities,
        changeAvailability,
        speciality, setSpeciality,
        appointments, setAppointments,
        getAllAppointments,
        notifications, setNotifications,
        getAllNotifications,
        cancelAppointment,
        // fetchDashboard,
        dashboardData
    }

    return <AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>
}

export default AdminContextProvider;
