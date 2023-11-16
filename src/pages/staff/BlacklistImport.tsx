import React, { ChangeEvent, useState } from "react";
import { Api } from "../../axios";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { Link, useNavigate } from "react-router-dom";

export default function BlacklistImport() {
  const { importedBlacklistCsv, setImportedBlacklistCsv,isHovering, setIsHovering, loading, handleSubmitCsv } = useBlacklistImport();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-white shadow-lg rounded-md p-2 py-8 sm:p-3 w-full mt-8 max-w-6xl m-auto">
      <div className="">
        <p className="text-xl font-bold">Blacklist Import</p>
      </div>
      <div className="flex relative mt-10">
        <label
          htmlFor="upload-file"
          className={`border border-dashed rounded-md p-6 w-full ${
            isHovering ? 'bg-light/70' : 'bg-white'
          }`}
        >
          <p>
            Please select a CSV file that matches the import sample for Blacklist
          </p>
          <div className="border-b-2 mt-6">
            <div className="border bg-dark max-w-xs text-white py-2 rounded-t-lg text-center">
              {(importedBlacklistCsv?.target.files &&
                importedBlacklistCsv.target.files[0]?.name) ||
                "Select or Drag and Drop a .csv file"}
            </div>
          </div>
          <input
            type="file"
            name="upload-file"
            className="`border absolute top-0 left-0 w-full h-full opacity-0"
            accept=".csv"
            onChange={(e) => {setImportedBlacklistCsv(e);  setIsHovering(false)}}
            onDragOver={() => setIsHovering(true)}
            id="upload-file"
          />
        </label>
      </div>
      <div className="flex justify-center items-center gap-6 mt-10 mb-6">
        <button onClick={handleSubmitCsv} className="border block p-2 px-3 bg-lightblue rounded-md font-semibold text-white">
          Upload Imported CSV
        </button>
        <a
          href="../../csv/blacklist-import-sample.csv"
          download="blacklist-import-sample.csv"
          className="border block p-2 px-3 bg-blue rounded-md font-semibold text-white"
        >
          Download Import CSV Sample
        </a>
      </div>
    </div>
  );
}

const useBlacklistImport = () => {
  const [importedBlacklistCsv, setImportedBlacklistCsv] =
    useState<ChangeEvent<HTMLInputElement>>();
    const [isHovering, setIsHovering] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmitCsv = async () => {
      setLoading(true);
    const formData = new FormData();
    formData.append("blacklist", importedBlacklistCsv.target.files[0]);
    await Api.post("/visitor/blacklist-import", formData)
      .then((res) => {
        setLoading(false);
        toast.success("Blacklist CSV Uploaded Successfully");
          navigate("/blacklist");
      })
      .catch((err) => {
        toast.error(err?.message || "Error in Uploading Blacklist CSV");
        setLoading(false);
        console.log(err);
      });
    }

  return { importedBlacklistCsv, setImportedBlacklistCsv, setIsHovering, isHovering, loading, handleSubmitCsv };
};
