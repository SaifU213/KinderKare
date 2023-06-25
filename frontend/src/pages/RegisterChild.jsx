import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const ChildRegister = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [user, setUser] = useState({
    name: '',
    parent: auth[2],
    parentemail: auth[0],
    medical: '',
    diatery: '',
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
    const { name, parentemail, parent, medical, diatery } = user;
    console.log(user);
    if (name && parentemail && parent && medical && diatery) {
      axios.post('http://localhost:9002/childregister', user).then((res) => {
        alert(res.data.message);
        navigate('/ChildList');
      }).catch((error) => console.log(error));
    } else {
      alert('invlid input');
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl relative flex flex-col justify-center min-h-screen overflow-hidden bg-[url('https://storage.googleapis.com/msgsndr/Uj1D6UrVHJKU7MfjEQdt/media/641a98261639e0117f805f35.png')] bg-cover  bg-center">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 ">
          Register Your Child
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <div
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Your Child's Name
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
              htmlFor="text"
              className="block text-sm font-semibold text-gray-800"
            >
              Please provide important medical information about you child
            </div>
            <textarea
              type="text"
              name="medical"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={user.medical}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <div
              htmlFor="text"
              className="block text-sm font-semibold text-gray-800"
            >
              Please provide important diatery restrictions you child has
            </div>
            <textarea
              type="text"
              name="diatery"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={user.diatery}
              onChange={handleChange}
            />
          </div>
          <div className="mt-6">
            <button type="button" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={register}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChildRegister;
