import { useState } from "react";
import CloseModalBtn from "./CloseModalBtn";
import Success from "../Success";
import { createEvent } from "../../services/event";
import ButtonSpinner from "../ButtonSpinner";
import { toast } from "react-toastify";

const CreateEventModal = ({ showModal, setShowModal, refresh, setRefresh }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventStart, setEventStart] = useState(new Date());
  const [eventEnd, setEventEnd] = useState(new Date());
  const [registerDeadline, setRegisterDeadline] = useState(new Date());
  const [eventCapacity, setEventCapacity] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month =
      String(date.getMonth() + 1).length > 1
        ? date.getMonth() + 1
        : `0${date.getMonth() + 1}`;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds =
      String(date.getSeconds() + 1).length > 1
        ? date.getSeconds() + 1
        : `0${date.getSeconds() + 1}`;
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = async (e) => {
    const details = {
      event_name: eventName,
      location: eventLocation,
      event_start: formatDate(eventStart),
      event_end: formatDate(eventEnd),
      reg_deadline: formatDate(registerDeadline),
      event_capacity: Number(eventCapacity),
    };

    e.preventDefault();
    setSubmitting(true);
    createEvent(details)
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setSubmitting(false));
  };

  return (
    <div className={`${showModal ? "modal" : "hidden"}`}>
      {showSuccess ? (
        <Success
          message={"Event created successfully!"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ) : (
        <form onSubmit={handleSubmit} className="relative modal--content h-32">
          <CloseModalBtn setShowModal={setShowModal} />

          <div className="mb-3">
            <label htmlFor="eventName" className="font-semibold text-black ">
              Event name
            </label>
            <input
              type="text"
              value={eventName}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Enter event name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="eventName" className="font-semibold text-black ">
              Event Location
            </label>
            <input
              type="text"
              value={eventLocation}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setEventLocation(e.target.value)}
              placeholder="Enter event location"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inviteTime" className="font-semibold text-black">
              Event start
            </label>
            <input
              type="datetime-local"
              value={eventStart}
              onChange={(e) => setEventStart(e.target.value)}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full cursor-pointer"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inviteTime" className="font-semibold text-black">
              Event end
            </label>
            <input
              type="datetime-local"
              value={eventEnd}
              onChange={(e) => setEventEnd(e.target.value)}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full cursor-pointer"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inviteTime" className="font-semibold text-black">
              Deadline
            </label>
            <input
              type="datetime-local"
              value={registerDeadline}
              onChange={(e) => setRegisterDeadline(e.target.value)}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full cursor-pointer"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="eventCapacity"
              className="font-semibold text-black "
            >
              Event capacity
            </label>
            <input
              type="number"
              value={eventCapacity}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setEventCapacity(e.target.value)}
              placeholder="e.g. 2000"
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
              Create Event
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default CreateEventModal;
