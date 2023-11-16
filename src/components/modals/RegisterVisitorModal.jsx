import { useEffect, useState } from "react";
import CloseModalBtn from "./CloseModalBtn";
import Success from "../Success";
import SearchableDropdown from "../dropdowns/SearchableDropdown";
import SmallSpinner from "../SmallSpinner";
import Loading from "../Loading";
import useFetch from "../../hooks/useFetch";
import VisitorCheckInField from "../VisitorCheckInField";
import { registerVisitor } from "../../services/visitor";
import { toast } from "react-toastify";
import ButtonSpinner from "../ButtonSpinner";

const RegisterVisitorModal = ({
  showModal,
  setShowModal,
  refresh,
  setRefresh,
}) => {
  const [fields, setFields] = useState([]);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [address, setAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [visitorPhoto, setVisitorPhoto] = useState(null);
  const [purpose, setPurpose] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const visitorFields = useFetch("settings/fields", []);

  useEffect(() => {
    if (visitorFields?.data?.fields?.length > 0) {
      setFields(
        visitorFields?.data?.fields?.map(
          ({
            field_name,
            field_label,
            field_type,
            is_required,
            is_enabled,
            id,
          }) => ({
            title: field_name,
            value: "",
            id,
            type: field_type,
            label: field_label,
            required: is_required,
            enabled: is_enabled,
          })
        )
      );
    }
  }, [visitorFields.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setSubmitting(true);
    await registerVisitor(fields);
    // .then((res) => {
    //   toast.success("Visitor registered successfully!");
    //   console.log(res);
    //   setShowSuccess(false);
    // })
    // .catch((err) => {
    //   setShowSuccess(false);
    //   toast.error("Error registering visitor");
    //   console.log(err);
    // });
  };

  return (
    <div className={`${showModal ? "modal" : "hidden"} text-sm`}>
      {showSuccess ? (
        <Success
          message={"Visitor registered successfully!"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      ) : (
        <form onSubmit={handleSubmit} className="relative modal--content">
          <CloseModalBtn setShowModal={setShowModal} />
          {visitorFields.loading ? (
            <Loading />
          ) : (
            <>
              {fields && (
                <>
                  {fields.map(
                    ({ title, label, type, required, enabled, value, id }) => (
                      <VisitorCheckInField
                        type={type}
                        label={label}
                        required={required}
                        name={label}
                        enabled={enabled}
                        value={value}
                        setFields={setFields}
                        id={id}
                        title={title}
                        fields={fields}
                      />
                    )
                  )}
                </>
              )}
            </>
          )}

          {submitting ? (
            <ButtonSpinner />
          ) : (
            <button
              type="submit"
              className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue text-lg  mt-3"
              onClick={handleSubmit}
            >
              Register Visitor
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default RegisterVisitorModal;
