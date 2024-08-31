import React, {ChangeEvent} from "react";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {getListItemSx} from "../Todolist.styles";
import {EditableSpan} from "../EditableSpan";


type TaskItemProps = {
    task: {
        id: string;
        title: string;
        isDone: boolean;
    };
    todolistId: string;
    removeTask: (taskID: string, todolistId: string) => void;
    changeTaskStatus: (todolistId: string, taskID: string, taskStatus: boolean) => void;
    updateTask: (todolistId: string, taskID: string, title: string) => void;
};

export const TaskItem = React.memo((props: TaskItemProps) => {
    const {task, todolistId, removeTask, changeTaskStatus, updateTask} = props;

    const removeTaskHandler = () => {
        removeTask(task.id, todolistId);
    };

    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = event.currentTarget.checked;
        changeTaskStatus(todolistId, task.id, newStatusValue);
    };

    const changeTaskTitleHandler = (title: string) => {
        updateTask(todolistId, task.id, title);
    };

    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
            </div>
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    );
});