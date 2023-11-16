import { visitationHistoryData } from "../../../../data";
import Table from "../../../tables/Table";
import { useEffect, useState } from "react";
import { Api } from "../../../../axios";

const InviteeVisitationHistory = ({ id }) => {
  const [info, setInfo] = useState([]);

  const getDetails = async () => {
    await Api.get(`visitor/invitee/invitee-history/${id}`).then((res) => {
      setInfo(res.data.data);
    });
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      <Table
        data={info}
        // data={[]}
        headings={[
          "name",
          "phone number",
          "email",
          "company name",
          "address",
          "status",
          "action",
        ]}
        fieldsKeys={[
          "first_name",
          "phoneNumber",
          "email",
          "company_name",
          "address",
          "isCheckedIn",
          "action",
        ]}
        // data={visitationHistoryData}
        actionColDropdownItems={[]}
        topDropdownItems={[]}
        showActionDropdown={"showActionDropdown"}
        setShowActionDropdow={"setShowActionDropdown"}
        title={"Visitation history"}
      />
    </div>
  );
};

export default InviteeVisitationHistory;
