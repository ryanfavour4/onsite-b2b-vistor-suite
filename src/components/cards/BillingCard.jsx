import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Api } from "../../axios";
import { ToggleOffIcon, ToggleOnIcon } from "../../icons/Icons";
import "./BillingCard.css";

const BillingCard = ({ plans }) => {
  const [toggleBilling, setToggleBilling] = useState(false);
  const [planType, setPlanType] = useState("monthly");
  const [activePlan, setActivePlan] = useState("");
  const [userCountry, setUserCountry] = useState("156");
  const {
    plan_name,
    monthly_billing,
    description,
    monthly_dollar_billing,
    yearly_billing,
    yearly_dollar_billing,
    id,
    paystack_monthly_plan,
    duration,
    is_active,
  } = plans;

  const [price, setPrice] = useState(monthly_billing);

  const handleTogglePricePlan = (e) => {
    if (price == monthly_billing) {
      setPlanType("yearly");
      setPrice(yearly_billing);
    } else if (price == yearly_billing) {
      setPlanType("monthly");
      setPrice(monthly_billing);
    }
  };

  useEffect(() => {
    try {
      const fetchPlan = async () => {
        await Api.get("/users/current").then((res) => {
          setActivePlan(res.data?.data.plan?.plan_name);
        });
      };
      const fetchCountry = async () => {
        await Api.get("/users/current").then((res) => {
          setUserCountry(res.data?.data.user?.country);
        });
      };

      fetchPlan();
      fetchCountry();
    } catch (error) {
      console.log(error);
    }
  }, [activePlan]);

  return (
    <div className="w-full flex flex-col lg:grid billing-card p-4 ">
      <h3 className="font-semibold text-2xl capitalize">{plan_name}</h3>
      <p className="text-sm ">{description}</p>
      <p className="font-bold text-black text-2xl my-3 lg:my-0 lg:text-md">
        ₦{Number(price).toLocaleString()}
      </p>
      <div className="font-bold text-base flex items-center justify-between my-2 mb-4">
        <div className="">Monthly</div>
        <label className="custom-toggle-switch">
          <input onChange={handleTogglePricePlan} type="checkbox" />
          <span className="custom-toggle-slider" />
        </label>
        <div className="">Yearly</div>
      </div>
      <div className="flex items-center">
        <Link
          to={`/checkoutpage/${plan_name}/${planType}/${id}`}
          className={`w-full bg-lightblue px-4 py-3 uppercase font-semibold text-white rounded-md lg:block text-center hidden ${
            plan_name == activePlan &&
            "greyed-out pointer-events-none unclickable"
          }`}
        >
          get started
        </Link>
      </div>

      {/* <div className="my-4">
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
      </div> */}

      <div className="bottom__text">
        <Link to={`/checkoutpage/${plan_name}/${planType}/${id}`}>
          learn more
        </Link>
      </div>
    </div>
  );
};

export default BillingCard;
