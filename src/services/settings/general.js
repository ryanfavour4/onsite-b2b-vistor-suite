import { Api } from "../../axios";
import { validateName } from "../../utils/validate";

export const addDepartment = async (data) => {
  validateName(data.department, "position");
  try {
    await Api.post("settings/add-department", data);
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const editDepartment = async (data) => {
  validateName(data.department, "position");
  try {
    await Api.post("settings/edit-department", data);
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const deleteDepartment = async (id) => {
  try {
    await Api.delete(`/settings/delete-department/${id}`);
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const addPosition = async (data) => {
  validateName(data.position, "position");
  console.log("reqqqqq", data);
  try {
    await Api.post("settings/position", data);
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const editPosition = async (data) => {
  validateName(data.position, "position");
  console.log("reqqqqq", data);
  try {
    await Api.post("settings/position/edit", data);
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const deletePosition = async (id) => {
  try {
    await Api.delete(`/settings/position/${id}`);
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const addVisitorField = async (data) => {
  validateName(data.field_name, "field name");
  validateName(data.field_label, "field label");
  console.log(data);
  try {
    await Api.post("settings/field", data);
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const editVisitorField = async (data, id) => {
  validateName(data.field_name, "field name");
  validateName(data.field_label, "field label");
  console.log(data);

  try {
    await Api.put(`settings/field/${id}`, data);
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
      error?.response?.data ||
      error?.response ||
      error?.message ||
      error
    );
  }
};

export const deleteVisitorField = async (id) => {
  try {
    await Api.delete(`settings/field/${id}`);
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const disableVisitorField = async (id) => {
  try {
    await Api.post(`settings/is-disable/${id}`, {
      is_enabled: false,
    });
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const toggleCompanyInviteOnlyMode = async (data) => {
  try {
    await Api.get(`settings/company-invite-mode/settings?enable=${data}`);
    console.log(data, "done changing");
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const toggleStaffInviteOnlyMode = async (data, id) => {
  try {
    await Api.patch(`settings/invite-mode/settings/${id}?enable=${data}`);
    console.log(data, id);
    await Api.get(`settings/company-invite-mode/settings?enable=${data}`);
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
