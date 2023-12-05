import { createSlice } from '@reduxjs/toolkit'

export const applicationSlice = createSlice({
  name: 'counter',
  initialState: {
    dataSet: TApplication = {}
  },
  reducers: {
    changeValue: () => {}
  }
})

export const { changeValue } = applicationSlice.actions
export default applicationSlice.reducer