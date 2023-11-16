import { Api } from "../../axios";
import CloseModalBtn from "./CloseModalBtn";

const RemoveFromBlacklistModal = ({ showModal, setShowModal, id }) => {
  const handleClick = () => {
    try {
      setShowModal(false);
      Api.delete(`visitor/blacklist/${id}`).then((res) => {
        console.log(res);
        // console.log("hello");
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
            Are you sure you want to remove this visitor from blacklist?
          </p>
          <div className="flex justify-between max-w-[150px] mx-auto capitalize">
            <button
              className="text-white px-4 py-2 bg-green rounded-md capitalize"
              onClick={() => handleClick()}
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

export default RemoveFromBlacklistModal;
