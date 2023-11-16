import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Api } from '../../axios'
import "./CancelPlan.css"

function CancelPlan({ active, setActive, toggleReason, setToggleReason }) {

    const [reason, setReason] = useState("")
    const [activePlan, setActivePlan] = useState("")
    const [isFetching, setIsFetching] = useState(false)


    const handleReverseToggle = () => {
        setActive(false)
    }

    const handleSubmit = async () => {
        setIsFetching(true)

        try {

            await Api.post("plans/cancel", reason).then((res) => {
                console.log(res);
                window.location.href = "/billing"
                setIsFetching(false)

            })


        } catch (error) {
            setIsFetching(false)

            console.log(error);

        }


    }

    useEffect(() => {
        try {
            const fetchPlan = async () => {

                await Api.get("/users/current").then((res) => {
                    console.log(res.data.data.plan);
                    setActivePlan(res.data?.data.plan?.plan_name)
                })

            }

            fetchPlan()

        } catch (error) {
            console.log(error);

        }

    }, [activePlan])

    console.log(activePlan);

    return (
        <>

            {
                active ? (
                    <div className="cancelplan">

                        <div className="cancelplan__body">
                            <h2>
                                Do you really want to cancel subscription?
                            </h2>

                            <p>
                                Canceling subscription will remove all active plan from your account.
                                Your active plan is <span>
                                    {activePlan}
                                </span>
                            </p>

                            <div className="cancelplan__body__buttons">

                                <p onClick={handleReverseToggle}>

                                    No

                                </p>
                                <p onClick={() => setToggleReason(!toggleReason)}>
                                    Yes
                                </p>




                            </div>
                            {
                                toggleReason ? (

                                    <div className="cancelplan__body__form">
                                        <form>

                                            <input type="text"
                                                required
                                                value={reason}
                                                onChange={(e) => setReason(e.target.value)}
                                                placeholder="Enter reason..."
                                            />

                                        </form>

                                        <div className="cancelplan__btn__submit">

                                            <p onClick={handleSubmit}>

                                                {
                                                    isFetching ? (
                                                        <CircularProgress size={16} color="inherit" />
                                                    ) : " submit"
                                                }

                                            </p>



                                        </div>

                                    </div>
                                ) : null
                            }

                        </div>

                    </div>


                ) : null
            }

        </>
    )
}

export default CancelPlan