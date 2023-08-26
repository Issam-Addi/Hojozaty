import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Icon from '@mdi/react';
import { mdiAccountMultipleOutline, mdiCashRegister, mdiSilverwareForkKnife, mdiTableFurniture, mdiNotebookEditOutline } from '@mdi/js';

const Statistics = () => {

  const [users, setUsers] = useState([])
  const [restaurant, setRestaurant] = useState([])
  const [payment, setPayment] = useState()
  const [ordersData, setOrdersData] = useState([])
  const [restaurantTables, setRestaurantTables] = useState([])

  const admin = users?.filter((admin) => admin.type_id === 1);
  const user = users?.filter((user) => user.type_id === 0);

  useEffect(() => {

    axios.get('http://localhost:5000/records')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => console.log(error.message))

    axios.get('http://localhost:5000/restaurants')
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((error) => console.log(error.message))

    axios.get('http://localhost:5000/paymentData')
      .then((response) => {
        setPayment(response.data);
      })
      .catch((error) => console.log(error.message))

    axios.get('http://localhost:5000/ordersData')
      .then((response) => {
        setOrdersData(response.data);
      })
      .catch((error) => console.log(error.message))

    axios.get('http://localhost:5000/restaurantTables')
      .then((response) => {
        setRestaurantTables(response.data.restaurantTables);
      })
      .catch((error) => console.log(error.message))

  }, []);

  return (
    <div className="mt-3 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 p-10">

      <div className="relative flex flex-row rounded-lg bg-black flex-grow items-center">
        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
          <div className="rounded-full bg-white p-3">
            <span className="flex items-center">
              <Icon className="text-amber-500" path={mdiCashRegister} size={1} />
            </span>
          </div>
        </div>
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <p className="font-dm text-sm font-medium text-white">Earnings</p>
          <h4 className="text-xl font-bold text-amber-500 dark:text-white">
            $ {payment * 5}
          </h4>
        </div>
      </div>

      <div className="relative flex flex-row rounded-lg bg-black flex-grow items-center">
        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
          <div className="rounded-full bg-white p-3">
            <span className="flex items-center">
              <Icon className="text-amber-500" path={mdiAccountMultipleOutline} size={1} />
            </span>
          </div>
        </div>
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <p className="font-dm text-sm font-medium text-white">
            Total Users
          </p>
          <h4 className="text-xl font-bold text-amber-500 dark:text-white">
            {user.length}
          </h4>
        </div>
      </div>

      <div className="relative flex flex-row rounded-lg bg-black flex-grow items-center">
        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
          <div className="rounded-full bg-white p-3">
            <span className="flex items-center">
              <Icon className="text-amber-500" path={mdiSilverwareForkKnife} size={1} />
            </span>
          </div>
        </div>
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <p className="font-dm text-sm font-medium text-white">Total Restaurants</p>
          <h4 className="text-xl font-bold text-amber-500 dark:text-white">
            {restaurant.length}
          </h4>
        </div>
      </div>

      <div className="relative flex flex-row rounded-lg bg-black flex-grow items-center">
        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
          <div className="rounded-full bg-white p-3">
            <span className="flex items-center">
              <Icon className="text-amber-500" path={mdiTableFurniture} size={1} />
            </span>
          </div>
        </div>
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <p className="font-dm text-sm font-medium text-white">Total tables</p>
          <h4 className="text-xl font-bold text-amber-500 dark:text-white">
            {restaurantTables.length}
          </h4>
        </div>
      </div>

      <div className="relative flex flex-row rounded-lg bg-black flex-grow items-center">
        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
          <div className="rounded-full bg-white p-3">
            <span className="flex items-center">
              <Icon className="text-amber-500" path={mdiNotebookEditOutline} size={1} />
            </span>
          </div>
        </div>
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <p className="font-dm text-sm font-medium text-white">Total orders</p>
          <h4 className="text-xl font-bold text-amber-500 dark:text-white">
            {ordersData.length}
          </h4>
        </div>
      </div>

      <div className="relative flex flex-row rounded-lg bg-black flex-grow items-center">
        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
          <div className="rounded-full bg-white p-3">
            <span className="flex items-center">
              <Icon className="text-amber-500" path={mdiAccountMultipleOutline} size={1} />
            </span>
          </div>
        </div>
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <p className="font-dm text-sm font-medium text-white">
            Total admin
          </p>
          <h4 className="text-xl font-bold text-amber-500 dark:text-white">
          {admin.length}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
