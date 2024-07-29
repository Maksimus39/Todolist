import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";


export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App() {

    const [tasks, setTasks] = useState<TasksType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('All')

    let tasksForTodolist = tasks
    if (filter === 'Active') {
        tasksForTodolist = tasks.filter((el) => el.isDone === false)
    }
    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter((el) => el.isDone === true)
    }

    const removeTask = (taskID: number) => {
        const filteredTasks = tasks.filter((el) => {
                return el.id !== taskID;
            }
        )
        setTasks(filteredTasks)
    }

    const changeFilter=(filter:FilterValuesType)=>{
        setFilter(filter)
    }
    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
