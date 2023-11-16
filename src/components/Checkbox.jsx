import { useEffect } from "react";
import { useState } from "react";

const Checkbox = ({ allChecked, setAllChecked }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(allChecked)
  }, [allChecked]);

  useEffect(() => {
    if (!checked) {
      setAllChecked(false);
    }
  }, [checked]);

  return (
    <input
      type="checkbox"
      className="cursor-pointer"
      checked={checked}
      onClick={() => {
        setChecked(!checked);
      }}
    />
  );
};

export default Checkbox;
