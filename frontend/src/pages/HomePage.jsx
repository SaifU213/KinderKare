import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from '../components';
// eslint-disable-next-line import/no-cycle
import { Startpage, ParentLogin, ParentRegister, OwnerLogin, OwnerRegister, StaffLogin, RegisterChild, RegisterStaff, AddChildToDayCare, Employees, Parents, Children, ParentListForChildren, StaffListForChildren, EditChild, StaffListForStaff, StaffListForParents, EditStaff, ClockInAndOut, OwnerDeletesStaff, OwnerDeleteChild, ParentDeleteChild, StaffReport } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import RequireAuth from '../contexts/RequireAuth';

function HomePage() {
  const [user, setLoginUser] = useState({});
  const { activeMenu } = useStateContext();
  const location = useLocation();
  return (location.pathname !== '/ParentRegister' || location.pathname !== '/ParentLogin' || location.pathname !== '/OwnerLogin' || location.pathname !== '/StaffLogin' || location.pathname !== '/OwnerRegister' || location.pathname !== '/')
    ? (
      <div>
        <div>
          <div style={{ display: 'flex', position: 'relative' }}>
            {activeMenu ? (
              <div className="sidebar" style={{ width: '18rem', position: 'fixed', backgroundColor: 'white' }}>
                <Sidebar />
              </div>
            ) : (
              <div style={{ width: '0%' }}>
                <Sidebar />
              </div>
            )}
            <div
              className={
              activeMenu
                ? 'bg-main-bg min-h-screen md:ml-72 w-full'
                : 'bg-main-bg min-h-screen flex-2 w-full'
            }
            >
              {/* className="fixed md:static bg-main-bg" */}
              <div className="nav-box" style={{ position: 'static', backgroundColor: 'rgb(250 251 251)', justifyContent: 'space-between' }}>
                <Navbar />
              </div>
              <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<Startpage />)} />
                <Route path="/ParentLogin" element={(<ParentLogin setLoginUser={setLoginUser} />)} />
                <Route path="/ParentRegister" element={(<ParentRegister />)} />
                <Route path="/OwnerLogin" element={(<OwnerLogin setLoginUser={setLoginUser} />)} />
                <Route path="/OwnerRegister" element={(<OwnerRegister />)} />
                <Route path="/StaffLogin" element={(<StaffLogin setLoginUser={setLoginUser} />)} />

                {/* Parent  */}
                <Route element={<RequireAuth requireRole={['Parent']} />}>
                  <Route path="/ChildList" element={(<ParentListForChildren />)} />
                  <Route path="/RegisterChild" element={(<RegisterChild />)} />
                  <Route path="/RegisterToDayCare" element={(<AddChildToDayCare />)} />
                  {/* <Route path="/DayCareCalendar" element={(<DayCareCalendar />)} /> */}
                  <Route path="/EditChild" element={(<EditChild />)} />
                  <Route path="/ParentDeleteChild" element={(<ParentDeleteChild />)} />
                </Route>

                {/* Owner */}
                <Route element={<RequireAuth requireRole={['Owner']} />}>
                  <Route path="/RegisterStaff" element={(<RegisterStaff />)} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/Parents" element={<Parents />} />
                  <Route path="/Children" element={<Children />} />
                  <Route path="/OwnerDeletesStaff" element={<OwnerDeletesStaff />} />
                  <Route path="/OwnerDeleteChild" element={<OwnerDeleteChild />} />
                </Route>

                {/* Staff */}
                <Route element={<RequireAuth requireRole={['Staff']} />}>
                  <Route path="/ClockInAndOut" element={(<ClockInAndOut />)} />
                  <Route path="/StaffListForChildren" element={(<StaffListForChildren />)} />
                  <Route path="/StaffListForStaff" element={(<StaffListForStaff />)} />
                  <Route path="/StaffListForParents" element={(<StaffListForParents />)} />
                  <Route path="/EditPassword" element={(<EditStaff />)} />
                  <Route path="/StaffReport" element={(<StaffReport />)} />
                </Route>
              </Routes>
              <Footer />
            </div>

          </div>
        </div>
      </div>
    )
    : null;
}

export default HomePage;
