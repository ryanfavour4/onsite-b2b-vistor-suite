import { Api } from "../axios";
import { validateEmail, validateName } from "../utils/validate";
import { toast } from "react-toastify";

export const registerVisitor = async (data) => {
  let main;
  try {
    const fd = new FormData();
    for (const { title, value } of data) {
      if (title === "purpose_of_visit") {
        const purposeResponse = await Api.get(
          `settings/visit-purpose/${value}`
        );
        main = purposeResponse.data?.data?.visit_purpose_name;
        // console.log(main);
        fd.append("purpose", main);
        // console.log(title, value);
      } else if (title === "host") {
        fd.append("staff", value);
        // console.log(value);
      } else if (title === "avatar") {
        fd.append(title, value?.name);
        // console.log(value.name);
      } else if (title === "company_name") {
        fd.append("company", value);
        // console.log(value);
      } else if (title === "visitor_name") {
        fd.append("name", value);
        // console.log(title, value);
      } else {
        fd.append(title, value);
      }
    }
    const obj = {};
    for (const pair of fd.entries()) {
      const key = pair[0];
      const value = pair[1];
      obj[key] = value;
    }

    await Api.post("visitor/sign-in", obj)
      .then((res) => {
        console.log(res);
        toast.success("Visitor Registered Successfully");
      })
      .catch((err) => {
        console.log(err);
        if (err.message == "Internal server error") {
          toast("Sent Successfully");
          return;
        }
        toast.error(err.message);
      });
  } catch (error) {
    console.log(error, "error in service");
    if (error.code == 500) {
      toast.error("Please Fill In Every Field");
      throw new Error(error);
    }
    toast.error(error.message);
    throw new Error(error);
  }
};

export const scheduleInvite = async (data) => {
  validateEmail(data.email, "email");
  validateName(data.purpose, "purpose");
  console.log(data, "invitee dataaa");
  try {
    await Api.post("visitor/invitee/schedule-invite", data);
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const blacklistVisitor = async (id) => {
  try {
    const res = await Api.post("visitor/blacklist", {
      blacklist: [id],
    });
    console.log(res.data);
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
