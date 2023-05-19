const Admineditor = () => {
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
                            Edit hero image
                        </button>
                        <button className="inline-block py-2 px-4 text-gray-800 font-medium duration-150 border hover:bg-gray-50 active:bg-gray-100 rounded-lg">
                            Add new admin
                        </button>
                        <button className="inline-block py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow-md hover:shadow-none">
                            Edit new restaurant
                        </button>
                    </div>
                </div>
            </section>

            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-6">#no</th>
                                <th className="py-3 px-6">Admin name</th>
                                <th className="py-3 px-6">Admin email</th>
                                <th className="py-3 px-6"></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">#1</td>
                                <td className="px-6 py-4 whitespace-nowrap">Essam</td>
                                <td className="px-6 py-4 whitespace-nowrap">Essam@gmail.com</td>
                                <td className="text-right px-6 whitespace-nowrap">
                                    <a href="#" className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                        Edit
                                    </a>
                                    <button href="#" className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Admineditor;