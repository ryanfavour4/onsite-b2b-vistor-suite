import Table from "../../components/tables/Table";
import { visitorsData } from "../../data";
import { useState, useEffect } from "react";
import RegisterVisitorModal from "../../components/modals/RegisterVisitorModal";
import EditVisitorModal from "../../components/modals/EditVisitorModal";
import BlacklistVisitorModal from "../../components/modals/BlacklistVisitorModal";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useFetch from "../../hooks/useFetch";
import { Api } from "../../axios";
import DeleteVisitorModal from "../../components/modals/DeleteVisitorModal";
import { toast } from "react-toastify";

const VisitorLog = () => {
  const [purpose, setPurpose] = useState("");
  const [Host, setHost] = useState("");
  const [Location, setLocation] = useState("");
  const [displayFilters, setDisplayFilters] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [visitorID, setVisitorID] = useState("");
  const usersPlan = localStorage.getItem("User Plan");
  const usersCurrent = JSON.parse(localStorage.getItem("User Current"));
  const [showBlacklistModal, setShowBlacklistModal] = useState(false);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const { loading, error } = useFetch("visitor", [refresh]);
  const visitors = useFetch("visitor", [refresh]).data;
  const [data, setData] = useState(visitors);
  useEffect(() => {
    setData(visitors);
  }, [visitors]);

  const viewVisitor = (data) => {
    navigate(`/visitor-log/${data.id}`);
  };

  const editVisitor = (data) => {
    setShowEditModal(true);
    setVisitorID(data?.id);
  };

  const deleteVisitor = async (data) => {
    setShowDeleteModal(true);
    setVisitorID(data?.id);
  };

  const blacklistVisitor = (data) => {
    setSelected(data);
    setShowBlacklistModal(true);
  };

  const registerVisitor = () => {
    (Number(usersCurrent.user.company_invite_mode) === 1) ? navigate(`/visitor-checkin-code`) : navigate(`/visitor-log/add-visitor-checkin`)

  }

  const exportToCSV = () => {
    if (usersPlan == "Free Plan") {
      toast("Free plan cant access this feature. Upgrade your plan");
    } else {
      const csvHeaders = [
        "First Name",
        "Last Name",
        "Phone Number",
        "Email",
        "Company Name",
        "Address",
        "Default Host",
        "Default Purpose of Visit",
      ];
      const csvContent =
        csvHeaders.join(",") +
        "\n" +
        data.visitors
          .map(
            (row) =>
              `${row.name.split(" ")[0]},${row.name.split(" ")[1]},${row.phone_number
              },${row.email},${row.company_name},${row.address},${row.host},${row.purpose
              }`
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
    toast("Coming Soon")
  };

  const sendEmail = () => {
    toast("Coming Soon")
  };

  const actionColItems = [
    { title: "view", func: (data) => viewVisitor(data) },
    { title: "edit", func: (data) => editVisitor(data) },
    { title: "delete", func: (data) => deleteVisitor(data) },
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error?.message} />;
  }

  return (
    <div className="p-4 ">
      <EditVisitorModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        id={visitorID}
        refresh={refresh}
        setRefresh={setRefresh}
      />

      <DeleteVisitorModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        id={visitorID}
        refresh={refresh}
        setRefresh={setRefresh}
      />

      <Table
        data={data?.visitors}
        headings={[
          "name",
          "phone number",
          "email",
          "company name",
          "address",
          "sign in",
          "sign out",
          "status",
          "action",
        ]}
        // filterItems={}
        filterComp={<FilterVisitor data={data} setData={setData} />}
        fieldsKeys={[
          "name",
          "phone_number",
          "email",
          "company_name",
          "address",
          "visiting_date",
          "leaving_date",
          "signInOut",
          "action",
        ]}
        importLink={
          <Link
            to="/import-visitor-csv"
            className="border block p-2 px-3 bg-lightblue rounded-md font-semibold text-white"
          >
            Import CSV File
          </Link>
        }
        actionColDropdownItems={actionColItems}
        topDropdownItems={topDropdownItems}
        displayFilters={displayFilters}
        setDisplayFilters={setDisplayFilters}
        title={"Visitor Log"}
      >
        <button
          onClick={() => registerVisitor()}
          className="bg-lightblue hover:bg-blue text-white drop-shadow-md rounded-md p-2 flex justify-center items-center px-4 mt-2 mb-4"
        >
          Register visitor <i className="fa-solid fa-address-card ml-2"></i>
        </button>
      </Table>

      <RegisterVisitorModal
        showModal={showRegModal}
        setShowModal={setShowRegModal}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      {/* <EditVisitorModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
      /> */}
      <BlacklistVisitorModal
        showModal={showBlacklistModal}
        setShowModal={setShowBlacklistModal}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};

export default VisitorLog;

// !!! =========================  FILTER VISITOR AREA =================== !!///
const FilterVisitor = ({ data, setData }) => {
  const pov = useFetch("/settings/visit-purposes", []).data;
  const location = useFetch("settings/view-location", []).data;
  const staffs = useFetch("/settings/get-all-staffs", []).data;
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getVisitorByPov = (purpose) => {
    setLoading(true);
    Api.get(`/visitor/purposes/${purpose}`)
      .then((res) => {
        setData({ visitors: res.data.data.rows });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const getVisitorByLocation = (location) => {
    setLoading(true);
    Api.get(`/visitor/get/all/location/${location}`)
      .then((res) => {
        setData({ visitors: res.data.visitors.rows });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const getVisitorByHostId = (id) => {
    setLoading(true);
    Api.get(`/visitor/hosts/${id}`)
      .then((res) => {
        setData({ visitors: res.data.data.rows });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const getVisitorByDateRange = () => {
    setLoading(true);
    if (startDate && endDate) {
      Api.get(
        `/visitor/get/date-range-visitors?from=${startDate}&to=${endDate}`
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

  const getAllVisitor = (purpose) => {
    setLoading(true);
    Api.get(`/visitor`)
      .then((res) => {
        setData({ visitors: res.data.visitors });
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

  //  getting all POVS  and merging
  const defaultFields = pov?.data?.defaultFields;
  const customFields = pov?.data?.customFields;

  const allFields = defaultFields?.concat(customFields);

  const enabledFields = allFields?.filter((item) => item.is_enabled === true);

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
            onClick={() => getVisitorByDateRange()}
          >
            Check Date
          </button>
        </div>

        {/* //?? ======= FILTER BY PURPOSE OF VISITS ======== ?? */}
        <select
          className="mx-1 bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block cursor-pointer"
          onChange={(e) => getVisitorByPov(e.target.value)}
        >
          <option value="">Filter by purpose of visits</option>
          {enabledFields?.map((item) => {
            return (
              <option key={item.id} value={item.visit_purpose_name}>
                {item.visit_purpose_name}
              </option>
            );
          })}
        </select>
        {/* //?? ======= FILTER BY LOCATION======== ?? */}
        <select
          className="mx-1 bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block cursor-pointer"
          onChange={(e) => getVisitorByLocation(e.target.value)}
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
        {/* //?? ======= FILTER BY HOST ======== ?? */}
        <select
          className="mx-1 bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block cursor-pointer"
          onChange={(e) => getVisitorByHostId(e.target.value)}
        >
          <option value="">Filter by Host</option>
          {staffs?.staffs.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.first_name}
              </option>
            );
          })}
        </select>
      </div>

      <button
        className="p-3  text-white rounded-lg border bg-blue border-lightestblue focus:border-blue"
        onClick={() => getAllVisitor()}
      >
        All visitors
      </button>
    </div>
  );
};
