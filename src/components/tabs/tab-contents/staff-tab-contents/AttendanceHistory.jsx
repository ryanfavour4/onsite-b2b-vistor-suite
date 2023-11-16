import { useState } from "react";
import { attendanceHistory } from "../../../../data";
import Table from "../../../tables/Table";

const AttendanceHistory = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [displayFilters, setDisplayFilters] = useState(false);
  const filterItems = [
    {
      searchState: startDate,
      stateModifier: setStartDate,
      title: "start date",
      options: ["lorem", "ipsum", "dolor"]
    },
    {
      searchState: endDate,
      stateModifier: setEndDate,
      title: "end date",
      options: ["lorem", "ipsum", "dolor"]
    }
  ];

  const exportToCSV = () => {};
  return (
    <div>
      <Table
        // data={attendanceHistory}
        actionColDropdownItems={[]}
        // topDropdownItems={[
        //   {
        //     title: "export to csv",
        //     func: exportToCSV,
        //     icon: <i className="fa-solid fa-file-export" />
        //   }
        // ]}
        // filterItems={filterItems}
        // displayFilters={displayFilters}
        // setDisplayFilters={setDisplayFilters}
        showActionDropdown={"showActionDropdown"}
        setShowActionDropdow={"setShowActionDropdown"}
        title={"Visitation history"}
      />
    </div>
  );
};

export default AttendanceHistory;
