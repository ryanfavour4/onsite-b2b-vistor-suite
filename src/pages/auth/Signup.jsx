import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "../../components/auth/AuthLayout";
import { Api } from "../../axios";
import ButtonSpinner from "../../components/ButtonSpinner";
import { signup } from "../../services/auth";
import { VisibilityIcon, VisibilityOffIcon } from "../../icons/Icons";
import SearchableDropdown from "../../components/dropdowns/SearchableDropdown";
import { OpenFetch } from "../../openAxios";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);
  const [country, setCountry] = useState("");

  const [useCaseOptions, setUseCaseOptions] = useState([]);
  const [showPassword, setShowPassword] = useState(false); // Track password visibility state
  const [submitting, setSubmitting] = useState(false);

  const [loadingOptions, setLoadingOptions] = useState(false);
  const [selectOptions, setSelectOptions] = useState([]);
  const [select, setSelect] = useState([]);

  const [selectedUseCases, setSelectedUseCases] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUseCaseToggle = (useCaseValue) => {
    if (selectedUseCases.includes(useCaseValue)) {
      setSelectedUseCases(
        selectedUseCases.filter((useCase) => useCase !== useCaseValue)
      );
    } else {
      setSelectedUseCases([...selectedUseCases, useCaseValue]);
    }
  };

  useEffect(() => {
    // setLoadingOptions(true);
    try {
      const fetchCountryCodes = async () => {
        await OpenFetch.get("/country-codes").then((res) => {
          console.log(res.data);
          const arr = res.data?.codes?.map((id) => ({
            value: id,
            label: `+${id}`,
          }));
          setSelectOptions(arr);
          setSelect({ value: res.data.default, label: res.data.default });
        });
      };

      const fetchUseCases = async () => {
        await OpenFetch.get("options").then((res) => {
          console.log(res.data.data);
          setUseCaseOptions(res.data.data);
        });
      };

      const fetchCountryOptions = async () => {
        await OpenFetch.get("/country").then((res) => {
          console.log(res.data);
          const arr = res.data?.data?.map((c) => ({
            value: c.id,
            label: c.country,
          }));
          setCountryOptions(arr);
          setCountry({ value: res.data.default, label: res.data.default });
        });
      };
      fetchCountryCodes();
      fetchUseCases();
      fetchCountryOptions();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSignup = async (e) => {
    const payload = {
      companyName: companyName,
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
      phoneNumber: phoneNumber,
      selectedUseCases: selectedUseCases,
      country: country.value,
    };

    console.log(payload);
    e.preventDefault();

    setSubmitting(true);

    try {
      await signup(payload);

      toast.success("Account created successfully!.");
      toast.success("Account verification link sent to your mail!.");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="sm:w-1/2 p-2 w-full  h-[100vh] pt-[50px]">
        <div className="w-4/5 mx-auto block max-w-[500px] text-center sm:text-left ">
          <h2 className=" text-4xl text-black font-bold  mb-1">Join us</h2>

          <p className="text-md text-dark font-semibold mb-2">
            Hello! Please enter your details to join us.
          </p>
        </div>

        <form
          className="w-4/5 mx-auto block max-w-[500px]"
          onSubmit={handleSignup}
        >
          <div className="mb-4 flex w-full space-between">
            <div className=" flex-1">
              <label htmlFor="name" className="font-semibold text-black">
                First Name
              </label>
              <input
                type="text"
                value={firstname}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="Enter first name"
              />
            </div>
            <div className="ml-3 flex-1">
              <label htmlFor="name" className="font-semibold text-black">
                Last Name
              </label>
              <input
                type="text"
                value={lastname}
                className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="companyName" className="font-semibold text-black">
              Company name
            </label>
            <input
              type="text"
              value={companyName}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter your company name"
            />
          </div>

          {/* <div className="mb-4">
            <label htmlFor="phoneNumber" className="font-semibold text-black">
              Phone number
            </label>
            <input
              type="number"
              value={phoneNumber}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div> */}

          <label htmlFor="useCase" className="font-semibold text-black ">
            Phone number
          </label>
          <div className="flex">
            <div className="w-max mr-2">
              <SearchableDropdown
                loading={loadingOptions}
                options={selectOptions}
                selectedOption={select}
                setSelectedOption={setSelect}
                transparent={true}
              />
            </div>
            <input
              type="number"
              value={phoneNumber}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full mb-3"
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="123 4567 89"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="useCase" className="font-semibold text-black">
              country
            </label>
            <div className="flex flex-wrap gap-2">
              <SearchableDropdown
                options={countryOptions}
                loading={loadingOptions}
                selectedOption={country}
                setSelectedOption={setCountry}
                transparent={true}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="font-semibold text-black">
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
          <div className="mb-4">
            <label htmlFor="useCase" className="font-semibold text-black">
              Select use case
            </label>
            <div className="flex flex-wrap gap-2">
              {useCaseOptions?.map((option) => (
                <label className="flex items-center" key={option.id}>
                  <input
                    type="checkbox"
                    value={option.title}
                    checked={selectedUseCases.includes(option.title)}
                    onChange={() => handleUseCaseToggle(option.title)}
                  />
                  <span className="ml-1">{option.title}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="relative mb-4">
            <label htmlFor="password" className="font-semibold text-black">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block w-full"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              {showPassword ? (
                <p className="password__icon">
                  <VisibilityIcon />
                </p>
              ) : (
                <p className="password__icon">
                  <VisibilityOffIcon />
                </p>
              )}
            </span>
          </div>

          {/* {[].map(({ searchState, stateModifier, title, options }) => (
            <div className="w-1/5 min-w-[150px] mx-2 mb-2" key={options}>
              <p className="capitalize font-normal text-dark">{title}</p>
              <SearchableDropdown
                options={options}
                selectedOption={searchState}
                setSelectedOption={stateModifier}
              />
            </div>
          ))} */}

          {submitting ? (
            <ButtonSpinner />
          ) : (
            <button
              type="submit"
              className="w-full bg-lightblue py-3 rounded-md text-white hover:bg-blue text-lg  mt-3"
              onClick={handleSignup}
            >
              Signup
            </button>
          )}
        </form>

        <p className="text-center mt-5 text-dark">
          Have an account?
          <Link
            to="/login"
            className="px-1 font-semibold text-blue hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Signup;
