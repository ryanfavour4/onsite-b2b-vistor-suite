import { visitationHistoryData } from "../../../../data";
import Table from "../../../tables/Table";

const VisitationHistory = () => {
  const exportToCSV = () => {};

  console.log(visitationHistoryData);
  return (
    <div>
      <Table
        data={visitationHistoryData.data}
        // data={[]}
        headings={[
          "date",
          "visitor name",
          "email",
          "phone number",
          "purpose of visit",
          "sign in",
          "sign out",
          "duration of stay",
        ]}
        // headings={[]}
        // fieldsKeys={[
        //   "date",
        //   "visitorName",
        //   "email",
        //   "phoneNumber",
        //   "purposeOfVisit",
        //   "signIn",
        //   "signOut",
        //   "durationOfStay",
        // ]}
        fieldsKeys={[
          "date",
          "visitorName",
          "email",
          "phoneNumber",
          "purposeOfVisit",
          "signIn",
          "signOut",
          "durationOfStay",
        ]}
        actionColDropdownItems={[]}
        topDropdownItems={[
          {
            title: "export to csv",
            func: exportToCSV,
            icon: <i className="fa-solid fa-file-export"></i>,
          },
        ]}
        showActionDropdown={"showActionDropdown"}
        setShowActionDropdow={"setShowActionDropdown"}
        title={"Visitation history"}
      ></Table>
    </div>
  );
};

export default VisitationHistory;
