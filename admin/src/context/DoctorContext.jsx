import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

import axios from "axios";
import { AdminContext } from "./AdminContext";
import toast from "react-hot-toast";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const { backendUrl } = useContext(AdminContext);

    const [doctoken, setDoctoken] = useState(localStorage.getItem("doctoken") ? localStorage.getItem("doctoken") : '');
    const [docData, setDocData] = useState(false);
    const [docAppointments, setDocAppointments] = useState([]);
    const [docNotifications, setDocNotifications] = useState([]);

    const fetchDoctorData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/doctor-dashboard`, { headers: { doctoken } });
            setDocData(data.doctor);
            setDocAppointments(data.appointments);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong");
        }
    }

    const getAllNotifications = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/notifications`, { headers: { doctoken } });
            setDocNotifications(data.notifications);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong")
        }
    }

    useEffect(() => {
        if (doctoken) {
            fetchDoctorData();
            getAllNotifications();
        }
    }, [doctoken]);

    const value = {
        doctoken, setDoctoken,
        docData, setDocData,
        docAppointments, setDocAppointments,
        docNotifications, setDocNotifications
    }

    return <DoctorContext.Provider value={value}>
        {props.children}
    </DoctorContext.Provider>
}

export default DoctorContextProvider;
