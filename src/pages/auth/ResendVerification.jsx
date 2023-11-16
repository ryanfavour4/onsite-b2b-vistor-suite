import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "../../components/auth/AuthLayout";
import ButtonSpinner from "../../components/ButtonSpinner";
import EmailVerified from "../../components/verify-email/EmailVerified";
import VerifyEmailBox from "../../components/verify-email/VerifyEmailBox";
import { resendEmail } from "../../services/auth";

const ResendVerification = () => {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const navigate = useNavigate()

  const handleResend = async (e) => {
    e.preventDefault();
    // do something
    if (!email) {
      toast.error('Please enter email!')
      return
    }
    try {
      setSubmitting(true)
      await resendEmail(email)
      setSubmitting(true)
      toast.success('Verification link sent!')
      navigate('/login')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setSubmitting(false)
    }
  };


  return (
    <AuthLayout>
      <div className="sm:w-1/2  w-full">
        <div className="w-4/5 mx-auto block max-w-[500px] text-center sm:text-left">
          <h2 className="font-bold text-lg">
            Didn't receive verification link?
          </h2>
          <p className='text-sm mt-1 mb-8'>
            No worries, we'll send you another one
          </p>
        </div>

        <form
          className="w-4/5 mx-auto block max-w-[500px]"
          onSubmit={handleResend}
        >
          <div className="mb-4">
            <label htmlFor="email" className="font-semibold text-black">
              {" "}
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

          {submitting ? (
            <ButtonSpinner />
          ) : (
            <button
              type="submit"
              className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue text-lg  mt-3"
              onClick={handleResend}
            >
              Resend Verification Link
            </button>
          )}

        </form>

        <Link
          to="/login"
          className="px-1 font-semibold text-blue hover:underline block mx-auto max-w-max mt-4"
        >
          Login
        </Link>


      </div>
    </AuthLayout>
  )
};

export default ResendVerification;
