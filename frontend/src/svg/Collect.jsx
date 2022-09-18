import React from "react";

function SVGCollect(props) {
    return (
        <svg
            width={"22"}
            height={"26"}
            viewBox={"0 0 22 26"}
            fill={"none"}
            {...props}
            className={"mr-20 cursor-pointer"}
        >
            <path
                d={"M15.625 22.375V24.3281C15.625 24.9753 15.1003 25.5 14.4531 25.5H1.17188C0.524658 25.5 0 24.9753 0 24.3281V6.35938C0 5.71216 0.524658 5.1875 1.17188 5.1875H4.6875V19.6406C4.6875 21.1484 5.91411 22.375 7.42188 22.375H15.625ZM15.625 5.57812V0.5H7.42188C6.77466 0.5 6.25 1.02466 6.25 1.67188V19.6406C6.25 20.2878 6.77466 20.8125 7.42188 20.8125H20.7031C21.3503 20.8125 21.875 20.2878 21.875 19.6406V6.75H16.7969C16.1523 6.75 15.625 6.22266 15.625 5.57812ZM21.5318 4.06304L18.312 0.843213C18.0922 0.623458 17.7941 0.500002 17.4833 0.5L17.1875 0.5V5.1875H21.875V4.89165C21.875 4.58086 21.7515 4.2828 21.5318 4.06304Z"}
                fill={"#C3C3C3"}
            />
        </svg>
    );
}

export default SVGCollect;
