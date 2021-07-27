import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit'
import axios from 'axios'

interface BodyMass {
  uuid: string
  start: string
  value: string
}

interface BodyMassesSliceState {
  bodyMasses: BodyMass[]
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: SerializedError | null
}

const initialState: BodyMassesSliceState = {
  bodyMasses: [],
  status: 'idle',
  error: null,
}

export const fetchBodyMasses = createAsyncThunk(
  'bodyMasses/fetchBodyMasses',
  async () => {
    const response = await axios
      .get('http://iva-backend.docker.localhost/api/body-masses/')
      .then((res) => res)
    return response.data as BodyMass[]
  },
)

const bodyMassesSlice = createSlice({
  name: 'bodyMasses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBodyMasses.pending, (state, action) => {
      state.status = 'pending'
    })

    builder.addCase(fetchBodyMasses.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.bodyMasses = action.payload
    })

    builder.addCase(fetchBodyMasses.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error
    })
  },
})

export default bodyMassesSlice.reducer
