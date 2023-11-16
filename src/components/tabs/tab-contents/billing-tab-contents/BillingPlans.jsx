import React, { useEffect } from "react";
import { briefBillingData, detailedBillingPlans } from "../../../../data";
import useFetch from "../../../../hooks/useFetch";
import getTableHeading from "../../../../utils/getTableHeading";
import BillingCard from "../../../cards/BillingCard";
import Loading from "../../../Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  setSubscriptionList,
  subscriptionListArray,
} from "../../../../features/subscriptionSlice";

const BillingPlans = () => {
  const subscriptionList = useSelector(subscriptionListArray);
  const dispatch = useDispatch();
  const { loading, error, data } = useFetch("plans/all-plans", []);
  // const { loading, error, data } = useFetch("users/subscription", []);

  useEffect(() => {
    if (data) {
      console.log(data);
      dispatch(setSubscriptionList(data?.data));
    }
  }, [data]);

  if (subscriptionList.length < 1 && loading) {
    return <Loading />;
  }

  return (
    <div>
      {/* <div className="flex flex-wrap space-x-4">
        {loading ? (
          <Loading />
        ) : (
          data?.data?.plans.map(
            ({ plan_name, id, monthly_billing, yearly_billing }) => (
              <div className="p-4 shadow-md mt-4 rounded-md">
                <h1 className="font-semibold text-lg my-1 text-blue">
                  {plan_name}
                </h1>
                <p>{monthly_billing}$ per month</p>
                <p>{yearly_billing}$ per year</p>

                <Link
                  to={`/billing/${id}`}
                  className="w-full bg-lightblue px-4 py-3 uppercase font-semibold text-white rounded-md lg:block text-center hidden mt-2"
                >
                  select plan
                </Link>
              </div>
            )
          )
        )}
      </div> */}

      <div className="flex flex-col lg:flex-row border-lightblue border-0 border-solid border-t-4 py-4  h-max shadow-xl mx-auto w-full max-w-6xl min-h-max mt-16">
        {subscriptionList.map((plans, index) => {
          return (
            plans.is_active == 1 && (
              <div
                className={`border-lightest border-solid ${
                  index != briefBillingData.length - 1
                    ? "border-0 lg:border-r-[1px] my-5 lg:my-0 shadow-lg lg:shadow-none"
                    : "border-0"
                } flex-1 flex-col align-between relative`}
                key={index}
              >
                <BillingCard plans={plans} />
              </div>
            )
          );
        })}
      </div>

      {/* ----------- DETAILED BILLING PLANS TABLE -------- */}
      <table
        className="table-auto hidden lg:block w-full min-w-max my-4 mt-20 mx-auto max-w-6xl"
        style={{ borderSpacing: "15px 0" }}
      >
        <thead className=" text-sm">
          <tr className="">
            {detailedBillingPlans.headings.map((header) => (
              <>
                <th
                  key={header}
                  className={` bth capitalize border-0 px-3 py-5 font-semibold rounded-t-sm  ${
                    header === "rowTitle" ? "opacity-0" : "bg-lightest "
                  } `}
                >
                  {getTableHeading(header)}
                </th>
                <th className="bth px-2"></th>
              </>
            ))}
          </tr>
        </thead>

        <tbody className="text-sm  ">
          {detailedBillingPlans.data.map((subData) => (
            <>
              {subData.data.map((row, index) => {
                return (
                  <tr
                    key={index}
                    className={` ${
                      index == 0 ? "font-semibold subtr w-max " : "btr-hover"
                    }`}
                  >
                    {detailedBillingPlans.headings.map((entry) => {
                      return (
                        <>
                          <td
                            className={` text-center p-1 px-8 py-3  ${
                              entry === "rowTitle"
                                ? "!text-left"
                                : "bg-lightest btd-hover capitalize"
                            } ${
                              entry == "rowTitle" &&
                              index != 0 &&
                              row[entry].tooltip !== ""
                                ? " underline decoration-1 decoration-dotted hover:cursor-pointer "
                                : ""
                            }`}
                            key={entry}
                          >
                            {index == 0 ? (
                              <>{row[entry]}</>
                            ) : (
                              <>
                                {entry == "rowTitle" ? (
                                  <p
                                    className={`${
                                      row[entry].tooltip !== ""
                                        ? "tooltip "
                                        : ""
                                    }`}
                                  >
                                    <>{row[entry].title}</>
                                    <p className="tooltiptext">
                                      {row[entry].tooltip}
                                    </p>
                                  </p>
                                ) : (
                                  <>
                                    {row[entry] ==
                                    subData.data[index > 0 ? index - 1 : 0][
                                      entry
                                    ] ? (
                                      <i class="mr-2 fa-solid fa-check"></i>
                                    ) : (
                                      <>{row[entry]}</>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </td>
                          <td className="px-2"></td>
                        </>
                      );
                    })}
                  </tr>
                );
              })}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingPlans;
