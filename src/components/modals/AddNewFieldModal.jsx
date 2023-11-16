import { useState } from "react";
import CloseModalBtn from "./CloseModalBtn";
import Success from "../Success";
import { addVisitorField } from "../../services/settings/general";
import { toast } from "react-toastify";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import SearchableDropdown from "../dropdowns/SearchableDropdown";
import ButtonSpinner from "../ButtonSpinner";

const AddNewFieldModal = ({ showModal, setShowModal, refresh, setRefresh }) => {
  const [fieldName, setFieldName] = useState("");
  const [fieldLabel, setFieldLabel] = useState("");
  const [fieldType, setFieldType] = useState();
  const [active, setActive] = useState(false);
  const [compulsory, setCompulsory] = useState(false);
  const [options, setOptions] = useState([[]]);

  const handleAdd = () => {
    const neww = [...options, []];
    setOptions(neww);
  };
  const handleChange = (onChangeValue, i) => {
    const inputData = [...options];
    inputData[i] = onChangeValue.target.value;
    setOptions(inputData);
  };
  const handleDelete = (i) => {
    const optionToDelete = [...options];
    optionToDelete.splice(i, 1);
    setOptions(optionToDelete);
  };


  const [showSuccess, setShowSuccess] = useState(false);

  const [fieldTypes, setFieldTypes] = useState([])

  const [submitting, setSubmitting] = useState(false)

  const fieldTypeOptions = useFetch('settings/field-type', [showModal])

  useEffect(() => {
    console.log(fieldTypeOptions.data, 'field types dataaa')
    const allFields = (fieldTypeOptions?.data?.fieldTypes?.map(
      ({ id, name }) => ({ value: id, label: name }
      )) || [])
    setFieldTypes([...allFields])

  }, [fieldTypeOptions.data,])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    addVisitorField(
      {
        field_name: fieldName,
        field_label: fieldLabel,
        field_type: fieldType.value,
        is_required: compulsory,
        is_enabled: active,
        visit_type: "client",
        options
      }
    )
      .then(() => {
        setShowSuccess(true)
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setSubmitting(false));
  };

  return (
    <div
      className={`${showModal ? "modal" : "hidden"} text-sm`}
    >
      {showSuccess ? (
        <Success
          message={"Field added successfully!"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ) : (
        <form onSubmit={handleSubmit} className="relative modal--content">
          <CloseModalBtn setShowModal={setShowModal} />
          <div className="mb-3">
            <label htmlFor="fieldName" className="font-semibold text-black ">
              Field name
            </label>
            <input
              type="text"
              value={fieldName}
              id="fieldName"
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setFieldName(e.target.value)}
              placeholder="Enter field name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="fieldLabel" className="font-semibold text-black">
              Field label
            </label>
            <input
              type="text"
              id="fieldLabel"
              value={fieldLabel}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setFieldLabel(e.target.value)}
              placeholder="Enter field label"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="status" className="font-semibold text-black">
              Field type
            </label>
            <SearchableDropdown
              loading={fieldTypeOptions.loading}
              options={fieldTypes}
              selectedOption={fieldType}
              setSelectedOption={setFieldType}
            />
          </div>

          <>
            {
              fieldType?.label?.toLowerCase() == 'select' ? (
                <div className="mb-3">
                  <p className="font-semibold text-black  mb-1">
                    options
                  </p>
                  {options.map((option, index) => (
                    <div className="mb-3">
                      <label htmlFor="name" className="font-semibold text-xs text-black">
                        option {index + 1}
                      </label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={option}
                          className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block flex-1"
                          onChange={(e) => {
                            handleChange(e, index);
                          }}
                          placeholder="Enter option"
                        />
                        {options.length - 1 == index ? (
                          <button
                            className="rounded-[50%] p-2 px-3 text-white bg-green ml-2"
                            type="button"
                            onClick={() => handleAdd()}
                          >
                            <i class="fa-solid fa-plus"></i>
                          </button>
                        ) : (
                          <button
                            className="rounded-[50%] p-2 px-3 text-white bg-darkred ml-2"
                            type="button"
                            onClick={() => {
                              handleDelete(index);
                            }}
                          >
                            <i class="fa-solid fa-xmark"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  ))} </div>
              ) : (fieldType?.label?.toLowerCase() == 'checkbox' && options.map((option, index) => {
                return <div className="mb-3">
                  <label htmlFor="name" className="font-semibold text-xs text-black">
                    option {index + 1}
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={option}
                      className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block flex-1"
                      onChange={(e) => {
                        handleChange(e, index);
                      }}
                      placeholder="Enter option"
                    />
                    {options.length - 1 == index ? (
                      <button
                        className="rounded-[50%] p-2 px-3 text-white bg-green ml-2"
                        type="button"
                        onClick={() => handleAdd()}
                      >
                        <i class="fa-solid fa-plus"></i>
                      </button>
                    ) : (
                      <button
                        className="rounded-[50%] p-2 px-3 text-white bg-darkred ml-2"
                        type="button"
                        onClick={() => {
                          handleDelete(index);
                        }}
                      >
                        <i class="fa-solid fa-xmark"></i>
                      </button>
                    )}
                  </div>
                </div>
              }))
            }
          </>

          <div className="mb-3">
            <label htmlFor="compulsory" className="font-semibold text-black items-center flex">
              <input type={'checkbox'} value={compulsory} onChange={(e) => { setCompulsory(e.target.checked) }} className={'h-4 w-4'} id="compulsory" />

              <span className="ml-2">
                compulsory
              </span>
            </label>
          </div>

          <div className="mb-3">
            <label htmlFor="active" className="font-semibold text-black items-center flex">
              <input type={'checkbox'} value={active} onChange={(e) => { setActive(e.target.checked) }} className={'h-4 w-4'} id="active" />
              <span className="ml-2">
                active
              </span>
            </label>
          </div>

          {submitting ? (
            <ButtonSpinner />
          ) : (
            <button
              type="submit"
              className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue mt-1 text-sm"
              onClick={handleSubmit}
            >
              Add field
            </button>
          )}


        </form>


      )
      }
    </div >
  );
};

export default AddNewFieldModal;
