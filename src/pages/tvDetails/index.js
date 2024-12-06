import {
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
import useTv from "hooks/tv/useTv";
import useConfig from "hooks/useConfig";
import { Link } from "iconsax-react";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { useParams } from "react-router-dom";
import { convertCurrencyUnit, givebacklanguage } from "utils";
import "react-multi-carousel/lib/styles.css";

const TvDetails = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayData, setDisplayData] = useState({});

  //cast
  const [isTransitioningCast, setIsTransitioningCast] = useState(false);
  const [displayCastData, setDisplayCastData] = useState({});

  const {
    loading,
    getTvShowDetailsAction,
    selectedTvShow,
    clearSelectedTvShowAction,
    getTvShowCastAction,
    selectedTvShowCast,
  } = useTv();
  const { languages } = useConfig();

  useEffect(() => {
    clearSelectedTvShowAction();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    getTvShowDetailsAction({ id: id });
    getTvShowCastAction({ id: id });
    return () => {
      clearSelectedTvShowAction();
    };
  }, [id]);

  useEffect(() => {
    if (!loading && selectedTvShow && selectedTvShowCast) {
      const castCopy = selectedTvShowCast?.cast && [
        ...selectedTvShowCast?.cast,
      ];
      const timer = setTimeout(() => {
        setDisplayData(selectedTvShow);
        setDisplayCastData(
          castCopy?.sort((a, b) => b.popularity - a.popularity).slice(0, 10)
        );
        setIsTransitioning(false);
        setIsTransitioningCast(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading, selectedTvShow, selectedTvShowCast]);

  const movieMetaData = [
    {
      name: "Status",
      value: selectedTvShow?.status ? selectedTvShow?.status : "-",
    },
    {
      name: "Original Langauge",
      value: selectedTvShow?.original_language
        ? givebacklanguage(languages, selectedTvShow?.original_language)
        : "-",
    },
    {
      name: "Budget",
      value: selectedTvShow?.budget
        ? convertCurrencyUnit(selectedTvShow?.budget)
        : "-",
    },
    {
      name: "Revenue",
      value: selectedTvShow?.revenue
        ? convertCurrencyUnit(selectedTvShow?.revenue)
        : "-",
    },
  ];
  console.log("display data", selectedTvShow, selectedTvShowCast);
  return (
    <>
      <Fade in={!isTransitioning} timeout={600}>
        <div>
          {!isTransitioning && displayData?.poster_path ? (
            <Grid2 container spacing={4} sx={{ mb: 2 }}>
              {/* backdrop and introductory section */}
              <Grid2 size={12}>
                <Detailsbackdrop data={displayData} cast={selectedTvShowCast} />
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
                          href={selectedTvShow?.homepage}
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

export default TvDetails;

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
