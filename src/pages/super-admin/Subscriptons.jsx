import { useState } from "react";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import Table from "../../components/tables/Table";
import { subscriptionsData } from "../../data";
import useFetch from "../../hooks/useFetch";

const Subscriptions = () => {
  const [status, setStatus] = useState("");
  const [country, setCountry] = useState("");
  const [usecase, setUsecase] = useState("");
  const [displayFilters, setDisplayFilters] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState(false);

  const filterItems = [
    {
      searchState: status,
      stateModifier: setStatus,
      title: "status",
      options: ["lofdfrem", "isum", "dolr"],
    },
    {
      searchState: country,
      stateModifier: setCountry,
      title: "country",
      options: ["lorem", "ipum", "dolr"],
    },
    {
      searchState: usecase,
      stateModifier: setUsecase,
      title: "use case",
      options: ["lordfm", "ipsum", "dolor"],
    },
  ];

  const view = () => {
    console.log("view ");
  };

  const addSubscription = () => {};

  const disable = () => {};

  const exportToCSV = () => {
    console.log("export to csv");
  };

  const bulkDelete = () => {
    console.log("bulk delete");
  };

  const actionColItems = [
    { title: "view", func: (companyId) => view(companyId) },
    { title: "add subscription", func: addSubscription },
    { title: "disable", func: disable },
  ];

  const topDropdownItems = [
    {
      title: "export to csv",
      func: exportToCSV,
      icon: <i className="fa-solid fa-file-export"></i>,
    },
    {
      title: "bulk delete",
      func: bulkDelete,
      icon: <i className="fa-solid fa-trash"></i>,
    },
  ];

  const { loading, error, data } = useFetch("admin/subscription", []);

  if (loading) {
    return <Loading />;
  }

  if (error != "") {
    return <Error message={error?.message} />;
  }

  // console.log(data.data.rows)

  const subInfo = data?.data.rows.map((info) => ({
    ...info,
    company: info.company_info ? `${info.company_info.name}` : "N/A",
    email: info.company_info ? `${info.company_info.companyemail}` : "N/A",
    options: info.company_info ? `${info.company_info.options}` : "N/A",
    plan_name: info.plan_info ? `${info.plan_info.plan_name}` : "N/A",
    renewal_amount: info.renewer_amount ? `${info.renewer_amount}` : "N/A",
    life_span: info.current_life_plan ? `${info.current_life_plan}` : "N/A",
  }));

  if (!data) return <>no data</>;

  return (
    <div className="p-4">
      <Table
        data={subInfo}
        headings={[
          "company name",
          "email",
          "use case",
          "current plan",
          "next renewal date",
          "renewal amount",
          "current life span",
          "action",
        ]}
        fieldsKeys={[
          "company",
          "email",
          "options",
          "plan_name",
          "next_renewer_date",
          "renewal_amount",
          "life_span",
          "action",
        ]}
        filterItems={filterItems}
        actionColDropdownItems={actionColItems}
        topDropdownItems={topDropdownItems}
        displayFilters={displayFilters}
        setDisplayFilters={setDisplayFilters}
        showActionDropdown={showActionDropdown}
        setShowActionDropdow={setShowActionDropdown}
        title={"Subscriptions"}
        filterTitle={"subscriptions"}
      />
    </div>
  );
};

export default Subscriptions;
