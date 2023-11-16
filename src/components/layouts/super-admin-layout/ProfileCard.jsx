import { useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "../../../assets/defaultAvatar.png";
import useOutsideListener from "../../../hooks/useOutsideListener";
import { useLocation } from "react-router-dom";
import getUrlFromTitle from "../../../utils/getUrlFromTitle";
import { useSelector } from "react-redux";

const ProfileCard = ({
  isInHeader,
  showOptions,
  setShowOptions,
  handleLogout,
  expandPane,
  currentPath,
}) => {
  const profileMenuOptions = ["profile", "billing"];

  const location = useLocation();

  const wrapperRef = useRef(null);

  const {userData: {avatar, name}} = useSelector(state => state.auth)

  useOutsideListener(wrapperRef, () => setShowOptions(false));
  useEffect(() => {
    setShowOptions(false);
  }, [location]);

  return (
    <div
      className="flex relative flex-col text-xs md:text-base z-30"
      ref={wrapperRef}
    >
      <div
        className="hover:cursor-pointer flex items-center p-3"
        onClick={() => setShowOptions(!showOptions)}
      >
        <div className="rounded-[50%] bg-lightblue  h-8 w-8 min-w-[32px]">
          <img src={avatar || defaultAvatar} className="w-full h-full object-cover rounded-[50%]" />
        </div>
        <p className=" font-normal mx-2 text-black">{`${name}`}</p>
        <button className="w-4 rounded-md p-0.5 ">
          {showOptions ? (
            <i className="fa-solid fa-chevron-up"></i>
          ) : (
            <i className="fa-solid fa-chevron-down"></i>
          )}
        </button>
      </div>

      {isInHeader ? (
        <div
          className={`p-1 sm:p-2 bg-white  ${
            showOptions ? "block" : "hidden"
          } rounded-md shadow-2xl border-solid border-light border-t-[1px]  ${
            isInHeader
              ? "absolute top-12 right-1 w-[150px] "
              : "relative w-full mx-auto"
          } `}
        >
          {profileMenuOptions.map((option) => (
            <Link
              to={`/${getUrlFromTitle(option)}`}
              className={`capitalize p-1.5 md:p-3 flex items-center hover:bg-lightest font-light hover:font-normal hover:text-lightblue rounded-md my-0.5 w-full ${
                currentPath === getUrlFromTitle(option)
                  ? "bg-lightest text-lightblue font-normal"
                  : "bg-transparent"
              }`}
              key={option}
            >
              {option}
            </Link>
          ))}
          <button
            className=" outline-none flex items-center p-1 sm:p-2 text-[14px] w-full hover:font-normal font-light hover:bg-lightred rounded-md"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-arrow-right-from-bracket mr-0.5 sm:mr-1 md:mr-2"></i>
            Logout
          </button>
        </div>
      ) : (
        <>
          {expandPane ? (
            <div
              className={`p-1 sm:p-2 bg-white  ${
                showOptions ? "block" : "hidden"
              } rounded-md shadow-2xl border-solid border-light border-t-[1px]  ${
                isInHeader
                  ? "absolute top-12 right-1 w-[150px] "
                  : "relative w-full mx-auto"
              } `}
            >
              {profileMenuOptions.map((option) => (
                <Link
                  to={`/${getUrlFromTitle(option)}`}
                  className={`capitalize p-1.5 md:p-3 flex items-center hover:bg-lightest font-light hover:font-normal hover:text-lightblue rounded-md my-0.5 w-full ${
                    currentPath === getUrlFromTitle(option)
                      ? "bg-lightest text-lightblue font-normal"
                      : "bg-transparent"
                  }`}
                  key={option}
                >
                  {option}
                </Link>
              ))}
              <button
                className=" outline-none flex items-center p-1 sm:p-2 text-[14px] w-full hover:font-normal font-light hover:bg-lightred rounded-md"
                onClick={handleLogout}
              >
                <i className="fa-solid fa-arrow-right-from-bracket mr-0.5 sm:mr-1 md:mr-2"></i>
                Logout
              </button>
            </div>
          ) : (
            <div className="my-0.5">
              {/*---------------- profile options MENU---------------- */}
              {showOptions && (
                <div
                  className={`border-light border-solid relative  border-t-[1px] border-b-[2px] px-2 md:p-4 pl-4 md:pl-10 ${
                    expandPane ? "" : "visitor--menu "
                  }`}
                >
                  {profileMenuOptions.map((option) => {
                    return (
                      <Link
                        to={`/${getUrlFromTitle(option)}`}
                        className={`capitalize p-1.5 md:p-3 flex items-center hover:bg-lightest font-light hover:font-normal hover:text-lightblue rounded-md my-0.5 w-full ${
                          currentPath === getUrlFromTitle(option)
                            ? "bg-lightest text-lightblue font-normal"
                            : "bg-transparent"
                        }`}
                        key={option}
                      >
                        <p className="ml-2">{option}</p>
                      </Link>
                    );
                  })}
                  <button
                    className=" outline-none flex items-center p-1 sm:p-2 text-[14px] w-full hover:font-normal font-light hover:bg-lightred rounded-md  min-w-full"
                    onClick={handleLogout}
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket mr-0.5 sm:mr-1 md:mr-2"></i>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default ProfileCard;
