import { useEffect, useState } from "react";
import CloseModalBtn from "./CloseModalBtn";
import Success from "../Success";
import { Api } from "../../axios";
import Loading from "../Loading";
import SearchableDropdown from "../dropdowns/SearchableDropdown";
import { toast } from "react-toastify";

const ChangeDefaultAdminModal = ({
  showModal,
  setShowModal,
  id,
  setRefresh,
}) => {
  const [selectOptions, setSelectOptions] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [select, setSelect] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      Api.get("settings/get-all-staffs").then((res) => {
        const arr = res.data?.staffs
          ?.filter((item) => {
            console.log(item);
            return item.is_available === true;
          })
          .map(({ id, email, first_name, last_name }) => ({
            value: id,
            label: first_name + " " + last_name,
            email: email,
            first_name: first_name,
            last_name: last_name,
          }));
        setSelectOptions(arr);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(select);

      const payload = {
        email: select.email,
        staff_name: select.first_name,
        staff_id: select.value,
      };

      console.log("Dynamic payload", payload);

      Api.put(`settings/host/edit/${id}`, payload).then((res) => {
        console.log(res);

        if (res.data.status == "success") {
          setLoading(false);
          setShowSuccess(true);
          //   setRefresh(true);
        }
        console.log("first");
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className={`${showModal ? "modal" : "hidden"} text-sm`}>
      {showSuccess ? (
        <Success
          message={"Default Host Updated "}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
        />
      ) : loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit} className="relative modal--content">
          <CloseModalBtn setShowModal={setShowModal} />
          <div className="mb-3">
            <label htmlFor="name" className="font-semibold text-black ">
              Select host
            </label>
            <SearchableDropdown
              options={selectOptions}
              loading={loadingOptions}
              selectedOption={select}
              setSelectedOption={setSelect}
              transparent={true}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue mt-1 text-sm"
            onClick={handleSubmit}
          >
            Update Default Admin
          </button>
        </form>
      )}
    </div>
  );
};

export default ChangeDefaultAdminModal;
