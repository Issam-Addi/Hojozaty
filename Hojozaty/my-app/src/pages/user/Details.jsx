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
  const [restauranttable, setrestauranttable] = useState([]);
  const [menuItem, setMenuItem] = useState([]);
  const { restaurant_id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/user/${user.userid}`)
      .then((response) => {
        setPerson(response.data);
      })
      .catch((error) => console.log(error.message))

    axios.get(`http://localhost:5000/recordtable/${restaurant_id}`)
      .then((response) => {
        setrestauranttable(response.data);
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


  const [email, setEmail] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const { SignStatus, updateSignStatus } = useContext(UserContext)


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/orders', {
      email: email,
      tableNumber: tableNumber,
      time: time,
      date: date,
      userid: person[0].userid,
      restaurant_id: restaurant_id
    })
      .then(function (response) {
        window.location.href = `http://localhost:3000/PaymentPage/${restaurant_id}`
      })
      .catch(function (error) {
        console.log(error);
      });
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

      <section>
        <div className="max-w-screen px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-20 bg-gray-200 mt-5 shadow-lg">
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
        {restauranttable?.length !== 0 ?
          <>
            <h5 className="uppercase text-center text-4xl pt-10 mb-5 font-bold text-amber-600">
              Available TAbles
            </h5>
            <div className='flex flex-wrap gap-10 justify-center '>
              {restauranttable?.map((info) => {
                return (
                  <div className="max-w-sm my-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <img className="rounded-t-lg" src={info?.img} alt="an image" />
                    <div className="p-5">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-white">
                        Table number {info?.table_number}
                      </h5>
                      <button className="px-4 py-2 rounded-lg hover:shadow-xl border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition transform hover:-translate-y-1">
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
                )
              })}
            </div>
          </>
          :
          <h1 className='bg-white uppercase  text-center text-5xl font-bold tracking-tight text-white mt-5 shadow pt-5' style={{ marginTop: "80px" }} >NO available tables</h1>}
        <span id='book'></span>
      </div>

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
                  <label htmlFor='email'>Email <span className='text-red-700 text-xl'>*</span></label>
                  <input
                    required
                    id='email'
                    className="mt-2 px-4 py-3 w-full rounded-lg text-amber-600 bg-gray-200 border border-black focus:border-amber-600 focus:ring-0"
                    type="text"
                    placeholder="Email"
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
                    onChange={(e) => { setTime(e.target.value); }} />
                </div>
                <div>
                  <label htmlFor="time_end">End Booking <span className='text-red-700 text-xl'>*</span></label>
                  <input
                    className="mt-2 px-4 py-3 w-full rounded-lg text-amber-600 bg-gray-200 border border-black focus:border-amber-600 focus:ring-0"
                    type="time"
                    id="time_end" />
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
