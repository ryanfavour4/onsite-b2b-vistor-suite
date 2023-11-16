import React, { useState } from "react";
import { Api } from "../../../axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/authSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";

export default function ApiKey() {
    const { apiKey, loading, getApiKey, copyToClipboard } = useApiKey();

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="bg-white min-h-[500px] p-10">
            <h1 className="text-black text-2xl m-2 mb-4">API Key</h1>
            <p className="mb-6">
                Generating an Api Key will enable you to be able to integrate
                with third party applications. Please note that the api key is
                only valid for users above the free plan
            </p>
            <button
                onClick={getApiKey}
                className="bg-lightblue hover:bg-blue text-white drop-shadow-md rounded-md p-2 flex justify-center items-center px-4 my-6"
            >
                Generate New Api Key
            </button>
            {apiKey && (
                <div className="border rounded border-light flex justify-between max-w-xl">
                    <p className="p-3">{apiKey}</p>
                    <p
                        className="cursor-pointer hover:bg-light p-3"
                        onClick={() => copyToClipboard()}
                    >
                        <i className="fa fa-clone" aria-hidden="true"></i>
                    </p>
                </div>
            )}
        </div>
    );
}

export const useApiKey = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const usersPlan = localStorage.getItem("User Plan") || "";
    const [apiKey, setApiKey] = useState("");
    const [loading, setLoading] = useState(false);

    const getApiKey = () => {
        if (["free plan", "basic plan"].includes(usersPlan.toLowerCase())) {
            toast("This plan cant access this feature. Upgrade your plan");
            return;
        } else {
            const confirm = window.confirm(
                "After Creating A new Api Key you will be automatically logged out. \n Are you sure you want to create A new Api Key ?"
            );
            if (confirm) {
                setLoading(true);
                Api.get("/users/generate-api-key")
                    .then((res) => {
                        setApiKey(res.data?.data?.api_key);
                        setLoading(false);
                    })
                    .catch((err) => {
                        setLoading(false);
                        console.log(err);
                    });
            }
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(apiKey);
        toast.success("Copied to clipboard");
        setTimeout(() => {
            dispatch(logout());
            navigate("/login");
        }, 1000);
    };

    return { apiKey, loading, setApiKey, getApiKey, copyToClipboard };
};
