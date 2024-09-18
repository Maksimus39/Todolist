import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "./features/todolists/model/reducers/tasks-reducer";
import {ChangeEvent} from "react";
import {useDispatch} from "react-redux";
import {TodolistType} from "./features/todolists/model/reducers/todolists-reducer";
import {Checkbox, ListItem} from "@mui/material";
import {EditableSpan} from "./common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {getListItemSx} from "./Task.styles";

type Props = {
    task: TaskType
    todolist: TodolistType
}

export const Task = ({ task, todolist }: Props) => {
    const dispatch = useDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTaskAC({ taskId: task.id, todolistId: todolist.id }))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const isDone = e.currentTarget.checked
        dispatch(changeTaskStatusAC({ taskId: task.id, isDone, todolistId: todolist.id }))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC({ taskId: task.id, title, todolistId: todolist.id }))
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
            </div>
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}