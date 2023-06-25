import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import useAuth from '../hooks/useAuth';
import { olinks, plinks, slinks } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import Icon from '../data/Icon.png';

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const { auth } = useAuth();
  const currentColor = '#7E22CE';
  let link = plinks;

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  if (auth[1] === 'Parent') {
    link = plinks;
  }
  if (auth[1] === 'Owner') {
    link = olinks;
  }
  if (auth[1] === 'Staff') {
    link = slinks;
  }
  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 hover:bg-light-gray m-2';
  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex items-center align-middle justify-center mt-5 ">
            <div className="justify-center text-center">
              <Link to="/" onClick={handleCloseSideBar}>
                <img
                  className="rounded-full h-32 w-32"
                  src={Icon}
                />
                <span className="font-sans text-xl">KinderKare</span>
              </Link>
            </div>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-5">
            {link.map((item) => (
              <div key={item.title}>
                <p className="text-purple-700 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.Pname}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
