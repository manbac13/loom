import { Fade, Skeleton, Stack, Typography } from "@mui/material";
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

const TrendingAll = () => {
  const { getTrendingAllAction, trendingAllData, trendingAllLoading } = useHome();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    getTrendingAllAction();
  }, []);

  useEffect(() => {
    if (!trendingAllLoading && trendingAllData) {
      // Add a slight delay before showing new data for smoother transition
      const timer = setTimeout(() => {
        setDisplayData(trendingAllData);
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [trendingAllLoading, trendingAllData]);

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
        <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
          Trending
        </Typography>

        <Fade in={!trendingAllLoading} timeout={600}>
          <div>
            <Carousel slidesToSlide={2} responsive={responsive}>
              {!isTransitioning && displayData?.length > 0
                ? displayData.map((item, index) => (
                    <Cards
                      key={item.id || index}
                      data={item}
                      mediaType={item.media_type}
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

export default TrendingAll;
