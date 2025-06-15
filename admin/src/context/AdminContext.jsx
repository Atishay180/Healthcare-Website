import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from "react-hot-toast"
import { useEffect } from "react";
export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const [doctors, setDoctors] = useState([]);
    const [specialities, setSpecialities] = useState([]);

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
            const {data} = await axios.get(`${backendUrl}/api/admin/all-specialities`, { headers: { token } })
            setSpecialities(data.specialities)
            setSpeciality(data.specialities?.[0]?._id || '')
            
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong")
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

    useEffect(() => {
        if (token) {
            getAllDoctors();
            getAllSpecialities();
        }
    }, [token])

    const value = {
        token, setToken,
        backendUrl,
        doctors,
        specialities,
        changeAvailability,
        speciality, setSpeciality
    }

    return <AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>
}

export default AdminContextProvider;
