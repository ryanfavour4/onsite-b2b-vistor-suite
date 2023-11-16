import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";

export default function EventAnalysis() {
    const { data, loading } = useEventAnalysis();

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="bg-white p-6 min-h-[calc(100vh-64px)]">
            <Link to="/events/list-events">&lt; Back to Events</Link>
            <h1 className="text-2xl font-bold py-4">Event Analysis</h1>
            <hr className="my-4 border-blue" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-4">
                <div className="bg-white rounded-lg shadow-md px-6 py-4 w-[300px] flex flex-col gap-6">
                    <h3 className="font-semibold capitalize">
                        number of registered attendees
                    </h3>
                    <h2 className="text-4xl font-semibold">
                        {data["number of registered attendees"]}
                    </h2>
                </div>
                <div className="bg-white rounded-lg shadow-md px-6 py-4 w-[300px] flex flex-col gap-6">
                    <h3 className="font-semibold capitalize">
                        number of attendees
                    </h3>
                    <h2 className="text-4xl font-semibold">
                        {data["number of attendees"]}
                    </h2>
                </div>
                <div className="bg-white rounded-lg shadow-md px-6 py-4 w-[300px] flex flex-col gap-6">
                    <h3 className="font-semibold capitalize">
                        number of check-ins before event start time
                    </h3>
                    <h2 className="text-4xl font-semibold">
                        {data["number of check-ins before event start time"]}
                    </h2>
                </div>
                <div className="bg-white rounded-lg shadow-md px-6 py-4 w-[300px] flex flex-col gap-6">
                    <h3 className="font-semibold capitalize">
                        number of check-ins after event start time
                    </h3>
                    <h2 className="text-4xl font-semibold">
                        {data["number of check-ins after event start time"]}
                    </h2>
                </div>
                <div className="bg-white rounded-lg shadow-md px-6 py-4 w-[300px] flex flex-col gap-6">
                    <h3 className="font-semibold capitalize">
                        number of males
                    </h3>
                    <h2 className="text-4xl font-semibold">
                        {data["number of males"]}
                    </h2>
                </div>
                <div className="bg-white rounded-lg shadow-md px-6 py-4 w-[300px] flex flex-col gap-6">
                    <h3 className="font-semibold capitalize">
                        number of females
                    </h3>
                    <h2 className="text-4xl font-semibold">
                        {data["number of females"]}
                    </h2>
                </div>
            </div>
        </div>
    );
}

// ???_________________________________________EVENT ANALYSIS CONTROLLER___________________________________
// ???_________________________________________EVENT ANALYSIS CONTROLLER___________________________________
export const useEventAnalysis = () => {
    const paramId = useParams().eventId;
    const { data, loading } = useFetch(`/events/analysis/${paramId}`, [
        paramId,
    ]);

    return { data, loading };
};
