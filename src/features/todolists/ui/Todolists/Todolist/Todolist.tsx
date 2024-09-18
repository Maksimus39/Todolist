import {TodolistType} from "../../../model/reducers/todolists-reducer";
import {addTaskAC} from "../../../model/reducers/tasks-reducer";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {AddItemForm} from "../../../../../common/components/AddItemForm";
import {Tasks} from "./Tasks/Tasks";
import {FilterTasksButtons} from "./FilterTasksButtom/FilterTasksButtons";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";


type PropsType = {
    todolist: TodolistType
}

export const Todolist = (props: PropsType) => {
    const {
        todolist,
    } = props
    const dispatch = useAppDispatch()

    const addTaskCallback = (title: string) => {
        dispatch(addTaskAC({title, todolistId: todolist.id}))
    }


    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskCallback}/>
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>
        </div>
    )
}
