import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify"

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const [doctors, setDoctors] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/all-doctors`, {}, { headers: { token } })

            if (data.success) {
                setDoctors(data.doctors)
            }

            else {
                toast.error(data.message || "error in fetching the doctors")
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability = async (doctorId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/change-availability`, { doctorId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message || "Availability Changed")
                getAllDoctors();
            }
            else {
                toast.error(error.message)
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong")
        }
    }

    const value = {
        token, setToken,
        backendUrl,
        doctors, getAllDoctors,
        changeAvailability
    }

    return <AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>
}

export default AdminContextProvider;
