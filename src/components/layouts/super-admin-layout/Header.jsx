import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/authSlice";
import ProfileCard from "./ProfileCard";

const Header = ({ setShowMenu, showMenu, expandPane, currentPath }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <header
      className={`bg-white z-20 fixed top-0 right-0 ${
        !expandPane ? "md:w-[calc(100%-90px)]" : " md:w-[85%]"
      } flex justify-between items-center px-4 h-16 text-dark font-semibold shadow-sm w-full ${
        showMenu ? "" : "menu--expand"
      }`}
    >
      <button
        className="mr-2 cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      <input
        type="text"
        placeholder="Search here"
        className="outline-none border-solid border-dark border-[1px] p-2 rounded-md text-dark  max-w-[100px] md:max-w-none md:flex-[0.5] shrink focus:flex-1 block focus:md:flex-[0.5] text-xs"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex items-center">
        <div className="flex p-1">
          <button className="bg-transparent">
            <i className="fa-solid fa-inbox"></i>
          </button>
          <button
            className="bg-transparent ml-3"
            onClick={() => setShowNotification(!showNotification)}
          >
            <i class="fa-regular fa-bell"></i>
          </button>
        </div>

        <ProfileCard
          isInHeader={true}
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          handleLogout={handleLogout}
          currentPath={currentPath}
        />
        {showNotification && <NotificationPopup />}
      </div>
    </header>
  );
};

export default Header;
