import { alpha, Grid2, Stack, Typography, useTheme } from "@mui/material";
import { Video } from "iconsax-react";

const column_two = ["About", "Carrer", "Press", "Contact"];
const column_one = ["Movies", "TV Shows", "People", "Customer Stories"];

const Footer = () => {
  const theme = useTheme();
  return (
    <>
      <Grid2
        container
        sx={{
          px: { xs: 4, sm: 6, md: 10, lg: 20 },
          borderTop: `1px solid ${theme.palette.divider}`,
          py: 7,
          backgroundColor: alpha(theme.palette.primary.dark, 0.8),
          color: "#fff",
        }}
      >
        <Grid2 size={{ xs: 6, sm: 7, md: 9 }}>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Video size="36" />
            <Typography
              sx={{
                fontSize: "40px",
                fontWeight: 500,
                color: theme.palette.common.white,
              }}
            >
              Loom
            </Typography>
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 5, md: 3 }}>
          <Stack direction={"row"} spacing={4}>
            <Stack>
              <Typography sx={{ fontWeight: 600 }}>Product</Typography>
              {column_one.map((item, index) => (
                <Typography component={"a"}>{item}</Typography>
              ))}
            </Stack>
            <Stack>
              <Typography sx={{ fontWeight: 600 }}>Company</Typography>
              {column_two.map((item, index) => (
                <Typography component={"a"}>{item}</Typography>
              ))}
            </Stack>
          </Stack>
        </Grid2>
      </Grid2>
    </>
  );
};

export default Footer;
