import CloseModalBtn from "./CloseModalBtn";

import { Api } from "../../axios";
import { useEffect } from "react";
import Loading from "../Loading";
import { useState } from "react";

const DeleteEventModal = ({
  showModal,
  setShowModal,
  id,
  setRefresh,
  refresh,
}) => {
  console.log(id);
  const [loading, setLoading] = useState(false);

  const delEvent = () => {
    console.log(id);
    setShowModal(false);
    setLoading(true);

    try {
      Api.delete(`events/delete/${id}`).then((res) => {
        console.log(res);

        if (res.status == 200) {
          //   setRefresh(true);
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    delEvent();
  }, [refresh]);

  return (
    <div className={`${showModal ? "modal" : "hidden"} `}>
      {loading && <Loading />}
      <div className="relative modal--content flex items-center justify-center">
        <CloseModalBtn setShowModal={setShowModal} />

        <div className="h-max w-max p-2 text-center">
          <p className="mb-6 text-black text-xl">
            Are you sure you want to delete this Event?
          </p>
          <div className="flex justify-between max-w-[150px] mx-auto capitalize">
            <button
              className="text-white px-4 py-2 bg-green rounded-md capitalize"
              onClick={delEvent}
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

export default DeleteEventModal;
