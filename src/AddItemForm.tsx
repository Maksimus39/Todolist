import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";

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
                <Button
                    title={'+'}
                    onClick={addItemHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
        </div>

    )
};

