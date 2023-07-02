import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


const EditProfile = () => {

  const [user, setUser] = useState({})
  const [id, setId] = useState({})
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [PhoneNumber, setPhoneNumber] = useState("")
  const [Password, setPassword] = useState("")

  useEffect(() => {
    axios.get('http://localhost:5000/recordpId')
      .then((response) => {
        setUser(response.data[0])
        setId(response.data[0].userid)
        setUsername(response.data[0].username)
        setEmail(response.data[0].email)
        setPhoneNumber(response.data[0].phone_number)
        setPassword(response.data[0].password)
      })
      .catch((error) =>
        console.log(error.message)
      )
  },[])

  function handleSubmit(event) {
    event.preventDefault();
    axios.put(`http://localhost:5000/user/${id}`, { username, email, phone_number: PhoneNumber, password: Password
    })
  .then(function (response) {
        console.log(response.data);

        Swal.fire({
          position: "center",
          icon: "success",
          title:"Your details has been updated successfully"
        });
      }).catch(function (error) {
        console.log(error);
      });

  }

  return (
    <>
      <div className="min-h-screen p-6 flex items-center justify-center editProfileBackGroundImage">

        <div className="container max-w-screen-lg mx-auto">

          <h2 className="font-semibold text-3xl text-center text-orange-900">Edit Profile</h2>
          <br />

          {user.length !== 0 &&

            <form method="post" onSubmit={handleSubmit} className="max-w-sm mx-auto">

              <div className="mb-6">
                <label htmlFor="full_name" className='cursor-pointer'>New name</label>
                <input
                  className="text-orange-900 mt-2 w-full border border-black focus:border-orange-900 rounded-lg py-3 px-[14px] text-base outline-none focus-visible:shadow-none shadow-md transition"
                  required
                  type="text"
                  name="full_name"
                  id="full_name"
                  placeholder="New name"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)} />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className='cursor-pointer'>New email</label>
                <input
                  className="text-orange-900 mt-2 w-full border border-black focus:border-orange-900 rounded-lg py-3 px-[14px] text-base outline-none focus-visible:shadow-none shadow-md transition"
                  required
                  type="text"
                  name="email"
                  id="email"
                  placeholder="email@domain.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)} />
              </div>

              <div className="mb-6">
                <label htmlFor="phone_number" className='cursor-pointer'>New phone</label>
                <input
                  className="text-orange-900 mt-2 w-full border border-black focus:border-orange-900 rounded-lg py-3 px-[14px] text-base outline-none focus-visible:shadow-none shadow-md transition"
                  required
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  placeholder="07XXXXXXXX"
                  value={PhoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)} />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className='cursor-pointer'>Password</label>
                <input
                  className="text-orange-900 mt-2 w-full border border-black focus:border-orange-900 rounded-lg py-3 px-[14px] text-base outline-none focus-visible:shadow-none shadow-md transition"
                  required
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*******"
                  value={Password}
                  onChange={(event) => setPassword(event.target.value)} />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-orange-900 border-orange-900 rounded-lg border py-3 px-5 text-white transition hover:bg-white hover:text-black mr-2">
                  Save
                </button>
              </div>
            </form>

          }
        </div>
      </div>
    </>
  )
}

export default EditProfile