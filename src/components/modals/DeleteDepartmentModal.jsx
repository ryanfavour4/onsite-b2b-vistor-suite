import { useState } from "react";
import { toast } from "react-toastify";
import { deleteDepartment } from "../../services/settings/general";
import ButtonSpinner from "../ButtonSpinner";
import Success from "../Success";
import CloseModalBtn from "./CloseModalBtn";

const DeleteDepartmentModal = ({ showModal, setShowModal, selected, setSelected, setRefresh, refresh }) => {

  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false)


  const handleDelete = async (e) => {
    e.preventDefault();
    console.log(selected)

    try {
      setSubmitting(true);
      await deleteDepartment(selected.id)
      setShowSuccess(true);
      setSelected(null)
    } catch (error) {
      toast.error(error.message || error.data.message);
    } finally {
      setSubmitting(false)
    }
  };


  return (
    <div className={`${showModal ? 'modal' : 'hidden'} `}>

      {
        showSuccess ?
          (
            <Success
              message={"Department deleted successfully!"}
              setShowSuccess={setShowSuccess}
              setShowParentModal={setShowModal}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          )
          :
          (
              <div className="relative modal--content flex items-center justify-center">
                <CloseModalBtn setShowModal={setShowModal} />

                <div className="h-max w-max p-2 text-center">
                  <p className="mb-3 text-black text-xl">
                    Are you sure you want to delete this department?
                  </p>
                  <div className="flex justify-center space-x-4 capitalize">

                    <div className="w-max-[max-content]">
                      {
                        submitting ?
                          <ButtonSpinner processTitle={'Deleting...'} />
                          :
                          <button className="text-white px-4 py-3 bg-green rounded-md capitalize mt-3" onClick={handleDelete}>
                            yes
                          </button>
                      }
                    </div>


                    <button className="text-white px-4 py-3 mt-3 bg-darkred rounded-md capitalize" onClick={() => setShowModal(false)}>
                      no
                    </button>
                  </div>
                </div>

              </div>
          )
      }


    </div>
  );
};

export default DeleteDepartmentModal;
