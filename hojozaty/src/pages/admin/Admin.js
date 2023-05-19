import { TbArrowRightTail } from "react-icons/tb";
const Admin = () => {
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
                        <span className="relative -top-0.5 mr-2">Edit site</span>
                        <TbArrowRightTail className="absolute left-32 w-20" />
                    </button>
                </div>
            </div>

            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                        <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
                            <img
                                alt="Party"
                                src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
                                className="absolute rounded-xl inset-0 h-full w-full object-cover" />
                        </div>
                        <div className="lg:py-16">
                            <article className="space-y-4 text-gray-600">
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui
                                    hic atque tenetur quis eius quos ea neque sunt, accusantium soluta
                                    minus veniam tempora deserunt? Molestiae eius quidem quam repellat.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum
                                    explicabo quidem voluptatum voluptas illo accusantium ipsam quis,
                                    vel mollitia? Vel provident culpa dignissimos possimus, perferendis
                                    consectetur odit accusantium dolorem amet voluptates aliquid,
                                    ducimus tempore incidunt quas. Veritatis molestias tempora
                                    distinctio voluptates sint! Itaque quasi corrupti, sequi quo odit
                                    illum impedit!
                                </p>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
            <div className=" mb-[10rem] px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="grid gap-6 row-gap-5 lg:grid-cols-3">
                    <div className="border rounded-xl">
                        <img className="object-cover w-full h-64 mb-6 rounded-xl shadow-lg lg:h-80 xl:h-96"
                            src="https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500"
                            alt="" />
                        <h5 className="mb-2 ml-2 text-xl font-bold leading-none sm:text-2xl">
                            A slice of heaven
                        </h5>
                        <p className="text-gray-700 ml-2">
                            O for awesome, this chocka full cuzzie is as rip-off as a cracker.
                            Meanwhile, in behind the bicycle shed, Hercules Morse.
                        </p>
                        <div className="mx-2 flex items-center justify-between flex-wrap">

                            <button
                                className="group my-2 relative w-44 overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500">
                                <span className="absolute -end-full transition-all group-hover:end-4">
                                    <TbArrowRightTail className="mt-1"/>
                                </span>
                                <span className="text-sm font-medium transition-all group-hover:me-4">
                                    Show
                                </span>
                            </button>

                            <button
                                className="group my-2 relative w-44 overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500">
                                <span className="absolute -end-full transition-all group-hover:end-4">
                                    <TbArrowRightTail className="mt-1"/>
                                </span>
                                <span className="text-sm font-medium transition-all group-hover:me-4">
                                    Delete
                                </span>
                            </button>

                            <button
                                className="group my-2 relative w-44 overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500">
                                <span className="absolute -end-full transition-all group-hover:end-4">
                                    <TbArrowRightTail className="mt-1"/>
                                </span>
                                <span className="text-sm font-medium transition-all group-hover:me-4">
                                    Update
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div></>
    );
}

export default Admin;