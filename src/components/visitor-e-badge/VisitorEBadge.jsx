import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import avatar from "../../assets/defaultAvatar.png";
import { Api } from "../../axios";
import useFetch from "../../hooks/useFetch";
import { getDateFromTimestamp } from "../../utils/formatDate";
import ButtonSpinner from "../ButtonSpinner";
import Error from "../Error";
import Loading from "../Loading";
import Success from "../Success";

const VisitorEBadge = () => {
  const { visitorId } = useParams();
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  console.log(visitorId);

  const { data, loading, error } = useFetch(
    `visitor/get-visitor-card/${visitorId}`,
    // `visitor/visitor-ebadge/${visitorId}`,
    []
  );

  const staff = useFetch(`settings/get-staff/${data?.data?.host}`, [
    data?.data,
  ]);

  console.log(data);

  const visitor = {
    companyInfo: {
      logo: data?.data?.avatar || avatar,
      name: data?.data?.name,
      email: data?.data?.email,
    },
    locationInfo: { name: "ile ife", address: data?.data?.address },
    fields: [
      { name: "name", value: data?.data?.visitor?.name },
      { name: "email", value: data?.data?.visitor?.email },
      { name: "purpose", value: data?.data?.visitor?.purpose },
      { name: "phone number", value: data?.data?.visitor?.phone_number },
      {
        name: "company",
        value:
          data?.data?.companyInfo?.name != null
            ? data?.data?.companyInfo?.name
            : "N/A",
      },
      { name: "address", value: data?.data?.visitor?.address },
      {
        name: "arrival time",
        value: getDateFromTimestamp(data?.data?.visitor?.visiting_date),
      },
    ],
    host: { first_name: "lorem", last_name: "ipsum" },
    visiting_date: getDateFromTimestamp(data?.data?.visitor?.visiting_date),
  };

  const getVisitorName = (fields) => {
    const nameField = fields.find((field) => field.field_name === "name");
    return nameField.field_value;
  };
  const getVisitorEmail = (fields) => {
    const emailField = fields.find((field) => field.field_name === "email");
    return emailField.field_value;
  };
  const getVisitorPhone = (fields) => {
    const phoneField = fields.find(
      (field) => field.field_name === "phone_number"
    );
    return phoneField.field_value;
  };

  const handleSignOut = (id) => {
    console.log("hiii");
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error?.message} />;
  }

  const payLoad = {
    message: message,
    visitorEmail: data?.data?.visitor?.email,
  };

  const handleSubmit = async () => {
    console.log(payLoad);
    setSubmitting(true);

    try {
      await Api.post("settings/visit-quick-reply", payLoad).then((res) => {
        console.log(res);
        setShowSuccess(true);
        setSubmitting(false);
        setMessage("");

        // res.statusText == "OK" && window.location.reload();
      });
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };

  const handleQuickReply = async (msg) => {
    const CustomPayLoad = {
      message: msg,
      visitorEmail: data?.data?.visitor?.email,
    };

    console.log(CustomPayLoad);
    setSubmitting(true);

    try {
      await Api.post("settings/visit-quick-reply", CustomPayLoad).then(
        (res) => {
          console.log(res);
          setShowSuccess(true);
          setSubmitting(false);

          // res.statusText == "OK" && window.location.reload();
        }
      );
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto p-3 max-w-[400px] w-11/12  my-4 rounded-sm">
      {showSuccess ? (
        <Success
          message={"Message Sent Successfully!"}
          setShowSuccess={setShowSuccess}
        />
      ) : (
        <div className="mx-auto bg-white p-3 max-w-[400px] w-11/12  my-4 rounded-sm">
          <div>
            <h3 className="text-center text-xl font-semibold my-2 text-black">
              Visitor for Mr{" "}
              {data?.data.host?.first_name !== undefined
                ? data?.data.host.first_name.toString()
                : data?.data.host === null
                  ? "carrot suite"
                  : "carrot suite"}
            </h3>

            <div className="h-32 w-32 mx-auto rounded-sm">
              <img
                src={data?.data.visitor.avatar || avatar}
                className="h-full w-full object-cover rounded-sm"
                alt="avatar"
              />
            </div>
          </div>
          <div>
            {visitor.fields.map(({ name, value }, index) => (
              <div
                className={`flex p-3 ${index % 2 === 0 ? "bg-lightest" : "bg-white"
                  }  break-words`}
              >
                <p className="w-2/5 font-semibold text-black capitalize">
                  {name}
                </p>
                <p
                  className={`w-3/5 text-dark ${value?.indexOf(" ") > 0 ? "capitalize" : ""
                    }`}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <h5 className="text-black font-semibold text-lg my-2">
              Send a quick response
            </h5>

            <p className="border border-lightblues text-white bg-lightblue text-left block p-3 w-full rounded-md hover:bg-blue hover:text-white">
              Send a quick reply,
            </p>
            {["Wait i'll see you shortly", "I'm not around"].map(
              (btn, index) => (
                <button
                  key={index}
                  className={`border border-lightblues 
          "text-lightblue bg-white mt-2"
          } block p-3 w-full rounded-md hover:bg-blue hover:text-black`}
                  onClick={() => handleQuickReply(btn)}
                >
                  {btn}
                </button>
              )
            )}
            <h6 className="text-black my-2">Enter a custom response</h6>
            <textarea
              name=""
              id=""
              rows="5"
              className="border border-light w-full rounded-md"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          {/* <button className="bg-darkred border-none py-3 px-4 w-full block rounded-md mt-2 text-white" onClick={handleSubmit}>

    {
      submitting ? (
        <ButtonSpinner />) : "Send"
    }

  </button> */}

          {submitting ? (
            <ButtonSpinner />
          ) : (
            <button
              type="submit"
              className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue text-lg  mt-3"
              onClick={handleSubmit}
            >
              send
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VisitorEBadge;
