import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import Error from "../../../Error";
import Loading from "../../../Loading";

const EventSummary = () => {
  const params = useParams();
  const { eventid, attendeeid } = params;

  const { data, loading, error } = useFetch(
    `events/get-attendee/${eventid}/${attendeeid}`,
    []
  );
  const [profileFields, setProfileFields] = useState([
    { title: "name", value: "" },
    { title: "phone number", value: "" },
    { title: "email", value: "" },
    { title: "attendee tag", value: "" },
    { title: "checked in", value: "" },
    { title: "event id", value: "" },
    { title: "event name", value: "" },
    { title: "invited by", value: "" },
    { title: "gender", value: "" },
  ]);

  useEffect(() => {
    if (data?.data) {
      setProfileFields([
        { title: "first name", value: data.data.first_name },
        { title: "last name", value: data.data.last_name },
        { title: "phone number", value: data.data.phone_number },
        { title: "email", value: data.data.email },
        { title: "attendee tag", value: data.data.attendeeTag },
        { title: "checked in", value: data.data.checked_in.toString() },
        { title: "event id", value: data.data.event_id },
        { title: "event name", value: data.data.event_name },
        { title: "invited by", value: data.data.invited_by },
        { title: "gender", value: data.data.gender },
      ]);
    }
  }, [data]);

  console.log("attendeeid", data);

  return (
    <div className="my-4">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error message={error?.message} />
      ) : (
        <>
          {profileFields.map(({ title, value }) => {
            return (
              <div
                className="flex border-lightblue p-3 border-solid border-b-[1px] capitalize"
                key={title}
              >
                <h3 className="w-2/6 font-semibold">{title}</h3>
                <p className="w-4/6">{value}</p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default EventSummary;
