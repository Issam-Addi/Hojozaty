import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { Navbar, Collapse, Typography, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { LifebuoyIcon, PowerIcon, ChevronDownIcon, UserCircleIcon, CubeTransparentIcon, Bars3Icon, XMarkIcon, HomeIcon } from "@heroicons/react/24/outline";
import { BiSolidUser } from "react-icons/bi";
import logo from "../../images/logo.png";
import RestaurantIcon from "@mui/icons-material/Restaurant";

function NavListMenuUser() {
  const [openNav, setOpenNav] = React.useState(false);
  const { SignStatus, updateSignStatus } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.SignStatus != null) {
      updateSignStatus(localStorage.SignStatus);
    }
  }, []);

  const profileMenuItems = [
    {
      label: "Profile",
      icon: LifebuoyIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
    }
  ];

  function ProfileMenu() {
    const { SignStatus, updateSignStatus } = useContext(UserContext);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const closeMenu = (label) => {

      setIsMenuOpen(false);
      if (label == "Sign Out") {
        updateSignStatus("signUp");
        localStorage.setItem("SignStatus", "signUp");
        localStorage.removeItem("auth");
        localStorage.removeItem("roles");
        window.location.href = "http://localhost:3000/";
      } else if (label == "Profile") {
        window.location.href = "http://localhost:3000/ProfilePage";
      }
    };

    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <button className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto">
            <BiSolidUser className="h-8 w-8 hover:text-amber-600 transition" />
            <ChevronDownIcon strokeWidth={4} className={`h-3 w-3 transition transform text-white ${isMenuOpen ? "rotate-180" : ""}`} />
          </button>
        </MenuHandler>
        <MenuList>
          {profileMenuItems.map(({ label, icon }, i) => {
            return (
              <MenuItem
                key={label}
                onClick={() => { closeMenu(label); }}
                className={`flex items-center gap-2 rounded-lg transition ${i ? "hover:bg-red-500 focus:bg-red-500 active:bg-red-500" : "hover:bg-amber-600 focus:bg-amber-600 active:bg-amber-600"}`}>
                {React.createElement(icon, { className: `h-4 w-4 text-black` })}
                <Typography
                  as="span"
                  variant="small"
                  className="text-black">
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    );
  }

  return (
    <Navbar className="w-full fixed top-0 z-20 bg-black border-none rounded-none">
      <div className=" max-w-screen-xl mx-auto lg:px-4">
        <div className="flex items-center justify-between text-white">
          <Link to="/">
            <img src={logo} alt="logo" width={150} />
          </Link>
          <div className="hidden lg:block">
            <ui className="lg:flex">
              <Link to="/">
                <li
                  className="flex items-center gap-2 py-2 pr-4 text-white hover:text-amber-600 transition my-4 lg:my-0">
                  <HomeIcon className="h-[18px] w-[18px]" />
                  Home
                </li>
              </Link>
              <Link to="/ServicePageAll">
                <li className="flex items-center gap-2 py-2 pr-4 text-white hover:text-amber-600 transition mb-4 lg:mb-0">
                  <RestaurantIcon style={{ height: "18px" }} />
                  Restaurants
                </li>
              </Link>
              <Link to="/About">
                <li className="flex items-center gap-2 py-2 pr-4 text-white hover:text-amber-600 transition mb-4 lg:mb-0">
                  <CubeTransparentIcon className="h-[18px] w-[18px]" />
                  About Us
                </li>
              </Link>
              <Link to="/ContactUs">
                <li className="flex items-center gap-2 py-2 pr-4 text-white hover:text-amber-600 transition mb-4 lg:mb-0">
                  <UserCircleIcon className="h-[18px] w-[18px]" />
                  Contact Us
                </li>
              </Link>
            </ui>
          </div>
          <div className="hidden gap-2 lg:flex">
            {SignStatus == "signUp" ? (
              <Link to="/SignIn">
                <button
                  className="bg-amber-600 border border-amber-600 hover:bg-transparent transition px-4 py-2 rounded-lg">
                  Sign In
                </button>
              </Link>
            ) : (
              <ProfileMenu />
            )}
          </div>
          <button
            className="lg:hidden hover:text-amber-600 transition"
            onClick={() => setOpenNav(!openNav)}>
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </button>
        </div>

        <Collapse open={openNav}>
          <ui className="lg:flex">
            <Link to="/">
              <li
                className="flex items-center gap-2 py-2 pr-4 text-white hover:text-amber-600 transition my-4 lg:my-0">
                <HomeIcon className="h-[18px] w-[18px]" />
                Home
              </li>
            </Link>
            <Link to="/ServicePageAll">
              <li className="flex items-center gap-2 py-2 pr-4 text-white hover:text-amber-600 transition mb-4 lg:mb-0">
                <RestaurantIcon style={{ height: "18px" }} />
                Restaurants
              </li>
            </Link>
            <Link to="/About">
              <li className="flex items-center gap-2 py-2 pr-4 text-white hover:text-amber-600 transition mb-4 lg:mb-0">
                <CubeTransparentIcon className="h-[18px] w-[18px]" />
                About Us
              </li>
            </Link>
            <Link to="/ContactUs">
              <li className="flex items-center gap-2 py-2 pr-4 text-white hover:text-amber-600 transition mb-4 lg:mb-0">
                <UserCircleIcon className="h-[18px] w-[18px]" />
                Contact Us
              </li>
            </Link>
          </ui>
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
            {SignStatus == "signUp" ? (
              <Link to="/SignIn">
                <button
                  className="bg-amber-600 border border-amber-600 hover:bg-transparent transition px-4 py-2 rounded-lg">
                  Sign In
                </button>
              </Link>
            ) : (
              <ProfileMenu />
            )}
          </div>
        </Collapse>
      </div>
    </Navbar>
  );
}

export default NavListMenuUser;