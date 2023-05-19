import { AiFillLinkedin ,AiOutlineMail } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { BsFillTelephoneFill, BsInstagram } from "react-icons/bs";
const Contact = () => {

    const contactMethods = [
        {
            icon:<AiOutlineMail/>
            ,
            contact: "essam.h.addi@gmail.com"
        },
        {
            icon: <BsFillTelephoneFill />
            ,
            contact: "+962786992500"
        },
        {
            icon: <ImLocation />
            ,
            contact: "Jordan, Zarqa, Orange Academy"
        },
        {
            icon: <AiFillLinkedin />
            ,
            contact: "https://www.linkedin.com/in/issam-addi-09148a267/"
        },
        {
            icon: <BsInstagram />
            ,
            contact:  "https://www.instagram.com/esam.adi/"
        },
    ]

    return (
        <main className="py-14">
            <div className="max-w-screen-xl mx-auto text-white px-4 md:px-8">
                <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
                    <div className='max-w-lg space-y-3 p-4 backround rounded-xl'>
                        <h3 className="text-amber-800 font-semibold">
                            Contact
                        </h3>
                        <p className="  text-3xl font-semibold sm:text-4xl">
                            Let us know how we can help
                        </p>
                        <p>
                            We're here to help and answer any question you might have, We look forward to hearing from you! Please fill out the form, or us the contact information bellow .
                        </p>
                        <div>
                            <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-6 items-center">
                                {
                                    contactMethods.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-x-3">
                                            <div className="flex-none text-amber-800">
                                                {item.icon}
                                            </div>
                                            <p>{item.contact}</p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="flex-1 mt-12 sm:max-w-lg text-black lg:max-w-md">
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="space-y-5">
                            <div>
                                <label className="font-medium">
                                    Full name
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    placeholder="your full name"/>
                            </div>
                            <div>
                                <label className="font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    placeholder="email@example.com"/>
                            </div>
                            <div>
                                <label className="font-medium">
                                    Message
                                </label>
                                <textarea
                                    required
                                    className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    placeholder="your comment">
                                </textarea>
                            </div>
                            <button
                                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div >
        </main>
    )
}

export default Contact;
