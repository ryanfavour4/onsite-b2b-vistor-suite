import React from "react";
import { useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import Error from "../../../Error";
import Loading from "../../../Loading";
import AddDepartmentModal from "../../../modals/AddDepartmentModal";
import DeleteDepartmentModal from "../../../modals/DeleteDepartmentModal";
import EditDepartmentModal from "../../../modals/EditDepartmentModal";
import Table from "../../../tables/Table";

const Department = () => {
  const [showAddDepartmentModal, setShowAddDepartmentModal] = useState(false);
  const [showEditDepartmentModal, setShowEditDepartmentModal] = useState(false);
  const [showDeleteDepartmentModal, setShowDeleteDepartmentModal] =
    useState(false);
  const [selected, setSelected] = useState(null)


  const editDepartment = (data) => {
    console.log(data, 'edit details data')
    setSelected(data)
    setShowEditDepartmentModal(true);
  };
  const deleteDepartment = (data) => {
    console.log(data, 'delete details data')
    setSelected(data)
    setShowDeleteDepartmentModal(true);
  };

  const actionColItems = [
    { title: "edit", func: (data) => editDepartment(data) },
    { title: "delete", func: (data) => deleteDepartment(data) },
  ];

  const [refresh, setRefresh] = useState(false);

  const { loading, error, data } = useFetch("settings/get-department", [refresh]);



  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error?.message} />;
  }


  return (
    <div className="p-4">
      <Table
        data={data.data}
        headings={['name', 'action']}
        fieldsKeys={['department', 'action']}
        actionColDropdownItems={actionColItems}
        title={"Departments"}
      >
        <button
          onClick={() => setShowAddDepartmentModal(true)}
          className="bg-lightblue hover:bg-blue text-white drop-shadow-md rounded-md p-2 flex justify-center items-center px-4 mt-2 mb-4"
        >
          Add department
        </button>
      </Table>
      <AddDepartmentModal
        setRefresh={setRefresh}
        refresh={refresh}
        showModal={showAddDepartmentModal}
        setShowModal={setShowAddDepartmentModal}
      />
      <EditDepartmentModal
        setRefresh={setRefresh}
        refresh={refresh}
        showModal={showEditDepartmentModal}
        setShowModal={setShowEditDepartmentModal}
        selected={selected}
        setSelected={setSelected}
      />
      <DeleteDepartmentModal
        setRefresh={setRefresh}
        refresh={refresh}
        showModal={showDeleteDepartmentModal}
        setShowModal={setShowDeleteDepartmentModal}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};

export default Department;
