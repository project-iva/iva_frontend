import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit'
import axios from 'axios'

interface SleepAnalysis {
  uuid: string
  source_name: string
  start: string
  end: string
  value: number
}

type SleepAnalysesData = SleepAnalysis[]

interface SleepAnalysesSliceState {
  sleepAnalyses: SleepAnalysesData
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: SerializedError | null
}

const initialState: SleepAnalysesSliceState = {
  sleepAnalyses: [],
  status: 'idle',
  error: null,
}

export const fetchSleepAnalyses = createAsyncThunk(
  'sleepAnalyses/fetchSleepAnalyses',
  async () => {
    const response = await axios
      .get('http://iva-backend.docker.localhost/api/sleep-analyses/')
      .then((res) => res)
    return response.data as SleepAnalysesData
  },
)

const sleepAnalysesSlice = createSlice({
  name: 'sleepAnalyses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSleepAnalyses.pending, (state, action) => {
      state.status = 'pending'
    })

    builder.addCase(fetchSleepAnalyses.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.sleepAnalyses = action.payload
    })

    builder.addCase(fetchSleepAnalyses.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error
    })
  },
})

export default sleepAnalysesSlice.reducer
