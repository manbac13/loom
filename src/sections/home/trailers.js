import {
  alpha,
  Box,
  Card,
  CardMedia,
  Fade,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { getTrailer } from "api/home";
import { imageUrl } from "config";
import useHome from "hooks/home/useHome";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import VideoDialog from "components/videoDialog";

const responsive = {
  largeDesktop: {
    breakpoint: {
      max: 3000,
      min: 1600, // Breakpoint for large desktops
    },
    items: 4, // Number of items to show on large desktops
    partialVisibilityGutter: 50,
  },
  desktop: {
    breakpoint: {
      max: 1600,
      min: 1400,
    },
    items: 4,
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
    items: 2,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: {
      max: 728,
      min: 464,
    },
    items: 2,
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

const LatestTrailers = () => {
  const theme = useTheme();
  const { getUpcomingMoviesAction, upcomingMoviesData, trailerLoading } =
    useHome();
  const [trailers, setTrailers] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [videoKey, setVideoKey] = useState("");

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    getUpcomingMoviesAction();
  }, []);

  useEffect(() => {
    const fetchTrailers = async () => {
      if (upcomingMoviesData?.length) {
        const trailerData = await Promise.all(
          upcomingMoviesData.map(async (movie) => {
            try {
              const response = await getTrailer({ id: movie.id });
              const trailerKey = response.data?.results?.find(
                (video) => video.type === "Trailer" && video.site === "YouTube"
              )?.key;

              return trailerKey ? { ...movie, trailerKey } : null;
            } catch (error) {
              console.error(
                `Error fetching trailer for movie ID ${movie.id}:`,
                error
              );
              return null;
            }
          })
        );

        if (!trailerLoading && trailerData) {
          // Add a slight delay before showing new data for smoother transition
          let finalArray = trailerData.filter(Boolean);
          const timer = setTimeout(() => {
            setTrailers(finalArray);
            setBackgroundImage(finalArray[0]?.backdrop_path);
            setIsTransitioning(false);
          }, 300);
          return () => clearTimeout(timer);
        }
      }
    };

    fetchTrailers();
  }, [upcomingMoviesData, trailerLoading]);

  const renderSkeletons = () => {
    return Array(9)
      .fill(0)
      .map((_, index) => (
        <Stack key={index} spacing={1} sx={{ px: 1 }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={240}
            sx={{ borderRadius: 2 }}
          />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
        </Stack>
      ));
  };
  return (
    <>
      <Stack
        spacing={2}
        sx={{
          position: "relative",
          px: { xs: 4, sm: 6, md: 10, lg: 20 },
          py: 3,
          color: theme.palette.common.white,
          backgroundColor: theme.palette.primary.dark,
          backgroundImage: `url(${imageUrl}${backgroundImage})`,
          backgroundSize: "cover", // Make the background image cover the whole container
          backgroundPosition: "center", // Center the background image
          backgroundRepeat: "no-repeat", // Prevent background repetition
          transition: "0.3s ease-in-out",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: alpha(theme.palette.primary.dark, 0.7), // Semi-transparent black overlay
            borderRadius: "8px",
          }}
        />
        <Typography
          sx={{
            zIndex: 1,
            fontSize: "20px",
            fontWeight: "500",
            color: theme.palette.common.white,
          }}
        >
          Latest Trailers
        </Typography>

        <Fade in={!trailerLoading} timeout={600}>
          <div>
            <Carousel slidesToSlide={2} responsive={responsive}>
              {!isTransitioning && trailers?.length > 0
                ? trailers.map((item, index) => (
                    <Stack spacing={1}>
                      <Box
                        sx={{
                          width: "93.8%",
                          height: "180px", // Set a fixed height
                          backgroundImage: `url(${imageUrl}${item.backdrop_path})`,
                          backgroundSize: "cover", // Make the background image cover the whole container
                          backgroundPosition: "center", // Center the background image
                          backgroundRepeat: "no-repeat", // Prevent background repetition
                          borderRadius: "8px 8px 8px 8px",
                          cursor: "pointer",
                          transition: "0.3s ease-in-out",
                          "&:hover": {
                            transform: "scale(1.07)",
                          },
                          "&:hover .play-icon": {
                            transform: "scale(1.1)",
                          },
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onMouseEnter={() => {
                          setBackgroundImage(item.backdrop_path);
                        }}
                        onClick={() => {
                          setDialogOpen(true);
                          setVideoKey(item.trailerKey);
                        }}
                      >
                        <PlayArrowIcon
                          className="play-icon"
                          sx={{
                            color: "#fff",
                            fontSize: 60,
                            transition: "0.3s ease-in-out",
                          }}
                        />
                      </Box>
                      <Typography
                        sx={{ fontSize: "16px", fontWeight: 600 }}
                        textAlign={"center"}
                      >
                        {item?.title}
                      </Typography>
                    </Stack>
                  ))
                : renderSkeletons()}
            </Carousel>
          </div>
        </Fade>
      </Stack>
      <VideoDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        videoKey={videoKey}
      />
    </>
  );
};

export default LatestTrailers;
