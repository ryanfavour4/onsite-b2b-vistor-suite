import { useState } from "react";
import RegisterStaffModal from "../../components/modals/RegisterStaffModal";
import StaffCard from "../../components/cards/StaffCard";
import TableActionDropdown from "../../components/dropdowns/TableActionDropdown";
import useFetch from "../../hooks/useFetch";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Api } from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { setStaffList, staffListArray } from "../../features/staffSlice";
import { setDepartmentList } from "../../features/departmentSlice";
import {
  positionListArray,
  setPositionList
} from "../../features/positionSlice";
import {
  locationListArray,
  setLocationList
} from "../../features/locationSlice";
import { toast } from "react-toastify";
import Pagination from "../../components/layouts/Pagination";

const Staff = () => {
  const staffList = useSelector(staffListArray);
  const locationList = useSelector(locationListArray);
  const dispatch = useDispatch();
  const [filteredStaff, setFilteredStaff] = useState(staffList);
  const [showRegModal, setShowRegModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [department, setDepartment] = useState([]);
  const [branch, setBranch] = useState([]);
  const [position, setPosition] = useState([]);
  const usersPlan = localStorage.getItem("User Plan");
  const { data, loading, error } = useFetch("settings/get-all-staffs", [
    refresh
  ]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const lastRowsIndex = currentPage * rowsPerPage;
  const firstRowsIndex = lastRowsIndex - rowsPerPage;
  let currentPackageInView =
    data?.staffs && data?.staffs?.slice(firstRowsIndex, lastRowsIndex);

  useEffect(() => {
    setFilteredStaff(staffList);
    if (data?.staffs) {
      dispatch(setStaffList(data.staffs));
    }
  }, [data]);

  const exportToCSV = () => {
    const fileName = "staffs";
    const data = staffList;
    if (usersPlan == "Free Plan") {
      toast("Free plan cant access this feature. Upgrade your plan");
    } else {
      const csvHeaders = [
        "First Name",
        "Last Name",
        "Phone Number",
        "Email",
        "Role",
        "Position",
        "Address",
        "Department",
        "Assistant"
      ];
      const csvContent =
        csvHeaders.join(",") +
        "\n" +
        staffList
          .map(
            (row) =>
              `${row.first_name}, ${row.last_name},${row.phone_number},${row.email}, ${row.role}, ${row.position}, ${row.address}  ,${row.department}, ,${row.assistant}`
          )
          .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "data.csv";

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const sendEmail = () => {
    console.log("send email");
  };

  useEffect(() => {
    const fetchDept = async () => {
      // //*_________________________FETCH DEPARTMENT______________________//
      await Api.get("settings/get-department")
        .then((res) => {
          setDepartment(res.data.data);
          dispatch(setDepartmentList(res.data.data));
        })
        .catch((err) => {
          console.log(err);
        });
      // //*_________________________FETCH BRANCH______________________//
      await Api.get("settings/branch")
        .then((res) => {
          setBranch(res.data.data.branches);
          dispatch(setLocationList(res.data.data.branches));
        })
        .catch((err) => {
          console.log(err);
        });

      // //*_________________________FETCH POSITIONS______________________//
      await Api.get("settings/position")
        .then((res) => {
          setPosition(res.data.data);
          dispatch(setPositionList(res.data.data));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (department.length < 1) fetchDept();
  }, [data]);

  const topDropdownItems = [
    {
      title: "export to csv",
      func: exportToCSV,
      icon: <i className="fa-solid fa-file-export"></i>
    },
    {
      title: "send email",
      func: sendEmail,
      icon: <i class="fa-solid fa-envelope"></i>
    }
  ];

  if (loading && filteredStaff.length < 1) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error?.message} />;
  }

  return (
    <>
      <div className="p-4 ">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowRegModal(true)}
            className=" bg-lightblue hover:bg-blue text-white drop-shadow-md rounded-md p-2 flex justify-center items-center px-4 mt-2 mb-4"
          >
            Register Staff <i className="fa-solid fa-address-card ml-2"></i>
          </button>
          <Link
            to="/import-staff-csv"
            className="border block p-2 px-3 bg-lightblue rounded-md font-semibold text-white"
          >
            Import CSV File
          </Link>
          <TableActionDropdown itemsArr={topDropdownItems} />
        </div>

        <div className="p-4 bg-white m-2 drop-shadow-md rounded-md">
          <div className="flex items-center ml-2 mt-2 mb-5 ">
            <label htmlFor="">Show</label>
            <select className="mx-1 bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block cursor-pointer">
              {[50, 200, 500, 1000].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </div>
          {/* //?__________________________FILTER STAFF INPUT AREA__________________ */}
          <FilterStaffInputs
            department={department}
            staffList={staffList}
            branch={branch}
            setFilteredStaff={setFilteredStaff}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  justify-center p-2 bg-white rounded-md drop-shadow-sm mt-4">
          {filteredStaff.map((staff) => {
            return (
              <StaffCard
                refresh={refresh}
                setRefresh={setRefresh}
                staff={staff}
                key={staff._id}
              />
            );
          })}
        </div>

        <div className="md:flex justify-between text-dark gap-8">
          <p className="mb-4">
            Showing {currentPackageInView?.length} of {data?.staffs?.length} entries
          </p>
          <div className="items-center max-w-3xl overflow-x-scroll">
            <div className="w-full max-w-screen-sm md:min-w-[820px] flex gap-4 overflow-hidden">
              <Pagination
                rowsPerPage={rowsPerPage}
                totalPostLength={data?.staffs?.length}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
            {/* {["first", "previous", "next", "last"].map((btn) => (
              <p className="capitalize mx-2" key={btn}>
                {btn}
              </p>
            ))} */}
          </div>
        </div>

        <RegisterStaffModal
          refresh={refresh}
          setRefresh={setRefresh}
          showModal={showRegModal}
          setShowModal={setShowRegModal}
        />
      </div>
    </>
  );
};

export default Staff;

// //?________________________________________FILTER STAFF INPUTS AREA__________________________________// //
function FilterStaffInputs({
  staffList,
  setFilteredStaff,
  department,
  branch
}) {
  const positionList = useSelector(positionListArray);
  const [filterDetails, setFilterDetails] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("");
  const handleFilter = (e) => {
    if (filterDetails !== "") {
      const newFilteredStaff = staffList.filter((staff) => {
        return (
          staff.first_name
            .toLowerCase()
            .includes(filterDetails.toLowerCase()) ||
          staff.last_name.toLowerCase().includes(filterDetails.toLowerCase()) ||
          staff.email.toLowerCase().includes(filterDetails.toLowerCase()) ||
          staff.phone_number.toLowerCase().includes(filterDetails.toLowerCase())
        );
      });
      setFilteredStaff(newFilteredStaff);
    } else if (filterAvailability !== "") {
      const newFilteredStaff = staffList.filter((staff) => {
        return (
          staff.is_available.toString().toLowerCase() ==
          filterAvailability.toLowerCase()
        );
      });
      setFilteredStaff(newFilteredStaff);
    }
    if (filterDepartment !== "") {
      const newFilteredStaff = staffList.filter((staff) => {
        return staff.department.toLowerCase() == filterDepartment.toLowerCase();
      });
      setFilteredStaff(newFilteredStaff);
    }
    if (filterBranch !== "") {
      const newFilteredStaff = staffList.filter((staff) => {
        return staff.branch_code.toLowerCase() == filterBranch.toLowerCase();
      });
      setFilteredStaff(newFilteredStaff);
    }
    if (filterPosition !== "") {
      const newFilteredStaff = staffList.filter((staff) => {
        return staff.position.toLowerCase() == filterPosition.toLowerCase();
      });
      setFilteredStaff(newFilteredStaff);
    }
  };

  const handleClearFilter = () => {
    setFilteredStaff(staffList);
    setFilterDetails("");
    setFilterDepartment("");
    setFilterBranch("");
    setFilterPosition("");
    setFilterAvailability("");
  };

  return (
    <div>
      <div className="mb-6 grid grid-cols-3 border border-lightestblue rounded-md p-2 gap-4">
        <input
          type="text"
          value={filterDetails}
          onChange={(e) => setFilterDetails(e.target.value)}
          placeholder="Search Details..."
          className="p-2 outline-none w-full rounded-lg border border-lightblue text-lightblue"
        />

        <select
          name=""
          value={filterPosition}
          onChange={(e) => setFilterPosition(e.target.value)}
          className="p-2 outline-none rounded-lg border border-lightblue cursor-pointer text-lightblue"
        >
          <option hidden value="">
            Select Positions e.g Manager
          </option>
          {positionList.map((position) => {
            return (
              <option value={position.position} key={position.id}>
                {position.position}
              </option>
            );
          })}
        </select>

        <select
          name=""
          value={filterAvailability}
          onChange={(e) => setFilterAvailability(e.target.value)}
          className="p-2 outline-none rounded-lg border border-lightblue cursor-pointer text-lightblue"
        >
          <option hidden value="">
            Select Availability
          </option>
          <option value="true">In</option>
          <option value="false">Out</option>
        </select>

        <select
          name=""
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          className="p-2 outline-none rounded-lg border border-lightblue cursor-pointer text-lightblue"
        >
          <option hidden value="">
            Select Department e.g Software
          </option>
          {department.map((dept) => {
            return (
              <option value={dept.department} key={dept.id}>
                {dept.department}
              </option>
            );
          })}
        </select>

        <select
          name=""
          value={filterBranch}
          onChange={(e) => setFilterBranch(e.target.value)}
          className="p-2 outline-none rounded-lg border border-lightblue cursor-pointer text-lightblue"
        >
          <option hidden value="">
            Select Branch e.g HQ
          </option>
          {branch.map((brch) => {
            return (
              <option value={brch.branch_code} key={brch.id}>
                {brch.branch_name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="min-w-[150px] flex justify-between items-center gap-4">
        <button
          onClick={handleFilter}
          className="px-4 min-w-[150px] py-2 bg-lightblue font-semibold border-none outline-none block text-white rounded-md hover:bg-blue"
        >
          Filter
        </button>
        <button
          onClick={handleClearFilter}
          className="px-4 min-w-[150px] py-2 border hover:bg-light border-blue bg-white font-semibold outline-none block text-blue rounded-md"
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
}
