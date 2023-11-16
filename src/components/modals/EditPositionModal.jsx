import React from "react";
import { useState, useLayoutEffect } from "react";
import Success from "../Success";
import CloseModalBtn from "./CloseModalBtn";
import { editPosition } from "../../services/settings/general";
import ButtonSpinner from "../ButtonSpinner";


const EditPositionModal = ({ showModal, setShowModal, selected, setSelected, refresh, setRefresh }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [position, setPosition] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useLayoutEffect(() => {
    setPosition(selected?.position)
  }, [selected])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await editPosition({ position, positionId: selected?.id })
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
          message={"Position updated successfully!"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ) : (
        <form onSubmit={handleSubmit} className="relative modal--content">
          <CloseModalBtn setShowModal={setShowModal} />

          <div className="my-3">
            <label htmlFor="name" className="font-semibold text-black">
              position Name
            </label>
            <input
              type="text"
              value={position}
              className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Enter position name"
            />
          </div>

          {
            submitting ?
              <ButtonSpinner /> :
              <button
                type="submit"
                className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue text-lg font-nunito mt-3"
                onClick={handleSubmit}
              >
                Update position
              </button>
          }

        </form>
      )}
    </div>
  );
};

export default EditPositionModal;
