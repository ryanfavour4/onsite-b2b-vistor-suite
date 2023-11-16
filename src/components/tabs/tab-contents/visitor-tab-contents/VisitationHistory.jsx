import { visitationHistoryData } from "../../../../data";
import Table from "../../../tables/Table";
import { useEffect, useState } from "react";
import { Api } from "../../../../axios";

const VisitationHistory = ({ id }) => {
  const [info, setInfo] = useState([]);

  const getDetails = async () => {
    await Api.get(`visitor/${id}/history`).then((res) => {
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
          "name",
          "phone_number",
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

export default VisitationHistory;
