import { Api } from "../axios";

export const registerAttendee = async (data) => {
  try {
    const { firstname, lastname, email, invitedBy, phone, eventId, gender } =
      data;
    // console.log({
    //   first_name: firstname,
    //   last_name: lastname,
    //   email,
    //   invited_by: invitedBy,
    //   phone_number: phone,
    //   event_id: eventId,
    // });
    await Api.post("events/attendee/register", {
      first_name: firstname,
      last_name: lastname,
      email,
      invited_by: invitedBy,
      phone_number: phone,
      event_id: eventId,
      custom_fields: { custom_fields_name: "field 1 value" },
      gender,
    });
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
        error.response?.message ||
        error?.response ||
        error?.message ||
        error
    );
  }
};

// {
//     "first_name": "Ibukun",
//     "last_name": "odeyemi",
//     "email": "odeyemiibukunaB@gmail.com",
//     "invited_by": "Ajewole",
//     "phone_number": "09767576878J",
//     "event_id": "424905151747"
// }
