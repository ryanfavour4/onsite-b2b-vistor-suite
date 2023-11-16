import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import useFetch from "../../hooks/useFetch";
import { createCheckInMessageTemplate } from '../../services/settings/message-templates';
import { registerVisitor } from "../../services/visitor";
import ButtonSpinner from "../ButtonSpinner";
import SearchableDropdown from "../dropdowns/SearchableDropdown";
import Loading from "../Loading";
import Success from "../Success";
import CloseModalBtn from "./CloseModalBtn";


const VisitorCheckInMessageModal = ({ showModal, setShowModal, refresh, setRefresh }) => {
  const [purposeOfVisit, setPurposeOfVisit] = useState({ value: 'all', label: 'all' })
  const [subject, setSubject] = useState('')
  const [attachment, setAttachment] = useState(null)
  const [emailMessage, setEmailMessage] = useState("")

  const [fields, setFields] = useState([])

  const [submitting, setSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false);

  const purposeOfVisitOptions = useFetch('settings/visit-purpose', [showModal])


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true)
      if (attachment?.type !== 'application/pdf' || !attachment) {
        toast.error('Please select a pdf file');
        return
      }
      
      await createCheckInMessageTemplate({
        purposes : purposeOfVisit.value == 'all' ? purposeOfVisitOptions.data?.data?.map((item) => item.id ).join('-') : `${purposeOfVisit.value}`,
        check_in_message: emailMessage,
        check_in_subject: subject,
        check_in_attachment: attachment
      })
      setShowSuccess(true)
    } catch (error) {
      toast.error(error?.message || error);
    } finally {
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
          {
            purposeOfVisitOptions.loading ?
              <Loading />
              :
              <>
                {
                  fields && <>

                    <label htmlFor="dropdown" className="font-semibold text-black">
                      Select purpose of visit
                    </label>
                    <SearchableDropdown options={[{ value: 'all', label: 'all' }, ...purposeOfVisitOptions.data?.data?.map(({ id, visit_purpose_label }) => ({ value: id, label: visit_purpose_label }))]} loading={purposeOfVisitOptions.loading} selectedOption={purposeOfVisit} setSelectedOption={setPurposeOfVisit} transparent={true} />

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
                          value={emailMessage}
                          onChange={setEmailMessage}
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
                        // value={attachment}
                        className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                        onChange={(e) => {
                          setAttachment(e.target.files[0])
                        }
                        }
                        placeholder="upload attachment"
                      />
                    </div>

                  </>
                }
              </>
          }

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

export default VisitorCheckInMessageModal