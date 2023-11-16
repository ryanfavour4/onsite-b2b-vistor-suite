import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "../../components/auth/AuthLayout";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password == "") {
      toast.error("Please enter password!");
    }
    if (!(password === confirmPassword)) {
      toast.error("Passwords do not match!");
      return;
    }
    navigate("/dashboard");
  };

  return (
    <AuthLayout>
      <div className="sm:w-1/2 p-2 w-full">
        <div className="w-4/5 mx-auto block max-w-[500px] text-center sm:text-left">
          <h2 className=" text-2xl text-black font-bold mb-3">
            Create new password
          </h2>
        </div>

        <form
          className="w-4/5 mx-auto block max-w-[500px]"
          onSubmit={handleSubmit}
        >
          {[
            { title: "new password", value: password, valueFunc: setPassword },
            { title: "confirm password", value: confirmPassword, valueFunc: setConfirmPassword },
          ].map(({ title, value }) => (
            <div className=" mb-4">
              <label htmlFor="password" className="font-semibold text-black capitalize">
                {title}
              </label>
              <input
                type={"password"}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => valueFunc(e.target.value)}
                placeholder={`Enter ${title}`}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue text-lg mt-3"
            onClick={handleSubmit}
          >
            Reset Password
          </button>
        </form>

        <Link
          to="/"
          className="text-blue px-1 mt-5 text-center flex justify-center items-center font-semibold"
        >
          <i className="fa-solid fa-arrow-left-long mx-2"></i> Home
        </Link>
      </div>
    </AuthLayout>
  );
};

export default NewPassword;
