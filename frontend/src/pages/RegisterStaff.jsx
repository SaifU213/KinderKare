import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const RegisterStaff = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    reEnterPassword: '',
    employer: auth[2],
    employeremail: auth[0],
    role: 'Staff',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { name, email, password, reEnterPassword, employer, employeremail } = user;
    if (name && email && password && password === reEnterPassword && employer && employeremail) {
      axios.post('http://localhost:9002/staffregister', user).then((res) => {
        if (res.data.message !== 'No Employers with this Name or Email exist.') {
          navigate('/homepage');
        }
        alert(res.data.message);
      }).catch((error) => console.log(error));
    } else {
      alert('invlid input');
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl relative flex flex-col justify-center min-h-screen overflow-hidden bg-[url('https://storage.googleapis.com/msgsndr/Uj1D6UrVHJKU7MfjEQdt/media/641a98261639e0117f805f35.png')] bg-cover  bg-center">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 ">
          Register a Staff Member
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <div
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Your Employees Name
            </div>
            <input
              type="name"
              name="name"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <div
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Your Employees Email
            </div>
            <input
              type="email"
              name="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <div
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </div>
            <input
              type="password"
              name="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <div
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Re-enter Password
            </div>
            <input
              type="password"
              name="reEnterPassword"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={user.reEnterPassword}
              onChange={handleChange}
            />
          </div>
          <div className="mt-6">
            <button type="button" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={register}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterStaff;
