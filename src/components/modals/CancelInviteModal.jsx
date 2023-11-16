import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Api } from "../../axios";
import ButtonSpinner from "../ButtonSpinner";
import Success from "../Success";
import CloseModalBtn from "./CloseModalBtn";

const CancelInvite = ({
  showModal,
  setShowModal,
  inviteCode,
  selected,
  setSelected,
  setRefresh,
  refresh,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState("");

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    console.log("Checkbox value changed:", checked);
  }, [checked]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      sendNotification: checked,
      message: message,
    };

    try {
      const cancelAppointment = async () => {
        await Api.post(
          `visitor/invitee/cancel-appointment/${inviteCode}`,
          payload
        ).then((res) => {
          console.log(res);

          if (res.status == 200) {
            setShowSuccess(true);
          }
        });
      };

      cancelAppointment();
    } catch (error) {
      toast.error(error.message || error.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`${showModal ? "modal" : "hidden"} `}>
      {showSuccess ? (
        <Success
          message={"Appointment Cancelled Successfully"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      ) : (
        <div className="relative modal--content flex items-center justify-center">
          <CloseModalBtn setShowModal={setShowModal} />

          <div className="h-max w-max p-2 text-center">
            <p className="mb-3 text-black text-xl">
              Are you sure you want to cancel this scheduled invite?
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                type="checkbox"
                name=""
                id=""
                checked={checked}
                onChange={handleCheckboxChange}
              />{" "}
              <p style={{ marginLeft: 10, fontSize: 14 }}>
                Send cancellation notification to invitee
              </p>
            </div>

            {checked && (
              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  cols="40"
                  rows="2"
                  placeholder="Enter message.."
                  style={{
                    border: "0.3px solid black ",
                    marginTop: 10,
                    padding: 10,
                    outline: "none",
                    fontSize: 12,
                    resize: "none",
                  }}
                ></textarea>
              </div>
            )}
            <div className="flex justify-center space-x-4 capitalize">
              <div className="w-max-[max-content]">
                {submitting ? (
                  <ButtonSpinner processTitle={"sending..."} />
                ) : (
                  <button
                    className="text-white px-4 py-3 bg-green rounded-md capitalize mt-3"
                    onClick={handleSubmit}
                  >
                    yes
                  </button>
                )}
              </div>

              <button
                className="text-white px-4 py-3 mt-3 bg-darkred rounded-md capitalize"
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

export default CancelInvite;
