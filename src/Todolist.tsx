import {Button} from "./Button";
import {FilterValuesType} from "./App";
import {ChangeEvent, useState, KeyboardEvent} from "react";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistProps = {
    todolistId: string
    title: string,
    tasks: TasksType[]
    filter: string

    removeTask: (taskID: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (todolistId: string, taskID: string, taskStatus: boolean) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: TodolistProps) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    // функция добавления таски
    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            props.addTask(taskTitle.trim(), props.todolistId)
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
        props.changeFilter(filter, props.todolistId)
    }
    // функция удаления тудулиста
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    return (
        <div>

            <div className={'todolist-title-container'}>
                <h3>{props.title}</h3>
                <Button title={'X'} onClick={removeTodolistHandler}/>
            </div>

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
                            props.removeTask(task.id, props.todolistId)
                        }

                        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = event.currentTarget.checked; // Используем checked вместо value
                            props.changeTaskStatus(props.todolistId, task.id, newStatusValue);
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