import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, createTheme, CssBaseline, Grid, Paper, Switch, ThemeProvider, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import {MenuButton} from "./MenuButton";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TasksStateType = {
    [key: string]: TasksType[]
}
type ThemeMode = 'dark' | 'light'


function App() {
    // массив тудулистов
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolist, setTodolist] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    // функция удаления таски
    const removeTask = (taskID: string, todolistId: string) => {
        const newTodolistTasks = {
            ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskID)
        }
        setTasks(newTodolistTasks)
    }
    // функция фильтрации тасок
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const newTodolist = todolist.map(tl => {
            return tl.id === todolistId ? {...tl, filter} : tl
        })
        setTodolist(newTodolist)
    }
    // функция добавления тасок
    const addTask = (title: string, todolistId: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        const newTodolistTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        setTasks(newTodolistTasks)
    }
    // функция для изменения статуса галочки
    const changeTaskStatus = (todolistId: string, taskID: string, taskStatus: boolean) => {
        const newTodolistTasks = {
            ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskID ? {...t, isDone: taskStatus} : t)
        }
        setTasks(newTodolistTasks)
    }
    // функция удаления тудулиста
    const removeTodolist = (todolistId: string) => {
        const newTodolistID = todolist.filter(t => t.id !== todolistId)
        setTodolist(newTodolistID)
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    // универсальная форма добавления тудулиста
    const addTodolist = (title: string) => {
        const todolistId1 = v1()
        const newTodolist: TodolistType = {
            id: todolistId1,
            title: title,
            filter: 'All'
        }
        setTodolist([newTodolist, ...todolist])
        setTasks({...tasks, [todolistId1]: []})
    }
    // функция изменения названия таски
    const updateTask = (todolistId: string, taskID: string, title: string) => {
        const newTitleTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskID ? {...t, title: title} : t)
        }
        setTasks(newTitleTasks)
    }
    // функция переименования заголовка тудулиста
    const updateTodolist = (todolistId: string, title: string) => {
        setTodolist(todolist.map(t => t.id === todolistId ? {...t, title: title} : t))
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
                <CssBaseline />

                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <IconButton color="inherit" sx={{mb: '30px'}}>
                            <MenuIcon/>
                        </IconButton>
                        <div>
                            <MenuButton>Login</MenuButton>
                            <MenuButton>Logout</MenuButton>
                            <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                            <Switch color={'default'} onChange={changeModeHandler} />
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

                            if (tl.filter === 'Active') {
                                tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                            }

                            if (tl.filter === 'Completed') {
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