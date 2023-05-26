import { TbArrowRightTail } from "react-icons/tb";
import BG from '../../image/BG.png';
const About = () => {
    return (
        <>
            <div className="relative w-full h-full flex justify-end bg-gradient-to-t from-black via-transparent to-black overflow-hidden">
                {/* :HERO IMAGE */}
                <img src={BG} alt="" className="absolute w-full h-full object-cover object-left sm:object-center opacity-70" />
                {/* :HERO MAIN CONTAINER */}
                <div className="relative py-28 xl:py-40 w-full md:w-2/3 lg:w-1/2 h-full flex flex-col justify-center">
                    {/* ::Hero title & text */}
                    <div className="mx-5 md:mx-0 p-8 rounded-xl md:rounded-r-none bg-gray-800 bg-opacity-50 text-white shadow-2xl">
                        <h1 className="text-3xl sm:text-5xl font-josefin font-extrabold text-yellow-400 text-opacity-80">hey there, welcome to Hojozaty </h1>
                        <p className="mt-3 text-gray-100 font-firacode">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta blanditiis in asperiores optio est, id,
                            temporibus perspiciatis ratione ipsam quam tempore
                            aliquam distinctio repudiandae iusto facilis, consequatur eligendi illum quos.</p>
                    </div>
                </div>
            </div>


            <section className=" bg-gray-200">
                <div className="container flex flex-col items-center px-4 py-12 mx-auto xl:flex-row">
                    <div className="flex justify-center xl:w-1/2">
                        <img className="h-80 w-80 sm:w-[28rem] sm:h-[28rem] flex-shrink-0 object-cover rounded-full"
                            src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
                            alt="" />
                    </div>
                    <div className="flex flex-col items-center mt-6 xl:items-start xl:w-1/2 xl:mt-0">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Download our free mobile app
                        </h2>
                        <p className="block max-w-2xl mt-4">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut corporis
                            esse dolorum, illum, consectetur earum provident alias dolore omnis quis
                            tempore voluptatum excepturi ea numquam? Aperiam fugiat consequuntur
                            nostrum odio.{" "}
                        </p>
                    </div>
                </div>
            </section>

            {/* Snippet */}
            <section className="flex flex-col justify-center antialiased bg-gray-100 text-gray-200 min-h-screen">
                <div className="max-w-6xl mx-auto p-4 sm:px-6 h-full">
                    {/* Blog post */}
                    <article className="max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
                        <div className="relative block group">
                            <div
                                className="absolute inset-0 bg-gray-800 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none"
                                aria-hidden="true" />
                            <figure className="relative h-0 pb-[56.25%] md:pb-[75%] lg:pb-[56.25%] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out">
                                <img className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out"
                                    src="https://preview.cruip.com/open-pro/images/blog-post-01.jpg"
                                    width={540}
                                    height={303}
                                    alt="Blog post"/>
                            </figure>
                        </div>
                        <div>
                            <header>
                                <div className="mb-3">
                                    <ul className="flex flex-wrap text-xs font-medium -m-1">
                                        <li className="m-1 inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out cursor-default">
                                            Product
                                        </li>
                                        <li className="m-1 inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out cursor-default">
                                            Engineering
                                        </li>
                                    </ul>
                                </div>
                                <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-2">
                                    <p className="hover:text-gray-100 transition duration-150 ease-in-out">
                                        Designing a functional workflow at home.
                                    </p>
                                </h3>
                            </header>
                            <p className="text-lg text-gray-400 flex-grow">
                                Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat.
                            </p>
                            <footer className="flex items-center mt-4">
                                    <img className="rounded-full flex-shrink-0 mr-4"
                                        src="https://preview.cruip.com/open-pro/images/news-author-04.jpg"
                                        width={40}
                                        height={40}
                                        alt="Author 04"
                                    />
                                <div>
                                    <p className="font-medium text-gray-200 hover:text-gray-100 transition duration-150 ease-in-out" >
                                        Chris Solerieu
                                    </p>
                                    <span className="text-gray-500">Jan 19, 2020</span>
                                </div>
                            </footer>
                        </div>
                    </article>
                </div>
            </section>
        </>

    );
}

export default About;