import { configureStore } from '@reduxjs/toolkit'
import mindfulSessionsReducer from './mindfulSessionsSlice'
import sleepAnalysesReducer from './sleepAnalysesSlice'
import bodyMassesReducer from './bodyMassesSlice'
import assetsReducer from './assetsSlice'
import caloriesGoalReducer from './caloriesGoalSlice'
import dayPlanReducer from './dayPlanSlice'
import dayGoalsReducer from './dayGoalsSlice'

export const store = configureStore({
  reducer: {
    mindfulSessions: mindfulSessionsReducer,
    sleepAnalyses: sleepAnalysesReducer,
    bodyMasses: bodyMassesReducer,
    assets: assetsReducer,
    caloriesGoal: caloriesGoalReducer,
    dayPlan: dayPlanReducer,
    dayGoals: dayGoalsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
