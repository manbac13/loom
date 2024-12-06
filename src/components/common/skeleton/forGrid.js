import { CardContent, Skeleton, Box, Card, Grid2 } from "@mui/material";

export const renderSkeletonsForGrid = () => {
  return Array(6)
    .fill(0)
    .map((_, index) => (
      <Grid2 key={index} size={{ xs: 6, sm: 6, md: 3 }}>
        <Card sx={{ height: "100%", borderRadius: 2 }}>
          <Box sx={{ position: "relative" }}>
            <Skeleton
              variant="rectangular"
              sx={{
                height: { xs: "200px", sm: "250px", md: "300px" },
                borderRadius: "8px 8px 0 0",
                width: "100%",
              }}
            />
            {/* Skeleton for rating circle */}
            <Box
              sx={{
                position: "absolute",
                bottom: "-19px",
                left: "16px",
                zIndex: 1,
              }}
            >
              <Skeleton
                variant="circular"
                width={38}
                height={38}
                sx={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
              />
            </Box>
          </Box>
          <CardContent sx={{ p: 2, pt: 3 }}>
            <Skeleton variant="text" width="80%" sx={{ mb: 1 }} />
            <Skeleton variant="text" width="60%" />
          </CardContent>
        </Card>
      </Grid2>
    ));
};
