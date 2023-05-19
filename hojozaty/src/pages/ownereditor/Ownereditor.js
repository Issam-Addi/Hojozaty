const Ownereditor = () => {
    return (
        <>
            <section className="py-14">
                <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
                    <div className="max-w-xl md:mx-auto">
                        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            Build the future with us
                        </h3>
                        <p className="mt-3 text-gray-600">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.
                        </p>
                    </div>
                    <div className="flex gap-3 items-center mt-4 md:justify-center">
                        <button className="inline-block py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow-md hover:shadow-none">
                            Edit hero
                        </button>
                        <button className="inline-block py-2 px-4 text-gray-800 font-medium duration-150 border hover:bg-gray-50 active:bg-gray-100 rounded-lg">
                            Add new item
                        </button>
                    </div>
                </div>
            </section>

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
                            <div className=" flex justify-between my-4">
                                <button className="inline-block py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow-md hover:shadow-none">
                                    Delete
                                </button>
                                <button className="inline-block py-2 px-4 text-gray-800 font-medium duration-150 border hover:bg-gray-50 active:bg-gray-100 rounded-lg">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Ownereditor;