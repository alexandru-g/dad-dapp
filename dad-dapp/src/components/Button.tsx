import React from "react";

type Props = {
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: Props) => {

    return (
        <button
            className='p-4 hover:bg-blue-200 hover:text-black transition-all duration-300 mx-4'
            {...props}
            >
            <div>{props.children}</div>
        </button>
    )
};

export default Button;
