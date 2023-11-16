import React from "react";
import { useState } from "react";
import { branchFieldsData } from "../../../../data";
import useFetch from "../../../../hooks/useFetch";
import Error from "../../../Error";
import Loading from "../../../Loading";
import CreateBranchModal from "../../../modals/CreateBranchModal";
import Table from "../../../tables/Table";
import { Api } from "../../../../axios";

const Branch = () => {
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const editLocation = () => {};
  const deleteLocation = ({id}) => {
    const response = window.prompt("Confirm Your Delete \n Enter The Branch ID " + id)
    if (!isNaN(Number(response)) && Number(response) !== 0 && Number(response) == id) {
      Api.delete(`settings/branch/${Number(response)}`).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    }
  };
  
  const actionColItems = [
    { title: "edit", func: editLocation },
    { title: "delete", func: deleteLocation },
  ];

  const { data, loading, error } = useFetch("settings/branch", [refresh]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error?.message} />;
  }

  const branchesData = data.data.branches.map((branch) => ({
    ...branch,
    branch_admin: branch.branch_admin
      ? `${branch.branch_admin.first_name} ${branch.branch_admin.last_name}`
      : "N/A",
    country: branch.country_info ? `${branch.country_info?.country}` : "N/A",
  }));

  return (
    <>
      <div>
        <Table
          data={branchesData}
          headings={[
            "Branch ID",
            "Name of branch",
            "branch address",
            "country",
            "branch admin",
            "action",
          ]}
          fieldsKeys={[
            "id",
            "branch_name",
            "company_location",
            "country",
            "branch_admin",
            "action",
          ]}
          actionColDropdownItems={actionColItems}
          setDisplayFilters={"setDisplayFilters"}
          showActionDropdown={"showActionDropdown"}
          setShowActionDropdown={"setShowActionDropdown"}
          title={"Branch"}
        >
          <button
            onClick={() => setShowBranchModal(true)}
            className="mx-2 bg-lightblue hover:bg-blue text-white drop-shadow-md rounded-md p-2 flex justify-center items-center px-4 pmt-2../"
          >
            Create new branch
          </button>
        </Table>
      </div>
      <CreateBranchModal
        refresh={refresh}
        setRefresh={setRefresh}
        showModal={showBranchModal}
        setShowModal={setShowBranchModal}
      />
    </>
  );
};

export default Branch;
