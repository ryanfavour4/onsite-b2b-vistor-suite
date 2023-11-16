import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { requestOtp } from "../../services/auth"
import ButtonSpinner from "../ButtonSpinner"
const EnterEmail = ({setIsOtpSent, email, setEmail }) => {
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await requestOtp(email)
      toast.success(res.data.data)
      setIsOtpSent(true)
    } catch (error) {
      toast.error(error.message || error.data.message)
    } finally {
      setSubmitting(false)
    }

  }

  return (
    <>
      <div className='text-center text-2xl'>
        <h2 className="font-bold">
          Forgot password?
        </h2>
        <p className='text-sm mt-1 mb-8'>
          No worries, we'll send you reset instructions
        </p>

      </div>


      <form className="w-4/5 mx-auto block max-w-[500px]" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="font-semibold text-black"> Email</label>
          <input
            id="email"
            type="email"
            value={email}
            className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        {
          submitting ?
            <ButtonSpinner />
            :
            <button
              type="submit"
              className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue text-lg mt-3"
              onClick={handleSubmit}
            >
              Reset password
            </button>

        }



      </form>

      <p className="text-center mt-5 text-dark">
        Remember password?
        <Link
          to="/login"
          className="px-1 font-semibold text-blue hover:underline"
        >
          Login
        </Link>
      </p>

    </>

  )
}

export default EnterEmail