import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {

    const userLogedIn = JSON.parse(localStorage?.getItem('curruntUser'));

    const [prevOrders, setPrevOrders] = useState([]);
    const [user, setUser] = useState([]);
    useEffect(() => {

        axios.get(`http://localhost:5000/user/${userLogedIn.userid}`)
            .then(function (response) {
                setUser(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get(`http://localhost:5000/oldOrders/${userLogedIn.userid}`)
            .then(function (response) {
                setPrevOrders(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []
    )

    function formatTime(t) {
        const timestamp = t;
        const time = timestamp.substring(0, 5);
        const date = new Date(`2000-01-01T${time}:00`);
        const formattedTime = date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        return formattedTime;
    }

    function formatDate(d) {
        const timestamp = d;
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;

    }

    return (
        <>
            <div className="bg-white mt-16 max-w-screen-xl mx-auto pt-5 px-4">

                <h1 className="text-4xl font-bold leading-tight mb-2 pb-4 relative">
                    <span className="bg-clip-text text-transparent bg-amber-600 uppercase">My Profile</span>
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-600"></span>
                </h1>

                <div className="p-8 bg-gray-200 shadow-xl mt-4">

                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                        </div>
                        <div className="relative">
                            <div className="w-48 h-48 bg-amber-600 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-16 md:-mt-24 flex items-center justify-center">
                                <svg
                                    xmlns="https://source.unsplash.com/MP0IUfwrn0A"
                                    className="h-24 w-24"
                                    viewBox="0 0 20 20"
                                    fill="white">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="mt-28 text-center border-b pt-12">
                        <h1 className="text-4xl font-medium text-black">
                            {user[0]?.username}
                        </h1>
                        <h3 className="font-light text-black mt-3">
                            {user[0]?.email}
                        </h3>
                        <h3 className="mt-1 text-black">
                            {user[0]?.phone_number}
                        </h3>
                        <div className="space-x-8 flex justify-center md:justify-center">
                            <Link to="/EditProfile" className="text-white py-2 px-4 rounded-xl border border-amber-600 bg-amber-600 hover:shadow-xl hover:bg-transparent hover:text-amber-600 transform hover:-translate-y-1 transition">
                                Edit Profile
                            </Link>
                        </div>
                    </div>
                </div>


                <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-2 pb-4 relative">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-600 uppercase">Previous Reservations</span>
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600 to-amber-600"></span>
                </h1>
                <div className="p-8 bg-gray-200 shadow my-4">
                    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 ">

                        <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-10 opacity-50">
                            {prevOrders?.map((order) => {
                                return (
                                    <>
                                        <div className="rounded-lg overflow-hidden shadow-xl">
                                            <div className="relative">
                                                <img
                                                    className="w-full"
                                                    src="https://f.hubspotusercontent20.net/hubfs/3390327/WordPress-Table-Reservation-plugin-1000x562-1.jpg"
                                                    alt="image" />
                                                <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-black opacity-25"></div>
                                                <div className="absolute bottom-0 left-0 bg-amber-600 px-4 py-2 text-white text-sm font-bold">
                                                    {order.status}
                                                </div>
                                                <div className="absolute top-0 right-0 bg-amber-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3">
                                                    <span>Order</span>
                                                    {order.orders_id}
                                                </div>
                                            </div>
                                            <div className="bg-white overflow-hidden max-w-sm mx-auto">
                                                <div className="px-4 py-5 sm:px-6">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-black">
                                                            Table Number
                                                        </h3>
                                                        <p className="text-black">
                                                            {order.table_number}
                                                        </p>
                                                    </div>
                                                    <div class="mt-4 flex items-center justify-between">
                                                        <p class="text-sm font-medium text-black">
                                                            Name: {" "}
                                                            <span className="text-black">
                                                                {order.username}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div class="mt-4 flex items-center justify-between">
                                                        <p class="text-sm font-medium text-black">
                                                        status: {" "}
                                                            <span className="text-green-500">
                                                                {order.status}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div class="mt-4 flex items-center justify-between">
                                                        <p class="text-sm font-medium text-black">
                                                            Phone:{" "}
                                                            <span className="text-black">
                                                                {order.user_phone_number}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div class="mt-4 flex items-center justify-between">
                                                        <p class="text-sm font-medium text-black">
                                                            Email:{" "}
                                                            <span className="text-black">
                                                                {order.user_email}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div class="mt-4 flex items-center justify-between">
                                                        <p class="text-black">
                                                            Order Date: {" "}
                                                            <span className="text-black">
                                                                {formatDate(order.order_date)}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div class="mt-4 flex items-center justify-between">
                                                        <p class="text-black">
                                                            Order Time:
                                                            <span className="text-black">
                                                                {formatTime(order.order_start_time)}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div class="mt-4 flex items-center justify-between">
                                                        <p class="text-black">
                                                            Order Time:
                                                            <span className="text-black">
                                                                {formatTime(order.order_end_time)}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div class="mt-4 flex items-center justify-between">
                                                        <p class="text-sm font-medium text-black">
                                                            Number of guests: {" "}
                                                            <span className="text-black">
                                                                {order.guest_number}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>

                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>

        </>

    )
}

export default ProfilePage