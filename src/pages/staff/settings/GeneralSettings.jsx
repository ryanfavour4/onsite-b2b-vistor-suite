import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Department from "../../../components/tabs/tab-contents/general-settings-tab-contents/Department";
import Position from "../../../components/tabs/tab-contents/general-settings-tab-contents/Position";
import Tabs from "../../../components/tabs/Tabs";
import ToggleSwitch from "../../../components/toggle-switch/ToggleSwitch";
import { changeCompanyInviteOnlyMode } from "../../../features/authSlice";
import useFetch from "../../../hooks/useFetch";
import { toggleCompanyInviteOnlyMode } from "../../../services/settings/general";
import SmallSpinner from "../../../components/SmallSpinner";

const GeneralSettings = () => {
  const [toggling, setToggling] = useState(false);
  const { companyInviteOnlyMode } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const toggleInviteOnlyMode = async (checked) => {
    console.log(toggleCompanyInviteOnlyMode, checked);
    try {
      setToggling(true);
      await toggleCompanyInviteOnlyMode(checked);
      dispatch(changeCompanyInviteOnlyMode(checked));
    } catch (error) {
      console.log(error);
    } finally {
      setToggling(false);
    }
  };

  return (
    <div>
      <div className="mt-2 ml-2 mb-6">
        <p className="mb-2 text-md text-dark font-semibold">Invite only mode</p>
        {toggling ? (
          <SmallSpinner />
        ) : (
          <ToggleSwitch
            handleSwitch={async (checked) => {
              return await toggleInviteOnlyMode(checked);
            }}
            isChecked={Boolean(Number(companyInviteOnlyMode))}
          />
        )}
      </div>

      <Tabs
        tabTitles={["Department", "Position"]}
        tabContents={[<Department />, <Position />]}
      />
    </div>
  );
};

export default GeneralSettings;
