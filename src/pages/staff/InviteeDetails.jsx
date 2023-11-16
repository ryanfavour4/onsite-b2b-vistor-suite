import { useParams } from "react-router-dom";
import VisitationHistory from "../../components/tabs/tab-contents/visitor-tab-contents/VisitationHistory";
import Tabs from "../../components/tabs/Tabs";
import { useEffect, useState } from "react";
import { Api } from "../../axios";
import InviteeSummary from "../../components/tabs/tab-contents/visitor-tab-contents/InviteeSummary";
import InviteeHistory from "./InviteeHistory";

const InviteeDetails = () => {
  const { inviteeId } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabTitles = ["summary", "visitation history"];
  const tabContents = [
    <InviteeSummary inviteeId={inviteeId} />,
    <InviteeHistory id={details?.phoneNumber} />,
  ];

  console.log(details);

  useEffect(() => {
    try {
      const fetchData = async () => {
        await Api.get(`visitor/invitee/${inviteeId}`).then((res) => {
          setDetails(res.data.data.invitee);
          console.log(details.phoneNumber);
          setLoading;
        });
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="p-2">
      <b>
        invitee details for {details?.first_name + " " + details?.last_name}
      </b>
      <Tabs tabTitles={tabTitles} tabContents={tabContents} />
    </div>
  );
};

export default InviteeDetails;
