import React, { useEffect } from 'react';
import "./Paddle.css"

const PaddlePaymentButton = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.paddle.com/paddle/paddle.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const paddle = window.Paddle;
            paddle.Setup({ vendor: 156108 });
        };
    }, []);

    const handlePayment = () => {
        window.Paddle.Checkout.open({
            product: 757131,
            email: 'customer@example.com',
        });
    };

    return (
        <button className="checkout__btn" onClick={handlePayment}>Pay Now</button>
    );
};

export default PaddlePaymentButton;
