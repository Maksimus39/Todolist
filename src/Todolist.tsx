import {Button} from "./Button";
import {FilterValuesType} from "./App";
import {ChangeEvent, useState, KeyboardEvent} from "react";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistProps = {
    title: string,
    tasks: TasksType[]
    filter: string

    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, taskStatus: boolean) => void
}

export const Todolist = (props: TodolistProps) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    // функция добавления таски
    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            props.addTask(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    // функция ввода
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    // функция добавления таски по нажатию на энтер
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    // функция для кнопок фильтрации
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        props.changeFilter(filter)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                />
                <Button
                    title={'+'}
                    onClick={addTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <div>
                {props.tasks?.length === 0 ? (
                    <p>Тасок нет</p>
                ) : <ul>
                    {props.tasks.map(task => {
                        // функция удаления таски
                        const removeTaskHandler = () => {
                            props.removeTask(task.id)
                        }

                        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = event.currentTarget.checked; // Используем checked вместо value
                            props.changeTaskStatus(task.id, newStatusValue);
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={changeTaskStatusHandler}
                                />
                                <span>{task.title}</span>
                                <Button title={'X'} onClick={removeTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
                }
            </div>
            <div>
                <Button
                    className={props.filter === 'All' ? 'active-filter' : ''}
                    title={'All'}
                    onClick={() => {
                        changeFilterTasksHandler('All')
                    }}/>
                <Button
                    className={props.filter === 'Active' ? 'active-filter' : ''}
                    title={'Active'}
                    onClick={() => {
                        changeFilterTasksHandler('Active')
                    }}/>
                <Button
                    className={props.filter === 'Completed' ? 'active-filter' : ''}
                    title={'Completed'}
                    onClick={() => {
                        changeFilterTasksHandler('Completed')
                    }}/>
            </div>
        </div>
    )
}