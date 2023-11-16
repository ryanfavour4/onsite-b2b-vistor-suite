import { useRef, useState } from "react";
import useOutsideListener from "../../hooks/useOutsideListener";

const TableActionDropdown = ({ itemsArr }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const wrapperRef = useRef(null)

  useOutsideListener(wrapperRef, () => setShowDropdown(false))

  return (
    <div className="w-40 relative drop-shadow-lg rounded-2xl min-w-min z-10" ref={wrapperRef}>
      <button
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
        key={"select"}
        className={`w-full p-2.5 px-4 rounded-2xl relative shadow-md flex justify-between items-center uppercase bg-darkred text-white`}
      >
        <span className="mx-1">ACTIONS</span>
        {!showDropdown ? (
          <i className="fa-solid fa-chevron-down"></i>
        ) : (
          <i className="fa-solid fa-chevron-up"></i>
        )}
      </button>

      <div
        className={`w-40 absolute top-[46px] shadow-md right-0 left-0 rounded-md border border-t-0 border-light ${showDropdown ? "block" : "hidden"
          } bg-white p-1.2 shadow-md z-40 `}
      >
        {itemsArr.map(({ title, func, icon }, index) => (
          <button
            onClick={() => func()}
            key={title}
            className={`block min-w-max w-full p-2 border-solid border-light ${index !== itemsArr.length - 1 ? 'border-b-[1px]' : 'border-b-0'} capitalize text-[14px] hover:font-semibold text-dark flex items-center`}
          >
            {icon}<span className="mx-2">{title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TableActionDropdown;
