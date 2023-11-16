import { useState } from "react";
import Table from "../../components/tables/Table";
import { blacklistData, messagingData } from "../../data";
import { useNavigate } from "react-router-dom";
import AddPurposeModal from "../../components/modals/AddPurposeModal";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useFetch from "../../hooks/useFetch";
import EditPurposeModal from "../../components/modals/EditPurpose";
import DeleteStaffModal from "../../components/modals/DeleteStaffModal";
import DeletePurposeModal from "../../components/modals/DeletePurposeModal";
import DisablePurposeModal from "../../components/modals/DisablePurposeModal";
import ChangeDefaultAdminModal from "../../components/modals/ChangeDefaultAdminModal";
import { toast } from "react-toastify";

const Messaging = () => {
  const [showAddPurposeModal, setShowAddPurposeModal] = useState(false);
  const [showEditPurposeModal, setShowEditPurposeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [showHostModal, setShowHostModal] = useState(false);

  const [id, setId] = useState(0);
  const [currentSelect, setCurrentSelect] = useState(null);

  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  const viewMessage = (inviteId) => {
    navigate(`/invites/${inviteId.id}`);
  };

  const editMessage = (inviteId) => {
    setShowEditPurposeModal(true);
    setId(inviteId.id);
  };

  const deleteMessage = (data) => {
    setId(data.id);
    setShowDeleteModal(true);
  };

  const disableMessage = (data) => {
    setId(data.id);
    setCurrentSelect(data);
    setShowDisableModal(true);
  };

  const configureMessage = (obj) => {
    localStorage.setItem("configure-welcome-message", JSON.stringify(obj));
    navigate(`/configure-welcome-message`);
  };

  const setVisitType = ({ id }) => {
    navigate(`/set-visit-type/${id}`);
  };

  const changeHost = (host) => {
    console.log(host);

    if (host.default_host) {
      setId(host.default_host.id);
      setShowHostModal(true);
    } else {
      toast.error("Defualt host is not available for this purpose");
    }
  };

  const { loading, error, data } = useFetch("/settings/visit-purposes", [
    refresh,
  ]);
  const actionColItems = [
    { title: "view message", func: (inviteId) => viewMessage(inviteId) },
    { title: "edit", func: (inviteId) => editMessage(inviteId) },
    // { title: "delete message", func: (id) => deleteMessage(id) },
    { title: "set visit type", func: setVisitType },
    { title: "configure welcome message", func: configureMessage },
    { title: "delete", func: (inviteId) => deleteMessage(inviteId) },
    {
      title: "Disable/Enable",
      func: (inviteId) => disableMessage(inviteId),
    },
    {
      title: "Change default host",
      func: (id) => changeHost(id),
    },
  ];

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error?.message} />;
  }

  const defaultFields = data?.data.defaultFields.map((item) => ({
    ...item,
    is_custom: false,
  }));

  const customFields = data?.data.customFields.map((item) => ({
    ...item,
    is_custom: true,
  }));

  const combinedFields = [...defaultFields, ...customFields];
  // const combinedFields = [...defaultFields, ...customFields].map((item) => ({
  //   ...item,
  //   is_enabled: item.is_enabled ? "true" : "false",
  // }));

  const getPlan = localStorage.getItem("User Plan");
  console.log(combinedFields);

  return (
    <div className="p-4">
      <Table
        data={combinedFields}
        headings={[
          "purpose name",
          "purpose label",
          "Status",
          "is default",
          // "Default Host Email",
          "action",
        ]}
        fieldsKeys={[
          "visit_purpose_name",
          "visit_purpose_label",
          "is_enabled",
          "is_default",
          // "default_host.staff_id",
          "action",
        ]}
        actionColDropdownItems={actionColItems}
        title={"Purpose of visit"}
        // tableTitle={"Purpose of visit"}
      >
        {getPlan !== "Free Plan" && (
          <button
            onClick={() => setShowAddPurposeModal(true)}
            className="mx-2 bg-lightblue hover:bg-blue text-white drop-shadow-md rounded-md p-2 flex justify-center items-center px-4 mt-2"
          >
            Add new purpose of visit
          </button>
        )}
      </Table>

      <AddPurposeModal
        showModal={showAddPurposeModal}
        setShowModal={setShowAddPurposeModal}
        refresh={refresh}
        setRefresh={setRefresh}
      />

      <EditPurposeModal
        showModal={showEditPurposeModal}
        setShowModal={setShowEditPurposeModal}
        refresh={refresh}
        setRefresh={setRefresh}
        id={id}
      />

      <DeletePurposeModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        id={id}
      />

      <DisablePurposeModal
        showModal={showDisableModal}
        setShowModal={setShowDisableModal}
        id={id}
        currentSelect={currentSelect}
      />

      <ChangeDefaultAdminModal
        showModal={showHostModal}
        setShowModal={setShowHostModal}
        id={id}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default Messaging;
