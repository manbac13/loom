import { useEffect, useState } from "react";

import {
  Grid2,
  Card,
  CardMedia,
  Typography,
  Stack,
  useTheme,
  Box,
  CircularProgress,
  ToggleButton,
} from "@mui/material";
import { imageUrl } from "config";
import ColorThief from "colorthief";
import { dateFormatter, getBorderColor, timeFormatter } from "utils";
import { Data, Heart } from "iconsax-react";

const DotGap = ({ color }) => {
  return (
    <Box
      sx={{
        backgroundColor: color,
        width: "5px",
        height: "5px",
        borderRadius: "50%",
      }}
    ></Box>
  );
};

const Detailsbackdrop = ({ data, cast }) => {
  const theme = useTheme();
  const [dominantColor, setDominantColor] = useState([0, 0, 0]);
  const [textColor, setTextColor] = useState("#fff");
  const [greyVar, setGreyVar] = useState(theme.palette.grey[400]);

  //toggle state
  const [favourite, setFavourite] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = `${imageUrl}${data?.backdrop_path}`;

    img.onload = () => {
      const colorThief = new ColorThief();
      const dominant = colorThief.getColor(img);
      setDominantColor(dominant);

      // Calculate luminance to decide text color
      const luminance =
        (0.299 * dominant[0] + 0.587 * dominant[1] + 0.114 * dominant[2]) / 255;
      setTextColor(luminance > 0.5 ? "#000" : "#fff"); // Use black for light colors, white for dark
      setGreyVar(
        luminance > 0.5 ? theme.palette.grey[800] : theme.palette.grey[400]
      );
    };
  }, [data?.backdrop_path]);

  const overlayColor = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.7)`;

  const iconButtons = {
    color: "#fff",
    borderRadius: "50%",
    backgroundColor: theme.palette.common.black,
    borderColor: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.common.black,
    },
  };

  return (
    <>
      <Grid2
        container
        spacing={4}
        sx={{
          position: "relative",
          backgroundImage: `url(${imageUrl}${data?.backdrop_path})`,
          height: "550px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          pt: 5,
          color: textColor,
          px: { xs: 4, sm: 6, md: 10, lg: 20 },
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: overlayColor,
          }}
        ></div>
        <Grid2 size={3.5} sx={{ zIndex: 1 }}>
          <Card
            sx={{ width: "300px", height: "475px", background: "transparent" }}
          >
            <CardMedia
              component="img"
              sx={{
                borderRadius: "8px 8px 8px 8px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              image={`${imageUrl}${data?.poster_path}`}
              alt={data?.title}
            />
          </Card>
        </Grid2>

        {/* movie details */}

        <Grid2 size={8.5} sx={{ zIndex: 1 }}>
          <Stack direction={"row"} spacing={1}>
            <Typography
              variant="h2"
              sx={{ fontWeight: 800, letterSpacing: "1px" }}
            >
              {data?.title || data?.name}
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 500, color: greyVar }}>
              {`(${
                data?.release_date?.split("-")[0] ||
                data?.first_air_date?.split("-")[0]
              })`}
            </Typography>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Typography>
              {data?.release_date
                ? dateFormatter(data?.release_date)
                : dateFormatter(data?.first_air_date)}
            </Typography>
            <DotGap color={textColor} />
            <Typography>
              {data?.genres?.map((item) => item.name).join(", ")}
            </Typography>
            <DotGap color={textColor} />
            {data?.runtime && (
              <Typography>{timeFormatter(data?.runtime)}</Typography>
            )}
          </Stack>
          <Stack
            direction={"row"}
            sx={{ mt: 4 }}
            spacing={1}
            alignItems={"center"}
          >
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress
                variant="determinate"
                value={(data.vote_average / 10) * 100}
                size={60}
                thickness={4}
                sx={{
                  color: getBorderColor(theme, data?.vote_average),
                  backgroundColor: "black",
                  borderRadius: "50%",
                }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  component="div"
                  sx={{ color: "#fff", fontSize: "18px" }}
                >
                  {(data.vote_average * 10).toFixed(0)}
                  <span style={{ fontSize: "6px" }}>%</span>
                </Typography>
              </Box>
            </Box>
            <Stack>
              <Typography sx={{ fontWeight: 600 }}>User</Typography>
              <Typography sx={{ fontWeight: 600 }}>Score</Typography>
            </Stack>
          </Stack>

          <Stack direction={"row"} spacing={1} sx={{ mt: 2 }}>
            <ToggleButton
              value="data"
              selected={favourite}
              onChange={() => setFavourite((prev) => !prev)}
              size="small"
              sx={{
                ...iconButtons,
                "&.Mui-selected": {
                  backgroundColor: "#141414",
                  color: theme.palette.error.dark, // Change text color for selected state
                  "&:hover": {
                    backgroundColor: "#141414", // Prevent hover effect by keeping the same background
                  },
                },
              }}
            >
              <Data
                color={favourite === true ? theme.palette.error.dark : "#fff"}
              />
            </ToggleButton>

            <ToggleButton
              value="like"
              selected={liked}
              onChange={() => setLiked((prev) => !prev)}
              size="small"
              sx={{
                ...iconButtons,
                "&.Mui-selected": {
                  backgroundColor: "#141414",
                  color: theme.palette.error.dark, // Change text color for selected state
                  "&:hover": {
                    backgroundColor: "#141414", // Prevent hover effect by keeping the same background
                  },
                },
              }}
            >
              <Heart
                variant={liked && "Bold"}
                color={liked === true ? theme.palette.error.dark : "#fff"}
              />
            </ToggleButton>
          </Stack>

          <Stack sx={{ mt: 4 }}>
            <Typography
              sx={{ color: greyVar, fontStyle: "italic", fontWeight: 500 }}
            >
              {data?.tagline}
            </Typography>
          </Stack>

          <Stack sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
              Overview
            </Typography>
            <Typography>{data?.overview}</Typography>
          </Stack>

          <Stack sx={{ mt: 4 }}>
            <Grid2 container>
              {cast?.crew?.map(
                (item, index) =>
                  (item.job === "Director" ||
                    item.job === "Writer" ||
                    item.job === "Screenplay") && (
                    <Grid2 size={3} key={index}>
                      <Stack>
                        <Typography sx={{ fontWeight: 600 }}>
                          {item.name}
                        </Typography>
                        <Typography>{item.job}</Typography>
                      </Stack>
                    </Grid2>
                  )
              )}
            </Grid2>
          </Stack>
        </Grid2>
      </Grid2>
    </>
  );
};

export default Detailsbackdrop;
