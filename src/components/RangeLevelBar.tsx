import React, { useEffect, useState } from "react";

type prop = {
    min: number;
    max: number;
    val: number;
};

const RangeLevelBar = ({ min, max, val }: prop) => {
    const [value, setValue] = useState(50); // Initial value
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            // Calculate the value based on mouse position
            const slider = document.getElementById("slider"); // Get the slider element
            const rect = slider?.getBoundingClientRect();
            if (rect) {
                const offsetX = e.clientX - rect.left;
                const sliderWidth = slider?.clientWidth || 0;
                const newValue = Math.min(
                    100,
                    Math.max(0, (offsetX / sliderWidth) * 100)
                );

                // setValue(Math.ceil(newValue));
            }
        }
    };

    const percentage = Math.ceil(((value - min) / (max - min)) * 100);
    useEffect(() => {
        console.log(percentage);
        setValue(val);
    }, [val]);

    return (
        <div
            id="slider"
            className="custom-slider"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div
                className="slider-track"
                style={{
                    background: `linear-gradient(to right, #b6b1cd ${percentage}%, #333 ${
                        percentage / 2
                    }%)`,
                }}
            >
                <div
                    className="slider-thumb"
                    style={{
                        left: `${percentage}%`,
                        transform: `translateX(${percentage > 50 && -110}%)`,
                    }}
                >
                    {percentage} %
                </div>
            </div>
        </div>
    );
};

export default RangeLevelBar;
