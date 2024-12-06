import { configureStore } from "@reduxjs/toolkit";
import Home from "./home/index";
import Movie from "./movies/index";
import Filter from "./filter/index";
import Config from "./config/index";
import People from "./people/index";
import Tv from "./tv/index";

const store = configureStore({
  reducer: {
    home: Home,
    movie: Movie,
    filter: Filter,
    config: Config,
    people: People,
    tv: Tv,
  },
});

export default store;
