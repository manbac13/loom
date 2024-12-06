const { Card, Skeleton, Grid2 } = require("@mui/material");

export const renderSkeletonForBackdrop = () => {
  return (
    <>
      <Grid2
        container
        spacing={4}
        sx={{
          position: "relative",
          backgroundColor: "#e0e0e0", // Light grey to simulate a background
          height: "550px",
          pt: 5,
        }}
      >
        <Grid2
          size={3.5}
          display={"flex"}
          justifyContent={"flex-end"}
          sx={{ zIndex: 1 }}
        >
          <Card
            sx={{
              height: "475px",
              width: "300px",
              background: "transparent",
            }}
          >
            <Skeleton
              variant="rectangular"
              sx={{
                height: '475px',
                width: "100%",
                borderRadius: "8px",
                display: "block",
              }}
            />
          </Card>
        </Grid2>
      </Grid2>
    </>
  );
};
