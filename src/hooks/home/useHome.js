import { useDispatch, useSelector } from "react-redux";
import {
  getTrailer,
  getTrendingAll,
  getUpcomingMovies,
  getWhatsPopular,
} from "store/home";

function useHome() {
  const dispatch = useDispatch();

  const trendingAllLoading = useSelector(
    (state) => state?.home?.ui?.trendingAllLoading
  );
  const whatsPopularLoading = useSelector(
    (state) => state?.home?.ui?.whatsPopularLoading
  );
  const upcomingMoviesLoading = useSelector(
    (state) => state?.home?.ui?.upcomingMoviesLoading
  );
  const trailerLoading = useSelector((state) => state?.ui?.trailerLoading);

  //data
  const trendingAllData = useSelector(
    (state) => state?.home?.trendingAll?.results
  );
  const whatsPopularData = useSelector(
    (state) => state?.home?.whatsPopular?.results
  );

  const upcomingMoviesData = useSelector(
    (state) => state?.home?.upcomingMovies?.results
  );

  const trailerData = useSelector((state) => state?.home?.trailers?.results);

  //actions
  const getTrendingAllAction = (params) => dispatch(getTrendingAll(params));
  const getWhatsPopularAction = (params) => dispatch(getWhatsPopular(params));
  const getUpcomingMoviesAction = (params) =>
    dispatch(getUpcomingMovies(params));
  const getTrailerAction = (params) => dispatch(getTrailer(params));

  return {
    trendingAllLoading,
    trailerLoading,
    whatsPopularLoading,
    upcomingMoviesLoading,
    trendingAllData,
    whatsPopularData,
    upcomingMoviesData,
    trailerData,

    getTrendingAllAction,
    getWhatsPopularAction,
    getUpcomingMoviesAction,
    getTrailerAction,
  };
}

export default useHome;
