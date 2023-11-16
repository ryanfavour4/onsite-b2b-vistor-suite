import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/auth";
import ButtonSpinner from "../ButtonSpinner";
import { VisibilityIcon, VisibilityOffIcon } from "../../icons/Icons";

const ResetPassword = ({ email, setEmail }) => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Track password visibility state
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await resetPassword({
        otp,
        newPassword,
        confirmPassword,
        email
      });
      setEmail("");
      toast.success("Password reset successfully!");
      // navigate("/login")
    } catch (error) {
      toast.error(error.message || error.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-4/5 mx-auto max-w-[500px]">
      <h2 className="font-bold mb-5 text-lg">Create new password</h2>

      <div className=" mb-4">
        <label htmlFor="password" className="font-semibold text-black">
          Otp
        </label>
        <input
          type={"text"}
          value={otp}
          className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
          onChange={e => setOtp(e.target.value)}
          placeholder="Enter 4-digit otp sent to your email"
        />
      </div>

      <div className=" mb-4">
        <label htmlFor="password" className="font-semibold text-black">
          New password
        </label>

        {/* =========== */}
        <div className="flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
            onChange={e => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>

        <div className="flex items-center">
          <button
            type="button"
            className=" top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword
              ? <p className="update password__icon">
                  <VisibilityIcon />
                </p>
              : <p className="update password__icon">
                  <VisibilityOffIcon />
                </p>}
          </button>
        </div>
        {/* =========== */}
      </div>

      <div className=" mb-4">
        <label htmlFor="password" className="font-semibold text-black">
          Confirm password
        </label>

        {/* =========== */}
        <div className="flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Enter confirm password"
          />
        </div>

        <div className="flex items-center">
          <button
            type="button"
            className=" top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword
              ? <p className="update password__icon">
                  <VisibilityIcon />
                </p>
              : <p className="update password__icon">
                  <VisibilityOffIcon />
                </p>}
          </button>
        </div>
        {/* =========== */}
      </div>

      {submitting
        ? <ButtonSpinner />
        : <button
            type="submit"
            className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue text-lg mt-3"
            onClick={handleSubmit}
          >
            Change password
          </button>}
    </div>
  );
};

export default ResetPassword;
