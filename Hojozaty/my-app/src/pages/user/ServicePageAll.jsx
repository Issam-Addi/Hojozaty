import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { FaUtensils, FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineRight } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

const ServicePageAll = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [FilterDataUsers, setFilterDataUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/restaurantsAll")
      .then((response) => {
        setRestaurants(response.data);
        setFilterDataUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [yourSelectedStateValueType, setOptionType] = useState("");
  const [yourSelectedStateValueAddress, setOptionAddress] = useState("");
  const [currentPageUsers, setCurrentPageUsers] = useState(1);

  const filterDataByNameUsers = (searchTermUsers) => {
    const filteredDataUsers = restaurants?.filter((item) =>
      item.restaurant_name.toLowerCase().includes(searchTermUsers.toLowerCase())
    );
    setFilterDataUsers(filteredDataUsers);
    setCurrentPageUsers(1);
  };

  function handleFind() {
    const filteredDataUsers = restaurants?.filter((item) =>
      item.type_food?.toLowerCase().includes(yourSelectedStateValueType.toLowerCase()) &&
      item.address?.toLowerCase().includes(yourSelectedStateValueAddress.toLowerCase()));
    setFilterDataUsers(filteredDataUsers);
  }

  let totalItemsUsers;
  let totalPagesUsers;
  let slicedArrayUsers;
  const itemsPerPage = 6;

  totalItemsUsers = FilterDataUsers.length;
  totalPagesUsers = Math.ceil(totalItemsUsers / itemsPerPage);

  const startIndexUsers = (currentPageUsers - 1) * itemsPerPage;
  const endIndexUsers = startIndexUsers + itemsPerPage;

  slicedArrayUsers = FilterDataUsers.slice(startIndexUsers, endIndexUsers);

  const handlePageChangeUsers = (pageNumber) => {
    setCurrentPageUsers(pageNumber);
  };

  return (
    <>
      <div
        className="bg-cover bg-center h-screen mt-16"
        style={{ backgroundImage: 'url("https://zipinventory.com/assets/images/collections/10-restaurant-service-models-1607720498-5934-800-e549f94cb.webp")', height: "400px" }}>
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Restaurants</h1>
            <nav className="text-white mb-8">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <Link to="/" className="text-amber-500 hover:text-white hover:underline transition">
                    Home
                  </Link>
                  <span className="mx-2"><AiOutlineRight /></span>
                </li>
                <li>Restaurants</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-5 bg-gray-200 shadow-xl py-16">
        <div className="w-full sm:w-11/12 md:w-5/6 lg:w-2/3 xl:w-1/2 mx-auto py-10 px-4 rounded-lg bg-white border border-black">
          <div className="relative">
            <div className="absolute flex items-center ml-2 h-full">
              <BsSearch className=" text-amber-500" />
            </div>
            <input
              type="text"
              placeholder="Search by name, location"
              className="px-8 py-3 w-full rounded-lg text-amber-500 bg-gray-200 border border-black focus:border-amber-500 focus:ring-0"
              onChange={(e) => { filterDataByNameUsers(e.target.value); }} />
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between mt-6 md:mb-2">
            <p className="font-medium">Filters</p>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 xl:grid-cols-2 mt-4 md:mt-0">
              <select className=" text-amber-500 px-4 py-3 w-full md:w-60 rounded-lg bg-gray-200 border border-black focus:border-amber-500 focus:ring-0"
                onChange={(e) => setOptionType(e.target.value)}>
                <option value="">All Type</option>
                <option value="arabian">arabian</option>
                <option value="italian">italian</option>
                <option value="asian">asian</option>
                <option value="mexican">mexican</option>
                <option value="indian">indian</option>
                <option value="american">american</option>
              </select>
              <select className="text-amber-500 px-4 py-3 w-full md:w-60 rounded-lg bg-gray-200 border border-black focus:border-amber-500 focus:ring-0"
                onChange={(e) => setOptionAddress(e.target.value)}>
                <option value="">All Addresses</option>
                <option value="amman">amman</option>
                <option value="zarqa">zarqa</option>
                <option value="balqa">balqa</option>
                <option value="madaba">madaba</option>
                <option value="karak">karak</option>
                <option value="tafilah">tafilah</option>
                <option value="ma'an">ma'an</option>
                <option value="aqaba">aqaba</option>
                <option value="mafraq">mafraq</option>
                <option value="jerash">jerash</option>
                <option value="ajloun">ajloun</option>
                <option value="irbid">irbid</option>
              </select>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                className="w-20 h-10 bg-transparent px-4 py-2 text-amber-500 rounded-lg border border-amber-500 hover:bg-amber-500 hover:text-white transition transform hover:-translate-y-1 hover:shadow-xl"
                onClick={handleFind}>
                Find
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 shadow-xl py-10 mb-5">
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl uppercase leading-normal font-bold tracking-tight text-amber-500">
            Restaurants
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5 max-w-screen-xl mx-auto px-6">
          {slicedArrayUsers?.map((restaurant) => {
            return (
              <div key={restaurant.restaurant_id} className="bg-white shadow-xl rounded-lg p-6 space-y-4">
                <img className="w-full h-48 rounded-lg" src={restaurant.img} alt={restaurant.restaurant_name} />
                <div>
                  <h2 className="text-black font-semibold text-xl">
                    Name: {restaurant.restaurant_name}
                  </h2>
                  <p className="text-lg mt-4">
                    Description:
                  </p>
                  <p className="text-sm h-20 overflow-y-scroll pr-3 mt-2">
                    {restaurant.des}
                  </p>
                  <div className="flex items-center justify-between mt-4 font-semibold text-sm border-b border-black pb-3">
                    <span className="flex justify-between items-center">
                      <FaMapMarkerAlt className="mr-2" />
                      {restaurant.address}
                    </span>
                    <span className="flex justify-between items-center select-none">
                      <FaUtensils className="mx-2" />
                      Food Type: {restaurant.type_food}
                    </span>
                  </div>
                  <div className="flex justify-center mt-3 items-center">
                    <Link to={`/Details/${restaurant.restaurant_id}`}>
                    <button className="w-full bg-transparent px-4 py-2 text-amber-500 rounded-lg border border-amber-500 hover:bg-amber-500 hover:text-white transition transform hover:-translate-y-1 hover:shadow-xl">
                      View Details
                    </button>
                        </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {restaurants.length >= 6 &&
        <div className="flex w-full justify-center mt-5 bg-[#f8f8f8] mb-5">
          {
            <Pagination
              color="warning"
              count={totalPagesUsers}
              page={currentPageUsers}
              onChange={handlePageChangeUsers} />
          }
        </div>}
    </>
  );
};

export default ServicePageAll;