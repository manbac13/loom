import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as ConfigApi from "api/config";

const initialState = {
  languages: [],
  ui: {
    loading: false,
  },
};

const getLanguages = createAsyncThunk("config/getLanguages", async () => {
  const res = await ConfigApi.getLanguages();
  return res.data;
});

const configSlice = createSlice({
  name: "config",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getLanguages.pending, (state) => {
        state.ui.loading = true;
      })
      .addCase(getLanguages.fulfilled, (state, action) => {
        state.languages = action.payload;
        state.ui.loading = false;
      })
      .addCase(getLanguages.rejected, (state) => {
        state.ui.loading = false;
      });
  },
});

const {} = configSlice.actions;

export default configSlice.reducer;

export { getLanguages };
