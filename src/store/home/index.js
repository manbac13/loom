import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as HomeApi from "api/home/index";

const initialState = {
  trendingAll: [],
  whatsPopular: [],
  upcomingMovies: [],
  trailers: [],
  ui: {
    trendingAllLoading: false,
    whatsPopularLoading: false,
    upcomingMoviesLoading: false,
    trailerLoading: false,
  },
};

const getTrendingAll = createAsyncThunk("home/getTrendingAll", async () => {
  const res = await HomeApi.getTrendingAll();
  return res.data;
});

const getWhatsPopular = createAsyncThunk(
  "home/getWhatsPopular",
  async (params) => {
    const res = await HomeApi.getWhatsPopular(params);
    return res.data;
  }
);

const getUpcomingMovies = createAsyncThunk(
  "home/getUpcomingMovies",
  async () => {
    const res = await HomeApi.getUpcomingMovies();
    return res.data;
  }
);

const getTrailer = createAsyncThunk("home/getTrailer", async (params) => {
  const res = await HomeApi.getTrailer(params);
  return res.data;
});

const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrendingAll.pending, (state) => {
        state.ui.trendingAllLoading = true;
      })
      .addCase(getTrendingAll.fulfilled, (state, action) => {
        state.trendingAll = action.payload;
        state.ui.trendingAllLoading = false;
      })
      .addCase(getTrendingAll.rejected, (state) => {
        state.ui.trendingAllLoading = false;
      })
      .addCase(getWhatsPopular.pending, (state, action) => {
        state.ui.whatsPopularLoading = true;
      })
      .addCase(getWhatsPopular.fulfilled, (state, action) => {
        state.ui.whatsPopularLoading = false;
        state.whatsPopular = action.payload;
      })
      .addCase(getWhatsPopular.rejected, (state) => {
        state.ui.whatsPopularLoading = false;
      })
      .addCase(getUpcomingMovies.pending, (state) => {
        state.ui.upcomingMoviesLoading = true;
      })
      .addCase(getUpcomingMovies.fulfilled, (state, action) => {
        state.ui.upcomingMoviesLoading = false;
        state.upcomingMovies = action.payload;
      })
      .addCase(getUpcomingMovies.rejected, (state) => {
        state.ui.upcomingMoviesLoading = false;
      })
      .addCase(getTrailer.pending, (state) => {
        state.ui.trailerLoading = true;
      })
      .addCase(getTrailer.fulfilled, (state, action) => {
        state.trailers = action.payload;
        state.ui.trailerLoading = false;
      })
      .addCase(getTrailer.rejected, (state) => {
        state.ui.trailerLoading = false;
      });
  },
});

const {} = homeSlice.actions;

export default homeSlice.reducer;

export { getTrendingAll, getWhatsPopular, getUpcomingMovies, getTrailer };
