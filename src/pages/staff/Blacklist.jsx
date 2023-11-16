import Table from "../../components/tables/Table";
import { blacklistData } from "../../data";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RemoveFromBlacklistModal from "../../components/modals/RemoveFromBlacklistModal";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { toast } from "react-toastify";

const Blacklist = () => {
  const [id, setId] = useState("");
  const [signedInVisitors, setSignedInVisitors] = useState("");
  const [purpose, setPurpose] = useState("");
  const [selectHost, setSelectHost] = useState("");
  const [selectLocation, setSelectLocation] = useState("");
  const [displayFilters, setDisplayFilters] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const usersPlan = localStorage.getItem("User Plan");
  const [showBlacklistModal, setShowBlacklistModal] = useState(false);

  const navigate = useNavigate();

  const filterItems = [
    {
      searchState: signedInVisitors,
      stateModifier: setSignedInVisitors,
      title: "signed in visitors",
      options: ["lorem", "ipsum", "dolor"],
    },
    {
      searchState: purpose,
      stateModifier: setPurpose,
      title: "purpose",
      options: [
        { value: 1, label: "lorem" },
        { value: 2, label: "ipsum" },
        { value: 3, label: "dolor" },
      ],
    },
    {
      searchState: selectHost,
      stateModifier: setSelectHost,
      title: "select host",
      options: [
        { value: 1, label: "lorem" },
        { value: 2, label: "ipsum" },
        { value: 3, label: "dolor" },
      ],
    },
    {
      searchState: selectLocation,
      stateModifier: setSelectLocation,
      title: "select location",
      options: [
        { value: 1, label: "lorem" },
        { value: 2, label: "ipsum" },
        { value: 3, label: "dolor" },
      ],
    },
  ];

  const viewProfile = (data) => {
    navigate(`/visitor-log/${data.visitorInfo.id}`);
  };

  const removeFromBlacklist = (data) => {
    // console.log(data.id);
    setShowBlacklistModal(true);
    setId(data.id);
  };

  const exportToCSV = () => {
    const fileName = "Blacklist";
    if (usersPlan == "Free Plan") {
      toast("Free plan cant access this feature. Upgrade your plan");
    } else {
      const csvHeaders = ["Name", "Phone", "Date", "Email", "Company"];
      const csvContent =
        csvHeaders.join(",") +
        "\n" +
        blacklistData
          .map(
            (row) =>
              `${row.name}, ${row.phone_number}, ${row.date}, ${row.email}, ${row.company}`
          )
          .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "data.csv";

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const bulkDelete = () => {
    console.log("bulk delete");
  };

  const actionColItems = [
    { title: "view profile", func: (visitorId) => viewProfile(visitorId) },
    {
      title: "remove from blacklist",
      func: (visitorId) => removeFromBlacklist(visitorId),
    },
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

  const { loading, error, data } = useFetch("visitor/blacklist", []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error?.message} />;
  }

  const blacklistData = data?.data?.blacklistedVisitorsWithInfo.map((data) => ({
    ...data,
    company: data?.companyInfo?.name,
    email: data?.visitorInfo?.email,
    name: data?.name,
    date: data?.visitorInfo?.visiting_date,
  }));

  return (
    <div className="p-4">
      <Table
        data={usersPlan == "Free Plan" ? "Free Plan" : blacklistData}
        headings={[
          "name",
          "phone number",
          "email",
          "company",
          "last visit date",
          "action",
        ]}
        fieldsKeys={[
          "name",
          "phone_number",
          "email",
          "company",
          "date",
          "action",
        ]}
        importLink={
          <Link
            to="/import-blacklist-csv"
            className="border block p-2 px-3 bg-lightblue rounded-md font-semibold text-white"
          >
            Import CSV File
          </Link>
        }
        filterItems={filterItems}
        actionColDropdownItems={actionColItems}
        topDropdownItems={topDropdownItems}
        displayFilters={displayFilters}
        setDisplayFilters={setDisplayFilters}
        title={"Blacklist"}
      />

      <RemoveFromBlacklistModal
        showModal={showBlacklistModal}
        setShowModal={setShowBlacklistModal}
        id={id}
      />
    </div>
  );
};

export default Blacklist;
