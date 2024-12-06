import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as FilterApi from "api/filter/index";
import { checkIfFiltersApplied } from "utils";

const initialState = {
  genre: [],
  applied: {
    sortBy: "",
    genre: [],
    vote_average: [0, 10],
  },
  filterStatus: false,
  ui: {
    loading: false,
  },
};

const getAllMovieGenreList = createAsyncThunk(
  "filter/getAllMovieGenre",
  async () => {
    const res = await FilterApi.getAllMovieGenreList();
    return res.data;
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setGenreFilters: (state, action) => {
      if (state.applied.genre.includes(action.payload)) {
        state.applied.genre = state.applied.genre.filter(
          (item) => item !== action.payload
        );
      } else {
        state.applied.genre = [...state.applied.genre, action.payload];
      }
      state.filterStatus = checkIfFiltersApplied({
        ...state.applied,
        genre: state.applied.genre,
      });
    },
    setSortFilter: (state, action) => {
      state.applied.sortBy = action.payload;
      state.filterStatus = checkIfFiltersApplied({
        ...state.applied,
        sortBy: action.payload,
      });
    },
    setVoteAverage: (state, action) => {
      state.applied.vote_average = action.payload;
      state.filterStatus = checkIfFiltersApplied({
        ...state.applied,
        vote_average: action.payload,
      });
    },
    clearFilters: (state) => {
      state.applied = initialState.applied;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovieGenreList.pending, (state) => {
        state.ui.loading = true;
      })
      .addCase(getAllMovieGenreList.fulfilled, (state, action) => {
        state.ui.loading = false;
        state.genre = action.payload;
      })
      .addCase(getAllMovieGenreList.rejected, (state) => {
        state.ui.loading = false;
      });
  },
});

const {
  setGenreFilters,
  setSortFilter,
  setVoteAverage,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;

export {
  getAllMovieGenreList,
  setGenreFilters,
  setSortFilter,
  setVoteAverage,
  clearFilters,
};
