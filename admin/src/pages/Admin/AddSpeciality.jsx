import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AdminContext } from '../../context/AdminContext';

const AddSpeciality = () => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('Available');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const { backendUrl, token } = useContext(AdminContext);

    const statusOptions = ['Available', 'Unavailable', 'Coming Soon']

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const {data} = await axios.post(`${backendUrl}/api/admin/add-speciality`, {name, status, description}, {headers: {token}})
            toast.success(data?.message || 'Speciality added successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || 'Something went wrong');
        } finally {
            setName('');
            setStatus('Available');
            setDescription('');
            setLoading(false);
        }a
    }

    return (
        <form onSubmit={handleSubmit} className='m-5 w-full'>
            <p className='mb-3 text-lg font-medium'>Add Speciality</p>

            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl'>
                <div className='flex flex-col gap-5 text-gray-600'>
                    <div className='flex flex-col gap-1'>
                        <p>Speciality Name</p>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='border rounded px-3 py-2'
                            type='text'
                            placeholder='Enter speciality name'
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p>Status</p>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className='border rounded px-3 py-2'
                        >
                            {statusOptions && statusOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p>Description</p>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='border rounded px-3 py-2'
                            rows='4'
                            placeholder='Write a short description about the speciality'
                            required
                        ></textarea>
                    </div>

                    <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full cursor-pointer'>
                        Add Speciality
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddSpeciality;
