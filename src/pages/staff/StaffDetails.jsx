import { useParams } from "react-router-dom";
import AttendanceHistory from "../../components/tabs/tab-contents/staff-tab-contents/AttendanceHistory";
import Summary from "../../components/tabs/tab-contents/staff-tab-contents/Summary";
import VisitationHistory from "../../components/tabs/tab-contents/staff-tab-contents/VisitationHistory";
import Tabs from "../../components/tabs/Tabs";
import avatar from "../../assets/defaultAvatar.png";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { locationListArray, setLocationList } from "../../features/locationSlice";
import { Api } from "../../axios";
import { toast } from "react-toastify";

const StaffDetails = () => {
  const { staffId } = useParams();
  const dispatch = useDispatch();
  const location = useSelector(locationListArray);

  const { data, loading, error } = useFetch(
    `settings/get-staff/${staffId}`,
    []
  );

  const [profileFields, setProfileFields] = useState([
    { title: "firstname", value: "" },
    { title: "lastname", value: " " },
    { title: "staff id", value: "" },
    { title: "email", value: "" },
    { title: "department", value: "" },
    { title: "position", value: "" },
    { title: "address", value: "" },
    { title: "office location", value: "" },
    { title: "assistant", value: "" },
  ]);

  useEffect(() => {
    if (data?.staff) {
      const userLocationName = location?.find((location) => {
        return location.id == data.staff.office_location;
      });

      setProfileFields([
        { title: "firstname", value: data.staff.first_name },
        { title: "lastname", value: data.staff.last_name },
        { title: "staff id", value: data.staff.staff_ID },
        { title: "email", value: data.staff.email },
        { title: "department", value: data.staff.department },
        { title: "position", value: data.staff.position },
        { title: "address", value: data.staff.address },
        {
          title: "office location",
          value: userLocationName?.branch_name || "No Location selected",
        },
        { title: "assistant", value: data.staff.assistant },
      ]);
    }
  }, [data]);

  const tabTitles = ["summary", "attendance history", "visitation history"];
  const tabContents = [
    <Summary profileFields={profileFields} loading={loading} error={error} />,
    <AttendanceHistory />,
    <VisitationHistory />,
  ];

  const resendLoginDetails = () => {
    console.log(staffId);
    Api.post(`settings/resend-staff-login/${staffId}`, {}).then(res => {
      toast.success("Staff Login Information Has Been Sent To Their Email")
    }).catch(err => {
      toast.success("An Error Occurred, Could Not Send Staff Login Information")
      console.log(err);
    })
  }

  useEffect(() => {
    // //*_________________________FETCH BRANCH______________________//
    Api.get("settings/branch")
      .then((res) => {
        dispatch(setLocationList(res.data.data.branches));
      })
      .catch((err) => {
        console.log(err);
      });

  }, [data]);

  return (
    <div className="p-2">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error message={error?.message} />
      ) : (
        <div className="flex items-center">
          <div className="h-28 w-28 rounded-[50%] mr-4">
            <img
              src={avatar}
              className="w-full h-full object-cover rounded-[inherit]"
            />
          </div>
          <div className="flex p-2 ">
            {[
              {
                title: "name",
                value: `${data.staff.first_name} ${data.staff.last_name}`,
              },
              { title: "phone", value: data.staff.phone_number },
              { title: "department", value: data.staff.department },
              { title: "position", value: data.staff.position },
            ].map(({ title, value }, index) => (
              <div
                key={index}
                className={`capitalize p-2 mr-2 ${index !== 3 ? "border-r-2" : ""
                  } border-light`}
              >
                <h4 className="font-semibold">{title}</h4>
                <p>{value}</p>
              </div>
            ))}
          </div>
          <div className="ml-14">
            <button onClick={resendLoginDetails} className=" bg-lightblue hover:bg-blue text-white drop-shadow-md rounded-md p-2 flex justify-center items-center px-4 mt-2 mb-4">Resend Login Details</button>
          </div>
        </div>
      )}

      <Tabs tabTitles={tabTitles} tabContents={tabContents} />
    </div>
  );
};

export default StaffDetails;
