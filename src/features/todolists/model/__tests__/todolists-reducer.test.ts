import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  DomainTodolist,
  todolistsReducer,
} from "../todolists-reducer"
import { v1 } from "uuid"
import { Todolist } from "../../api/todolistsApi.types"

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[] = []

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: "" },
    { id: todolistId2, title: "What to buy", filter: "all", order: 1, addedDate: "" },
  ]
})

test("correct todolist should be added", () => {
  const newTodolist: Todolist = {
    id: v1(),
    title: "New Todolist",
    addedDate: "",
    order: 0,
  }

  const endState = todolistsReducer(startState, addTodolistAC(newTodolist))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newTodolist.title)
})

test("correct todolist should change its name", () => {
  const newTitle = "New Todolist"

  const endState = todolistsReducer(startState, changeTodolistTitleAC({ id: todolistId2, title: newTitle }))

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(newTitle)
})

test("correct filter of todolist should be changed", () => {
  const newFilter = "completed"

  const endState = todolistsReducer(startState, changeTodolistFilterAC({ id: todolistId2, filter: newFilter }))

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(newFilter)
})
