import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const Profiles = () => {

    const [user, setUser] = useState([{ username: "mais", email: "mais@mais.com", phone_number: "123456789" }])

    return (
        <>
            <div className='p-5 m-5'>
                <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-2 pb-4 relative">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-500 uppercase">My Profile</span>
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-500"></span>
                </h1>
                <div className="p-8 bg-white shadow mt-4">
                    {" "}
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {" "}
                        <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                            {" "}

                        </div>{" "}
                        <div className="relative">
                            {" "}
                            <div className="w-48 h-48 bg-amber-500 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                <svg
                                    xmlns="https://source.unsplash.com/MP0IUfwrn0A"
                                    className="h-24 w-24"
                                    viewBox="0 0 20 20"
                                    fill="white">
                                    {" "}
                                    <path
                                        fillRule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clipRule="evenodd"
                                    />
                                </svg>{" "}
                            </div>{" "}
                        </div>{" "}
                        <br /> <br />
                    </div>
                    {user.length !== 0 &&

                        <div className="mt-20 text-center border-b pb-12">

                            <h1 className="text-4xl font-medium text-gray-700">
                                {user[0]?.username}
                            </h1>
                            <h3 className="font-light text-gray-600 mt-3">
                                {user[0]?.email}

                            </h3>
                            <h3 className="mt-1 text-gray-500">

                                {user[0]?.phone_number}

                            </h3>
                            <br />
                            <div className="space-x-8 flex justify-center mt-32 md:mt-0 md:justify-center">

                                <Link to="/EditProfile" className="text-white py-2 px-4 uppercase rounded bg-orange-500 hover:bg-orange-700 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                    Edit Profile
                                </Link>

                            </div>
                        </div>
                    }

                </div>

            </div>

        </>
    )
}

export default Profiles