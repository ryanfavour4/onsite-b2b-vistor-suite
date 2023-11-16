import CloseModalBtn from "./CloseModalBtn";
import { Api } from "../../axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DisablePurposeModal = ({
  showModal,
  setShowModal,
  id,
  currentSelect,
}) => {
  const [purposeStatus, setPurposeStatus] = useState(Boolean);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurpose = async () => {
      Api.get(`settings/visit-purpose/${id}`).then((res) => {
        setPurposeStatus(res?.data.data.is_enabled);
        setLoading(false);
      });
    };

    fetchPurpose();
  }, [id, showModal]);

  const disablePurpose = () => {
    setShowModal(false);

    try {
      Api.post(`/settings/visit-purpose/toggle/${id}`, {
        is_enabled: purposeStatus == true ? false : true,
      })
        .then((res) => {
          console.log(res);
          toast.success("Purpose updated successfully");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          toast(error);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${showModal ? "modal" : "hidden"} `}>
      {!loading && (
        <div className="relative modal--content flex items-center justify-center">
          <CloseModalBtn setShowModal={setShowModal} />

          <div className="h-max w-max p-2 text-center">
            <p className="mb-6 text-black text-xl">
              {/* This message is currently {purposeStatus ? "Enabled" : "Disabled"}{" "} */}
              Are you sure you want to {purposeStatus ? "Disable" : "Enable"}{" "}
              this purpose?
            </p>
            <div className="flex justify-between max-w-[150px] mx-auto capitalize">
              <button
                className="text-white px-4 py-2 bg-green rounded-md capitalize"
                onClick={() => disablePurpose()}
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
      )}
    </div>
  );
};

export default DisablePurposeModal;
