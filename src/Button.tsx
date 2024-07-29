import React from 'react';

type ButtonProps = {
    title: string;
    onClick?: () => void;
}
export const Button = (props: ButtonProps) => {
    return <button onClick={props.onClick}>{props.title}</button>
};

