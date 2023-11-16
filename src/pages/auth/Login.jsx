import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authenticate } from "../../features/authSlice";
import AuthLayout from "../../components/auth/AuthLayout";
import { Api, setAxiosToken } from "../../axios";
import ButtonSpinner from "../../components/ButtonSpinner";
import {
  getAdminDetails,
  getUserDetails,
  login,
  superAdminLogin,
} from "../../services/auth";
import { VisibilityIcon, VisibilityOffIcon } from "../../icons/Icons";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Track password visibility state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const checkAdminStatus = async () => {
    if (email == "john.doe@yahoo.com") {
      setAdmin(true);
      console.log("admin", admin);
      adminRes = await getAdminDetails(res?.data?.data?.token);
    } else {
      setAdmin(false);
      console.log("admin", admin);
    }
  };

  useEffect(() => {
    checkAdminStatus();
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      let res;

      console.log("the mail", email);
      if (email != "john.doe@yahoo.com") {
        res = await login(email, password);
        res = res.data;
      } else {
        res = await superAdminLogin(email, password);
      }
      let otherRes;
      let adminRes;
      if (email !== "john.doe@yahoo.com") {
        console.log("here", res.data.token);
        otherRes = await getUserDetails(res.data.token);
      }

      // if (email == "john.doe@yahoo.com") {
      //   setAdmin(true);
      //   console.log(admin);
      //   adminRes = await getAdminDetails(res.data.data.token);
      // }

      // console.log(otherRes);
      // console.log("adminRes", adminRes.data.data);

      dispatch(
        authenticate({
          userData: admin ? res.data.data : res.data,
          staffInviteOnlyMode: Boolean(
            !admin && otherRes?.data?.data?.user?.appointment_only
          ),
          companyInviteOnlyMode: Boolean(
            !admin && Number(otherRes.data?.data?.user?.company_invite_mode)
          ),
        })
      );
    } catch (error) {
      // !!!!!!!!!!!!______________________________________
      toast.error("username or password is incorrect");
      console.log(error);
      if (error.message === "kindly verify account") {
        navigate("/resend-verification-link");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthLayout>
      <div className="sm:w-1/2 w-full">
        <div className="w-4/5 mx-auto block max-w-[500px] text-center sm:text-left">
          <h2 className="text-4xl text-black font-bold mb-3">Welcome back</h2>

          <p className="text-md text-dark font-semibold mb-6">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form
          className="w-4/5 mx-auto block max-w-[500px]"
          onSubmit={handleLogin}
        >
          <div className="mb-4">
            <label htmlFor="email" className="font-semibold text-black">
              Email
            </label>
            <input
              type="email"
              value={email}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="font-semibold text-black">
              Password
            </label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full pr-12"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <p className="password__icon">
                    <VisibilityIcon />
                  </p>
                ) : (
                  <p className="password__icon">
                    <VisibilityOffIcon />
                  </p>
                )}
              </button>
            </div>
          </div>

          <div className="flex my-2 justify-between text-sm sm:text-md">
            <label htmlFor="remember" className="cursor-pointer">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                value={remember}
                onChange={(e) => {
                  setRemember(!remember);
                }}
              />
              <span className="mx-1 font-semibold">Remember for 30 days</span>
            </label>

            <Link
              to="/forgot-password"
              className="text-blue block text-right hover:underline font-semibold"
            >
              Forgot Password?
            </Link>
          </div>

          {submitting ? (
            <ButtonSpinner />
          ) : (
            <button
              type="submit"
              className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue text-lg mt-3"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </form>

        <p className="text-center mt-5 text-dark">
          Don't have an account?
          <Link
            to="/signup"
            className="px-1 font-semibold text-blue hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
