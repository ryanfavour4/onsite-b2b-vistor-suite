import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Api } from "../axios";
import SearchableDropdown from "./dropdowns/SearchableDropdown";

const DirectoryFields = ({
  title,
  label,
  type,
  required,
  enabled,
  value,
  fields,
  setFields,
  id,
}) => {
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [selectOptions, setSelectOptions] = useState([]);

  const index = fields.findIndex((field) => field.id === id);

  const [select, setSelect] = useState({});

  // console.log(title);

  useEffect(() => {
    if (title == "host") {
      (async () => {
        Api.get("settings/get-all-staffs")
          .then((res) => {
            const arr = res.data?.staffs?.map(({ id, first_name }) => ({
              value: id,
              label: first_name,
            }));
            setSelectOptions(arr);
          })
          .catch(() => console.log("error"))
          .finally(() => setLoadingOptions(false));
      })();
    } else if (title == "purpose_of_visit") {
      (async () => {
        Api.get("settings/visit-purposes")
          .then((res) => {
            console.log(res.data);
            const arr = res.data?.data?.map(({ id, visit_purpose_label }) => ({
              value: id,
              label: visit_purpose_label,
            }));
            setSelectOptions(arr);
          })
          .catch(() => console.log("error"))
          .finally(() => setLoadingOptions(false));
      })();
    } else if (title == "phone_number") {
      (async () => {
        Api.get("settings/country-codes")
          .then((res) => {
            // console.log(res.data)
            const arr = res.data?.codes?.map((id) => ({
              value: id,
              label: `+${id}`,
            }));
            setSelectOptions(arr);
            setSelect({ value: res.data.default, label: res.data.default });
          })
          .catch(() => console.log("error"))
          .finally(() => setLoadingOptions(false));
      })();
    }
  }, []);

  useEffect(() => {
    const fieldsCopy = [...fields];
    fieldsCopy[index].value = select.value;
    setFields(fieldsCopy);
  }, [select]);

  const handleOnChange = (e) => {
    // if (title == 'phone_number') {
    // if (!select) {
    //     console.log('somthing don duo')
    //     toast.error('Please select a country code')
    //     return
    // }
    // const fieldsCopy = [...fields]
    // fieldsCopy[index].value = `${select.value ? Number(select?.value.replace(/\s+/g, '')) : ''}${e.target.value}`
    // console.log(select.value)
    // fieldsCopy[index].value = e.target.value
    //     setFields(fieldsCopy)
    //     return
    // }

    const fieldsCopy = [...fields];
    fieldsCopy[index].value = e.target.value;
    setFields(fieldsCopy);
  };

  return (
    <>
      {enabled && (
        <div className="mb-3">
          <label htmlFor="name" className="font-semibold text-black ">
            {label}
            {required && <span className="text-darkred font-bold ml-2">*</span>}
          </label>
          {title == "private_note" ? (
            <textarea
              name="privateNote"
              id="privateNote"
              cols="4"
              rows="3"
              value={value}
              onChange={handleOnChange}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
            ></textarea>
          ) : type == "email\r\n" ? (
            <input
              type={"email"}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              value={value}
              onChange={handleOnChange}
            />
          ) : type == "file" ? (
            <>
              <input
                type="file"
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                // value={}
                onChange={(e) => {
                  // console.log(e.target.files[0])
                  const fieldsCopy = [...fields];
                  fieldsCopy[index].value = e.target.files[0];
                  setFields(fieldsCopy);
                }}
              />
            </>
          ) : title == "phone_number" ? (
            <div className="flex">
              <div className="w-max mr-2">
                <SearchableDropdown
                  loading={loadingOptions}
                  options={selectOptions}
                  selectedOption={select}
                  setSelectedOption={setSelect}
                  transparent={true}
                />
              </div>
              <input
                type="number"
                value={value}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={handleOnChange}
                placeholder="123 4567 89"
              />
            </div>
          ) : // <input type={'number'} className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"

          // />
          [
              "text",
              "number",
              "date",
              "checkbox",
              "file",
              "time",
              "email",
            ].includes(type) ? (
            <input
              type={type}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              value={value}
              onChange={handleOnChange}
            />
          ) : type === "select" ? (
            title === "host" ? (
              <SearchableDropdown
                options={selectOptions}
                loading={loadingOptions}
                selectedOption={select}
                setSelectedOption={setSelect}
                transparent={true}
              />
            ) : title === "purpose_of_visit" ? (
              <SearchableDropdown
                options={selectOptions}
                loading={loadingOptions}
                selectedOption={select}
                setSelectedOption={setSelect}
                transparent={true}
              />
            ) : (
              <input
                type={"text"}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                value={value}
                onChange={handleOnChange}
              />
            )
          ) : (
            <p>end</p>
          )}
        </div>
      )}
    </>
  );
};

export default DirectoryFields;
