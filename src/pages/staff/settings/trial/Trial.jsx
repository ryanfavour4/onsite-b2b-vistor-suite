import React from 'react'
import { Calendar } from '../../../../images/Image'
import "./Trial.css"
import { Link } from "react-router-dom";



function Trial() {
    return (
        <div className="trial">

            <div className="trial__container">

                <div className="trial__container__img">
                    <img src={Calendar} alt="" />

                </div>

                <div className="trial__container__body">

                    <h3>
                        Your free trial has expired
                    </h3>

                    <p>
                        Your free trial to Basic Plan has expired.

                    </p>

                    <p>
                        You no longer have access to all the exclusive features obtainable on the Basic Plan.
                    </p>

                    <p>
                        Your account has been downgraded to the free plan with a maximum of 5 employees.

                    </p>

                    <p>
                        Let’s change this, to continue having access to the Basic Plan, you need to subscribe now.   </p>

                </div>

                <div className="trial__container__footer">

                    <Link to="/contact">

                        <p>
                            talk with us first
                        </p>
                    </Link>



                    <Link to="/billing">
                        <p>
                            Continue, Subscribe Now
                        </p>
                    </Link>

                </div>



            </div>





        </div>
    )
}

export default Trial