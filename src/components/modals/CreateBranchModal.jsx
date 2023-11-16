import { useEffect, useState } from "react";
import CloseModalBtn from "./CloseModalBtn";
import Success from "../Success";
import SearchableDropdown from "../dropdowns/SearchableDropdown";
import useFetch from "../../hooks/useFetch";
import { createBranch } from "../../services/settings/location";
import { toast } from "react-toastify";
import ButtonSpinner from "../ButtonSpinner";
import { Api } from "../../axios";

const CreateBranchModal = ({
  showModal,
  setShowModal,
  refresh,
  setRefresh
}) => {
  const [branchName, setBranchName] = useState("");
  const [branchAdmin, setBranchAdmin] = useState({});
  const [country, setCountry] = useState({});
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  // const [name, setName] = useState("");

  const [branchCode, setBranchCode] = useState(null);

  const [countries, setCountries] = useState([]);
  const [admins, setAdmins] = useState([]);

  const countryOptions = useFetch("settings/country", [showModal]);
  // const adminOptions = useFetch("settings/list-admins", [showModal]);
  const adminOptions = useFetch("settings/get-all-staffs", [showModal]);

  console.log(admins);

  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setCountries(
      countryOptions?.data?.data?.map(({ id, country }) => ({
        value: id,
        label: country
      }))
    );
  }, [countryOptions.data]);

  useEffect(() => {
    setAdmins(
      adminOptions?.data?.staffs.map(({ id, email, first_name }) => ({
        value: id,
        label: first_name
      }))
    );
  }, [adminOptions.data]);

  console.log(adminOptions);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle submit");
    setSubmitting(true);

    const data = {
      branch_name: branchName,
      branch_admin: branchAdmin.value,
      country: country.value,
      address: address,
      email: email
      // first_name: name,
    };

    console.log(data);
    Api.post("settings/branch", data)
      .then((res) => {
        console.log(res);
        setShowSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitting(false);
        toast.error(err.message);
      });
  };

  return (
    <div className={`${showModal ? "modal" : "hidden"} text-sm`}>
      {showSuccess ? (
        <Success
          message={"Branch created successfully!"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ) : (
        <form onSubmit={handleSubmit} className="relative modal--content">
          <CloseModalBtn setShowModal={setShowModal} />
          <div className="mb-3">
            <label htmlFor="name" className="font-semibold text-black ">
              Branch name
            </label>
            <input
              type="text"
              value={branchName}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="Enter branch name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="position" className="font-semibold text-black">
              Branch Admin
            </label>
            <SearchableDropdown
              loading={adminOptions.loading}
              options={admins}
              selectedOption={branchAdmin}
              setSelectedOption={setBranchAdmin}
              transparent={true}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="position" className="font-semibold text-black">
              Country
            </label>
            <SearchableDropdown
              loading={countryOptions.loading}
              options={countries}
              selectedOption={country}
              setSelectedOption={setCountry}
              transparent={true}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="font-semibold text-black ">
              Enter address
            </label>
            <input
              type="text"
              value={address}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="font-semibold text-black ">
              Enter email
            </label>

            <input
              type="email"
              value={email}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter address"
            />
          </div>

          {/* <div className="mb-3">
            <label htmlFor="name" className="font-semibold text-black ">
              Enter name
            </label>

            <input
              type="email"
              value={name}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </div> */}

          {/* <div className="mb-3">
            <label htmlFor="name" className="font-semibold text-black ">
              Branch code
            </label>
            <input
              type="text"
              value={branchCode}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setBranchCode(e.target.value)}
              placeholder="Enter address"
            />
          </div> */}

          {submitting ? (
            <ButtonSpinner />
          ) : (
            <button
              type="submit"
              className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue mt-1 text-sm"
              onClick={handleSubmit}
            >
              Create Branch
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default CreateBranchModal;
