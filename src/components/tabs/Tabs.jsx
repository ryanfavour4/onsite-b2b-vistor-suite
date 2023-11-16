import { useState } from "react";

const Tabs = ({ tabTitles, tabContents }) => {
  const [currIndex, setCurrIndex] = useState(0);

  return (
    <div className="p-2 ">
      <div className="flex border-solid border-blue border-b-[1px] mb-2">
        {tabTitles?.map((title, index) => (
          <button
            key={index}
            onClick={() => setCurrIndex(index)}
            className={`outline-none p-2 text-lightblue font-semibold ${
              currIndex == index
                ? "border-b-2 border-blue border-solid text-blue"
                : "border-none"
            } capitalize mr-4`}
          >
            {title}
          </button>
        ))}
      </div>
      <div className="bg-white p-4">{tabContents[currIndex]}</div>
    </div>
  );
};

export default Tabs;
