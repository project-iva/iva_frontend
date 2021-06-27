import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit'
import axios from 'axios'

interface MindfulSession {
  uuid: string
  source_name: string
  start: string
  end: string
}

type MindfulSessionsData = MindfulSession[]

interface MindfulSessionsSliceState {
  mindfulSessions: MindfulSessionsData
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: SerializedError | null
}

const initialState: MindfulSessionsSliceState = {
  mindfulSessions: [],
  status: 'idle',
  error: null,
}

export const fetchMindfulSessions = createAsyncThunk(
  'mindfulSessions/fetchMindfulSessions',
  async () => {
    const response = await axios
      .get('http://iva-backend.docker.localhost/api/mindful-sessions/')
      .then((res) => res)
    return response.data as MindfulSessionsData
  },
)

const mindfulSessionsSlice = createSlice({
  name: 'mindfulSessions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMindfulSessions.pending, (state, action) => {
      state.status = 'pending'
    })

    builder.addCase(fetchMindfulSessions.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.mindfulSessions = action.payload
    })

    builder.addCase(fetchMindfulSessions.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error
    })
  },
})

export default mindfulSessionsSlice.reducer
