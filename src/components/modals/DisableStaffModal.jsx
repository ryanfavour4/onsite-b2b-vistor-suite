import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Api } from "../../axios";
import Loading from "../Loading";
import CloseModalBtn from "./CloseModalBtn";

export default function DisableStaffCard({
  refresh,
  setRefresh,
  id,
  closeModal,
  staffId,
  status,
}) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (status !== null) {
      console.log(status);
      setLoading(false);
    }
  }, [status]);

  const delStaff = (id) => {
    setLoading(true);

    const payload = {
      is_available: status ? false : true,
    };

    Api.put(`/settings/update-staff/${id}`, payload)
      .then((res) => {
        console.log(res);
        closeModal();
        toast.success(`Staff ${status ? "disabled" : "enabled"} successfully`);
        setRefresh(refresh);
        // setLoading(false);
      })

      .catch((err) => {
        closeModal();
        console.log(err);
        setLoading(false);

        if (err.index) {
          toast.error(
            "This staff is assigned to a project and cant be deleted"
          );
        }
      });
  };

  return (
    <div>
      <div className="relative modal--content flex items-center justify-center ">
        {loading && <Loading />}

        <CloseModalBtn setShowModal={closeModal} />

        <div className="h-max w-max p-2 text-center bg-white rounded-md">
          {!loading && (
            <p className="mb-6 text-black text-xl">
              Are you sure you want to {status ? "disable" : "enable"} this
              staff ?
            </p>
          )}

          <div className="flex justify-between max-w-[150px] mx-auto capitalize">
            <button
              className="text-white px-4 py-2 bg-green rounded-md capitalize"
              onClick={() => delStaff(id)}
            >
              yes
            </button>
            <button
              className="text-white px-4 py-2 bg-darkred rounded-md capitalize"
              onClick={() => closeModal()}
            >
              no
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
