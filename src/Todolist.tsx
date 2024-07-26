import {Button} from "./Button";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}
type TodolistProps = {
    title: string,
    tasks: TasksType[]
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
                            </li>
                        )
                    })}
                </ul>
                }
            </div>
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
        </div>
    )
}