import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import VisitorCheckInField from "../../components/VisitorCheckInField";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Api } from "../../axios";

export default function VisitorAdd() {
  const {
    visitorFields,
    fields,
    addNewUser,
    removeUser,
    companions,
    hasCompanion,
    setHasCompanion,
    handleInputChange,
    setFields,
    handleSubmit,
    loading
  } = useVisitorAdd();

  if (loading) {
    return <Loading />
  }

  return (
    <div className="bg-white h-full p-6">
      <h1 className="text-2xl font-bold text-center py-4">
        Check in a Visitor
      </h1>
      <form
        onSubmit={handleSubmit}
        className={`grid grid-cols-2 gap-6 border-2 rounded-md border-lightestblue max-w-2xl m-auto p-7`}
      >
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
        <div className="col-span-2 py-4">
          <div className="flex items-center gap-4">
            <p className="font-semibold text-black">Companion </p>
            <label className="custom-toggle-switch">
              <input
                name="hasCompanion,"
                checked={hasCompanion}
                onChange={() => setHasCompanion(!hasCompanion)}
                type="checkbox"
              />
              <span className="custom-toggle-slider" />
            </label>
          </div>

          {
            hasCompanion && <>
              <div className="mt-4">
                <p className="font-semibold text-black">Companion Details</p>
                <p className="text-sm text-gray-600">
                  Please fill in the companion details
                </p>
              </div>
              <div className="mt-6">
                {companions.map((user, index) => (
                  <div className="border rounded-md p-2 grid grid-cols-2 gap-4" key={index}>
                    <input
                      type="text"
                      className="bg-transparent p-2 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue"
                      placeholder="Name"
                      value={user.name}
                      onChange={(e) => handleInputChange(e, index, 'name')}
                    />
                    <input
                      type="email"
                      className="bg-transparent p-2 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue"
                      placeholder="Email"
                      value={user.email}
                      onChange={(e) => handleInputChange(e, index, 'email')}
                    />
                    <input
                      type="tel"
                      className="bg-transparent p-2 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue"
                      placeholder="Phone Number"
                      value={user.phone_number}
                      onChange={(e) => handleInputChange(e, index, 'phone_number')}
                    />
                    <div className="bg-darkred text-lightest w-full py-3 px-6 text-center font-semibold rounded-lg cursor-pointer" onClick={() => removeUser(index)}>Delete</div>
                  </div>
                ))}
                <div className="bg-green text-lightest w-full py-3 px-6 text-center font-semibold rounded-lg cursor-pointer mt-4" onClick={addNewUser}>Add Companion</div>
              </div>
            </>
          }

        </div>
        <div className="col-span-2">
          <button className="w-full text-white bg-lightblue hover:bg-blue py-3 px-4 rounded-md my-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

//??=============================== CONTROLLER HOOK ======================= ?? ================
export function useVisitorAdd() {
  const [fields, setFields] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const usersCurrent = JSON.parse(localStorage.getItem("User Current") || "");
  const [inviteModeOn, setInviteModeOn] = useState(
    Number(usersCurrent?.user?.company_invite_mode) === 1 ? true : false
  );

  // ??? ================ COMPANION FEATURE =================== ?? //
  const [hasCompanion, setHasCompanion] = useState(false)

  const [companions, setCompanions] = useState([
    { name: '', email: '', phone_number: '' },
  ]);

  const addNewUser = () => {
    setCompanions([...companions, { name: '', email: '', phone_number: '' }]);
    console.log(companions);
  };

  const handleInputChange = (event, index, field) => {
    const newUsers = [...companions];
    newUsers[index][field] = event.target.value;
    setCompanions(newUsers);
  };

  const removeUser = (index) => {
    const newUsers = [...companions];
    newUsers.splice(index, 1);
    setCompanions(newUsers);
  };


  useEffect(() => {
    // ?? =============== GETTING USER CURRENT PLAN TO SAVE FROM THE GENESIS OF THE PAGE ======= ??//
    const fetchPlan = async () => {
      await Api.get("/users/current").then((res) => {
        console.log(Number(res.data?.data?.user?.company_invite_mode) === 1 ? true : false);
        if (Number(res.data?.data?.user?.company_invite_mode) === 1 ? true : false) {
          navigate(`/visitor-checkin-code`)
        } else if (!Number(res.data?.data?.user?.company_invite_mode) === 1 ? true : false) {
          navigate(`/visitor-log/add-visitor-checkin`);
        }
      });
    };
    fetchPlan();

  }, []);


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
  }, [visitorFields?.data]);

  const handleSubmit = function (e) {
    // setLoading(true)
    e.preventDefault();
    const validates = fields.filter((element) => {
      return (
        element.required == true &&
        element.enabled == true &&
        element.title !== "visitor_photo" &&
        element.title !== "private_note" &&
        element.title !== "purpose_of_visit"
      );
    });

    let allValid = true; // Initialize a flag
    validates.forEach((element, idx) => {
      console.log(fields[idx]);
      if (
        (element.enabled && element.value === undefined) ||
        element.value === ""
      ) {
        toast.error(`${element.label} is required`);
        allValid = false; // Set the flag to false if any validation fails
        return;
      }
    });

    validates.find((element) => {
      if (element.title === "phone_number") {
        if (element.value.length < 10 || element.value.length > 11) {
          toast.error(
            `${element.label} is not valid please add a valid phone number`
          );
          allValid = false;
          return;
        }
      }
    });

    if (allValid) {
      localStorage.setItem("visitor-checkin-fields", JSON.stringify(fields));
      const purpose_of_visit = fields.find((field) => {
        return field.title === "purpose_of_visit";
      });
      Api.get(`settings/visit-purpose/${purpose_of_visit.value}`).then(
        (response) => {
          localStorage.setItem(
            "selected-pov",
            JSON.stringify(response.data.data)
          );
          Api.post(`/settings/get-purpose-form-field`, {
            purpose: response?.data.data.visit_purpose_label,
          }).then((res) => {
            if (!res?.data?.data?.Fields.length) {
              console.log(purpose_of_visit.id);
              handleFinalSubmit(purpose_of_visit.value);
            } else {
              navigate(
                `/visitor-add-visitor-checkin/${response.data.data.visit_purpose_label}`
              );
            }
          });
        }
      );
    }
  };

  // ?? ======== SUBMIT FINAL FORM VALUE ================
  const handleFinalSubmit = async (povID) => {
    const formData = new FormData();
    setLoading(true)
    formData.append("avatar", avatar);

    formData.append(
      "purpose_of_visit",
      JSON.stringify({
        purpose_of_visit: {
          purpose_of_visit_id: povID,
          purpose_of_visit_custom_field: [],
        },
      })
    );
    fields.forEach((element) => {
      if (element.title !== "avatar" && element.title !== "purpose_of_visit") {
        formData.append(element.title, element.value);
      }
    });

    if (hasCompanion)
      formData.append("companions", JSON.stringify(companions))

    // console.log("Form Data Values:", Object.fromEntries(formData.entries()));
    await Api.post("visitor/sign-in", formData)
      .then((res) => {
        toast.success("Visitor Registered Successfully");
        localStorage.removeItem("visitor-checkin-fields");
        navigate("/visitor-log");
        setLoading(false)
      })
      .catch((err) => {
        toast.error(err?.message || "Error in Registering Visitor");
        console.log(err);
        setLoading(false)
      });
  };

  return {
    visitorFields,
    fields,
    hasCompanion,
    setHasCompanion,
    addNewUser,
    removeUser,
    companions,
    handleInputChange,
    loading,
    setFields,
    handleSubmit,
  };
}
