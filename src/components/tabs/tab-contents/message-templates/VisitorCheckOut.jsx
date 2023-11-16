import React, { useState, useEffect } from "react";
import useFetch from "../../../../hooks/useFetch";
import Loading from "../../../Loading";
import "react-quill/dist/quill.snow.css";
import Table from "../../../tables/Table";
import VisitorCheckOutMessageModal from "../../../modals/VisitorCheckOutMessageModal";
import Error from "../../../Error";
import { Api } from "../../../../axios";
import { toast } from "react-toastify";
import Modal, { useModal } from "../../../modals/MODAL_CARROT_SUITE/Modal";
import SearchableDropdown from "../../../dropdowns/SearchableDropdown";
import CloseModalBtn from "../../../modals/CloseModalBtn";
import ReactQuill from "react-quill";
import ButtonSpinner from "../../../ButtonSpinner";

const VisitorCheckOut = () => {
  const [displayFilters, setDisplayFilters] = useState(false);
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);
  const { openModal, isModalClosed, closeModal } = useModal();
  const [ModalChildren, setModalChildren] = useState(null);

  const [refresh, setRefresh] = useState(false);

  const { data, loading, error } = useFetch(
    "settings/purpose-message/checkout",
    [refresh]
  );

  const viewTemplate = () => { };
  const editTemplate = (obj) => {
    console.log(obj);
    openModal();
    setModalChildren(<EditVisitorCheckOut closeModal={closeModal} obj={obj} />)
  };
  const deleteTemplate = (obj) => {
    Api.delete(`/settings/purpose-message/${obj.id}`).then(res => {
      toast.success("Message Deleted Successfully")
      window.location.reload();
    }).catch(err => {
      console.log(err)
      toast.success("Failed To Deleted Message")
    })
  };
  const disableTemplate = (obj) => {
    Api.patch(`/settings/purpose-message/${obj.id}?is_enabled=${!obj.is_enabled}`).then(res => {
      toast.success("Message Updated Successfully")
      window.location.reload();
    })
  };

  const actionColItems = [
    { title: "view", func: (data) => viewTemplate(data) },
    { title: "edit", func: editTemplate },
    { title: "disable", func: disableTemplate },
    { title: "delete", func: deleteTemplate },
  ];

  const bulkDelete = () => { };

  const topDropdownItems = [
    {
      title: "bulk delete",
      func: bulkDelete,
      icon: <i className="fa-solid fa-trash"></i>,
    },
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
        data={data?.fields}
        headings={[
          "purpose of visit",
          "subject",
          "message",
          "file",
          "status",
          "action",
        ]}
        fieldsKeys={[
          "id",
          "check_out_subject",
          "check_out_message",
          "check_out_attachment",
          "is_enabled",
          "action",
        ]}
        actionColDropdownItems={actionColItems}
        topDropdownItems={topDropdownItems}
        // displayFilters={displayFilters}
        // setDisplayFilters={setDisplayFilters}
        title={"Message Templates"}
      >
        <button
          onClick={() => setShowNewTemplateModal(true)}
          className="bg-lightblue hover:bg-blue text-white drop-shadow-md rounded-md p-2 flex justify-center items-center px-4 mt-2 mb-4"
        >
          New Template
        </button>
      </Table>
      <VisitorCheckOutMessageModal
        refresh={refresh}
        setRefresh={setRefresh}
        showModal={showNewTemplateModal}
        setShowModal={setShowNewTemplateModal}
      />
      <Modal closeModal={closeModal} isModalClosed={isModalClosed}>
        {ModalChildren}
      </Modal>
    </div>
  );
};

export default VisitorCheckOut;


export function EditVisitorCheckOut({ closeModal, obj }) {
  const { data: povList } = useFetch("/settings/visit-purposes", []);
  const [povListOptions, setPovListOptions] = useState([])
  const [checkOutMessage, setCheckOutMessage] = useState(obj?.check_out_message)
  const [checkInMessage, setCheckInMessage] = useState(obj?.check_out_subject)
  const [submitting, setSubmitting] = useState(false)
  const [purposeOfVisit, setPurposeOfVisit] = useState({ value: 'all', label: 'all' })
  // purposes: 45
  useEffect(() => {
    if (povList) {
      const defaultFields = povList?.data.defaultFields.map((item) => ({
        ...item,
        is_custom: false,
      }));
      const customFields = povList?.data?.customFields.map((item) => ({
        ...item,
        is_custom: true,
      }));
      const combinedFields = [...defaultFields, ...customFields];
      setPovListOptions(combinedFields)
    }
  }, [povList])

  useEffect(() => {
    setCheckOutMessage(obj?.check_out_message)
    setCheckInMessage(obj?.check_out_subject)
  }, [obj.id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      "check_in_message": checkInMessage,
      "check_out_message": checkOutMessage,
      "attachment": obj.check_out_attachment
    }
    setSubmitting(true)

    Api.put(`settings/purpose-message/${obj.id}`, payload).then(res => {
      console.log(res);
      closeModal()
      setSubmitting(false)
    }).catch(err => {
      console.log(err);
      closeModal()
      setSubmitting(false)
    })
  }

  return (
    <>
      <div className="bg-white w-[90vw] md:min-w-[calc(60vw-90%)] self-center max-w-[36rem] p-4">
        <form onSubmit={handleSubmit} className="bg-white max-w-lg m-auto">
          <CloseModalBtn setShowModal={closeModal} />
          <label htmlFor="dropdown" className="font-semibold text-black">
            Select purpose of visit
          </label>
          <SearchableDropdown options={[{ value: 'all', label: 'all' }, ...povListOptions?.map(({ id, visit_purpose_label }) => ({ value: id, label: visit_purpose_label }))]} selectedOption={purposeOfVisit} setSelectedOption={setPurposeOfVisit} transparent={true} />
          <div className="mt-4">
            <label htmlFor="emailMessage" className="font-semibold text-black">
              Check Out Message
            </label>
            <div className="mb-4 ">
              <ReactQuill
                theme="snow"
                value={checkOutMessage}
                onChange={setCheckOutMessage}
                style={{ height: '100px', marginBottom: '60px' }}
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="emailMessage" className="font-semibold text-black">
              Check In Message
            </label>
            <div className="mb-4 ">
              <ReactQuill
                theme="snow"
                value={checkInMessage}
                onChange={setCheckInMessage}
                style={{ height: '100px', marginBottom: '60px' }}
              />
            </div>
          </div>
          {submitting ? (
            <ButtonSpinner />
          ) : (
            <button
              type="submit"
              className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue text-lg  mt-3"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  )
}
