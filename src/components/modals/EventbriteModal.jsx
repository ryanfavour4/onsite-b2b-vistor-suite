import { useState } from "react";
import CloseModalBtn from "./CloseModalBtn";
import Success from "../Success";
import { addVisitorField } from "../../services/settings/general";
import { toast } from "react-toastify";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import SearchableDropdown from "../dropdowns/SearchableDropdown";
import ButtonSpinner from "../ButtonSpinner";
import { connectToEventbrite } from "../../services/event";

const EventbriteModal = ({ showModal, setShowModal, refresh, setRefresh }) => {
    const [eventbriteId, setEventbriteId] = useState("");
    const [organizationId, setOrganizationId] = useState("");

    const [submitting, setSubmitting] = useState(false)

    const [showSuccess, setShowSuccess] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        connectToEventbrite({ eventbrite_id: eventbriteId, organization_id: organizationId })
            .then(() => {
                setShowSuccess(true)
            })
            .catch((error) => toast.error(error.message))
            .finally(() => setSubmitting(false));
    };

    return (
        <div
            className={`${showModal ? "modal" : "hidden"} text-sm`}
        >
            {showSuccess ? (
                <Success
                    message={"Eventbrite connected successfully!"}
                    setShowSuccess={setShowSuccess}
                    setShowParentModal={setShowModal}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            ) : (
                <form onSubmit={handleSubmit} className="relative modal--content">
                    <CloseModalBtn setShowModal={setShowModal} />
                    <div className="mb-3">
                        <label htmlFor="fieldName" className="font-semibold text-black ">
                            Event ID
                        </label>
                        <input
                            type="text"
                            value={eventbriteId}
                            id="eventbriteId"
                            className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                            onChange={(e) => setEventbriteId(e.target.value)}
                            placeholder="Enter eventbrite ID"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="fieldLabel" className="font-semibold text-black">
                            Organization ID
                        </label>
                        <input
                            type="text"
                            id="organizationId"
                            value={organizationId}
                            className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                            onChange={(e) => setOrganizationId(e.target.value)}
                            placeholder="Enter organization ID"
                        />
                    </div>

                    {submitting ? (
                        <ButtonSpinner />
                    ) : (
                        <button
                            type="submit"
                            className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue mt-1 text-sm"
                            onClick={handleSubmit}
                        >
                            Connect
                        </button>
                    )}


                </form>

            )
            }
        </div >
    );
};

export default EventbriteModal;
