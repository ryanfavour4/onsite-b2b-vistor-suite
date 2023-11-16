import { useLayoutEffect } from "react";
import { useRef, useState } from "react";
import useOutsideListener from "../../hooks/useOutsideListener";

const SearchableDropdown = ({
  options,
  selectedOption,
  setSelectedOption,
  transparent,
  loading,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [matchedOptions, setMatchedOptions] = useState(options);
  const searchRef = useRef(null);
  const wrapperRef = useRef(null);

  useOutsideListener(wrapperRef, () => setShowDropdown(false));

  useLayoutEffect(() => {
    if (options?.length > 0) {
      setMatchedOptions(options);
    }
  }, [options]);

  return (
    <div
      className={`border border-light w-full relative ${
        transparent ? "bg-transparent" : "bg-white"
      } shadow-sm rounded-md max-h-[50vh] `}
      ref={wrapperRef}
    >
      <button
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
        key={"selectt"}
        className=" w-full min-w-full p-3 rounded-md relative shadow-md flex justify-between items-center "
        type="button"
      >
        {selectedOption?.label == undefined ? (
          <>
            {" "}
            Select option{" "}
            {!showDropdown && <i className="fa-solid fa-chevron-down"></i>}{" "}
          </>
        ) : (
          <>
            {" "}
            {selectedOption.label}
            {!showDropdown && <i className="fa-solid fa-chevron-down"></i>}{" "}
          </>
        )}
        {showDropdown && <i className="fa-solid fa-chevron-up"></i>}
      </button>

      <div
        className={`w-full absolute  top-[49px] right-0 left-0 border border-t-0  border-light ${
          showDropdown ? "block" : "hidden"
        } bg-white p-1 shadow-md z-[999] `}
      >
        <input
          type="search"
          ref={searchRef}
          onChange={(e) => {
            // console.log(searchRef.current.value, options.filter((eachOption) => eachOption.label.toLowerCase().includes(searchRef.current.value.toLowerCase())))
            setMatchedOptions(
              options.filter((eachOption) =>
                eachOption.label
                  .toLowerCase()
                  .includes(searchRef.current.value.toLowerCase())
              )
            );
          }}
          className="border-[0.5px] block outline-none border-light  w-full rounded-md p-1"
        />

        {loading ? (
          <div className="flex justify-center items-center h-10 bg-lightest">
            <svg
              aria-hidden="true"
              class="ml-4 w-5 h-5 text-lightest animate-spin fill-blue"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          <div className="max-h-[50vh] overflow-scroll rounded-md">
            {matchedOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedOption(option);
                  setShowDropdown(false);
                }}
                className={`block w-full p-2 border-solid border-light ${
                  index !== matchedOptions.length - 1
                    ? "border-b-[1px]"
                    : "border-b-0"
                } text-[14px] text-left`}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchableDropdown;
