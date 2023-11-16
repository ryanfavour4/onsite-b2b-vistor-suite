import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/carrotsuite.png";
import icon from "../../../assets/icon.png";
import { useEffect, useState } from "react";
import getUrlFromTitle from "../../../utils/getUrlFromTitle";
import ProfileCard from "./ProfileCard";
import { logout } from "../../../features/authSlice";
import { useDispatch } from "react-redux";
import useOutsideListener from "../../../hooks/useOutsideListener";
import { useRef } from "react";

const menuItems = [
  { icon: <i className="mr-2 fa-solid fa-house-user"></i>, title: "dashboard" },
  { icon: <i className="mr-2 fa-solid fa-users"></i>, title: "visitors" },
  { icon: <i className="mr-2 fa-solid fa-user-tie"></i>, title: "staff" },
  {
    icon: <i className="mr-2 fa-solid fa-envelope-open-text"></i>,
    title: "invitees",
  },
  {
    icon: <i className="mr-2 fa-solid fa-message"></i>,
    title: "purpose-of-visits",
  },
  { icon: <i className="mr-2 fa-solid fa-gear"></i>, title: "settings" },
  { icon: <i className="mr-2 fa-solid fa-calendar"></i>, title: "events" },
];

const visitorsMenuItems = [
  {
    icon: <i className="mr-2 fa-solid fa-address-book"></i>,
    title: "visitor log",
  },
  {
    icon: <i className="mr-2 fa-solid fa-address-book"></i>,
    title: "directory",
  },
  {
    icon: <i className="mr-2 fa-solid fa-users-slash"></i>,
    title: "blacklist",
  },
];
const settingsMenuItems = [
  {
    icon: <i className="mr-2 fa-solid fa-gears"></i>,
    title: "general settings",
  },
  { icon: <i className="mr-2 fa-solid fa-mobile"></i>, title: "mobile" },
  {
    icon: <i className="mr-2 fa-solid fa-person-walking"></i>,
    title: "sign in flow",
  },
  {
    icon: <i className="mr-2 fa-solid fa-location-pin"></i>,
    title: "location",
  },
  {
    icon: <i className="mr-2 fa-solid fa-key"></i>,
    title: "api-key",
  },
  {
    icon: <i className="mr-2 fa-solid fa-bell"></i>,
    title: "notifications",
  },
  {
    icon: <i className="mr-2 fa-solid fa-person-circle-check"></i>,
    title: "check in fields",
  },
  {
    icon: <i className="mr-2 fa-solid fa-desktop"></i>,
    title: "welcome screen",
  },
  {
    icon: <i className="mr-2 fa-solid fa-toolbox"></i>,
    title: "configurations",
  },
  { icon: <i className="mr-2 fa-brands fa-black-tie"></i>, title: "roles" },
  {
    icon: <i className="mr-2 fa-solid fa-desktop"></i>,
    title: "exhibition mode",
  },
  {
    icon: <i className="fa-solid fa-comments"></i>,
    title: "message templates",
  },
];
const eventsMenuItems = ["list events", "attendees"];

const LeftPane = ({ currentPath, showMenu, expandPane, setExpandPane }) => {
  const [showOptions, setShowOptions] = useState(false);

  const [showVisitorsMenu, setShowVisitorsMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showEventsMenu, setShowEventsMenu] = useState(false);

  const [scrollLeftPane, setScrollLeftPane] = useState(false);

  const visitorsMenuRef = useRef(null);
  const settingsMenuRef = useRef(null);
  const eventsMenuRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const location = useLocation();

  useOutsideListener(visitorsMenuRef, () => setShowVisitorsMenu(false));
  useOutsideListener(settingsMenuRef, () => setShowSettingsMenu(false));
  useOutsideListener(eventsMenuRef, () => setShowEventsMenu(false));

  useEffect(() => {
    setShowEventsMenu(false);
    setShowSettingsMenu(false);
    setShowVisitorsMenu(false);
  }, [location]);

  useEffect(() => {
    if (showVisitorsMenu || showSettingsMenu || showEventsMenu) {
      setScrollLeftPane(true);
    } else {
      setScrollLeftPane(false);
    }
  }, [showEventsMenu, showSettingsMenu, showVisitorsMenu]);

  return (
    <div
      className={` z-30 ${showMenu ? " block" : "hidden"
        } bg-white  h top-0   border-solid border-r-2 border-lightest w-[45%] md:w-[15%]  ${!expandPane ? "menu--reduce" : "fixed h-full overflow-y-auto"
        } ${scrollLeftPane && !expandPane
          ? "absolute min-h-max h-full"
          : "fixed min-h-full"
        }`}
    >
      {/*----------------------------- LOGO BOX ------------------*/}
      <div
        className={`flex ${!expandPane ? "flex-col py-1" : "flex-row"
          } justify-between items-center outline outline-2 outline-lightest w-full px-3`}
      >
        <Link to="/" className={`h-16 p-2 block max-w-[140px] `}>
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

      <div className="py-2 text-dark  p-2.5 w-full">
        {menuItems.map(({ icon, title }) => {
          if (title === "visitors") {
            return (
              //---------------------- VISITOR BUTTON --------------------------
              <div key={title} className="my-0.5" ref={visitorsMenuRef}>
                <div
                  className={`capitalize p-2 py-4 ${showVisitorsMenu && "bg-lightest text-lightblue"
                    } flex items-center hover:bg-lightest font-light hover:font-normal outline-none border-none w-full cursor-pointer rounded-md hover:text-lightblue relative  ${visitorsMenuItems.includes(currentPath)
                      ? "bg-lightest"
                      : "bg-transparent"
                    }`}
                  key={title}
                  onClick={() => {
                    setShowVisitorsMenu(!showVisitorsMenu);
                    setShowSettingsMenu(false);
                    setShowEventsMenu(false);
                  }}
                >
                  <button
                    className={`bg-transparent h-full ${showVisitorsMenu && !expandPane && "hidden"
                      } `}
                    title={title}
                  >
                    {icon}
                  </button>
                  <p className={`block mx-2`}>{title}</p>
                  {showVisitorsMenu && !expandPane && (
                    <>
                      <button className={`bg-transparent h-full `}>
                        {icon}
                      </button>
                      <p
                        className={`!block absolute left-[65px] text-white font-semibold p-2.5 rounded-md bg-lightblue`}
                      >
                        {title}
                      </p>
                    </>
                  )}

                  <div className={`${expandPane ? "block" : "hidden"}`}>
                    {showVisitorsMenu ? (
                      <button className=" mr-2">
                        <i className="mr-2 fa-solid fa-chevron-up"></i>
                      </button>
                    ) : (
                      <button className=" mr-2">
                        <i className="mr-2 fa-solid fa-chevron-down"></i>
                      </button>
                    )}
                  </div>
                </div>

                {/*---------------- VISITOR MENU---------------- */}
                {showVisitorsMenu && (
                  <div
                    className={` border-light border-solid relative  border-t-[1px] border-b-[2px] px-2 md:p-4 pl-4 md:pl-10  ${expandPane ? "" : "submenus--card"
                      }`}
                  >
                    {visitorsMenuItems.map(({ icon, title }) => {
                      return (
                        <Link
                          to={`/${getUrlFromTitle(title)}`}
                          className={`capitalize p-1.5 md:p-3 flex items-center hover:bg-lightest font-light hover:font-normal hover:text-lightblue rounded-md my-0.5 w-full ${currentPath === getUrlFromTitle(title)
                              ? "bg-lightest text-lightblue font-normal"
                              : "bg-transparent"
                            }`}
                          key={title}
                        >
                          {icon}
                          <p className="ml-2">{title}</p>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          if (title === "settings") {
            return (
              //---------------------- settings BUTTON --------------------------
              <div
                key={title}
                className="my-0.5 overflow-x-visible relative "
                ref={settingsMenuRef}
              >
                <div
                  className={`capitalize px-2 py-4 ${showSettingsMenu && "bg-lightest text-lightblue"
                    } flex items-center hover:bg-lightest font-light hover:font-normal outline-none border-none w-full cursor-pointer rounded-md hover:text-lightblue relative  ${settingsMenuItems.includes(currentPath)
                      ? "bg-lightest"
                      : "bg-transparent"
                    }`}
                  key={title}
                  onClick={() => {
                    setShowSettingsMenu(!showSettingsMenu);
                    setShowVisitorsMenu(false);
                    setShowEventsMenu(false);
                  }}
                >
                  <button
                    className={`bg-transparent h-full ${showSettingsMenu && !expandPane && "hidden"
                      } `}
                    title={title}
                  >
                    {icon}
                  </button>
                  <p className={`block mx-2 `}>{title}</p>
                  {showSettingsMenu && !expandPane && (
                    <>
                      <button className={`bg-transparent h-full `}>
                        {icon}
                      </button>
                      <p
                        className={`!block absolute left-[65px] text-white font-semibold p-2.5 rounded-md bg-lightblue`}
                      >
                        {title}
                      </p>
                    </>
                  )}

                  <div className={`${expandPane ? "block" : "hidden"}`}>
                    {showSettingsMenu ? (
                      <button className=" mr-2">
                        <i className="mr-2 fa-solid fa-chevron-up"></i>
                      </button>
                    ) : (
                      <button className=" mr-2">
                        <i className="mr-2 fa-solid fa-chevron-down"></i>
                      </button>
                    )}
                  </div>
                </div>

                {/*---------------- SETTINGS MENU---------------- */}
                {showSettingsMenu && (
                  <div
                    className={` border-light border-solid relative  border-t-[1px] border-b-[2px] px-2 md:p-4 pl-4 md:pl-10 ${expandPane ? "" : "submenus--card "
                      }`}
                  >
                    {settingsMenuItems.map(({ title, icon }) => {
                      return (
                        <Link
                          to={`/settings/${getUrlFromTitle(title)}`}
                          className={`capitalize p-1.5 md:p-3 flex items-center hover:bg-lightest font-light hover:font-normal hover:text-lightblue rounded-md my-0.5 w-full ${currentPath.includes(getUrlFromTitle(title))
                              ? "bg-lightest text-lightblue font-normal"
                              : "bg-transparent"
                            }`}
                          key={title}
                        >
                          {icon}
                          <p className="ml-2">{title}</p>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          if (title === "events") {
            return (
              //---------------------- EVENTS BUTTON --------------------------
              <div key={title} className="my-0.5 " ref={eventsMenuRef}>
                <div
                  className={`capitalize px-2 py-4 ${showEventsMenu && "bg-lightest text-lightblue"
                    } flex items-center hover:bg-lightest font-light hover:font-normal outline-none border-none w-full cursor-pointer rounded-md hover:text-lightblue relative  ${eventsMenuItems.includes(currentPath)
                      ? "bg-lightest"
                      : "bg-transparent"
                    }`}
                  key={title}
                  onClick={() => {
                    setShowEventsMenu(!showEventsMenu);
                    setShowVisitorsMenu(false);
                    setShowSettingsMenu(false);
                  }}
                >
                  <button
                    className={`bg-transparent h-full ${showEventsMenu && !expandPane && "hidden"
                      } `}
                    title={title}
                  >
                    {icon}
                  </button>
                  <p className={`block mx-2`}>{title}</p>
                  {showEventsMenu && !expandPane && (
                    <>
                      <button className={`bg-transparent h-full `}>
                        {icon}
                      </button>
                      <p
                        className={`!block absolute left-[65px] text-white font-semibold p-2.5 rounded-md bg-lightblue`}
                      >
                        {title}
                      </p>
                    </>
                  )}

                  <div className={`${expandPane ? "block" : "hidden"}`}>
                    {showEventsMenu ? (
                      <button className=" mr-2">
                        <i className="mr-2 fa-solid fa-chevron-up"></i>
                      </button>
                    ) : (
                      <button className=" mr-2">
                        <i className="mr-2 fa-solid fa-chevron-down"></i>
                      </button>
                    )}
                  </div>
                </div>

                {/*---------------- EVENTS MENU---------------- */}
                {showEventsMenu && (
                  <div
                    className={` border-light border-solid relative  border-t-[1px] border-b-[2px] px-2 md:p-4 pl-4 md:pl-10 ${expandPane ? "" : "submenus--card "
                      }`}
                  >
                    {eventsMenuItems.map((option) => {
                      return (
                        <Link
                          to={`/events/${getUrlFromTitle(option)}`}
                          className={`capitalize p-1.5 md:p-3 flex items-center hover:bg-lightest font-light hover:font-normal hover:text-lightblue rounded-md my-0.5 w-full ${currentPath.includes(getUrlFromTitle(option))
                              ? "bg-lightest text-lightblue font-normal"
                              : "bg-transparent"
                            }`}
                          key={option}
                        >
                          <p className="ml-2">{option}</p>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          // OTHER MENU LINKS
          return (
            <Link
              to={`/${title}`}
              className={`capitalize p-2 py-4 md:p-4 flex items-center hover:bg-lightest hover:text-lightblue hover:font-normal rounded-md my-0.5 ${currentPath === title
                  ? "bg-lightest text-lightblue font-normal"
                  : "bg-transparent"
                }`}
              key={title}
              title={title}
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
