import { useRef, useState } from "react";
import useOutsideListener from "../../hooks/useOutsideListener";

const ActionColDropdown = ({ itemsArr, rowData }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null)

  useOutsideListener(wrapperRef, () => setShowDropdown(false))

  return (
    <div className="w-max relative shadow-sm min-w-max mx-auto" ref={wrapperRef}>
      <button
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
        key={"select"}
        className={`w-full p-2.5 px-4 rounded-sm relative flex justify-between items-center uppercase bg-black text-white`}
      >
        <span className="mx-1 text-xs">ACTIONS</span>
        {!showDropdown ? (
          <i className="fa-solid fa-chevron-down"></i>
        ) : (
          <i className="fa-solid fa-chevron-up"></i>
        )}
      </button>

      <div
        className={`min-w-max w-max absolute top-[39px] drop-shadow-lg right-0 left-0 rounded-md border  border-light ${showDropdown ? "block" : "hidden"
          } bg-white p-1 shadow-md z-10 `}
      >
        {itemsArr.map(({ title, func }, index) => (
          <button
            onClick={() => func(rowData)}
            // onClick={() => console.log('row dataaa',rowData)}
            key={title}
            className={`block min-w-max w-full p-2 border-solid border-light ${index !== itemsArr.length - 1 ? 'border-b-[1px]' : 'border-b-0'} capitalize text-[14px] hover:font-semibold text-dark flex items-center text-xs text-center`}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionColDropdown;
