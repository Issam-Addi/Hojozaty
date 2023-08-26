
import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { mdiHumanEdit } from '@mdi/js';
import Swal from 'sweetalert2'
import { mdiShieldCrownOutline } from '@mdi/js'
import { mdiAccountOutline } from '@mdi/js';
import { BsSearch } from "react-icons/bs";

const UsersInfo = () => {

  const [persons, setPersons] = useState([]);
  const [searchTermUsers, setSearchTermUsers] = useState("");
  const [FilterDataUsers, setFilterDataUsers] = useState([]);
  const [HandleP, setHandleP] = useState();

  useEffect(() => {
    axios.get('http://localhost:5000/records')
      .then((response) => {
        setFilterDataUsers(response.data)
        setPersons(response.data);
      })
      .catch((error) => console.log(error.message))
  }, [HandleP]);

  const filterDataByNameUsers = (searchTermUsers) => {
    const filteredDataUsers = persons.filter((item) => item.username.toLowerCase().includes(searchTermUsers.toLowerCase()));
    setFilterDataUsers(filteredDataUsers);
    setCurrentPageUsers(1);
  };

  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  let totalItemsUsers;
  let totalPagesUsers;
  let slicedArrayUsers;
  const itemsPerPage = 3;

  totalItemsUsers = FilterDataUsers.length;
  totalPagesUsers = Math.ceil(totalItemsUsers / itemsPerPage);

  const startIndexUsers = (currentPageUsers - 1) * itemsPerPage;
  const endIndexUsers = startIndexUsers + itemsPerPage;

  slicedArrayUsers = FilterDataUsers.slice(startIndexUsers, endIndexUsers);

  const handlePageChangeUsers = (pageNumber) => {
    setCurrentPageUsers(pageNumber);
  };

  const handleDelete = (id, name) => {
    Swal.fire({
      title: `Do you want to remove ${name}?`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: 'warning'
    }
    ).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(` ${name} has been removed `, '', 'success');
        axios.put('http://localhost:5000/recordss/' + id)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => console.log(error.message))
      } else
        Swal.fire(' Cancelled', '', 'error')
    })
  }

  const handleUpdate = (userid, typeid, name) => {
    let role = typeid == 0 ? "user" : "admin"
    let text1 = ""
    let text2 = ""
    if (role == "user") {
      text1 = `Do you want to switch ${name} to admin`
      text2 = ` ${name} is now an admin `
    } else {
      text1 = `Do you want to switch ${name} to user`
      text2 = ` ${name} is now a user `
    }
    Swal.fire({
      title: text1,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: 'warning'
    }
    ).then((result) => {
      if (result.isConfirmed) {
        axios.put('http://localhost:5000/records/' + userid, { id: typeid,})
          .then(function () {
            setHandleP(HandleP + 1)
          })
          .catch(function (error) {
            console.log(error);
          });
        Swal.fire(text2, '', 'success');
      } else
        Swal.fire(' Cancelled', '', 'error')
    })
  }

  return (
    <>
      <div className="bg-white mr-5 ml-5 p-10">
        <div className="relative flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-black">
            Users Table
          </div>
        </div>

        <form className="relative mt-5">
            <div className="absolute flex items-center ml-2 h-full">
              <BsSearch className="text-amber-600" />
            </div>
            <input
              type="text"
              id="search"
              className="block px-8 py-3 w-1/4 rounded-lg text-amber-600 bg-gray-200 border border-black focus:border-amber-600 focus:ring-0"
              placeholder="Search by username"
              value={searchTermUsers}
              onChange={(e) => {
                setSearchTermUsers(e.target.value);
                filterDataByNameUsers(e.target.value);
              }} />
        </form>

        <div className="mt-8 overflow-x-scroll xl:overflow-hidden">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border-b border-black pb-4 text-start">
                  <p className=" text-black">Name</p>
                </th>
                <th className="border-b border-black pr-28 pb-4 text-start dark:!border-navy-700">
                <p className=" text-black">Email</p>
                </th>
                <th className="border-b border-black pb-4 text-start">
                  <p className=" text-black">Phone</p>
                </th>
                <th className="border-b border-black pb-4 text-start">
                  <p className=" text-black">Role</p>
                </th>
                <th className="border-b border-black pb-4 text-start">
                  <p className=" text-black">Role shift</p>
                </th>
                <th className="border-b border-black pb-4 text-start">
                  <p className=" text-black">Delete</p>
                </th>
              </tr>
            </thead>
            {slicedArrayUsers.map((e) => {
              return (
                <tbody>
                  <tr>
                    <td className="pt-5 pb-6 flex items-center">
                      {e.type_id == 0 ?
                        <div className="h-12 w-12">
                          <img
                            src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                            className="h-full w-full rounded-full"
                            alt="user" />
                        </div>
                        :
                        <div className="h-11 w-11">
                          <img
                            src="data:image/jpeg;base64,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"
                            className="h-full w-full rounded-full"
                            alt="admin" />
                        </div>
                      }
                      <p className="text-black ml-3">
                        {e.username}
                      </p>
                    </td>
                    <td className="pt-5 pb-6">
                      <p className="text-black">
                        {e.email}
                      </p>
                    </td>
                    <td className="pt-5 pb-6">
                      <p className="text-blackS">
                        {e.phone_number}
                      </p>
                    </td>
                    <td className="pt-5 pb-6">
                      <p className="text-black">
                        {e.type_id == 0 ?
                          <div className="w-10 flex flex-col justify-center items-center" >
                            <Icon path={mdiAccountOutline} size={1} />
                            <span>user</span>
                          </div>
                          :
                          <div className="w-10 flex flex-col justify-center items-center">
                            <Icon path={mdiShieldCrownOutline} size={1} />
                            <span>Admin</span>
                          </div>
                        }
                      </p>
                    </td>
                    <td className="pt-5 pb-6">
                      <button onClick={() => handleUpdate(e.userid, e.type_id, e.username)}>
                        {e.type_id == 0 ?
                          <Icon className="text-amber-600" path={mdiHumanEdit} size={1} />
                          :
                          <Icon className="text-amber-600" path={mdiHumanEdit} size={1} />}
                      </button>
                    </td>
                    <td className="pt-5 pb-6">
                      <button onClick={() => handleDelete(e.userid, e.username)}>
                        <Icon color="red" path={mdiDelete} size={1} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <div className="flex w-full justify-center mt-5">
            {
              <Pagination
                count={totalPagesUsers}
                page={currentPageUsers}
                onChange={handlePageChangeUsers} />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersInfo;







