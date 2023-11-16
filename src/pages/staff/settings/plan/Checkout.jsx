import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../../../../axios";
import {
  CheckIcon,
  HelpIcon,
  LockIcon,
  ToggleOffIcon,
  ToggleOnIcon,
} from "../../../../icons/Icons";
import "./Checkout.css";
import { subscriptionListArray } from "../../../../features/subscriptionSlice";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const { plan, id, method } = useParams();
  const subscriptionList = useSelector(subscriptionListArray);
  const [selectedSubscription, setSelectedSubscription] = useState([]);
  const [briefBillingData, setBriefBillingData] = useState([]);

  console.log(id);

  useEffect(() => {
    const selectedPlan = subscriptionList.find((item) => {
      return item.id == id;
    });
    console.log(selectedPlan);
    setSelectedSubscription(selectedPlan);
    return () => {
      setSelectedSubscription([]);
    };
  }, [subscriptionList]);

  const [count, setCount] = useState(0);
  const [toggleBrand, setToggleBrand] = useState(false);
  const [enableStaffAtt, setEnableStaffAtt] = useState(false);
  const [monthlyChecked, setMonthlyChecked] = useState(false);
  const [focus, setFocus] = useState("");
  const [brandPrice, setBrandPrice] = useState(0);
  const [locationPrice, setLocationPrice] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [planId, setPlanId] = useState(Number);
  const [userCountry, setUserCountry] = useState("156");

  // const setBrandPricing = () => {
  //   if (plan == "basic" && userCountry == "156") {
  //     if (monthlyChecked) {
  //       setBrandPrice(Math.round(100 / 12));
  //     } else {
  //       setBrandPrice(100);
  //     }
  //   }

  //   if (plan == "basic" && userCountry !== "156") {
  //     if (monthlyChecked) {
  //       setBrandPrice(Math.round(200 / 12));
  //     } else {
  //       setBrandPrice(200);
  //     }
  //   }

  //   if (plan == "premium" && userCountry == "156") {
  //     // setBrandPrice(toggleBrand ? 0 : 150)

  //     if (monthlyChecked) {
  //       setBrandPrice(Math.round(150 / 12));
  //     } else {
  //       setBrandPrice(150);
  //     }
  //   }

  //   if (plan == "premium" && userCountry !== "156") {
  //     // setBrandPrice(toggleBrand ? 0 : 250)

  //     if (monthlyChecked) {
  //       setBrandPrice(Math.round(250 / 12));
  //     } else {
  //       setBrandPrice(250);
  //     }
  //   }

  //   if (plan == "enterprise-grid" && userCountry == "156") {
  //     // setBrandPrice(toggleBrand ? 0 : 200)

  //     if (monthlyChecked) {
  //       setBrandPrice(Math.round(200 / 12));
  //     } else {
  //       setBrandPrice(200);
  //     }
  //   }

  //   if (plan == "enterprise-grid" && userCountry !== "156") {
  //     // setBrandPrice(toggleBrand ? 0 : 300)

  //     if (monthlyChecked) {
  //       setBrandPrice(Math.round(300 / 12));
  //     } else {
  //       setBrandPrice(300);
  //     }
  //   }
  // };

  const increaseLocation = () => {
    setCount(count + 1);

    setLocationPrice(
      parseFloat(locationPrice) +
      parseFloat(briefBillingData?.extra_location_monthly_ngn)
    );

    // if (plan == "basic") {
    //   setLocationPrice(
    //     userCountry == "156" ? locationPrice + 7000 : locationPrice + 15
    //   );
    // }

    // if (plan == "premium") {
    //   setLocationPrice(
    //     userCountry == "156" ? locationPrice + 15000 : locationPrice + 35
    //   );
    // }

    // if (plan == "enterprise-grid") {
    //   setLocationPrice(
    //     userCountry == "156" ? locationPrice + 40000 : locationPrice + 100
    //   );
    // }
  };

  const decreaseLocation = () => {
    setCount(count - 1);

    setLocationPrice(
      parseFloat(locationPrice) -
      parseFloat(briefBillingData?.extra_location_monthly_ngn)
    );
    // if (plan == "basic") {
    //   setLocationPrice(
    //     userCountry == "156" ? locationPrice - 7000 : locationPrice - 15
    //   );
    // }

    // if (plan == "premium") {
    //   setLocationPrice(
    //     userCountry == "156" ? locationPrice - 15000 : locationPrice - 35
    //   );
    // }

    // if (plan == "enterprise-grid") {
    //   setLocationPrice(
    //     userCountry == "156" ? locationPrice - 40000 : locationPrice - 100
    //   );
    // }
  };

  const handleBrand = () => {
    setToggleBrand(true);
    setBrandPrice(briefBillingData?.remove_carrotsuite_branding_ngn);
  };

  const handleBrandOff = () => {
    setToggleBrand(false);
    setBrandPrice(0);
  };

  const handleEnableStaffAtt = () => {
    setEnableStaffAtt(true);
    // setBrandPrice(briefBillingData?.remove_carrotsuite_branding_ngn);
  };

  const handleEnableStaffAttOff = () => {
    setEnableStaffAtt(false);
    setBrandPrice(0);
  };

  const handleRadioCheck = () => {
    setMonthlyChecked(!monthlyChecked);
  };

  useEffect(() => {
    if (method == "monthly") {
      setMonthlyChecked(true);
    } else {
      setMonthlyChecked(false);
    }
  }, []);

  console.log(plan);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (plan == "free plan") {
      setPlanId(1);
    } else if (plan == "Basic Plan") {
      setPlanId(3);
    } else if (plan == "Premium Plan") {
      setPlanId(5);
    } else if (plan == "Enterprise Plan") {
      setPlanId(6);
    } else {
      setPlanId(1);
    }

    try {
      const getCountry = async () => {
        await Api.get("users/current").then((res) => {
          console.log(res.data.data.user.country);
          setUserCountry(res.data.data.user.country);
        });
      };

      const getPlanDetails = async () => {
        await Api.get(`plans/get-plan/${id}`).then((res) => {
          console.log(res.data.data);
          setBriefBillingData(res.data.data);
          setLocationPrice(0);
          setIsLoading(false);
        });
      };

      getCountry();
      getPlanDetails();
    } catch (error) {
      console.log(error);
    }
  }, [isLoading]);

  // useEffect(() => {
  //   if (plan == "free") {
  //     setFocus(briefBillingData[0]);
  //   } else if (plan == "basic") {
  //     setFocus(briefBillingData[1]);
  //   } else if (plan == "premium") {
  //     setFocus(briefBillingData[2]);
  //   } else if (plan == "enterprise-grid") {
  //     setFocus(briefBillingData[3]);
  //   }
  // }, [plan]);

  const handleSubscription = async () => {
    const payload = {
      gateWayId: "GATEWAY_OO501",
      plan: planId,
      period: monthlyChecked ? "month" : "year",
      attendance: enableStaffAtt,
      branding: toggleBrand ? 1 : 0,
      location: count,
    };
    setIsFetching(true);

    console.log(payload);

    try {
      await Api.post("/subscriptions/subscribe", payload).then((res) => {
        console.log(res);
        setIsFetching(false);

        if (res.data.status == "success") {
          window.location.href = res.data.data?.checkoutUrl.authorization_url;
        }
      });
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  console.log(userCountry);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/paddle.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const paddle = window.Paddle;
      paddle.Setup({ vendor: 156108 });
    };
  }, []);

  const handlePayment = () => {
    window.Paddle.Checkout.open({
      product: 757131,
      email: "customer@example.com",
    });
  };

  const BrandValue = () => {
    if (userCountry == "156") {
      return (
        <>
          {formatLocalizedNumber(
            briefBillingData?.remove_carrotsuite_branding_ngn
          )}
        </>
      );
    }

    if (userCountry !== "156") {
      return (
        <>
          {formatLocalizedNumber(
            briefBillingData?.remove_carrotsuite_branding_usd
          )}
        </>
      );
    }

    // if (userCountry == "156" && plan == "basic") {
    //   return (
    //     <p>
    //       ₦{" "}
    //       {monthlyChecked
    //         ? Math.round(100000 / 12).toLocaleString()
    //         : (100000).toLocaleString()}
    //     </p>
    //   );
    // }

    // if (userCountry == "156" && plan == "premium") {
    //   return (
    //     <p>
    //       ₦{" "}
    //       {monthlyChecked
    //         ? Math.round(150000 / 12).toLocaleString()
    //         : (150000).toLocaleString()}
    //     </p>
    //   );
    // }

    // if (userCountry == "156" && plan == "enterprise-grid") {
    //   return (
    //     <p>
    //       ₦
    //       {monthlyChecked
    //         ? Math.round(200000 / 12).toLocaleString()
    //         : +(200000).toLocaleString()}
    //     </p>
    //   );
    // }

    // if (userCountry !== "156" && plan == "basic") {
    //   return (
    //     <p>
    //       ${" "}
    //       {monthlyChecked
    //         ? Math.round(200 / 12).toLocaleString()
    //         : (200).toLocaleString()}
    //     </p>
    //   );
    // }

    // if (userCountry !== "156" && plan == "premium") {
    //   return (
    //     <p>
    //       ${" "}
    //       {monthlyChecked
    //         ? Math.round(250 / 12).toLocaleString()
    //         : (250).toLocaleString()}
    //     </p>
    //   );
    // }

    // if (userCountry !== "156" && plan == "enterprise-grid") {
    //   return (
    //     <p>
    //       ${" "}
    //       {monthlyChecked
    //         ? Math.round(300 / 12).toLocaleString()
    //         : (300).toLocaleString()}
    //     </p>
    //   );
    // }
  };

  function formatLocalizedNumber(number) {
    return Number(number).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <div className="checkout">
      <h3>Review your plan and upgrade</h3>

      <div className="checkout__container">
        <div className="checkout__info">
          <h5>Choose Your Team Size</h5>

          <p>
            Team members have access to all projects and folders. Typically used
            for employees such as Designers, PM's, developers and researchers
          </p>

          <div className="checkout_info_count">
            {count > 1 ? <p onClick={decreaseLocation}>-</p> : <p>-</p>}

            <p>{count == 1 ? count + " Location" : count + " Locations"}</p>

            <p onClick={increaseLocation}>+</p>

            <div className="location__price">
              {userCountry == "156" ? (
                <div>
                  ₦{" "}
                  {formatLocalizedNumber(
                    monthlyChecked ? locationPrice : locationPrice * 12
                  )}
                </div>
              ) : (
                <div>
                  $
                  {formatLocalizedNumber(
                    briefBillingData?.extra_location_monthly_usd
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="checkout__branding">
            {toggleBrand ? (
              <p onClick={handleBrandOff} className="brand__color">
                <ToggleOnIcon />
              </p>
            ) : (
              <p onClick={handleBrand}>
                <ToggleOffIcon />
              </p>
            )}
            <p>Remove Carrotsuite Branding on mobile check in</p>{" "}
            <span>
              {" "}
              <b>
                <BrandValue />
              </b>
            </span>
          </div>
          <div className="checkout__branding">
            {enableStaffAtt ? (
              <p onClick={handleEnableStaffAttOff} className="brand__color">
                <ToggleOnIcon />
              </p>
            ) : (
              <p onClick={handleEnableStaffAtt}>
                <ToggleOffIcon />
              </p>
            )}
            <p>Enable Staff Attendance</p>{" "}
            <span>
              {" "}
              <b>
                {enableStaffAtt ? "Enabled" : "Disabled"}
              </b>
            </span>
          </div>

          <div className="checkout_info_cycle">
            <h3>choose your billing cycle</h3>

            <div className="checkout_info_cycle__select">
              {monthlyChecked ? (
                <div onClick={handleRadioCheck} className="radiochecked">
                  <input type="radio" name="select" id="radio" checked={true} />
                  <p>
                    Monthly billing <br />
                    <b>
                      ₦
                      {userCountry == "156" ? (
                        <>
                          {formatLocalizedNumber(
                            parseFloat(briefBillingData?.monthly_billing) +
                            parseFloat(locationPrice) +
                            parseFloat(brandPrice)
                          )}
                        </>
                      ) : (
                        <>
                          $
                          {formatLocalizedNumber(
                            briefBillingData?.monthly_dollar_billing
                          )}
                        </>
                      )}
                    </b>
                    /month, per user
                  </p>
                </div>
              ) : (
                <div onClick={handleRadioCheck} className="radionotchecked">
                  <input
                    type="radio"
                    name="select"
                    id="radio"
                    checked={false}
                  />
                  <p>
                    Monthly billing <br />
                    <b>
                      {userCountry == "156" ? (
                        <>
                          ₦
                          {formatLocalizedNumber(
                            parseFloat(briefBillingData?.monthly_billing) +
                            parseFloat(locationPrice) +
                            parseFloat(brandPrice)
                          )}
                        </>
                      ) : (
                        <>
                          $
                          {formatLocalizedNumber(
                            briefBillingData?.monthly_dollar_billing
                          )}
                        </>
                      )}
                    </b>
                    /month, per user
                  </p>
                </div>
              )}

              {monthlyChecked ? (
                <div onClick={handleRadioCheck} className="radionotchecked">
                  <input type="radio" name="select" id="" checked={false} />
                  <p>
                    Yearly billing <span>SAVE 25%</span>
                    <br />
                    <b>
                      {" "}
                      {userCountry == "156" ? (
                        <>
                          ₦
                          {formatLocalizedNumber(
                            parseFloat(briefBillingData?.yearly_billing) +
                            parseFloat(locationPrice) +
                            parseFloat(brandPrice)
                          )}
                        </>
                      ) : (
                        <>
                          $
                          {formatLocalizedNumber(
                            briefBillingData?.yearly_dollar_billing
                          )}
                        </>
                      )}
                    </b>
                    /year, per user
                  </p>
                </div>
              ) : (
                <div onClick={handleRadioCheck} className="radiochecked">
                  <input type="radio" name="select" id="" checked={true} />
                  <p>
                    Yearly billing <span>SAVE 25%</span>
                    <br />
                    <b>
                      {" "}
                      {userCountry == "156" ? (
                        <>
                          ₦
                          {formatLocalizedNumber(
                            parseFloat(briefBillingData?.yearly_billing) +
                            parseFloat(locationPrice) +
                            parseFloat(brandPrice)
                          )}
                        </>
                      ) : (
                        <>
                          $
                          {formatLocalizedNumber(
                            briefBillingData?.yearly_dollar_billing
                          )}
                        </>
                      )}
                    </b>
                    /year, per user
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="checkout_info_card__info">
            <div className="card__number">
              <h3>Card number</h3>

              <input
                type="number"
                placeholder="enter your credit card number"
              />
            </div>

            <div className="checkout_info_card__info__flex">
              <div className="card__number">
                <h3>Expiry date</h3>

                <input type="text" placeholder="MM/YY" />
              </div>

              <div className="card__number">
                <h3>
                  Security code{" "}
                  <span>
                    <HelpIcon />
                  </span>
                </h3>

                <input type="text" placeholder="CVC/CVV" />
              </div>
            </div>
          </div>
        </div>

        <div className="checkout__continue">
          <h1>{plan}</h1>

          <h3>Plan summary</h3>

          {focus?.highlights?.body.map((e, i) => {
            return (
              <div key={i} className="checkout__continue__list">
                <p>
                  <CheckIcon /> {e}
                </p>
              </div>
            );
          })}

          {monthlyChecked ? (
            <h5>Total per monthly</h5>
          ) : (
            <h5>Total per yearly</h5>
          )}

          <div className="price">
            {monthlyChecked ? (
              <>
                {userCountry == "156" ? (
                  <>
                    <p>
                      ₦
                      {formatLocalizedNumber(
                        parseFloat(
                          monthlyChecked ? locationPrice : locationPrice * 12
                        ) +
                        parseFloat(brandPrice) +
                        parseFloat(briefBillingData?.monthly_billing)
                      )}{" "}
                    </p>{" "}
                    <span>
                      <sup> $144</sup>
                    </span>
                  </>
                ) : (
                  <>
                    <p>
                      $
                      {(
                        focus?.priceUsd +
                        brandPrice +
                        locationPrice
                      ).toLocaleString()}
                    </p>{" "}
                    <span>
                      <sup> $144</sup>
                    </span>
                  </>
                )}
              </>
            ) : (
              <>
                {userCountry == "156" ? (
                  <>
                    <p>
                      ₦
                      {formatLocalizedNumber(
                        parseFloat(
                          monthlyChecked ? locationPrice : locationPrice * 12
                        ) +
                        parseFloat(brandPrice) +
                        parseFloat(briefBillingData?.yearly_billing)
                      )}{" "}
                    </p>{" "}
                    <span>
                      <sup> $144</sup>
                    </span>
                  </>
                ) : (
                  <>
                    <p>
                      $
                      {(
                        (focus?.priceUsd + locationPrice) * 12 +
                        brandPrice
                      ).toLocaleString()}
                    </p>{" "}
                    <span>
                      <sup> $144</sup>
                    </span>
                  </>
                )}
              </>
            )}
          </div>

          <div className="checkout__btn">
            {monthlyChecked ? (
              <>
                {isFetching ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <p
                    onClick={
                      userCountry == "156" ? handleSubscription : handlePayment
                    }
                  >
                    {userCountry == "156" ? (
                      // <>
                      //   pay ₦
                      //   {(
                      //     focus?.priceNaira +
                      //     brandPrice +
                      //     locationPrice
                      //   ).toLocaleString()}{" "}
                      //   and upgrade
                      // </>

                      <>
                        pay ₦
                        {formatLocalizedNumber(
                          parseFloat(
                            monthlyChecked ? locationPrice : locationPrice * 12
                          ) +
                          parseFloat(brandPrice) +
                          parseFloat(briefBillingData?.monthly_billing)
                        )}{" "}
                        {""}
                        and upgrade
                      </>
                    ) : (
                      <>pay now</>
                    )}
                  </p>
                )}
              </>
            ) : (
              <>
                {isFetching ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <p
                    onClick={
                      userCountry == "156" ? handleSubscription : handlePayment
                    }
                  >
                    {userCountry == "156" ? (
                      <>
                        pay ₦
                        {parseFloat(
                          monthlyChecked ? locationPrice : locationPrice * 12
                        ) +
                          parseFloat(brandPrice) +
                          parseFloat(briefBillingData?.yearly_billing)}{" "}
                        and upgrade
                      </>
                    ) : (
                      <>Pay Now</>
                    )}
                  </p>
                )}
              </>
            )}
          </div>

          <div className="checkout__secured">
            <p>
              <LockIcon />
            </p>
            <p>
              this is a secure 128-SSL encrypted. Read our terms of service and
              other policies here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
