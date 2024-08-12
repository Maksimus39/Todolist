import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TasksStateType = {
    [key: string]: TasksType[]
}

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
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
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
                    <Todolist
                        key={tl.id}
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
                )
            })}

        </div>
    );
}

export default App;
