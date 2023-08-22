import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const EditAboutContact = () => {

  const [about_title, setAbout_title] = useState([]);
  const [about_us, setAbout_us] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/aboutus')
      .then((response) => {
        setAbout_title(response.data.about_title)
        setAbout_us(response.data.about_us)
      })
      .catch((error) => console.log(error.message))
  }, []);

  function hndelAboutUs(e) {
    e.preventDefault()
    Swal.fire({
      title: "Are you sure",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      confirmButtonColor: "orange",
      cancelButtonText: "Cancel",
      cancelButtonColor: "orange",
      icon: 'warning'
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios.put('http://localhost:5000/aboutus', {
            about_title: about_title,
            about_us: about_us,
          })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
          Swal.fire("The about us has been updated successfully", '', 'success');
        } else
          Swal.fire(' Cancelled', '', 'error')
      })
  }

  return (
    <>
      <section className="bg-white">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-amber-600">
            Edit About us page
          </h2>
          <form onSubmit={hndelAboutUs} className="space-y-8">
            <div>
              <label
                htmlFor="subject"
                className="text-black">
                About Us Title
              </label>
              <input
                type="text"
                id="subject"
                className="block px-4 py-3 w-full mt-3 rounded-lg text-amber-600 bg-gray-200 border border-black focus:border-amber-600 focus:ring-0"
                placeholder="Enter Here Title For About Us"
                required
                value={about_title}
                onChange={(e) => setAbout_title(e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                About Us Description :
              </label>
              <textarea
                required
                id="message"
                rows={10}
                className="block px-4 py-3 w-full mt-3 rounded-lg text-amber-600 bg-gray-200 border border-black focus:border-amber-600 focus:ring-0"
                placeholder="enter here  About Us Description ......."
                defaultValue={""}
                value={about_us}
                onChange={(e) => setAbout_us(e.target.value)} />
            </div>
            <div className='flex justify-center'>
              <button type='submit'
                className="px-4 py-2.5 rounded-lg hover:shadow-xl border mb-10 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition transform hover:-translate-y-1">
                Update
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default EditAboutContact
