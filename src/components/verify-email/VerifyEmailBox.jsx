const VerifyEmailBox = ({ setIsEmailVerified}) => {

  return (
    <div className="w-4/5 mx-auto max-w-[500px] p-5 rounded-xl">
      <div className="text-center text-2xl">
        <h2 className="font-bold">Check your email</h2>
        <p className="text-sm mt-1 mb-2">
          To continue your journey with us, you need to verify your email
        </p>
      </div>

      <button
        type="button"
        className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue text-lg"
        onClick={() => setIsEmailVerified(true)}
      >
        Verify Email
      </button>

    </div>
  );
};

export default VerifyEmailBox;
