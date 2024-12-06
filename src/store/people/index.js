import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as PeopleApi from "api/people";

const initialState = {
  popularPeople: [],
  selectedPerson: {
    personalData: {},
    knownFor: {},
  },
  page: 1,
  ui: {
    loading: false,
  },
};

const getPeople = createAsyncThunk("people/getPeople", async (params) => {
  const res = await PeopleApi.getPeople(params);
  return res.data;
});

const getSearchedPeople = createAsyncThunk(
  "people/getSearchedPeople",
  async (params) => {
    const res = await PeopleApi.getSearchedPeople(params);
    return res.data;
  }
);

const getPersonDetails = createAsyncThunk(
  "people/getPersonDetails",
  async (params) => {
    const res = await PeopleApi.getPersonDetails(params);
    return res.data;
  }
);

const getKnownForData = createAsyncThunk(
  "people/getKnownForData",
  async (params) => {
    const res = await PeopleApi.getKnownForData(params);
    return res.data;
  }
);

const peopleSlice = createSlice({
  name: "people",
  initialState: initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    clearSelectedPerson: (state) => {
      state.selectedPerson = initialState.selectedPerson;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPeople.pending, (state) => {
        state.ui.loading = true;
      })
      .addCase(getPeople.fulfilled, (state, action) => {
        state.ui.loading = false;
        state.popularPeople = action.payload;
      })
      .addCase(getPeople.rejected, (state) => {
        state.ui.loading = false;
      })
      .addCase(getSearchedPeople.pending, (state) => {
        state.ui.loading = true;
      })
      .addCase(getSearchedPeople.fulfilled, (state, action) => {
        state.ui.loading = false;
        state.popularPeople = action.payload;
      })
      .addCase(getSearchedPeople.rejected, (state) => {
        state.ui.loading = false;
      })
      .addCase(getPersonDetails.pending, (state) => {
        state.ui.loading = true;
      })
      .addCase(getPersonDetails.fulfilled, (state, action) => {
        state.ui.loading = false;
        state.selectedPerson.personalData = action.payload;
      })
      .addCase(getPersonDetails.rejected, (state) => {
        state.ui.loading = false;
      })
      .addCase(getKnownForData.pending, (state) => {
        state.ui.loading = true;
      })
      .addCase(getKnownForData.fulfilled, (state, action) => {
        state.ui.loading = false;
        state.selectedPerson.knownFor = action.payload;
      })
      .addCase(getKnownForData.rejected, (state) => {
        state.ui.loading = false;
      });
  },
});

const { setPage, clearSelectedPerson } = peopleSlice.actions;

export default peopleSlice.reducer;

export {
  getPeople,
  setPage,
  getSearchedPeople,
  getPersonDetails,
  clearSelectedPerson,
  getKnownForData
};
