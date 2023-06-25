import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

let x = 0;
const StaffReport = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [childList, setChildren] = useState([]);
  const [owner, setowner] = useState([]);
  const [user, setUser] = useState({
    staffemail: auth[0],
    owneremail: auth[3],
    nameemail: '',
    report: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const getChildList = () => {
    axios.post('http://localhost:9002/stafffindchildren', user).then((res) => {
      setChildren(res.data.message);
    }).catch((error) => console.log(error));
    // console.log(childList)
  };

  if (childList.length == 0) {
    // console.log(Array.isArray(childList))

    // console.log("hello")
    x = 0;
  }

  if (x < 2) {
    getChildList();
  }

  x++;

  const writeReport = () => {
    console.log(user.report);
    axios.post('http://localhost:9002/writereport', user).then((res) => {
      alert('Report Was Made');
      navigate('/StaffListForChildren');
    }).catch((error) => console.log(error));
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl relative flex flex-col justify-center min-h-screen overflow-hidden  bg-[url('https://storage.googleapis.com/msgsndr/Uj1D6UrVHJKU7MfjEQdt/media/641a98261639e0117f805f35.png')] bg-cover  bg-center">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 ">
          Write A Report
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <div htmlFor="countries" className="block mb-2 text-sm font-semibold text-gray-900">Select an option</div>
            <select id="countries" name="nameemail" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-700 focus:border-purple-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}>
              <option value>Pick a Child to Report</option>
              {childList.map((child) => <option key={child} value={child}>{child}</option>)}
            </select>
          </div>
          <div className="mb-2">
            <div
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Write out the report here
            </div>
            <textarea
              type="text"
              name="report"
              className="box-border h-32 w-full Rows5 px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={user.report}
              onChange={handleChange}
            />
          </div>
          <div className="mt-6">
            <button type="button" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={writeReport}>
              Send Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffReport;
