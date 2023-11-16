import { useState } from "react";
import CloseModalBtn from "./CloseModalBtn";
import Success from "../Success";
import SearchableDropdown from "../dropdowns/SearchableDropdown";
import ButtonSpinner from "../ButtonSpinner";
import { toast } from "react-toastify";
import { Api } from "../../axios";

const AddPurposeModal = ({ showModal, setShowModal, refresh, setRefresh }) => {
  const [purposeName, setPurposeName] = useState("");
  const [purposeLabel, setPurposeLabel] = useState("");
  const [purposeType, setPurposeType] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await Api.post("settings/visit-purpose", {
      visit_purpose_name: purposeName,
      visit_purpose_label: purposeLabel,
    })
      .then(() => {
        setShowSuccess(true);
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.error ||
            error.response?.data?.message ||
            error.message
        );
        console.log(error);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className={`${showModal ? "modal" : "hidden"} text-sm`}>
      {showSuccess ? (
        <Success
          message={"New purpose added successfully!"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ) : (
        <form onSubmit={handleSubmit} className="relative modal--content">
          <CloseModalBtn setShowModal={setShowModal} />

          <div className="mb-3">
            <label htmlFor="purposeName" className="font-semibold text-black ">
              Purpose name
            </label>
            <input
              type="text"
              value={purposeName}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setPurposeName(e.target.value)}
              placeholder="Enter purpose name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="purposeLabel" className="font-semibold text-black ">
              Purpose label
            </label>
            <input
              type="text"
              value={purposeLabel}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setPurposeLabel(e.target.value)}
              placeholder="Enter purpose label"
            />
          </div>

          {/* <div className="mb-3">
            <label htmlFor="purposeType" className="font-semibold text-black ">
              Purpose type
            </label>
            <SearchableDropdown
              selectedOption={purposeType}
              setSelectedOption={setPurposeType}
              options={["lorem", "ipsum", "dolor", "sit"]}
            />
          </div> */}

          {/* <label
            htmlFor="isDefault"
            className="flex flex-row-reverse justify-end mb-4 cursor-pointer font-semibold"
          >
            <span className="ml-2">Is Default</span>
            <input
              type="checkbox"
              name=""
              id="isDefault"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
            />
          </label>

          <label
            htmlFor="isEnabled"
            className="flex flex-row-reverse justify-end mb-4 cursor-pointer font-semibold"
          >
            <span className="ml-2">Is Enabled</span>
            <input
              type="checkbox"
              name=""
              id="isEnabled"
              checked={isEnabled}
              onChange={(e) => setIsEnabled(e.target.checked)}
            />
          </label> */}

          {/* <div className="mb-4">
          <label htmlFor="purposeLabel" className="font-semibold text-black">
            Purpose label
          </label>
          <div className="flex">
            <select className="mr-2 rounded-lg p-2 bg-transparent border-solid border-[1px] border-lightestblue focus:border-blue block">
              {["+234", "+212", "+27", "+251"].map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
              type="tel"
              value={phoneNumber}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="123 4567 89"
            />
          </div>
        </div> */}

          {submitting ? (
            <ButtonSpinner />
          ) : (
            <button
              type="submit"
              className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue mt-1 text-sm"
              onClick={handleSubmit}
            >
              Add purpose
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default AddPurposeModal;
