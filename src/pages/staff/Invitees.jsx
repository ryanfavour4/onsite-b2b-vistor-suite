import { useState } from "react";
import SendInviteModal from "../../components/modals/SendInviteModal";
import Table from "../../components/tables/Table";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { toast } from "react-toastify";
import CancelInvite from "../../components/modals/CancelInviteModal";

const Invitees = () => {
  const [showModal, setShowModal] = useState(false);

  const [purpose, setPurpose] = useState("");
  const [host, setHost] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [displayFilters, setDisplayFilters] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const usersPlan = localStorage.getItem("User Plan");
  const [refresh, setRefresh] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [inviteCode, setInviteCode] = useState("");

  const navigate = useNavigate();

  const filterItems = [
    {
      searchState: location,
      stateModifier: setLocation,
      title: "location",
      options: [
        { value: 1, label: "lorem" },
        { value: 2, label: "ipsum" },
        { value: 3, label: "dolor" },
      ],
    },
    {
      searchState: purpose,
      stateModifier: setPurpose,
      title: "purpose of visit",
      options: [
        { value: 1, label: "lorem" },
        { value: 2, label: "ipsum" },
        { value: 3, label: "dolor" },
      ],
    },
    {
      searchState: host,
      stateModifier: setHost,
      title: "host",
      options: [
        { value: 1, label: "lorem" },
        { value: 2, label: "ipsum" },
        { value: 3, label: "dolor" },
      ],
    },
    {
      searchState: duration,
      stateModifier: setDuration,
      title: "duration",
      options: [
        { value: 1, label: "today" },
        { value: 2, label: "yesterday" },
        { value: 3, label: "last week" },
        { value: 4, label: "last month" },
        { value: 5, label: "last 3 months" },
      ],
    },
  ];

  const viewProfile = (data) => {
    navigate(`/invitee-log/${data.id}`);
  };

  const inviteHistory = (data) => {
    navigate(`/invitee-history/${data.phoneNumber}`);
  };

  const cancelInvite = (data) => {
    setCancelModal(true);
    setInviteCode(data.inviteCode);
  };

  const exportToCSV = () => {
    const fileName = "Invitees";
    if (usersPlan == "Free Plan") {
      toast("Free plan cant access this feature. Upgrade your plan");
    } else {
      const csvHeaders = [
        "First Name",
        "Last Name",
        "Phone Number",
        "Email",
        "Company",
        "Purpose",
        "Date",
      ];
      const csvContent =
        csvHeaders.join(",") +
        "\n" +
        info
          .map(
            (row) =>
              `${row.first_name}, ${row.last_name},${row.phoneNumber},${row.email}, ${row.company}, ${row.purpose}, ${row.date}`
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

  const sendEmail = () => {
    // console.log("bulk delete");
  };

  const actionColItems = [
    { title: "view profile", func: (data) => viewProfile(data) },
    { title: "visitation history", func: (data) => inviteHistory(data) },
    { title: "cancel invite", func: (data) => cancelInvite(data) },
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

  const { data, loading, error } = useFetch("visitor/invitee/invitee-list", [
    refresh,
  ]);

  console.log(data);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error?.message} />;
  }

  const DateRangeFilter = () => {
    return (
      <div className="space-x-2">
        <div className="mb-2">
          <p className="capitalize font-normal text-dark">start date</p>
          <input
            type={"date"}
            value={new Date()}
            className=" border border-light p-3 rounded-md"
          />
        </div>
        <div className="mb-2">
          <p className="capitalize font-normal text-dark">end date</p>
          <input
            type={"date"}
            value={new Date()}
            className=" border border-light p-3 rounded-md"
          />
        </div>
      </div>
    );
  };

  const info = data?.invitees.rows.map((data) => ({
    ...data,
    // company: data?.companyInfo?.name,
  }));

  return (
    <div className="p-4">
      <SendInviteModal
        showModal={showModal}
        setShowModal={setShowModal}
        refresh={refresh}
        setRefresh={setRefresh}
      />

      <CancelInvite
        showModal={cancelModal}
        setShowModal={setCancelModal}
        refresh={refresh}
        setRefresh={setRefresh}
        inviteCode={inviteCode}
      />

      <Table
        data={info}
        headings={[
          "first name",
          "phone number",
          "email",
          // "company",
          "last visit date",
          "action",
        ]}
        fieldsKeys={[
          "first_name",
          "phoneNumber",
          "email",
          // "company",
          // "visiting_date",
          "date",
          "action",
        ]}
        filterItems={filterItems}
        extraFilterComponents={<DateRangeFilter />}
        actionColDropdownItems={actionColItems}
        topDropdownItems={topDropdownItems}
        displayFilters={displayFilters}
        setDisplayFilters={setDisplayFilters}
        showActionDropdown={showActionDropdown}
        setShowActionDropdown={setShowActionDropdown}
        title={"Invitees"}
      >
        <button
          onClick={() => setShowModal(true)}
          className="mx-2 bg-lightblue hover:bg-blue text-white drop-shadow-md rounded-md p-2 flex justify-center items-center px-4 pmt-2../"
        >
          Schedule invite <i className="fa-solid fa-address-card ml-2"></i>
        </button>
      </Table>
    </div>
  );
};

export default Invitees;
