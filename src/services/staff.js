import { Api } from "../axios";
import { validateEmail, validateName } from "../utils/validate";

export const addStaff = async (data) => {
  validateName(data.first_name, "first name");
  validateName(data.last_name, "first name");
  validateEmail(data.email, "email");
  validateName(data.office_location, "office location");
  validateName(data.department, "department");
  validateName(data.phone_number, "phone number");
  validateName(data.position, "position");

  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  for (const pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
  
  try {
    await Api.post("settings/add-staff", data);
  } catch (error) {
    console.log(error);
    throw new Error(
      error.response?.data ||
        error.response?.message ||
        error.response ||
        error.message
    );
  }
};

export const editStaff = async (id, data) => {
  validateName(data.first_name, "first name");
  validateName(data.last_name, "first name");
  validateName(data.address, "address");
  validateEmail(data.email, "email");
  try {
    await Api.put(`settings/update-staff/${id}`, data);
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
  throw new Error(error.message);
};

export const changePassword = async (data) => {
  validateName(data.oldPassword, "old password");
  validateName(data.newPassword, "new password");
  validateName(data.confirmPassword, "confirm password");

  try {
    await Api.post("users/in-app-change-password", data);
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
