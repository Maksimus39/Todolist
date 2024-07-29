import {Button} from "./Button";
import {FilterValuesType} from "./App";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}
type TodolistProps = {
    title: string,
    tasks: TasksType[]

    removeTask: (taskID: number) => void
    changeFilter: (filter: FilterValuesType) => void
}
export const Todolist = (props: TodolistProps) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            <div>
                {props.tasks?.length === 0 ? (
                    <p>Тасок нет</p>
                ) : <ul>
                    {props.tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'X'} onClick={() => props.removeTask(task.id)}/>
                            </li>
                        )
                    })}
                </ul>
                }
            </div>
            <div>
                <Button title={'All'} onClick={() => {
                    props.changeFilter('All')
                }}/>
                <Button title={'Active'} onClick={() => {
                    props.changeFilter('Active')
                }}/>
                <Button title={'Completed'} onClick={() => {
                    props.changeFilter('Completed')
                }}/>
            </div>
        </div>
    )
}