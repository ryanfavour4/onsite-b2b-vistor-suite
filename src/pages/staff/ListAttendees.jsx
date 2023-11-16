import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchableDropdown from "../../components/dropdowns/SearchableDropdown";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import CreateEventModal from "../../components/modals/CreateEventModal";
import DeleteAttendeeModal from "../../components/modals/DeleteAttendeeModal";
import RegisterAttendeeModal from "../../components/modals/RegisterAttendeeModal";
import Table from "../../components/tables/Table";
import { listAttendeesData } from "../../data";
import useFetch from "../../hooks/useFetch";

const ListAttendees = () => {
  const [event, setEvent] = useState({});

  const { data, loading, error } = useFetch(
    `events/get-all-attendees/${event.value}`,
    [event]
  );

  console.log(data, "attendees data");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [displayFilters, setDisplayFilters] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const eventOptions = useFetch("events/get/events", []);
  const [eventID, setEventID] = useState("");
  const [attendeePhone, setAttendeePhone] = useState("");

  const viewProfile = (event) => {
    const eventID = event.event_id;
    const attendeeID = event.phone_number;
    navigate(`/event/${eventID}/${attendeeID}`);
  };

  const editProfile = () => {
    // setShowEditModal(true);
    //
  };

  const deleteProfile = (attendee) => {
    console.log("attendee", attendee);
    setShowDeleteModal(true);
    setAttendeePhone(attendee.phone_number);
    setEventID(attendee.event_id);
  };

  const actionColItems = [
    { title: "view", func: (visitorId) => viewProfile(visitorId) },
    { title: "edit", func: editProfile },
    { title: "delete", func: (e) => deleteProfile(e) },
  ];

  const filterItems = [
    {
      searchState: startDate,
      stateModifier: setStartDate,
      title: "Select start date",
      options: [
        "Tues, 13th December 2022",
        "Tues, 13th December 2022",
        "Tues, 13th December 2022",
      ],
    },
    {
      searchState: endDate,
      stateModifier: setEndDate,
      title: "Select end date",
      options: [
        "Tues, 13th December 2022",
        "Tues, 13th December 2022",
        "Tues, 13th December 2022",
      ],
    },
    {
      searchState: event,
      stateModifier: setEvent,
      title: "select event",
      options: ["lorem", "ipsum", "dolor"],
    },
  ];

  useEffect(() => {
    // console.log(locationOptions.data, 'location dataaa')
    setEvents(
      eventOptions.data?.data?.rows?.map(({ event_id, event_name }) => ({
        value: event_id,
        label: event_name,
      }))
    );
    console.log(data);
  }, [eventOptions.data]);

  // if (true) {
  //   return (
  //     <div>
  //       <button
  //         onClick={() => setShowModal(true)}
  //         className="bg-lightblue hover:bg-blue text-white drop-shadow-md rounded-md p-2 flex justify-center items-center px-4 mt-2 mb-4"
  //       >
  //         Register Attendee
  //       </button>
  //       <RegisterAttendeeModal
  //         showModal={showModal}
  //         setShowModal={setShowModal}
  //       />
  //     </div>
  //   )
  // }

  // console.log(data?.Data);

  return (
    <div className="p-4">
      <div className="mb-3 w-max">
        <label htmlFor="invitedBy" className="font-semibold text-black ">
          Select Event
        </label>
        <SearchableDropdown
          loading={eventOptions.loading}
          options={events}
          selectedOption={event}
          setSelectedOption={setEvent}
          transparent={true}
        />
      </div>

      {loading ? (
        <Loading />
      ) : error?.message ?
        <div className="w-full text-center text-xl font-semibold text-black mt-4 mb-4 bg-white py-6"> 🎉 Please Select An Event 🤗</div>
        : error ?
          (
            <Error message={error?.message} />
          ) : (
            <Table
              data={data.data}
              headings={[
                "first name",
                "last name",
                "phone",
                "email",
                "registrationDate",
                "registrationId",
                "signIn",
                "action",
              ]}
              fieldsKeys={[
                "first_name",
                "last_name",
                "phone_number",
                "email",
                "createdAt",
                "uuid",
                "checked_in",
                "action",
              ]}
              actionColDropdownItems={actionColItems}
              displayFilters={displayFilters}
              setDisplayFilters={setDisplayFilters}
              title={"List attendees"}
              filterItems={filterItems}
            >
              <button
                onClick={() => setShowModal(true)}
                className="bg-lightblue hover:bg-blue text-white drop-shadow-md rounded-md p-2 flex justify-center items-center px-4 mt-2 mb-4"
              >
                Register Attendee
              </button>
            </Table>
          )}

      <RegisterAttendeeModal
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <DeleteAttendeeModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        attendeePhone={attendeePhone}
        eventID={eventID}
      />
    </div>
  );
};

export default ListAttendees;
