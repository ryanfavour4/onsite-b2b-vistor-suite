import React, { useState, useEffect } from "react";

const Mobile = () => {
  const [welcomeText, setWelcomeText] = useState('')
  const [checkIn, setCheckIn] = useState({ btnColor: '', btnBg: '', btnText: '' })
  const [checkOut, setCheckOut] = useState({ btnColor: '', btnBg: '', btnText: '' })
  const [visitor, setVisitor] = useState({ btnColor: '', btnBg: '', btnText: '' })
  const [invitee, setInvitee] = useState({ btnColor: '', btnBg: '', btnText: '' })
  const [staff, setStaff] = useState({ btnColor: '', btnBg: '', btnText: '' })


  return (
    <div className="py-8 px-4 bg-white m-6 rounded-md">


      <div className="my-4 mx-4 w-max">
        <label htmlFor="welcomeText" className="font-semibold text-black">
          Welcome Text
        </label>
        <input
          type="text"
            value={welcomeText}
          className="bg-transparent p-3 outline-none flex-1 text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block "
            onChange={(e) => setWelcomeText(e.target.value)}
          placeholder="Enter welcome text"
        />
        <button
          className="w-max px-8 bg-lightblue py-2 rounded-md text-white hover:bg-lightblue text-lg mt-3 w-full"
        // onClick={submitwelTxt}
        >
          Save
        </button>
      </div>

      {/* CHECK IN BUTTON */}
      <div className="my-6  bg-lightest rounded-md p-4">
        <h3 className="text-dark font-semibold text-xl underline">Check In</h3>

        <div className="py-4 ">
          <div className="mb-4 flex items-center">
            <label htmlFor="welcomeText" className="font-semibold text-dark">
              Button Color
            </label>
            <input
              type="text"
              value={checkIn.btnColor}
              className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block mx-3"
              onChange={(e) => setCheckIn({ ...checkIn, btnColor: e.target.value })}
              placeholder="Enter button color"
            />
            <input
              type="color"
              value={checkIn.btnColor}
              className="h-12 p-2 rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue "
              onChange={(e) => setCheckIn({ ...checkIn, btnColor: e.target.value })}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="welcomeText" className="font-semibold text-dark">
              Button Background Color
            </label>
            <input
              type="text"
              value={checkIn.btnBg}
              className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block mx-3"
              onChange={(e) => setCheckIn({ ...checkIn, btnBg: e.target.value })}
              placeholder="Enter button background color"
            />
            <input
              type="color"
              value={checkIn.btnBg}
              className="h-12 p-2 rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue "
              onChange={(e) => setCheckIn({ ...checkIn, btnBg: e.target.value })}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="welcomeText" className="font-semibold text-dark">
              Button Text
            </label>
            <input
              type="text"
              value={checkIn.btnText}
              className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block mx-3"
              onChange={(e) => setCheckIn({ ...checkIn, btnText: e.target.value })}
              placeholder="Enter button text"
            />
          </div>
        </div>
      </div>


      {/* CHECK OUT BUTTON */}
      <div className="my-6  bg-lightest rounded-md p-4">
        <h3 className="text-dark font-semibold text-xl underline">Check Out</h3>

        <div className="py-4 ">
          <div className="mb-4 flex items-center">
            <label htmlFor="welcomeText" className="font-semibold text-dark">
              Button Color
            </label>
            <input
              type="text"
              value={checkOut.btnColor}
              className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block mx-3"
              onChange={(e) => setCheckOut({ ...checkOut, btnColor: e.target.value })}
              placeholder="Enter button color"
            />
            <input
              type="color"
              value={checkOut.btnColor}
              className="h-12 p-2 rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue "
              onChange={(e) => setCheckOut({ ...checkOut, btnColor: e.target.value })}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="welcomeText" className="font-semibold text-dark">
              Button Background Color
            </label>
            <input
              type="text"
              value={checkOut.btnBg}
              className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block mx-3"
              onChange={(e) => setCheckOut({ ...checkOut, btnBg: e.target.value })}
              placeholder="Enter button background color"
            />
            <input
              type="color"
              value={checkOut.btnBg}
              className="h-12 p-2 rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue "
              onChange={(e) => setCheckOut({ ...checkOut, btnBg: e.target.value })}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="welcomeText" className="font-semibold text-dark">
              Button Text
            </label>
            <input
              type="text"
              value={checkIn.btnText}
              className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block mx-3"
              onChange={(e) => setCheckIn({ ...checkIn, btnText: e.target.value })}
              placeholder="Enter button text"
            />
          </div>
        </div>

      </div>

      {/* VISITOR BUTTON */}
      <div className="my-6  bg-lightest rounded-md p-4">
        <h3 className="text-dark font-semibold text-xl underline">Visitor</h3>

        <div className="py-4 ">
          <div className="mb-4 flex items-center">
            <label htmlFor="welcomeText" className="font-semibold text-dark">
              Button Color
            </label>
            <input
              type="text"
              value={visitor.btnColor}
              className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block mx-3"
              onChange={(e) => setVisitor({ ...visitor, btnColor: e.target.value })}
              placeholder="Enter button color"
            />
            <input
              type="color"
              value={visitor.btnColor}
              className="h-12 p-2 rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue "
              onChange={(e) => setVisitor({ ...visitor, btnColor: e.target.value })}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="welcomeText" className="font-semibold text-dark">
              Button Background Color
            </label>
            <input
              type="text"
              value={visitor.btnBg}
              className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block mx-3"
              onChange={(e) => setVisitor({ ...visitor, btnBg: e.target.value })}
              placeholder="Enter button background color"
            />
            <input
              type="color"
              value={visitor.btnBg}
              className="h-12 p-2 rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue "
              onChange={(e) => setVisitor({ ...visitor, btnBg: e.target.value })}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="welcomeText" className="font-semibold text-dark">
              Button Text
            </label>
            <input
              type="text"
              value={visitor.btnText}
              className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block mx-3"
              onChange={(e) => setVisitor({ ...visitor, btnText: e.target.value })}
              placeholder="Enter button text"
            />
          </div>
        </div>

      </div>

      {/* INVITEE BUTTON */}
      <div className="my-6  bg-lightest rounded-md p-4">
        <h3 className="text-dark font-semibold text-xl underline">Invitee</h3>

        <div className="py-4 ">
          <div className="mb-4 flex items-center">
            <label htmlFor="welcomeText" className="font-semibold text-dark">
              Button Color
            </label>
            <input
              type="text"
              value={invitee.btnColor}
              className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block mx-3"
              onChange={(e) => setInvitee({ ...invitee, btnColor: e.target.value })}
              placeholder="Enter button color"
            />
            <input
              type="color"
              value={invitee.btnColor}
              className="h-12 p-2 rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue "
              onChange={(e) => setInvitee({ ...invitee, btnColor: e.target.value })}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="welcomeText" className="font-semibold text-dark">
              Button Background Color
            </label>
            <input
              type="text"
              value={invitee.btnBg}
              className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block mx-3"
              onChange={(e) => setInvitee({ ...invitee, btnBg: e.target.value })}
              placeholder="Enter button background color"
            />
            <input
              type="color"
              value={invitee.btnBg}
              className="h-12 p-2 rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue "
              onChange={(e) => setInvitee({ ...invitee, btnBg: e.target.value })}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="welcomeText" className="font-semibold text-dark">
              Button Text
            </label>
            <input
              type="text"
              value={invitee.btnText}
              className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block mx-3"
              onChange={(e) => setInvitee({ ...invitee, btnText: e.target.value })}
              placeholder="Enter button text"
            />
          </div>
        </div>

      </div>

      {/* STAFF BUTTON */}
      <div className="my-6  bg-lightest rounded-md p-4">
        <h3 className="text-dark font-semibold text-xl underline">Staff</h3>

        <div className="py-4 ">
          <div className="mb-4 flex items-center">
            <label htmlFor="welcomeText" className="font-semibold text-dark">
              Button Color
            </label>
            <input
              type="text"
              value={staff.btnColor}
              className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block mx-3"
              onChange={(e) => setStaff({ ...staff, btnColor: e.target.value })}
              placeholder="Enter button color"
            />
            <input
              type="color"
              value={staff.btnColor}
              className="h-12 p-2 rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue "
              onChange={(e) => setStaff({ ...staff, btnColor: e.target.value })}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="welcomeText" className="font-semibold text-dark">
              Button Background Color
            </label>
            <input
              type="text"
              value={staff.btnBg}
              className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block mx-3"
              onChange={(e) => setStaff({ ...staff, btnBg: e.target.value })}
              placeholder="Enter button background color"
            />
            <input
              type="color"
              value={staff.btnBg}
              className="h-12 p-2 rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue "
              onChange={(e) => setStaff({ ...staff, btnBg: e.target.value })}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="welcomeText" className="font-semibold text-dark">
              Button Text
            </label>
            <input
              type="text"
              value={staff.btnText}
              className="bg-transparent p-3 outline-none text-black rounded-lg border-solid border-[1px] border-lightestblue focus:border-blue block mx-3"
              onChange={(e) => setStaff({ ...staff, btnText: e.target.value })}
              placeholder="Enter button text"
            />
          </div>
        </div>


      </div>
        <button
          className="w-max px-12 bg-lightblue py-2 rounded-md text-white hover:bg-lightblue text-lg mt-3"
        >
          Save
        </button>


    </div>
  );
};

export default Mobile;
