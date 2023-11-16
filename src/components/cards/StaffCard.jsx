import React, { useRef, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useOutsideListener from "../../hooks/useOutsideListener";
import avatar from "../../assets/defaultAvatar.png";
import Modal, { useModal } from "../modals/MODAL_CARROT_SUITE/Modal";
import CloseModalBtn from "../modals/CloseModalBtn";
import { Api } from "../../axios";
import EditStaffModal from "../modals/EditStaffModal";
import DeleteStaffCard from "../modals/DeleteStaffModal";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  locationListArray,
  setLocationList,
} from "../../features/locationSlice";
import DisableModal from "../modals/DisableStaffModal";
import DisableStaffCard from "../modals/DisableStaffModal";

const StaffCard = ({ staff, refresh, setRefresh }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const locationList = useSelector(locationListArray);
  const { openModal, isModalClosed, closeModal } = useModal();
  const dispatch = useDispatch();
  const [ModalChildren, setModalChildren] = useState(
    <DeleteStaffCard
      refresh={refresh}
      setRefresh={setRefresh}
      staffId={staff.id}
      closeModal={closeModal}
    />
  );
  // console.log(staff.is_available);

  useEffect(() => {
    // //*_________________________FETCH BRANCH______________________//
    Api.get("settings/branch")
      .then((res) => {
        dispatch(setLocationList(res.data.data.branches));
        // console.log(locationList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useOutsideListener(wrapperRef, () => setShowDropdown(false));

  const viewStaff = (id, staffId) => {
    navigate(`/staff/${id}`);
  };

  const editStaff = (id, staffId) => {
    openModal();
    setModalChildren(
      <EditStaffModal
        refresh={refresh}
        setRefresh={setRefresh}
        id={id}
        staffId={staffId}
        closeModal={closeModal}
      />
    );
  };

  const deleteStaff = (id, staffId) => {
    openModal();
    setModalChildren(
      <DeleteStaffCard
        refresh={refresh}
        setRefresh={setRefresh}
        staffId={staffId}
        id={id}
        closeModal={closeModal}
      />
    );
  };
  const disableStaff = (id, staffId) => {
    // console.log("first", id, staff);

    openModal();
    setModalChildren(
      <DisableStaffCard
        refresh={refresh}
        setRefresh={setRefresh}
        staffId={staffId}
        id={id}
        closeModal={closeModal}
        status={staff.is_available}
      />
    );
  };

  const itemsArr = [
    {
      title: "view",
      func: viewStaff,
    },
    {
      title: "edit",
      func: editStaff,
    },
    {
      title: "delete",
      func: deleteStaff,
    },
    {
      title: "enable/disable",
      func: disableStaff,
    },
  ];

  return (
    <>
      <div className=" bg-white border border-light p-6 rounded-md drop-shadow-md">
        <div className="text-lightblue text-lg flex justify-between">
          <p
            className={`${!staff.is_available ? "text-darkred" : "text-green"
              } capitalize font-semibold`}
          >
            {staff.is_available ? "in" : "out"}
          </p>
          <div
            className="w-36 relative drop-shadow-lg rounded-2xl min-w-min"
            ref={wrapperRef}
          >
            <button
              onClick={() => {
                setShowDropdown(!showDropdown);
              }}
              key={"select"}
              className={`w-full p-1 text-sm px-4 rounded-2xl relative shadow-md flex justify-between items-center uppercase bg-darkred text-white`}
            >
              <span className="mx-1">ACTIONS</span>
              {!showDropdown ? (
                <i className="fa-solid fa-chevron-down"></i>
              ) : (
                <i className="fa-solid fa-chevron-up"></i>
              )}
            </button>

            <div
              className={`w-36 absolute top-[30px] shadow-md right-0 left-0 rounded-md border border-t-0 border-light ${showDropdown ? "block" : "hidden"
                } bg-white p-1 shadow-md z-10`}
            >
              {itemsArr.map(({ title, func }, index) => (
                <button
                  onClick={() => func(staff.id, staff.staff_ID)}
                  key={title}
                  className={`block min-w-max w-full p-1 border-solid border-light ${index !== itemsArr.length - 1
                      ? "border-b-[1px]"
                      : "border-b-0"
                    } capitalize text-[14px] hover:font-semibold text-dark flex items-center text-center`}
                >
                  {title}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="h-20 w-20 rounded-full mx-auto my-4 border border-light">
          <img
            src={staff.avatar || avatar}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex items-center text-sm text-light font-light mx-auto w-max">
          <p className="text-dark uppercase">{staff.id}</p>
          <i className="fa-solid fa-angle-right mx-1 text-[10px]"></i>
          <p className="text-lightblue font-semibold capitalize text-md mx-1">
            {staff.first_name} {staff.last_name}
          </p>
        </div>
        <h3 className="text-center text-dark my-2 mb-4 font-light text-md">
          {staff.position}
        </h3>
        <div className="my-2 px-6">
          {/* ________________________ ICONS ________________________ */}
          <p className="flex items-center my-1.5">
            <i className={`text-lightblue fa-solid fa-phone mr-4 text-xs`}></i>
            <span className="text-dark font-light text-sm capitalize">
              {staff.phone_number}
            </span>
          </p>
          <p className="flex items-center my-1.5 breaker">
            <i className={`text-lightblue fa-solid fa-at mr-4 text-xs`}></i>
            <span className="text-dark font-light text-sm capitalize breaker">
              {staff.email}
            </span>
          </p>
          <p className="flex items-center my-1.5">
            <i className={`text-lightblue fa-regular fa-user mr-4 text-xs`}></i>
            <span className="text-dark font-light text-sm capitalize">
              {staff.department}
            </span>
          </p>
        </div>
      </div>

      <Modal closeModal={closeModal} isModalClosed={isModalClosed}>
        {ModalChildren}
      </Modal>
    </>
  );
};

export default StaffCard;
