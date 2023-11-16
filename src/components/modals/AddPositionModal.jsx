import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { addPosition } from "../../services/settings/general";
import ButtonSpinner from "../ButtonSpinner";
import Success from "../Success";
import CloseModalBtn from "./CloseModalBtn";

const AddPositionModal = ({ showModal, setShowModal, refresh, setRefresh }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [newPositions, setNewPositions] = useState([[]]);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    newPositions.forEach((position, index) => {
      setSubmitting(true);
      addPosition({ position })
        .then(() => {
          if (newPositions.length == 1) {
            setShowSuccess(true);
            return;
          }
          if (index == newPositions.length - 1) {
            setShowSuccess(true);
          }
        })
        .catch((error) => toast.error(error.message))
        .finally(() => setSubmitting(false));
    });
  };

  const handleAdd = () => {
    const neww = [...newPositions, []];
    setNewPositions(neww);
  };
  const handleChange = (onChangeValue, i) => {
    const inputData = [...newPositions];
    inputData[i] = onChangeValue.target.value;
    setNewPositions(inputData);
  };
  const handleDelete = (i) => {
    const posToDelete = [...newPositions];
    posToDelete.splice(i, 1);
    setNewPositions(posToDelete);
  };

  return (
    <div className={`${showModal ? "modal" : "hidden"}`}>
      {showSuccess ? (
        <Success
          message={"Position added successfully!"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ) : (
        <form onSubmit={handleSubmit} className="relative modal--content">
          <CloseModalBtn setShowModal={setShowModal} />

          {newPositions.map((position, index) => (
            <div className="mt-3">
              <label htmlFor="name" className="font-semibold text-black">
                position Name
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={position}
                  className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block flex-1"
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  placeholder="Enter position name"
                />
                {newPositions.length - 1 == index ? (
                  <button
                    className="rounded-[50%] p-2 px-3 text-white bg-green ml-2"
                    type="button"
                    onClick={() => handleAdd()}
                  >
                    <i class="fa-solid fa-plus"></i>
                  </button>
                ) : (
                  <button
                    className="rounded-[50%] p-2 px-3 text-white bg-darkred ml-2"
                    type="button"
                    onClick={() => {
                      handleDelete(index);
                    }}
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>
            </div>
          ))}

          {submitting ? (
            <ButtonSpinner />
          ) : (
            <button
              type="submit"
              className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue text-lg font-nunito mt-3"
              onClick={handleSubmit}
            >
              Add position{newPositions.length > 1 ? "s" : ""}
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default AddPositionModal;
