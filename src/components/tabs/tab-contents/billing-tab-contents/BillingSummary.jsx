import { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import Loading from "../../../Loading";
import { Api } from "../../../../axios";
import { formatDate } from "../../../../utils/formatDate";
import { Link } from "react-router-dom";
import RangeLevelBar from "../../../RangeLevelBar";

export function BillingSummary() {
	const { plans, newSmsVisitorNotifications, subscription, totalStaffs, visitorsPerMonth, activePlan, loading } = useBillingSummary();

	if (loading) {
		return <Loading />;
	}

	return (
		<div>
			<div className="flex justify-between gap-4">
				<div className=" flex justify-center flex-col max-w-xl gap-8 w-full">
					{
						<div className="border border-light p-6 rounded-md">
							<div className="flex justify-between gap-5 mb-6 items-center">
								<div className="text-lg font-semibold">
									<p>{activePlan?.plan?.plan_name}</p>
									<h3 className="text-2xl max-w-xs">{activePlan?.plan?.description || activePlan?.plan?.plan_name}</h3>
								</div>
								<button className="border-blue text-blue border-2 outline-none px-6 py-3 rounded-lg">
									Active Plan
								</button>
							</div>
							<div className="flex items-center gap-4 text-xl">
								<p>₦{Number(activePlan?.plan?.monthly_billing).toLocaleString()} Per Month</p>
								-
								<p>₦{Number(activePlan?.plan?.yearly_billing).toLocaleString()} Per Year</p>
							</div>
							{/* <div className="flex justify-between items-center mt-6 bg-light rounded-md p-1 px-3">
								<p className="text-lg">{activePlan?.plan?.plan_name}</p>
								<p className="text-lg">Active</p>
							</div> */}
							<div className="mt-6">
								<div className="flex justify-between items-center">
									<p>Visitors Per Month</p>
									<p>{`${visitorsPerMonth} / ${subscription?.visitorsPerMonth}`}</p>
								</div>
								<RangeLevelBar max={subscription?.visitorsPerMonth} min={0} val={visitorsPerMonth} />

								{/* <input
									type="range"
									value={visitorsPerMonth}
									step={1}
									min={0}
									max={subscription?.visitorsPerMonth}
									className="w-full accent-light"
								/> */}
								<p>
									{isNaN(subscription?.visitorsPerMonth) ? "Unlimited" : subscription?.visitorsPerMonth - visitorsPerMonth} Remaining
								</p>
							</div>
							<div className="mt-6">
								<div className="flex justify-between items-center">
									<p>Staffs</p>
									<p>{`${totalStaffs} / ${subscription?.staffs}`}</p>
								</div>
								<RangeLevelBar max={subscription?.staffs} min={0} val={totalStaffs} />
								{/* <input
									type="range"
									value={totalStaffs}
									step={1}
									min={0}
									max={subscription?.staffs}
									className="w-full accent-light"
								/> */}
								<p>
									{isNaN(subscription?.staffs) ? "Unlimited" : subscription?.staffs - totalStaffs} Remaining
								</p>
							</div>
							<div className="mt-6">
								<div className="flex justify-between items-center">
									<p>New Visitor SMS Notification</p>
									<p>{`${newSmsVisitorNotifications?.usedUnit} / ${newSmsVisitorNotifications?.plan_limit} `}</p>
								</div>
								<RangeLevelBar max={newSmsVisitorNotifications?.plan_limit} min={0} val={newSmsVisitorNotifications?.usedUnit} />
								{/* <input
									type="range"
									value={totalStaffs}
									step={1}
									min={0}
									max={subscription?.staffs}
									className="w-full accent-light"
								/> */}
								<p>
									{isNaN(newSmsVisitorNotifications?.plan_limit) ? "Unlimited" : newSmsVisitorNotifications?.plan_limit - newSmsVisitorNotifications?.usedUnit} Remaining
								</p>
							</div>

						</div>}
					{/* // ??? ============= NON - SUBSCRIBED PLAN OR OTHER PLANS NOT SUBSCRIBED TO ===== */}
					{plans.filter((plan) => plan.plan_name !== activePlan?.plan?.plan_name).map((plan, index) => {
						return <div className="border border-light p-6 rounded-md">
							<div className="flex justify-between gap-5 mb-6 items-center">
								<div className="text-lg font-semibold">
									<p>{plan.plan_name}</p>
									<h3 className="text-2xl max-w-xs">{plan.description || plan.plan_name}</h3>
								</div>
								{plan.plan_name.includes("Free") ? (
									<Link to={`/checkoutpage/${plan.plan_name}/monthly/${plan.id}`} className="bg-blue text-white border-none outline-none px-6 py-3 rounded-lg">
										Downgrade To {plan.plan_name}
									</Link>) : (<Link to={`/checkoutpage/${plan.plan_name}/monthly/${plan.id}`} className="bg-blue text-white border-none outline-none px-6 py-3 rounded-lg">
										Upgrade To {plan.plan_name}
									</Link>)}

							</div>
							<div className="flex items-center gap-4 text-xl">
								<p>₦{Number(plan.monthly_billing).toLocaleString()} Per Month</p>
								-
								<p>₦{Number(plan.yearly_billing).toLocaleString()} Per Year</p>
							</div>
							{activePlan.plan?.plan_name === plan.plan_name && <>

								<div className="flex justify-between items-center mt-6 bg-light rounded-md p-1 px-3">
									<p className="text-lg">{plan.plan_name}</p>
									<p className="text-lg">Active</p>
								</div>
								<div className="mt-6">
									<div className="flex justify-between items-center">
										<p>Visitors Per Month</p>
										<p>71 / 100</p>
									</div>
									<input
										type="range"
										value={71}
										step={1}
										min={0}
										max={100}
										className="w-full accent-light"
									/>
									<p>
										{100 - 71} Remaining
									</p>
								</div>
								<div className="mt-6">
									<div className="flex justify-between items-center">
										<p>Staffs</p>
										<p>12 / 50</p>
									</div>
									<input
										type="range"
										// value={12}
										step={1}
										min={0}
										max={50}
										className="w-full accent-light"
									/>
									<p>
										{50 - 12} Remaining
									</p>
								</div>
							</>}
						</div>
					})}
				</div>
				<div className="">
					<div className="border w-full max-w-lg border-light rounded-md">
						{activePlan.plan?.plan_name.includes("Free") && <div className="bg-lightest p-3 mb-4 text-lg font-semibold">
							<p className="text-2xl">No Upcoming Bills Yet</p>
							<p>
								You are on a free plan so you have no upcoming
								bills
							</p>
						</div>}
						<div className="p-3 text-base font-semibold border-b-2">
							<div className="mb-4 text-xl flex items-center justify-between">
								<p>{activePlan.plan?.plan_name}</p>
								<p>₦{Number(activePlan.plan?.monthly_billing).toLocaleString()}</p>
							</div>
							<p>{subscription?.visitorsPerMonth} Visitors*</p>
							<p>{subscription?.staffs} Staffs*</p>
						</div>
						<div className="mb-4 p-3 font-semibold text-lg flex items-center justify-between">
							<p>Tax</p>
							<p>₦0.00</p>
						</div>
						<div className="p-3 text-base font-semibold border-t-2">
							<div className="mb-4 text-lg flex items-center justify-between">
								<p>Estimated Total</p>
								<p>₦{Number(activePlan.plan?.monthly_billing).toLocaleString()}</p>
							</div>
							<p>Next Auto Pay On : {activePlan?.companyPlan?.next_renewer_date && formatDate(activePlan?.companyPlan?.next_renewer_date)}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const useBillingSummary = () => {
	const { loading, error, data } = useFetch("plans/all-plans", []);
	const monthlyStats = useFetch("visitor/monthly-stats", []).data;
	const newSmsVisitorNotifications = useFetch("/settings/sms-balance", []).data?.data;
	const visitorsPerMonth = monthlyStats?.data.uninvitedVisitors[monthlyStats?.data.uninvitedVisitors.length - 2]
	const staffs = useFetch("settings/get-all-staffs", []).data;
	const totalStaffs = staffs?.staffs?.length;
	const eventsPerMonth = useFetch("events/get/events", []).data;
	const totalEvents = eventsPerMonth?.data?.rows.length;
	const allLocations = useFetch("settings/branch", []).data;
	const totalLocations = allLocations?.data?.branches?.length;
	const [activePlan, setActivePlan] = useState("");
	const plans = data?.data;
	const [subscription, setSubscription] = useState();
	const [planFeatures, setPlanFeatures] = useState([
		{ planName: "Free Plan", visitorsPerMonth: 32, staffs: 5, locations: 1, eventsPerMonth: 1 },
		{ planName: "Basic Plan", visitorsPerMonth: 500, staffs: 50, locations: 100, eventsPerMonth: 100 },
		{ planName: "Premium Plan", visitorsPerMonth: 15000, staffs: 1000, locations: 1000, eventsPerMonth: 300 },
		{ planName: "Enterprise Plan", visitorsPerMonth: "Unlimited", staffs: "Unlimited", locations: "Unlimited", eventsPerMonth: "Unlimited" }
	]);

	useEffect(() => {
		const fetchPlan = async () => {
			await Api.get("/users/current").then((res) => {
				setActivePlan(res.data?.data);
			});
		};
		fetchPlan();
	}, [])

	useEffect(() => {
		planFeatures.map((plan) => {
			if (plan.planName.includes(activePlan?.plan?.plan_name)) {
				setSubscription(plan);
			}
		})
	}, [activePlan])
	console.log(newSmsVisitorNotifications);

	return { plans, newSmsVisitorNotifications, activePlan, totalEvents, totalLocations, totalStaffs, visitorsPerMonth, subscription, loading, error };
};
