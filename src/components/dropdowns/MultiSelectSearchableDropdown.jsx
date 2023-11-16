import { useRef, useState } from "react";
import useOutsideListener from "../../hooks/useOutsideListener";

const MultiSelectSearchableDropdown = ({
  options,
  selectedOptions,
  setSelectedOptions,
  transparent,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [matchedOptions, setMatchedOptions] = useState(options);
  const searchRef = useRef(null);
  const wrapperRef = useRef(null);

  useOutsideListener(wrapperRef, () => setShowDropdown(false));

  const handleSelect = (title, id) => {
    const selectedOption = selectedOptions.find((option) => option.id == id);
    if (selectedOption) {
      setSelectedOptions(
        selectedOptions.filter((option) => {
          return option.id !== id;
        })
      );
    } else {
      setSelectedOptions([...selectedOptions, { title, id }]);
    }
    setShowDropdown(false);
  };

  return (
    <div
      className={`border border-light w-full relative ${
        transparent ? "bg-transparent" : "bg-white"
      } shadow-sm rounded-md `}
      ref={wrapperRef}
    >
      <button
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
        key={"selectt"}
        className=" w-full min-w-full p-3 rounded-md relative shadow-md flex items-center justify-between capitalize"
        type="button"
      >
        {selectedOptions.length == 0 ? (
          <>
            <span className="">select option</span>
            {!showDropdown && <i className="fa-solid fa-chevron-down"></i>}{" "}
          </>
        ) : (
          <>
            <div>
              {selectedOptions.map(({ title, id }) => (
                <span className="p-1 m-0.5 rounded-md bg-lightest w-max">
                  {title}
                </span>
              ))}
            </div>
            {!showDropdown && <i className="fa-solid fa-chevron-down"></i>}
          </>
        )}
        {showDropdown && <i className="fa-solid fa-chevron-up"></i>}
      </button>

      <div
        className={`w-full absolute  top-[49px] right-0 left-0 border border-t-0  border-light ${
          showDropdown ? "block" : "hidden"
        } bg-white p-1 shadow-md z-30`}
      >
        <input
          type="search"
          ref={searchRef}
          onChange={(e) => {
            setMatchedOptions(
              options.filter((eachOption) =>
                eachOption.includes(searchRef.current.value)
              )
            );
          }}
          className="border-[0.5px] block outline-none border-light  w-full rounded-md p-1"
        />

        {matchedOptions.map(({ title, id }, index) => (
          <button
            onClick={() => handleSelect(title, id)}
            key={id}
            className={`block w-full p-2 border-solid border-light ${
              index !== matchedOptions.length - 1
                ? "border-b-[1px]"
                : "border-b-0"
            } capitalize text-[14px] text-left flex justify-between`}
            type="button"
          >
            <span>{title}</span>
            {selectedOptions.find((option) => option.id == id) && (
              <i class="fa-solid fa-circle-check text-sm text-green"></i>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectSearchableDropdown;
