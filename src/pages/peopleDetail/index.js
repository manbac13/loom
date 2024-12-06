import {
  Card,
  CardContent,
  CardMedia,
  Fade,
  Grid2,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { renderSkeletonForBackdrop } from "components/common/skeleton/forBackdrop";
import { renderSkeletonsForGrid } from "components/common/skeleton/forGrid";
import { imageUrl } from "config";
import usePeople from "hooks/people/usePeople";
import { Facebook, Instagram } from "iconsax-react";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { useNavigate, useParams } from "react-router-dom";
import ReadMoreReact from "read-more-react/dist/components/ReadMoreReact";
import { dateFormatter, getGender } from "utils";
import "react-multi-carousel/lib/styles.css";
import "./index.css";

const PeopleDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    getPersonDetailsAction,
    personalData,
    clearSelectedPersonAction,
    loading,
    getKnownForDataAction,
    knownForData,
  } = usePeople();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayData, setDisplayData] = useState({});

  //known for data
  const [isTransitioningKnownFor, setIsTransitioningKnownFor] = useState(false);
  const [displayKnownForData, setDisplayKnownForData] = useState([]);

  useEffect(() => {
    setIsTransitioning(true);
    setIsTransitioningKnownFor(true);
    getPersonDetailsAction({ id: id });
    getKnownForDataAction({ id: id });
    return () => {
      clearSelectedPersonAction();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!loading && personalData && knownForData) {
      const timer = setTimeout(() => {
        setDisplayData(personalData);
        setDisplayKnownForData(knownForData);
        setIsTransitioning(false);
        setIsTransitioningKnownFor(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading, personalData, knownForData]);

  const personMetaData = [
    {
      key: "Known for",
      value: displayData?.known_for_department,
      status: displayData?.known_for_department ? true : false,
    },
    {
      key: "Gender",
      value: getGender(displayData?.gender),
      status: displayData?.gender ? true : false,
    },
    {
      key: "Birthday",
      value: dateFormatter(displayData?.birthday),
      status: displayData?.birthday ? true : false,
    },
    {
      key: "Death",
      value: dateFormatter(displayData?.deathday),
      status: displayData?.deathday ? true : false,
    },
    {
      key: "Place of Birth",
      value: displayData?.place_of_birth,
      status: displayData?.place_of_birth ? true : false,
    },
  ];
  console.log("display known for", displayKnownForData);
  return (
    <>
      <Fade in={!isTransitioning} timeout={600}>
        <div>
          {!isTransitioning && displayData?.profile_path ? (
            <Grid2
              container
              sx={{ px: { xs: 4, sm: 6, md: 10, lg: 20 }, my: 4 }}
              spacing={4}
            >
              {/* column 1 */}
              <Grid2 size={3}>
                <Grid2 container spacing={2}>
                  <Grid2 size={12}>
                    <Card sx={{ width: "280px" }}>
                      <CardMedia
                        component="img"
                        sx={{
                          height: "420px",
                          borderRadius: "8px 8px 8px 8px",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        image={`${imageUrl}${displayData?.profile_path}`}
                        alt={displayData?.title}
                      />
                    </Card>
                  </Grid2>
                  <Grid2 size={12}>
                    <Stack direction={"row"} spacing={1}>
                      {socialMedia.map((item, index) => (
                        <IconButton>{item}</IconButton>
                      ))}
                    </Stack>
                  </Grid2>
                  <Grid2 size={12}>
                    <Stack spacing={1}>
                      <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
                        Personal Info
                      </Typography>
                    </Stack>
                    <Stack spacing={3}>
                      {personMetaData.map(
                        (item, index) =>
                          item.status && (
                            <Stack key={index}>
                              <Typography sx={{ fontWeight: 600 }}>
                                {item.key}
                              </Typography>
                              <Typography>{item.value}</Typography>
                            </Stack>
                          )
                      )}
                    </Stack>
                  </Grid2>
                </Grid2>
              </Grid2>

              {/* column 2 ------------------------------------------------------------------------------------------------*/}
              <Grid2 size={9}>
                <Stack sx={{ mb: 4 }}>
                  <Typography
                    variant="h2"
                    sx={{ fontWeight: 800, letterSpacing: "1px" }}
                  >
                    {displayData?.name}
                  </Typography>
                </Stack>

                <Stack spacing={2}>
                  <Stack spacing={1}>
                    <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
                      Biography
                    </Typography>
                    <Typography>
                      <ReadMoreReact
                        text={displayData?.biography}
                        min={500}
                        ideal={700}
                        max={900}
                        readMoreText={
                          <Typography
                            sx={{ fontStyle: "italic", cursor: "pointer" }}
                          >
                            Read more...
                          </Typography>
                        }
                      />
                    </Typography>
                  </Stack>

                  <Stack spacing={1}>
                    <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
                      Known for
                    </Typography>

                    <Fade in={!loading} timeout={600}>
                      <div>
                        <Carousel
                          slidesToSlide={2}
                          responsive={responsiveSimilar}
                          style={{ paddingBottom: "4px" }}
                          containerClass="carousel-container"
                        >
                          {!isTransitioningKnownFor &&
                          displayKnownForData?.length > 0
                            ? displayKnownForData?.map((item, index) => (
                                <Card
                                  key={index}
                                  sx={{ width: "150px", borderRadius: "8px" }}
                                >
                                  <CardMedia
                                    height={"225px"}
                                    component={"img"}
                                    image={`${imageUrl}${item.poster_path}`}
                                    alt={item.title}
                                  />
                                  <CardContent
                                    sx={{ p: 1 }}
                                    style={{ paddingBottom: "8px" }}
                                  >
                                    <Grid2 container>
                                      <Grid2 size={12} spacing={1}>
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
                                            navigate(`/${item.media_type}/${item.id}`)
                                          }
                                        >
                                          {item.title || item.name}
                                        </Typography>
                                      </Grid2>
                                      <Grid2 size={12}>
                                        <Tooltip title={item.character}>
                                          <Typography
                                            sx={{
                                              fontSize: "12px",
                                              whiteSpace: "nowrap",
                                              textOverflow: "ellipsis",
                                              overflow: "hidden",
                                            }}
                                          >
                                            {item.character || "-"}
                                          </Typography>
                                        </Tooltip>
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
                </Stack>
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

export default PeopleDetail;

const socialMedia = [
  <Facebook size="32" variant="Bold" color="#141414" />,
  <Instagram size="32" variant="Bold" color="#141414" />,
];

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
    items: 5.5,
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
