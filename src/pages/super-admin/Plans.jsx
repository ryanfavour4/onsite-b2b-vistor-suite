import { useEffect, useState } from "react";
import { Api } from "../../axios";
import Table from "../../components/tables/Table";
import Loading from "../../components/Loading";
import EditPlanModal from "../../components/modals/EditPlanModal";

const Plans = () => {
  const [status, setStatus] = useState("");
  const [country, setCountry] = useState("");
  const [usecase, setUsecase] = useState("");
  const [displayFilters, setDisplayFilters] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [planID, setPlanID] = useState(null);
  const [planDetails, setPlanDetails] = useState({});

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

  const edit = (plan) => {
    setShowEditModal(true);
    setPlanID(plan.id);
    console.log(plan.id);
  };

  const disableAccess = async (plan) => {
    setRefresh(true);

    if (plan.is_active == "true") {
      await Api.put(`admin/plans/${plan.id}/disable`).then((res) => {
        setLoading(true);
      });
    } else if (plan.is_active == "false") {
      await Api.put(`admin/plans/${plan.id}/enable`).then((res) => {
        setLoading(true);
      });
    } else {
      setRefresh(false);
    }
  };

  useEffect(() => {
    try {
      const fetchDetails = async () => {
        // Use the updated planID directly in the Axios request URL
        const response = await Api.get(`admin/plans/${planID}`);
        const planData = response.data.data;

        // Update planDetails with the fetched data
        setPlanDetails(planData);
        // console.log(planDetails);
      };

      fetchDetails();
    } catch (error) {
      console.log(error);
    }
  }, [planID]);

  console.log(planDetails);

  useEffect(() => {
    try {
      setLoading(true);

      const fetchDetails = async () => {
        await Api.get(`admin/plans/${planID}`).then((res) => {
          // console.log(res.data.data);
          setPlanDetails(res.data.data);
          console.log(planDetails);
          console.log("planID updated:", planID);
        });
      };

      fetchDetails();
    } catch (error) {
      console.log(error);
    }
  }, [planID]);

  const exportToCSV = () => {
    console.log("export to csv");
  };

  const bulkDelete = () => {
    console.log("bulk delete");
  };

  const actionColItems = [
    { title: "edit", func: (id) => edit(id) },
    { title: "enable/disable", func: (id) => disableAccess(id) },
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

  useEffect(() => {
    try {
      const fetchData = async () => {
        setRefresh(true);
        await Api.get("admin/plans").then((res) => {
          console.log(res?.data.data);
          setData(res?.data.data);
          setLoading(false);
          setRefresh(false);
        });
      };

      fetchData();
    } catch (error) {
      console.log(error);
      setRefresh(false);
    }
  }, [loading]);

  const planData =
    !loading &&
    data.map((info) => ({
      ...info,
      plan_name: info.plan_name,
      monthly_billing: info.monthly_billing,
      monthly_dollar_billing: info.monthly_dollar_billing,
      yearly_billing: info.yearly_billing,
      yearly_dollar_billing: info.yearly_dollar_billing,
      paystack_monthly_plan: info.paystack_monthly_plan,
      paystack_yearly_plan: info.paystack_yearly_plan,
      is_active: info.is_active == 1 ? "true" : "false",
      duration: info.duration,
      extra_location_monthly_ngn: info.extra_location_monthly_ngn,
      extra_location_monthly_usd: info.extra_location_monthly_usd,
      remove_carrotsuite_branding_ngn: info.remove_carrotsuite_branding_ngn,
      remove_carrotsuite_branding_usd: info.remove_carrotsuite_branding_usd,
    }));

  return (
    <div className="p-4">
      <EditPlanModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        id={planID}
        refresh={refresh}
        setRefresh={setRefresh}
        planDetails={planDetails}
        isLoading={loading}
        setIsLoading={setLoading}
      />

      {refresh ? (
        <Loading />
      ) : (
        <Table
          data={planData}
          filterItems={filterItems}
          actionColDropdownItems={actionColItems}
          // topDropdownItems={topDropdownItems}
          displayFilters={displayFilters}
          setDisplayFilters={setDisplayFilters}
          showActionDropdown={showActionDropdown}
          setShowActionDropdow={setShowActionDropdown}
          title={"All Plans"}
          filterTitle={"plans"}
          headings={[
            "plan name",
            "monthly billing",
            "monthly dollar billing",
            "yearly billing",
            "yearly dollar billing",
            "paystack monthly plan",
            "paystack yearly plan",
            "duration",
            "is active",
            "extra location monthly ngn",
            "extra location monthly usd",
            "remove carrotsuite branding ngn",
            "remove carrotsuite branding usd",
            "action",
          ]}
          fieldsKeys={[
            "plan_name",
            "monthly_billing",
            "monthly_dollar_billing",
            "yearly_billing",
            "yearly_dollar_billing",
            "paystack_monthly_plan",
            "paystack_yearly_plan",
            "duration",
            "is_active",
            "extra_location_monthly_ngn",
            "extra_location_monthly_usd",
            "remove_carrotsuite_branding_ngn",
            "remove_carrotsuite_branding_usd",
            "action",
          ]}
        />
      )}
    </div>
  );
};

export default Plans;
