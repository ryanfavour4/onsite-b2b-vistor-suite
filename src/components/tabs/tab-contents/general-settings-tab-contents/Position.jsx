import React, { useState } from "react";
import { positionData } from "../../../../data";
import useFetch from "../../../../hooks/useFetch";
import Error from "../../../Error";
import Loading from "../../../Loading";
import AddPositionModal from "../../../modals/AddPositionModal";
import DeletePositionModal from "../../../modals/DeletePositionModal";
import EditPositionModal from "../../../modals/EditPositionModal";
import Table from "../../../tables/Table";

const Position = () => {
  const [refresh, setRefresh] = useState(false);

  const { data, loading, error } = useFetch("settings/position", [refresh]);

  const [showAddPositionModal, setShowAddPositionModal] = useState("");
  const [showEditPositionModal, setShowEditPositionModal] = useState("");
  const [showDeletePositionModal, setShowDeletePositionModal] = useState("");
  const [selected, setSelected] = useState(null);

  console.log(data);

  const editPosition = (data) => {
    console.log(data, "edit details data");
    setSelected(data);
    setShowEditPositionModal(true);
  };
  const deletePosition = (data) => {
    console.log(data, "delete details data");
    setSelected(data);
    setShowDeletePositionModal(true);
  };

  const actionColItems = [
    { title: "edit", func: (data) => editPosition(data) },
    { title: "delete", func: (data) => deletePosition(data) },
  ];

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error?.message} />;
  }

  return (
    <div className="p-4">
      <Table
        data={data.data}
        actionColDropdownItems={actionColItems}
        title={"Position"}
        headings={["name", "action"]}
        fieldsKeys={["position", "action"]}
      >
        <button
          onClick={() => setShowAddPositionModal(true)}
          className="bg-lightblue hover:bg-blue text-white drop-shadow-md rounded-md p-2 flex justify-center items-center px-4 mt-2 mb-4"
        >
          Add position
        </button>
      </Table>
      <AddPositionModal
        setRefresh={setRefresh}
        refresh={refresh}
        showModal={showAddPositionModal}
        setShowModal={setShowAddPositionModal}
      />
      <EditPositionModal
        setRefresh={setRefresh}
        refresh={refresh}
        showModal={showEditPositionModal}
        setShowModal={setShowEditPositionModal}
        selected={selected}
        setSelected={setSelected}
      />
      <DeletePositionModal
        setRefresh={setRefresh}
        refresh={refresh}
        showModal={showDeletePositionModal}
        setShowModal={setShowDeletePositionModal}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};

export default Position;
