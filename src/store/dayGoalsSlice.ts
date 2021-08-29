import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit'
import axios from 'axios'

export interface DayGoal {
  id: number
  name: string
  description: string
  finished: boolean
}

interface DayGoalSliceState {
  data: DayGoal[]
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: SerializedError | null
}

const initialState: DayGoalSliceState = {
  data: [],
  status: 'idle',
  error: null,
}

export const fetchDayGoals = createAsyncThunk(
  'dayGoals/fetchDayGoals',
  async () => {
    const response = await axios
      .get('http://iva-backend.docker.localhost/api/day-goal/2021-08-09/')
      .then((res) => res)
    return response.data['goals'] as DayGoal[]
  },
)

const dayGoalsSlice = createSlice({
  name: 'dayGoals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDayGoals.pending, (state, action) => {
      state.status = 'pending'
    })

    builder.addCase(fetchDayGoals.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload
    })

    builder.addCase(fetchDayGoals.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error
    })
  },
})

export default dayGoalsSlice.reducer