import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { billingHistoryData } from "../../../../data";
import useFetch from "../../../../hooks/useFetch";
import TableActionDropdown from "../../../dropdowns/TableActionDropdown";
import Error from "../../../Error";
import Loading from "../../../Loading";
import CancelPlan from "../../../modals/CancelPlan";
import Table from "../../../tables/Table";
import "./BillingHistory.css";

const BillingHistory = () => {
  const [refresh, setRefresh] = useState(false);
  const [toggleReason, setToggleReason] = useState(false);
  const [active, setActive] = useState(false);
  const [plan, setPlan] = useState("");
  const [planId, setPlanId] = useState(Number);

  const navigate = useNavigate();

  const { data, loading, error } = useFetch("users/subscription-plans", [
    refresh,
  ]);

  const viewBilling = () => {};

  const downgradePlan = (data) => {
    navigate("/billing/downgrade");
  };

  const upgradePlan = (data) => {
    // navigate("/billing")
    window.location.reload();
  };

  const cancelPlan = (data) => {
    setActive(true);
  };

  const toggleState = () => {
    setToggleReason(!active);
  };

  useEffect(() => {
    if (planId == "4") {
      setPlan("free");
    } else if (planId == "2") {
      setPlan(basic);
    } else if (planId == "5") {
      setPlan(premium);
    } else if (planId == "6") {
      setPlan("enterprise");
    } else {
      setPlan("free");
    }
  }, []);

  const topDropdownItems = [
    {
      title: "upgrade plan",
      func: (data) => upgradePlan(data),
    },
    {
      title: "downgrade plan",
      func: (data) => downgradePlan(data),
    },
    {
      title: "cancel subscription",
      func: (data) => cancelPlan(data),
    },
  ];

  const actionColItems = [
    { title: "view summary", func: (billingId) => viewBilling(billingId) },
  ];

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error?.message} />;
  }

  return (
    <div className="billing__history">
      {active ? (
        <CancelPlan
          active={active}
          setActive={setActive}
          toggleState={toggleState}
          toggleReason={toggleReason}
          setToggleReason={setToggleReason}
        />
      ) : null}

      <div className="billing__history__action">
        <TableActionDropdown itemsArr={topDropdownItems} />
      </div>

      <Table
        data={data.subscriptionPlanLogs}
        headings={[
          "sub date",
          "sub plan",
          "billing cycle",
          "amount",
          "next renewal date",
          "action",
        ]}
        fieldsKeys={[
          "start_date",
          "plan",
          "period",
          "amount",
          "next_renewer_date",
          "action",
        ]}
        actionColDropdownItems={actionColItems}
        // topDropdownItems={[]}
        // displayFilters={displayFilters}
        setDisplayFilters={"setDisplayFilters"}
        title={"Billing History"}
      />
    </div>
  );
};

export default BillingHistory;
