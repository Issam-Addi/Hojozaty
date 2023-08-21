import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { Navbar, Collapse, Typography, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../images/logo.png";
import { BiSolidUser } from "react-icons/bi";
import { AiOutlinePoweroff } from "react-icons/ai";

export default function Example() {
  const [openNav, setOpenNav] = React.useState(false);
  const { SignStatus, updateSignStatus } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.SignStatus != null) {
      updateSignStatus(localStorage.SignStatus);
    }
  }, []);

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
        localStorage.removeItem("curruntUser");
        window.location.href = "http://localhost:3000/";
      }
    };

    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <button className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto">
            <BiSolidUser className="h-8 w-8 hover:text-amber-600 transition" />
            <ChevronDownIcon strokeWidth={2.5} className={`h-3 w-3 transition-transform text-white ${isMenuOpen ? "rotate-180" : ""}`} />
          </button>
        </MenuHandler>
        <MenuList className="p-1">
              <MenuItem
                onClick={() => { closeMenu("Sign Out"); }}
                className={`flex items-center text-black gap-2 rounded-lghover:bg-red-500 focus:bg-red-500 active:bg-red-500 `}>
                <AiOutlinePoweroff className="w-5 h-5" />
                <Typography className="font-normal">
                  Sign Out
                </Typography>
              </MenuItem>
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
          <div className="hidden gap-2 lg:flex">
            <ProfileMenu />
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
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
            <ProfileMenu />
          </div>
        </Collapse>
      </div>
    </Navbar>
  );
}
