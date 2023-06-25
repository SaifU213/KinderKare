import React, { useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const ClockInAndOut = () => {
  const { auth } = useAuth();

  const [user, setUser] = useState({
    email: auth[0],
    time: '',
  });

  const clockin = () => {
    user.time = Date.now();
    axios.post('http://localhost:9002/clockin', user).then((res) => {
      alert("You've Clocked In");
    }).catch((error) => console.log(error));
  };
  const clockout = () => {
    user.time = Date.now();
    axios.post('http://localhost:9002/clockout', user).then((res) => {
      alert("You've Clocked Out");
    }).catch((error) => console.log(error));
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl relative flex flex-col justify-center min-h-screen overflow-hidden bg-[url('https://storage.googleapis.com/msgsndr/Uj1D6UrVHJKU7MfjEQdt/media/641a98261639e0117f805f35.png')] bg-cover  bg-center">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 " id="text">
          Clock In and Clock Out
        </h1>
        <form className="mt-6">
          <div className="mt-6">
            <button id="1" type="button" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={clockin}>
              Clock In
            </button>
          </div>
          <div className="mt-6">
            <button id="1" type="button" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={clockout}>
              Clock Out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClockInAndOut;
