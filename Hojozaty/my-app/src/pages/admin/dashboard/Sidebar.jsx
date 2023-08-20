import Icon from '@mdi/react';
import { mdiSilverwareForkKnife } from '@mdi/js';
import { mdiAccountMultipleOutline } from '@mdi/js';
import { mdiInformationOutline } from '@mdi/js';
import { UserContext } from '../../../UserContext';
import React, { useContext } from "react";
import { mdiTableFurniture } from '@mdi/js';
import { PresentationChartBarIcon, InboxIcon, PowerIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

export default function Sidebar() {

  const { SignStatus, updateSignStatus } = useContext(UserContext)

  function handleLogOut() {
    Swal.fire({
      title: ` logout?  `,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: 'warning'
    }
    ).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(`  done `, '', 'success');
        updateSignStatus("signUp")
        localStorage.setItem("SignStatus", "signUp")
        localStorage.removeItem("auth");
        localStorage.removeItem("roles");
        window.location.href = 'http://localhost:3000/';
      } else
        Swal.fire(' Cancelled', '', 'error')
    })
  }

  return (
    <aside className="w-full max-w-[20rem] min-h-screen p-4 shadow-xl bg-black">
      <div className="mb-2 p-4 text-amber-600">
        Admin page
      </div>
      <ui>
        <Link to='/'>
          <li className="hover:bg-amber-600 text-white flex py-2.5 rounded-lg">
            <PresentationChartBarIcon className="h-5 w-5 mx-4" />
            Statistics
          </li>
        </Link>
        <Link to='/ListUser'>
          <li className="hover:bg-amber-600 text-white flex px-4 py-2.5 rounded-lg">
            <Icon path={mdiAccountMultipleOutline} size={1} className='mr-4' />
            Users list
          </li>
        </Link>
        <Link to='/ListRestaurant'>
          <li className="hover:bg-amber-600 text-white flex px-4 py-2.5 rounded-lg">
            <Icon path={mdiSilverwareForkKnife} size={1} className='mr-4' />
            Restaurants List
          </li>
        </Link>
        <Link to='/EditAboutContact'>
          <li className="hover:bg-amber-600 text-white flex px-4 py-2.5 rounded-lg">
            <Icon path={mdiInformationOutline} size={1} className='mr-4' />
            Edit About
          </li>
        </Link>
        <Link to='/AcceptTables'>
          <li className="hover:bg-amber-600 text-white flex px-4 py-2.5 rounded-lg">
            <Icon path={mdiTableFurniture} size={1} className='mr-4' />
            Pending Tables
          </li>
        </Link>
        <Link to='/Chat'>
          <li className="hover:bg-amber-600 text-white flex px-4 py-2.5 rounded-lg">
            <InboxIcon className="h-5 w-5 mr-4" />
            Inbox
          </li>
        </Link>
        <button
          className='w-full'
          onClick={handleLogOut}>
          <li className="hover:bg-amber-600 text-white flex px-4 py-2.5 rounded-lg">
            <PowerIcon className="h-5 w-5 mr-4" />
            Log Out
          </li>
        </button>
      </ui>
    </aside>
  );
}