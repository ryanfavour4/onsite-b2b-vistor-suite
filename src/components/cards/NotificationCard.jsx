import React from "react";
import { Api } from "../../axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";

const NotificationCard = ({
  title,
  description,
  time,
  id,
  setNotifications,
  notifications,
  getNotifications,
  status,
}) => {
  const [loading, setLoading] = useState(false);

  const handleRead = async () => {
    try {
      setLoading(true);
      Api.put(`settings/open-notif/${id}`).then((res) => {
        getNotifications()
        if (res.data.status == "success") {
          // toast.success(res.data.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   handleRead();
  //   setLoading(false);

  // }, [loading]);

  return (
    <div className="p-3 bg-white my-2 rounded-md ">
      <div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <h3 className="font-semibold text-black mr">{title}</h3>
            <p className="font-extrabold mx-1 text-black text-xl uppercase ">
              .
            </p>
            <p className="text-dark font-light capitalize text-sm">{time}</p>
          </div>
          <button
            onClick={() =>
              setNotifications(
                notifications.filter((notification) => {
                  return notification.id !== id;
                })
              )
            }
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <p className="text-sm">{description}</p>

        <div className="text-sm">
          {status !== "read" && (
            <button className="text-green mr-4" onClick={handleRead}>
              mark as read
            </button>
          )}
          {/* <button>
          Decline
        </button> */}
        </div>
      </div>

      {/* <div className='text-sm'>
        <button className='text-green mr-4'>
          Accept
        </button>
        <button>
          Decline
        </button>
      </div> */}
    </div>
  );
};

export default NotificationCard;
