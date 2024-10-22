import { RootState } from "./store"

export const selectErrorMode = (state: RootState) => state.app.error
