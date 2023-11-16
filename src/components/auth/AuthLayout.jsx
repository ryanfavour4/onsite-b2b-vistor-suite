import AuthRight from "./AuthRight";
const AuthLayout = ({ children }) => {
  return (
    // <div className="h-screen flex items-center justify-center sm:flex-row-reverse flex-col">
    //   <AuthRight />
    //   {children}
    // </div>

    <div className="h-screen flex items-center sm:flex-row-reverse flex-col ">
      <AuthRight />
      {children}
    </div>
  );
};

export default AuthLayout;
