import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Api } from "../../axios";
import { ToggleOffIcon, ToggleOnIcon } from "../../icons/Icons";
import "./BillingCard.css";
import { briefBillingData } from "../../data";

const DowngradePlan = ({ data }) => {
  const [toggleBilling, setToggleBilling] = useState(false);
  const [method, setMethod] = useState("monthly");
  const [activePlan, setActivePlan] = useState("");

  const handleBillingToggle = () => {
    setToggleBilling(!toggleBilling);
  };

  useEffect(() => {
    try {
      const fetchPlan = async () => {
        await Api.get("/users/current").then((res) => {
          // console.log(res.data.data.plan);
          setActivePlan(res.data?.data.plan?.plan_name);
        });
      };

      briefBillingData.forEach((newData) => {
        setData((prevData) => ({ ...prevData, ...newData }));
      });

      fetchPlan();
    } catch (error) {
      console.log(error);
    }
  }, [activePlan]);

  useEffect(() => {
    if (toggleBilling) {
      setMethod("yearly");
    } else {
      setMethod("monthly");
    }
  }, [toggleBilling]);

  // console.log(activePlan);

  const { name, description, price, url, highlights } = data;

  // console.log(data);

  const mainURL = url + "/" + method;
  return (
    <div className="w-full flex flex-col lg:grid billing-card p-4 ">
      <h3 className="font-semibold text-2xl capitalize">{name}</h3>
      <p className="text-sm ">{description}</p>
      <p className="font-bold text-black text-2xl my-3 lg:my-0 lg:text-md">
        {toggleBilling ? (
          <>
            ${price * 12} USD
            <span className="font-semibold text-dark">/year</span>
          </>
        ) : (
          <>
            ${price} USD<span className="font-semibold text-dark">/mo</span>
          </>
        )}

        <div className="billingcard__toggle">
          {toggleBilling ? (
            <>
              <p>monthly</p>{" "}
              <p onClick={handleBillingToggle} className="active">
                <ToggleOnIcon />
              </p>{" "}
              <p>yearly</p>
            </>
          ) : (
            <>
              <p>monthly</p>{" "}
              <p onClick={handleBillingToggle}>
                <ToggleOffIcon />
              </p>{" "}
              <p>yearly</p>
            </>
          )}
        </div>
      </p>
      <div className="flex items-center">
        <Link
          to={mainURL}
          className={
            name == activePlan
              ? "w-full bg-lightblue px-4 py-3 uppercase font-semibold text-white rounded-md lg:block text-center hidden greyed-out unclickable"
              : "w-full bg-lightblue px-4 py-3 uppercase font-semibold text-white rounded-md lg:block text-center hidden"
          }
        >
          get started
        </Link>
      </div>

      <div className="my-4">
        {highlights.heading ? (
          <h5 className="font-semibold text-sm mb-2">{highlights.heading}</h5>
        ) : (
          <h5 className="lg:opacity-0 hidden ">highlight</h5>
        )}
        {highlights.body.map((highlight) => (
          <div className="flex my-3 lg:my-0">
            <i class="mr-2 fa-solid fa-check"></i>
            <p className="text-sm">{highlight}</p>
          </div>
        ))}
      </div>

      <div className="bottom__text">
        <Link to={mainURL}>learn more</Link>
      </div>
    </div>
  );
};

export default DowngradePlan;
