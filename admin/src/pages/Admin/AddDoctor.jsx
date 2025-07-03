import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Loader from '../../components/Loader';

const AddDoctor = () => {
  const { backendUrl, token, specialities, speciality, setSpeciality } = useContext(AdminContext);

  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const [loading, setLoading] = useState(false);


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(speciality);


    if (password !== confirmPassword) {
      setLoading(false);
      return toast.error('Passwords do not match');
    }

    try {
      if (!docImg) {
        return toast.error('Image Not Selected');
      }

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { token } });

      toast.success(data?.message);
      setDocImg(false);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setExperience('1 Year');
      setFees('');
      setAbout('');
      setAddress1('');
      setAddress2('');
      setDegree('');
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='p-2 md:p-5 w-full'>
      <form onSubmit={onSubmitHandler}>
        <div className='bg-white px-4 sm:px-8 py-8 rounded-xl w-full max-h-[90vh] overflow-y-scroll shadow'>
          <p className='mb-6 text-xl text-center md:text-start font-semibold text-primary'>Add Doctor</p>

          {/* Upload Section */}
          <div className='flex items-center gap-4 mb-6 text-gray-600'>
            <label htmlFor="doc-img">
              <img
                className='w-16 h-16 object-cover bg-gray-100 rounded-full cursor-pointer'
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt="Upload"
              />
            </label>
            <input type="file" id="doc-img" hidden onChange={(e) => setDocImg(e.target.files[0])} />
            <p>Upload <span className='text-red-400'>*</span> <br /> image</p>
          </div>

          {/* Responsive Grid Inputs */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-600'>
            <div>
              <p>Doctor Name <span className='text-red-400'>*</span></p>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" required className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
              <p>Doctor Email <span className='text-red-400'>*</span></p>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
              <p>Doctor Password <span className='text-red-400'>*</span></p>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
              <p>Confirm Password <span className='text-red-400'>*</span></p>
              <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" required className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
              <p>Experience <span className='text-red-400'>*</span></p>
              <select value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full border px-3 py-2 rounded">
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={`${i + 1} Year`}>{i + 1} Year</option>
                ))}
                <option value="10 Year +">10 Year +</option>
              </select>
            </div>

            <div>
              <p>Speciality <span className='text-red-400'>*</span></p>
              <select value={speciality} onChange={(e) => setSpeciality(e.target.value)} className="w-full border px-3 py-2 rounded">
                {specialities.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name} {item.status === 'Coming Soon' ? `(${item.status})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p>Education <span className='text-red-400'>*</span></p>
              <input value={degree} onChange={(e) => setDegree(e.target.value)} type="text" placeholder="Degree" required className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
              <p>Fees <span className='text-red-400'>*</span></p>
              <input value={fees} onChange={(e) => setFees(e.target.value)} type="number" placeholder="Fees" required className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
              <p>Address 1 <span className='text-red-400'>*</span></p>
              <input value={address1} onChange={(e) => setAddress1(e.target.value)} type="text" placeholder="Address line 1" required className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
              <p>Address 2 <span className='text-red-400'>*</span></p>
              <input value={address2} onChange={(e) => setAddress2(e.target.value)} type="text" placeholder="Address line 2" required className="w-full border px-3 py-2 rounded" />
            </div>
          </div>

          {/* About Doctor */}
          <div className='mt-6'>
            <p className='text-gray-600'>About Doctor <span className='text-red-400'>*</span></p>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={5}
              placeholder="Write about the doctor"
              className="w-full border px-4 py-2 rounded resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            type='submit'
            className='bg-primary mt-6 text-white px-10 py-3 rounded-full font-medium hover:scale-95 transition duration-200 flex justify-center items-center'
          >
            {loading ? <Loader properties={{ height: 17, color: '#ffffff' }} /> : 'Add Doctor'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddDoctor
