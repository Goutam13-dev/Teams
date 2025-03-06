import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
 useId : '',
 userName:''

};

const zivahireSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.useId = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },

  },
});

export const {setUserId, setUserName } = zivahireSlice.actions;
export default zivahireSlice.reducer;
