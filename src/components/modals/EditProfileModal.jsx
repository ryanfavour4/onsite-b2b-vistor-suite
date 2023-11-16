import { useEffect, useState } from "react";
import Required from "../Required";
import SearchableDropdown from "../dropdowns/SearchableDropdown";
import CloseModalBtn from "./CloseModalBtn";
import Success from "../Success";
import ButtonSpinner from "../ButtonSpinner";
import { Api } from "../../axios";
import { toast } from "react-toastify";
import { editStaff } from "../../services/staff";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import { staffListArray } from "../../features/staffSlice";

const EditProfileModal = ({
  showModal,
  setShowModal,
  data,
  refresh,
  setRefresh,
}) => {

  const [showSuccess, setShowSuccess] = useState(false);
  const [firstname, setFirstname] = useState(data.first_name);
  const [lastname, setLastname] = useState(data.last_name);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone_number);
  const [address, setAddress] = useState(data.address);
  const [assistant, setAssistant] = useState(data.assistant);
  const [staffLocation, setStaffLocation] = useState(data?.location);
  const [staffPosition, setStaffPosition] = useState(data?.position);
  const [staffDepartment, setStaffDepartment] = useState(data?.department);
  const [submitting, setSubmitting] = useState(false);
  const [staffPhoto, setStaffPhoto] = useState(null);

  const { data:staffs, loading, error } = useFetch("settings/get-all-staffs", [
    refresh
  ]);
  const staffPositionOptions = useFetch("settings/position", [showModal]);
  const staffLocationOptions = useFetch("settings/view-location", [showModal]);
  const staffDepartmentOptions = useFetch("settings/get-department", [showModal]);
  console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData();
    formData.append("profilePicture", staffPhoto);
    editStaff(data.id, {
      email: email,
      last_name: lastname,
      first_name: firstname,
      phone_number: phone,
      staff_position: staffPosition,
      location: staffLocation,
      department: staffDepartment,
      address: address,
      // assistant: assistant
    }).then(res => {
      setShowSuccess(true);
    })
    if (staffPhoto) {
      Api.put(`users/edit-profile/picture`, formData).then(res => {
        toast.success("Profile details updated successfully!");
        setSubmitting(false);
      })
        .then((res) => {
          window.location.reload(false);
        })
        .catch((err) => {
        });
    }
    setShowSuccess(true);
  };

  return (
    <div className={`${showModal ? "modal" : "hidden"}`}>
      {showSuccess ? (
        <Success
          message={"Profile details updated successfully!"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ) : (
        <form onSubmit={handleSubmit} className="relative modal--content h-32">
          <CloseModalBtn setShowModal={setShowModal} />

          <div className="mb-3">
            <label htmlFor="privateNote" className="font-semibold text-black">
              Profile photo
            </label>
            <input
              type="file"
              // value={staffPhoto}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setStaffPhoto(e.target.files[0])}
              placeholder="upload staff photo"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="firstname"
              className="font-semibold text-black capitlize "
            >
              First name
            </label>
            <input
              type="text"
              value={firstname}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="Enter firstname"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastname" className="font-semibold text-black ">
              Last name
            </label>
            <input
              type="text"
              value={lastname}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Enter lastname"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="font-semibold text-black ">
              Email address
            </label>
            <input
              type="email"
              value={email}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="font-semibold text-black ">
              Phone number
            </label>
            <input
              type="tel"
              value={phone}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="staffPosition"
              className="font-semibold text-black "
            >
              Staff position
            </label>
            <select
              value={staffPosition}
              onChange={(e) => {
                setStaffPosition(e.target.value);
              }}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
            >
              <option value="">select position</option>
              {staffPositionOptions?.data?.data.map((val) => {
                return (
                  <option value={val.id} key={val.id}>
                    {val.position}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="font-semibold text-black ">
              Location
            </label>
            <select
              value={staffLocation}
              onChange={(e) => setStaffLocation(e.target.value)}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
            >
              <option value="">select position</option>
              {staffLocationOptions?.data?.data.locations.map((val) => {
                return (
                  <option value={val.id} key={val.id}>
                    {val.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="department
            " className="font-semibold text-black ">
              Department
            </label>
            <select
              value={staffDepartment}
              onChange={(e) => setStaffDepartment(e.target.value)}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
            >
              <option value="">Select Department</option>
              {staffDepartmentOptions.data?.data.map((val) => {
                return (
                  <option value={val.id} key={val.id}>
                    {val.department}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="assistants" className="font-semibold text-black ">
              Assistants
            </label>
            <select
              value={assistant}
              onChange={(e) => setAssistant(e.target.value)}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
            >
              <option value="">Select Assistants</option>
              {staffs?.staffs.map((val) => {
                return (
                  <option value={val.id} key={val.id}>
                    {val.first_name}{" "}
                    {val.last_name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-3">
            <label
              htmlFor="staffPosition"
              className="font-semibold text-black "
            >
              Address
            </label>
            <input
              type="text"
              value={address}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
            />
          </div>

          {submitting ? (
            <ButtonSpinner />
          ) : (
            <button
              type="submit"
              className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue mt-1 text-sm"
              onClick={handleSubmit}
            >
              Update profile details
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default EditProfileModal;
