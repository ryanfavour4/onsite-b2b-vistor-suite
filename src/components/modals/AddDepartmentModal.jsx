import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Api } from "../../axios";
import { addDepartment } from "../../services/settings/general";
import ButtonSpinner from "../ButtonSpinner";
import Success from "../Success";
import CloseModalBtn from "./CloseModalBtn";

const AddDepartmentModal = ({ showModal, setShowModal, refresh, setRefresh }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [newDepartments, setNewDepartments] = useState([[]]);

  const [submitting, setSubmitting] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newDepartments);

    newDepartments.forEach((department, index) => {
      setSubmitting(true);
      addDepartment({ department })
        .then(() => {
          if (newDepartments.length == 1) {
            setShowSuccess(true);
            return
          }
          if (index == newDepartments.length - 1) {
            setShowSuccess(true)
          }
        })
        .catch((error) => toast.error(error.message))
        .finally(() => setSubmitting(false));
    });
  };

  const handleAdd = () => {
    const neww = [...newDepartments, []];
    setNewDepartments(neww);
  };
  const handleChange = (onChangeValue, i) => {
    const inputData = [...newDepartments];
    inputData[i] = onChangeValue.target.value;
    setNewDepartments(inputData);
  };
  const handleDelete = (i) => {
    const deptToDelete = [...newDepartments];
    deptToDelete.splice(i, 1);
    setNewDepartments(deptToDelete);
  };

  return (
    <div className={`${showModal ? "modal" : "hidden"}`}>
      {showSuccess ? (
        <Success
          message={"Department added successfully!"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ) : (
        <form onSubmit={handleSubmit} className="relative modal--content">
          <CloseModalBtn setShowModal={setShowModal} />

          {newDepartments.map((department, index) => (
            <div className="mt-3">
              <label htmlFor="name" className="font-semibold text-black">
                Department Name
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={department}
                  className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block flex-1"
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  placeholder="Enter department name"
                />
                {newDepartments.length - 1 == index ? (
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
              Add department{newDepartments.length > 1 ? "s" : ""}
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default AddDepartmentModal;
