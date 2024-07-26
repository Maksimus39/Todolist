import React from 'react';

type ButtonProps = {
    title: string;
}
export const Button = (props: ButtonProps) => {
    return <button>{props.title}</button>
};

