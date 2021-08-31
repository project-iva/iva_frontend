import { configureStore } from '@reduxjs/toolkit'
import mindfulSessionsReducer from './mindfulSessionsSlice'
import sleepAnalysesReducer from './sleepAnalysesSlice'
import bodyMassesReducer from './bodyMassesSlice'
import bodyMassStatsReducer from './bodyMassStatsSlice'
import assetsReducer from './assetsSlice'
import assetsDayPriceChangeReducer from './assetsDayPriceChangeSlice'
import caloriesGoalReducer from './caloriesGoalSlice'
import dayPlanReducer from './dayPlanSlice'
import dayGoalsReducer from './dayGoalsSlice'

export const store = configureStore({
  reducer: {
    mindfulSessions: mindfulSessionsReducer,
    sleepAnalyses: sleepAnalysesReducer,
    bodyMasses: bodyMassesReducer,
    bodyMassStats: bodyMassStatsReducer,
    assets: assetsReducer,
    assetsDayPriceChange: assetsDayPriceChangeReducer,
    caloriesGoal: caloriesGoalReducer,
    dayPlan: dayPlanReducer,
    dayGoals: dayGoalsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
