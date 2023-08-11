import React from 'react'
import { Link } from "react-router-dom";
import logo from '../../images/logo.png';
import { ImLocation } from "react-icons/im";
import { IoMdMail } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <>

      <footer className="bg-black text-center lg:text-left w-full">

        <div className='max-w-screen-xl mx-auto sm:px-3'>
          <div className="mx-6 py-10 text-center md:text-left">
            <div className="grid-1 grid gap-8 md:grid-cols-3 lg:grid-cols-3">
              <div>
                <h6 className="mb-4 flex items-center justify-center md:justify-start">
                  <img src={logo} alt="logo" width="200" />
                </h6>
                <p className='text-white'>
                  Book your faviorate restaurant and enjoy 😋
                </p>
              </div>
              <ul>
                <li className="mb-4 flex justify-center font-extrabold uppercase md:justify-start text-white">
                  Quick links
                </li>
                <li className="mb-4">
                  <Link to="/" className="text-white hover:text-amber-600 transition">Home</Link>
                </li>
                <li className="mb-4">
                  <Link to="About" className="text-white hover:text-amber-600 transition">About Us</Link>
                </li>
                <li className="mb-4">
                  <Link to="/ServicePageAll" className="text-white hover:text-amber-600 transition">Restaurants</Link>
                </li>
                <li>
                  <Link to="/ContactUs" className="text-white hover:text-amber-600 transition">Contact</Link>
                </li>
              </ul>
              <ul>
                <li className="mb-4 flex justify-center font-extrabold uppercase md:justify-start text-white">
                  Contact
                </li>
                <li className="mb-4 flex items-center justify-center md:justify-start text-white hover:text-amber-600 transition cursor-default">
                  <ImLocation className='mr-4' />
                  Jordan, Zarqa
                </li>
                <a href="mailto:essam.h.addi@gmail.com">
                  <li className="mb-4 flex items-center justify-center md:justify-start text-white hover:text-amber-600 transition">
                    <IoMdMail className='mr-4' />
                    Essam's Addi email
                  </li>
                </a>
                <a href="tel://+ 962 786 992 500">
                  <li className="mb-4 flex items-center justify-center md:justify-start text-white hover:text-amber-600 transition">
                    <BsFillTelephoneFill className='mr-4' />
                    + 962 786 992 500
                  </li>
                </a>
                <a href="https://www.linkedin.com/in/issam-addi-09148a267/">
                  <li className="flex items-center justify-center md:justify-start text-white hover:text-amber-600 transition">
                    <AiFillLinkedin className='mr-4' />
                    Essam Addi
                  </li>
                </a>
              </ul>
            </div>
          </div>
          <div className="bg-neutral-200 p-6 text-center text-white">
            © 2023 Copyright: <span className="text-amber-600 font-medium">Hojozaty team</span>
          </div>
        </div>
      </footer >


    </>
  )
}

export default Footer