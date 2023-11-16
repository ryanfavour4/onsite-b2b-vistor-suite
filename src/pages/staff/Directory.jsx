import Table from "../../components/tables/Table";
import { blacklistData } from "../../data";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useFetch from "../../hooks/useFetch";
import { Api } from "../../axios";
import BlacklistVisitorModal from "../../components/modals/BlacklistVisitorModal";
import AddDirectoryModal from "../../components/modals/AddDirectoryModal";

import { toast } from "react-toastify";
import { useEffect } from "react";
import DeleteVisitorModal from "../../components/modals/DeleteVisitorModal";
import DeleteDirectoryModal from "../../components/modals/DeleteDirectoryModal";

const Directory = () => {
  const [signedInVisitors, setSignedInVisitors] = useState("");
  const [purpose, setPurpose] = useState("");
  const [selectHost, setSelectHost] = useState("");
  const [selectLocation, setSelectLocation] = useState("");
  const [displayFilters, setDisplayFilters] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showBlacklistModal, setShowBlacklistModal] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [visitorID, setVisitorID] = useState("");

  const [refresh, setRefresh] = useState(false);
  const usersPlan = localStorage.getItem("User Plan");

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
      options: ["lorem", "ipsum", "dolor"],
    },
    {
      searchState: selectHost,
      stateModifier: setSelectHost,
      title: "select host",
      options: ["lorem", "ipsum", "dolor"],
    },
    {
      searchState: selectLocation,
      stateModifier: setSelectLocation,
      title: "select location",
      options: ["lorem", "ipsum", "dolor"],
    },
  ];

  const viewProfile = (visitorId) => {
    navigate(`/visitor-log/${visitorId.id}`);
  };

  const viewVisitationHistory = (visitorId) => {
    navigate(`/visitor-log/${visitorId.id}`);
  };

  const exportToCSV = () => {
    const fileName = "Directory";
    if (usersPlan == "Free Plan") {
      toast("Free plan cant access this feature. Upgrade your plan");
    } else {
      const csvHeaders = [
        "Name",
        "Phone Number",
        "Email",
        "Branch Code",
        "default_purpose_of_visit",
        "Type",
      ];
      console.log(data.data.rows);
      const csvContent =
        csvHeaders.join(",") +
        "\n" +
        data.data.rows
          .map(
            (row) =>
              `${row.name},${row.phone},${row.email}, ${row.branch_code}, ${row.default_purpose_of_visit} ,${row.type}`
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

  const blacklistVisitor = (data) => {
    setSelected(data);
    setShowBlacklistModal(true);
  };

  const sendEmail = () => {
    // console.log("bulk delete");
  };

  const deleteVisitor = async (data) => {
    setShowDeleteModal(true);
    setVisitorID(data?.id);
  };

  const actionColItems = [
    // { title: "view profile", func: (visitorId) => viewProfile(visitorId) },
    { title: "delete", func: (visitorId) => deleteVisitor(visitorId) },
    {
      title: "visitation history",
      func: (visitorId) => viewVisitationHistory(visitorId),
    },
    { title: "add to blacklist", func: (data) => blacklistVisitor(data) },
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
    {
      title: "send email",
      func: sendEmail,
      icon: <i class="fa-solid fa-envelope"></i>,
    },
  ];

  const {
    loading,
    error,
    data: directory,
  } = useFetch("/visitor/get/directory", []);
  const [data, setData] = useState(directory?.data?.sorted);

  useEffect(() => {
    setData(directory?.data?.records);
    console.log(directory);
  }, [directory]);

  if (loading) {
    return <Loading />;
  }

  if (error != "") {
    return <Error message={error?.message} />;
  }

  return (
    <div className="p-4">
      <button
        onClick={() => setShowRegModal(true)}
        className="bg-lightblue hover:bg-blue text-white drop-shadow-md rounded-md p-2 flex justify-center items-center px-4 mt-2 mb-4"
      >
        Add Directory <i className="fa-solid fa-address-card ml-2"></i>
      </button>
      <Table
        data={data}
        headings={[
          // "branch ID",
          // "branch code",
          "name",
          "phone number",
          "email",
          "branch code",
          "sign in date",
          "purpose of visit",
          "action",
        ]}
        filterComp={<FilterVisitor data={data} setData={setData} />}
        importLink={
          <Link
            to="/import-visitor-csv"
            className="border block p-2 px-3 bg-lightblue rounded-md font-semibold text-white"
          >
            Import CSV File
          </Link>
        }
        fieldsKeys={[
          // "id",
          // "branch_code",
          "name",
          "phone_number",
          "email",
          "branch_code",
          "createdAt",
          "default_purpose_of_visit",
          "action",
        ]}
        // filterItems={filterItems}
        actionColDropdownItems={actionColItems}
        topDropdownItems={topDropdownItems}
        displayFilters={displayFilters}
        setDisplayFilters={setDisplayFilters}
        showActionDropdown={showActionDropdown}
        setShowActionDropdown={setShowActionDropdown}
        title={"Directory"}
      />

      <BlacklistVisitorModal
        showModal={showBlacklistModal}
        setShowModal={setShowBlacklistModal}
        selected={selected}
        setSelected={setSelected}
      />

      <DeleteDirectoryModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        id={visitorID}
        refresh={refresh}
        setRefresh={setRefresh}
      />

      <AddDirectoryModal
        showModal={showRegModal}
        setShowModal={setShowRegModal}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default Directory;

// !!! =========================  FILTER VISITOR AREA =================== !!///
const FilterVisitor = ({ data, setData }) => {
  const pov = useFetch("/settings/visit-purposes", []).data;
  const location = useFetch("settings/view-location", []).data;
  // const staffs = useFetch("/settings/get-all-staffs", []).data;
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getDirByLocation = (location) => {
    setLoading(true);
    Api.get(`/users/search-contact-directory/?branch_code=${location}`)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const getDirByType = (type) => {
    console.log(type);
    setLoading(true);
    Api.get(`/users/search-contact-directory/?type=${type}`)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const getDirByDateRange = () => {
    setLoading(true);
    if (startDate && endDate) {
      Api.get(
        `/users/search-contact-directory/?dateRange=${startDate},${endDate}`
      )
        .then((res) => {
          setData(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const getAllDir = () => {
    setLoading(true);
    Api.get(`/visitor/get/directory`)
      .then((res) => {
        console.log(res.data.data.sorted);
        setData(res?.data?.data.sorted);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        {/* //?? ======= FILTER BY DATE RANGE ======== ?? */}
        <div className="flex items-end -mt-6">
          <div className="">
            <p>Start Date</p>
            <input
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
              className="mx-1 bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block cursor-pointer"
            />
          </div>
          <p className="text-lg font-bold mb-3">&gt;</p>
          <div className="">
            <p>End Date</p>
            <input
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
              className="mx-1 bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block cursor-pointer"
            />
          </div>
          <button
            className="p-3  text-white rounded-lg border bg-blue border-lightestblue focus:border-blue"
            onClick={() => getDirByDateRange()}
          >
            Check Date
          </button>
        </div>

        {/* //?? ======= FILTER BY PURPOSE OF VISITS ======== ?? */}
        <select
          className="mx-1 bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block cursor-pointer"
          onChange={(e) => getDirByType(e.target.value)}
        >
          <option value="">Filter by Type</option>
          {pov?.data?.customFields.map((item) => {
            return (
              <option key={item.id} value={item.visit_purpose_label}>
                {item.visit_purpose_name}
              </option>
            );
          })}
        </select>
      </div>

      {/* //?? ======= FILTER BY LOCATION======== ?? */}
      <select
        className="mx-1 bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block cursor-pointer"
        onChange={(e) => getDirByLocation(e.target.value)}
      >
        <option value="">Filter By Location</option>
        {location?.data.locations.map((item) => {
          return (
            <option key={item.id} value={item.branch_code}>
              {item.name}
            </option>
          );
        })}
      </select>

      <button
        className="p-3  text-white rounded-lg border bg-blue border-lightestblue focus:border-blue"
        onClick={() => getAllDir()}
      >
        All Directory
      </button>
    </div>
  );
};
