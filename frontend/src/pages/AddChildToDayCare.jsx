import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

let x = 0;
const AddChildToDayCare = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [childList, setChildren] = useState([]);

  const [user, setUser] = useState({
    parentemail: auth[0],
    daycarename: '',
    ownersemail: '',
    childsname: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const getChildrenList = () => {
    // console.log(user)
    axios.post('http://localhost:9002/findchildren', user).then((res) => {
      console.log(res.data.message);
      setChildren(res.data.message);
    }).catch((error) => console.log(error));
    console.log(childList);
  };
  if (childList.length === 0) {
    if (childList) {
      x = 0;
    }
  }

  const addToDaycare = () => {
    const { parentemail, daycarename, ownersemail, childsname } = user;
    if (daycarename && parentemail && ownersemail && childsname) {
      axios.post('http://localhost:9002/childToDaycare', user).then((res) => {
        alert('Child was added');
        console.log(res.message);
        navigate('/ChildList');
      }).catch((error) => console.log(error));
    } else {
      alert('invlid input');
    }
  };
  if (x < 2) {
    getChildrenList();
  }

  console.log(x);
  x++;
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl relative flex flex-col justify-center min-h-screen overflow-hidden bg-[url('https://storage.googleapis.com/msgsndr/Uj1D6UrVHJKU7MfjEQdt/media/641a98261639e0117f805f35.png')] bg-cover  bg-center">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 ">
          Add Your Child To A Daycare
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <div
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Daycare Name
            </div>
            <input
              type="name"
              name="daycarename"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={user.daycarename}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <div
              htmlFor="text"
              className="block text-sm font-semibold text-gray-800"
            >
              Daycare Owners Email
            </div>
            <input
              type="text"
              name="ownersemail"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={user.ownersemail}
              onChange={handleChange}
            />
          </div>
          <div htmlFor="countries" className="block mb-2 text-sm font-semibold text-gray-900">Select an option</div>
          <select id="countries" name="childsname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}>
            <option value>Pick a child to add</option>
            {childList.map((child) => <option key={child} value={child}>{child}</option>)}
          </select>
          <div className="mt-6">
            <button type="button" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={addToDaycare}>
              Add Child
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChildToDayCare;
