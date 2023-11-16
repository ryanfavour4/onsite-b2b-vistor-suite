import { useEffect, useState } from "react";
import Required from "../Required";
import SearchableDropdown from "../dropdowns/SearchableDropdown";
import CloseModalBtn from "./CloseModalBtn";
import Success from "../Success";
import { Api } from "../../axios";
import { toast } from "react-toastify";
import ButtonSpinner from "../ButtonSpinner";
import useFetch from "../../hooks/useFetch";
import { addStaff } from "../../services/staff";

import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { setLocationList } from "../../features/locationSlice";

const RegisterStaffModal = ({
  showModal,
  setShowModal,
  refresh,
  setRefresh,
}) => {
  const generateNumberId = () => {
    const id = uuidv4().replace(/-/g, ""); // Remove dashes from the generated UUID
    return (
      id,
      id.charCodeAt(Math.random() * id.length) *
        Math.ceil(Math.random() * 10) *
        16
    ); // Convert the hexadecimal UUID to a decimal number
  };

  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState({
    label: "+234",
    value: "+234",
  });
  const [email, setEmail] = useState("");
  const [staffPhoto, setStaffPhoto] = useState(null);
  const [department, setDepartment] = useState({});
  const staffID = generateNumberId();
  // console.log(staffID);
  const [position, setPosition] = useState({});
  const [officeLocation, setOfficeLocation] = useState({});
  const [address, setAddress] = useState("");
  const [firstAssistant, setFirstAssistant] = useState({});
  const [addAnotherAssistant, setAddAnotherAssistant] = useState(false);
  const [secondAssistant, setSecondAssistant] = useState({});

  const [showSuccess, setShowSuccess] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [staffPositions, setStaffPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [assistants, setAssistants] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);

  const staffPositionOptions = useFetch("settings/position", [showModal]);
  // console.log(staffPositionOptions);
  const departmentOptions = useFetch("settings/get-department", [showModal]);
  // const locationOptions = useFetch("settings/view-location", [showModal]);
  const locationOptions = useFetch("settings/branch", [showModal]);
  const assistantOptions = useFetch("settings/get-all-staffs", [showModal]);
  const countryCodeOptions = useFetch("settings/country-codes", [showModal]);

  useEffect(() => {
    // console.log(staffPositionOptions.data, 'staff positions dataaa')
    setStaffPositions(
      staffPositionOptions?.data?.data?.map(({ id, position }) => ({
        value: id,
        label: position,
      }))
    );
  }, [staffPositionOptions.data]);

  useEffect(() => {
    // console.log(departmentOptions.data, 'department dataaa')
    setDepartments(
      departmentOptions?.data?.data.map(({ id, department }) => ({
        value: id,
        label: department,
      }))
    );
  }, [departmentOptions.data]);
  useEffect(() => {
    // console.log(locationOptions.data, 'location dataaa')
    if (locationOptions?.data?.data.branches !== undefined) {
      setLocations(
        locationOptions?.data?.data.branches?.map(({ id, branch_name }) => ({
          value: id,
          label: branch_name,
        }))
      );
      dispatch(setLocationList(locationOptions?.data?.branches));
    }
  }, [locationOptions.data]);
  useEffect(() => {
    // console.log(assistantOptions.data, 'staffs dataaa')
    setAssistants(
      assistantOptions?.data?.staffs.map(({ id, first_name, last_name }) => ({
        value: id,
        label: `${first_name} ${last_name}`,
      }))
    );
  }, [assistantOptions.data]);

  useEffect(() => {
    // console.log(countryCodeOptions.data?.codes, 'codes dataaa')
    setCountryCodes(
      countryCodeOptions.data?.codes.map((id) => ({
        value: id,
        label: `+${id}`,
      }))
    );
  }, [countryCodeOptions.data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitting(true);
    // console.log(countryCode, 'codeeee')

    addStaff({
      email: email,
      last_name: lastname,
      first_name: firstname,
      office_location: officeLocation.value,
      department: department.value,
      phone_number: `${countryCode.value}${phoneNumber}`,
      position: position.value,
      is_available: true,
      logo: staffPhoto,
      address,
      staff_ID: JSON.stringify(staffID),
      assistants: [firstAssistant.value, secondAssistant.value],
    })
      .then(() => {
        setShowSuccess(true);
        setRefresh(!refresh);
      })
      .catch((error) => {
        toast.error(error?.message || error);
        console.log(error);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className={`${showModal ? "modal" : "hidden"}`}>
      {showSuccess ? (
        <Success
          message={"Staff registered successfully!"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ) : (
        <form onSubmit={handleSubmit} className="relative modal--content">
          <CloseModalBtn setShowModal={setShowModal} />

          <div className="mb-3">
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
          </div>

          <div className="mb-4 flex">
            <div>
              <label htmlFor="name" className="font-semibold text-black">
                First Name
              </label>
              <input
                type="text"
                value={firstname}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="Enter first name"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="name" className="font-semibold text-black">
                Last Name
              </label>
              <input
                type="text"
                value={lastname}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="font-semibold text-black">
              Phone number
            </label>
            <div className="flex">
              <div className="w-max mr-2">
                <SearchableDropdown
                  loading={countryCodeOptions.loading}
                  options={countryCodes}
                  selectedOption={countryCode}
                  setSelectedOption={setCountryCode}
                  transparent={true}
                />
              </div>

              <input
                type="number"
                maxLength={"4"}
                size={"20"}
                value={phoneNumber}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="123 4567 89"
              />
            </div>
            {/* <input type="number" step="1" min="1" max="999" maxlength="3" name="number" inputmode="numeric" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" onInput={() => {
              if (phoneNumber.length > 4) {
                setPhoneNumber(phoneNumber.slice(0, 4))
              }
            }} /> */}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="font-semibold text-black">
              Email
            </label>
            <input
              type="email"
              value={email}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter staff email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="department" className="font-semibold text-black">
              Department
            </label>
            <SearchableDropdown
              loading={departmentOptions.loading}
              options={departments}
              selectedOption={department}
              setSelectedOption={setDepartment}
              transparent={true}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="position" className="font-semibold text-black">
              Position
            </label>
            <SearchableDropdown
              options={staffPositions}
              loading={staffPositionOptions.loading}
              selectedOption={position}
              setSelectedOption={setPosition}
              transparent={true}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="font-semibold text-black">
              Address
            </label>
            <input
              type="text"
              value={address}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setAddress(e.target.value)}
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
            <SearchableDropdown
              options={locations}
              loading={locationOptions.loading}
              selectedOption={officeLocation}
              setSelectedOption={setOfficeLocation}
              transparent={true}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="assistant" className="font-semibold text-black">
              Assistant(s)
            </label>
            <div className="flex justify-between">
              <SearchableDropdown
                loading={assistantOptions.loading}
                options={assistants}
                selectedOption={firstAssistant}
                setSelectedOption={setFirstAssistant}
                transparent={true}
              />
              {addAnotherAssistant ? (
                <SearchableDropdown
                  loading={assistantOptions.loading}
                  options={assistants}
                  selectedOption={secondAssistant}
                  setSelectedOption={setSecondAssistant}
                  transparent={true}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setAddAnotherAssistant(true)}
                  className="p-2 ml-2 border border-light rounded-md"
                >
                  Add
                </button>
              )}
            </div>
          </div>

          {/* <button
            type="submit"
            className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue text-lg font-nunito mt-3"
            onClick={handleSubmit}
          >
            Register staff
          </button> */}

          {submitting ? (
            <ButtonSpinner />
          ) : (
            <button
              type="submit"
              className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue text-lg  mt-3"
              onClick={handleSubmit}
            >
              Register Staff
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default RegisterStaffModal;
