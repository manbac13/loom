import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  getAllMovieGenreList,
  setGenreFilters,
  setSortFilter,
  setVoteAverage,
} from "store/filter";

function useFilter() {
  const dispatch = useDispatch();
  const allGenre = useSelector((state) => state?.filter?.genre?.genres);

  //filters
  const allFilters = useSelector((state) => state?.filter?.applied);
  const appliedGenre = useSelector((state) => state?.filter?.applied?.genre);
  const appliedSort = useSelector((state) => state?.filter?.applied?.sortBy);
  const appliedVoteAverage = useSelector(
    (state) => state?.filter?.applied?.vote_average
  );
  const appliedSearch = useSelector((state) => state?.filter?.applied?.search);
  const filterStatus = useSelector((state) => state?.filter?.filterStatus);

  //action
  const getAllMovieGenreListAction = (params) =>
    dispatch(getAllMovieGenreList(params));

  const setGenreFiltersAction = (params) => dispatch(setGenreFilters(params));
  const setSortByFilterAction = (params) => dispatch(setSortFilter(params));
  const setVoteAverageAction = (params) => dispatch(setVoteAverage(params));
  const clearFiltersAction = (params) => dispatch(clearFilters(params));

  return {
    allGenre,
    appliedGenre,
    appliedSort,
    allFilters,
    filterStatus,
    appliedVoteAverage,
    appliedSearch,

    getAllMovieGenreListAction,
    setGenreFiltersAction,
    setSortByFilterAction,
    setVoteAverageAction,
    clearFiltersAction,
  };
}

export default useFilter;
