import { useState } from "react";
import CloseModalBtn from "./CloseModalBtn";
import Success from "../Success";
import SearchableDropdown from "../dropdowns/SearchableDropdown";
import { Api } from "../../axios";

const EditEntranceLocationModal = ({ showModal, setShowModal }) => {
  const [branch, setBranch] = useState("");
  const [entranceLocationName, setEntranceLocationName] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    await Api.post("settings/add-location", {
      name: entranceLocationName,
      branch_code: branch,
    })
      .then(() => {
        setShowSuccess(true);
      })
      .catch((error) => {
        toast.error(error.response.data.error || error.response.data.message);
        console.log(error);
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
              options={["lorem", "ipsum", "dolor"]}
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
              placeholder="Enter address"
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
              onClick={handleSubmit}
            >
              Update location
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default EditEntranceLocationModal;
