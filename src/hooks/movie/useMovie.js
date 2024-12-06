import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedMovie,
  getFilteredMovies,
  getMovieCast,
  getMovieDetails,
  getNowPlayingMovies,
  getPopularMovies,
  getSearchedMovies,
  getSimilarMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  setPage,
  setSearch,
} from "store/movies";

function useMovie() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.populrMovies?.ui?.loading);

  const popularMovies = useSelector((state) => state?.movie?.popularMovies);
  const nowPlayingMovies = useSelector(
    (state) => state?.movie?.nowPlayingMovies
  );
  const upcomingMovies = useSelector((state) => state?.movie?.upcomingMovies);
  const topRatedMovies = useSelector((state) => state?.movie?.topRatedMovies);
  const pageNumber = useSelector((state) => state?.movie?.page);
  const selectedMovie = useSelector(
    (state) => state?.movie?.selectedMovie?.movieData
  );
  const selectedMovieCast = useSelector(
    (state) => state?.movie?.selectedMovie?.movieCast
  );
  const similarMovies = useSelector(
    (state) => state?.movie?.selectedMovie?.similarMovies?.results
  );
  const movieSearched = useSelector((state) => state?.movie?.search);

  //action
  const getPoplarMoviesAction = (params) => dispatch(getPopularMovies(params));
  const getNowPlayingMoviesAction = (params) =>
    dispatch(getNowPlayingMovies(params));
  const getUpcomingMoviesAction = (params) =>
    dispatch(getUpcomingMovies(params));
  const getTopRatedMoviesAction = (params) =>
    dispatch(getTopRatedMovies(params));
  const setPageAction = (params) => dispatch(setPage(params));
  const getFilteredMoviesAction = (params) =>
    dispatch(getFilteredMovies(params));
  const getMovieDetailsAction = (params) => dispatch(getMovieDetails(params));
  const clearSelectedMovieAction = () => dispatch(clearSelectedMovie());
  const getMovieCastAction = (params) => dispatch(getMovieCast(params));
  const getSimilarMoviesAction = (params) => dispatch(getSimilarMovies(params));
  const getSearchedMovieAction = (params) =>
    dispatch(getSearchedMovies(params));

  const setSearchAction = (params) => dispatch(setSearch(params));

  return {
    loading,
    popularMovies,
    pageNumber,
    nowPlayingMovies,
    upcomingMovies,
    topRatedMovies,
    selectedMovie,
    selectedMovieCast,
    similarMovies,
    movieSearched,

    getPoplarMoviesAction,
    getNowPlayingMoviesAction,
    getUpcomingMoviesAction,
    getTopRatedMoviesAction,
    setPageAction,
    getFilteredMoviesAction,
    getMovieDetailsAction,
    clearSelectedMovieAction,
    getMovieCastAction,
    getSimilarMoviesAction,
    getSearchedMovieAction,
    setSearchAction,
  };
}

export default useMovie;
