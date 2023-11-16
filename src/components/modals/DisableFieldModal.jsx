import { useState } from "react";
import { deleteVisitorField, disableVisitorField } from "../../services/settings/general";
import ButtonSpinner from "../ButtonSpinner";
import Success from "../Success";
import CloseModalBtn from "./CloseModalBtn";

const DisableFieldModal = ({ showModal, setShowModal, selected, setSelected, setRefresh, refresh }) => {

    const [showSuccess, setShowSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false)

    const handleDisable = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true)
            await disableVisitorField(selected.id)
            console.log(selected?.id, 'field to delete id')
            setSelected(null)
            setShowSuccess(true)
            window.location.reload()
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className={`${showModal ? 'modal' : 'hidden'} `}>
            {showSuccess ? (
                <Success
                    message={'Field disabled successfully!'}
                    setShowSuccess={setShowSuccess}
                    setShowParentModal={setShowModal}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            ) : (
                <div className="relative modal--content flex items-center justify-center">
                    <CloseModalBtn setShowModal={setShowModal} />

                    <div className="h-max w-max p-2 text-center">
                        <p className="mb-6 text-black text-xl">
                            Are you sure you want to disable this field?
                        </p>
                        <div className="flex space-x-4 mx-auto capitalize">
                            <div className="w-max-[max-content]">
                                {
                                    submitting ?
                                        <ButtonSpinner processTitle={'processing...'} />
                                        :
                                        <button className="text-white px-4 py-3 bg-green rounded-md capitalize mt-3" onClick={handleDisable}>
                                            yes
                                        </button>
                                }
                            </div>
                            <button className="text-white px-4 py-3 bg-darkred rounded-md capitalize mt-3" onClick={() => setShowModal(false)}>
                                no
                            </button>
                        </div>
                    </div>

                </div>
            )}


        </div>
    );
};

export default DisableFieldModal;
