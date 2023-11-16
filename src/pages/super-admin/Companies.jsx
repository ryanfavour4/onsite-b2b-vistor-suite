import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../axios";
import Table from "../../components/tables/Table";
import { companiesData } from "../../data";
import Loading from "../../components/Loading";

const Companies = () => {
  const [status, setStatus] = useState("");
  const [country, setCountry] = useState("");
  const [usecase, setUsecase] = useState("");
  const [displayFilters, setDisplayFilters] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

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

  const view = (company) => {
    navigate(`/companies/${company.id}`);
  };

  const disableAccess = async (company) => {
    setRefresh(true);
    // alert(company.status);

    if (company.status == "Active") {
      await Api.put(`admin/companies/${company.id}/disable`).then((res) => {
        setRefresh(false);
      });
    } else {
      await Api.put(`admin/companies/${company.id}/enable`).then((res) => {
        setRefresh(false);
      });
    }
  };

  const enableSubscription = async (company) => {
    setRefresh(true);

    await Api.put(`admin/companies/${company.id}/enable`).then((res) => {
      setRefresh(false);
    });
  };

  const extendFreeTrial = () => {
    console.log("disable access");
  };

  const exportToCSV = () => {
    console.log("export to csv");
  };

  const bulkDelete = () => {
    console.log("bulk delete");
  };

  const actionColItems = [
    { title: "view", func: (company) => view(company) },
    { title: "disable/enable access", func: disableAccess },
    {
      title: "enable subscription",
      func: (company) => enableSubscription(company),
    },
    { title: "extend free trial", func: extendFreeTrial },
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
        await Api.get("admin/companies?page=1&limit=100").then((res) => {
          console.log(res?.data.rows);
          setData(res?.data.rows);
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

  const companyData =
    !loading &&
    data.map((info) => ({
      ...info,
      company: info.name,
      email: info.companyemail,
      lastSeen: info.last_seen,
      phone_number: info.phone_number,
      options: info.options,
      plan:
        info.company_plan_info && info.company_plan_info.length > 0
          ? info.company_plan_info[0].plan_info.plan_name
          : "No Plan",
      staffs: info.staffs_count,
      visitors: info.visitor_count,
      country: info.country_info && info.country_info.country,
      created_date: info.createdAt,
      last_seen_date: info.last_seen,
      status: info.is_active == 1 ? "Active" : "Inactive",
    }));

  return (
    <div className="p-4">
      {refresh ? (
        <Loading />
      ) : (
        <Table
          data={companyData}
          filterItems={filterItems}
          actionColDropdownItems={actionColItems}
          topDropdownItems={topDropdownItems}
          displayFilters={displayFilters}
          setDisplayFilters={setDisplayFilters}
          showActionDropdown={showActionDropdown}
          setShowActionDropdow={setShowActionDropdown}
          title={"Companies"}
          filterTitle={"Companies"}
          headings={[
            "company name",
            "country",
            "phone number",
            "email",
            "sign up date",
            "use case",
            "current plan",
            "no. of staff",
            "no.of visitors",
            "last seen",
            "status",
            "action",
          ]}
          fieldsKeys={[
            "company",
            "country",
            "phone_number",
            "email",
            "created_date",
            "options",
            "plan",
            "staffs",
            "visitors",
            "last_seen_date",
            "status",
            "action",
          ]}
        />
      )}{" "}
    </div>
  );
};

export default Companies;
