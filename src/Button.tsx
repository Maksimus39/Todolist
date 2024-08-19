import React from 'react';
import Button from '@mui/material/Button';

type ButtonProps = {
    title: string;
    onClick: () => void;
    variant?: 'text' | 'outlined' | 'contained';
    color: 'inherit' | 'primary' | 'secondary';
}

export const Buttonn = (props: ButtonProps) => {
    return (
        <Button
            variant={props.variant}
            color={props.color}
            onClick={props.onClick}
        >
            {props.title}
        </Button>
    );
};

