import React from 'react';
import "./Expiry.css";
import { InfoOutlinedIcon } from '../../icons/Icons'
import { Link } from 'react-router-dom';

function Expiry() {
    return (
        <div className="expiry">

            <div className="expiry__body">
                <div className="expiry__info">
                    <InfoOutlinedIcon />
                </div>


                <div className="expiry__text">

                    Your Carrotsuite trial ends in  <span>
                        7 days
                    </span>

                </div>

                <div className="expiry__plans">
                    <Link to="/billing">
                        Buy A Subscription
                    </Link>
                </div>

            </div>

        </div>
    )
}

export default Expiry