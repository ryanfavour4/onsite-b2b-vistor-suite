import logo from "../../assets/carrotsuite.png";
const AuthRight = () => {
  return (
    <div className="flex sm:flex sm:w-1/2 sm:bg-lightest h-max sm:h-screen text-center flex-col justify-center relative items-center ">
      <div className="w-max h-16 sm:h-32 mb-6 sm:mb-0  ">
        <img src={logo} className="h-full w-full object-contain " />
      </div>
    </div>
  );
};

export default AuthRight;
