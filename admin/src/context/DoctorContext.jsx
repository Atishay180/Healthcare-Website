import { useState } from "react";
import { createContext } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const [doctoken, setDoctoken] = useState(localStorage.getItem("doctoken") ? localStorage.getItem("doctoken") : '');

    const value = {
        doctoken, setDoctoken
    }

    return <DoctorContext.Provider value={value}>
        {props.children}
    </DoctorContext.Provider>
}

export default DoctorContextProvider;
