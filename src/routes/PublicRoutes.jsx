import { Routes, Route, Navigate } from "react-router-dom"
import NotFound from "../pages/NotFound"

import Login from "../pages/auth/Login"
import Signup from "../pages/auth/Signup"
import ForgotPassword from "../pages/auth/ForgotPassword"
import NewPassword from "../pages/auth/NewPassword"
import VisitorEBadge from "../components/visitor-e-badge/VisitorEBadge"
import VerifyEmail from "../pages/auth/ResendVerification"
import ResendVerification from "../pages/auth/ResendVerification"


const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to='/login' />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/visitor-ebadge/:visitorId" element={<VisitorEBadge />} />
      <Route path="/resend-verification-link" element={<ResendVerification />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default PublicRoutes