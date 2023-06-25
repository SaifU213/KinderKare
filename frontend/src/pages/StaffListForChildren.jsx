import React, { useEffect, useState } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import axios from 'axios';
import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';
import useAuth from '../hooks/useAuth';

const x = 0;

const StaffListForChildren = () => {
  const toolbarOptions = ['Search'];

  const { auth } = useAuth();
  const [childrenList, setChildren] = useState([]);
  const [hasChildren, checkChildren] = useState(false);
  const [ownersemail, checkEmail] = useState();
  const editing = { allowDeleting: true, allowEditing: true };
  const [user, setUser] = useState({
    staffemail: auth[0],
    email: '',
    child: [],
  });
  const handleChange = (e) => {
    if (childrenList != []) {
      axios.post('http://localhost:9002/getstaff', user).then((res) => {
        checkEmail(res.data.message);
      }).catch((error) => console.log(error));

      user.email = ownersemail;
      axios.post('http://localhost:9002/childcheckOwner', user).then((res) => {
        checkChildren(res.data.message);
      }).catch((error) => console.log(error));

      if (hasChildren != false) {
        user.child = hasChildren;
        axios.post('http://localhost:9002/childlistOwner', user).then((res) => {
          setChildren(res.data.message);
        }).catch((error) => console.log(error));
      }
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl bg-[url('https://storage.googleapis.com/msgsndr/Uj1D6UrVHJKU7MfjEQdt/media/641a98261639e0117f805f35.png')] bg-cover  bg-center">
      <div className="mt-6">
        <button type="button" className="w-half px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={handleChange}>
          Show List of Children
        </button>
      </div>
      <Header title="Children" />
      <GridComponent
        dataSource={childrenList}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >

        <Inject services={[Search, Page]} />

      </GridComponent>
    </div>
  );
};
export default StaffListForChildren;
