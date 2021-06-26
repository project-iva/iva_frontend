import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    id: '1',
    title: 'First Post!',
  },
  {
    id: '2',
    title: 'Second Post',
  },
]

const mindfulSessionsSlice = createSlice({
  name: 'mindfulSessions',
  initialState,
  reducers: {},
})

// export const { } = postsSlice.actions

export default mindfulSessionsSlice.reducer
