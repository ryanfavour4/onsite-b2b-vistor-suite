import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { formatDate, formatTime } from "../../utils/formatDate";

export default function EventDetails() {
  const { eventId } = useParams();

  const { data, loading, error } = useFetch(`/events/single/${eventId}`, []);

  const [profileFields, setProfileFields] = useState([
    { title: "name", value: "" },
    { title: "phone number", value: "" },
    { title: "email", value: "" },
    { title: "purpose of visit", value: "" },
    { title: "address", value: "" },
    { title: "company", value: "" },
    { title: "private note", value: "" },
  ]);

  useEffect(() => {
    if (data?.data) {
      setProfileFields([
        { title: "name", value: data.data.event_name },
        { title: "Branch Code", value: data.data.branch_code },
        // { title: "phone number", value: data.data.phone_number },
        // { title: "email", value: data.data.email },
        { title: "Event Description", value: data.data.description },
        { title: "Location", value: data.data.location },
        { title: "company", value: data.data.company_name },
        {
          title: "Start Date",
          value: `${formatDate(new Date(data.data.start))} : ${formatTime(
            new Date(data.data.start)
          )}`,
        },
        {
          title: "End Date",
          value: `${formatDate(new Date(data.data.end))} : ${formatTime(
            new Date(data.data.end)
          )}`,
        },
        {
          title: "Registration Deadline",
          value: `${formatDate(
            new Date(data.data.reg_deadline)
          )} : ${formatTime(new Date(data.data.reg_deadline))}`,
        },
        { title: "Number of seaters", value: data.data.capacity },
      ]);
    }
  }, [data]);

  return (
    <div className="my-4 bg-white p-6">
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
}
