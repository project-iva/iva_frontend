import { configureStore } from '@reduxjs/toolkit'
import mindfulSessionsReducer from './mindfulSessionsSlice'
import sleepAnalysesReducer from './sleepAnalysesSlice'
import bodyMassesReducer from './bodyMassesSlice'

export const store = configureStore({
  reducer: {
    mindfulSessions: mindfulSessionsReducer,
    sleepAnalyses: sleepAnalysesReducer,
    bodyMasses: bodyMassesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
