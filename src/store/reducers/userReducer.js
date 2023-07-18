import { createSlice } from "@reduxjs/toolkit";

const userInitialState = { userInfo: null };

const userSlice = createSlice({
    name: "user",
    initialState: userInitialState,
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
        resetUserInfo(state) {
            state.userInfo = null;
        },
    },
});

const userAction = userSlice.actions;
const userReducer = userSlice.reducer;

export { userAction, userReducer };
