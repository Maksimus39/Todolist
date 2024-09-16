import {useDispatch, useSelector} from "react-redux";
import {changeTodolistTitleAC, removeTodolistAC, TodolistType} from "./model/todolists-reducer";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";
import {RootState} from "./app/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType} from "./model/tasks-reducer";

export const Todolists = () => {

    const todolists = useSelector<RootState, TodolistType[]>((state) => state.todolists)
    const tasks = useSelector<RootState, TasksStateType>((state) => state.tasks)
    const dispatch = useDispatch()

    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC({taskId, todolistId}))
    }

    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC({title, todolistId}))
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({taskId, isDone: taskStatus, todolistId}))
    }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({taskId, title, todolistId}))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }

    const updateTodolist = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    return (
        <div>
            {todolists.map((tl) => {

                const allTodolistTasks = tasks[tl.id]
                let tasksForTodolist = allTodolistTasks

                if (tl.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                }

                if (tl.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                }

                return (
                    <Grid key={tl.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <Todolist
                                key={tl.id}
                                todolist={tl}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                removeTodolist={removeTodolist}
                                updateTask={updateTask}
                                updateTodolist={updateTodolist}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </div>
    )
}