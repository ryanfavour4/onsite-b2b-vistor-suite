import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { Api } from "../../../axios";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";

export default function Configuration() {
    const {
        loading,
        isLoading,
        configObject,
        btnDisabled,
        saveCompanyConfigChanges,
        handleCompanyConfigObjectChange,
    } = useConfiguration();

    if (loading || isLoading) {
        return <Loading />;
    }

    return (
        <div className="bg-white min-h-[calc(100vh-64px)] p-5 pb-14">
            <h1 className="text-2xl my-2">Configuration</h1>
            <div className="flex justify-between">
                <p className="font-medium max-w-md">
                    These Settings would conform to the company's notification
                    structure and visitor checking in requirements
                </p>
                <button
                    onClick={saveCompanyConfigChanges}
                    disabled={btnDisabled}
                    className="bg-lightblue text-white px-4 py-2 rounded-md mt-5 mr-5"
                >
                    Accept Changes
                </button>
            </div>
            <form className="mt-12 grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                {/* // !!! ======== BOX TOGGLE BOX START !!!! ========== */}
                <div className="border p-3 rounded-md shadow-md w-[326px]">
                    <div className="">
                        <p className="font-medium">Auto Sign Out All</p>
                        <small
                            title="All Visitors will automatically be signed out"
                            className="ellipsis max-w-[300px]"
                        >
                            All Visitors will automatically be signed out
                        </small>
                    </div>
                    <label className="custom-toggle-switch mt-5">
                        <input
                            name="auto_signout_all"
                            checked={configObject.auto_signout_all}
                            onChange={handleCompanyConfigObjectChange}
                            type="checkbox"
                        />
                        <span className="custom-toggle-slider" />
                    </label>
                </div>
                {/* // !!! ======== BOX TOGGLE BOX END !!!! ========== */}
                {/* // !!! ======== BOX TOGGLE BOX START !!!! ========== */}
                <div className="border p-3 rounded-md shadow-md w-[326px]">
                    <div>
                        <p className="font-medium">Exhibition Mode</p>
                        <small
                            title="Enable Exhibition Mode for ease of checking in a
                            visitor"
                            className="ellipsis max-w-[300px]"
                        >
                            Enable Exhibition Mode for ease of checking in a
                            visitor
                        </small>
                    </div>
                    <label className="custom-toggle-switch mt-5">
                        <input
                            name="exhibition_mode"
                            checked={configObject.exhibition_mode}
                            onChange={handleCompanyConfigObjectChange}
                            type="checkbox"
                        />
                        <span className="custom-toggle-slider" />
                    </label>
                </div>
                {/* // !!! ======== BOX TOGGLE BOX END !!!! ========== */}
                {/* // !!! ======== BOX TOGGLE BOX START !!!! ========== */}
                <div className="border p-3 rounded-md shadow-md w-[326px]">
                    <div>
                        <p className="font-medium">Front Desk Notification</p>
                        <small
                            title="Front Desk Notification notifies the front desk staffs about any incoming visitor"
                            className="ellipsis max-w-[300px]"
                        >
                            Front Desk Notification notifies the front desk
                            staffs about any incoming visitor
                        </small>
                    </div>
                    <label className="custom-toggle-switch mt-5">
                        <input
                            name="frontdesk_notif"
                            checked={configObject.frontdesk_notif}
                            onChange={handleCompanyConfigObjectChange}
                            type="checkbox"
                        />
                        <span className="custom-toggle-slider" />
                    </label>
                </div>
                {/* // !!! ======== BOX TOGGLE BOX END !!!! ========== */}
                {/* // !!! ======== BOX TOGGLE BOX START !!!! ========== */}
                <div className="border p-3 rounded-md shadow-md w-[326px]">
                    <div>
                        <p className="font-medium">Host Notification</p>
                        <small
                            title="Notify The Host of this visitor to know when their expected visitor is around"
                            className="ellipsis max-w-[300px]"
                        >
                            Notify The Host of this visitor to know when their
                            expected visitor is around
                        </small>
                    </div>
                    <label className="custom-toggle-switch mt-5">
                        <input
                            name="host_notif"
                            checked={configObject.host_notif}
                            onChange={handleCompanyConfigObjectChange}
                            type="checkbox"
                        />
                        <span className="custom-toggle-slider" />
                    </label>
                </div>
                {/* // !!! ======== BOX TOGGLE BOX END !!!! ========== */}
                {/* // !!! ======== BOX TOGGLE BOX START !!!! ========== */}
                <div className="border p-3 rounded-md shadow-md w-[326px]">
                    <div>
                        <p className="font-medium">Photo Required</p>
                        <small
                            title="Specify If it is necessary or not for a visitor to provide thier pictures or documents of any kind"
                            className="ellipsis max-w-[300px]"
                        >
                            Specify If it is necessary or not for a visitor to
                            provide their pictures or documents of any kind
                        </small>
                    </div>
                    <label className="custom-toggle-switch mt-5">
                        <input
                            name="isPhoto_required"
                            checked={configObject.isPhoto_required}
                            onChange={handleCompanyConfigObjectChange}
                            type="checkbox"
                        />
                        <span className="custom-toggle-slider" />
                    </label>
                </div>
                {/* // !!! ======== BOX TOGGLE BOX END !!!! ========== */}
                {/* // !!! ======== BOX TOGGLE BOX START !!!! ========== */}
                <div className="border p-3 rounded-md shadow-md w-[326px]">
                    <div>
                        <p className="font-medium">Required Pre-Register</p>
                        <small
                            title="Visitors needs to register at least 24 hours before the check in day"
                            className="ellipsis max-w-[300px]"
                        >
                            Visitors needs to register at least 24 hours before
                            the check in day
                        </small>
                    </div>
                    <label className="custom-toggle-switch mt-5">
                        <input
                            name="require_pre_reg"
                            checked={configObject.require_pre_reg}
                            onChange={handleCompanyConfigObjectChange}
                            type="checkbox"
                        />
                        <span className="custom-toggle-slider" />
                    </label>
                </div>
                {/* // !!! ======== BOX TOGGLE BOX END !!!! ========== */}
                {/* // !!! ======== BOX TOGGLE BOX START !!!! ========== */}
                <div className="border p-3 rounded-md shadow-md w-[326px]">
                    <div>
                        <p className="font-medium">Sign In Verification</p>
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
                            checked={configObject.signin_verification}
                            onChange={handleCompanyConfigObjectChange}
                            type="checkbox"
                        />
                        <span className="custom-toggle-slider" />
                    </label>
                </div>
                {/* // !!! ======== BOX TOGGLE BOX END !!!! ========== */}
                {/* // !!! ======== BOX TOGGLE BOX START !!!! ========== */}
                <div className="border p-3 rounded-md shadow-md w-[326px]">
                    <div>
                        <p className="font-medium">Visitor Notification</p>
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
                            checked={configObject.visitor_notif}
                            onChange={handleCompanyConfigObjectChange}
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
    const { data, loading }: { data: any; loading: boolean } = useFetch(
        "/settings/company-config",
        []
    );
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [configObject, setConfigObject] = useState({
        auto_signout_all: data?.data.auto_signout_all,
        host_notif: data?.data?.host_notif,
        require_pre_reg: data?.data?.require_pre_reg,
        visitor_notif: data?.data?.visitor_notif,
        signin_verification: data?.data?.signin_verification,
        frontdesk_notif: data?.data?.frontdesk_notif,
        exhibition_mode: data?.data?.exhibition_mode,
        isPhoto_required: data?.data?.isPhoto_required,
    });

    const handleCompanyConfigObjectChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setConfigObject({
            ...configObject,
            [e.target.name]: e.target.checked,
        });

        setBtnDisabled(false);
    };

    useEffect(() => {
        setConfigObject({
            auto_signout_all: data?.data.auto_signout_all,
            host_notif: data?.data?.host_notif,
            require_pre_reg: data?.data?.require_pre_reg,
            visitor_notif: data?.data?.visitor_notif,
            signin_verification: data?.data?.signin_verification,
            frontdesk_notif: data?.data?.frontdesk_notif,
            exhibition_mode: data?.data?.exhibition_mode,
            isPhoto_required: data?.data?.isPhoto_required,
        });
    }, [loading, data]);

    const saveCompanyConfigChanges = () => {
        setIsLoading(true);
        Api.put("/settings/company-config", configObject)
            .then((res) => {
                console.log(res);
                toast.success("Company Config Updated Successfully");
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
        loading,
        isLoading,
        configObject,
        btnDisabled,
        saveCompanyConfigChanges,
        handleCompanyConfigObjectChange,
    };
};
