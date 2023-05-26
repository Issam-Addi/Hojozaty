import { useState } from "react";
const ResrvationForm = () => {

    const themeValue = {
        success: "green",
        error: "red",
        warning: "red",
        normal: "teal"
    }


    const [inputTheme, setInputTheme] = useState({
        phone: themeValue.normal,
    });

    const [massageWarning, setMassageWarning] = useState({
        phone: '',
    });

    function handlePhone(event) {
        const patternPhone = /^07\d{8}$/;
        const phone = event.target.value;

        if (!patternPhone.test(phone)) {
            setInputTheme({ ...inputTheme, phone: themeValue.error })
        }
        else {
            setInputTheme({ ...inputTheme, phone: themeValue.success })

        }
    }
    return (
        <>
            <>
                {/* component */}
                <div className="flex items-center justify-center p-12">
                    <div className="mx-auto w-full max-w-[550px]">
                        <form action="https://formbold.com/s/FORM_ID" method="POST">
                            <div className="-mx-3 flex flex-wrap">

                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label
                                            htmlFor="fullName"
                                            className="mb-3 block text-base font-medium text-[#07074D] cursor-pointer">
                                            Full Name
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            name="fullName"
                                            id="fullName"
                                            placeholder="full Name"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    </div>
                                </div>

                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label
                                            htmlFor="phoneNumber"
                                            className={`mb-3 block text-base font-medium text-${inputTheme.phone}-700 cursor-pointer`}>
                                            Phone Number
                                        </label>
                                        <input
                                            onChange={(event) => handlePhone(event)}
                                            min={0}
                                            required
                                            type="number"
                                            name="PhoneNumber"
                                            id="phoneNumber"
                                            placeholder="07XXXXXXXX"
                                            className={`w-full rounded-md border border-${inputTheme.phone}-300 bg-white py-3 px-6 text-base font-medium text-${inputTheme.phone}-900 outline-none focus:ring-${inputTheme.phone}-500 focus:border-${inputTheme.phone}-500 focus:shadow-md`} />
                                        <p className={`mt-2 text-sm text-${themeValue.warning}-600`}>{massageWarning.name}</p>
                                    </div>
                                </div>
                            </div>


                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label
                                            htmlFor="PeopleNumber"
                                            className="mb-3 block text-base font-medium text-[#07074D] cursor-pointer">
                                            Number of people
                                        </label>
                                        <input
                                            placeholder="5"
                                            min={1}
                                            required
                                            type="number"
                                            name="Number of people"
                                            id="PeopleNumber"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    </div>
                                </div>

                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label
                                            htmlFor="time"
                                            className="mb-3 block text-base font-medium text-[#07074D] cursor-pointer">
                                            Time
                                        </label>
                                        <input
                                            required
                                            type="time"
                                            name="time"
                                            id="time"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-5">
                                <label className="mb-3 block text-base font-medium text-[#07074D]">
                                    Did you family?
                                </label>
                                <div className="flex items-center space-x-6">
                                    <div className="flex items-center">
                                        <input
                                            required
                                            type="radio"
                                            name="radio1"
                                            id="radioButton1"
                                            className="h-5 w-5" />
                                        <label
                                            htmlFor="radioButton1"
                                            className="pl-3 text-base font-medium text-[#07074D]">
                                            Yes
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            required
                                            type="radio"
                                            name="radio1"
                                            id="radioButton2"
                                            className="h-5 w-5" />
                                        <label
                                            htmlFor="radioButton2"
                                            className="pl-3 text-base font-medium text-[#07074D]">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                    Submit
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </>

        </>
    );
}

export default ResrvationForm;