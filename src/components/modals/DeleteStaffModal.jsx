import { toast } from "react-toastify";
import { Api } from "../../axios";
import CloseModalBtn from "./CloseModalBtn";

export default function DeleteStaffCard({
  refresh,
  setRefresh,
  id,
  closeModal,
  staffId,
}) {
  const delStaff = (id) => {
    Api.delete(`/settings/delete-staff/${id}`)
      .then((res) => {
        closeModal();
        toast.success("Staff deleted successfully");
        setRefresh(refresh);
      })
      .catch((err) => {
        closeModal();
        console.log(err);
        if (err.index) {
          toast.error("This staff is assigned to a project and cant be deleted");
        }
      });
  };

  return (
    <div>
      <div className="relative modal--content flex items-center justify-center ">
        <CloseModalBtn setShowModal={closeModal} />

        <div className="h-max w-max p-2 text-center bg-white rounded-md">
          <p className="mb-6 text-black text-xl">
            Are you sure you want to delete this staff?
          </p>
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
