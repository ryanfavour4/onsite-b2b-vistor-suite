import { useState } from "react";
import { toast } from "react-toastify";
import { blacklistVisitor } from "../../services/visitor";
import ButtonSpinner from "../ButtonSpinner";
import Success from "../Success";
import CloseModalBtn from "./CloseModalBtn";

const BlacklistVisitorModal = ({ showModal, setShowModal, selected, setSelected }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleBlacklist = async () => {
    try {
      setLoading(true)
      console.log(selected, 'selectedddddd')
      await blacklistVisitor(selected?.id)
      setSelected(null)
      setShowSuccess(true)
    } catch (error) {
      toast.error(error.message || error.data.message);
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className={`${showModal ? 'modal' : 'hidden'} `}>
      {showSuccess ? (
        <Success
          message={"Visitor added to blacklist!"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
        />
      ) : (

        <div className="relative modal--content flex items-center justify-center">
          <CloseModalBtn setShowModal={setShowModal} />

          <div className="h-max w-max p-2 text-center">
            <p className="mb-6 text-black text-xl">
              Are you sure you want to blacklist this visitor?
            </p>
                  <div className="flex justify-center space-x-4 capitalize">
            <div className="w-max-[max-content]">
              {
                loading ?
                  <ButtonSpinner processTitle={'Blacklisting...'} />
                  :
                  <button className="text-white px-4 py-3 bg-green rounded-md capitalize mt-3" onClick={handleBlacklist}>
                    yes
                  </button>
              }
            </div>


            <button className="text-white px-4 py-3 mt-3 bg-darkred rounded-md capitalize" onClick={() => setShowModal(false)}>
              no
            </button>

          </div>
        </div>

        </div>)
}
    </div >
  );
};

export default BlacklistVisitorModal;
