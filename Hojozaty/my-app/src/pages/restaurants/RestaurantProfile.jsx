import React, { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { useParams } from 'react-router-dom'
import useFetch from "../../components/CustomHook/useFetch";
import { AiOutlineClose } from "react-icons/ai";
import { MdMenuBook, MdAssignmentAdd } from "react-icons/md";
import axios from 'axios';
import Swal from 'sweetalert2'

const RestaurantProfile = () => {

  const { id } = useParams();

  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [foodType, setFoodType] = useState("");
  const [des, setDes] = useState("");
  const [password, setPassword] = useState("");
  const [base64code, setbase64code] = useState("");
  const [foodImg, setFoodImg] = useState("");

  const onChange = e => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file);
  };

  const onLoad = fileString => {
    setbase64code(fileString);
  };

  const getBase64 = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  const onChange2 = e => {
    const files = e.target.files;
    const file = files[0];
    getBase64_2(file);
  };

  const onLoad2 = fileString => {
    setFoodImg(fileString);
  };

  const getBase64_2 = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad2(reader.result);
    };
  };

  const [choise, setChoise] = useState("profile");
  const [status, setStatus] = useState("pending");
  const [edit, setEdit] = useState(false);
  const [search, setSearch] = useState("");
  const { error, data: restaurant } = useFetch(`http://localhost:5000/restaurant/${id}`);
  const { isPending: order_pending, data: restaurant_orders } = useFetch(`http://localhost:5000/orders/${id}`);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateRes = { restaurant_name: restaurantName, address: address, contact_number: contact, type_food: foodType, des: des, img: base64code, food_image: foodImg, password: password };
    axios.put('http://localhost:5000/restaurant/' + id, updateRes)
      .then(function () {
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [email, setEmail] = useState("");

  let formattedTime;
  let formattedDate;

  function formatTime(t) {
    if (!order_pending) {
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
  }

  function formatDate(d) {
    if (!order_pending) {
      const timestamp = d;
      const date = new Date(timestamp);
      formattedDate = date.toLocaleDateString();
      return formattedDate;
    }
  }

  const subject = "Reservation confirmed!";
  const body = "Your reservation has been confirmed. Please, Enjoy Your Meal. Thank you for your Reservation."

  const addEmail = async (id) => {
    await axios.get(`http://localhost:5000/orderedEmail/${id}`, { timeout: 5000 })
      .then((response) => {
        setEmail(response.data[0].email);
        window.location.href = `mailto:${response.data[0].email}?subject=${subject}&body=${body}`;
      }).catch(error => {
        console.log(error.message)
      });
    window.location.reload(false);
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemImage, setItemImage] = useState("");

  const item_image = e => {
    const files = e.target.files;
    const file = files[0];
    getBase64_3(file);
  };

  const getBase64_3 = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad3(reader.result);
    };
  };

  const onLoad3 = fileString => {
    setItemImage(fileString);
  };

  const handleSubmitItemMenu = (event) => {
    event.preventDefault();
    const newItem = { itemName, itemPrice, itemDescription, itemImage, id };
    Swal.fire({
      title: ` Are you sure you want to add this item`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: 'warning'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('http://localhost:5000/menu', newItem)
        Swal.fire({
          position: "center",
          icon: "success",
          title:
            "Your item has been added",
        });
        setItemName("")
        setItemPrice("")
        setItemDescription("")
        setItemImage("")
      } else {
        Swal.fire(' Cancelled', '', 'error')
        setItemName("")
        setItemPrice("")
        setItemDescription("")
        setItemImage("")
      }
    })
  }

  const [menuItem, setMenuItem] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/menu/${id}`)
      .then((response) => {
        setMenuItem(response.data);
      })
      .catch((error) => console.log(error.message))
  }, []);

  return (
    <>
      <div className="relative top-20">
        <button
          onClick={toggleSidebar}
          aria-expanded={sidebarOpen}
          type="button"
          className="inline-flex items-center p-2 mt-2 ml-3 sm:hidden hover:text-amber-500 transition">
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
            </path>
          </svg>
        </button>
        {restaurant !== null &&
          <aside className={`fixed top-[4.45rem] left-0 z-10 sm:w-64 w-52 h-screen bg-black px-3 py-4 overflow-y-auto ${sidebarOpen ? 'translate-x-0' : 'sm:translate-x-0 -translate-x-full'}`}>
            <ul className="space-y-2 font-medium">
              <li className="flex-1 ml-3 whitespace-nowrap text-amber-500 font-bold uppercase">
                {restaurant[0].restaurant_name}
              </li>
              <li
                onClick={() => { setChoise("profile"); }}
                className="flex items-center p-2 text-white rounded-lg hover:bg-amber-500 cursor-pointer">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-white transition duration-75"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
              </li>
              <li
                onClick={() => { setChoise("reservation"); }}
                className="flex items-center p-2 text-white rounded-lg hover:bg-amber-500 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-ui-checks"
                  viewBox="0 0 16 16">
                  <path d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708l-2 2zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708l-2 2zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Reservations</span>
              </li>
              <li
                onClick={() => { setChoise("menu"); }}
                className="flex items-center p-2 text-white rounded-lg hover:bg-amber-500 cursor-pointer">
                <MdMenuBook className="h-6 w-6" />
                <span className="flex-1 ml-3 whitespace-nowrap">Menu</span>
              </li>
              <li
                onClick={() => { setChoise("add_menu"); }}
                className="flex items-center p-2 text-white rounded-lg hover:bg-amber-500 cursor-pointer">
                <MdAssignmentAdd className="h-6 w-6" />
                <span className="flex-1 ml-3 whitespace-nowrap">Add to menu</span>
              </li>
              <li>
                <HashLink
                  smooth="true"
                  to="/"
                  className="flex items-center p-2 text-white rounded-lg hover:bg-amber-500">
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-white transition duration-75 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Go home page</span>
                </HashLink>
              </li>
              <li
                className="flex items-center p-2 text-white rounded-lg hover:bg-amber-500 sm:hidden"
                onClick={toggleSidebar}>
                <AiOutlineClose className="h-6 w-6" />
                <span className="flex-1 ml-3 whitespace-nowrap">Close</span>
              </li>
            </ul>
          </aside>
        }
      </div>

      <div className="p-4 sm:ml-64 mt-24">
        <div className="p-4 border-2 border-black border-dashed bg-white rounded-lg">

          {choise === "profile" && (
            <>
              <h1 class="text-2xl md:text-3xl pl-2 my-10 border-l-4 text-black mt-10  font-sans font-bold border-amber-500 ">
                RESTAURANT PROFILE
              </h1>
              {restaurant !== null &&
                <>
                  <div
                    style={{
                      background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${restaurant[0].img}) no-repeat center`,
                      backgroundSize: "cover",
                      backgroundColor: "black"
                    }}
                    className="py-52 px-1 md:px-8 text-center relative text-white font-bold text-2xl md:text-3xl overflow-auto rounded">
                    <h1 className="pb-4 uppercase text-5xl">{restaurant[0].restaurant_name}</h1>
                  </div>
                  <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
                    <div className="w-full lg:w-3/5 rounded-lg shadow-2xl bg-amber-500 mx-6 lg:mx-0">
                      <div className="p-4 md:p-12 text-center lg:text-left">
                        <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center">
                          <img
                            src={restaurant[0].food_image}
                            alt={restaurant[0].food_image}
                            className="rounded-full w-48 h-48" />
                        </div>
                        <h1 className="text-3xl font-bold pt-8 lg:pt-0 text-white">
                          Restaurant Details
                        </h1>
                        <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-white" />
                        <p className="pt-4 text-white flex items-center justify-center lg:justify-start">
                          <svg
                            className="h-4 fill-current text-white pr-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20">
                            <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                          </svg>
                          Food Type - {restaurant[0].type_food}
                        </p>
                        <p className="pt-4 text-white  flex items-start justify-start lg:justify-start">
                          <svg
                            className="h-4 fill-current text-white pr-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20">
                            <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
                          </svg>
                          Your Address - {restaurant[0].address}
                        </p>
                        <p className="pt-4 text-white  flex items-start justify-start lg:justify-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-telephone text-white  mr-3"
                            viewBox="0 0 20 20">
                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                          </svg>
                          Contact Phone:  {restaurant[0].contact_number}
                        </p>
                        <p className="pt-4 text-white  flex items-start justify-start lg:justify-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-body-text mr-3"
                            viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5Zm0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Z" />
                          </svg>
                          Description:
                        </p>
                        <p className="pt-2 text-white text-start sm:text-xs md:text-sm flex items-start justify-start lg:justify-start">
                          {restaurant[0].des}
                        </p>
                        <div className="pt-12 pb-8">
                          <HashLink
                            smooth="true"
                            to="#edit">
                            <button
                              onClick={() => {
                                setEdit(!edit);
                                setRestaurantName(restaurant[0].restaurant_name);
                                setAddress(restaurant[0].address);
                                setContact(restaurant[0].contact_number);
                                setFoodType(restaurant[0].type_food);
                                setDes(restaurant[0].des);
                                setbase64code(restaurant[0].img);
                                setFoodImg(restaurant[0].food_image);
                              }}
                              className="py-2 px-3 bg-white rounded-lg text-amber-500 border-2 border-white hover:bg-transparent hover:text-white hover:shadow-2xl transform hover:-translate-y-1 transition">
                              Edit Profile
                            </button>
                          </HashLink>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-2/5">
                      <img
                        src={restaurant[0].food_image}
                        className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" />
                    </div>
                  </div>
                </>}
              {edit &&
                (
                  <>
                    <h1
                      class="text-2xl md:text-3xl pl-2 border-l-4 text-black border-amber-500"
                      id="edit">
                      EDIT PROFILE
                    </h1>
                    <div className="flex justify-center mt-20 px-8">
                      <form
                        className="max-w-2xl bg-white border border-black rounded-lg shadow-xl"
                        onSubmit={handleSubmit}>
                        <div className="flex flex-wrap border shadow rounded-lg p-3">
                          <h2 className="text-xl pb-2 text-amber-500">
                            Restuarant Details
                          </h2>
                          <div className="flex flex-col gap-2 w-full">
                            <div>
                              <label
                                htmlFor="restaurantName"
                                className="text-black">
                                Restaurant name
                              </label>
                              <input
                                required
                                id="restaurantName"
                                className="w-full py-3 px-3 my-2 rounded-lg text-amber-500 bg-gray-200 border border-black focus:border-amber-500 focus:ring-0"
                                type="text"
                                value={restaurantName}
                                onChange={(e) => setRestaurantName(e.target.value)} />
                            </div>
                            <div>
                              <label
                                htmlFor="password"
                                className="text-black">
                                Password
                              </label>
                              <input
                                required
                                id="password"
                                className="w-full py-3 px-3 my-2 rounded-lg text-amber-500 bg-gray-200 border border-black focus:border-amber-500 focus:ring-0"
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                              <label
                                htmlFor="address"
                                className="text-black">
                                Address
                              </label>
                              <input
                                required
                                id="address"
                                className="w-full py-3 px-3 my-2 rounded-lg text-amber-500 bg-gray-200 border border-black focus:border-amber-500 focus:ring-0"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div>
                              <label
                                htmlFor="contactNumber"
                                className="text-black">
                                Contact number
                              </label>
                              <input
                                required
                                id="contactNumber"
                                className="w-full py-3 px-3 my-2 rounded-lg text-amber-500 bg-gray-200 border border-black focus:border-amber-500 focus:ring-0"
                                type="text"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)} />
                            </div>
                            <div>
                              <label
                                htmlFor="foodType"
                                className="text-black">
                                Food type
                              </label>
                              <select
                                required
                                id="foodType"
                                className="w-full py-3 px-3 my-2 rounded-lg text-amber-500 bg-gray-200 border border-black focus:border-amber-500 focus:ring-0"
                                onChange={(e) => { setFoodType(e.target.value) }}>
                                <option value="none">select</option>
                                <option value="arabian">Arabian</option>
                                <option value="italian">Italian</option>
                                <option value="asian">Asian</option>
                                <option value="mexican">Mexican</option>
                                <option value="indian">Indian</option>
                                <option value="american">American</option>
                              </select>
                            </div>
                            <div>
                              <label
                                htmlFor="decription"
                                className="text-black">
                                Decription
                              </label>
                              <textarea
                                id="decription"
                                required
                                rows={6}
                                className="w-full py-3 px-3 my-2 rounded-lg text-amber-500 bg-gray-200 border border-black focus:border-amber-500 focus:ring-0"
                                type="text"
                                value={des}
                                onChange={(e) => setDes(e.target.value)} />
                            </div>
                            <div>
                              <label
                                htmlFor="restaurantImageURL"
                                className="text-black">
                                Restaurant Image URL
                              </label>
                              <input
                                id="restaurantImageURL"
                                className="w-full py-3 px-7 my-2 rounded-lg text-amber-500 bg-gray-200 border border-black focus:border-amber-500 focus:ring-0"
                                type="file"
                                onChange={(e) => onChange(e)}
                                accept="image/*" />
                            </div>
                            <div>
                              <label
                                className="text-black"
                                htmlFor="foodImageURL">
                                Food Image URL
                              </label>
                              <input
                                id="foodImageURL"
                                className="w-full py-3 px-7 my-2 rounded-lg text-amber-500 bg-gray-200 border border-black focus:border-amber-500 focus:ring-0"
                                type="file"
                                onChange={(e) => { onChange2(e) }}
                                accept="image/*" />
                            </div>
                            <div className="flex justify-center">
                              <button
                                className="bg-amber-500 border-amber-500 rounded-lg hover:text-black border p-3 text-white transition hover:bg-transparent transform hover:-translate-y-1 hover:shadow-xl"
                                type="submit">
                                Save changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </>
                )}
            </>
          )}

          {choise === "reservation" && (
            <>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="text-2xl">
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-black sr-only ">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-amber-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full p-4 pl-10 rounded-lg text-amber-500 bg-gray-200 border border-black focus:border-amber-500 focus:ring-0"
                      placeholder="Search by Table Number"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)} />
                  </div>
                </div>
              </div>
              <h1 class="text-2xl md:text-3xl pl-2 border-l-4 text-black mt-10 border-amber-500">
                RESRVATIONS
              </h1>
              <div className="flex flex-wrap items-start justify-start p-10 py-10">
                <button
                  className="px-4 py-2.5 rounded-lg hover:shadow-xl border mb-10 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition transform hover:-translate-y-1"
                  onClick={() => { setStatus("pending"); }}>
                  Pending Orders
                </button>
                <button
                  className="px-4 py-2.5 rounded-lg mx-4 hover:shadow-xl border mb-10 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition transform hover:-translate-y-1"
                  onClick={() => { setStatus("confirmed"); }}>
                  Confirmed Orders
                </button>
                <button
                  className="px-4 py-2.5 rounded-lg hover:shadow-xl border mb-10 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition transform hover:-translate-y-1"
                  onClick={() => { setStatus("completed"); }}>
                  Completed Orders
                </button>
              </div>

              {restaurant_orders !== null &&
                <>
                  {status === "pending" &&
                    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
                      <h1 className="lg:text-4xl mb-2 pb-4 relative sm:text-xl text-amber-500">
                        Pending orders
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-500"></span>
                      </h1>
                      {restaurant_orders.length !== 0 &&
                        <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-10">
                          {restaurant_orders.filter((order) => {
                            return search === '' ? order : order.table_number.includes(search)
                          }).map((order) => {
                            if (order.status === 'pending') {
                              return <div className="rounded-lg overflow-hidden shadow-xl">
                                <div className="relative">
                                  <img
                                    className="w-full"
                                    src="https://f.hubspotusercontent20.net/hubfs/3390327/WordPress-Table-Reservation-plugin-1000x562-1.jpg"
                                    alt="image" />
                                  <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-black opacity-25"></div>
                                  <div className="absolute bottom-0 left-0 bg-amber-500 px-4 py-2 text-white text-sm font-bold">
                                    {order.status}
                                  </div>
                                  <div className="absolute top-0 right-0 bg-amber-500 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3">
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
                                        Client name: {" "}
                                        <span className="text-black">
                                          {order.username}
                                        </span>
                                      </p>
                                    </div>
                                    <div class="mt-4 flex items-center justify-between">
                                      <p class="text-sm font-medium text-black">
                                        Client phone:{" "}
                                        <span className="text-black">
                                          {order.user_phone_number}
                                        </span>
                                      </p>
                                    </div>
                                    <div class="mt-4 flex items-center justify-between">
                                      <p class="text-sm font-medium text-black">
                                        Client email:{" "}
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
                                    <button
                                      className="px-4 py-2.5 mt-4 rounded-lg hover:shadow-xl border mb-10 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition transform hover:-translate-y-1"
                                      onClick={() => {
                                        axios.put(`http://localhost:5000/orders/${order.orders_id}`, { status: "confirmed", })
                                          .then(() => {
                                            axios.put(`http://localhost:5000/tableStatus/${order.table_number}`, { status: "busy" })
                                              .catch(() => { console.log(error.message) })
                                          })
                                        addEmail(order.user_id);
                                      }}>
                                      Confirm
                                    </button>
                                  </div>
                                </div>
                              </div>
                            }
                          })}
                        </div>}
                    </div>
                  }
                </>
              }

              {restaurant_orders !== null &&
                <>
                  {status === "confirmed" &&
                    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
                      <h1 className="lg:text-4xl mb-2 pb-4 relative sm:text-xl text-amber-500">
                        Confirmed Orders
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-500"></span>
                      </h1>
                      {restaurant_orders.length !== 0 &&
                        <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-10">
                          {restaurant_orders.filter((order) => {
                            return search === '' ? order : order.table_number.includes(search)
                          }).map((order) => {
                            if (order.status === 'confirmed') {
                              return <div className="rounded-lg overflow-hidden shadow-xl">
                                <div className="relative">
                                  <img
                                    className="w-full"
                                    src="https://f.hubspotusercontent20.net/hubfs/3390327/WordPress-Table-Reservation-plugin-1000x562-1.jpg"
                                    alt="image" />
                                  <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-black opacity-25"></div>
                                  <div className="absolute bottom-0 left-0 bg-amber-500 px-4 py-2 text-white text-sm font-bold">
                                    {order.status}
                                  </div>
                                  <div className="absolute top-0 right-0 bg-amber-500 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3">
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
                                        Client name: {" "}
                                        <span className="text-black">
                                          {order.username}
                                        </span>
                                      </p>
                                    </div>
                                    <div class="mt-4 flex items-center justify-between">
                                      <p class="text-sm font-medium text-black">
                                        Client phone:{" "}
                                        <span className="text-black">
                                          {order.user_phone_number}
                                        </span>
                                      </p>
                                    </div>
                                    <div class="mt-4 flex items-center justify-between">
                                      <p class="text-sm font-medium text-black">
                                        Client email:{" "}
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
                                    <button
                                      className="px-4 py-2.5 mt-4 rounded-lg hover:shadow-xl border mb-10 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition transform hover:-translate-y-1"
                                      onClick={() => {
                                        axios.put(`http://localhost:5000/orders/${order.orders_id}`, { status: "completed" })
                                          .then(() => {
                                            axios.put(`http://localhost:5000/tableStatus/${order.table_number}`, { status: "available" })
                                              .catch(() => { console.log(error.message) })
                                            window.location.reload();
                                          })
                                      }}>
                                      Completed
                                    </button>
                                  </div>
                                </div>
                              </div>
                            }
                          })}
                        </div>}
                    </div>
                  }
                </>
              }

              {restaurant_orders !== null &&
                <>
                  {status === "completed" &&
                    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
                      <h1 className="lg:text-4xl mb-2 pb-4 relative sm:text-xl text-amber-500">
                        Completed Orders
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-500"></span>
                      </h1>
                      {restaurant_orders.length !== 0 &&
                        <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-10">
                          {restaurant_orders.filter((order) => {
                            return search === '' ? order : order.table_number.includes(search)
                          }).map((order) => {
                            if (order.status === 'completed') {
                              return <div className="rounded-lg overflow-hidden shadow-xl">
                                <div className="relative">
                                  <img
                                    className="w-full"
                                    src="https://f.hubspotusercontent20.net/hubfs/3390327/WordPress-Table-Reservation-plugin-1000x562-1.jpg"
                                    alt="image" />
                                  <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-black opacity-25"></div>
                                  <div className="absolute bottom-0 left-0 bg-amber-500 px-4 py-2 text-white text-sm font-bold">
                                    {order.status}
                                  </div>
                                  <div className="absolute top-0 right-0 bg-amber-500 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3">
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
                                        Client name: {" "}
                                        <span className="text-black">
                                          {order.username}
                                        </span>
                                      </p>
                                    </div>
                                    <div class="mt-4 flex items-center justify-between">
                                      <p class="text-sm font-medium text-black">
                                        Client phone:{" "}
                                        <span className="text-black">
                                          {order.user_phone_number}
                                        </span>
                                      </p>
                                    </div>
                                    <div class="mt-4 flex items-center justify-between">
                                      <p class="text-sm font-medium text-black">
                                        Client email:{" "}
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
                            }
                          })}
                        </div>}
                    </div>
                  }
                </>
              }
            </>
          )}

          {choise === "menu" && (
            <>
              <h1 class="text-2xl md:text-3xl pl-2 my-10 border-l-4 text-black mt-10  font-sans font-bold border-amber-500 ">
                RESTAURANT MENU
              </h1>
              <div className="flex flex-wrap items-center gap-4 justify-center">
                {menuItem?.map((item) => {
                  return (
                    <div className="relative overflow-hidden bg-amber-500 rounded-lg w-60 h-96 shadow-lg">
                      <div className="pt-3 px-10 flex items-center justify-center">
                        <img
                          className="w-40 h-40 bg-white rounded-full"
                          src={item.item_image}
                          alt={item.item_name} />
                      </div>
                      <div className="text-white p-4">
                        <p className="text-black mb-4">Name: {item.item_name}</p>
                        <p className="h-20 overflow-y-scroll mb-4">{item.item_description}</p>
                        <p className="bg-white rounded-full w-1/2 flex justify-center items-center text-amber-500 px-3 py-2">
                          {item.item_price} $
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {choise === "add_menu" && (
            <>
              <h1 class="text-2xl md:text-3xl pl-2 my-10 border-l-4 text-black mt-10  font-sans font-bold border-amber-500 ">
                Add item to menu
              </h1>
              <div className="flex justify-center mt-20 px-8">
                <form
                  onSubmit={handleSubmitItemMenu}
                  className="max-w-2xl bg-white border border-black rounded-lg shadow-xl">
                  <div className="flex flex-wrap border shadow rounded-lg p-3">
                    <h2 className="text-xl pb-2 text-amber-500">
                      New item
                    </h2>
                    <div className="flex flex-col gap-2 w-full">
                      <div>
                        <label
                          htmlFor="Item_name"
                          className="text-black">
                          Item name
                        </label>
                        <input
                          required
                          id="Item_name"
                          className="w-full py-3 px-3 my-2 rounded-lg text-amber-500 bg-gray-200 border border-black focus:border-amber-500 focus:ring-0"
                          type="text"
                          onChange={(e) => setItemName(e.target.value)} />
                      </div>
                      <div>
                        <label
                          htmlFor="Item_price"
                          className="text-black">
                          Item price
                        </label>
                        <input
                          required
                          id="Item_price"
                          className="w-full py-3 px-3 my-2 rounded-lg text-amber-500 bg-gray-200 border border-black focus:border-amber-500 focus:ring-0"
                          type="number"
                          min={1}
                          onChange={(e) => setItemPrice(e.target.value)} />
                      </div>
                      <div>
                        <label
                          htmlFor="Item_description"
                          className="text-black">
                          Item description
                        </label>
                        <input
                          required
                          id="Item_description"
                          className="w-full py-3 px-3 my-2 rounded-lg text-amber-500 bg-gray-200 border border-black focus:border-amber-500 focus:ring-0"
                          type="text"
                          onChange={(e) => setItemDescription(e.target.value)} />
                      </div>
                      <div>
                        <label
                          htmlFor="Item_image"
                          className="text-black">
                          Item Image
                        </label>
                        <input
                          required
                          id="Item_image"
                          className="w-full py-3 px-7 my-2 rounded-lg text-amber-500 bg-gray-200 border border-black focus:border-amber-500 focus:ring-0"
                          type="file"
                          accept="image/*"
                          onChange={(e) => item_image(e)} />
                      </div>
                      <div className="flex justify-center">
                        <button
                          className="bg-amber-500 border-amber-500 rounded-lg hover:text-black border p-3 text-white transition hover:bg-transparent transform hover:-translate-y-1 hover:shadow-xl"
                          type="submit">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
};

export default RestaurantProfile;
