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

interface DayPlanSliceState {
  data: DayPlanActivity[]
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: SerializedError | null
}

const initialState: DayPlanSliceState = {
  data: [],
  status: 'idle',
  error: null,
}

export const fetchDayPlanActivities = createAsyncThunk(
  'dayPlan/fetchDayPlanActivities',
  async () => {
    const response = await axios
      .get(process.env.REACT_APP_BACKEND_URL + '/current-day-plan/')
      .then((res) => res)
    return response.data['activities'] as DayPlanActivity[]
  },
)

const dayPlanSlice = createSlice({
  name: 'dayPlan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDayPlanActivities.pending, (state, action) => {
      state.status = 'pending'
    })

    builder.addCase(fetchDayPlanActivities.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload
    })

    builder.addCase(fetchDayPlanActivities.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error
    })
  },
})

export default dayPlanSlice.reducer
