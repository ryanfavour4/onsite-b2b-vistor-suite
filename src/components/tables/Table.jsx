import { useEffect, useState } from "react";
import { formatDate, formatTime, getDateFromTimestamp } from "../../utils/formatDate";
import getTableHeading from "../../utils/getTableHeading";
import Checkbox from "../Checkbox";
import ActionColDropdown from "../dropdowns/ActionColDropdown";
import SearchableDropdown from "../dropdowns/SearchableDropdown";
import TableActionDropdown from "../dropdowns/TableActionDropdown";
import StatusCol from "../StatusCol";
import Pagination from "../layouts/Pagination";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

const Table = ({
  data,
  headings,
  fieldsKeys,
  filterItems,
  filterComp,
  extraFilterComponents,
  topDropdownItems,
  actionColDropdownItems,
  displayFilters,
  setDisplayFilters,
  title,
  filterTitle,
  children,
  tableTitle,
  importLink,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allChecked, setAllChecked] = useState(false);

  const [newList, setNewList] = useState(data);

  useEffect(() => {
    setNewList(data);
  }, [data]);

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
        console.log(item);
        return item?.name?.toLowerCase().includes(searchTerm) || item?.visit_purpose_name?.toLowerCase().includes(searchTerm) || item?.first_name?.toLowerCase().includes(searchTerm) || item?.department?.toLowerCase().includes(searchTerm);
      });
      filterReturn(arr);
      setNewList(arr);
    }
  };

  const filterReturn = (result = []) => {
    return result.length > 1 ? result : currentPackageInView;
  };

  TimeAgo.addDefaultLocale(en);
  TimeAgo.addLocale(ru);

  return (
    <div className=" overflow-x-scroll">
      <div className="flex justify-between my-4">
        <h2 className="text-black text-2xl m-2">{title}</h2>
        {children}
        {topDropdownItems && (
          <div className="flex gap-4 items-center">
            {importLink}
            <TableActionDropdown itemsArr={topDropdownItems} />
          </div>
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
        {filterComp && <div className="mt-2 pt-6 border-t-2">{filterComp}</div>}
        {filterItems && (
          <>
            <button
              className="uppercase text-lightblue border-none outline-none underline mb-2 p-2"
              onClick={() => setDisplayFilters(!displayFilters)}
            >
              {!displayFilters
                ? "display search parameters"
                : "hide search parameters"}
            </button>
            {displayFilters && (
              <div className="mb-6 ">
                <h3 className="text-dark font-semibold text-xl mx-2">
                  Filter {filterTitle}
                </h3>
                <div className="flex flex-wrap mt-2">
                  {filterItems.map(
                    ({ searchState, stateModifier, title, options }) => (
                      <div
                        className="w-1/5 min-w-[150px] mx-2 mb-2"
                        key={options}
                      >
                        <p className="capitalize font-normal text-dark">
                          {title}
                        </p>
                        <SearchableDropdown
                          options={options}
                          selectedOption={searchState}
                          setSelectedOption={stateModifier}
                        />
                      </div>
                    )
                  )}
                  {extraFilterComponents}
                </div>

                <div className="flex items-center my-4s justify-between">
                  <button className="px-4 py-2 bg-lightblue font-semibold border-none outline-none block w-[20%] text-white rounded-md hover:bg-blue mr-4">
                    Search
                  </button>
                  <div className="flex flex-col w-max  ">
                    <span className="mr-1">Search:</span>
                    <input
                      type="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="p-1 sm:p-2 px-3 bg-transparent rounded-md border border-light border-solid outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

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
              {headings?.map((header) => (
                <th key={header} className="uppercase  p-3 py-5 font-semibold">
                  {/* {getTableHeading(header)} */}
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm w-max text-dark relative">
            {data === "Free Plan" ? (<div className="absolute bg-white text-center text-lg font-semibold h-70 w-full py-8 text-darkred">
              Sorry Your Current Plan Is Not Enough To View This Page. Please Upgrade to A Higher Plan
            </div>) : data &&
            filterReturn(currentPackageInView)?.map((row, index) => {
              return (
                <tr key={index} className="w-max">
                  <td className="text-center border-r-0 border-t-0 border-2 border-solid border-light w-full flex h-[52px] justify-center items-center ">
                    <Checkbox
                      allChecked={allChecked}
                      setAllChecked={setAllChecked}
                    />
                  </td>
                  {data === "Free Plan" ? null : fieldsKeys.map((entry) => {
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
                                      (item) =>
                                        !item.title.includes("delete")
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
                                        : row[entry]}
                              </>
                            ) : entry == "period" ? (
                              <>
                                {row[entry] == "month"
                                  ? "Monthly"
                                  : "Annually"}
                              </>
                            ) : (
                              <>
                                {entry.includes("last_seen") ? (
                                  <ReactTimeAgo
                                    date={row[entry]}
                                    locale="en-US"
                                  />
                                ) : entry.includes("date") ? (
                                  <>
                                    <>{formatDate(row[entry])}</>
                                    {" "}
                                    <>{formatTime(row[entry])}</>
                                  </>
                                ) : entry.includes("createdAt") ? (
                                  <>
                                    <>{formatDate(row[entry])}</>
                                    {" "}
                                    <>{formatTime(row[entry])}</>
                                  </>
                                ) : (
                                  <>{row[entry]}</>
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {JSON.stringify(row[entry]) == "true"
                              ? "Active"
                              : JSON.stringify(row[entry]) == "false"
                                ? "Inactive"
                                : JSON.stringify(row[entry])}
                          </>
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
                currentPackageInView={currentPackageInView}
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

export default Table;
