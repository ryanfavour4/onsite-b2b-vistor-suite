import { Link } from 'react-router-dom'

const EmailVerified = () => {
  return (
    <div  className="w-4/5 mx-auto max-w-[500px] p-5 rounded-xl">
      <h2 className='text-blue font-bold text-xl text-center mb-2'>
        Congratulations! you are verified
      </h2>
      <Link to ='/' className='capitalize text-blue p-2 bg-lightestblue flex items-center hover:text-white hover:bg-blue rounded-sm font-bold mx-auto w-max'>
        Go home
      </Link>
    </div>
  )
}

export default EmailVerified