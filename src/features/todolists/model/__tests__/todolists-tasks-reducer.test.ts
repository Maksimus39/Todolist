import { tasksReducer, TasksStateType } from "../tasks-reducer"
import { addTodolistAC, DomainTodolist, todolistsReducer } from "../todolists-reducer"
import { v1 } from "uuid"
import { Todolist } from "../../api/todolistsApi.types"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: DomainTodolist[] = []

  const newTodolist: Todolist = {
    id: v1(),
    title: "new todolist",
    addedDate: "",
    order: 0,
  }

  const action = addTodolistAC(newTodolist)

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(idFromTodolists)
})
