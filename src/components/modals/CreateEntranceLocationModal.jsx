import { useEffect, useState } from "react";
import CloseModalBtn from "./CloseModalBtn";
import Success from "../Success";
import SearchableDropdown from "../dropdowns/SearchableDropdown";
import { Api } from "../../axios";
import { toast } from "react-toastify";
import ButtonSpinner from "../ButtonSpinner";
import useFetch from "../../hooks/useFetch";

const CreateEntranceLocationModal = ({ showModal, setShowModal }) => {
  const [branch, setBranch] = useState({});
  const [entranceLocationName, setEntranceLocationName] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [branches, setBranches] = useState([]);

  const branchOptions = useFetch("settings/branch", [showModal]);

  useEffect(() => {
    console.log(branchOptions.data, " branches dataaa");
    setBranches(
      branchOptions?.data?.data.branches?.map(
        ({ branch_code, branch_name }) => ({
          value: branch_code,
          label: branch_name,
        })
      )
    );
  }, [branchOptions.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    await Api.post("settings/add-location", {
      name: entranceLocationName,
      branch_code: branch.value,
      // branch_code: "HQ",
    })
      .then((res) => {
        setShowSuccess(true);
        console.log(res);
        console.log(branch);
        console.log(entranceLocationName);
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error.response.data.error ||
            error.response.data.message ||
            error.message
        );
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className={`${showModal ? "modal" : "hidden"} text-sm`}>
      {showSuccess ? (
        <Success
          message={"Entrance location created successfully!"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
        />
      ) : (
        <form onSubmit={handleSubmit} className="relative modal--content">
          <CloseModalBtn setShowModal={setShowModal} />

          <div className="mb-4">
            <label htmlFor="position" className="font-semibold text-black">
              Select branch
            </label>
            <SearchableDropdown
              loading={branchOptions.loading}
              options={branches}
              selectedOption={branch}
              setSelectedOption={setBranch}
              transparent={true}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="font-semibold text-black ">
              Entrance location name
            </label>
            <input
              type="text"
              value={entranceLocationName}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setEntranceLocationName(e.target.value)}
              placeholder="Enter location name"
            />
          </div>

          {/* <button
            type="submit"
            className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue mt-1 text-sm"
            onClick={handleSubmit}
          >
            Create Entrance Location
          </button> */}

          {submitting ? (
            <ButtonSpinner />
          ) : (
            <button
              type="submit"
              className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue text-lg  mt-3"
              onClick={handleSubmit}
            >
              Create location
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default CreateEntranceLocationModal;
