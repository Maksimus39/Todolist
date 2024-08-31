import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {Buttonn} from "./Button";
import {Box, List} from "@mui/material";
import {FilterValuesType} from "./AppWithReducer";
import {filterButtonsContainerSx} from "./Todolist.styles";
import {TaskItem} from "./model/TaskItem";


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

export const Todolist = React.memo((props: TodolistProps) => {
    const changeFilterTasksHandler = useCallback((filter: FilterValuesType) => {
        props.changeFilter(filter, props.todolistId)
    }, [props.changeFilter, props.todolistId])

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const addTaskCallback = useCallback((title: string) => {
        props.addTask(title, props.todolistId)
    }, [props.addTask, props.todolistId])

    const updateTodolistHandler = (title: string) => {
        props.updateTodolist(props.todolistId, title)
    }

    const allTodolistTasks = props.tasks
    let tasksForTodolist = allTodolistTasks

    if (props.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
    }

    if (props.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
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
                {tasksForTodolist?.length === 0 ? (
                    <p>Тасок нет</p>
                ) : <List>
                    {tasksForTodolist?.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            todolistId={props.todolistId}
                            removeTask={props.removeTask}
                            changeTaskStatus={props.changeTaskStatus}
                            updateTask={props.updateTask}
                        />
                    ))}
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
})