import CloseModalBtn from "./CloseModalBtn";

import { Api } from "../../axios";

const DeletePurposeModal = ({ showModal, setShowModal, id }) => {
  console.log(id);

  const delPurpose = () => {
    console.log(id);
    setShowModal(false);

    try {
      Api.delete(`settings/visit-purpose/${id}`).then((res) => {
        console.log(res);
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${showModal ? "modal" : "hidden"} `}>
      <div className="relative modal--content flex items-center justify-center">
        <CloseModalBtn setShowModal={setShowModal} />

        <div className="h-max w-max p-2 text-center">
          <p className="mb-6 text-black text-xl">
            Are you sure you want to delete this purpose?
          </p>
          <div className="flex justify-between max-w-[150px] mx-auto capitalize">
            <button
              className="text-white px-4 py-2 bg-green rounded-md capitalize"
              onClick={() => delPurpose()}
            >
              yes
            </button>
            <button
              className="text-white px-4 py-2 bg-darkred rounded-md capitalize"
              onClick={() => setShowModal(false)}
            >
              no
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePurposeModal;
