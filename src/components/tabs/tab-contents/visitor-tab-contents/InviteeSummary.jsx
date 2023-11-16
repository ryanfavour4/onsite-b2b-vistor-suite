import { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import Error from "../../../Error";
import Loading from "../../../Loading";

const InviteeSummary = ({ inviteeId }) => {
  const { data, loading, error } = useFetch(`visitor/invitee/${inviteeId}`, []);
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
    if (data?.data?.invitee) {
      setProfileFields([
        { title: "first name", value: data.data.invitee.first_name },
        { title: "last name", value: data.data.invitee.last_name },
        { title: "phone number", value: data.data.invitee.phoneNumber },
        { title: "email", value: data.data.invitee.email },
        { title: "purpose of visit", value: data.data.invitee.purpose },
        { title: "date", value: data.data.invitee.date },
        { title: "company", value: data.data.invitee.companyInfo.name },
        { title: "invite code", value: data.data.invitee.inviteCode },
      ]);
    }
  }, [data]);

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

export default InviteeSummary;
