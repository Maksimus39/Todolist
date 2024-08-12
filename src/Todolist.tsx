import {Button} from "./Button";
import {FilterValuesType} from "./App";
import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    updateTask: (todolistId: string, taskID: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = (props: TodolistProps) => {

    // функция для кнопок фильтрации
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        props.changeFilter(filter, props.todolistId)
    }
    // функция удаления тудулиста
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    // универсальная форма добавления тудулиста
    const addTaskCallback = (title: string) => {
        props.addTask(title, props.todolistId)
    }
    // функция переименования заголовка тудулиста
    const updateTodolistHandler = (title: string) => {
        props.updateTodolist(props.todolistId, title)
    }
    return (
        <div>
            <div className={'todolist-title-container'}>
                <h3>
                    <EditableSpan value={props.title} onChange={updateTodolistHandler}/>
                </h3>

                <Button title={'X'} onClick={removeTodolistHandler}/>
            </div>
            <AddItemForm addItem={addTaskCallback}/>

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
                        const changeTaskTitleHandler = (title: string) => {
                            props.updateTask(props.todolistId, task.id, title);
                        }

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={changeTaskStatusHandler}
                                />
                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
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