import { useState } from "react";
import Required from "../Required";
import SearchableDropdown from "../dropdowns/SearchableDropdown";
import CloseModalBtn from "./CloseModalBtn";
import Success from "../Success";
import { toast } from "react-toastify";
import { Api } from "../../axios";
import { useEffect } from "react";
import Loading from "../Loading";

const EditPurposeModal = ({ showModal, setShowModal, id }) => {
  const [load, setLoad] = useState(false);
  const [name, setName] = useState("");
  const [label, setLabel] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch original data

  useEffect(() => {
    const fetchData = async () => {
      setLoad(true);
      await Api.get(`settings/visit-purpose/${id}`)
        .then((res) => {
          setLoad(false);
          setName(res.data?.data.visit_purpose_name);
          setLabel(res.data?.data.visit_purpose_label);
        })
        .catch((err) => {
          setLoad(false);
          console.log(err);
        });
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await Api.put(`settings/visit-purpose/${id}`, {
      visit_purpose_name: name,
      visit_purpose_label: label,
    })
      .then((response) => {
        setShowSuccess(true);
        window.location.reload(false);
      })
      .catch((error) => {
        toast.error(error.response || error.response);
        console.log(error);
      })
      .finally(() => setSubmitting(false));
  };

  if (load) {
    return <Loading />;
  }

  return (
    <div className={`${showModal ? "modal" : "hidden"}`}>
      {showSuccess ? (
        <Success
          message={"Message details updated successfully!"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
        />
      ) : (
        <form onSubmit={handleSubmit} className="relative modal--content">
          <CloseModalBtn setShowModal={setShowModal} />

          <div className="mb-4 flex">
            <div>
              <label htmlFor="name" className="font-semibold text-black">
                name
              </label>
              <input
                type="text"
                value={name}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter first name"
              />
            </div>

            <div className="ml-3">
              <label htmlFor="name" className="font-semibold text-black">
                label
              </label>
              <input
                type="text"
                value={label}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Enter last name"
              />
            </div>
          </div>

          {submitting ? (
            <button
              type="button"
              className="w-full bg-lightestblue py-3 rounded-md text-lg  mt-3"
              disabled
            >
              <svg
                class="animate-spin h-5 w-5 mr-3 ..."
                viewBox="0 0 24 24"
              ></svg>
              Submitting...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue text-lg  mt-3"
              onClick={handleSubmit}
            >
              Update Purpose
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default EditPurposeModal;
