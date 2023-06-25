import React from 'react';

/* Icons for each page */
import { IoMdContacts } from 'react-icons/io';
import { AiFillEdit, AiFillClockCircle } from 'react-icons/ai';
import { TiUserDelete, TiUserAdd } from 'react-icons/ti';
import { FaEdit } from 'react-icons/fa';

export const olinks = [
  {
    title: 'Owner',
    links: [

      {
        Pname: 'employees',
        name: 'employees',
        icon: <IoMdContacts />,
      },
      {
        Pname: 'Parents',
        name: 'parents',
        icon: <IoMdContacts />,
      },
      {
        Pname: 'children',
        name: 'children',
        icon: <IoMdContacts />,
      },
      {
        Pname: 'RegisterStaff',
        name: 'Register Staff',
        icon: <TiUserAdd />,
      },
      {
        Pname: 'OwnerDeletesStaff',
        name: 'Delete Staff Member',
        icon: <TiUserDelete />,
      },
      {
        Pname: 'OwnerDeleteChild',
        name: 'Remove Child From Daycare',
        icon: <TiUserDelete />,
      },
    ],
  },
];

export const plinks = [
  {
    title: 'Parent',
    links: [
      {
        Pname: 'ChildList',
        name: 'List of Your Children',
        icon: <IoMdContacts />,
      },
      {
        Pname: 'RegisterChild',
        name: 'Register Child',
        icon: <TiUserAdd />,
      },
      {
        Pname: 'RegisterToDayCare',
        name: 'Apply Child to Daycare',
        icon: <TiUserAdd />,
      },
      {
        Pname: 'EditChild',
        name: 'Edit Your Child\'s Information',
        icon: <AiFillEdit />,
      },
      {
        Pname: 'ParentDeleteChild',
        name: 'Delete a Child',
        icon: <TiUserDelete />,
      },
    ],
  },
];

export const slinks = [
  {
    title: 'Staff',
    links: [
      {
        Pname: 'ClockInAndOut',
        name: 'Clock in or out Here',
        icon: <AiFillClockCircle />,
      },
      {
        Pname: 'StaffListForChildren',
        name: 'List of Children',
        icon: <IoMdContacts />,
      },
      {
        Pname: 'StaffListForStaff',
        name: 'List of Staff',
        icon: <IoMdContacts />,
      },
      {
        Pname: 'StaffListForParents',
        name: 'List of Parents',
        icon: <IoMdContacts />,
      },
      {
        Pname: 'EditPassword',
        name: 'Change Password',
        icon: <AiFillEdit />,
      },
      {
        Pname: 'StaffReport',
        name: 'Write Report',
        icon: <FaEdit />,
      },
    ],
  },
];
