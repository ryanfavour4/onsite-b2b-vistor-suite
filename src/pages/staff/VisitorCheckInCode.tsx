import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Api } from "../../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function VisitorCheckInCode() {
    const { loading, inviteCode, setInviteCode, submitInviteCode } =
        useVisitorCheckInCode();

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="bg-white min-h-[500px] p-10">
            <h1 className="text-black text-2xl m-2 mb-4">
                INVITE CHECK IN CODE
            </h1>
            <p className="mb-6">
                Place your invite code in the input and submit to register your
                check in presence
            </p>
            <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="w-full border p-2 rounded max-w-md mb-4"
                placeholder="invite code here. eg 67864"
            />
            <button
                onClick={submitInviteCode}
                className="bg-lightblue hover:bg-blue text-white drop-shadow-md rounded-md p-2 flex justify-center items-center px-4"
            >
                Submit
            </button>
        </div>
    );
}

export const useVisitorCheckInCode = () => {
    const [inviteCode, setInviteCode] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const usersCurrent = JSON.parse(localStorage.getItem("User Current") || "");
    const [inviteModeOn, setInviteModeOn] = useState(
        Number(usersCurrent?.user?.company_invite_mode) === 1 ? true : false
    );

    useEffect(() => {
        // ?? =============== GETTING USER CURRENT PLAN TO SAVE FROM THE GENESIS OF THE PAGE ======= ??//
        const fetchPlan = async () => {
            await Api.get("/users/current").then((res) => {
                if (
                    Number(res.data?.data?.user?.company_invite_mode) === 1
                        ? true
                        : false
                ) {
                    navigate(`/visitor-checkin-code`);
                } else if (
                    Number(res.data?.data?.user?.company_invite_mode) === 0
                        ? true
                        : false
                ) {
                    navigate(`/visitor-log/add-visitor-checkin`);
                }
                console.log(
                    Number(res.data?.data?.user?.company_invite_mode) === 0
                        ? true
                        : false
                );
            });
        };
        fetchPlan();
    }, []);

    const submitInviteCode = () => {
        Api.post("/visitor/invitee/check-in")
            .then((res) => {
                toast.success("Invite Code Success");
                setLoading(false);
            })
            .catch((err) => {
                toast.success(err.message || "Invite Code Success");
                setLoading(false);
                console.log(err);
            });
    };

    return { inviteCode, loading, setInviteCode, submitInviteCode };
};
