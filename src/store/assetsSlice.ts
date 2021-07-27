import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit'
import axios from 'axios'

interface Asset {
  name: string
  ticker: string
  type: 'STOCK' | 'CRYPTO'
}

interface AssetTrackerEntry {
  value: number
  market_price: number
  asset: Asset
}

interface AssetTrackerData {
  date: string
  asset_tracker_entries: AssetTrackerEntry[]
}

interface AssetsSliceState {
  assetsTrackerData: AssetTrackerData[]
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: SerializedError | null
}

const initialState: AssetsSliceState = {
  assetsTrackerData: [],
  status: 'idle',
  error: null,
}

export const fetchAssets = createAsyncThunk('assets/fetchAssets', async () => {
  const response = await axios
    .get('http://iva-backend.docker.localhost/api/assets/')
    .then((res) => res)
  return response.data as AssetTrackerData[]
})

const assetsSlice = createSlice({
  name: 'bodyMasses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAssets.pending, (state, action) => {
      state.status = 'pending'
    })

    builder.addCase(fetchAssets.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.assetsTrackerData = action.payload
    })

    builder.addCase(fetchAssets.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error
    })
  },
})

export default assetsSlice.reducer
