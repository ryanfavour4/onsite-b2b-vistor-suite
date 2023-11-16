import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    positions: [],
    departments: [],
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers : {
        getPositions: (state, action) => {
            state.positions = action.payload
        }
    }
})

export const { getPositions } = settingsSlice.actions
export default settingsSlice.reducer