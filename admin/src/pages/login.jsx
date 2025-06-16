import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext';
import axios from "axios";
import { toast } from 'react-hot-toast';
import Loader from '../components/Loader';

const Login = () => {
    const [state, setState] = useState('Admin');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const { setToken, backendUrl } = useContext(AdminContext);

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

            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border border-[#DADADA] rounded w-full p-2 mt-1'
                        type="email"
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
    )
}

export default Login
