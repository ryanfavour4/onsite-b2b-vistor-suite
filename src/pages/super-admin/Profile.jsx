import { useEffect, useState } from "react";
import avatar from "../../assets/defaultAvatar.png";
import TableActionDropdown from "../../components/dropdowns/TableActionDropdown";
import EditProfileModal from "../../components/modals/EditProfileModal";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import ChangePasswordModal from "../../components/modals/ChangePasswordModal";
import { useDispatch } from "react-redux";
import { Api } from "../../axios";

const Profile = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const stat = localStorage.getItem("auth");
  const [role, setRole] = useState(JSON.parse(stat).userData.role);

  const checkStatus = () => {
    try {
      const data = localStorage.getItem("auth");

      let main = JSON.parse(data);
      setRole(main?.userData.role);
      // console.log(role);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkStatus();
  }, [role]);

  const { loading, data, error } = useFetch(
    role == "GLOBAL_ADMIN" ? "users/current" : "admin/profile",
    [refresh]
  );
  const [userPosition, setUserPosition] = useState("");
  const id = data?.data?.user?.position;

  Api.get(`settings/position/${id}`).then((res) => {
    setUserPosition(res.data.position?.position);
  });

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (data) {
  //     dispatch(getProfileDetails({ user: data.user, location: data.location, phone_number: data.phone_number }))
  //   }
  // }, [data])

  if (loading) return <Loading />;

  if (error) return <Error message={error?.message} />;

  console.log("first time", data);

  const profileFields = [
    { title: "email", value: data.data[0]?.email },
    { title: "name", value: data.data[0]?.name },
    { title: "role", value: data.data[0]?.role },
  ];

  return (
    <div className="flex p-5 bg-lightest flex-wrap justify-center sm:justify-start min-h-[calc(100vh-64px)]">
      <div className="flex bg-white rounded-md p-10 flex-col h-max text-center mr-4 mb-6 xs:mb-0 drop-shadow-md">
        <TableActionDropdown
          itemsArr={[
            { title: "edit", func: () => setShowEditModal(true) },
            {
              title: "change password",
              func: () => setShowChangePasswordModal(true),
            },
          ]}
        />

        <div className="rounded-[50%] h-40 w-40 m-10 border border-light drop-shadow-md">
          <img
            src={avatar}
            className="h-full w-full object-cover rounded-[50%]"
          />
        </div>

        <h3 className="font-bold text-2xl">
          {data.data.user?.first_name} {data.data.user?.last_name}
        </h3>
        <p>{userPosition}</p>
        <p>{data.user?.address}</p>
      </div>

      <div className=" bg-white rounded-md p-10 w-[50vw] h-max min-w-[350px] drop-shadow-md mr-4">
        {profileFields?.map(({ title, value }) => {
          return (
            <div
              className="flex border-lightblue p-3 border-solid border-b-[1px]"
              key={value}
            >
              <h3 className="w-2/6 font-semibold capitalize">{title}</h3>
              <p className="w-4/6">{value}</p>
            </div>
          );
        })}
        <button
          type="button"
          className="bg-blue text-white border-none outline-none px-6 py-3 rounded-lg mt-3"
          onClick={() => setShowEditModal(true)}
        >
          Edit
        </button>
      </div>

      <EditProfileModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        data={{
          ...data.data.user,
          phone_number: data.data.user?.phone_number,
          address: data.data.user?.address,
        }}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <ChangePasswordModal
        showModal={showChangePasswordModal}
        setShowModal={setShowChangePasswordModal}
      />
    </div>
  );
};

export default Profile;
