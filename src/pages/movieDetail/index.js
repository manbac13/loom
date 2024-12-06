import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Fade,
  Grid2,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import CastCard from "components/castCard";
import Detailsbackdrop from "components/common/DetailsBackdrop";
import { renderSkeletonForBackdrop } from "components/common/skeleton/forBackdrop";
import { renderSkeletonsForGrid } from "components/common/skeleton/forGrid";
import useMovie from "hooks/movie/useMovie";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { useNavigate, useParams } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import "./index.css";
import { Link } from "iconsax-react";
import { convertCurrencyUnit, givebacklanguage } from "utils";
import useConfig from "hooks/useConfig";
import { imageUrl } from "config";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    getMovieDetailsAction,
    selectedMovie,
    similarMovies,
    clearSelectedMovieAction,
    loading,
    getMovieCastAction,
    selectedMovieCast,
    getSimilarMoviesAction,
  } = useMovie();
  const { languages } = useConfig();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayData, setDisplayData] = useState({});

  //cast data
  const [isTransitioningCast, setIsTransitioningCast] = useState(false);
  const [displayCastData, setDisplayCastData] = useState({});

  //similar data
  const [isTransitioningSimilar, setIsTransitioningSimilar] = useState(false);
  const [displaySimilarData, setDisplaySimilarData] = useState([]);

  useEffect(() => {
    clearSelectedMovieAction();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    getMovieDetailsAction({ id: id });
    getMovieCastAction({ id: id });
    getSimilarMoviesAction({ id: id });
    return () => {
      clearSelectedMovieAction();
    };
  }, [id]);

  useEffect(() => {
    if (!loading && selectedMovie && selectedMovieCast && similarMovies) {
      const castCopy = selectedMovieCast?.cast && [...selectedMovieCast?.cast];
      const timer = setTimeout(() => {
        setDisplayData(selectedMovie);
        setDisplayCastData(
          castCopy?.sort((a, b) => b.popularity - a.popularity).slice(0, 10)
        );
        setDisplaySimilarData(similarMovies);
        setIsTransitioning(false);
        setIsTransitioningCast(false);
        setIsTransitioningSimilar(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading, selectedMovie, selectedMovieCast, similarMovies]);

  const movieMetaData = [
    {
      name: "Status",
      value: selectedMovie?.status ? selectedMovie?.status : "-",
    },
    {
      name: "Original Langauge",
      value: selectedMovie?.original_language
        ? givebacklanguage(languages, selectedMovie?.original_language)
        : "-",
    },
    {
      name: "Budget",
      value: selectedMovie?.budget
        ? convertCurrencyUnit(selectedMovie?.budget)
        : "-",
    },
    {
      name: "Revenue",
      value: selectedMovie?.revenue
        ? convertCurrencyUnit(selectedMovie?.revenue)
        : "-",
    },
  ];
  console.log("meta data", selectedMovie?.homepage);
  return (
    <>
      <Fade in={!isTransitioning} timeout={600}>
        <div>
          {!isTransitioning && displayData?.poster_path ? (
            <Grid2 container spacing={4} sx={{ mb: 2 }}>
              {/* backdrop and introductory section */}
              <Grid2 size={12}>
                <Detailsbackdrop data={displayData} cast={selectedMovieCast} />
              </Grid2>

              {/* cast & crew section */}
              <Grid2
                size={9}
                sx={{ paddingInlineStart: { xs: 4, sm: 6, md: 10, lg: 20 } }}
              >
                <Grid2 container spacing={3}>
                  <Grid2 size={12}>
                    <Stack spacing={2}>
                      <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
                        Cast
                      </Typography>

                      <Fade in={!loading} timeout={600}>
                        <div>
                          <Carousel
                            slidesToSlide={2}
                            responsive={responsiveCast}
                            style={{ paddingBottom: "4px" }}
                            containerClass="carousel-container"
                          >
                            {!isTransitioningCast && displayCastData?.length > 0
                              ? displayCastData?.map((item, index) => (
                                  <CastCard
                                    key={item.id || index}
                                    data={item}
                                  />
                                ))
                              : renderSkeletonsForGrid()}
                          </Carousel>
                        </div>
                      </Fade>
                    </Stack>
                  </Grid2>
                  <Grid2 size={12}>
                    <Divider />
                  </Grid2>
                  <Grid2 size={12}>
                    <Stack spacing={2}>
                      <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
                        You would also like
                      </Typography>

                      <Fade in={!loading} timeout={600}>
                        <div>
                          <Carousel
                            slidesToSlide={2}
                            responsive={responsiveSimilar}
                            style={{ paddingBottom: "4px" }}
                            containerClass="carousel-container"
                          >
                            {!isTransitioningSimilar &&
                            displaySimilarData?.length > 0
                              ? displaySimilarData?.map((item, index) => (
                                  <Card key={index} sx={{ width: "192px" }}>
                                    <CardMedia
                                      height={"108px"}
                                      component={"img"}
                                      image={`${imageUrl}${item.backdrop_path}`}
                                      alt={item.title}
                                    />
                                    <CardContent
                                      sx={{ p: 1 }}
                                      style={{ paddingBottom: "8px" }}
                                    >
                                      <Grid2 container>
                                        <Grid2 size={9} spacing={1}>
                                          <Typography
                                            sx={{
                                              whiteSpace: "nowrap",
                                              textOverflow: "ellipsis",
                                              overflow: "hidden",
                                              fontSize: "12px",
                                              fontWeight: 600,
                                              cursor: "pointer",
                                              transition: "0.3s ease-in-out",
                                              "&:hover": {
                                                color: theme.palette.grey[700],
                                              },
                                            }}
                                            onClick={() =>
                                              navigate(`/movie/${item.id}`)
                                            }
                                          >
                                            {item.title}
                                          </Typography>
                                        </Grid2>
                                        <Grid2 size={3}>
                                          <Typography
                                            textAlign={"right"}
                                            sx={{
                                              fontSize: "12px",
                                            }}
                                          >
                                            {`${(
                                              item.vote_average * 10
                                            ).toFixed(0)} %`}
                                          </Typography>
                                        </Grid2>
                                      </Grid2>
                                    </CardContent>
                                  </Card>
                                ))
                              : renderSkeletonsForGrid()}
                          </Carousel>
                        </div>
                      </Fade>
                    </Stack>
                  </Grid2>
                </Grid2>
              </Grid2>
              <Grid2
                size={3}
                sx={{
                  paddingInlineEnd: { xs: 4, sm: 6, md: 10, lg: 20 },
                  pt: 10,
                }}
              >
                {
                  <Stack spacing={3}>
                    <Stack direction={"row"}>
                      <Tooltip title="Visit homepage">
                        <a
                          href={selectedMovie?.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            cursor: "pointer",
                            textDecoration: "none", // Removes default link styles
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#e0e0e0")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "#f0f0f0")
                          }
                        >
                          <Link size="20" />
                        </a>
                      </Tooltip>
                    </Stack>

                    {movieMetaData?.map((item, index) => (
                      <Stack key={index}>
                        <Typography sx={{ fontWeight: 600 }}>
                          {item.name}
                        </Typography>
                        <Typography>{item.value}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                }
              </Grid2>
            </Grid2>
          ) : (
            renderSkeletonForBackdrop()
          )}
        </div>
      </Fade>
    </>
  );
};

export default MovieDetails;

const responsiveCast = {
  largeDesktop: {
    breakpoint: {
      max: 3000,
      min: 1600, // Breakpoint for large desktops
    },
    items: 9, // Number of items to show on large desktops
    partialVisibilityGutter: 50,
  },
  desktop: {
    breakpoint: {
      max: 1600,
      min: 1400,
    },
    items: 5.5,
    partialVisibilityGutter: 40,
  },

  desktop_2: {
    breakpoint: {
      max: 1400,
      min: 1024,
    },
    items: 6,
    partialVisibilityGutter: 40,
  },
  custom: {
    breakpoint: {
      max: 1024,
      min: 728,
    },
    items: 4,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: {
      max: 728,
      min: 464,
    },
    items: 3,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 2,
    partialVisibilityGutter: 30,
  },
};

const responsiveSimilar = {
  largeDesktop: {
    breakpoint: {
      max: 3000,
      min: 1600, // Breakpoint for large desktops
    },
    items: 5, // Number of items to show on large desktops
    partialVisibilityGutter: 50,
  },
  desktop: {
    breakpoint: {
      max: 1600,
      min: 1400,
    },
    items: 4.5,
    partialVisibilityGutter: 40,
  },

  desktop_2: {
    breakpoint: {
      max: 1400,
      min: 1024,
    },
    items: 3,
    partialVisibilityGutter: 40,
  },
  custom: {
    breakpoint: {
      max: 1024,
      min: 728,
    },
    items: 4,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: {
      max: 728,
      min: 464,
    },
    items: 3,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 2,
    partialVisibilityGutter: 30,
  },
};
