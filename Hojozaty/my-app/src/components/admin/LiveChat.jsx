import React, { useEffect, useState } from 'react'
import axios from 'axios'

const LiveChat = () => {

  const [reporters, setReporters] = useState([]);
  const [currentUser, setCurrentUser] = useState({})
  const [message, setMessage] = useState("")

  useEffect(() => {
    axios.get('http://localhost:5000/reporters')
      .then((response) => {
        setReporters(response.data);
        setCurrentUser(response.data[0])
      })
      .catch((error) => console.log(error.message))
  }, []);

  function HandleUser(e) {
    setCurrentUser(e)
  }

  function handleSendMessage() {
    const recipient = currentUser.email;
    const subject = 'Hello';
    const body = message;
    console.log(recipient)
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }

  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div className="flex items-center justify-center rounded-2xl text-amber-500 bg-amber-50 h-10 w-10">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div className="ml-2 font-bold text-2xl">Massage box</div>
            </div>
            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between">
                <span className="font-bold">Active Conversations</span>
                <span className="flex items-center justify-center bg-amber-500 h-7 w-7 rounded-full">
                  {reporters.length}
                </span>
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-auto overflow-y-auto">
                {reporters?.map((reporter) => {
                  return (
                    <button
                      onClick={() => HandleUser(reporter)}
                      className="flex flex-row items-center hover:bg-amber-500 rounded-xl p-2">
                      <div className="bg-pink-600 w-10 h-10 flex items-center justify-center rounded-full">
                        {reporter.name.charAt(0)}
                      </div>
                      <div className="ml-2 text-sm font-semibold">
                        {reporter.name}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-amber-50 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="flex flex-row items-center">
                    <div className="bg-pink-600 w-10 h-10 flex items-center justify-center rounded-full">
                      {currentUser.name?.charAt(0)}
                    </div>
                    <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                      <div>{currentUser.message}</div>
                    </div>
                  </div>
                </div>
              </div>
              <form
                onSubmit={() => handleSendMessage()}
                className="flex items-center gap-4 h-16 rounded-lg shadow-xl bg-white w-full px-4">
                <input
                  required
                  type="text"
                  className="block mt-2 px-4 py-3 h-10 mb-2 w-full rounded-lg text-amber-500 bg-gray-200 border border-black focus:border-amber-500 focus:ring-0"
                  onChange={(e) => setMessage(e.target.value)} />
                <button
                  type='submit'
                  className="px-4 py-2 rounded-lg hover:shadow-xl border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition transform hover:-translate-y-1">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LiveChat