import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Api } from "../../axios";

export default function EventEdit() {
  const {
    editableObject,
    handleInputChange,
    eventTitle,
    submitEditedEvent,
    handleTicketInputChange,
    eventTicketDetails,
    createEventTicket,
    publishEvent,
  } = useEventEdit();

  return (
    <div className="bg-white p-4 mt-8">
      <div className="flex justify-between items-center p-2">
        <p className="text-2xl font-medium">Edit Event For {eventTitle}</p>

        <button
          onClick={publishEvent}
          className="bg-lightblue p-3 rounded-md text-white hover:bg-blue mt-1 text-sm"
        >
          Publish This Event
        </button>
      </div>
      <hr />
      {/*//!!!____________________FORMS COLUMNS______________________________ */}
      <section className="mt-6 p-6 flex md:flex-row flex-col gap-20 justify-between">
        <div className="border w-full rounded-md p-6">
          <p className="text-xl font-bold mb-6">Edit Event Details</p>
          <form onSubmit={submitEditedEvent}>
            <div className="mb-3">
              <label htmlFor="inviteTime" className="font-semibold text-black">
                Event Name
              </label>
              <input
                type="text"
                name="event_name"
                value={editableObject?.event_name}
                onChange={handleInputChange}
                required
                placeholder="Enter event name"
                className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inviteTime" className="font-semibold text-black">
                Event start
              </label>
              <input
                name="start"
                value={editableObject?.start}
                onChange={handleInputChange}
                required
                type="datetime-local"
                className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inviteTime" className="font-semibold text-black">
                Event End
              </label>
              <input
                type="datetime-local"
                name="end"
                value={editableObject?.end}
                required
                onChange={handleInputChange}
                req
                className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inviteTime" className="font-semibold text-black">
                Event Capacity
              </label>
              <input
                name="capacity"
                value={editableObject?.capacity}
                onChange={handleInputChange}
                type="number"
                required
                placeholder="e.g. 2000"
                className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              />
            </div>
            <div className="mt-6 mb-3">
              <button className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue mt-1 text-sm">
                Submit
              </button>
            </div>
          </form>
        </div>
        {/* //!_____________________OTHER COLUMN___________________ */}
        <div className="border w-full rounded-md p-6">
          <p className="text-xl font-bold mb-6">Create Event Tickets</p>
          <form onSubmit={createEventTicket}>
            <div className="mb-3">
              <label htmlFor="inviteTime" className="font-semibold text-black">
                Ticket Name
              </label>
              <input
                type="text"
                name="ticketName"
                value={eventTicketDetails.ticketName}
                onChange={handleTicketInputChange}
                placeholder="Enter event name"
                required
                className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inviteTime" className="font-semibold text-black">
                Ticket Quantity
              </label>
              <input
                type="number"
                name="ticketQuantity"
                value={eventTicketDetails.ticketQuantity}
                onChange={handleTicketInputChange}
                required
                placeholder="e.g. 2000"
                className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inviteTime" className="font-semibold text-black">
                Ticket Cost
              </label>
              <input
                type="text"
                name="eventCost"
                value={eventTicketDetails.eventCost}
                onChange={handleTicketInputChange}
                required
                placeholder="10,000"
                className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              />
            </div>
            <div className="mt-6 mb-3">
              <button className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue mt-1 text-sm">
                Create Tickets
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

// ???_________________________________________EDIT EVENT CONTROLLER___________________________________
// ???_________________________________________EDIT EVENT CONTROLLER___________________________________

export const useEventEdit = () => {
  const [eventId, setEventId] = useState(null);
  const paramId = useParams().eventId;
  const [editableObject, setEditableObject] = useState(null);
  const [eventTitle, setEventTitle] = useState("");

  // !___________________________ EVENTS EDITING ________________________________ //
  async function getEventById(id) {
    await Api.get(`/events/single/${id}`)
      .then((res) => {
        const { start, end, event_name, event_id, capacity } = res.data.data;
        setEventTitle(event_name);
        setEditableObject({ start, end, event_name, event_id, capacity });
      })
      .catch((error) => {
        toast.error(error.response.data.message || "Something went wrong");
        console.log(error);
      });
  }

  async function submitEditedEvent(e) {
    e.preventDefault();
    const sendingObject = {
      event_name: editableObject.event_name,
      event_start: editableObject.start,
      event_end: editableObject.end,
      event_capacity: Number(editableObject.capacity),
    };

    if (new Date(editableObject.start) <= new Date()) {
      toast.error("Start Date Must be Greater Than Today");
      return false;
    }
    if (new Date(editableObject.end) <= new Date()) {
      toast.error("Ending Date Must be Greater Than Today and start date");
      return false;
    } else {
      await Api.put(`/events/edit-event/${paramId}`, sendingObject)
        .then((res) => {
          console.log(res);
          toast.success("Event Edited Successfully");
        })
        .catch((error) => {
          toast.error(error.message || "Something went wrong");
          console.log(error);
        });
    }
  }

  const handleInputChange = (e) => {
    setEditableObject({ ...editableObject, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getEventById(paramId);
  }, [paramId]);

  // !___________________________ EVENTS TICKETS CREATION ________________________________ //
  // !___________________________ EVENTS TICKETS CREATION ________________________________ //
  const [eventTicketDetails, setEventTicketDetails] = useState({
    ticketName: "",
    ticketQuantity: Number(0),
    eventCost: "",
    eventId: editableObject?.event_id,
  });

  const handleTicketInputChange = (e) => {
    setEventTicketDetails({
      ...eventTicketDetails,
      [e.target.name]: e.target.value,
    });
    console.log(eventTicketDetails);
  };

  useEffect(() => {
    setEventId(editableObject?.event_id);
    setEventTicketDetails({
      ...eventTicketDetails,
      eventId: editableObject?.event_id,
    });
  }, [editableObject]);

  async function createEventTicket(e) {
    e.preventDefault();
    setEventTicketDetails({
      ...eventTicketDetails,
      ticketQuantity: Number(eventTicketDetails.ticketQuantity),
    });

    await Api.post(`/events/create-ticket`, eventTicketDetails)
      .then((res) => {
        console.log(res);
        toast.success("Event Tickets Created Successfully");
      })
      .catch((error) => {
        toast.error(error.message || "Something went wrong");
        console.log(error);
      });
  }

  async function publishEvent() {
    await Api.post(`/events/publish-event`, { eventId: eventId || 0 })
      .then((res) => {
        console.log(res);
        toast.success("Event Tickets Created Successfully");
      })
      .catch((error) => {
        toast.error(error || "Something went wrong");
      });
  }

  return {
    editableObject,
    handleInputChange,
    eventTitle,
    submitEditedEvent,
    handleTicketInputChange,
    eventTicketDetails,
    createEventTicket,
    publishEvent,
  };
};
