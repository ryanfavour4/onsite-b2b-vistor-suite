import { useState } from "react";
import Table from "../../../components/tables/Table";
import { checkInFieldsData } from "../../../data";
import AddNewFieldModal from "../../../components/modals/AddNewFieldModal";
import EditFieldModal from "../../../components/modals/EditFieldModal";
import DeleteFieldModal from "../../../components/modals/DeleteFieldModal";
import useFetch from "../../../hooks/useFetch";
import VisitorRegTable from "../../../components/tables/VisitorRegFieldsTable";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import DisableFieldModal from "../../../components/modals/DisableFieldModal";

const CheckInFields = () => {
  const [refresh, setRefresh] = useState(false);

  const { data, loading, error } = useFetch("settings/fields", [refresh]);

  const [showNewFieldModal, setShowNewFieldModal] = useState(false);
  const [showEditFieldModal, setShowEditFieldModal] = useState(false);
  const [showDeleteFieldModal, setShowDeleteFieldModal] = useState(false);
  const [showDisableFieldModal, setShowDisableFieldModal] = useState(false);

  const [selected, setSelected] = useState(null);

  const editField = (data) => {
    setSelected(data);
    setShowEditFieldModal(true);
  };

  const deleteField = (data) => {
    setSelected(data);
    setShowDeleteFieldModal(true);
  };

  const disableField = (data) => {
    setSelected(data);
    setShowDisableFieldModal(true);
  };

  const actionColItems = [
    { title: "edit", func: (data) => editField(data) },
    { title: "delete", func: (data) => deleteField(data) },
    { title: "disable", func: (data) => disableField(data) },
  ];

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error?.message} />;
  }

  // CHECK WHICH OBJECTS ARE EMPTY AND IF THEY ARE, FILTER OUT THE EMPTY OBJECT AND RETURN THE NON EMPTY ONES
  const newData = data.fields.filter(obj => Object.values(obj).some(x => x !== ''))

  return (
    <>
      <AddNewFieldModal
        showModal={showNewFieldModal}
        setShowModal={setShowNewFieldModal}
        setRefresh={setRefresh}
        refresh={refresh}
      />
      <EditFieldModal
        showModal={showEditFieldModal}
        setShowModal={setShowEditFieldModal}
        setRefresh={setRefresh}
        refresh={refresh}
        selected={selected}
        setSelected={setSelected}
      />
      <DeleteFieldModal
        showModal={showDeleteFieldModal}
        setShowModal={setShowDeleteFieldModal}
        setRefresh={setRefresh}
        refresh={refresh}
        selected={selected}
        setSelected={setSelected}
      />

      <DisableFieldModal
        showModal={showDisableFieldModal}
        setShowModal={setShowDisableFieldModal}
        setRefresh={setRefresh}
        refresh={refresh}
        selected={selected}
        setSelected={setSelected}
      />

      <div className="p-4 capitalize">
        <VisitorRegTable
          data={newData}
          headings={["field name", "label", "type", "status", "action"]}
          fieldsKeys={[
            "field_name",
            "field_label",
            "field_type",
            "status",
            "action",
          ]}
          statusKeys={["is_enabled", "is_default", "is_required", "is_company_default"]}
          actionColDropdownItems={actionColItems}
          setDisplayFilters={"setDisplayFilters"}
          showActionDropdown={"showActionDropdown"}
          setShowActionDropdown={"setShowActionDropdown"}
          title={"Visitor registration fields"}
        >
          <button
            className="p-2 px4 text-white bg-lightblue hover:bg-blue my-4 rounded-md"
            onClick={() => setShowNewFieldModal(true)}
          >
            Add new field
          </button>
        </VisitorRegTable>
      </div>
    </>
  );
};

export default CheckInFields;
