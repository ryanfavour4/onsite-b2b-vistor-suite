import React, { useState } from 'react'
import useFetch from '../../../../hooks/useFetch'
import Loading from '../../../Loading'
import "react-quill/dist/quill.snow.css";
import Table from '../../../tables/Table'
import VisitorCheckInMessageModal from '../../../modals/VisitorCheckInMessageModal'
import Error from '../../../Error';

const VisitorCheckIn = () => {
    const [displayFilters, setDisplayFilters] = useState(false);
    const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);

    const [refresh, setRefresh] = useState(false);

    const { data, loading, error } = useFetch('settings/purpose-message/checkin', [refresh])

    const viewTemplate = () => { }
    const editTemplate = () => { }
    const deleteTemplate = () => { }
    const disableTemplate = () => { }


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

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error message={error?.message} />;
    }
    console.log('dattttttttaaaaaa', data?.fields)


    return (
        <div className='p-4'>

            <Table
                data={data.fields}
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
                    "check_in_subject",
                    "check_in_message",
                    "check_in_attachment",
                    'is_enabled',
                    'action'
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

            <VisitorCheckInMessageModal refresh={refresh} setRefresh={setRefresh} showModal={showNewTemplateModal} setShowModal={setShowNewTemplateModal} />
        </div>
    )
}

export default VisitorCheckIn