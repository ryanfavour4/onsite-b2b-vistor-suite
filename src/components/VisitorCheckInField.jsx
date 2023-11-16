import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Api } from "../axios";
import SearchableDropdown from "./dropdowns/SearchableDropdown";

const VisitorCheckInField = ({
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
  // GET User Current FROM LOCAL STORAGE
  const user = JSON.parse(localStorage.getItem("User Current"));
  // console.log(title, label);
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Check if the selected file is an image and has a valid extension
    if (file && /\.(jpg|jpeg|png)$/i.test(file.name)) {
      // Continue handling the valid image here
      const fieldsCopy = [...fields];
      fieldsCopy[index].value = file;
      setFields(fieldsCopy);
    } else {
      toast.error(
        "Invalid image format. Please select a JPG, JPEG, or PNG image."
      );
    }
  };

  useEffect(() => {
    if (title == "host") {
      (async () => {
        Api.get("settings/get-all-staffs")
          .then((res) => {
            const arr = res.data?.staffs
              ?.filter((item) => {
                return item.is_available === true;
              })
              .map(({ id, first_name, last_name }) => ({
                value: id,
                label: `${first_name} ${last_name}`,
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
            const defaultFields = res?.data?.data.defaultFields;
            const customFields = res?.data?.data.customFields;

            const allFields = defaultFields?.concat(customFields);

            const enabledFields = allFields?.filter(
              (item) => item.is_enabled === true
            );
            const arr = enabledFields
              ?.filter((item) => {
                return item.is_enabled === true;
              })
              .map(({ id, visit_purpose_name }) => ({
                value: id,
                label: visit_purpose_name,
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
            const arr = res.data?.codes?.map((id) => ({
              value: id,
              label: `+${id}`,
            }));
            setSelectOptions(arr);
            // TODO:: GET DATA FROM USER API GO TO COUNTRY CODE AND COPY DUMPED IT HERE  
            setSelect({
              value: user.user?.country_info?.country_code,
              label: `+${user.user?.country_info?.country_code}`,
            });
            // setSelect({ value: res.data.default, label: res.data.default });
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
        !["private_note", "visitor_photo"].includes(title) &&
        <div className="mb-3">
          <label htmlFor="name" className="font-semibold text-black">
            {label == "Private Note" || label == "visitor_photo" ? "" : label}
            {required && <span className="text-darkred font-bold ml-2">*</span>}
          </label>
          {type == "email\r\n" ? (
            <input
              type={"email"}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              value={value}
              onChange={handleOnChange}
            />
          ) : type == "file" ? (

            (label !== "visitor_photo" &&
              <input
                type="file"
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => {
                  const fieldsCopy = [...fields];
                  fieldsCopy[index].value = e.target.files[0];
                  setFields(fieldsCopy);
                }}
              />)
          ) : type === "checkbox" ? (
            <SearchableDropdown
              options={selectOptions}
              // options={}
              loading={loadingOptions}
              selectedOption={select}
              setSelectedOption={setSelect}
              transparent={true}
            />
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
                // value={value}
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

export default VisitorCheckInField;
