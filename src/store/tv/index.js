import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as TvApi from "api/tv";

const initialState = {
  selectedTvShow: {
    tvShowData: {},
    tvShowCast: {},
  },
  ui: {
    loading: false,
  },
};

const getTvShowDetails = createAsyncThunk(
  "tv/getTvShowDetails",
  async (params) => {
    const res = await TvApi.getTvShowDetails(params);
    return res.data;
  }
);

const getTvShowCast = createAsyncThunk("tv/getTvShowCast", async (params) => {
  const res = await TvApi.getTvCast(params);
  return res.data;
});

const tvSlice = createSlice({
  name: "tv",
  initialState: initialState,
  reducers: {
    clearSelectedTvShow: (state) => {
      state.selectedTvShow = initialState.selectedTvShow;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTvShowDetails.pending, (state) => {
        state.ui.loading = true;
      })
      .addCase(getTvShowDetails.fulfilled, (state, action) => {
        state.ui.loading = false;
        state.selectedTvShow.tvShowData = action.payload;
      })
      .addCase(getTvShowDetails.rejected, (state) => {
        state.ui.loading = false;
      })
      .addCase(getTvShowCast.pending, (state) => {
        state.ui.loading = true;
      })
      .addCase(getTvShowCast.fulfilled, (state, action) => {
        state.ui.loading = false;
        state.selectedTvShow.tvShowCast = action.payload;
      })
      .addCase(getTvShowCast.rejected, (state) => {
        state.ui.loading = false;
      });
  },
});

const { clearSelectedTvShow } = tvSlice.actions;

export default tvSlice.reducer;

export { clearSelectedTvShow, getTvShowDetails, getTvShowCast };
