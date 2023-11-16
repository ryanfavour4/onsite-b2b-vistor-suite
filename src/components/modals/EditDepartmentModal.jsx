import React, { useLayoutEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { editDepartment } from "../../services/settings/general";
import ButtonSpinner from "../ButtonSpinner";
import Success from "../Success";
import CloseModalBtn from "./CloseModalBtn";


const EditDepartmentModal = ({ showModal, setShowModal, selected, setSelected, setRefresh, refresh }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [department, setDepartment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useLayoutEffect(() => {
    setDepartment(selected?.department)
  }, [selected])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await editDepartment({ department, id: selected?.id })
      setShowSuccess(true);
      setSelected(null)
    } catch (error) {
      toast.error(error.message || error.data.message);
    } finally {
      setSubmitting(false)
    }
  };


  return (
    <div className={`${showModal ? "modal" : "hidden"}`}>
      {showSuccess ? (
        <Success
          message={"Department updated successfully!"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      ) : (
        <form onSubmit={handleSubmit} className="relative modal--content">
          <CloseModalBtn setShowModal={setShowModal} />

          <div className="my-3">
            <label htmlFor="name" className="font-semibold text-black">
              Department Name
            </label>
            <input
              type="text"
              value={department}
              className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Enter department name"
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
                Update department
              </button>
          }
        </form>
      )}
    </div>
  );
};

export default EditDepartmentModal;
