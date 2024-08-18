import Button from '@mui/material/Button'
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


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
                <input
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeItemHandler}
                    onKeyUp={addItemOnKeyUpHandler}
                />
                <Button variant="contained" onClick={addItemHandler}>
                    +
                </Button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
        </div>

    )
};

