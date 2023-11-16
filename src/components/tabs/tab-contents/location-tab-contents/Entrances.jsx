import React from "react";
import { useState } from "react";
import { entranceFieldsData } from "../../../../data";
import useFetch from "../../../../hooks/useFetch";
import Error from "../../../Error";
import Loading from "../../../Loading";
import CreateEntranceLocationModal from "../../../modals/CreateEntranceLocationModal";
import EditEntranceLocationModal from "../../../modals/EditEntranceLocationModal";
import Table from "../../../tables/Table";

const Entrances = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditEntranceModal, setShowEditEntranceModal] = useState(false);

  const editEntrance = () => {
    setShowEditEntranceModal(true);
  };
  const deleteEntrance = () => {};
  const actionColItems = [
    { title: "edit", func: editEntrance },
    { title: "delete", func: deleteEntrance },
  ];

  const { data, loading, error } = useFetch("settings/view-location", []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error?.message} />;
  }

  return (
    <div>
      <Table
        data={data.data.locations}
        headings={["branchName", "entranceName", "action"]}
        fieldsKeys={["branch_code", "name", "action"]}
        actionColDropdownItems={actionColItems}
        setDisplayFilters={"setDisplayFilters"}
        showActionDropdown={"showActionDropdown"}
        setShowActionDropdown={"setShowActionDropdown"}
        title={"Entrances"}
      >
        <button
          onClick={() => setShowModal(true)}
          className="mx-2 bg-lightblue hover:bg-blue text-white drop-shadow-md rounded-md p-2 flex justify-center items-center px-4 pmt-2../"
        >
          Create entrance Location
        </button>
      </Table>
      <CreateEntranceLocationModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <EditEntranceLocationModal
        showModal={showEditEntranceModal}
        setShowModal={setShowEditEntranceModal}
      />
    </div>
  );
};

export default Entrances;
