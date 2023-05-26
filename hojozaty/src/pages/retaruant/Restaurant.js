import { TbArrowRightTail } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import menuRestaurant from "../../restaurant_json/menuRestaurant.json";
import restaurant from '../../restaurant_json/Restaurant.json'

const Restaurant = () => {

    const Params = useParams();
    const restaurantInfo = restaurant.filter((item) => item.city === Params.city && item.name === Params.name)


    return (
        <>
            {restaurantInfo.map((item, i) => {
                return (
                    <div className="relative w-full h-full flex justify-end bg-gradient-to-t from-black via-transparent to-black overflow-hidden " key={i}>
                        {/* :HERO IMAGE */}
                        <img src={item.BGimage} alt="" className="absolute w-full object-cover object-left sm:object-center opacity-70" />
                        {/* :HERO MAIN CONTAINER */}
                        <div className="relative py-28 xl:py-40 w-full md:w-2/3 lg:w-1/2 h-full flex flex-col justify-center">
                            {/* ::Hero title & text */}
                            <div className="mx-5 md:mx-0 p-8 rounded-xl md:rounded-r-none bg-gray-800 bg-opacity-50 text-white shadow-2xl">
                                <h1 className="text-3xl sm:text-5xl font-josefin font-extrabold text-yellow-400 text-opacity-80">{item.name}</h1>
                                <p className="mt-3 text-gray-100 font-firacode">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta blanditiis in asperiores optio est, id,
                                    temporibus perspiciatis ratione ipsam quam tempore
                                    aliquam distinctio repudiandae iusto facilis, consequatur eligendi illum quos.</p>
                            </div>
                            {/* ::Hero button */}
                            <Link to="resrvationForm">
                                <button className="relative m-5 w-full md:w-2/3 lg:w-2/5 inline-flex items-center text-2xl font-firacode text-white overflow-hidden transition-all duration-300 transform hover:translate-x-4">
                                    <span className="relative -top-0.5 mr-2">Resrvation</span>
                                    <TbArrowRightTail className="absolute left-32 w-20" />
                                </button>
                            </Link>
                        </div>
                    </div>
                )
            })}


            <section className="py-12 bg-white sm:py-16 lg:py-20">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
                        {menuRestaurant.map((item, i) => {
                            return (
                                <div className="relative group border rounded-lg" key={i}>
                                    <div className="overflow-hidden aspect-w-1 aspect-h-1">
                                        <img
                                            className="object-cover w-full h-[10rem] transition-all duration-300  rounded-lg group-hover:scale-125"
                                            src={item.dishImage}
                                            alt="producet" />
                                    </div>
                                    <div className="flex items-start justify-between mt-4 p-2 space-x-4" k>
                                        <div>
                                            <h3 className=" font-bold text-gray-900 sm:text-sm md:text-lg">
                                                {item.dishName}<br />
                                                <span className=" text-base font-normal text-gray-600" >{item.dishDescription}</span>
                                            </h3>
                                        </div>
                                        <div className=" text-center">
                                            <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                                                price: <span className=" text-amber-500">{item.dishPrice}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>


        </>
    );
}

export default Restaurant;