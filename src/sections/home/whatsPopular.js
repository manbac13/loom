import {
  Fade,
  Skeleton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Cards from "components/cards";
import useHome from "hooks/home/useHome";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
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
    items: 7,
    partialVisibilityGutter: 40,
  },

  desktop_2: {
    breakpoint: {
      max: 1400,
      min: 1024,
    },
    items: 5,
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

const WhatsPopular = () => {
  const { getWhatsPopularAction, whatsPopularData, whatsPopularLoading } =
    useHome();
  const [alignment, setAlignment] = useState("movie");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayData, setDisplayData] = useState([]);

  const handleToggleChange = (event, newAlignment) => {
    if (newAlignment === null || newAlignment === alignment) return;
    setIsTransitioning(true);
    setAlignment(newAlignment);
  };

  useEffect(() => {
    getWhatsPopularAction({ platForm: alignment });
  }, [alignment]);

  useEffect(() => {
    if (!whatsPopularLoading && whatsPopularData) {
      // Add a slight delay before showing new data for smoother transition
      const timer = setTimeout(() => {
        setDisplayData(whatsPopularData);
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [whatsPopularLoading, whatsPopularData]);

  const toggleStyle = {
    borderRadius: "20px",
    fontWeight: "600",
  };

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
      <Stack spacing={2}>
        <Stack direction={"row"} spacing={3} alignItems={"center"}>
          <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
            What&apos;s Popular
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleToggleChange}
            size="small"
          >
            <ToggleButton sx={toggleStyle} value="movie">
              Movie
            </ToggleButton>
            <ToggleButton sx={toggleStyle} value="tv">
              On TV
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Fade in={!whatsPopularLoading} timeout={600}>
          <div>
            <Carousel slidesToSlide={2} responsive={responsive}>
              {!isTransitioning && displayData?.length > 0
                ? displayData.map((item, index) => (
                    <Cards
                      key={item.id || index}
                      data={item}
                      mediaType={alignment}
                    />
                  ))
                : renderSkeletons()}
            </Carousel>
          </div>
        </Fade>
      </Stack>
    </>
  );
};

export default WhatsPopular;
