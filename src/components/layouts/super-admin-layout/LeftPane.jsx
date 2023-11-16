import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/carrotsuite.png";
import icon from "../../../assets/icon.png";
import { useState } from "react";
import getUrlFromTitle from "../../../utils/getUrlFromTitle";
import ProfileCard from "./ProfileCard";
import { logout } from "../../../features/authSlice";
import { useDispatch } from "react-redux";

const menuItems = [
  { icon: <i className="mr-2 fa-solid fa-house-user"></i>, title: "dashboard" },
  { icon: <i className="mr-2 fa-solid fa-building"></i>, title: "companies" },
  {
    icon: <i className="mr-2 fa-solid fa-credit-card"></i>,
    title: "subscriptions",
  },
  { icon: <i className="mr-2 fa-solid fa-box"></i>, title: "plans" },
];

const LeftPane = ({ currentPath, showMenu, expandPane, setExpandPane }) => {
  const [showOptions, setShowOptions] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div
      className={`${
        showMenu ? " block" : "hidden"
      } bg-white z-30 fixed top-0 border-solid border-r-2 border-lightest w-[45%] md:w-[15%]  ${
        !expandPane ? "menu--reduce" : ""
      }  overflow-y-auto h-full`}
    >
      {/*----------------------------- LOGO BOX ------------------*/}
      <div
        className={`flex ${
          !expandPane ? "flex-col py-1" : "flex-row"
        } justify-between items-center outline outline-2 outline-lightest w-full px-3`}
      >
        <Link
          to="/"
          className={`h-16 p-2 block max-w-[140px] ${
            !expandPane ? "w-10" : "w-full"
          } `}
        >
          <img
            src={expandPane ? logo : icon}
            className="h-full w-full object-contain "
          />
        </Link>
        <button
          onClick={() => setExpandPane(!expandPane)}
          className="bg-transparent border rounded-md p-1 text-sm border-dark text-dark w-6 h-full"
        >
          {expandPane ? (
            <i className="mr-2 fa-solid fa-angles-left"></i>
          ) : (
            <i className="mr-2 fa-solid fa-angles-right"></i>
          )}
        </button>
      </div>

      <div className="p-2 w-full">
        <div className=" border-2 border-lightest rounded-md w-full">
          <ProfileCard
            isInHeader={false}
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            handleLogout={handleLogout}
            expandPane={expandPane}
            currentPath={currentPath}
          />
        </div>
      </div>

      <div className="py-2 text-dark  p-2.5 w-full ">
        {menuItems.map(({ icon, title }) => {
          //------MENU LINKS-----
          return (
            <Link
              to={`/${title}`}
              className={`capitalize p-2 py-4  flex items-center hover:bg-lightest hover:text-lightblue hover:font-normal rounded-md my-0.5 ${
                currentPath === title
                  ? "bg-lightest text-lightblue font-normal"
                  : "bg-transparent"
              }`}
              key={title}
            >
              <div className="bg-transparent h-full">{icon}</div>
              <p className={` ml-2`}>{title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LeftPane;
