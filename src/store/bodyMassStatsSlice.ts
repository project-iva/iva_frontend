import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit'
import axios from 'axios'

interface BodyMassStatsSlice {
  latest_measurement: number | null
  week_average: number | null
  prev_week_average: number | null
  month_average: number | null
  prev_month_average: number | null
}

interface BodyMassStatsSliceState {
  data: BodyMassStatsSlice | null
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: SerializedError | null
}

const initialState: BodyMassStatsSliceState = {
  data: null,
  status: 'idle',
  error: null,
}

export const fetchBodyMassStats = createAsyncThunk(
  'bodyMassStats/fetchBodyMassStats',
  async () => {
    const response = await axios
      .get('http://iva-backend.docker.localhost/api/body-mass-stats/')
      .then((res) => res)
    return response.data as BodyMassStatsSlice
  },
)

const bodyMassStatsSlice = createSlice({
  name: 'bodyMassStats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBodyMassStats.pending, (state, action) => {
      state.status = 'pending'
    })

    builder.addCase(fetchBodyMassStats.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload
    })

    builder.addCase(fetchBodyMassStats.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error
    })
  },
})

export default bodyMassStatsSlice.reducer
