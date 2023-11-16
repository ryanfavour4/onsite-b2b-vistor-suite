import { useParams } from "react-router-dom";
import Summary from "../../components/tabs/tab-contents/visitor-tab-contents/Summary";
import VisitationHistory from "../../components/tabs/tab-contents/visitor-tab-contents/VisitationHistory";
import Tabs from "../../components/tabs/Tabs";
import { useEffect, useState } from "react";
import { Api } from "../../axios";

const VisitorDetails = () => {
  const { visitorId } = useParams();
  const [info, setInfo] = useState([]);
  const tabTitles = ["summary", "visitation history"];
  const tabContents = [
    <Summary visitorId={visitorId} />,
    <VisitationHistory id={info?.phone_number} />,
  ];

  useEffect(() => {
    try {
      const fetchData = async () => {
        await Api.get(`visitor/get/${visitorId}`).then((res) => {
          setInfo(res.data.data);
        });
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="p-2">
      <b>Visitor details for {info.name}</b>
      <Tabs tabTitles={tabTitles} tabContents={tabContents} />
    </div>
  );
};

export default VisitorDetails;
