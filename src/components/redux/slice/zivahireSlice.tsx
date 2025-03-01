import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
 useId : ''

};

const zivahireSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.useId = action.payload;
    },

  },
});

export const {setUserId } = zivahireSlice.actions;
export default zivahireSlice.reducer;
