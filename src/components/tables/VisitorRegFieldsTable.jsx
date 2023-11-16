import { useState } from "react";
import getTableHeading from "../../utils/getTableHeading";
import Checkbox from "../Checkbox";
import ActionColDropdown from "../dropdowns/ActionColDropdown";
import SearchableDropdown from "../dropdowns/SearchableDropdown";
import TableActionDropdown from "../dropdowns/TableActionDropdown";
import StatusCol from "../StatusCol";

const VisitorRegTable = ({
  data,
  headings,
  fieldsKeys,
  statusKeys,
  filterItems,
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
        <div className="flex items-center ml-2 my-1 ">
          <label htmlFor="">Show</label>
          <select className="mx-1 bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block cursor-pointer">
            {[50, 200, 500, 1000].map((value) => (
              <option>{value}</option>
            ))}
          </select>
          <label htmlFor="">entries</label>
        </div>

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
              {headings.map((header) => (
                <th key={header} className="uppercase  p-3 py-5 font-semibold">
                  {getTableHeading(header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm w-max text-dark">
            {data.map((row, index) => {
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
                        {typeof row[entry] != 'boolean' ? (
                          <>
                            {entry == "status" ? (
                              <StatusCol keys={statusKeys} row={row} />
                            ) : (
                              <>
                                {entry === "action" ? (
                                  <ActionColDropdown
                                    itemsArr={row['is_default'] || row['is_company_default'] ?
                                      [actionColDropdownItems[0]]
                                      :
                                      actionColDropdownItems
                                    }
                                    rowData={row}
                                  />
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

        <div className="flex justify-between text-dark">
          <p>Showing 0 to 0 entries</p>
          <div className="flex">
            {["first", "previous", "next", "last"].map((btn) => (
              <p className="capitalize mx-2" key={btn}>
                {btn}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorRegTable;
