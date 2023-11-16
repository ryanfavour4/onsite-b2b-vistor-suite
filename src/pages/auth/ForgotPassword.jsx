import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthLayout from "../../components/auth/AuthLayout";
import EnterEmail from "../../components/forgot-password/EnterEmail";
import { requestOtp } from "../../services/auth";
import ResetPassword from "../../components/forgot-password/ResetPassword";

const ForgotPassword = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <AuthLayout>
      <div className="sm:w-1/2 p-2 w-full">
        {isOtpSent
          ? <ResetPassword email={email} setEmail={setEmail} />
          : <EnterEmail
              isOtpSent={isOtpSent}
              setIsOtpSent={setIsOtpSent}
              email={email}
              setEmail={setEmail}
            />}
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
