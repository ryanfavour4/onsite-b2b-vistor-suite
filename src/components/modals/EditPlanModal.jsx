import { useEffect, useState } from "react";
import CloseModalBtn from "./CloseModalBtn";
import Success from "../Success";
import { Api } from "../../axios";
import Loading from "../Loading";

const EditPlanModal = ({
  showModal,
  setShowModal,
  id,
  planDetails,
  setRefresh,
  isLoading,
  setIsLoading,
}) => {
  console.log(planDetails.plan_name);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [monthlyBilling, setMonthlyBilling] = useState(0);
  const [monthlyDollarBilling, setMonthlyDollarBilling] = useState(0);
  const [yearlyBilling, setYearlyBilling] = useState(0);
  const [yearlyDollarBilling, setYearlyDollarBilling] = useState(0);
  const [paystackMonthlyPlan, setPaystackMonthlyPlan] = useState("");
  const [paystackYearlyPlan, setPaystackYearlyPlan] = useState("");
  const [isActive, setIsActive] = useState(1);
  const [extraLocationMonthlyNgn, setExtraLocationMonthlyNgn] = useState(0);
  const [extraLocationMonthlyUsd, setExtraLocationMonthlyUsd] = useState(0);
  const [removeCarrotsuiteBrandingNgn, setRemoveCarrotsuiteBrandingNgn] =
    useState(0);
  const [removeCarrotsuiteBrandingUsd, setRemoveCarrotsuiteBrandingUsd] =
    useState(0);
  const [staffAttendanceEnableNgn, setStaffAttendanceEnableNgn] = useState(0);
  const [staffAttendanceEnableUsd, setStaffAttendanceEnableUsd] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(planDetails);
    try {
      setName(planDetails.plan_name);
      setDescription(planDetails.description);
      setMonthlyBilling(planDetails.monthly_billing);
      setYearlyBilling(planDetails.yearly_billing);
      setMonthlyDollarBilling(planDetails.monthly_dollar_billing);
      setYearlyDollarBilling(planDetails.yearly_dollar_billing);
      setRemoveCarrotsuiteBrandingNgn(
        planDetails.remove_carrotsuite_branding_ngn
      );
      setRemoveCarrotsuiteBrandingUsd(
        planDetails.remove_carrotsuite_branding_usd
      );
      setStaffAttendanceEnableNgn(planDetails.staff_attendance_ngn)
      setStaffAttendanceEnableUsd(planDetails.staff_attendance_usd)
      setExtraLocationMonthlyNgn(planDetails.extra_location_monthly_ngn);
      setExtraLocationMonthlyUsd(planDetails.extra_location_monthly_usd);
      setIsActive(planDetails.is_active == 1 ? "true" : "false");
      setPaystackMonthlyPlan(planDetails.paystack_monthly_plan);
      setPaystackYearlyPlan(planDetails.paystack_yearly_plan);
    } catch (error) {
      console.log(error);
    }
  }, [planDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        plan_name: name,
        monthly_billing: monthlyBilling,
        yearly_billing: yearlyBilling,
        monthly_dollar_billing: monthlyDollarBilling,
        yearly_dollar_billing: yearlyDollarBilling,
        description: description,
        remove_carrotsuite_branding_usd: removeCarrotsuiteBrandingUsd,
        remove_carrotsuite_branding_ngn: removeCarrotsuiteBrandingNgn,
        staff_attendance_ngn: staffAttendanceEnableNgn,
        staff_attendance_usd: staffAttendanceEnableUsd,
        extra_location_monthly_usd: extraLocationMonthlyUsd,
        extra_location_monthly_ngn: extraLocationMonthlyNgn,
        is_active: isActive == "true" ? 1 : 0,
        paystack_yearly_plan: paystackYearlyPlan,
        paystack_monthly_plan: paystackMonthlyPlan,
      };

      console.log(payload);

      Api.put(`admin/plans/${id}`, payload).then((res) => {
        console.log(res);

        if (res.status == "200") {
          setIsLoading(false);
          setShowSuccess(true);
          // setRefresh(true);
        }
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={`${showModal ? "modal" : "hidden"} text-sm`}>
      {showSuccess ? (
        <Success
          message={"Plan Details Updated Successfully!"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
        />
      ) : isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit} className="relative modal--content">
          <CloseModalBtn setShowModal={setShowModal} />
          <div className="mb-3">
            <label htmlFor="name" className="font-semibold text-black ">
              Plan Name
            </label>
            <input
              type="text"
              value={name}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter plan name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="font-semibold text-black">
              monthly Billing
            </label>
            <div className="flex">
              <input
                type="number"
                value={monthlyBilling}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setMonthlyBilling(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="font-semibold text-black">
              monthly Dollar Billing
            </label>
            <div className="flex">
              <input
                type="number"
                value={monthlyDollarBilling}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setMonthlyDollarBilling(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="font-semibold text-black">
              Yearly Billing
            </label>
            <div className="flex">
              <input
                type="number"
                value={yearlyBilling}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setYearlyBilling(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="font-semibold text-black">
              Yearly Dollar Billing
            </label>
            <div className="flex">
              <input
                type="number"
                value={yearlyDollarBilling}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setYearlyDollarBilling(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="font-semibold text-black">
              Paystack monthly plan
            </label>
            <div className="flex">
              <input
                type="text"
                value={paystackMonthlyPlan}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setPaystackMonthlyPlan(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="font-semibold text-black">
              paystack yearly plan
            </label>
            <div className="flex">
              <input
                type="text"
                value={paystackYearlyPlan}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setPaystackYearlyPlan(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="font-semibold text-black">
              active
            </label>
            <div className="flex">
              <input
                type="text"
                value={isActive}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setIsActive(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="font-semibold text-black">
              extra monthly location
            </label>
            <div className="flex">
              <input
                type="number"
                value={extraLocationMonthlyNgn}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setExtraLocationMonthlyNgn(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="font-semibold text-black">
              extra location in usd
            </label>
            <div className="flex">
              <input
                type="number"
                value={extraLocationMonthlyUsd}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setExtraLocationMonthlyUsd(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="font-semibold text-black">
              remove carrotsuite branding
            </label>
            <div className="flex">
              <input
                type="number"
                value={removeCarrotsuiteBrandingNgn}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) =>
                  setRemoveCarrotsuiteBrandingNgn(e.target.value)
                }
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="font-semibold text-black">
              remove carrotsuite branding in usd{" "}
            </label>
            <div className="flex">
              <input
                type="number"
                value={removeCarrotsuiteBrandingUsd}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) =>
                  setRemoveCarrotsuiteBrandingUsd(e.target.value)
                }
              />
            </div>
          </div>

          {/* ============= STAFF ATTENDANCE ========= */}

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="font-semibold text-black">
              enable staff attendance
            </label>
            <div className="flex">
              <input
                type="number"
                value={staffAttendanceEnableNgn}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) =>
                  setStaffAttendanceEnableNgn(e.target.value)
                }
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="font-semibold text-black">
              enable staff attendance in usd
            </label>
            <div className="flex">
              <input
                type="number"
                value={staffAttendanceEnableUsd}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) =>
                  setStaffAttendanceEnableUsd(e.target.value)
                }
              />
            </div>
          </div>

          {/* // !! ============= STAFF ATTENDANCE ========= */}

          <div className="mb-3">
            <label htmlFor="privateNote" className="font-semibold text-black">
              Description
            </label>
            <textarea
              name="privateNote"
              id="privateNote"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              cols="4"
              rows="3"
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue mt-1 text-sm"
            onClick={handleSubmit}
          >
            Update plan details
          </button>
        </form>
      )}
    </div>
  );
};

export default EditPlanModal;
