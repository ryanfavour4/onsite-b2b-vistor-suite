import React, { useEffect, useState } from "react";
import { Api } from "../../../axios";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";

function Notifications() {
    const { isLoading, allowSms, changeVisitorSmsHostNotification } =
        useConfiguration();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="bg-white min-h-[calc(100vh-64px)] p-5 pb-14">
            <h1 className="text-2xl my-2">Notifications</h1>
            <div className="flex justify-between">
                <p className="font-medium max-w-md">
                    Set up notification systems to alert visitors and host about
                    various events
                </p>
            </div>
            <form className="mt-12 grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                {/* // !!! ======== BOX TOGGLE BOX START !!!! ========== */}
                <div className="border p-3 rounded-md shadow-md w-[326px]">
                    <div>
                        <p className="font-medium">
                            New Visitor Notification to Host
                        </p>
                        <small
                            title="Notify The Visitor of their expected purpose of
                            visit"
                            className="ellipsis max-w-[300px]"
                        >
                            Notify The Visitor of their expected purpose of
                            visit
                        </small>
                    </div>
                    <label className="custom-toggle-switch mt-5">
                        <input
                            name="visitor_notif"
                            checked={allowSms}
                            onChange={() =>
                                changeVisitorSmsHostNotification(!allowSms)
                            }
                            type="checkbox"
                        />
                        <span className="custom-toggle-slider" />
                    </label>
                </div>
                {/* // !!! ======== BOX TOGGLE BOX END !!!! ========== */}

                {/* // !!! ======== BOX TOGGLE BOX START !!!! ========== */}
                <div className="border p-3 rounded-md shadow-md w-[326px] opacity-50">
                    <div>
                        <p className="font-medium">
                            Visitor SMS Welcome message
                        </p>
                        <small
                            title="Verify the signed in Visitors"
                            className="ellipsis max-w-[300px]"
                        >
                            Verify the signed in Visitors
                        </small>
                    </div>
                    <label className="custom-toggle-switch mt-5">
                        <input
                            name="signin_verification"
                            checked={false}
                            type="checkbox"
                        />
                        <span className="custom-toggle-slider" />
                    </label>
                </div>
                {/* // !!! ======== BOX TOGGLE BOX END !!!! ========== */}
            </form>
        </div>
    );
}

export default Notifications;

export type companyConfigType = {
    id: number;
    integrated_with_erp: boolean;
    company: number;
    branch_code: string;
    self_signout: boolean;
    exhibition_mode: boolean;
    integrateWithCarrotsuiteCo: boolean;
    auto_signout_all: boolean;
    host_notif: boolean;
    require_pre_reg: boolean;
    visitor_notif: boolean;
    signin_verification: boolean;
    frontdesk_notif: boolean;
    isPhoto_required: boolean;
    location: null;
    createdAt: Date;
    updatedAt: Date;
};

const useConfiguration = () => {
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [allowSms, setAllowSms] = useState(false);

    useEffect(() => {
        changeVisitorSmsHostNotification();
    }, []);

    // ????? ==================  ENABLE SMS SENDING =================== ????? //
    const changeVisitorSmsHostNotification = (toggle: boolean = true) => {
        setIsLoading(true);
        Api.get(`/settings/sms-status?enable=${toggle}`)
            .then((res) => {
                setAllowSms(res.data.data.allow_sms);
                toast.success("Visitor Sms to Host Updated Successfully");
                setBtnDisabled(true);
                setIsLoading(false);
            })
            .catch((err) => {
                toast.error(err.message || "Error Occurred");
                console.log(err);
                setIsLoading(false);
            });
    };

    return {
        allowSms,
        isLoading,
        btnDisabled,
        changeVisitorSmsHostNotification,
    };
};
