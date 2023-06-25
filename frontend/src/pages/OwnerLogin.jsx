import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const OwnerLogin = ({ setLoginUser }) => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios.post('http://localhost:9002/ownerlogin', user).then((res) => {
      if (res.data.message === 'User not registered ' || res.data.message === 'Information entered was incorrect') {
        alert(res.data.message);
      } else {
        const emails = res?.data?.user.email;
        const names = res?.data?.user.name;
			  const roles = res?.data?.user.role;
			  setAuth([emails, roles, names]);
        setLoginUser(res.data.user);
			  navigate('/RegisterStaff');
      }
    });
  };

  return (location.pathname === '/OwnerLogin')
    ? (
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-[url('https://storage.googleapis.com/msgsndr/Uj1D6UrVHJKU7MfjEQdt/media/64169a031639e05dba7debb7.png')] bg-cover  bg-center">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 ">
            Sign In
          </h1>
          <form className="mt-6">
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
            <div className="mt-6">
              <button type="button" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={login}>
                Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {' '}
            Don't have an account?{' '}
            <a
              href="#"
              className="font-medium text-purple-600 hover:underline"
              onClick={() => navigate('/OwnerRegister')}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    )
    : null;
};

export default OwnerLogin;
