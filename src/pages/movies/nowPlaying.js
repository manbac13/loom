import { Fade, Grid2, Typography } from "@mui/material";
import Filter from "components/common/filter";
import PaginationItem from "components/common/pagination";
import Search from "components/common/search";
import { renderSkeletonsForGrid } from "components/common/skeleton/forGrid";
import IndividualCards from "components/individualCards";
import useFilter from "hooks/filter/useFilter";
import useMovie from "hooks/movie/useMovie";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

const NowPlaying = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayData, setDisplayData] = useState([]);

  const {
    pageNumber,
    setPageAction,
    getNowPlayingMoviesAction,
    loading,
    nowPlayingMovies,
    getFilteredMoviesAction,
    getSearchedMovieAction,
    movieSearched,
  } = useMovie();

  const { allFilters, filterStatus } = useFilter();

  const paramsForFetch = useMemo(() => {
    try {
      setIsTransitioning(true);
      if (!filterStatus) {
        return {
          page: pageNumber,
        };
      } else {
        return {
          page: pageNumber,
          ...allFilters,
        };
      }
    } catch (error) {
      return {
        page: 1,
      };
    }
  }, [pageNumber, allFilters, filterStatus]);

  const debouncedSearch = useCallback(
    debounce((search) => {
      setIsTransitioning(true);
      getSearchedMovieAction({ query: search, for: "nowPlayingMovies" });
    }, 600),
    []
  );

  useEffect(() => {
    if (movieSearched) {
      debouncedSearch(movieSearched);
    } else if (filterStatus) {
      getFilteredMoviesAction({
        filters: paramsForFetch,
        for: "nowPlayingMovies",
      });
    } else {
      getNowPlayingMoviesAction(paramsForFetch);
    }
    return () => debouncedSearch.cancel();
  }, [paramsForFetch, movieSearched]);

  useEffect(() => {
    if (!loading && nowPlayingMovies) {
      const timer = setTimeout(() => {
        setDisplayData(nowPlayingMovies?.results);
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading, nowPlayingMovies]);
  return (
    <>
      <Grid2
        container
        sx={{ px: { xs: 4, sm: 6, md: 10, lg: 20 }, py: 2 }}
        spacing={2}
      >
        <Grid2 size={9}>
          <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
            Now Playing
          </Typography>
        </Grid2>
        <Grid2 size={3}>
          <Search title="Search movies..." action={getSearchedMovieAction} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 3 }}>
          <Filter />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 9 }}>
          <Fade in={!isTransitioning} timeout={600}>
            <Grid2 container spacing={2}>
              {!isTransitioning && displayData?.length > 0
                ? displayData.map((item, index) => (
                    <Grid2 size={{ xs: 6, sm: 6, md: 3 }}>
                      <IndividualCards
                        key={item.id || index}
                        data={item}
                        mediaType={"movie"}
                      />
                    </Grid2>
                  ))
                : renderSkeletonsForGrid()}
              <Grid2
                size={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <PaginationItem
                  count={nowPlayingMovies?.total_pages}
                  pageNumber={pageNumber}
                  setPageAction={setPageAction}
                  setIsTransitioning={setIsTransitioning}
                />
              </Grid2>
            </Grid2>
          </Fade>
        </Grid2>
      </Grid2>
    </>
  );
};

export default NowPlaying;
