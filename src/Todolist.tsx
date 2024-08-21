import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {Buttonn} from "./Button";
import {Box, Checkbox, List, ListItem} from "@mui/material";
import {FilterValuesType} from "./App";
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";


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
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskCallback}/>

            <div>
                {props.tasks?.length === 0 ? (
                    <p>Тасок нет</p>
                ) : <List>
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
                            <ListItem key={task.id} sx={getListItemSx(task.isDone)}>

                                <div>
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                </div>

                                <IconButton onClick={removeTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
                }
            </div>
            <Box sx={filterButtonsContainerSx}>
                <Buttonn
                    variant={props.filter === 'All' ? 'contained' : 'text'}
                    color={'inherit'}
                    title={'All'}
                    onClick={() => changeFilterTasksHandler('all')}
                />
                <Buttonn
                    variant={props.filter === 'Active' ? 'contained' : 'text'}
                    color={'primary'}
                    title={'Active'}
                    onClick={() => changeFilterTasksHandler('active')}
                />
                <Buttonn
                    variant={props.filter === 'Completed' ? 'contained' : 'text'}
                    color={'secondary'}
                    title={'Completed'}
                    onClick={() => changeFilterTasksHandler('completed')}
                />
            </Box>
        </div>
    )
}