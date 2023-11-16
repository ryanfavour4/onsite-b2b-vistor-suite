import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userDetails: {}, location: {}, phoneNumber: '', inviteOnlyMode: false
}

const profileSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        getProfileDetails: (state, action) => {
            const {user, location, phoneNumber} = action.payload
            state.userDetails = user
            state.location = location
            state.phoneNumber = phoneNumber
        },
        setInviteOnlyMode: (state, action) => {
            state.inviteOnlyMode = action.payload
        }
    }
})

export const { getPositions, setInviteOnlyMode, getProfileDetails } = profileSlice.actions
export default profileSlice.reducer