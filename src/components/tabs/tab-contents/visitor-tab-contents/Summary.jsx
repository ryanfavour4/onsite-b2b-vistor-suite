import { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import Error from "../../../Error";
import Loading from "../../../Loading";

const Summary = ({ visitorId }) => {
  const { data, loading, error } = useFetch(`visitor/get/${visitorId}`, []);
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
    if (data) {
      setProfileFields([
        { title: "name", value: data.data.name },
        { title: "phone number", value: data.data.phone_number },
        { title: "email", value: data.data.email },
        { title: "purpose of visit", value: data.data.purpose },
        { title: "address", value: data.data.address },
        { title: "company", value: data.data.company_name },
        { title: "private note", value: data.data.private_note || "No Private Message" },
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

export default Summary;
