import Statistics from '../../components/admin/Statistics';

const MainDashboard = () => {

  return (
    <div className='bg-white'>
      <Statistics />
      <div className="md:mt-14 mt-4 relative sm:flex items-center justify-center">
        <img
          src="https://i.ibb.co/KjrPCyW/map.png"
          alt="world map image"
          className="w-full xl:h-full h-96 object-cover sm:block hidden"/>
        <img
          src="https://i.ibb.co/SXKj9Mf/map-bg.png"
          alt="mobile-image"
          className="sm:hidden -mt-10 block w-full h-96 object-cover absolute z-0"/>
        <div className="p-6 w-56 bg-amber-500 rounded-lg absolute z-20 left-0 xl:ml-56 -mt-40">
          <p className="text-3xl font-semibold text-black">20K+</p>
          <p className="text-base leading-4 xl:mt-4 mt-2 text-black">
            Recently Property Listed
          </p>
        </div>
        <div className="p-6 w-56 bg-amber-500 rounded-lg absolute z-20 mt-80 -ml-0 ">
          <p className="text-3xl font-semibold text-black">8K+</p>
          <p className="text-base leading-4 xl:mt-4 mt-2 text-black">
            Active Listening
          </p>
        </div>
        <div className="p-6 w-56 bg-amber-500 rounded-lg absolute z-20 md:mt-0 sm:-mt-5 mt-4 right-0 xl:mr-56 sm:mr-24">
          <p className="text-3xl font-semibold text-black">15K+</p>
          <p className="text-base leading-4 xl:mt-4 mt-2 text-black">
            Recently Sold Lands
          </p>
        </div>
      </div>
    </div>

  );
}

export default MainDashboard