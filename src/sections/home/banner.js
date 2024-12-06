import { Box, OutlinedInput, Stack, Typography, useTheme } from "@mui/material";

const HomeBanner = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.dark,
          py: 8, //original padding to be applied
          px: { xs: 4, sm: 6, md: 10, lg: 20 },
          height: '25vh'
        }}
      >
        <Stack direction={"column"} spacing={4}>
          <Stack>
            <Typography
              sx={{
                fontSize: "40px",
                fontWeight: 800,
                color: "#fff",
                lineHeight: "1",
              }}
            >
              Welcome.
            </Typography>
            <Typography
              sx={{ fontSize: "24px", fontWeight: 800, color: "#fff" }}
            >
              Millions of movies, TV shows and people to discover. Explore Now.
            </Typography>
          </Stack>

          <OutlinedInput
          placeholder="Search for a movie, tv show, person, ..."
            sx={{
              pl: 1,
              fontSize: '16px',
              backgroundColor: "#fff",
              color: "black", // Text color
              borderRadius: "40px", // Rounded corners
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc", // Optional: Customize border color
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                // borderColor: "#000", // Optional: Darker border on hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                // borderColor: "#000", // Optional: Border color when focused
              },
              "& .MuiInputBase-input::placeholder": {
                color: "black", // Placeholder text color
              },
            }}
          />
        </Stack>
      </Box>
    </>
  );
};

export default HomeBanner;
