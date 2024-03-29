import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import loginImg from "../../images/login.jpg";
import axios from "axios";
import { UserContext } from '../../UserContext';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

function SignIn() {

  const [user, setUser] = useState([]);

  // Sign in with Google
  const [user0, setUser0] = useState([]);
  const [profile, setProfile] = useState([]);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser0(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
    () => {
      if (user0.length !== 0) {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user0.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
          .then((res) => {
            setProfile(res.data);
            axios.post("http://localhost:5000/recordp", {
              email: res.data.email,
              password: '123456',
            })

              .then(function (response) {
                if (response.data != "not passed") {
                  let x = []
                  if (response.data[1] == 0) {
                    x = [false, true, true]
                  } else if (response.data[1] == 1) {
                    x = [true, false, true]
                  } else if (response.data[1] == 2) {
                    x = [true, true, false]
                  }
                  updateRouts(x)
                  updateSetCurruntUser(response.data[2])
                  localStorage.setItem("curruntUser", JSON.stringify(response.data[2]))
                  updateSignStatus("SignOut")
                  localStorage.setItem("SignStatus", "SignOut")
                  localStorage.setItem("auth", JSON.stringify(response.data[0]))
                  localStorage.setItem("roles", JSON.stringify(x))
                  window.location.href = '/';
                } else {
                  console.log("not passed");
                }
              })
              .catch(function (error) { console.log(error.message); });
          })
          .catch((err) => console.log(err.message));
      }
    },
    [user0]
  );

  const { routs, updateRouts } = useContext(UserContext)
  const { SignStatus, updateSignStatus } = useContext(UserContext)
  const { curruntUser, updateSetCurruntUser } = useContext(UserContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();
    axios.post("http://localhost:5000/recordp", {
      email: email,
      password: password,
    })
      .then(function (response) {
        if (response.data != "not passed") {
          let role = []
          if (response.data[1] == 0) {
            role = [false, true, true]
          } else if (response.data[1] == 1) {
            role = [true, false, true]
          } else if (response.data[1] == 2) {
            role = [true, true, false]
          }
          updateRouts(role)
          updateSetCurruntUser(response.data[2])
          localStorage.setItem("curruntUser", JSON.stringify(response.data[2]))
          updateSignStatus("SignOut")
          localStorage.setItem("SignStatus", "SignOut")
          localStorage.setItem("auth", JSON.stringify(response.data[0]))
          localStorage.setItem("roles", JSON.stringify(role))
          window.location.href = 'http://localhost:3000';
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div class="min-h-screen bg-gray-200 flex justify-center mt-16 mb-5 shadow-xl pb-6">
      <div className="max-w-screen-xl mx-auto px-6">
        <div class="mt-10 bg-white shadow-xl sm:rounded-lg flex justify-center flex-1">
          <div class="flex-1 hidden lg:flex">
            <img src={loginImg} alt="Shopping image" />
          </div>
          <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 sm:w-10/12">
            <div class="mt-12 flex flex-col items-center">
              <h1
                class="text-2xl xl:text-3xl font-extrabold text-amber-500 ">
                Sign in your account
              </h1>
              <div class="w-full flex-1 mt-8">
                <div class="flex flex-col items-center">
                  <button
                    className="bg-transparent px-4 py-2 text-amber-500 rounded-lg border border-amber-500 hover:bg-amber-500 hover:text-white transition transform hover:-translate-y-1 hover:shadow-xl"
                    onClick={() => login()}>
                    Sign in with Google
                    <svg
                      className="inline ms-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20" height="20"
                      data-name="Layer 1"
                      viewBox="0 0 35 35"
                      id="gmail">
                      <path
                        fill="#ea4435"
                        d="M16.58,19.1068l-12.69-8.0757A3,3,0,0,1,7.1109,5.97l9.31,5.9243L24.78,6.0428A3,3,0,0,1,28.22,10.9579Z">
                      </path>
                      <path
                        fill="#00ac47"
                        d="M25.5,5.5h4a0,0,0,0,1,0,0v18a3,3,0,0,1-3,3h0a3,3,0,0,1-3-3V7.5a2,2,0,0,1,2-2Z"
                        transform="rotate(180 26.5 16)">
                      </path>
                      <path
                        fill="#ffba00"
                        d="M29.4562,8.0656c-.0088-.06-.0081-.1213-.0206-.1812-.0192-.0918-.0549-.1766-.0823-.2652a2.9312,2.9312,0,0,0-.0958-.2993c-.02-.0475-.0508-.0892-.0735-.1354A2.9838,2.9838,0,0,0,28.9686,6.8c-.04-.0581-.09-.1076-.1342-.1626a3.0282,3.0282,0,0,0-.2455-.2849c-.0665-.0647-.1423-.1188-.2146-.1771a3.02,3.02,0,0,0-.24-.1857c-.0793-.0518-.1661-.0917-.25-.1359-.0884-.0461-.175-.0963-.267-.1331-.0889-.0358-.1837-.0586-.2766-.0859s-.1853-.06-.2807-.0777a3.0543,3.0543,0,0,0-.357-.036c-.0759-.0053-.1511-.0186-.2273-.018a2.9778,2.9778,0,0,0-.4219.0425c-.0563.0084-.113.0077-.1689.0193a33.211,33.211,0,0,0-.5645.178c-.0515.022-.0966.0547-.1465.0795A2.901,2.901,0,0,0,23.5,8.5v5.762l4.72-3.3043a2.8878,2.8878,0,0,0,1.2359-2.8923Z">
                      </path>
                      <path
                        fill="#4285f4"
                        d="M5.5,5.5h0a3,3,0,0,1,3,3v18a0,0,0,0,1,0,0h-4a2,2,0,0,1-2-2V8.5a3,3,0,0,1,3-3Z">
                      </path>
                      <path
                        fill="#c52528"
                        d="M2.5439,8.0656c.0088-.06.0081-.1213.0206-.1812.0192-.0918.0549-.1766.0823-.2652A2.9312,2.9312,0,0,1,2.7426,7.32c.02-.0475.0508-.0892.0736-.1354A2.9719,2.9719,0,0,1,3.0316,6.8c.04-.0581.09-.1076.1342-.1626a3.0272,3.0272,0,0,1,.2454-.2849c.0665-.0647.1423-.1188.2147-.1771a3.0005,3.0005,0,0,1,.24-.1857c.0793-.0518.1661-.0917.25-.1359A2.9747,2.9747,0,0,1,4.3829,5.72c.089-.0358.1838-.0586.2766-.0859s.1853-.06.2807-.0777a3.0565,3.0565,0,0,1,.357-.036c.076-.0053.1511-.0186.2273-.018a2.9763,2.9763,0,0,1,.4219.0425c.0563.0084.113.0077.169.0193a2.9056,2.9056,0,0,1,.286.0888,2.9157,2.9157,0,0,1,.2785.0892c.0514.022.0965.0547.1465.0795a2.9745,2.9745,0,0,1,.3742.21A2.9943,2.9943,0,0,1,8.5,8.5v5.762L3.78,10.9579A2.8891,2.8891,0,0,1,2.5439,8.0656Z">
                      </path>
                    </svg>
                  </button>
                </div>

                <div class="my-12 border-b text-center">
                  <div class="leading-none px-2 inline-block text-sm text-black tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign in with e-mail
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div class="mx-auto max-w-xs">
                    <div class="mb-6">
                      <label
                        htmlFor="email"
                        className={`block mb-2 text-sm font-medium text-700 dark:text--500 `}>
                        Email
                        <span className='text-red-700 text-xl'>*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="block mt-2 px-4 py-3 w-full rounded-lg text-amber-500 bg-gray-200 border border-black focus:border-amber-500 focus:ring-0"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); }} />
                      <p className={`mt-2 text-sm text-600 dark:text500`}>
                        <span class="font-medium"></span>
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className={`text-700 dark:text-500 block mb-2 text-sm font-medium`}>
                        Password
                        <span className='text-red-700 text-xl'>*</span>
                      </label>
                      <input
                        type="password"
                        id="password"
                        required
                        className="block mt-2 px-4 py-3 w-full rounded-lg text-amber-500 bg-gray-200 border border-black focus:border-amber-500 focus:ring-0"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); }} />
                      <p className={`mt-2 text-sm text-600 dark:text-500`}>
                        <span class="font-medium"></span>
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="mt-5 tracking-wide flex items-center justify-center w-full bg-transparent px-4 py-2 text-amber-500 rounded-lg border border-amber-500 hover:bg-amber-500 hover:text-white transition transform hover:-translate-y-1 hover:shadow-xl">
                      <svg
                        class="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                      </svg>
                      <span class="ml-3 ">Sign in</span>
                    </button>
                    <p className={`mt-2 text-sm text-black`}>
                      Don't have an account ! {" "}
                      <Link
                        to="/signUp"
                        className="text-amber-500 hover:text-black hover:underline transition">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
