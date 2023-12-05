import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TApplication } from './TApplication'

const initialState: TApplication = {
  dataSet: [[]],
  isEditMode: false
} 

export const applicationSlice = createSlice({
  name: 'counter',
  initialState: {
    dataSet: initialState,
  },
  reducers: {
    toggleEditmode: (state) => {
      state.dataSet.isEditMode = !state.dataSet.isEditMode
    },
    addItem: (state, action: PayloadAction<{index: number}>) => {
      const { index } = action.payload

      state.dataSet.dataSet[index].push(
        {
          field1: 0,
          field2: 0,
          field3: 0,
          field4: 0
        })
    },
    addAccordion: (state) => {
      state.dataSet.dataSet.push([])
    },
    handleEditField: (state, action: PayloadAction<{accordion: number, row: number, field: string, value: number}>) => {
      const { accordion, row, field, value } = action.payload

      state.dataSet.dataSet[accordion][row][field] = value
    },
  }
})

export const { toggleEditmode, addItem, addAccordion, handleEditField } = applicationSlice.actions
export default applicationSlice.reducer