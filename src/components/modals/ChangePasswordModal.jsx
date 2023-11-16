import { useEffect, useState } from "react";
import Required from "../Required";
import SearchableDropdown from "../dropdowns/SearchableDropdown";
import CloseModalBtn from "./CloseModalBtn";
import Success from "../Success";
import ButtonSpinner from "../ButtonSpinner";
import { Api } from "../../axios";
import { hasher } from "../../utils/hasher";
import { toast } from "react-toastify";
import { changePassword, editStaff } from "../../services/staff";
import useFetch from "../../hooks/useFetch";
import { VisibilityIcon, VisibilityOffIcon } from "../../icons/Icons";
import { logout } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChangePasswordModal = ({ showModal, setShowModal }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email] = useState(
    JSON.parse(localStorage.getItem("auth")).userData.email
  );
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Track password visibility state
  const [submitting, setSubmitting] = useState(false);
  const [userPassword] = useState(localStorage.getItem("passedObject"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      email: email,
      password: newPassword,
    };

    if (hasher(oldPassword) !== userPassword) {
      toast("This password doesn't seem to be your older password");
      return;
    }
    if (hasher(newPassword) === userPassword) {
      toast("Your New Password cant be your old password");
      return;
    }
    if (confirmPassword !== newPassword) {
      toast(
        "Your New Password doesn't match your confirmed password please recheck"
      );
      return;
    } else {
      await Api.post("users/resetPassword", dataToSend)
        .then((res) => {
          setShowSuccess(true);
          setSubmitting(false);
          setTimeout(() => {
            dispatch(logout());
            navigate("/login");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
          setSubmitting(false);
        });
    }

    // try {
    //   setSubmitting(true);
    //   await changePassword({
    //     oldPassword,
    //     newPassword,
    //     confirmPassword,
    //   });
    //   setShowSuccess(true);
    // } catch (error) {
    //   toast.error(error.message || error.data.message);
    // } finally {
    //   setSubmitting(false);
    // }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`${showModal ? "modal" : "hidden"}`}>
      {showSuccess ? (
        <Success
          message={"Password updated successfully!"}
          setShowSuccess={setShowSuccess}
          setShowParentModal={setShowModal}
        />
      ) : (
        <form onSubmit={handleSubmit} className="relative modal--content h-32">
          <CloseModalBtn setShowModal={setShowModal} />

          {/* <div className=" mb-4">
            <label htmlFor="Email" className="font-semibold text-black">
              Email
            </label>

            <div className="flex items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                placeholder="Enter your registered Email"
              />
            </div>
          </div> */}

          <div className=" mb-4">
            <label htmlFor="password" className="font-semibold text-black">
              Old password
            </label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={oldPassword}
                required
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter your old password"
              />
            </div>

            <div className="flex items-center">
              <button
                type="button"
                className=" top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <p className="update password__icon">
                    <VisibilityIcon />
                  </p>
                ) : (
                  <p className="update password__icon">
                    <VisibilityOffIcon />
                  </p>
                )}
              </button>
            </div>
          </div>

          <div className=" mb-4">
            <label htmlFor="password" className="font-semibold text-black">
              New password
            </label>

            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={newPassword}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            <div className="flex items-center">
              <button
                type="button"
                className=" top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <p className="update password__icon">
                    <VisibilityIcon />
                  </p>
                ) : (
                  <p className="update password__icon">
                    <VisibilityOffIcon />
                  </p>
                )}
              </button>
            </div>
          </div>

          <div className=" mb-4">
            <label htmlFor="password" className="font-semibold text-black">
              Confirm New password
            </label>

            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                required
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
              />
            </div>

            <div className="flex items-center">
              <button
                type="button"
                className=" top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <p className="update password__icon">
                    <VisibilityIcon />
                  </p>
                ) : (
                  <p className="update password__icon">
                    <VisibilityOffIcon />
                  </p>
                )}
              </button>
            </div>
          </div>

          {submitting ? (
            <ButtonSpinner />
          ) : (
            <button
              type="submit"
              className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue mt-1 text-sm"
              onClick={handleSubmit}
            >
              Update password
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default ChangePasswordModal;
