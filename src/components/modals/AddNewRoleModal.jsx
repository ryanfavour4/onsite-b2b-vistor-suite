import { useState } from "react";
import CloseModalBtn from "./CloseModalBtn";
import Success from "../Success";
import { addRole } from "../../services/settings/roles";
import ButtonSpinner from "../ButtonSpinner";
import { toast } from "react-toastify";

const AddNewRoleModal = ({ showModal, setShowModal, refresh, setRefresh }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [role, setRole] = useState("");
  const [roleDescription, setRoleDescription] = useState('')
  const [submitting, setSubmitting ] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    addRole(
      {
        role,
        role_description: roleDescription 
      })
      .then(() => {
        setShowSuccess(true)
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setSubmitting(false));
  };

  return (
    <div className={`${showModal ? "modal" : "hidden"}`}>
      {showSuccess ? (
        <Success
          message={"Role created successfully!"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ) : (
        <form onSubmit={handleSubmit} className="relative modal--content h-32">
          <CloseModalBtn setShowModal={setShowModal} />

          <div className="mb-3">
            <label htmlFor="eventName" className="font-semibold text-black ">
              Role
            </label>
            <input
              type="text"
              value={role}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter role title"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inviteTime" className="font-semibold text-black">
              Role Description
            </label>
            <input
              type="text"
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
              placeholder="Enter role description"
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full cursor-pointer"
            />
          </div>

          {
            submitting ?
              <ButtonSpinner />
              :
              <button
                type="submit"
                className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue mt-1 text-sm"
                onClick={handleSubmit}
              >
                Submit
              </button>
          }


        </form>
      )}
    </div>
  );
};

export default AddNewRoleModal;
