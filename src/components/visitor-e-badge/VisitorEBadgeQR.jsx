import React from "react";
import avatar from '../../assets/defaultAvatar.png';

import QrCode from "qrcode.react";

const VisitorEBadgeQR = () => {
  const visitor = {
    companyInfo: { logo: avatar, name: "wahab lorem", email: "lorem@mail.com" },
    locationInfo: { name: "ile ife", address: "asherifa estate" },
    fields: [
      { name: "name", value: "wahab" },
      { name: "email", value: "wahab@mail.com" },
      { name: "purpose", value: "interview" },
      { name: "phone number", value: "0990023" },
      { name: "company", value: "wahab lorem" },
      { name: "address", value: "5, ile ife street" },
      { name: "arrival time", value: "27/01/2022 13:23" },
    ],
    host: { first_name: "lorem", last_name: "ipsum" },
    visiting_date: "2022-12-09",
  };

  const getVisitorName = (fields) => {
    const nameField = fields.find((field) => field.field_name === "name");
    return nameField.field_value;
  };
  const getVisitorEmail = (fields) => {
    const emailField = fields.find((field) => field.field_name === "email");
    return emailField.field_value;
  };
  const getVisitorPhone = (fields) => {
    const phoneField = fields.find(
      (field) => field.field_name === "phone_number"
    );
    return phoneField.field_value;
  };

  const handleSignOut = (id) => {
    console.log("hiii");
  };

  return (
    <div className="mx-auto bg-white p-3 max-w-[400px] w-11/12  my-4 rounded-sm">
      <div className="badge-wrapper">
        <div>
          <h3 className="text-center text-xl font-semibold my-2 text-black ">
            Visitor for Mr{" "}
            {`${visitor.host.first_name} ${visitor.host.last_name}`}
          </h3>
          <div className="h-32 w-32 mx-auto rounded-sm">
            <img
              src={visitor.companyInfo.logo}
              className="h-full w-full object-cover rounded-sm"
            />
          </div>
        </div>
        <div>
          {visitor.fields.map(({ name, value }, index) => (
            <div
              className={`flex p-3 ${
                index % 2 === 0 ? "bg-lightest" : "bg-white"
              } capitalize`}
            >
              <p className="w-2/5 font-semibold text-black">{name}</p>
              <p className="w-3/5 text-dark">{value}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto flex justify-center mt-2">
          <QrCode value={visitor.short_id || "28491847657"} />
        </div>
      </div>
    </div>
  );
};

export default VisitorEBadgeQR;
