import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Api } from "../axios";
import { notificationData, visitorsData } from "../data";
import useOutsideListener from "../hooks/useOutsideListener";
import NewVisitorNotificationCard from "./cards/NewVisitorNotificationCard";
import NotificationCard from "./cards/NotificationCard";

const AllNotifications = ({ setShowPopup }) => {
  const wrapperRef = useRef(null);
  useOutsideListener(wrapperRef, () => setShowPopup(false));

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newVisitorNotifications, setNewVisitorNotifications] = useState([
    { id: 1 },
    { id: 2 },
  ]);

  const unreadMessageCount = notifications.filter(
    (message) => !message.isRead
  ).length;

  // console.log(`Number of unread messages: ${unreadMessageCount}`);

  const getNotifications = async () => {
    setLoading(true);
    await Api.get("settings/load-notif").then((res) => {
      // console.log("notifications loaded ======> ", res.data);
      setNotifications(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const NewVisitors = notifications?.filter(
    (item) => item.title === "New Visitor"
  );

  const otherNotifications = notifications?.filter(
    (item) => item.title !== "New Visitor"
  );

  return (
    <div
      className="absolute top-16 rounded-md bg-lightest border-2 border-solid border-lightest z-10 min-h-32 min-w-full w-40 right-0 border border-light h-max"
      ref={wrapperRef}
    >
      <div className="flex justify-between p-4 bg-white rounded-t-md">
        <h2>Notifications</h2>
        <button>{/* <i className="fa-solid fa-xmark"></i> */}</button>
      </div>

      <button
        className="ml-auto block mt-2 px-4 text-sm"
        onClick={() => {
          setNotifications([]);
          setNewVisitorNotifications([]);
        }}
      >
        {/* Clear all */}
      </button>

      <div className="p-2" style={{ maxHeight: "400px", overflowY: "auto" }}>
        {loading
          ? "loading..."
          : otherNotifications.map(
            ({ title, content, updatedAt, id, status }) => (
              <NotificationCard
                key={id}
                title={title}
                description={content}
                time={updatedAt}
                notifications={notifications}
                setNotifications={setNotifications}
                id={id}
                status={status}
              />
            )
          )}
      </div>

      {NewVisitors?.map((visitor, id) => (
        <NewVisitorNotificationCard
          key={id} // Make sure to add a unique key prop when rendering a list of elements
          id={visitor.id}
          setNewVisitorNotifications={setNewVisitorNotifications}
          newVisitorNotifications={newVisitorNotifications}
          name={visitor.visitor_name}
          company={visitor.companyInfo.name}
          visitor_id={visitor.visitor_id}
          image={visitor.img_url}
          status={visitor.status}
        />
      ))}

      {/* <Link
        to="/notification"
        className="text-blue underline mt-6 text-center block"
      >
        View all
      </Link> */}
    </div>
  );
};

export default AllNotifications;
