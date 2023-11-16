import axios from "axios";
import { Api } from "../axios";
import { validateName } from "../utils/validate";

export const createEvent = async (data) => {
  validateName(data.event_name, "event name");
  // validateName(data.location, 'event location')
  validateName(data.event_capacity, "event capacity");

  // console.log(data);

  try {
    await Api.post("events/create", data);
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const connectToEventbrite = async (data) => {
  const { eventbrite_id, organization_id } = data;
  const config = { headers: { Authorization: `Bearer ${eventbrite_id}` } };
  try {
    const eventRes = await axios.get(
      `https://www.eventbriteapi.com/v3/events/424905151747`,
      config
    );
    // console.log(eventRes);

    const orgRes = await axios.get(
      `https://www.eventbriteapi.com/v3/organization/${organization_id}/events`,
      config
    );
    // console.log(orgRes);

    Api.post("settings/eventbrite-ids", { eventbrite_id, organization_id });
  } catch (error) {
    console.log(error);
  }
};
