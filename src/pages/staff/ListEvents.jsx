import React from "react";
import { useState } from "react";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import CreateEventModal from "../../components/modals/CreateEventModal";
import Table from "../../components/tables/Table";
import { listEventsData } from "../../data";
import useFetch from "../../hooks/useFetch";
import EventTable from "../../components/tables/EventsTable";
import { useNavigate } from "react-router-dom";
import DeleteEventModal from "../../components/modals/DeleteEventModal";

const ListEvents = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [id, setId] = useState("");

  const viewEvent = (eventId) => {
    navigate(`/event-details/${eventId.id}`);
  };

  const editEvent = (eventId) => {
    navigate(`/edit-event-details/${eventId.id}`);
  };

  const analysis = (eventId) => {
    navigate(`/view-event-analysis/${eventId.event_id}`);
    console.log(eventId);
  };

  const deleteEvent = (event) => {
    console.log("event id", event.id);
    setShowDeleteModal(true);
    setId(event.id);
    // setRefresh(true);
  };

  const viewAttendees = () => {
    //
  };

  const actionColItems = [
    { title: "view", func: (visitorId) => viewEvent(visitorId) },
    { title: "edit", func: (id) => editEvent(id) },
    { title: "analysis", func: (id) => analysis(id) },
    { title: "delete", func: (id) => deleteEvent(id) },
    { title: "view attendees", func: viewAttendees },
  ];
  const { loading, error, data } = useFetch("events/get/events", [refresh]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error?.message} />;
  }

  return (
    <div className="p-4">
      <EventTable
        data={data.data.rows}
        headings={[
          "event name",
          "event ID",
          "event date",
          "location",
          "action",
        ]}
        fieldsKeys={["event_name", "event_id", "start", "location", "action"]}
        actionColDropdownItems={actionColItems}
        title={"List events"}
      >
        <button
          onClick={() => setShowModal(true)}
          className="bg-lightblue hover:bg-blue text-white drop-shadow-md rounded-md p-2 flex justify-center items-center px-4 mt-2 mb-4 capitalize"
        >
          create event
        </button>
      </EventTable>

      <CreateEventModal
        showModal={showModal}
        setShowModal={setShowModal}
        refresh={refresh}
        setRefresh={setRefresh}
      />

      <DeleteEventModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        refresh={refresh}
        setRefresh={setRefresh}
        id={id}
      />
    </div>
  );
};

export default ListEvents;
