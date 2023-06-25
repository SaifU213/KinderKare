import React, { useState } from 'react';
import { GridComponent, Inject, Search, Page } from '@syncfusion/ej2-react-grids';
import axios from 'axios';
import { Header } from '../components';
import useAuth from '../hooks/useAuth';

const Children = () => {
  const toolbarOptions = ['Search'];

  const { auth } = useAuth();
  const [children, setChildren] = useState([]);
  const [hasChildren, checkChildren] = useState([]);
  const childrenList = [];
  const editing = { allowDeleting: true, allowEditing: true };
  const [user, setUser] = useState({
    email: auth[0],
    child: [],
  });

  const handleChange = (e) => {
    axios.post('http://localhost:9002/childcheckOwner', user).then((res) => {
      checkChildren(res.data.message);
    }).catch((error) => console.log(error));

    user.child = hasChildren;
    if (user.child.length > 0) {
      axios.post('http://localhost:9002/childlistOwner', user).then((res) => {
        setChildren(res.data.message);
      }).catch((error) => console.log(error));
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl bg-[url('https://storage.googleapis.com/msgsndr/Uj1D6UrVHJKU7MfjEQdt/media/641a98261639e0117f805f35.png')] bg-cover bg-center">
      <div className="mt-6">
        <button type="button" className="w-half px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={handleChange}>
          Show List of Children
        </button>
      </div>
      <Header title="Children" />
      <GridComponent
        dataSource={children}
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
export default Children;
