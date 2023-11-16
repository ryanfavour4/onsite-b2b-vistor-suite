import { useEffect, useState } from "react";
import CloseModalBtn from "./CloseModalBtn";
import Success from "../Success";
import { Api } from "../../axios";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";

const EditVisitorModal = ({ showModal, setShowModal, id }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [ApiPhoneNumber, setApiPhoneNumber] = useState(null);
  const [emailAddress, setEmailAddress] = useState("");
  const [address, setAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyStringName, setCompanyStringName] = useState("");
  const [userPurpose, setUserPurpose] = useState("");
  const [purpose, setPurpose] = useState([]);
  const [private_note, setPrivate_note] = useState("");
  const [staff, setStaff] = useState("");

  const [visitorPhoto, setVisitorPhoto] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);

  const purposeOptions = useFetch("settings/visit-purposes", [showModal]);

  const defaultFields = purposeOptions?.data?.data.defaultFields;
  const customFields = purposeOptions?.data?.data.customFields;

  const allFields = defaultFields?.concat(customFields);

  const enabledFields = allFields?.filter((item) => item.is_enabled === true);

  useEffect(() => {
    setPurpose(
      enabledFields?.map(({ id, visit_purpose_name }) => ({
        value: id,
        label: `${visit_purpose_name}`,
      }))
    );
  }, []);

  useEffect(() => {
    if (companyName) {
      const getCompany = async () => {
        const comp = await Api.get(`/settings/get-company`);
        setCompanyStringName(comp?.data.data.name);
      };
      getCompany();
    }
  }, [companyName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(`visitor/get/${id}`);
        const visitorData = response.data?.data;

        if (visitorData) {
          setName(visitorData.name);
          setPhoneNumber(visitorData.phone_number);
          setApiPhoneNumber(visitorData.phone_number);
          setEmailAddress(visitorData.email);
          setStaff(visitorData.staff);
          setAddress(visitorData.address);
          setCompanyName(visitorData.company);
          setUserPurpose(visitorData.purpose);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (showModal) {
      fetchData();
    }
  }, [showModal, id]);

  // ??=============== SUBMIT EDITED VISITOR ============= ?? //
  const handleSubmit = (e) => {
    e.preventDefault();
    const payLoad = {
      // id: id,
      company: companyStringName,
      private_note: private_note,
      email: emailAddress,
      purpose: userPurpose,
      phone_number: phoneNumber,
      name: name,
      staff: staff,
    };

    try {
      Api.post(`visitor/edit/visitor/${ApiPhoneNumber}`, payLoad)
        .then((res) => {
          toast.success(res.data.message);
          window.location.reload(false);
        })
        .catch((err) => {
          toast.error(err || "Error updating visitor");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${showModal ? "modal" : "hidden"} text-sm`}>
      {showSuccess ? (
        <Success
          message={"Visitor details updated successfully!"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
        />
      ) : (
        <form onSubmit={handleSubmit} className="relative modal--content">
          <CloseModalBtn setShowModal={setShowModal} />
          <div className="mb-3">
            <label htmlFor="name" className="font-semibold text-black ">
              Name
            </label>
            <input
              type="text"
              value={name}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter visitor name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="font-semibold text-black">
              Phone number
            </label>
            <div className="flex">
              <select className="mr-2 rounded-lg p-2 bg-transparent border-solid border-[1px] border-lightestblue focus:border-blue block">
                {["+234", "+212", "+27", "+251"].map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                value={phoneNumber}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="123 4567 89"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="emailAddress" className="font-semibold text-black">
              Email Address
            </label>
            <input
              type="email"
              value={emailAddress}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="Enter visitor email address"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="assistant" className="font-semibold text-black">
              Purpose
            </label>
            <select
              name=""
              id="assistant"
              defaultValue={userPurpose}
              value={userPurpose}
              onChange={(e) => setUserPurpose(e.target.value)}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
            >
              {purpose?.length &&
                purpose.map(({ value, label }) => (
                  <option value={label} key={value}>
                    {label}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="companyName" className="font-semibold text-black">
              Company name
            </label>
            <input
              type="text"
              value={companyName}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="font-semibold text-black">
              Address
            </label>
            <input
              type="text"
              value={address}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="privateNote" className="font-semibold text-black">
              Private note
            </label>
            <textarea
              name="privateNote"
              id="privateNote"
              value={private_note}
              onChange={(e) => setPrivate_note(e.target.value)}
              cols="4"
              rows="3"
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="privateNote" className="font-semibold text-black">
              Visitor photo
            </label>
            <input
              type="file"
              value={visitorPhoto}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setVisitorPhoto(e.target.value)}
              placeholder="upload visitor photo"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue mt-1 text-sm"
            onClick={handleSubmit}
          >
            Update Visitor details
          </button>
        </form>
      )}
    </div>
  );
};

export default EditVisitorModal;
