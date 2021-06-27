import { configureStore } from '@reduxjs/toolkit'
import mindfulSessionsReducer from './mindfulSessionsSlice'
import sleepAnalysesReducer from './sleepAnalysesSlice'

export const store = configureStore({
  reducer: {
    mindfulSessions: mindfulSessionsReducer,
    sleepAnalyses: sleepAnalysesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
