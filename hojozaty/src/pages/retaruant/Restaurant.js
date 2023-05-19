import { TbArrowRightTail } from "react-icons/tb";
const Restaurant = () => {
    return (
        <>
            <div className="relative w-full h-full flex justify-end bg-gradient-to-t from-black via-transparent to-black overflow-hidden">
                {/* :HERO IMAGE */}
                <img src="https://fancytailwind.com/static/f9e0992b36915d2ecac18949d7ba0fdf/24862/walking1.webp" alt="" className="absolute w-full h-full object-cover object-left sm:object-center opacity-70" />
                {/* :HERO MAIN CONTAINER */}
                <div className="relative py-28 xl:py-40 w-full md:w-2/3 lg:w-1/2 h-full flex flex-col justify-center">
                    {/* ::Hero title & text */}
                    <div className="mx-5 md:mx-0 p-8 rounded-xl md:rounded-r-none bg-gray-800 bg-opacity-50 text-white shadow-2xl">
                        <h1 className="text-3xl sm:text-5xl font-josefin font-extrabold">Formidable, <br /><span className="text-yellow-400 text-opacity-80">Fancy Hero 8</span> est <br />Formidable !</h1>
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

            <section className="py-12 bg-white sm:py-16 lg:py-20">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
                        <div className="relative group">
                            <div className="overflow-hidden aspect-w-1 aspect-h-1">
                                <img
                                    className="object-cover w-full h-[10rem] transition-all duration-300 group-hover:scale-125"
                                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-1.png"
                                    alt="producet" />
                            </div>
                            <div className="flex items-start justify-between mt-4 space-x-4">
                                <div>
                                    <h3 className=" font-bold text-gray-900 sm:text-sm md:text-lg">
                                        shawarma<br />
                                        <span className=" text-base font-normal text-gray-600" >Lorem Log loddk
                                            dlksndlk
                                            kldsnldk
                                            kdbal
                                            dfs</span>
                                    </h3>
                                </div>
                                <div className=" text-center">
                                    <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                                        price: <span className=" text-amber-500">$99.00</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Restaurant;