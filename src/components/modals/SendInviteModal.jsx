import { useEffect, useState } from "react";
import Required from "../Required";
import SearchableDropdown from "../dropdowns/SearchableDropdown";
import CloseModalBtn from "./CloseModalBtn";
import ButtonSpinner from "../ButtonSpinner";
import { toast } from "react-toastify";
import { Api } from "../../axios";
import useFetch from "../../hooks/useFetch";
import { scheduleInvite } from "../../services/visitor";
import Success from "../Success";
import { formatDate } from "../../utils/formatDate";

const SendInviteModal = ({ showModal, setShowModal, refresh, setRefresh }) => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState({
    label: "+234",
    value: "+234",
  });
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

  const [purpose, setPurpose] = useState({});
  const [host, setHost] = useState({});

  const [hosts, setHosts] = useState([]);
  const [purposes, setPurposes] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      if (formatDate(new Date()) > formatDate(new Date(date))) {
        toast.warn("Date must be in the future");
        return;
      } else {
        await scheduleInvite({
          // invitedBy: host.value,
          first_name: fName,
          last_name: lName,
          email,
          purpose: purpose.label,
          date,
          host: host.value,
          time: Number(time.replace(":", "")),
          duration: Number(duration),
          // `${countryCode.value}${phoneNumber}`
          phoneNumber,
        });
      }
      setShowSuccess(true);
    } catch (error) {
      toast.error(error || error.message || error.data.message);
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const hostOptions = useFetch("settings/branch-staffs", [showModal]);
  const purposeOfVisitOptions = useFetch("/settings/visit-purposes", [showModal]);
  const countryCodeOptions = useFetch("settings/country-codes", [showModal]);

  // console.log(purposeOfVisitOptions);

  const defaultFields = purposeOfVisitOptions?.data?.data.defaultFields;
  const customFields = purposeOfVisitOptions?.data?.data.customFields;

  const allFields = defaultFields?.concat(customFields);

  const enabledFields = allFields?.filter((item) => item.is_enabled === true);

  useEffect(() => {
    setHosts(
      hostOptions.data?.staffs?.map(({ id, first_name, last_name }) => ({
        value: id,
        label: `${first_name} ${last_name}`,
      }))
    );
  }, [hostOptions.data]);

  useEffect(() => {
    setPurposes(
      enabledFields?.map(({ id, visit_purpose_label }) => ({
        value: id,
        label: visit_purpose_label,
      }))
    );
  }, [enabledFields]);

  useEffect(() => {
    setCountryCodes(
      countryCodeOptions.data?.codes.map((id) => ({
        value: id,
        label: `+${id}`,
      }))
    );
  }, [countryCodeOptions.data]);

  return (
    <div className={`${showModal ? "modal" : "hidden"}`}>
      {showSuccess ? (
        <Success
          message={"Invite sent successfully!"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ) : (
        <form onSubmit={handleSubmit} className="relative modal--content">
          <CloseModalBtn setShowModal={setShowModal} />

          <div className="mb-4">
            <label htmlFor="fname" className="font-semibold text-black">
              First Name
              <Required />
            </label>
            <input
              type="text"
              value={fName}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setFName(e.target.value)}
              placeholder="Enter your First name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lname" className="font-semibold text-black">
              LastName
              <Required />
            </label>
            <input
              type="text"
              value={lName}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setLName(e.target.value)}
              placeholder="Enter your Last name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="font-semibold text-black">
              Phone number
              <Required />
            </label>
            <div className="flex">
              <div className="w-max mr-2">
                <SearchableDropdown
                  loading={countryCodeOptions.loading}
                  options={countryCodes}
                  selectedOption={countryCode}
                  setSelectedOption={setCountryCode}
                  transparent={true}
                />
              </div>

              <input
                type="number"
                value={phoneNumber}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="123 4567 89"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="font-semibold text-black">
              Email
            </label>
            <input
              type="email"
              value={email}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="purpose" className="font-semibold text-black">
              Purpose <Required />
            </label>
            <SearchableDropdown
              loading={purposeOfVisitOptions.loading}
              options={purposes}
              selectedOption={purpose}
              setSelectedOption={setPurpose}
              transparent={true}
            />
          </div>

          <div>
            <p className="font-semibold text-black">Select Host</p>
            <SearchableDropdown
              loading={hostOptions.loading}
              options={hosts}
              selectedOption={host}
              setSelectedOption={setHost}
              transparent={true}
            />
          </div>

          <div className="flex justify-between my-4">
            <div className="w-2/5">
              <label htmlFor="inviteDate" className="font-semibold text-black">
                Invite date <Required />
              </label>
              <input
                type="date"
                value={date}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setDate(e.target.value)}
              //   placeholder="Enter your name"
              />
            </div>

            <div className="w-2/5">
              <label htmlFor="inviteTime" className="font-semibold text-black">
                Invite time <Required />
              </label>
              <input
                type="time"
                value={time}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setTime(e.target.value)}
              //   placeholder="Enter your name"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="font-semibold text-black">
              Duration
            </label>
            <input
              type="number"
              value={duration}
              min={1}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter event duration"
            />
          </div>

          {submitting ? (
            <ButtonSpinner />
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full text-white bg-lightblue hover:bg-blue py-3 px-4 rounded-md my-2 "
            >
              Send
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default SendInviteModal;
