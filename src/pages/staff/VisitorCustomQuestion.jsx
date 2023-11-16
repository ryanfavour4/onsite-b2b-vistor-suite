import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { Api } from "../../axios";
import { toast } from "react-toastify";
import cameraImg from "../../assets/camera-svgrepo-com.png";

export default function VisitorCustomQuestion() {
  const {
    handleSubmit,
    handleChangeValue,
    povFormFields,
    povFormOptions,
    avatar,
    setAvatar,
    fields,
    loading,
    pov,
    selectedPurposeOfVisit,
  } = useVisitorCustomQuestion();

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-4">
        <h1 className="text-2xl font-bold text-center py-4 mb-10">
          Purpose of Visit Question For{" "}
          <span className="capitalize">{pov}</span>
        </h1>
        <div className="flex justify-center m-auto max-w-4xl gap-8 flex-col md:flex-row">
          {povFormFields.length ? (
            povFormFields.map((ele, idx) => {
              if (ele.type === "select") {
                return (
                  <div className="w-full md:w-2/3 flex flex-col" key={idx}>
                    <h3 className="font-semibold capitalize text-xl">
                      {ele.label}
                    </h3>
                    <select
                      onChange={(e) => handleChangeValue(e.target.value)}
                      className="border-2 border-lightblue mt-5 p-3 rounded-md max-w-sm"
                    >
                      <option value="" disabled selected>
                        Select Value
                      </option>
                      {povFormOptions.map((ele) => {
                        return (
                          <option key={ele.id} value={ele.option_name}>
                            {ele.option_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                );
              }
              if (ele.type === "text") {
                return (
                  <div
                    className="flex border-lightblue p-3 border-solid border-b-[1px]"
                    key={idx}
                  >
                    <h3 className="w-2/6 font-semibold capitalize">
                      {ele.field_label}
                    </h3>
                    <input
                      className="w-4/6"
                      type="text"
                      placeholder="Enter Value"
                    />
                  </div>
                );
              }
            })
          ) : (
            <h3 className="font-ubuntu text-xl mb-6">
              Turns out there are no questions for this Purpose of Visit...?
            </h3>
          )}
          {selectedPurposeOfVisit?.isPhoto_required == true && (
            <div className="w-full md:w-2/3 ">
              <h3 className="font-semibold capitalize text-xl">
                Please upload an image of this visitor
              </h3>
              <label htmlFor="avatar">
                <div className="p-8 cursor-pointer mt-4 border-4 border-lightblue hover:bg-lightest max-w-sm m-auto border-dashed rounded-md flex flex-col justify-center items-center">
                  <img src={cameraImg} width={60} alt="upload you image" />
                </div>
              </label>
              <div className="text-center">{avatar?.name?.toString()}</div>
              <input
                onChange={(e) => setAvatar(e.target.files[0])}
                type="file"
                className="invisible"
                name="avatar"
                id="avatar"
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-center">
          <button className="w-full max-w-lg mx-auto text-white bg-lightblue hover:bg-blue py-3 px-4 rounded-md my-2 ">
            Check-in Visitor
          </button>
        </div>
      </form>
    </div>
  );
}

// !!!================================================================= CONTROLLER  ================
const useVisitorCustomQuestion = () => {
  const { pov } = useParams();
  const navigate = useNavigate();
  const [povFormFields, setPovFormFields] = useState([]);
  const [povFormOptions, setPovFormOptions] = useState([]);
  const [povQuestionAndAns, setPovQuestionAndAns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const selectedPurposeOfVisit = JSON.parse(
    localStorage.getItem("selected-pov")
  );
  const fields = JSON.parse(localStorage.getItem("visitor-checkin-fields"));

  // ??? ============= GRABBING THE PURPOSE OF VISIT SELECTED FROM PREV SCREEN AND POSTING TO GET THE MESSAGE FIELDS ?? === //
  useEffect(() => {
    setLoading(true);
    Api.post(`/settings/get-purpose-form-field`, {
      purpose: pov,
    })
      .then((res) => {
        setLoading(false);
        if (res.data?.data?.Fields.length > 0) {
          setPovFormFields(
            res.data?.data?.Fields.map(
              ({
                field_name,
                field_label,
                field_type,
                is_required,
                is_enable,
                id,
              }) => ({
                title: field_name,
                value: "",
                id,
                type: field_type,
                label: field_label,
                required: is_required,
                enabled: is_enable,
              })
            )
          );
          setPovFormOptions(res.data?.data?.options);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [pov]);

  //??========== CHANGE THE VALUE OF THE SELECTED OPTION ==========
  const handleChangeValue = (value) => {
    const newPovQuestionAndAns = [...povQuestionAndAns];
    newPovQuestionAndAns[0].answer = value;
    setPovQuestionAndAns(newPovQuestionAndAns);
  };

  // ?? =========== INITIALIZE A QUESTION AND ANSWER ARRAY FOR EACH PURPOSE OF VISIT ==========
  useEffect(() => {
    setPovQuestionAndAns(
      povFormFields.map(() => {
        return {
          question: povFormFields.map((pov) => {
            return pov.label;
          })[0],
          answer: "",
        };
      })
    );

    return () => {
      setPovQuestionAndAns([]);
    };
  }, [povFormFields]);

  // ?? ======== SUBMIT FINAL FORM VALUE ================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const purpose_of_visit_id = fields.filter(
      (ele) => ele.title === "purpose_of_visit"
    );
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append(
      "purpose_of_visit",
      JSON.stringify({
        purpose_of_visit: {
          purpose_of_visit_id: purpose_of_visit_id[0].value,
          purpose_of_visit_custom_field: povQuestionAndAns,
        },
      })
    );
    fields.forEach((element) => {
      if (
        element.title !== "nin" &&
        element.title !== "avatar" &&
        element.title !== "purpose_of_visit" &&
        element.title !== "mothers_name"
      ) {
        formData.append(element.title, element.value);
      }
    });
    await Api.post("visitor/sign-in", formData)
      .then((res) => {
        setLoading(false);
        toast.success("Visitor Registered Successfully");
        localStorage.removeItem("visitor-checkin-fields");
        setTimeout(() => {
          navigate("/visitor-log");
        }, 1000);
      })
      .catch((err) => {
        toast.error(err?.message || "Error in Registering Visitor");
        setLoading(false);
        console.log(err);
      });
  };

  return {
    handleSubmit,
    handleChangeValue,
    povFormFields,
    povFormOptions,
    avatar,
    fields,
    loading,
    pov,
    setAvatar,
    setPovQuestionAndAns,
    selectedPurposeOfVisit,
  };
};
