import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import video from '../../images/video.mp4'
import mcd from '../../images/mcd.png'
import kfc from '../../images/kfc.png'
import dom from '../../images/Dom.png'
import burger from '../../images/burger.png'

function Home() {

  const navigate = useNavigate();

  function handleFoodTypeSelection(foodType) {
    navigate(`/restaurants/${foodType}`);
  }

  return (
    <>
      <section className="relative mt-16 flex flex-col items-center justify-center text-center text-white h-[550px]">
        <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
          <video
            className="min-w-full min-h-full absolute object-cover"
            src={video} type="video/mp4"
            autoPlay={true}
            muted={true}
            loop={true} />
        </div>
        <div className="video-content space-y-2 z-10 pb-5 h-[55vh]">
          <h1 className="font-bold text-5xl uppercase text-amber-600">Foodie's Paradise Awaits</h1>
          <h3 className="font-bold text-2xl">Reserve your table with ease and indulge in culinary delights <br /> at your favorite restaurants</h3>
          <div class="rounded-md shadow mt-10">
            <HashLink smooth={true} to="#food">
              <button class="bg-amber-600 text-white py-2 px-4 rounded-lg mt-5 border border-amber-600 hover:bg-transparent transition transform hover:-translate-y-1">
                Pick Your Favorite Food
              </button>
            </HashLink>
          </div>
        </div>
      </section>
      <section className="bg-gray-200 shadow-xl">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16">
          <div className="sm:text-lg">
            <h2 className="mb-8 text-4xl tracking-tight font-bold text-amber-600 capitalize">
              Effortless reservations at favorite restaurants
            </h2>
            <p>
              Elevate your dining adventures with our user-friendly platform, where you
              can effortlessly browse, select, and book tables at top-rated restaurants.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src="https://i.pinimg.com/736x/18/f8/26/18f8262341b337e7d3f714e41cef7a09.jpg"
              alt="office content 1" />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://c.stocksy.com/a/c4A800/z9/1945350.jpg"
              alt="office content 2" />
          </div>
        </div>
      </section>
      <div className="bg-gray-200 mt-5 shadow-xl">
        <section id="food" className="pt-7">
          <h2 className="text-4xl mb-8 tracking-tight font-bold text-amber-600 text-center">
            Which food do you prefer?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto p-4">
            <div className="relative overflow-hidden rounded-lg shadow-lg ">
              <img
                className="object-cover w-full h-48"
                src="https://media.istockphoto.com/id/545286388/photo/chinese-food-blank-background.jpg?s=612x612&w=0&k=20&c=pqOIy07YKO5PlU5VxjscwTGRrrZ8PluKMUjSOz-II60="
                alt="type of food" />
              <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
              <div className="absolute top-0 left-0 px-6 py-11">
                <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">
                  Asian Food
                </h4>
                <button
                  className="text-sm font-medium mt-4 text-white px-5 py-2.5 rounded-lg bg-amber-600 border border-amber-600 hover:bg-transparent transition transform hover:-translate-y-1"
                  onClick={() => handleFoodTypeSelection("asian")}>
                  View More
                </button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg ">
              <img
                className="object-cover w-full h-48"
                src="https://i.ndtvimg.com/i/2016-05/arabic-food_625x350_71463118204.jpg"
                alt="type of food" />
              <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
              <div className="absolute top-0 left-0 px-6 py-11">
                <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">
                  Arabian Food
                </h4>
                <button
                  className="text-sm font-medium mt-4 text-white px-5 py-2.5 rounded-lg bg-amber-600 border border-amber-600 hover:bg-transparent transition transform hover:-translate-y-1"
                  onClick={() => handleFoodTypeSelection("arabian")}>
                  View More
                </button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg ">
              <img
                className="object-cover w-full h-48"
                src="https://blog.amigofoods.com/wp-content/uploads/2020/12/tacos-authentic-mexican-food.jpg"
                alt="type of food" />
              <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
              <div className="absolute top-0 left-0 px-6 py-11">
                <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">
                  Mexican Food
                </h4>
                <button
                  className="text-sm font-medium mt-4 text-white px-5 py-2.5 rounded-lg bg-amber-600 border border-amber-600 hover:bg-transparent transition transform hover:-translate-y-1"
                  onClick={() => handleFoodTypeSelection("mexican")}>
                  View More
                </button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg ">
              <img
                className="object-cover w-full h-48"
                src="https://static1.squarespace.com/static/5e484ab628c78d6f7e602d73/5e484d29dd42c458f31f0b22/5f52972ad03efd52606d4ad9/1680649812918/What-to-eat-in-Italy.png?format=1500w"
                alt="type of food" />
              <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
              <div className="absolute top-0 left-0 px-6 py-11">
                <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">
                  Italian Food
                </h4>
                <button
                  className="text-sm font-medium mt-4 text-white px-5 py-2.5 rounded-lg bg-amber-600 border border-amber-600 hover:bg-transparent transition transform hover:-translate-y-1"
                  onClick={() => handleFoodTypeSelection("italian")}>
                  View More
                </button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg ">
              <img
                className="object-cover w-full h-48"
                src="https://www.blueosa.com/wp-content/uploads/2020/01/the-best-top-10-indian-dishes.jpg"
                alt="type of food" />
              <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
              <div className="absolute top-0 left-0 px-6 py-11">
                <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">
                  Indian Food
                </h4>
                <button
                  className="text-sm font-medium mt-4 text-white px-5 py-2.5 rounded-lg bg-amber-600 border border-amber-600 hover:bg-transparent transition transform hover:-translate-y-1"
                  onClick={() => handleFoodTypeSelection("indian")}>
                  View More
                </button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg ">
              <img
                className="object-cover w-full h-48"
                src="https://www.americancafe.com/wp-content/uploads/2021/09/americancafe-What-Started-American-Cuisine-%E2%80%93-Discover-How-It-All-Started.jpg"
                alt="type of food" />
              <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
              <div className="absolute top-0 left-0 px-6 py-11">
                <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">
                  American Food
                </h4>
                <button
                  className="text-sm font-medium mt-4 text-white px-5 py-2.5 rounded-lg bg-amber-600 border border-amber-600 hover:bg-transparent transition transform hover:-translate-y-1"
                  onClick={() => handleFoodTypeSelection("american")}>
                  View More
                </button>
              </div>
            </div>
          </div>
        </section>
        <div className="flex justify-center mt-5">
          <HashLink smooth={true} to="ServicePageAll#">
            <button className="px-4 py-2.5 rounded-lg hover:shadow-xl border mb-10 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition transform hover:-translate-y-1">
              Show All Restaurants
            </button>
          </HashLink>
        </div>
      </div>
      <div className="p-20 bg-gray-200 shadow-xl my-5">
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl uppercase leading-normal font-bold tracking-tight text-amber-600">
            Our partners
          </h3>
        </div>
        <div className="sm:grid grid-cols-2 md:grid-cols-4 col-gap-10 mx-auto">
          <div className="text-center mb-5">
            <img
              className="mb-3 rounded-xl mx-auto h-32 w-32"
              src={kfc} />
            <p className="uppercase text-sm">KFC</p>
          </div>
          <div className="text-center mb-5">
            <img
              className="mb-3 rounded-xl mx-auto h-32 w-32"
              src={mcd} />
            <p className="uppercase text-sm">McDonald's</p>
          </div>
          <div className="text-center mb-5">
            <img
              className="mb-3 rounded-xl mx-auto h-32 w-32"
              src={dom} />
            <p className="uppercase text-sm">Domino's</p>
          </div>
          <div className="text-center mb-5">
            <img
              className="mb-3 rounded-xl mx-auto h-32 w-32"
              src={burger} />
            <p className="uppercase text-sm">Burger King</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;