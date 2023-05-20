import React from 'react'
// import { Link } from 'react-router-dom';
import { TbArrowRightTail } from "react-icons/tb";
import BG from '../../image/BG.png';
import restaurant from '../../restaurant_json/Restaurant.json'
const Zarqa = () => {
    const zarqaRestaurant = restaurant.filter((item) => item.location.includes('Zarqa'))
    return (
        <>
            <div className="relative w-full h-full flex justify-end bg-gradient-to-t from-black via-transparent to-black overflow-hidden">
                {/* :HERO IMAGE */}
                <img src={BG} alt="" className="absolute w-full h-full object-cover object-left sm:object-center opacity-70" />
                {/* :HERO MAIN CONTAINER */}
                <div className="relative py-28 xl:py-40 w-full md:w-2/3 lg:w-1/2 h-full flex flex-col justify-center">
                    {/* ::Hero title & text */}
                    <div className="mx-5 md:mx-0 p-8 rounded-xl md:rounded-r-none bg-gray-800 bg-opacity-50 text-white shadow-2xl">
                        <h1 className="text-3xl sm:text-5xl font-josefin font-extrabold">Zarqa , <br /><span className="text-yellow-400 text-opacity-80">Fancy Hero 8</span> est <br />Formidable !</h1>
                        <p className="mt-3 text-gray-100 font-firacode">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta blanditiis in asperiores optio est, id,
                            temporibus perspiciatis ratione ipsam quam tempore
                            aliquam distinctio repudiandae iusto facilis, consequatur eligendi illum quos.</p>
                    </div>
                    {/* ::Hero button */}
                    <button className="relative m-5 w-full md:w-2/3 lg:w-2/5 inline-flex items-center text-2xl font-firacode text-white overflow-hidden transition-all duration-300 transform hover:translate-x-4">
                        <span className="relative -top-0.5 mr-2">Explore</span>
                        <TbArrowRightTail className="absolute left-32 w-20" />
                    </button>
                </div>
            </div>

            <div className=" mb-[10rem] px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="grid gap-6 row-gap-5 lg:grid-cols-3">
                    {
                        zarqaRestaurant.map((item, i) => {
                            return (
                                <div className="border rounded-xl" key={i} >
                                    <img className="object-cover w-full h-64 mb-6 rounded-xl shadow-lg lg:h-80 xl:h-96"
                                        src={item.image}
                                        alt={item.alt} />
                                    <h5 className="mb-2 ml-2 text-xl font-bold leading-none sm:text-2xl">
                                        {item.name}
                                    </h5>
                                    <p className="text-gray-700 text-lg font-medium ml-2">
                                        hint of restaurant:
                                        <br /><span className=' text-sm'>location: {item.location}</span><br />
                                        <span className=' text-sm'>Working hours: {item.from} - {item.to}</span><br />
                                        <span className=' text-sm'>{item.family ? ("Has a family lounge") : ("Does not have a family lounge")}</span><br />
                                    </p>
                                    {/* <Link to="signin"> */}
                                    <button
                                        className="group my-8 relative w-44 mx-auto flex items-center justify-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500">
                                        <span className="absolute -end-full transition-all group-hover:end-4">
                                            <TbArrowRightTail />
                                        </span>
                                        {/* <Link to="restaurant"> */}
                                        <span className="text-sm font-medium transition-all group-hover:me-4">
                                            Resrvation
                                        </span>
                                        {/* </Link> */}
                                    </button>
                                    {/* </Link> */}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Zarqa;