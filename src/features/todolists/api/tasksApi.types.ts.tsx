import {FieldError} from "./todolistsApi.types.ts";

export type GetTasksResponse = {
    error: string | null
    items: DomainTask[]
    totalCount: number
}
export type DomainTask = {
    description: string
    title: string
    completed?: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type CreateTaskResponse = {
    data: {
        item: DomainTask
    },
    messages: string[]
    fieldsErrors: FieldError[]
    resultCode: number
}
export type UpdateTaskModel = {
    status: number
    title: string
    deadline: string
    description: string
    priority: number
    startDate: string
}
export type UpdateTaskResponse = {
    data: {
        item: DomainTask
    },
    fieldsErrors: FieldError[]
    messages: string[]
    resultCode: number
}
export type DeleteTaskResponse = {
    resultCode: number
    messages: string[]
    data: {
        item: DomainTask
    }
}
export type UpdateTitleResponse = {
    data: {
        item: DomainTask
    },
    fieldsErrors: FieldError[]
    messages: string[]
    resultCode: number
}