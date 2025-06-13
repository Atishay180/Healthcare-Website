import axios from 'axios';
import React, { createContext } from 'react'
import toast from 'react-hot-toast';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    //login and signup logic 
    const authentication = async ({
        e,
        backendUrl,
        state,
        name,
        email,
        password,
        setToken,
        setLoading,
    }) => {
        e.preventDefault();

        try {
            setLoading(true)

            // sign up user
            if (state === 'Sign Up') {
                const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })

                localStorage.setItem('token', data.token)
                setToken(data.token)
                toast.success(data.message || "Registered Successfully")
            }

            // login user
            else {
                const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password })

                localStorage.setItem('token', data.token)
                setToken(data.token)
                toast.success(data.message || "Logged in Successfully")
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something Went Wrong"
            toast.error(message)
        } finally {
            setLoading(false)
        }

    }

    // logout logic 
    const logout = ({ token, setToken }) => {
        setToken(false);
        localStorage.removeItem('token');
        toast.success(`Logged Out Successfully`);
    }

    const value = {
        logout, authentication
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
