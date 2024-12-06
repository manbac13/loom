import {
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { imageUrl } from "config";
import { useNavigate } from "react-router-dom";

const CastCard = ({ data }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <>
      <Card sx={{ width: 150, height: "auto" }}>
        <CardMedia
          component="img"
          sx={{
            height: 200, // This creates a 2:3 aspect ratio with width: 200
            objectFit: "cover",
            borderRadius: "8px 8px 0 0",
          }}
          image={`${imageUrl}${data.profile_path}`}
          alt={data.name}
        />
        <CardContent sx={{ p: 1 }} style={{ paddingBottom: "8px" }}>
          <Typography
            sx={{
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              cursor: "pointer",
              transition: "0.3s ease-in-out",
              "&:hover": {
                color: theme.palette.grey[700],
              },
            }}
            onClick={() => navigate(`/people/${data.id}`)}
          >
            {data?.name}
          </Typography>
          <Tooltip title={data?.character}>
            <Typography
              sx={{
                color: theme.palette.grey[700],
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data?.character || "-"}
            </Typography>
          </Tooltip>
        </CardContent>
      </Card>
    </>
  );
};

export default CastCard;
