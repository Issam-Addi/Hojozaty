import Icon from '@mdi/react';
import { mdiDelete } from "@mdi/js";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Pagination from "@mui/material/Pagination";
import { BsSearch } from "react-icons/bs";

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [FilterDataRestaurants, setFilterDataRestaurants] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/restaurants')
      .then((response) => {
        setRestaurants(response.data);
        setFilterDataRestaurants(response.data)
      })
      .catch((error) => console.log(error.message))
  }, []);

  const filterDataByNameRestaurants = (searchTermRestaurants) => {
    const filteredDataRestaurants = restaurants.filter(item => item.restaurant_name.toLowerCase().includes(searchTermRestaurants.toLowerCase()));
    setFilterDataRestaurants(filteredDataRestaurants);
    setCurrentPageRestaurants(1)
  }

  const [currentPageRestaurants, setCurrentPageRestaurants] = useState(1);
  let totalItemsRestaurants;
  let totalPagesRestaurants;
  let slicedArrayRestaurants;
  const itemsPerPage = 3;

  totalItemsRestaurants = FilterDataRestaurants.length;
  totalPagesRestaurants = Math.ceil(totalItemsRestaurants / itemsPerPage);

  const startIndexRestaurants = (currentPageRestaurants - 1) * itemsPerPage;
  const endIndexRestaurants = startIndexRestaurants + itemsPerPage;

  slicedArrayRestaurants = FilterDataRestaurants.slice(startIndexRestaurants, endIndexRestaurants);

  const handlePageChangeRestaurants = (pageNumber) => {
    setCurrentPageRestaurants(pageNumber);
  };

  const handleDelete = (name, userid) => {
    Swal.fire({
      title: ` Do you want to remove ${name}?  `,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: 'warning'
    }
    ).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(` ${name} has been removed `, '', 'success');
        axios.put('http://localhost:5000/restaurants/' + userid)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => console.log(error.message))
      } else
        Swal.fire(' Cancelled', '', 'error')
    })
  }

  function addrestaurants() {
    axios.post('http://localhost:5000/restaurants', { email: email })
  }

  return (
    <>
      <div className='bg-white mx-5 p-10'>
        <form>
          <div className="relative">
            <label htmlFor="email">
              Add new restaurants
              <span className='text-red-700 text-xl'>*</span>
            </label>
            <input
              type="email"
              id="email"
              name='email'
              className="block px-4 py-3 w-1/2 mt-4 rounded-lg text-amber-600 bg-gray-200 border border-black focus:border-amber-600 focus:ring-0"
              placeholder="Add new restaurants"
              required
              onChange={(e) => { setEmail(e.target.value); }} />
            <button
              onClick={() => addrestaurants()}
              type="submit"
              className="absolute right-2.5 -bottom-10 px-4 py-2.5 rounded-lg hover:shadow-xl border mb-10 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition transform hover:-translate-y-1">
              Add
            </button>
          </div>
        </form>
        <div className="relative flex items-center justify-between mt-5 pb-2 text-black">
          Restaurants
        </div>

        <form className="relative">
        <div className="absolute flex items-center ml-2 h-full">
              <BsSearch className="text-amber-600" />
            </div>
            <input
              type="text"
              id="search"
              className="block px-8 py-3 w-1/2 rounded-lg text-amber-600 bg-gray-200 border border-black focus:border-amber-600 focus:ring-0"
              placeholder="Search by name"
              onChange={(e) => { filterDataByNameRestaurants(e.target.value); }} />
        </form>

        <div className="mt-8 overflow-x-scroll xl:overflow-hidden">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border-b border-black pb-4 text-start">
                  <p className=" text-black">NAME</p>
                </th>
                <th className="border-b border-black pb-4 text-start">
                  <p className=" text-black">EMAIL</p>
                </th>
                <th className="border-b border-black pb-4 text-start">
                  <p className=" text-black">PHONE</p>
                </th>
                <th className="border-b border-black pb-4 text-start">
                  <p className=" text-black">LOCATION</p>
                </th>
                <th className="border-b border-black pb-4 text-start">
                  <p className=" text-black">DELETE</p>
                </th>
              </tr>
            </thead>
            {slicedArrayRestaurants.map((e) => {
              return (
                <tbody>
                  <tr>
                    <td className="pt-5 pb-6 flex items-center">
                      <div className="h-11 w-11">
                        <img
                          src="https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-restaurant.png"
                          className="h-full w-full rounded-full"
                          alt="admin" />
                      </div>
                      <p className="text-black ml-3">
                        {e.restaurant_name}
                      </p>
                    </td>
                    <td className="pt-5 pb-6">
                      <p className="text-black">
                        {e.email}
                      </p>
                    </td>
                    <td className="pt-5 pb-6">
                      <p className="text-blackS">
                        {e.contact_number}
                      </p>
                    </td>
                    <td className="pt-5 pb-6">
                      <p className="text-blackS">
                        {e.address}
                      </p>
                    </td>
                    <td className="pt-5 pb-6">
                      <button onClick={() => handleDelete(e.restaurant_name, e.user_id)}>
                        <Icon color="red" path={mdiDelete} size={1} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <div className='flex w-full justify-center mt-5'>
            {(
              <Pagination
                count={totalPagesRestaurants}
                page={currentPageRestaurants}
                onChange={handlePageChangeRestaurants}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantsList;