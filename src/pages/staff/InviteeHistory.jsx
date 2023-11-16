import Table from "../../components/tables/Table";
import { visitorsData } from "../../data";
import { useState } from "react";
import RegisterVisitorModal from "../../components/modals/RegisterVisitorModal";
import EditVisitorModal from "../../components/modals/EditVisitorModal";
import BlacklistVisitorModal from "../../components/modals/BlacklistVisitorModal";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useFetch from "../../hooks/useFetch";
import { Api } from "../../axios";
import DeleteVisitorModal from "../../components/modals/DeleteVisitorModal";

const InviteeHistory = ({ id }) => {
  const [purpose, setPurpose] = useState("");
  const [Host, setHost] = useState("");
  const [Location, setLocation] = useState("");
  const [displayFilters, setDisplayFilters] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [visitorID, setVisitorID] = useState("");

  const [showBlacklistModal, setShowBlacklistModal] = useState(false);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const [refresh, setRefresh] = useState(false);

  const { invitee } = useParams();
  console.log("ppp", invitee);

  const viewInvitee = (data) => {
    // navigate(`/invitee-history/${data.id}`);
    window.location.reload();
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
    console.log(data, "blacklist details data");
    setSelected(data);
    setShowBlacklistModal(true);
  };

  const exportToCSV = () => {
    console.log("export to csv");
  };

  const bulkDelete = () => {
    console.log("bulk delete");
  };

  const sendEmail = () => {
    // console.log("bulk delete");
  };

  const actionColItems = [
    { title: "view", func: (data) => viewInvitee(data) },
    // { title: "edit", func: (data) => editVisitor(data) },
    // { title: "delete", func: (data) => deleteVisitor(data) },
    // { title: "add to blacklist", func: (data) => blacklistVisitor(data) },
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

  const { loading, error, data } = useFetch(
    `visitor/invitee/invitee-history/${invitee || id}`,
    [refresh]
  );

  console.log(data);

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
        data={data.data}
        headings={[
          "name",
          "phone number",
          "email",
          "company name",
          "address",
          "status",
          "action",
        ]}
        fieldsKeys={[
          "first_name",
          "phoneNumber",
          "email",
          "company_name",
          "address",
          "isCheckedIn",
          "action",
        ]}
        actionColDropdownItems={actionColItems}
        topDropdownItems={topDropdownItems}
        displayFilters={displayFilters}
        setDisplayFilters={setDisplayFilters}
        title={"Invitee History"}
      >
        {/* <button
                    onClick={() => setShowRegModal(true)}
                    className="bg-lightblue hover:bg-blue text-white drop-shadow-md rounded-md p-2 flex justify-center items-center px-4 mt-2 mb-4"
                >
                    Register visitor <i className="fa-solid fa-address-card ml-2"></i>
                </button> */}
      </Table>

      <RegisterVisitorModal
        showModal={showRegModal}
        setShowModal={setShowRegModal}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <EditVisitorModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
      />
      <BlacklistVisitorModal
        showModal={showBlacklistModal}
        setShowModal={setShowBlacklistModal}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};

export default InviteeHistory;
