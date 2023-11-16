import React from "react";

const Loading = () => {
  return (
    <div className="bg-white/60 [backdrop-filter:blur(10px)] fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        {/* <!-- Outer circle --> */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="rgb(88, 28, 135)"
          stroke-width="4"
        />

        {/* <!-- Inner lines --> */}
        <line
          x1="50"
          y1="10"
          x2="50"
          y2="30"
          stroke="rgb(88, 28, 135)"
          stroke-width="4"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            repeatCount="indefinite"
            from="0 50 50"
            to="360 50 50"
          />
        </line>
        <line
          x1="50"
          y1="70"
          x2="50"
          y2="90"
          stroke="rgb(88, 28, 135)"
          stroke-width="4"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            repeatCount="indefinite"
            from="0 50 50"
            to="360 50 50"
          />
        </line>
        <line
          x1="10"
          y1="50"
          x2="30"
          y2="50"
          stroke="rgb(88, 28, 135)"
          stroke-width="4"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            repeatCount="indefinite"
            from="0 50 50"
            to="360 50 50"
          />
        </line>
        <line
          x1="70"
          y1="50"
          x2="90"
          y2="50"
          stroke="rgb(88, 28, 135)"
          stroke-width="4"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            repeatCount="indefinite"
            from="0 50 50"
            to="360 50 50"
          />
        </line>
      </svg>
    </div>
  );
};

export default Loading;
