import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { Meal } from '../shared_models/food'

interface MealTrackerEntry {
  meal: Meal
  date: string
}

interface CaloriesGoal {
  calories: number
  calories_goal: number
  entries: MealTrackerEntry[]
}

interface CaloriesGoalSliceState {
  data: CaloriesGoal | null
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: SerializedError | null
}

const initialState: CaloriesGoalSliceState = {
  data: null,
  status: 'idle',
  error: null,
}

export const fetchCaloriesGoal = createAsyncThunk(
  'caloriesGoal/fetchCaloriesGoal',
  async () => {
    const response = await axios
      .get('http://iva-backend.docker.localhost/api/calories-goal/')
      .then((res) => res)
    return response.data as CaloriesGoal
  },
)

const caloriesGoalSlice = createSlice({
  name: 'caloriesGoal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCaloriesGoal.pending, (state, action) => {
      state.status = 'pending'
    })

    builder.addCase(fetchCaloriesGoal.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload
    })

    builder.addCase(fetchCaloriesGoal.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error
    })
  },
})

export default caloriesGoalSlice.reducer
