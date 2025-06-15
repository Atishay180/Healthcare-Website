import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '₹';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const [specialities, setSpecialities] = useState([]);

    const [token, setToken] = useState(
        localStorage.getItem('token') ?
            localStorage.getItem('token') :
            false
    );
    const [userData, setUserData] = useState(false);

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`);

            data.success && setDoctors(data.doctors);
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something Went Wrong"
            toast.error(message)
        }
    }

    const getAllSpecialities = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/all-specialities`, { headers: { token } });
            setSpecialities(data.specialities);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Something Went Wrong")
        }
    }

    const getUserProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, { headers: { token } })
            setUserData(data.userData);
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something Went Wrong"
            toast.error(message)
        }
    }


    const value = {
        doctors, currencySymbol,
        token, setToken,
        backendUrl,
        userData, setUserData,
        getDoctorsData,
        getUserProfileData,
        specialities
    }

    useEffect(() => {
        getDoctorsData();
        getAllSpecialities();
    }, [])

    useEffect(() => {
        if (token) {
            getUserProfileData()
        } else {
            setUserData(false);
        }
    }, [token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
