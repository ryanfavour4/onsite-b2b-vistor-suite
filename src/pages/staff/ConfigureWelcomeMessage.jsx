import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { setStaffList, staffListArray } from "../../features/staffSlice";
import MultiSelectSearchableDropdown from "../../components/dropdowns/MultiSelectSearchableDropdown";
import { Api } from "../../axios";
import useFetch from "../../hooks/useFetch";
import "react-quill/dist/quill.snow.css";
import {
  positionListArray,
  setPositionList,
} from "../../features/positionSlice";
import Loading from "../../components/Loading";

const ConfigureWelcomeMessage = () => {
  const staffList = useSelector(staffListArray);
  const positionList = useSelector(positionListArray);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [category, setCategory] = useState("");
  const [hostPosition, setHostPosition] = useState("");
  const { loading, error, data } = useFetch("/settings/visit-purposes", []);
  const [selectedPov, setSelectedPov] = useState([]);
  const [firstStaffs, setFirstStaffs] = useState([]);
  const [defaultHost, setDefaultHost] = useState([]);
  const [secondStaffs, setSecondStaffs] = useState([]);
  const { data: staffData } = useFetch("settings/get-all-staffs", []);
  const selectedConfigureMessage = JSON.parse(
    localStorage.getItem("configure-welcome-message")
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = new FormData();
    form.append("check_in_message", emailMessage);
    form.append("check_in_subject", email);
    form.append("purposes", selectedPov);
    if (secondStaffs.length) {
      form.append("staffs", [firstStaffs, secondStaffs].join("-"));
    } else {
      form.append("staffs", firstStaffs);
    }
    form.append("check_in_attachment", attachment);
    await Api.post(`/settings/purpose-message/checkin`, form)
      .then((res) => {
        toast.success("Check In Purpose Message Created Successfully");
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message || "Something went wrong");
      });
  };

  useEffect(() => {
    setSelectedPov(selectedConfigureMessage.id);
    // //*_________________________FETCH POSITIONS______________________//
    Api.get("settings/position")
      .then((res) => {
        dispatch(setPositionList(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
    if (staffData?.staffs) {
      dispatch(setStaffList(staffData.staffs));
    }
  }, [staffData]);

  const submitDefaultHost = () => {
    setIsLoading(true);
    const selectedHost = staffList.filter((item) => {
      return item.id == defaultHost;
    });

    const payload = {
      staff_id: selectedHost[0].id,
      first_name: selectedHost[0].first_name,
      last_name: selectedHost[0].last_name,
      email: selectedHost[0].email,
      category: category,
      purpose: Number(selectedPov),
      position: Number(hostPosition),
      avatar: "",
    };
    Api.post("/settings/host/create", payload)
      .then((res) => {
        setIsLoading(false);
        toast.success("Default Host Created Successfully");
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.message || "Something went wrong");
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  const defaultFields = data?.data.defaultFields;
  const customFields = data?.data.customFields;

  const allFields = defaultFields?.concat(customFields);

  const enabledFields = allFields?.filter((item) => item.is_enabled === true);

  return (
    <div className="">
      <h3 className="capitalize text-2xl font-semibold m-4 ml-10">
        Configure welcome message
      </h3>
      <div className="p-8 bg-white ml-10 rounded-md flex justify-between flex-col md:flex-row gap-10">
        <form // method="POST"
          // action="https://api.carrotsuite.space/api/v1/settings/purpose-message/checkin"
          className="w-4/5 block max-w-[500px]"
          onSubmit={handleSubmit}
        >
          {/*  */}
          <div className="my-4">
            <p className="my-1"> Select A Purpose Of Visit :</p>
            <select
              className="mx-1 bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block cursor-pointer w-full"
              name=""
              // onChange={(e) => setSelectedPov(e.target.value)}
              value={selectedConfigureMessage?.id}
              id=""
            >
              <option hidden value={selectedConfigureMessage?.id}>
                {selectedConfigureMessage.visit_purpose_name}
              </option>
              {/* {enabledFields?.map((val) => {
                return <option value={val.id}>{val.visit_purpose_name}</option>;
              })} */}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="font-semibold text-black">
              Email Subject
            </label>
            <input
              type="email"
              value={email}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="">
            <label htmlFor="emailMessage" className="font-semibold text-black">
              Email Message
            </label>
            <div className="mb-4 ">
              <ReactQuill
                theme="snow"
                value={emailMessage}
                onChange={setEmailMessage}
                style={{ height: "100px", marginBottom: "60px" }}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="attachment" className="font-semibold text-black">
              Upload Attachment
            </label>
            <input
              type="file"
              // value={attachment}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setAttachment(e.target.files[0])}
              placeholder="upload attachment"
            />
          </div>

          <div className=" mb-4">
            <label
              htmlFor="whatsappMessage"
              className="font-semibold text-light capitalize "
            >
              Enter whatsapp message
            </label>
            <textarea
              name=""
              id=""
              disabled
              className="w-full bg-transparent border border-light rounded-md outline-0 p-2 h-32 resize-none"
            />
          </div>

          <h4 className="text-xl font-semibold">Also Notify These Person(s)</h4>
          <div>
            <div className="mt-4">
              <p className="my-1"> Select A Staff:</p>
              <select
                className="mx-1 bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block cursor-pointer w-full"
                name=""
                onChange={(e) => setFirstStaffs(e.target.value)}
                value={firstStaffs}
                id=""
              >
                <option hidden value="">
                  Select Staff
                </option>
                {staffList.map((val) => {
                  return (
                    <option value={val.id}>
                      {val.first_name} {val.last_name}
                    </option>
                  );
                })}
              </select>
              {/* <label htmlFor="useStaff">
                <input type="checkbox" name="" id="" />{" "}
                <span>Use Staff List</span>
              </label> */}
            </div>
            <div className="mt-4">
              <p className="my-1"> Select A Staff:</p>
              <select
                className="mx-1 bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block cursor-pointer w-full"
                name=""
                onChange={(e) => setSecondStaffs(e.target.value)}
                value={secondStaffs}
                id=""
              >
                <option hidden value="">
                  Select Staff
                </option>
                {staffList.map((val) => {
                  return (
                    <option value={val.id}>
                      {val.first_name} {val.last_name}
                    </option>
                  );
                })}
              </select>
              {/* <label htmlFor="useStaff">
                <input type="checkbox" name="" id="" />{" "}
                <span>Use Staff List</span>
              </label> */}
            </div>
          </div>
          <button
            type="submit"
            className="w-max px-6 bg-blue py-3 rounded-md text-white hover:bg-blue text-lg mt-3"
          // onClick={handleSubmit}
          >
            Submit
          </button>
        </form>

        {/* //??======================= SETTING UP DEFAULT HOST ======================= */}
        <div className="max-w-lg">
          <h5 className="text-lg font-semibold mb-4">
            Pleases select a default host
          </h5>
          <p>
            This host is always going to be notified for the purpose of visit if
            a host is not selected
          </p>
          <div className="mt-4">
            <p className="my-1"> Select Host:</p>
            <select
              className="mx-1 bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block cursor-pointer w-full"
              name=""
              onChange={(e) => setDefaultHost(e.target.value)}
              value={defaultHost}
              id=""
            >
              <option hidden value="">
                Select Host
              </option>
              {staffList.map((val) => {
                return (
                  <option value={val.id}>
                    {val.first_name} {val.last_name}
                  </option>
                );
              })}
            </select>

            <p className="my-1 mt-6">Select Category:</p>
            <select
              className="mx-1 bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block cursor-pointer w-full"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id=""
            >
              <option value="">Select Category</option>
              <option value="Position">Position</option>
              <option value="Staff">Staff</option>
            </select>

            <p className="my-1 mt-6">Select Position:</p>
            <select
              name=""
              value={hostPosition}
              onChange={(e) => setHostPosition(e.target.value)}
              className="mx-1 bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block cursor-pointer w-full"
            >
              <option hidden value="">
                Select Positions e.g Manager
              </option>
              {positionList.map((position) => {
                return (
                  <option value={position.id} key={position.id}>
                    {position.position}
                  </option>
                );
              })}
            </select>

            <button
              type="submit"
              onClick={submitDefaultHost}
              className="w-max px-6 bg-blue py-3 rounded-md text-white hover:bg-blue text-lg mt-3"
            >
              Assign Host
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigureWelcomeMessage;
