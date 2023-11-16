import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { Api } from '../../axios';
import useFetch from "../../hooks/useFetch";
import { registerVisitor } from "../../services/visitor";
import ButtonSpinner from "../ButtonSpinner";
import SearchableDropdown from "../dropdowns/SearchableDropdown";
import Loading from "../Loading";
import Success from "../Success";
import CloseModalBtn from "./CloseModalBtn";


const EventCheckInMessageModal = ({ showModal, setShowModal, refresh, setRefresh }) => {
  const [subject, setSubject] = useState('')
  const [attachment, setAttachment] = useState(null)

  const [submitting, setSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log("handle submit");

    // console.log(fields, 'fieldssss')


    try {
      setSubmitting(true)
      // await registerVisitor("fields")
      // setShowSuccess(true)

      Api.post("")
    } 
    
    catch (error) {
      toast.error(error.response?.message || error.response?.data || error?.message || error);
    } 
    
    finally {
      setSubmitting(false)
    }
  };

  return (
    <div
      className={`${showModal ? "modal" : "hidden"} text-sm`}
    >

      {showSuccess ? (
        <Success
          message={"Template created successfully!"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      ) : (
        <form onSubmit={handleSubmit} className="relative modal--content">

          <CloseModalBtn setShowModal={setShowModal} />
<>

        <label htmlFor="dropdown" className="font-semibold text-black mt-3 block">
          Subject
        </label>
        <input type={'text'} className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full mb-3" value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <div className="">
          <label htmlFor="emailMessage" className="font-semibold text-black">
            Email Message
          </label>
          <div className="mb-4 ">
            <ReactQuill
              theme="snow"
              // value={emailMessage}
              // onChange={setEmailMessage}
              style={{ height: '100px', marginBottom: '60px' }}
            />
          </div>

        </div>

        <div className="mb-3">
          <label htmlFor="attachment" className="font-semibold text-black">
            Add an attachment
          </label>
          <input
            type="file"
            value={attachment}
            className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
            onChange={(e) => setAttachment(e.target.value)}
            placeholder="upload attachment"
          />
        </div>
      </>

          {submitting ? (
            <ButtonSpinner />
          ) : (
            <button
              type="submit"
              className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue text-lg  mt-3"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}

        </form>
      )}

    </div>
  );
}

export default EventCheckInMessageModal





// const EventCheckIn = () => {


//   const handleSubmit = () => { }
  
//   return (
//     <div>

//       <form className="w-4/5 block max-w-[500px]" onSubmit={handleSubmit}>


//         <label htmlFor="dropdown" className="font-semibold text-black mt-3 block">
//           Subject
//         </label>
//         <input type={'text'} className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full mb-3" value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//         />

//         <div className="">
//           <label htmlFor="emailMessage" className="font-semibold text-black">
//             Email Message
//           </label>
//           <div className="mb-4 ">
//             <ReactQuill
//               theme="snow"
//               // value={emailMessage}
//               // onChange={setEmailMessage}
//               style={{ height: '100px', marginBottom: '60px' }}
//             />
//           </div>

//         </div>

//         <div className="mb-3">
//           <label htmlFor="attachment" className="font-semibold text-black">
//             Add an attachment
//           </label>
//           <input
//             type="file"
//             value={attachment}
//             className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
//             onChange={(e) => setAttachment(e.target.value)}
//             placeholder="upload attachment"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-max px-6 bg-blue py-3 rounded-md text-white hover:bg-blue text-lg mt-3"
//           onClick={handleSubmit}
//         >
//           Submit
//         </button>

//       </form>

//     </div>
//   )
// }

// export default EventCheckIn