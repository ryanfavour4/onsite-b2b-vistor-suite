import { useEffect, useLayoutEffect, useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "../../../assets/defaultAvatar.png";
import useOutsideListener from "../../../hooks/useOutsideListener";
import { useLocation } from "react-router-dom";
import getUrlFromTitle from "../../../utils/getUrlFromTitle";
import { useDispatch, useSelector } from "react-redux";
import { toggleStaffInviteOnlyMode } from "../../../services/settings/general";
import { changeStaffInviteOnlyMode, changeCompanyInviteOnlyMode } from "../../../features/authSlice";
import SmallSpinner from "../../SmallSpinner";
import ToggleSwitch from "../../toggle-switch/ToggleSwitch";
import { Api } from "../../../axios";

const ProfileCard = ({
  isInHeader,
  showOptions,
  setShowOptions,
  handleLogout,
  expandPane,
  currentPath,
}) => {
  const profileMenuOptions = ["profile", "billing", "integrations"];
  const location = useLocation();
  const usersPlan = localStorage.getItem("User Plan");
  const usersCurrent = JSON.parse(localStorage.getItem("User Current"));
  const [inviteModeOn, setInviteModeOn] = useState((Number(usersCurrent?.user?.company_invite_mode) === 1) ? true : false)
  const [currentUserData, setCurrentUserData] = useState(false)

  useEffect(() => {
    setInviteModeOn((Number(usersCurrent?.user?.company_invite_mode) === 1) ? true : false);
  }, [location, usersCurrent, usersPlan, inviteModeOn])
  const wrapperRef = useRef(null);

  const {
    userData: { id, avatar, first_name, last_name },
    staffInviteOnlyMode,
  } = useSelector((state) => state.auth);

  useOutsideListener(wrapperRef, () => setShowOptions(false));
  useEffect(() => {
    setShowOptions(false);
  }, [location]);

  const dispatch = useDispatch();

  const [toggling, setToggling] = useState(false);
  const toggleInviteOnlyMode = async () => {
    const checked = !inviteModeOn
    try {
      setToggling(true);
      await toggleStaffInviteOnlyMode(checked, id).then(_res => {
        setInviteModeOn(checked)
        window.location.reload(true);
      });
      dispatch(changeStaffInviteOnlyMode(checked));
    } catch (error) {
      console.log(error);
    } finally {
      setToggling(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    // ?? =============== GETTING USER CURRENT PLAN TO SAVE FROM THE GENESIS OF THE PAGE ======= ??//
    const fetchPlan = async () => {
      await Api.get("/users/current").then((res) => {
        localStorage.setItem("User Current", JSON.stringify(res.data?.data));
        setCurrentUserData(Number(res.data?.data?.user?.company_invite_mode) === 1 ? true : false)
        setInviteModeOn((Number(res.data?.data.user.company_invite_mode) === 1) ? true : false);
        console.log(currentUserData);
        localStorage.setItem("User Plan", res.data?.data.plan?.plan_name);
      });
    };
    fetchPlan();
  }, [usersCurrent, usersPlan, toggling, staffInviteOnlyMode, id]);


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
          <img
            src={avatar || defaultAvatar}
            className="w-full h-full object-cover rounded-[50%]"
          />
        </div>
        <p className=" font-normal mx-2 text-black">{`${first_name} ${last_name}`}</p>
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
          className={`p-1 sm:p-2 bg-white  ${showOptions ? "block" : "hidden"
            } rounded-md shadow-2xl border-solid border-light border-t-[1px]  ${isInHeader
              ? "absolute top-12 right-1 w-[150px] "
              : "relative w-full mx-auto"
            } `}
        >
          {profileMenuOptions.map((option) => {
            return (
              option == "integrations" ? (<a href="https://carrotsuite.co/" className={`capitalize p-1.5 md:p-3 flex items-center hover:bg-lightest font-light hover:font-normal hover:text-lightblue rounded-md my-0.5 w-full ${currentPath === getUrlFromTitle(option)
                ? "bg-lightest text-lightblue font-normal"
                : "bg-transparent"
                }`} target="_blank">{option}</a>) : (
                <Link
                  to={`/${getUrlFromTitle(option)}`}
                  className={`capitalize p-1.5 md:p-3 flex items-center hover:bg-lightest font-light hover:font-normal hover:text-lightblue rounded-md my-0.5 w-full ${currentPath === getUrlFromTitle(option)
                    ? "bg-lightest text-lightblue font-normal"
                    : "bg-transparent"
                    }`}
                  key={option}
                >
                  {option}
                </Link>)
            );
          })}
          {!["Free Plan", "Basic Plan"].includes(usersPlan) && (
            <div className="flex flex-row justify-between p-1.5 items-center">
              <p
                className="text-xs font-light text-dark"
                style={{ display: "block" }}
              >
                Invite Only Mode
              </p>
              {toggling ? (
                <SmallSpinner />
              ) : (
                <ToggleSwitch
                  handleSwitch={async (checked) => {
                    return await toggleInviteOnlyMode(
                      checked
                    );
                  }}
                  isChecked={currentUserData}
                />
              )}
            </div>
          )}
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
              className={`p-1 sm:p-2 bg-white  ${showOptions ? "block" : "hidden"
                } rounded-md shadow-2xl border-solid border-light border-t-[1px]  ${isInHeader
                  ? "absolute top-12 right-1 w-[150px] "
                  : "relative w-full mx-auto"
                } `}
            >
              {profileMenuOptions.map((option) => (
                option == "integrations" ? (<a href="https://carrotsuite.co/" className={`capitalize p-1.5 md:p-3 flex items-center hover:bg-lightest font-light hover:font-normal hover:text-lightblue rounded-md my-0.5 w-full ${currentPath === getUrlFromTitle(option)
                  ? "bg-lightest text-lightblue font-normal"
                  : "bg-transparent"
                  }`} target="_blank">{option}</a>) : (
                  <Link
                    to={`/${getUrlFromTitle(option)}`}
                    className={`capitalize p-1.5 md:p-3 flex items-center hover:bg-lightest font-light hover:font-normal hover:text-lightblue rounded-md my-0.5 w-full ${currentPath === getUrlFromTitle(option)
                      ? "bg-lightest text-lightblue font-normal"
                      : "bg-transparent"
                      }`}
                    key={option}
                  >
                    {option}
                  </Link>)
              ))}
              {!["Free Plan", "Basic Plan"].includes(usersPlan) && (
                <div className="flex flex-row justify-between p-1.5 md:p-3 items-center">
                  <p
                    className="text-md font-light text-dark"
                    style={{ display: "block" }}
                  >
                    Invite Only Mode
                  </p>
                  {toggling ? (
                    <SmallSpinner />
                  ) : (
                    <ToggleSwitch
                      handleSwitch={async (checked) => {
                        return await toggleInviteOnlyMode(
                          checked
                        );
                      }}
                      isChecked={currentUserData}
                    />
                  )}
                </div>
              )}
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
                  className={`border-light border-solid relative  border-t-[1px] border-b-[2px] px-2 md:p-4 pl-4 md:pl-10 ${expandPane ? "" : "submenus--card"
                    }`}
                >
                  {profileMenuOptions.map((option) => {

                    return (
                      option == "integrations" ? (<a href="https://carrotsuite.co/" className={`capitalize p-1.5 md:p-3 flex items-center hover:bg-lightest font-light hover:font-normal hover:text-lightblue rounded-md my-0.5 w-full ${currentPath === getUrlFromTitle(option)
                        ? "bg-lightest text-lightblue font-normal"
                        : "bg-transparent"
                        }`} target="_blank">{option}</a>) : (
                        <Link
                          to={`/${getUrlFromTitle(
                            option
                          )}`}
                          className={`capitalize p-1.5 md:p-3 flex items-center hover:bg-lightest font-light hover:font-normal hover:text-lightblue rounded-md my-0.5 w-full ${currentPath ===
                            getUrlFromTitle(option)
                            ? "bg-lightest text-lightblue font-normal"
                            : "bg-transparent"
                            }`}
                          key={option}
                        >
                          <p className="ml-2">{option}</p>
                        </Link>)
                    );
                  })}
                  {!["Free Plan", "Basic Plan"].includes(usersPlan) && (
                    <div className="flex flex-row justify-between p-1.5 md:p-3 mx-2">
                      <p
                        className="text-sm font-light text-dark"
                        style={{ display: "block" }}
                      >
                        Invite Only Mode
                      </p>
                      {toggling ? (
                        <SmallSpinner />
                      ) : (
                        <ToggleSwitch
                          handleSwitch={async (
                            checked
                          ) => {
                            return await toggleInviteOnlyMode(
                              checked
                            );
                          }}
                          isChecked={currentUserData}
                        />
                      )}
                    </div>
                  )}
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
