import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit'
import axios from 'axios'

interface SleepAnalysis {
  start: string
  end: string
  duration_in_secs: number
}

type StatsData = {
  date: string
  sleep_analyses: SleepAnalysis[]
}

interface WeekSleepStatsSliceState {
  data: StatsData[]
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: SerializedError | null
}

const initialState: WeekSleepStatsSliceState = {
  data: [],
  status: 'idle',
  error: null,
}

export const fetchWeekSleepStats = createAsyncThunk(
  'weekSleepStats/fetchWeekSleepStats',
  async () => {
    const response = await axios
      .get(process.env.REACT_APP_BACKEND_URL + '/week-sleep-stats/')
      .then((res) => res)
    return response.data as StatsData[]
  },
)

const weekSleepStatsSlice = createSlice({
  name: 'weekSleepStats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeekSleepStats.pending, (state, action) => {
      state.status = 'pending'
    })

    builder.addCase(fetchWeekSleepStats.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload
    })

    builder.addCase(fetchWeekSleepStats.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error
    })
  },
})

export default weekSleepStatsSlice.reducer
