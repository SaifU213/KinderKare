import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const x = 0;

const EditStaff = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [user, setUser] = useState({
    email: auth[0],
    newPassword: '',
    rePassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const ChangePassword = () => {
    const { newPassword, rePassword } = user;
    if (newPassword == rePassword) {
      axios.post('http://localhost:9002/editstaff', user).then((res) => {
        alert('Password has been updated');
        navigate('/StaffListForChildren');
      }).catch((error) => console.log(error));
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl relative flex flex-col justify-center min-h-screen overflow-hidden bg-[url('https://storage.googleapis.com/msgsndr/Uj1D6UrVHJKU7MfjEQdt/media/641a98261639e0117f805f35.png')] bg-cover  bg-center">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 ">
          Change Your Password
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <div
              htmlFor="text"
              className="block text-sm font-semibold text-gray-800"
            >
              Enter New Password
            </div>
            <input
              type="password"
              name="newPassword"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={user.newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <div
              htmlFor="text"
              className="block text-sm font-semibold text-gray-800"
            >
              Re-Enter New Password
            </div>
            <input
              type="password"
              name="rePassword"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={user.rePassword}
              onChange={handleChange}
            />
          </div>
          <div className="mt-6">
            <button type="button" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={ChangePassword}>
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStaff;
