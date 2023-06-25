import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

let x = 0;
const ParentDeleteChild = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [childList, setChildren] = useState([]);

  const [user, setUser] = useState({
    parentemail: auth[0],
    childsname: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const getChildList = () => {
    // console.log(user)
    axios.post('http://localhost:9002/findchildren', user).then((res) => {
      setChildren(res.data.message);
    }).catch((error) => console.log(error));
  };
  if (childList.length == 0) {
    if (childList) {
      x = 0;
    }
  }

  const deleteChild = () => {
    console.log(user.childsname);
    axios.post('http://localhost:9002/deletechild', user).then((res) => {
      alert('Child was Deleted');
      navigate('/ChildList');
    }).catch((error) => console.log(error));
  };
  if (x < 2) {
    getChildList();
  }

  x++;
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-[url('https://storage.googleapis.com/msgsndr/Uj1D6UrVHJKU7MfjEQdt/media/641a98261639e0117f805f35.png')] bg-cover  bg-center">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 ">
          Pick Child To Delete
        </h1>
        <form className="mt-6">

          <div htmlFor="countries" className="block mb-2 text-sm font-semibold text-gray-900">Select an option</div>
          <select id="countries" name="childsname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}>
            <option value>Pick a child to delete</option>
            {childList.map((child) => <option key={child} value={child}>{child}</option>)}
          </select>
          <div className="mt-6">
            <button type="button" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={deleteChild}>
              Delete Child
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParentDeleteChild;
