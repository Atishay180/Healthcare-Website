import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AdminContext } from '../../context/AdminContext';
import Loader from '../../components/Loader';
import { assets } from '../../assets/assets';

const AddSpeciality = () => {
    const [image, setImage] = useState(false);
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
            const formData = new FormData();
            formData.append('name', name);
            formData.append('status', status);
            formData.append('description', description);

            if (image) {
                formData.append('image', image);
            }

            const { data } = await axios.post(`${backendUrl}/api/admin/add-speciality`, formData, { headers: { token } })
            toast.success(data?.message || 'Speciality added successfully');
            setName('');
            setStatus('Available');
            setDescription('');
            setImage(false);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-full p-5'>
            <form onSubmit={handleSubmit}>
                <p className='mb-3 text-lg font-medium'>Add Speciality</p>

                <div className='bg-white px-8 py-8 shadow-xl shadow-gray-400 rounded w-full max-w-6xl'>
                    <div className='flex flex-col gap-5 text-gray-600'>

                        <div className='flex items-center gap-4 mb-6 text-gray-500'>
                            <label htmlFor="speciality-img">
                                <img className='w-28 bg-transparent shadow-lg shadow-gray-300 rounded-lg cursor-pointer' src={image ? URL.createObjectURL(image) : assets.speciality_upload_area} alt="" />
                            </label>

                            <input
                                onChange={(e) => setImage(e.target.files[0])}
                                type="file"
                                id="speciality-img"
                                hidden
                            />
                            <p>Upload speciality <br /> picture</p>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p>Speciality Name <span className='text-red-400'>*</span></p>
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
                            <p>Status <span className='text-red-400'>*</span></p>
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
                            <p>Description <span className='text-red-400'>*</span></p>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className='border rounded px-3 py-2'
                                rows='4'
                                placeholder='Write a short description about the speciality'
                                required
                            ></textarea>
                        </div>

                        <button
                            disabled={loading}
                            type='submit'
                            className='bg-primary flex items-center justify-center px-10 py-3 h-12 mt-4 text-white hover:scale-95 transition-all rounded-full cursor-pointer'
                        >
                            {loading
                                ? <Loader properties={{ height: 20, color: '#ffffff' }} />
                                : 'Add Speciality'
                            }
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddSpeciality;
