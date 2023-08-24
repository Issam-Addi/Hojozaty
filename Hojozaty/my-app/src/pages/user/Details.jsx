import { Link, useParams } from 'react-router-dom'
import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { UserContext } from '../../UserContext';
import { HashLink } from 'react-router-hash-link'
import { AiOutlineRight } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaUtensils } from "react-icons/fa";

function Details1() {

  const [person, setPerson] = useState([]);
  const user = JSON.parse(localStorage?.getItem('curruntUser'));
  const [restaurantInfo, setRestaurantInfo] = useState({});
  const [restaurantTable, setRestaurantTable] = useState([]);
  const [menuItem, setMenuItem] = useState([]);
  const { restaurant_id } = useParams();
  const tableGuestNumber = restaurantTable[0]?.guest_number;

  useEffect(() => {
    axios.get(`http://localhost:5000/user/${user.userid}`)
      .then((response) => {
        setPerson(response.data);
      })
      .catch((error) => console.log(error.message))

    axios.get(`http://localhost:5000/recordtable/${restaurant_id}`)
      .then((response) => {
        setRestaurantTable(response.data);
      })
      .catch((error) => console.log(error.message))

    axios.get('http://localhost:5000/recordrId/' + restaurant_id)
      .then((response) => {
        setRestaurantInfo(response.data[0]);
      })
      .catch((error) => console.log(error.message))

    axios.get(`http://localhost:5000/menu/${restaurant_id}`)
      .then((response) => {
        setMenuItem(response.data);
      })
      .catch((error) => console.log(error.message))
  }, []);


  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [startingTime, setStartingTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [date, setDate] = useState('')
  const { SignStatus, updateSignStatus } = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/orders', {
      name: name,
      phone: phone,
      email: email,
      tableNumber: tableNumber,
      startingTime: startingTime,
      endTime: endTime,
      date: date,
      userid: person[0].userid,
      restaurant_id: restaurant_id,
      tableGuestNumber: tableGuestNumber
    })
      .then(function () {
        window.location.href = `http://localhost:3000/PaymentPage/${restaurant_id}`
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  let formattedTime;

  function formatTime(t) {
    const timestamp = t;
    const time = timestamp.substring(0, 5);
    const date = new Date(`2000-01-01T${time}:00`);
    formattedTime = date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    return formattedTime;
  }

  return (
    <>
      <div
        className="bg-cover bg-center h-screen"
        style={{ backgroundImage: 'url("https://restaurantengine.com/wp-content/uploads/2015/05/startup-restaurants-typically-overspend.jpg")', height: "400px" }}>
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Details</h1>
            <nav className="text-white mb-8">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <Link to="/" className="text-amber-600 hover:text-white hover:underline transition">
                    Home
                  </Link>
                  <span className="mx-2"><AiOutlineRight /></span>
                </li>
                <li className="flex items-center">
                  <Link to="/ServicePageAll" className="text-amber-600 hover:text-white hover:underline transition">
                    All restaurants
                  </Link>
                  <span className="mx-2"><AiOutlineRight /></span>
                </li>
                <li>Details</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <section className="max-w-screen px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-20 bg-gray-200 mt-5 shadow-lg">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div
            className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <img
              alt={restaurantInfo.restaurant_name}
              src={restaurantInfo.img}
              className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">{restaurantInfo.restaurant_name}</h2>
            <div class="w-20 h-2 bg-amber-500 my-4"></div>
            <h2 className="text-xl font-bold mb-4"><BsFillTelephoneFill className='mr-4 inline-block' />{restaurantInfo.contact_number}</h2>
            <h2 className="text-xl font-bold mb-4"><ImLocation className='mr-4 inline-block' />{restaurantInfo.address}</h2>
            <h2 className="text-xl font-bold mb-4"><FaUtensils className='mr-4 inline-block' />{restaurantInfo.type_food}</h2>
            <p className="mt-4">
              <span className='font-bold text-xl'>Description: </span>{restaurantInfo.des}
            </p>
          </div>
        </div>
      </section>
      <div className="flex flex-wrap items-center gap-4 justify-center">
        {menuItem?.map((item) => {
          return (
            <div className="relative overflow-hidden bg-amber-600 rounded-lg w-60 h-96 shadow-lg">
              <div className="pt-3 px-10 flex items-center justify-center">
                <img
                  className="w-40 h-40 bg-white rounded-full"
                  src={item.item_image}
                  alt={item.item_name} />
              </div>
              <div className="text-white p-4">
                <p className="text-black mb-4">Name: {item.item_name}</p>
                <p className="h-20 overflow-y-scroll mb-4">{item.item_description}</p>
                <p className="bg-white rounded-full w-1/2 flex justify-center items-center text-amber-600 px-3 py-2">
                  {item.item_price} $
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-gray-200 mt-5 shadow-lg pb-10">
        {restaurantTable?.length !== 0 ?
          <>
            <h5 className="uppercase text-center text-4xl pt-10 mb-5 font-bold text-amber-600">
              Available TAbles
            </h5>
            <div className='flex flex-wrap gap-10 justify-center '>
              {restaurantTable?.map((info) => {
                return (
                  <div className="max-w-sm my-5 bg-white border border-black rounded-lg shadow">
                    <div className="rounded-lg overflow-hidden shadow-xl">
                      <div className="relative">
                        <img
                          className="w-64 h-44"
                          src={info.img}
                          alt="table image" />
                        <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-black opacity-25"></div>
                      </div>
                      <div className='p-4'>
                        <div className="flex items-center justify-start">
                          <h3 className="text-black">
                            Table Number:{" "}
                          </h3>
                          <span className="text-black">
                            {info.table_number}
                          </span>
                        </div>
                        <div class="mt-4 flex items-center justify-between">
                          <p class="text-black">
                            available time Time:
                          </p>
                        </div>
                        <div class="mt-4 ml-5">
                          from:{" "}
                          <span className="text-black">
                            {formatTime(info.available_time_start)}
                          </span>
                        </div>
                        <div class="mt-4 ml-5">
                          to:{" "}
                          <span className="text-black">
                            {formatTime(info.available_time_end)}
                          </span>
                        </div>
                        <div class="mt-4 flex items-center justify-between">
                          <p class="text-sm font-medium text-black">
                            Number of guest: {" "}
                            <span className="text-black">
                              {info.guest_number}
                            </span>
                          </p>
                        </div>
                        <button className="px-4 py-2 mt-4 rounded-lg hover:shadow-xl border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition transform hover:-translate-y-1">
                          <HashLink smooth={true} to="#book"
                            onClick={() => {
                              setTableNumber(info?.table_number);
                              setEmail(person[0]?.email);
                            }}>
                            BOOK
                          </HashLink>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
          :
          <h1 className='bg-white uppercase  text-center text-5xl font-bold tracking-tight text-white mt-5 shadow pt-5' style={{ marginTop: "80px" }} >NO available tables</h1>}
        <span id='book'></span>
      </div >
      <div className="py-10 bg-gray-200 my-5 shadow-lg">
        <div className="my-4 px-4 lg:px-20">
          <form onSubmit={handleSubmit} >
            <div className="w-full p-8 my-8 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl bg-white">
              <div className="flex">
                <div className="text-3xl md:text-4xl lg:text-5xl text-amber-600">
                  Book A Table
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                <div>
                  <label htmlFor='Name'>Name <span className='text-red-700 text-xl'>*</span></label>
                  <input
                    required
                    id='Name'
                    className="mt-2 px-4 py-3 w-full rounded-lg text-amber-600 bg-gray-200 border border-black focus:border-amber-600 focus:ring-0"
                    type="text"
                    placeholder="Your name"
                    onChange={(e) => { setName(e.target.value); }} />
                </div>
                <div>
                  <label htmlFor='Phone'>Phone <span className='text-red-700 text-xl'>*</span></label>
                  <input
                    required
                    id='Phone'
                    className="mt-2 px-4 py-3 w-full rounded-lg text-amber-600 bg-gray-200 border border-black focus:border-amber-600 focus:ring-0"
                    type="text"
                    placeholder="Your phone number"
                    onChange={(e) => { setPhone(e.target.value); }} />
                </div>
                <div>
                  <label htmlFor='email'>Email <span className='text-red-700 text-xl'>*</span></label>
                  <input
                    required
                    id='email'
                    className="mt-2 px-4 py-3 w-full rounded-lg text-amber-600 bg-gray-200 border border-black focus:border-amber-600 focus:ring-0"
                    type="text"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); }} />
                </div>
                <div>
                  <label htmlFor='Table_number'>Table number <span className='text-red-700 text-xl'>*</span></label>
                  <input
                    id='Table_number'
                    className="mt-2 px-4 py-3 w-full rounded-lg text-amber-600 bg-gray-200 border border-black focus:border-amber-600 focus:ring-0"
                    type="number"
                    placeholder="Table number"
                    value={tableNumber}
                    onChange={(e) => { setTableNumber(e.target.value); }} />
                </div>
                <div>
                  <label htmlFor="time_start">Starting Booking <span className='text-red-700 text-xl'>*</span></label>
                  <input
                    className="mt-2 px-4 py-3 w-full rounded-lg text-amber-600 bg-gray-200 border border-black focus:border-amber-600 focus:ring-0"
                    type="time"
                    id="time_start"
                    onChange={(e) => { setStartingTime(e.target.value); }} />
                </div>
                <div>
                  <label htmlFor="time_end">End Booking <span className='text-red-700 text-xl'>*</span></label>
                  <input
                    className="mt-2 px-4 py-3 w-full rounded-lg text-amber-600 bg-gray-200 border border-black focus:border-amber-600 focus:ring-0"
                    type="time"
                    id="time_end"
                    onChange={(e) => { setEndTime(e.target.value); }} />
                </div>
                <div>
                  <label htmlFor='date'>Date <span className='text-red-700 text-xl'>*</span></label>
                  <input
                    className="my-2 px-4 py-3 w-full rounded-lg text-amber-600 bg-gray-200 border border-black focus:border-amber-600 focus:ring-0"
                    id="date"
                    type="date"
                    placeholder="First Name*"
                    value={date}
                    onChange={(e) => { setDate(e.target.value); }} />
                </div>
              </div>
              {SignStatus == "signUp" ?
                <Link to="/SignIn">
                  <button type="submit" className="mt-2 px-4 py-2 rounded-lg hover:shadow-xl border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition transform hover:-translate-y-1">
                    Sign in to book!
                  </button>
                </Link>
                :
                <button type="submit" className="mt-2 px-4 py-2 rounded-lg hover:shadow-xl border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition transform hover:-translate-y-1">
                  Book Now
                </button>
              }
            </div>
          </form>
          <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-amber-700 rounded-2xl">
            <div className="flex flex-col text-black">
              <h1 className="font-bold uppercase text-4xl my-4">
                Booking Details
              </h1>
              <p className="text-white">
                Restaurant reservation services provide many advantages and benefits such as ease and convenience without having to
                go to the restaurant in person or wait in line. You can book a table from anywhere and at any time convenient for you
                via phone or online.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Details1
