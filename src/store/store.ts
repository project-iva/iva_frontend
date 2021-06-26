import { configureStore } from '@reduxjs/toolkit'
import mindfulSessionsReducer from './mindfulSessionsSlice'

export const store = configureStore({
  reducer: {
    mindfulSessions: mindfulSessionsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
