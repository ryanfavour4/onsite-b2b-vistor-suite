import { useState } from "react";
import CloseModalBtn from "./CloseModalBtn";
import Success from "../Success";

const EditExhibitionFieldModal = ({ showModal, setShowModal }) => {
  const [fieldName, setFieldName] = useState("");
  const [required, setRequired] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    console.log("handle submit");
    setShowSuccess(true);
  };

  return (
    <div className={`${showModal ? "modal" : "hidden"} text-sm`}>
      {showSuccess ? (
        <Success
          message={"Field edited successfully!"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
        />
      ) : (
        <form onSubmit={handleSubmit} className="relative modal--content">
          <CloseModalBtn setShowModal={setShowModal} />
          <div className="mb-3">
            <label htmlFor="fieldName" className="font-semibold text-black ">
              Field name
            </label>
            <input
              type="text"
              value={fieldName}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setFieldName(e.target.value)}
              placeholder="Enter field name"
            />
          </div>

          <label
            htmlFor="isDefault"
            className="flex flex-row-reverse justify-end mb-4 cursor-pointer font-semibold"
          >
            <span className="ml-2">required</span>
            <input
              type="checkbox"
              name=""
              id="isDefault"
              checked={required}
              onChange={(e) => setRequired(e.target.checked)}
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
          </label>

          <button
            type="submit"
            className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue mt-1 text-sm"
            onClick={handleSubmit}
          >
            Update field
          </button>
        </form>
      )}
    </div>
  );
};

export default EditExhibitionFieldModal;
