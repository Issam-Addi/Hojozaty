import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Signup from "../../images/Signup.jpg";
import { useGoogleLogin } from "@react-oauth/google";

function SignUp() {

  const navigate = useNavigate("/");

  // for google
  const [user, setUser] = useState([]);
  const [user0, setUser0] = useState([]);
  const [profile, setProfile] = useState([]);
  const [errorG, setErrorG] = useState("");

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser0(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user0.length !== 0) {
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user0.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        }
      )
        .then((res) => {
          setProfile(res.data);
          setErrorG("");
          axios.post("http://localhost:5000/records", {
            name: res.data.name,
            phone: "",
            email: res.data.email,
            password: "123456",
          })
            .then(function (response) {
              if (response.data != "taken") {
                navigate("/SignIn");
              } else {
                setErrorG("Email is already used, please Login");
              }
            })
            .catch((err) => console.log(err.message));
        })
        .catch((err) => console.log(err.message));
    }
  }, [user0]);

  // for normal user
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let done = true;
    const patternPassword = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;

    if (name === "") {
      done = false;
      setError("Please Enter a Name !");
    } else if (phone === "") {
      done = false;
      setError("Please Enter a Phone !");
    } else if (email === "") {
      done = false;
      setError("Please Enter an Email !");
    } else if (password === "") {
      done = false;
      setError("Please Enter a Password !");
    } else if (!patternPassword.test(password)) {
      done = false;
      setError("Please enter a password that is at least 8 characters long and contains one uppercase letter, one number, and one special character.");
    } else if (password !== passwordConfirm) {
      done = false;
      setError("Please Enter the same Password !");
    }

    if (done) {

      axios.post("http://localhost:5000/records", {
        name: name,
        phone: phone,
        email: email,
        password: password,
      })
        .then(function (response) {
          if (response.data != "taken") {
            window.location.href = "http://localhost:3000/SignIn";
          } else {
            setError("This Email is already taken");
          }
        })
        .catch(function (error) { 
          console.log(error);
        });

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setPasswordConfirm("");
    }
  };

  return (
    <>
      <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center mt-16">
        <div class="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">

          <div class="flex-1 hidden lg:flex">
            <img src={Signup} class="mx-auto" alt="Shopping image" />
            <div class="hero-img xl:m-16 w-full bg-contain bg-center bg-no-repeat"></div>
          </div>

          <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 sm:w-10/12">
            <div class="mt-12 flex flex-col items-center ">

              <h1 class="text-2xl xl:text-3xl font-extrabold text-amber-500 ">
                Sign Up to Join Us!
              </h1>

              <div class="w-full flex-1 mt-8">
                <div class="flex flex-col items-center">

                  <button
                    className="bg-transparent px-4 py-2 text-amber-600 rounded-lg border border-amber-600 hover:bg-amber-600 hover:text-white transition transform hover:-translate-y-1 hover:shadow-xl"
                    onClick={() => login()}>
                    Sign Up with Google
                    <svg
                      className="inline ms-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      data-name="Layer 1"
                      viewBox="0 0 35 35"
                      id="gmail">
                      <path
                        fill="#ea4435"
                        d="M16.58,19.1068l-12.69-8.0757A3,3,0,0,1,7.1109,5.97l9.31,5.9243L24.78,6.0428A3,3,0,0,1,28.22,10.9579Z"
                      ></path>
                      <path
                        fill="#00ac47"
                        d="M25.5,5.5h4a0,0,0,0,1,0,0v18a3,3,0,0,1-3,3h0a3,3,0,0,1-3-3V7.5a2,2,0,0,1,2-2Z"
                        transform="rotate(180 26.5 16)"
                      ></path>
                      <path
                        fill="#ffba00"
                        d="M29.4562,8.0656c-.0088-.06-.0081-.1213-.0206-.1812-.0192-.0918-.0549-.1766-.0823-.2652a2.9312,2.9312,0,0,0-.0958-.2993c-.02-.0475-.0508-.0892-.0735-.1354A2.9838,2.9838,0,0,0,28.9686,6.8c-.04-.0581-.09-.1076-.1342-.1626a3.0282,3.0282,0,0,0-.2455-.2849c-.0665-.0647-.1423-.1188-.2146-.1771a3.02,3.02,0,0,0-.24-.1857c-.0793-.0518-.1661-.0917-.25-.1359-.0884-.0461-.175-.0963-.267-.1331-.0889-.0358-.1837-.0586-.2766-.0859s-.1853-.06-.2807-.0777a3.0543,3.0543,0,0,0-.357-.036c-.0759-.0053-.1511-.0186-.2273-.018a2.9778,2.9778,0,0,0-.4219.0425c-.0563.0084-.113.0077-.1689.0193a33.211,33.211,0,0,0-.5645.178c-.0515.022-.0966.0547-.1465.0795A2.901,2.901,0,0,0,23.5,8.5v5.762l4.72-3.3043a2.8878,2.8878,0,0,0,1.2359-2.8923Z"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="M5.5,5.5h0a3,3,0,0,1,3,3v18a0,0,0,0,1,0,0h-4a2,2,0,0,1-2-2V8.5a3,3,0,0,1,3-3Z"
                      ></path>
                      <path
                        fill="#c52528"
                        d="M2.5439,8.0656c.0088-.06.0081-.1213.0206-.1812.0192-.0918.0549-.1766.0823-.2652A2.9312,2.9312,0,0,1,2.7426,7.32c.02-.0475.0508-.0892.0736-.1354A2.9719,2.9719,0,0,1,3.0316,6.8c.04-.0581.09-.1076.1342-.1626a3.0272,3.0272,0,0,1,.2454-.2849c.0665-.0647.1423-.1188.2147-.1771a3.0005,3.0005,0,0,1,.24-.1857c.0793-.0518.1661-.0917.25-.1359A2.9747,2.9747,0,0,1,4.3829,5.72c.089-.0358.1838-.0586.2766-.0859s.1853-.06.2807-.0777a3.0565,3.0565,0,0,1,.357-.036c.076-.0053.1511-.0186.2273-.018a2.9763,2.9763,0,0,1,.4219.0425c.0563.0084.113.0077.169.0193a2.9056,2.9056,0,0,1,.286.0888,2.9157,2.9157,0,0,1,.2785.0892c.0514.022.0965.0547.1465.0795a2.9745,2.9745,0,0,1,.3742.21A2.9943,2.9943,0,0,1,8.5,8.5v5.762L3.78,10.9579A2.8891,2.8891,0,0,1,2.5439,8.0656Z"
                      ></path>
                    </svg>
                  </button>

                  <h4 className="text-red-800 text-sm font-light m-1">
                    {errorG}
                  </h4>
                </div>

                <div class="my-12 border-b text-center">
                  <div class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign Up with e-mail
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div class="mx-auto max-w-xs">
                    <span className="text-red-500 text-sm mt-6">{error}</span>
                    <div class="mb-3">
                      <label
                        for="name"
                        className={`block mb-2 text-sm font-medium text-700 dark:text-500 `}>
                        Full name
                        <span className='text-red-700 text-xl'>*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="block mt-2 px-4 py-3 w-full rounded-lg text-amber-600 bg-gray-200 border border-black focus:border-amber-600 focus:ring-0"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setError("");
                        }} />
                    </div>

                    <div class="mb-3">
                      <label
                        for="phone"
                        className={`block mb-2 text-sm font-medium text-700 dark:text-500 `}>
                        Phone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        className="block mt-2 px-4 py-3 w-full rounded-lg text-amber-600 bg-gray-200 border border-black focus:border-amber-600 focus:ring-0"
                        placeholder="Enter your phone"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setError("");
                        }} />
                    </div>
                    <div class="mb-3">
                      <label
                        for="email"
                        className={`block mb-2 text-sm font-medium text-700 dark:text-500 `}>
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        className="block mt-2 px-4 py-3 w-full rounded-lg text-amber-600 bg-gray-200 border border-black focus:border-amber-600 focus:ring-0"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }} />
                    </div>
                    <div class="mb-3">
                      <label
                        for="password"
                        className={`text-700 dark:text-500 block mb-2 text-sm font-medium`}>
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="block mt-2 px-4 py-3 w-full rounded-lg text-amber-600 bg-gray-200 border border-black focus:border-amber-600 focus:ring-0"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }} />
                    </div>
                    <div>
                      <label
                        for="confirmPassword"
                        className={`text-700 dark:text-500 block mb-2 text-sm font-medium`}>
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="block mt-2 px-4 py-3 w-full rounded-lg text-amber-600 bg-gray-200 border border-black focus:border-amber-600 focus:ring-0"
                        placeholder="Confirm password"
                        value={passwordConfirm}
                        onChange={(e) => {
                          setPasswordConfirm(e.target.value);
                          setError("");
                        }} />
                    </div>
                    <button
                      type="submit"
                      className="mt-5 tracking-wide flex items-center justify-center w-full bg-transparent px-4 py-2 text-amber-600 rounded-lg border border-amber-600 hover:bg-amber-600 hover:text-white transition transform hover:-translate-y-1 hover:shadow-xl">
                      <svg
                        class="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span class="ml-3 ">Sign Up</span>
                    </button>
                    <p className={`mt-2 text-sm text-black`}>
                      You already have an account !{" "}
                      <Link
                        to="/signIn"
                        className="text-amber-500 hover:text-black hover:underline transition">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
