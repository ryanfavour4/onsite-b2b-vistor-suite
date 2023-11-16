import { useRef } from "react";
import useOutsideListener from "../hooks/useOutsideListener";
import CloseModalBtn from "./modals/CloseModalBtn";

const Success = ({ message, setShowSuccess, setShowParentModal, refresh, setRefresh }) => {
  const wrapperRef = useRef(null)

  useOutsideListener(wrapperRef, () => {
    setShowSuccess(false)
    setShowParentModal(false)

    if (refresh != undefined && setRefresh != undefined) {
      // console.log('refresh')
      setRefresh(!refresh)
    }
  })


  return (
    <div className={`w-4/5 max-w-[500px] my-10`} ref={wrapperRef}>

      <div className="w-full relative bg-white p-4 drop-shadow-md text-center rounded-md" >
        <CloseModalBtn setShowModal={setShowSuccess} setShowParentModal={setShowParentModal} onClose={
          () => {
            if (refresh != undefined && setRefresh != undefined) {
              // console.log('refresh')
              setRefresh(!refresh)
            }
          }
        } />

        <i class="fa-solid fa-circle-check text-8xl text-green"></i>
        <p className="text-lg font-semibold text-green my-4">
          {message}
        </p>
      </div>


    </div>
  );
};

export default Success;
