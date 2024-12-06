import { lazy, useEffect, useMemo } from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import TypographyTheme from "themes/typography";
import Loadable from "components/lodable";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import useConfig from "hooks/useConfig";
const Navbar = Loadable(lazy(() => import("components/navbar")));
const Home = Loadable(lazy(() => import("pages/home")));
const Footer = Loadable(lazy(() => import("pages/footer")));
const EmptyPlaceholder = Loadable(
  lazy(() => import("components/common/emptyPlaceholder/index"))
);

//movie
const PopularMovies = Loadable(lazy(() => import("pages/movies/popular")));
const NowPlayingMovies = Loadable(
  lazy(() => import("pages/movies/nowPlaying"))
);
const UpcomingMovies = Loadable(lazy(() => import("pages/movies/upcoming")));
const TopRatedMovies = Loadable(lazy(() => import("pages/movies/topRated")));

//movieDetails
const MovieDetails = Loadable(lazy(() => import("pages/movieDetail")));
//tvdetails
const TvDetails = Loadable(lazy(() => import("pages/tvDetails")));

//people
const People = Loadable(lazy(() => import("pages/people")));
const PeopleDetails = Loadable(lazy(() => import("pages/peopleDetail")));
//search

//routeConfig
const routeConfig = [
  { path: "/", element: <Home /> },
  { path: "/movie", element: <PopularMovies /> },
  { path: "/movie/now-playing", element: <NowPlayingMovies /> },
  { path: "/movie/upcoming", element: <UpcomingMovies /> },
  { path: "/movie/top-rated", element: <TopRatedMovies /> },
  //tv
  { path: "/tv", element: null },
  { path: "/tv/now-playing", element: null },
  { path: "/tv/upcoming", element: null },
  { path: "/tv/top-rated", element: null },
  //people
  { path: "/people", element: <People /> },
  { path: "/people/:id", element: <PeopleDetails /> },
  //more
  { path: "/more", element: null },
  //movie details
  { path: "/movie/:id", element: <MovieDetails /> },
  //tv details
  { path: "/tv/:id", element: <TvDetails /> },
  //search
];

function App() {
  const typographyTheme = useMemo(() => TypographyTheme(), []);
  const { getLangaugesAction, languages } = useConfig();

  const theme = createTheme({
    typography: typographyTheme,
  });

  useEffect(() => {
    if (!languages?.length) {
      getLangaugesAction();
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {routeConfig.map(({ path, element }, index) => (
            <Route
              key={index}
              path={path}
              element={
                element || (
                  <EmptyPlaceholder msg="We are yet to build this. It will be available soon!" />
                )
              } // Fallback to ComingSoon
            />
          ))}
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
