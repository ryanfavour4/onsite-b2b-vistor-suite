import { useState } from "react";
import { getDateFromTimestamp } from "../../utils/formatDate";
import getTableHeading from "../../utils/getTableHeading";
import Checkbox from "../Checkbox";
import ActionColDropdown from "../dropdowns/ActionColDropdown";
import SearchableDropdown from "../dropdowns/SearchableDropdown";
import TableActionDropdown from "../dropdowns/TableActionDropdown";
import StatusCol from "../StatusCol";
import Pagination from "../layouts/Pagination";

const EventTable = ({
  data,
  headings,
  fieldsKeys,
  filterItems,
  extraFilterComponents,
  topDropdownItems,
  actionColDropdownItems,
  displayFilters,
  setDisplayFilters,
  title,
  filterTitle,
  children,
  tableTitle,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allChecked, setAllChecked] = useState(false);

  const [newList, setNewList] = useState(data);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const lastRowsIndex = currentPage * rowsPerPage;
  const firstRowsIndex = lastRowsIndex - rowsPerPage;
  let currentPackageInView =
    newList && newList?.slice(firstRowsIndex, lastRowsIndex);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (searchTerm.trim().length < 2) {
      setNewList(data);
      filterReturn(currentPackageInView);
    }
    if (searchTerm.trim().length > 1) {
      const arr = data.filter((item) => {
        return item.event_name.toLowerCase().includes(searchTerm);
      });
      filterReturn(arr);
      setNewList(arr);
    }
  };

  const filterReturn = (result = []) => {
    return result.length > 1 ? result : currentPackageInView;
  };

  return (
    <div className=" overflow-x-scroll">
      <div className="flex justify-between my-4">
        <h2 className="text-black text-2xl m-2">{title}</h2>
        {children}
        {topDropdownItems && (
          <TableActionDropdown itemsArr={topDropdownItems} />
        )}
      </div>

      <div className="bg-white shadow-lg rounded-md p-1.5 sm:p-3 w-full min-w-max">
        <div className="flex justify-between">
          <div className="flex items-center ml-2 my-1 ">
            <label htmlFor="">Show</label>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(e.target.value)}
              className="mx-1 bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block cursor-pointer"
            >
              {[10, 50, 200, 500, 1000].map((value) => (
                <option>{value}</option>
              ))}
            </select>
            <label htmlFor="">entries</label>
          </div>
          <div className="flex items-center ml-2 my-1 ">
            <label htmlFor="">Search</label>
            <input
              value={searchTerm}
              onChange={(e) => handleSearch(e)}
              className="mx-1 bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block"
            />
          </div>
        </div>

        {tableTitle && <h4 className="capitalize text-lg">{tableTitle}</h4>}
        <table className="table-auto w-full min-w-max my-4 mx-auto">
          <thead className=" text-white  text-xs">
            <tr className="bg-black ">
              <th key={"check"} className=" p-3 py-5">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  onClick={() => setAllChecked(!allChecked)}
                  checked={allChecked}
                />
              </th>
              {headings.map((header) => (
                <th key={header} className="uppercase  p-3 py-5 font-semibold">
                  {/* {getTableHeading(header)} */}
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm w-max text-dark">
            {filterReturn(currentPackageInView)?.map((row, index) => {
              return (
                <tr key={index} className="w-max">
                  <td className="text-center border-r-0 border-t-0 border-2 border-solid border-light w-full flex h-[52px] justify-center items-center ">
                    <Checkbox
                      allChecked={allChecked}
                      setAllChecked={setAllChecked}
                    />
                  </td>
                  {fieldsKeys.map((entry) => {
                    return (
                      <td
                        className="text-center p-1 border-2 border-solid border-light min-w-max"
                        key={entry}
                      >
                        {typeof row[entry] != "boolean" ? (
                          <>
                            {entry === "action" ? (
                              <ActionColDropdown
                                itemsArr={
                                  row["is_default"]
                                    ? actionColDropdownItems.filter(
                                        (item) => !item.title.includes("delete")
                                      )
                                    : actionColDropdownItems
                                }
                                rowData={row}
                              />
                            ) : entry == "amount" ? (
                              <>${row[entry]}</>
                            ) : entry == "plan" ? (
                              <>
                                {row[entry] == 2
                                  ? "Basic"
                                  : row[entry] == 4
                                  ? "Free"
                                  : row[entry] == 3
                                  ? "Basic2"
                                  : row[entry] == 5
                                  ? "Premium"
                                  : "Enterprise"}
                              </>
                            ) : entry == "period" ? (
                              <>
                                {row[entry] == "month" ? "Monthly" : "Annually"}
                              </>
                            ) : (
                              <>
                                {entry.includes("date") ? (
                                  <>{getDateFromTimestamp(row[entry])}</>
                                ) : (
                                  <>{row[entry]}</>
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          <>{JSON.stringify(row[entry])}</>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="md:flex justify-between text-dark gap-8">
          <p className="mb-4">
            Showing {currentPackageInView?.length} of {newList?.length} entries
          </p>
          <div className="items-center max-w-3xl overflow-x-scroll">
            <div className="w-full max-w-screen-sm md:min-w-[820px] flex gap-4 overflow-hidden">
              <Pagination
                rowsPerPage={rowsPerPage}
                totalPostLength={newList?.length}
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
      </div>
    </div>
  );
};

export default EventTable;
