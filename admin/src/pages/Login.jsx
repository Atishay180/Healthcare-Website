import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext';
import axios from "axios";
import { toast } from 'react-hot-toast';
import Loader from '../components/Loader';

import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
    const [state, setState] = useState('Admin');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const { setToken, backendUrl } = useContext(AdminContext);
    const { setDoctoken } = useContext(DoctorContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });

                localStorage.setItem('token', data.token);
                setToken(data.token);
                toast.success(data?.message || "Welcome Back")
            } else {
                const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password });

                localStorage.setItem("doctoken", data.doctoken);
                setDoctoken(data.doctoken);
                toast.success(data?.message || "Welcome Back")
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative h-screen w-full flex items-center justify-center">
            {/* 🔵 Blurred background image */}
            <div
                className="absolute inset-0 bg-cover bg-center blur-xs opacity-90 -z-10"
                style={{ backgroundImage: `url(${assets.background})` }}
            ></div>

            <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
                <div className='flex flex-col gap-3 m-auto bg-white items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                    <p className='text-2xl font-semibold m-auto text-tertiary'><span className='text-primary'>{state}</span> Login</p>
                    <div className='w-full'>
                        <p>Email</p>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='border border-[#DADADA] rounded w-full p-2 mt-1'
                            type="email"
                            placeholder={state === 'Admin' ? 'Enter "viewadmin@healthcare.com" as email' : 'Enter "sarah.patel@prescripto.com" as email'}
                            required
                        />
                    </div>
                    <div className='w-full'>
                        <p>Password</p>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='border border-[#DADADA] rounded w-full p-2 mt-1'
                            type="password"
                            placeholder={state === 'Admin' ? 'Enter "view123" as password' : 'Enter "admin123" as password'}
                            required
                        />
                    </div>
                    <button
                        disabled={loading}
                        className='bg-primary text-white w-full h-11 py-2 flex items-center justify-center rounded-md text-base cursor-pointer'
                    >
                        {loading
                            ? <Loader properties={{ height: 15, color: '#ffffff' }} />
                            : 'Login'
                        }
                    </button>

                    {
                        state === 'Admin'
                            ? <p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p>

                            : <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
                    }
                </div>
            </form>
        </div>
    )
}

export default Login
