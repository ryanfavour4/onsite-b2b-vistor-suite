import { useState, useEffect } from "react";
import Required from "../Required";
import CloseModalBtn from "./CloseModalBtn";
import Success from "../Success";
import { toast } from "react-toastify";
import { Api } from "../../axios";
import { useSelector } from "react-redux";
import { staffListArray } from "../../features/staffSlice";
import { departmentListArray } from "../../features/departmentSlice";
import { positionListArray } from "../../features/positionSlice";
import { locationListArray } from "../../features/locationSlice";

const EditStaffModal = ({ refresh, setRefresh, id, staffId, closeModal }) => {
  const staffList = useSelector(staffListArray);
  const position = useSelector(positionListArray);
  const department = useSelector(departmentListArray);
  const location = useSelector(locationListArray);
  const [submitting, setSubmitting] = useState(false);
  // const [staffPhoto, setStaffPhoto] = useState(null);
  const [countryCodes] = useState(["+234", "+212", "+27", "+251"]);
  const [available] = useState([true, false]);
  const [staff, setStaff] = useState(
    staffList.find((staff) => staff.id === id)
  );
  const [userLocation, setUserLocation] = useState(
    location?.find((location) => {
      return location.id == staff.office_location;
    })
  );

  const handleInputChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setSubmitting(true);
    setRefresh(!refresh);

    const getPositionId = () => {
      return position?.find((post) => post.position == staff.position);
    };

    const getDepartmentId = () => {
      return department?.find((dept) => dept.department == staff.department);
    };

    const desiredStaffData = {
      first_name: staff.first_name,
      last_name: staff.last_name,
      staff_ID: staff.staff_ID,
      phone_number: staff.phone_number,
      email: staff.email,
      department: getDepartmentId()?.id,
      position: getPositionId()?.id,
      address: staff.address,
      office_location: Number(userLocation),
      is_available: JSON.parse(staff.is_available),
    };
    
    // const formData = new FormData();
    // formData.append("profilePicture", staffPhoto);
    // await Api.put(`users/edit-profile/picture`, formData)
    // .then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err);
    // })

    await Api.put(`settings/update-staff/${id}`, desiredStaffData)
      .then((res) => {
        toast.success(res.data.message || "Staff Updated Successfully!");
        closeModal();
        setSubmitting(false);
        setRefresh(!refresh);
        window.location.reload(false);
      })
      .catch((err) => {
        closeModal();
        setSubmitting(false);
        toast.error(err.message || "Something went wrong!");
      });
  };

  const showSuccess = false;

  return (
    <div className="bg-white self-center max-w-[36rem] p-4">
      {showSuccess ? (
        <Success
          message={"Staff details updated successfully!"}
          // setShowSuccess={setShowSuccess}
          // setShowParentModal={setShowModal}
        />
      ) : (
        <form onSubmit={handleSubmit} className="bg-white max-w-lg m-auto">
          <CloseModalBtn setShowModal={closeModal} />

          {/* <div className="mb-3">
            <label htmlFor="privateNote" className="font-semibold text-black">
              Staff photo
            </label>
            <input
              type="file"
              // value={staffPhoto}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setStaffPhoto(e.target.files[0])}
              placeholder="upload staff photo"
            />
          </div> */}

          <div className="mb-4 flex">
            <div>
              <label htmlFor="name" className="font-semibold text-black">
                First Name
              </label>
              <input
                type="text"
                value={staff.first_name}
                name="first_name"
                onChange={(e) => handleInputChange(e)}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                placeholder="Enter first name"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="name" className="font-semibold text-black">
                Last Name
              </label>
              <input
                type="text"
                value={staff.last_name}
                name="last_name"
                onChange={(e) => handleInputChange(e)}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="staffId" className="font-semibold text-black">
              Staff ID
            </label>
            <input
              type="text"
              value={staff.staff_ID}
              name="staff_ID"
              onChange={(e) => handleInputChange(e)}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              placeholder="Enter staff ID"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="font-semibold text-black">
              Phone number
              <Required />
            </label>
            <div className="flex">
              <select
                // onChange={() => setCountryCode(e.target.value)}
                className="mr-2 rounded-lg p-2 bg-transparent border-solid border-[1px] border-lightestblue focus:border-blue block"
              >
                {countryCodes.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                value={staff.phone_number}
                name="phone_number"
                onChange={(e) => handleInputChange(e)}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                placeholder="123 4567 89"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="font-semibold text-black">
              Email
            </label>
            <input
              type="email"
              value={staff.email}
              name="email"
              onChange={(e) => handleInputChange(e)}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              placeholder="Enter staff email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="department" className="font-semibold text-black">
              Department
            </label>
            <select
              value={staff.department}
              name="department"
              onChange={(e) => handleInputChange(e)}
              id="department"
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full capitalize"
            >
              {department?.map((value) => (
                <option value={value.department} key={value.id}>
                  {value.department}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="position" className="font-semibold text-black">
              Position
            </label>
            <select
              name="position"
              id="position"
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full capitalize"
              value={staff.position}
              onChange={(e) => handleInputChange(e)}
            >
              {position?.map((value) => (
                <option value={value.position} key={value.id}>
                  {value.position}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="font-semibold text-black">
              Address
            </label>

            <input
              type="text"
              value={staff.address}
              name="address"
              onChange={(e) => handleInputChange(e)}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              placeholder="Enter staff address"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="officeLocation"
              className="font-semibold text-black"
            >
              Office location
            </label>
            <select
              name="office_location"
              id="officeLocation"
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full capitalize"
              value={userLocation?.id}
              onChange={(e) => setUserLocation(e.target.value)}
            >
              {location?.map((value) => (
                <option value={value.id} key={value.id}>
                  {value.branch_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="is_available" className="font-semibold text-black">
              Availability
            </label>
            <select
              name="is_available"
              id="is_available"
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full capitalize"
              value={staff.is_available}
              onChange={(e) => handleInputChange(e)}
            >
              {available?.map((value) => (
                <option value={value} key={value}>
                  {value ? "Available" : "Not Available"}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="mb-4">
            <label htmlFor="assistant" className="font-semibold text-black">
              Assistant++
            </label>
            <select
              name=""
              id="assistant"
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full capitalize"
              value={firstAssistant}
              onChange={(e) => setFirstAssistant(e.target.value)}
            >
              {assistants?.map(({ value, label }) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
          </div> */}

          {submitting ? (
            <button
              type="button"
              className="w-full bg-lightestblue py-3 rounded-md text-lg  mt-3"
              disabled
            >
              <svg
                class="animate-spin h-5 w-5 mr-3 ..."
                viewBox="0 0 24 24"
              ></svg>
              Submitting...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue text-lg  mt-3"
            >
              Update Staff
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default EditStaffModal;
