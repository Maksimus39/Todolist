import axios from "axios";
import {
    CreateTodolistResponse,
    DeleteTodolistResponse,
    Todolist,
    UpdateTodolistResponse
} from "./todolistsApi.types.ts";

export const todolistsApi = {
    getTodolists() {
        return axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            headers: {
                Authorization: 'Bearer 1905af51-67d1-4bd0-802b-b4b789429bbe',
            }
        })
    },
    updateTodolist(id: string, title: string) {
        return axios.put<UpdateTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {title}, {
                headers: {
                    Authorization: 'Bearer 1905af51-67d1-4bd0-802b-b4b789429bbe',
                    'API-KEY': 'd61ef5c5-b125-404d-9298-420a14df2b85'
                }
            })
    },
    createTodolist(title: string) {
        return axios.post<CreateTodolistResponse>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, {
            headers: {
                Authorization: 'Bearer 1905af51-67d1-4bd0-802b-b4b789429bbe',
                'API-KEY': 'd61ef5c5-b125-404d-9298-420a14df2b85'
            }
        })
    },
    deleteTodolist(id:string){
        return  axios.delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
            headers: {
                Authorization: 'Bearer 1905af51-67d1-4bd0-802b-b4b789429bbe',
                'API-KEY': 'd61ef5c5-b125-404d-9298-420a14df2b85'
            }
    })

}}