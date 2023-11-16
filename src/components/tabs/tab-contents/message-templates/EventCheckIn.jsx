import React, { useState } from 'react'
import useFetch from '../../../../hooks/useFetch'
import Loading from '../../../Loading'
import "react-quill/dist/quill.snow.css";
import Table from '../../../tables/Table'
import EventCheckInMessageModal from '../../../modals/EventCheckInMessageModal'

const VisitorCheckOut = () => {
    const [displayFilters, setDisplayFilters] = useState(false);
    const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);

    const [refresh, setRefresh] = useState(false);

    const viewTemplate = () => { }
    const editTemplate = () => { }
    const deleteTemplate = () => { }
    const disableTemplate = () => { }

// 
    const actionColItems = [
        { title: "view", func: (data) => viewTemplate(data) },
        { title: "edit", func: editTemplate },
        { title: "disable", func: disableTemplate },
        { title: "delete", func: deleteTemplate },
    ];

    const bulkDelete = () => { }

    const topDropdownItems = [
        {
            title: "bulk delete",
            func: bulkDelete,
            icon: <i className="fa-solid fa-trash"></i>,
        },
    ];


    return (
        <div className='p-4'>

            <Table
                data={[['']]}
                headings={[
                    "subject",
                    "type",
                    "status",
                    "action",
                ]}
                fieldsKeys={[
                    "name",
                    "phone_number",
                    "action",
                ]}
                actionColDropdownItems={actionColItems}
                topDropdownItems={topDropdownItems}
                displayFilters={displayFilters}
                setDisplayFilters={setDisplayFilters}
                title={"Message Templates"}
            >
                <button
                    onClick={() => setShowNewTemplateModal(true)}
                    className="bg-lightblue hover:bg-blue text-white drop-shadow-md rounded-md p-2 flex justify-center items-center px-4 mt-2 mb-4"
                >
                    New Template
                </button>
            </Table>

            <EventCheckInMessageModal refresh={refresh} setRefresh={setRefresh} showModal={showNewTemplateModal} setShowModal={setShowNewTemplateModal} />
        </div>
    )
}

export default VisitorCheckOut