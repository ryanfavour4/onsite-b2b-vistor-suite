import { Api } from "../axios";
import {
  validateEmail,
  validateEmailAndPassword,
  validateName,
  validatePassword,
} from "../utils/validate";
import { hasher } from "../utils/hasher";
import { toast } from "react-toastify";

export const login = async (email, password) => {
  validateEmailAndPassword(email, password);
  localStorage.setItem("passedObject", hasher(password));
  const res = await Api.post("users/sign-in", {
    email: email.trim(),
    password,
  })
    .then((response) => {
      toast.success(response.message);
      return response;
    })
    .catch((error) => {
      toast.error(error.message);
      return error;
    });
  // console.log("ress", res);
  return res;
};

export const superAdminLogin = async (email, password) => {
  validateEmailAndPassword(email, password);
  try {
    const res = await Api.post("admin/login", {
      email: email.trim(),
      password,
    });

    // return res.data;
    return res;
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const resetPassword = async (data) => {
  validatePassword(data.newPassword, "new password");
  validatePassword(data.confirmPassword, "confirm password");
  validatePassword(data.email, "email");
  try {
    const res = await Api.post("users/change-password", data);
    console.log(res);
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const requestOtp = async (email) => {
  validateEmail(email);
  try {
    const res = await Api.post("users/forgotpassword", {
      email,
    });
    return res.data;
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const signup = async (data) => {
  const {
    companyName,
    email,
    firstname,
    lastname,
    password,
    phoneNumber,
    selectedUseCases,
    country,
  } = data;

  validateEmailAndPassword(email, password);
  try {
    await Api.post("users/sign-up", {
      company_name: companyName,
      email: email,
      password: password,
      last_name: lastname,
      first_name: firstname,
      option: selectedUseCases,
      country: country,
      phone_number: phoneNumber,
    });
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const resendEmail = async (email) => {
  validateEmail(email, "email");
  try {
    await Api.post("users/resend-token", { email });
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

const adminCheck = JSON.parse(localStorage.getItem("auth"));

function isObjectEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

const isAdmin = adminCheck?.userData?.data?.role;
console.log(isAdmin, isObjectEmpty(adminCheck));
export const getUserDetails = async (token) => {
  try {
    const res = await Api.get(
      isAdmin == "SUPER ADMIN"
        ? "admin/profile"
        : isObjectEmpty(adminCheck) == true
          ? "users/current"
          : "users/current",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getAdminDetails = async (token) => {
  try {
    const res = await Api.get("admin/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return {};
  }
};
