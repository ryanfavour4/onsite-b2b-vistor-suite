import React from "react";
import { useState } from "react";
import AddExhib from "../../../components/modals/AddExhib";
import EditExhibitionFieldModal from "../../../components/modals/EditExhibitionFieldModal";
import Table from "../../../components/tables/Table";
import { exhibitionData } from "../../../data";

const ExhibitionMode = () => {
  const [showAddExhibitionFieldModal, setShowAddExhibitionFieldModal] =
    useState(false);
  const [showEditExhibitionFieldModal, setShowEditExhibitionFieldModal] =
    useState(false);

  const editField = () => { setShowEditExhibitionFieldModal(true) };
  const deleteField = () => { };

  const actionColItems = [
    { title: "edit", func: editField },
    { title: "delete", func: deleteField },
  ];

  return (
    <div className="p-4 ">
      <Table
        data={exhibitionData.data}
        headings={exhibitionData.headings}
        fieldsKeys={[
          'fieldName',
          'required',
          'isEnabled',
          'action'
        ]}
        actionColDropdownItems={actionColItems}
        title={"Exhibition mode fields"}
      >
        <button
          onClick={() => setShowAddExhibitionFieldModal(true)}
          className="bg-lightblue hover:bg-blue text-white drop-shadow-md rounded-md p-2 flex justify-center items-center px-4 mt-2 mb-4"
        >
          Add field
        </button>
      </Table>

      <AddExhib
        showModal={showAddExhibitionFieldModal}
        setShowModal={setShowAddExhibitionFieldModal}
      />
      <EditExhibitionFieldModal
        showModal={showEditExhibitionFieldModal}
        setShowModal={setShowEditExhibitionFieldModal}
      />
    </div>
  );
};

export default ExhibitionMode;
