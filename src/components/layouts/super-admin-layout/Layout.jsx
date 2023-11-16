import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import LeftPane from "./LeftPane";

const Layout = ({ children }) => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(true);
  const [expandPane, setExpandPane] = useState(false);
  return (
    <div className="bg-lightest p-0 relative flex min-h-screen z-0">
      <LeftPane
        currentPath={location.pathname.substring(1, location.pathname.length)}
        showMenu={showMenu}
        expandPane={expandPane}
        setExpandPane={setExpandPane}
      />
      <div className={`${showMenu && 'overlay'} md:hidden`} onClick={() => setShowMenu(false)}>
        <button className="absolute right-2 top-2 bg-white p-2 rounded-sm drop-shadow-md text-darkred"><i className="fa-solid fa-xmark"></i></button>
      </div>
      

      <div
        className={`${
          !expandPane
            ? "md:w-[calc(100%-90px)] md:left-[90px]"
            : " md:w-[85%] md:left-[15%]"
        } pt-16 relative top-0 min-h-full h-max  ${
          showMenu ? "" : "menu--expand"
        } w-[100%] left-0 `}
      >
        <Header
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          expandPane={expandPane}
        currentPath={location.pathname.substring(1, location.pathname.length)}
        />
        {children}
      </div>
    </div>
  );
};

export default Layout;
