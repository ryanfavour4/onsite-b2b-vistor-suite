import { useEffect, useState } from "react";
import Required from "../Required";
import SearchableDropdown from "../dropdowns/SearchableDropdown";
import CloseModalBtn from "./CloseModalBtn";
import Success from "../Success";
import { registerAttendee } from "../../services/attendee";
import { toast } from "react-toastify";
import ButtonSpinner from "../ButtonSpinner";
import useFetch from "../../hooks/useFetch";

const AddExhib = ({ showModal, setShowModal }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("male");
    const [invitedBy, setInvitedBy] = useState("");
    const [eventId, setEventId] = useState({});

    const [events, setEvents] = useState([]);

    const [submitting, setSubmitting] = useState(false);

    const genders = ["male", "female"]


    const custom_fields = { custom_fields_name: "field 1 value" }

    const eventOptions = useFetch('events/get/events', [showModal])


    useEffect(() => {
        // console.log(locationOptions.data, 'location dataaa')
        setEvents(eventOptions.data?.data?.rows?.map(
            ({ event_id, event_name }) => ({ value: event_id, label: event_name }
            )))
    }, [eventOptions.data])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true)
            await registerAttendee({
                firstname, lastname, email, invitedBy, phone, eventId: eventId.value, custom_fields: { custom_fields_name: "field 1 value" }, gender
            })
            setShowSuccess(true);
        } catch (error) {
            toast.error(error?.message || error)
        } finally {
            setSubmitting(false)
        }
    };

    return (
        <div className={`${showModal ? "modal" : "hidden"}`}>
            {showSuccess ? (
                <Success
                    message={"Attendee registered successfully!"}
                    setShowSuccess={setShowSuccess}
                    setShowParentModal={setShowModal}
                />
            ) : (
                <form onSubmit={handleSubmit} className="relative modal--content h-32">
                    <CloseModalBtn setShowModal={setShowModal} />

                    <div className="mb-3">
                        <label htmlFor="firstname" className="font-semibold text-black ">
                            First Name
                        </label>
                        <input
                            type="text"
                            value={firstname}
                            className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                            onChange={(e) => setFirstname(e.target.value)}
                            placeholder="Enter first name"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="lastname" className="font-semibold text-black ">
                            Last Name
                        </label>
                        <input
                            type="text"
                            value={lastname}
                            className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                            onChange={(e) => setLastname(e.target.value)}
                            placeholder="Enter last name"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="font-semibold text-black ">
                            Email address
                        </label>
                        <input
                            type="email"
                            value={email}
                            className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email address"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="font-semibold text-black ">
                            Phone number
                        </label>
                        <input
                            type="number"
                            value={phone}
                            className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter phone number"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="invitedBy" className="font-semibold text-black ">
                            Invited By
                        </label>
                        <input
                            type="text"
                            value={invitedBy}
                            className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                            onChange={(e) => setInvitedBy(e.target.value)}
                            placeholder="Enter 'invited by' name"
                        />
                    </div>


                    <div className="mb-3">
                        <label htmlFor="invitedBy" className="font-semibold text-black ">
                            gender
                        </label>
                        <SearchableDropdown

                            options={genders}
                            selectedOption={gender}
                            setSelectedOption={setGender}
                            transparent={true}
                        />
                    </div>




                    <div className="mb-3">
                        <label htmlFor="invitedBy" className="font-semibold text-black ">
                            Event
                        </label>
                        <SearchableDropdown
                            loading={eventOptions.loading}
                            options={events}
                            selectedOption={eventId}
                            setSelectedOption={setEventId}
                            transparent={true}
                        />
                    </div>

                    {submitting ?
                        <ButtonSpinner />
                        :
                        <button
                            type="submit"
                            className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue mt-1 text-sm"
                            onClick={handleSubmit}
                        >
                            Register Attendee
                        </button>
                    }


                </form>
            )}
        </div>
    );
};

export default AddExhib;
