import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import avatar from "../../assets/defaultAvatar.png";
import { Api } from "../../axios";

const NewVisitorNotificationCard = ({
  id,
  newVisitorNotifications,
  setNewVisitorNotifications,
  name,
  company,
  visitor_id,
  image,
  status,
  setLoading,
  setShowModal,
  setCount,
  count,
}) => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const handleRead = async () => {
    try {
      setLoading(true);
      setLoad(true);
      Api.put(`settings/open-notif/${id}`).then((res) => {
        // console.log(count);
        if (res.data.status == "success") {
          // toast.success(res.data.message);
          setLoading(false);
          setShowModal(false);
          setCount(count - 1);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRedirect = (id) => {
    window.location.href = `/visitor-ebadge/${id}`;
  };

  return (
    <div className="flex items-center p-2 border border-light rounded-sm">
      <div className="w-20 h-20 mr-2 rounded-sm">
        <img src={image} className="h-full w-full object-fit rounded-sm  " />
      </div>

      <div>
        <p className="text-black text-xs bg-lightred w-max px-1 py-0.5">
          New Visitor
        </p>
        <p className="my-1 text-sm">{name}</p>
        <p className="text-xs">{company}</p>
        <div className="text-xs mt-1">
          <button
            className="bg-lightblue text-white hover:bg-blue p-1 rounded-sm mr-2"
            onClick={() => handleRedirect(visitor_id)}
          >
            View Profile
          </button>
          {status !== "read" && (
            <button
              className="bg-darkred text-white hover:bg-blue p-1 rounded-sm mr-2"
              onClick={handleRead}
            >
              Dismiss
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewVisitorNotificationCard;
