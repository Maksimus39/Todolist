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

    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export const Todolist = (props: TodolistProps) => {

    const [taskTitle, setTaskTitle] = useState('')

    // функция добавления таски
    const addTaskHandler = () => {
        props.addTask(taskTitle)
        setTaskTitle("")
    }

    // функция ввода
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    // функция добавления таски по нажатию на энтер
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
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
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                />
                <Button
                    title={'+'}
                    onClick={addTaskHandler}/>
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
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'X'} onClick={removeTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
                }
            </div>
            <div>
                <Button title={'All'} onClick={() => {
                    changeFilterTasksHandler('All')
                }}/>
                <Button title={'Active'} onClick={() => {
                    changeFilterTasksHandler('Active')
                }}/>
                <Button title={'Completed'} onClick={() => {
                    changeFilterTasksHandler('Completed')
                }}/>
            </div>
        </div>
    )
}