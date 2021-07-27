import { configureStore } from '@reduxjs/toolkit'
import mindfulSessionsReducer from './mindfulSessionsSlice'
import sleepAnalysesReducer from './sleepAnalysesSlice'
import bodyMassesReducer from './bodyMassesSlice'
import assetsReducer from './assetsSlice'

export const store = configureStore({
  reducer: {
    mindfulSessions: mindfulSessionsReducer,
    sleepAnalyses: sleepAnalysesReducer,
    bodyMasses: bodyMassesReducer,
    assets: assetsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
