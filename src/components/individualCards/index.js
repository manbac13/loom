import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import { imageUrl } from "config";
import { useNavigate } from "react-router-dom";
import { dateFormatter, getBorderColor } from "utils";

const IndividualCards = ({ data, mediaType }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <>
      <Card
        onClick={() => {
          mediaType === "tv"
            ? navigate(`/tv/${data.id}`)
            : navigate(`/movie/${data.id}`);
        }}
        sx={{
          height: "auto", // Height will adjust based on content
          borderRadius: 2,
          flexShrink: 0,
          position: "relative",
          cursor: "pointer",
          transition: "0.3s ease-in",
          "&:hover": {
            transform: "scale(1.01)",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          {" "}
          {/* Wrapper for positioning context */}
          <CardMedia
            component="img"
            sx={{
              aspectRatio: "2/3",
              borderRadius: "8px 8px 0 0",
              width: "100%",
              display: "block",
            }}
            image={`${imageUrl}${data.poster_path}`}
            alt={data.title}
          />
          {/* Rating Circle - positioned relative to image size */}
          <Box
            sx={{
              position: "absolute",
              bottom: "-5px", // Half of circle height to overlap
              left: "7px",
              transform: "translateY(50%)", // Center vertically at overlap point
              zIndex: 1,
            }}
          >
            <CircularProgress
              variant="determinate"
              value={(data.vote_average / 10) * 100}
              size={38}
              thickness={4}
              sx={{
                color: getBorderColor(theme, data.vote_average),
                backgroundColor: "black",
                borderRadius: "50%",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "white",
                  // fontSize: "12px",
                  // fontWeight: 500,
                  // lineHeight: 1,
                }}
              >
                {(data.vote_average * 10).toFixed(0)}
                <span style={{ fontSize: "6px" }}>%</span>
              </Typography>
            </Box>
          </Box>
        </Box>
        <CardContent sx={{ p: 1, pt: 3.5 }}>
          <Typography
            sx={{
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {mediaType === "tv" ? data?.name : data.title}
          </Typography>
          <Typography sx={{ color: theme.palette.grey[700] }}>
            {dateFormatter(
              mediaType === "tv" ? data?.first_air_date : data?.release_date
            )}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default IndividualCards;
