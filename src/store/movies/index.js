import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as MovieApi from "api/movies/index";
import * as FilterApi from "api/filter/index";

const initialState = {
  popularMovies: [],
  nowPlayingMovies: [],
  upcomingMovies: [],
  topRatedMovies: [],
  selectedMovie: {
    movieData: {},
    movieCast: {},
    similarMovies: [],
  },
  search: "",
  page: 1,
  ui: {
    loading: false,
  },
};

const getPopularMovies = createAsyncThunk(
  "movie/getPopularMovies",
  async (params) => {
    const res = await MovieApi.getPopularMovies(params);
    return res.data;
  }
);

const getNowPlayingMovies = createAsyncThunk(
  "movie/getNowPlayingMovies",
  async (params) => {
    const res = await MovieApi.getNowPlayingMovies(params);
    return res.data;
  }
);

const getUpcomingMovies = createAsyncThunk(
  "movie/getUpcomingMovies",
  async (params) => {
    const res = await MovieApi.getUpcomingMovies(params);
    return res.data;
  }
);

const getTopRatedMovies = createAsyncThunk(
  "movie/getTopRatedMovies",
  async (params) => {
    const res = await MovieApi.getTopRatedMovies(params);
    return res.data;
  }
);

const getFilteredMovies = createAsyncThunk(
  "movie/getFilteredMovies",
  async (params) => {
    const res = await FilterApi.getFilteredMovies(params);
    return res;
  }
);

const getMovieDetails = createAsyncThunk(
  "movie/getMovieDetails",
  async (params) => {
    const res = await MovieApi.getMovieDetails(params);
    return res.data;
  }
);

const getMovieCast = createAsyncThunk("movie/getMovieCast", async (params) => {
  const res = await MovieApi.getMovieCast(params);
  return res.data;
});

const getSimilarMovies = createAsyncThunk(
  "movie/getSimilarMovies",
  async (params) => {
    const res = await MovieApi.getSimilarMovies(params);
    return res.data;
  }
);

const getSearchedMovies = createAsyncThunk(
  "movie/getSearchedMovies",
  async (params) => {
    const res = await MovieApi.getSearchedMovie(params);
    return res;
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState: initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = {};
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPopularMovies.pending, (state, action) => {
        state.ui.loading = true;
      })
      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.ui.loading = false;
        state.popularMovies = action.payload;
      })
      .addCase(getPopularMovies.rejected, (state) => {
        state.ui.loading = false;
      })
      .addCase(getNowPlayingMovies.pending, (state) => {
        state.ui.loading = true;
      })
      .addCase(getNowPlayingMovies.fulfilled, (state, action) => {
        state.nowPlayingMovies = action.payload;
        state.ui.loading = false;
      })
      .addCase(getNowPlayingMovies.rejected, (state) => {
        state.ui.loading = false;
      })
      .addCase(getUpcomingMovies.pending, (state) => {
        state.ui.loading = true;
      })
      .addCase(getUpcomingMovies.fulfilled, (state, action) => {
        state.upcomingMovies = action.payload;
        state.ui.loading = false;
      })
      .addCase(getUpcomingMovies.rejected, (state) => {
        state.ui.loading = false;
      })
      .addCase(getTopRatedMovies.pending, (state) => {
        state.ui.loading = true;
      })
      .addCase(getTopRatedMovies.fulfilled, (state, action) => {
        state.topRatedMovies = action.payload;
        state.ui.loading = false;
      })
      .addCase(getTopRatedMovies.rejected, (state) => {
        state.ui.loading = false;
      })
      .addCase(getFilteredMovies.pending, (state, action) => {
        state.ui.loading = true;
      })
      .addCase(getFilteredMovies.fulfilled, (state, action) => {
        state.ui.loading = false;
        if (action.payload.for === "popularMovies") {
          state.popularMovies = action.payload.data;
        } else if (action.payload.for === "nowPlayingMovies") {
          state.nowPlayingMovies = action.payload.data;
        } else if (action.payload.for === "upcomingMovies") {
          state.upcomingMovies = action.payload.data;
        } else if (action.payload.for === "topRatedMovies") {
          state.topRatedMovies = action.payload.data;
        }
      })
      .addCase(getFilteredMovies.rejected, (state) => {
        state.ui.loading = false;
      })
      .addCase(getMovieDetails.pending, (state) => {
        state.ui.loading = true;
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.ui.loading = false;
        state.selectedMovie.movieData = action.payload;
      })
      .addCase(getMovieDetails.rejected, (state) => {
        state.ui.loading = false;
      })
      .addCase(getMovieCast.pending, (state) => {
        state.ui.loading = true;
      })
      .addCase(getMovieCast.fulfilled, (state, action) => {
        state.selectedMovie.movieCast = action.payload;
      })
      .addCase(getMovieCast.rejected, (state) => {
        state.ui.loading = false;
      })
      .addCase(getSimilarMovies.pending, (state) => {
        state.ui.loading = true;
      })
      .addCase(getSimilarMovies.fulfilled, (state, action) => {
        state.selectedMovie.similarMovies = action.payload;
      })
      .addCase(getSimilarMovies.rejected, (state) => {
        state.ui.loading = false;
      })
      .addCase(getSearchedMovies.pending, (state) => {
        state.ui.loading = true;
      })
      .addCase(getSearchedMovies.fulfilled, (state, action) => {
        state.ui.loading = false;
        if (action.payload.for === "popularMovies") {
          state.popularMovies = action.payload.data;
        } else if (action.payload.for === "nowPlayingMovies") {
          state.nowPlayingMovies = action.payload.data;
        } else if (action.payload.for === "upcomingMovies") {
          state.upcomingMovies = action.payload.data;
        } else if (action.payload.for === "topRatedMovies") {
          state.topRatedMovies = action.payload.data;
        }
      })
      .addCase(getSearchedMovies.rejected, (state) => {
        state.ui.loading = false;
      });
  },
});

const { setPage, clearSelectedMovie, setSearch } = movieSlice.actions;

export default movieSlice.reducer;

export {
  getPopularMovies,
  setPage,
  getNowPlayingMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getFilteredMovies,
  getMovieDetails,
  clearSelectedMovie,
  getMovieCast,
  getSimilarMovies,
  getSearchedMovies,
  setSearch
};
