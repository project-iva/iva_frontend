import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit'
import axios from 'axios'

export interface DayPlanActivity {
  id: number
  start_time: string
  end_time: string
  name: string
  description: string
  type: string
}

export interface DayPlan {
  id: number
  date: string
  activities: DayPlanActivity[]
}

interface DayPlanSliceState {
  data: DayPlan | null
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: SerializedError | null
}

const initialState: DayPlanSliceState = {
  data: null,
  status: 'idle',
  error: null,
}

export const fetchDayPlan = createAsyncThunk(
  'dayPlan/fetchDayPlan',
  async () => {
    const response = await axios
      .get('http://iva-backend.docker.localhost/api/day-plan/2021-08-11/')
      .then((res) => res)
    return response.data as DayPlan
  },
)

const dayPlanSlice = createSlice({
  name: 'dayPlan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDayPlan.pending, (state, action) => {
      state.status = 'pending'
    })

    builder.addCase(fetchDayPlan.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload
    })

    builder.addCase(fetchDayPlan.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error
    })
  },
})

export default dayPlanSlice.reducer
