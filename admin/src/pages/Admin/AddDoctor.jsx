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
    <div className='p-5 w-full'>
      <form onSubmit={onSubmitHandler}>
        <p className='mb-3 text-lg font-medium'>Add Doctor</p>

        <div className='bg-white px-8 py-8 shadow-xl shadow-gray-400 rounded w-full max-w-6xl max-h-[90vh] overflow-y-scroll'>
          <div className='flex items-center gap-4 mb-8 text-gray-500'>
            <label htmlFor="doc-img">
              <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
            </label>

            <input
              onChange={(e) => setDocImg(e.target.files[0])}
              type="file"
              id="doc-img"
              hidden
            />
            <p>Upload doctor <br /> picture</p>
          </div>

          {/* left side */}
          <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
            <div className='w-full lg:flex-1 flex flex-col gap-4'>
              <div className='flex-1 flex flex-col gap-1'>
                <p>Doctor Name <span className='text-red-400'>*</span></p>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='border rounded px-3 py-2'
                  type="text"
                  placeholder='Name'
                  required
                />
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Doctor Email <span className='text-red-400'>*</span></p>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='border rounded px-3 py-2'
                  type="email"
                  placeholder='Email'
                  required
                />
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Doctor Password <span className='text-red-400'>*</span></p>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='border rounded px-3 py-2'
                  type="password"
                  placeholder='Password'
                  required
                />
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Confirm Password <span className='text-red-400'>*</span></p>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='border rounded px-3 py-2'
                  type="password"
                  placeholder='Password'
                  required
                />
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Experience <span className='text-red-400'>*</span></p>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className='border rounded px-3 py-2'
                  name=""
                  id=""
                >
                  <option value="1 Year"> 1 Year</option>
                  <option value="2 Year"> 2 Year</option>
                  <option value="3 Year"> 3 Year</option>
                  <option value="4 Year"> 4 Year</option>
                  <option value="5 Year"> 5 Year</option>
                  <option value="6 Year"> 6 Year</option>
                  <option value="7 Year"> 7 Year</option>
                  <option value="8 Year"> 8 Year</option>
                  <option value="9 Year"> 9 Year</option>
                  <option value="10 Year"> 10 Year</option>
                  <option value="10 Year"> 10 Year +</option>
                </select>
              </div>
            </div>

            {/* right side */}
            <div className='w-full lg:flex-1 flex flex-col gap-4'>
              <div className='flex-1 flex flex-col gap-1'>
                <p>Speciality <span className='text-red-400'>*</span></p>
                <select
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  className='border rounded px-3 py-2'
                  name=""
                  id=""
                >
                  {specialities && specialities.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name} {item.status === 'Coming Soon' ? `(${item.status})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Education <span className='text-red-400'>*</span></p>
                <input
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className='border rounded px-3 py-2'
                  type="text"
                  placeholder='Education'
                  required
                />
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Fees <span className='text-red-400'>*</span></p>
                <input
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  className='border rounded px-3 py-2'
                  type="number"
                  placeholder='fees'
                  required
                />
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Address <span className='text-red-400'>*</span></p>
                <input
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  className='border rounded px-3 py-2'
                  type="text"
                  placeholder='address 1'
                  required
                />
                <input
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  className='border rounded px-3 py-2'
                  type="text"
                  placeholder='address 2'
                  required
                />
              </div>

            </div>
          </div>

          {/* bottom centered part */}
          <div>
            <p className='mt-4 mb-2'>About Doctor <span className='text-red-400'>*</span></p>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className='w-full px-4 pt-2 border rounded'
              placeholder='Write about doctor'
              rows={5}
              required
            />
          </div>

          <button
            disabled={loading}
            type='submit'
            className='bg-primary px-10 py-3 h-11 mt-4 flex items-center justify-center text-white hover:scale-95 transition-all rounded-full cursor-pointer'
          >
            {loading
              ? <Loader properties={{ height: 17, color: '#ffffff' }} />
              : 'Add doctor'
            }
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddDoctor
