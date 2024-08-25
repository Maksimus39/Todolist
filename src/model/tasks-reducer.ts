// ActionType
import {TasksStateType} from "../App";
import {v1} from "uuid";
import {TasksType} from "../Todolist";

export type RemoveTasksActionType = {
    type: 'REMOVE-TASK',
    payload: {
        taskID: string,
        todolistId: string
    }
}
export type AddTasksActionType = {
    type: 'ADD-TASK',
    payload: {
        title: string,
        todolistId: string
    }
}
// ActionCreator
export const removeTasksAC = (taskID: string, todolistId: string): RemoveTasksActionType => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskID,
            todolistId
        }
    } as const
}
export const addTaskAC = (title: string, todolistId: string): AddTasksActionType => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistId
        } as const
    }
}


export type ActionsTasksType = RemoveTasksActionType | AddTasksActionType

let todolistID1 = v1()
let todolistID2 = v1()
const initialState: TasksStateType = {
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
}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTasksType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(ts => ts.id !== action.payload.taskID),
            }
        }
        case "ADD-TASK": {
            const newTask: TasksType = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            return {
                ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]],
            }
        }
        default:
            throw new Error("I don't understand this type")
    }
}