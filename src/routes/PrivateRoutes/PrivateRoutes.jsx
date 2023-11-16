import { useSelector } from "react-redux";
import NotFound from "../../pages/NotFound";

import SuperAdminRoutes from "./SuperAdminRoutes";
import StaffRoutes from "./StaffRoutes";

const PrivateRoutes = () => {
  const {
    userData: { role },
  } = useSelector((state) => state.auth);

  console.log("role", role);

  if (
    role === "GLOBAL_ADMIN" ||
    role === "EMPLOYEE" ||
    role == "BRANCH_ADMIN"
  ) {
    return <StaffRoutes />;
  }

  if (role === "SUPER ADMIN") {
    return <SuperAdminRoutes />;
  }

  return <NotFound />;
};

export default PrivateRoutes;
