import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App() {

    const [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])
    console.log(tasks)
    const [filter, setFilter] = useState<FilterValuesType>('All')

    let tasksForTodolist = tasks
    if (filter === 'Active') {
        tasksForTodolist = tasks.filter((el) => !el.isDone)
    }
    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter((el) => el.isDone)
    }
    // функция удаления таски
    const removeTask = (taskID: string) => {
        const filteredTasks = tasks.filter((el) => {
                return el.id !== taskID;
            }
        )
        setTasks(filteredTasks)
    }
    // функция фильтрации тасок
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    // функция добавления тасок
    const addTask = (title: string) => {
        const newTask: TasksType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }
    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
