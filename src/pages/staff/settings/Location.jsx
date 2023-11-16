import React from "react";
import Branch from "../../../components/tabs/tab-contents/location-tab-contents/Branch";
import Entrances from "../../../components/tabs/tab-contents/location-tab-contents/Entrances";
import Tabs from "../../../components/tabs/Tabs";

const Location = () => {
  const tabTitles = ["branch", "entrances"];
  const tabContents = [<Branch />, <Entrances />];

  return (
    <div>
      <Tabs tabTitles={tabTitles} tabContents={tabContents} />
    </div>
  );
};

export default Location;
