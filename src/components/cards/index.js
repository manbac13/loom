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

const Cards = ({ data, mediaType }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <>
      <Card
        sx={{
          width: 150,
          height: "auto",
          borderRadius: 2,
          flexShrink: 0,
          position: "relative",
          cursor: "pointer",
        }}
        onClick={() => {
          mediaType === "tv"
            ? navigate(`/tv/${data.id}`)
            : navigate(`/movie/${data.id}`);
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "210px",
            left: "7px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            variant="determinate"
            value={(data.vote_average / 10) * 100}
            size={35}
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontSize: "12px", fontWeight: 500 }}
            >
              {(data.vote_average * 10).toFixed(0)}
              <span style={{ fontSize: "6px" }}>%</span>
            </Typography>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{
            height: 225, // This creates a 2:3 aspect ratio with width: 200
            objectFit: "cover",
            borderRadius: "8px 8px 0 0",
          }}
          image={`${imageUrl}${data.poster_path}`}
          alt={data.title}
        />
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

export default Cards;
