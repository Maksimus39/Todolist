import React, {useCallback, useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, createTheme, CssBaseline, Grid, Paper, Switch, ThemeProvider, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import {MenuButton} from "./MenuButton";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./model/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC} from "./model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./model/store";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TasksStateType = {
    [key: string]: TasksType[]
}
type ThemeMode = 'dark' | 'light'


export function AppWithRedux() {

    const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    // функция удаления таски
    const removeTask = useCallback((taskID: string, todolistId: string) => {
        const action = removeTasksAC(taskID, todolistId)
        dispatch(action)
    }, [dispatch])
    // функция фильтрации тудулистов
    const changeFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(filter, todolistId)
        dispatch(action)
    }, [dispatch])
    // функция добавления тасок
    const addTask = useCallback((title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId)
        dispatch(action)
    }, [dispatch])
    // функция для изменения статуса галочки
    const changeTaskStatus = useCallback((todolistId: string, taskID: string, taskStatus: boolean) => {
        const action = changeTaskStatusAC(todolistId, taskID, taskStatus)
        dispatch(action)
    }, [dispatch])
    // функция удаления тудулиста
    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])
    // универсальная форма добавления тудулиста
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])
    // функция изменения названия таски
    const updateTask = useCallback((todolistId: string, taskID: string, title: string) => {
        const action = changeTaskTitleAC(todolistId, taskID, title)
        dispatch(action)
    }, [dispatch])
    // функция переименования заголовка тудулиста
    const updateTodolist = useCallback((todolistId: string, title: string) => {
        const action = changeTodolistTitleAC(todolistId, title)
        dispatch(action)
    }, [dispatch])


    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#087EA4',
            },
        },
    })
    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline/>

                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <IconButton color="inherit" sx={{mb: '30px'}}>
                            <MenuIcon/>
                        </IconButton>
                        <div>
                            <MenuButton>Login</MenuButton>
                            <MenuButton>Logout</MenuButton>
                            <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                            <Switch color={'default'} onChange={changeModeHandler}/>
                        </div>
                    </Toolbar>
                </AppBar>

                <Container fixed>


                    <Grid container sx={{mb: '30px'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>

                    <Grid container spacing={4}>
                        {todolists.map(td => {


                            return (
                                <Grid item xs={12} sm={6} md={4} key={td.id}>
                                    <Paper sx={{p: '0 20px 20px 20px'}}>
                                        <Todolist
                                            todolistId={td.id}
                                            title={td.title}
                                            tasks={tasks[td.id]}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={td.filter}
                                            removeTodolist={removeTodolist}
                                            updateTask={updateTask}
                                            updateTodolist={updateTodolist}
                                        />
                                    </Paper>

                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
}

