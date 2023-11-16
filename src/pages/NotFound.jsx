import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="h-[calc(100vh-64px)] w-full flex items-center justify-center flex-col font-semibold" >
        <p className="mb-2 font-semibold">
        Page not found...
        </p>
        <Link to='/' className="capitalize text-blue p-2 bg-light flex items-center hover:text-white hover:bg-blue rounded-sm">
          <i className="fa-solid fa-house-user mr-2"></i>go home
        </Link>
    </div>
  )
}

export default NotFound