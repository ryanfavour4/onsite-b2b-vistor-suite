import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import Error from "../../../Error";
import Loading from "../../../Loading";
import ReactTimeAgo from "react-time-ago";

import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

const Summary = () => {
  const { companyId } = useParams();
  const { data, loading, error } = useFetch(`admin/companies/${companyId}`, []);
  const [profileFields, setProfileFields] = useState([
    { title: "name", value: "" },
    { title: "phone number", value: "" },
    { title: "email", value: "" },
    { title: "options", value: "" },
    { title: "sign up date", value: "" },
    { title: "last seen", value: "" },
    { title: "active brand", value: "" },
  ]);

  TimeAgo.addDefaultLocale(en);
  TimeAgo.addLocale(ru);

  useEffect(() => {
    if (data?.data) {
      setProfileFields([
        { title: "name", value: data.data.name },
        { title: "phone number", value: data.data.phone_number },
        { title: "email", value: data.data.companyemail },
        { title: "options", value: data.data.options },
        { title: "sign up date", value: data.data.createdAt },
        { title: "last seen", value: data.data.updatedAt },
        { title: "active brand", value: data.data.activeBrand.toString() },
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
                {title == "last seen" ? (
                  <>
                    <h3 className="w-2/6 font-semibold">{title}</h3>
                    <p className="w-4/6">
                      {" "}
                      {value && <ReactTimeAgo date={value} locale="en-US" />}
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="w-2/6 font-semibold">{title}</h3>
                    <p className="w-4/6">{value}</p>
                  </>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Summary;
