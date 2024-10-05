import axios from "axios";
import {
    CreateTaskResponse,
    DeleteTaskResponse,
    DomainTask,
    GetTasksResponse, UpdateTaskModel,
    UpdateTaskResponse, UpdateTitleResponse
} from "./tasksApi.types.ts";
import {ChangeEvent} from "react";

export const tasksApi = {
    getTasks(td:string){
        return    axios.get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${td}/tasks`, {
            headers: {
                Authorization: 'Bearer 1905af51-67d1-4bd0-802b-b4b789429bbe',
                'API-KEY': 'd61ef5c5-b125-404d-9298-420a14df2b85'
            }
    })
    },
    createTask(title: string, todolistId: string){
        return  axios.post<CreateTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {title}, {
                headers: {
                    Authorization: 'Bearer 1905af51-67d1-4bd0-802b-b4b789429bbe',
                    'API-KEY': 'd61ef5c5-b125-404d-9298-420a14df2b85'
                }
            }
        )
    },
    removeTask(taskId: string, todolistId: string) {
        return  axios.delete<DeleteTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {
            headers: {
                Authorization: 'Bearer 1905af51-67d1-4bd0-802b-b4b789429bbe',
                'API-KEY': 'd61ef5c5-b125-404d-9298-420a14df2b85'
            }
        })
    },
    changeTaskStatus(e: ChangeEvent<HTMLInputElement>, task: DomainTask){
        const status = e.currentTarget.checked ? 2 : 0

        const model: UpdateTaskModel = {
            status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }
        return  axios.put<UpdateTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`, model, {
                headers: {
                    Authorization: 'Bearer 1905af51-67d1-4bd0-802b-b4b789429bbe',
                    'API-KEY': 'd61ef5c5-b125-404d-9298-420a14df2b85'
                }
            }
        )
    },
    changeTaskTitle(title: string, task: DomainTask){
        const updatedTask = {...task, title};

        const model: UpdateTaskModel = {
            status: updatedTask.status,
            title: updatedTask.title,
            deadline: updatedTask.deadline,
            description: updatedTask.description,
            priority: updatedTask.priority,
            startDate: updatedTask.startDate,
        };
        return  axios.put<UpdateTitleResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`, model, {
            headers: {
                Authorization: 'Bearer 1905af51-67d1-4bd0-802b-b4b789429bbe',
                'API-KEY': 'd61ef5c5-b125-404d-9298-420a14df2b85'
            }
        })
    }
}