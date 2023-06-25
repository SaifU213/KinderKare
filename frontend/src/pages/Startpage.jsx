import React from 'react';
import { useNavigate } from 'react-router-dom';
// import HOMEPAGE from '../data/HOMEPAGE.png';

const Startpage = ({ location }) => {
  const navigate = useNavigate();

  return (location.pathname === '/startpage' || location.pathname === '/')
    ? (
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-[url('https://storage.googleapis.com/msgsndr/Uj1D6UrVHJKU7MfjEQdt/media/641696581639e02ee47deb23.png')] bg-cover  bg-center ">

        <div className="w-full p-6 m-auto bg-gradient-to-b-30% from-black rounded-md shadow-md lg:max-w-xl h-3/5">

          <form className="mt-6">
            <div className="mt-6">
              <button type="button" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={() => navigate('/ParentLogin')}>
                Parent Login
              </button>
            </div>
            <div className="mt-5">
              <button type="button" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={() => navigate('/ParentRegister')}>
                Parent Signup
              </button>
            </div>
            <div className="mt-6">
              <button type="button" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={() => navigate('/OwnerLogin')}>
                Owner Login
              </button>
            </div>
            <div className="mt-5">
              <button type="button" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={() => navigate('/OwnerRegister')}>
                Owner Signup
              </button>
            </div>
            <div className="mt-5">
              <button type="button" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={() => navigate('/StaffLogin')}>
                Staff Login
              </button>
            </div>
          </form>
        </div>
      </div>
    )
    : null;
};

export default Startpage;
