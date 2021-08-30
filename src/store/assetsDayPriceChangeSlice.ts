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
}

interface AssetDayPriceChange {
  asset: Asset
  last_entry: AssetTrackerEntry
  prev_day_last_entry: AssetTrackerEntry
}

interface AssetsDayPriceChangeSliceState {
  data: AssetDayPriceChange[]
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: SerializedError | null
}

const initialState: AssetsDayPriceChangeSliceState = {
  data: [],
  status: 'idle',
  error: null,
}

export const fetchAssetsDayPriceChange = createAsyncThunk(
  'assetsDayPriceChange/fetchAssetsDayPriceChange',
  async () => {
    const response = await axios
      .get('http://iva-backend.docker.localhost/api/assets-day-price-change/')
      .then((res) => res)
    return response.data as AssetDayPriceChange[]
  },
)

const assetsDayPriceChangeSlice = createSlice({
  name: 'bodyMasses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAssetsDayPriceChange.pending, (state, action) => {
      state.status = 'pending'
    })

    builder.addCase(fetchAssetsDayPriceChange.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload
    })

    builder.addCase(fetchAssetsDayPriceChange.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error
    })
  },
})

export default assetsDayPriceChangeSlice.reducer
