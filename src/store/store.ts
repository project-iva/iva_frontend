import { configureStore } from '@reduxjs/toolkit'
import mindfulSessionsReducer from './mindfulSessionsSlice'
import weekMindfulSessionsStatsReducer from './weekMindfulSessionsStatsStatsSlice'
import sleepAnalysesReducer from './sleepAnalysesSlice'
import weekSleepStatsReducer from './weekSleepStatsSlice'
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
    weekMindfulSessionsStats: weekMindfulSessionsStatsReducer,
    sleepAnalyses: sleepAnalysesReducer,
    weekSleepStats: weekSleepStatsReducer,
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
