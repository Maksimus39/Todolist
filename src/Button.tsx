import React from 'react';

type ButtonProps = {
    title: string;
    onClick: () => void;
    className?: string
}
export const Button = (props: ButtonProps) => {
    return <button onClick={props.onClick} className={props.className}>{props.title}</button>
};

