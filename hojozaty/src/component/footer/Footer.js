import { Link } from 'react-router-dom';
import Hojozaty_logo from '../../image/Hojozaty_logo.png'
const Footer = () => {

    return (
        <footer className="text-gray-500 bg-white px-4 py-5 max-w-screen-xl mx-auto md:px-8">
            <div className="max-w-lg sm:mx-auto sm:text-center">
                <img src={Hojozaty_logo} width={80} height={40} className="sm:mx-auto" />
                <p className="leading-relaxed mt-2 text-[15px]">
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
            </div>
            <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
                <li className="text-gray-700 hover:text-gray-900">
                    <Link to="/" className="block">
                        Home
                    </Link>
                </li>
                <li className="text-gray-700 hover:text-gray-900">
                    <Link to="about" className="block">
                        About
                    </Link>
                </li>
                <li className="text-gray-700 hover:text-gray-900">
                    <Link to="contact" className="block">
                        contact
                    </Link>
                </li>
            </ul>
            <div className="mt-8 items-center justify-center sm:flex">
                <div className="mt-4 sm:mt-0">
                    &copy; copy right 2023 by Hojozaty team.
                </div>
            </div>
        </footer>
    )
}

export default Footer;