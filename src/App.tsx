import React, {useReducer, useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, createTheme, CssBaseline, Grid, Paper, Switch, ThemeProvider, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import {MenuButton} from "./MenuButton";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC, tasksReducer} from "./model/tasks-reducer";

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


function App() {
    // массив тудулистов
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolist, dispatchTodolist] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        [todolistID2]: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    })

    // функция удаления таски
    const removeTask = (taskID: string, todolistId: string) => {
        const action = removeTasksAC(taskID, todolistId)
        dispatchToTasks(action)
    }
    // функция фильтрации тудулистов
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(filter, todolistId)
        dispatchTodolist(action)
    }
    // функция добавления тасок
    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId)
        dispatchToTasks(action)
    }
    // функция для изменения статуса галочки
    const changeTaskStatus = (todolistId: string, taskID: string, taskStatus: boolean) => {
        const action = changeTaskStatusAC(todolistId, taskID, taskStatus)
        dispatchToTasks(action)
    }
    // функция удаления тудулиста
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchTodolist(action)
    }
    // универсальная форма добавления тудулиста
    const addTodolist = (title: string) => {
        const todolistAction = addTodolistAC(title)
        dispatchTodolist(todolistAction)
        dispatchToTasks(todolistAction)
    }
    // функция изменения названия таски
    const updateTask = (todolistId: string, taskID: string, title: string) => {

        const action = changeTaskTitleAC(todolistId, taskID, title)
        dispatchToTasks(action)
    }
    // функция переименования заголовка тудулиста
    const updateTodolist = (todolistId: string, title: string) => {
        const action = changeTodolistTitleAC(todolistId, title)
        dispatchTodolist(action)
    }


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
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
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
                        {todolist.map(tl => {
                            const allTodolistTasks = tasks[tl.id]
                            let tasksForTodolist = allTodolistTasks

                            if (tl.filter === 'active') {
                                tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                            }

                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                            }
                            return (
                                <Grid item xs={12} sm={6} md={4} key={tl.id}>
                                    <Paper sx={{p: '0 20px 20px 20px'}}>
                                        <Todolist
                                            todolistId={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={tl.filter}
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

export default App;