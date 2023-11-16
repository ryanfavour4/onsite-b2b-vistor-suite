import React from "react";
import { useState } from "react";
import Error from "../../../components/Error";
import Loading from "../../../components/Loading";
import AddNewRoleModal from "../../../components/modals/AddNewRoleModal";
import Table from "../../../components/tables/Table";
import { rolesData } from "../../../data";
import useFetch from "../../../hooks/useFetch";

const Roles = () => {
  const [refresh, setRefresh] = useState(false);
  const { data, loading, error } = useFetch("settings/role", [refresh]);
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);

  const actionColItems = [];

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error?.message} />;
  }

  return (
    <div className="p-4">
      <Table
        data={data?.roles}
        headings={["roleName", "role description", "action"]}
        fieldsKeys={["role", "role_description", "action"]}
        actionColDropdownItems={actionColItems}
        // displayFilters={displayFilters}
        // setDisplayFilters={setDisplayFilters}
        title={"Roles"}
      >
        <button
          onClick={() => setShowAddRoleModal(true)}
          className="bg-green text-white drop-shadow-md rounded-md p-2 flex justify-center items-center px-4 mt-2 mb-4"
        >
          Add
        </button>
      </Table>

      <AddNewRoleModal
        showModal={showAddRoleModal}
        setShowModal={setShowAddRoleModal}
        setRefresh={setRefresh}
        refresh={refresh}
      />
    </div>
  );
};

export default Roles;
