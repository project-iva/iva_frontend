import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit'
import axios from 'axios'

interface MindfulSession {
  start: string
  end: string
  duration_in_secs: number
}

type StatsData = {
  date: string
  mindful_sessions: MindfulSession[]
}

interface WeekMindfulSessionsStatsSliceState {
  data: StatsData[]
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: SerializedError | null
}

const initialState: WeekMindfulSessionsStatsSliceState = {
  data: [],
  status: 'idle',
  error: null,
}

export const fetchWeekMindfulSessionsStats = createAsyncThunk(
  'weekMindfulSessionsStats/fetchWeekMindfulSessionsStats',
  async () => {
    const response = await axios
      .get(process.env.REACT_APP_BACKEND_URL + '/week-mindful-sessions-stats/')
      .then((res) => res)
    return response.data as StatsData[]
  },
)

const weekSleepStatsSlice = createSlice({
  name: 'weekMindfulSessionsStats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeekMindfulSessionsStats.pending, (state, action) => {
      state.status = 'pending'
    })

    builder.addCase(
      fetchWeekMindfulSessionsStats.fulfilled,
      (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      },
    )

    builder.addCase(fetchWeekMindfulSessionsStats.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error
    })
  },
})

export default weekSleepStatsSlice.reducer
