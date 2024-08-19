import AddBoxIcon from '@mui/icons-material/AddBox'
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";


type PropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: PropsType) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    // функция добавления таски
    const addItemHandler = () => {
        if (taskTitle.trim() !== '') {
            props.addItem(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    // функция ввода
    const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    // функция добавления таски по нажатию на энтер
    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>

            <div>
                <TextField
                    label="Enter a title"
                    variant={'outlined'}
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    size={'small'}
                    error={!!error}
                    helperText={error}
                    onChange={changeItemHandler}
                    onKeyUp={addItemOnKeyUpHandler}
                />
                <IconButton onClick={addItemHandler} color={'primary'}>
                    <AddBoxIcon />
                </IconButton>
            </div>
        </div>

    )
};

