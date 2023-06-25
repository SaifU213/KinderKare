import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OwnerRegister = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    daycarename: '',
    password: '',
    reEnterPassword: '',
    role: 'Owner',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    // const { name, value } = e.target
  };

  const register = () => {
    const { name, email, daycarename, password, reEnterPassword } = user;
    if (name && email && daycarename && password && password === reEnterPassword) {
      axios.post('http://localhost:9002/ownerregister', user).then((res) => {
        alert(res.data.message);

        navigate('/OwnerLogin');
      }).catch((error) => console.log(error));
    } else {
      alert('invlid input');
    }
  };

  return (location.pathname === '/OwnerRegister')
    ? (
      <div className="relative flex flex-col justify-center  min-h-screen overflow-hidden bg-[url('https://storage.googleapis.com/msgsndr/Uj1D6UrVHJKU7MfjEQdt/media/64169a036230005a1fd20f34.png')] bg-cover  bg-center">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 ">
            Register As An Owner
          </h1>
          <form className="mt-6">
            <div className="mb-2">
              <div
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800"
              >
                Name
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
                Email
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
                htmlFor="text"
                className="block text-sm font-semibold text-gray-800"
              >
                Daycare Name
              </div>
              <input
                type="text"
                name="daycarename"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                value={user.daycarename}
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

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {' '}
            Already have an account?{' '}
            <a
              href="#"
              className="font-medium text-purple-600 hover:underline"
              onClick={() => navigate('/OwnerLogin')}
            >
              Login
            </a>
          </p>
        </div>
      </div>
    )
    : null;
};

export default OwnerRegister;
