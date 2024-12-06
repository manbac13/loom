import {
  Grid2,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const moviesOptions = [
  { name: "Popular", route: "/movie" },
  { name: "Now Playing", route: "/movie/now-playing" },
  { name: "Upcoming", route: "/movie/upcoming" },
  { name: "Top Rated", route: "/movie/top-rated" },
];

const tvOptions = [
  { name: "Popular", route: "/tv" },
  { name: "Now Playing", route: "/tv/now-playing" },
  { name: "Upcoming", route: "/tv/upcoming" },
  { name: "Top Rated", route: "/tv/top-rated" },
];

const peopleOptions = [{ name: "Popular People", route: "/people" }];
const moreOptions = [{ name: "About Us", route: "/more" }];

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (event, itemId) => {
    setAnchorEl(event.currentTarget);
    setHoveredItem(itemId);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
    setHoveredItem(null);
  };

  const open = Boolean(anchorEl);

  const menuItems = [
    { name: "Movies", id: "movies" },
    { name: "TV Shows", id: "tv_shows" },
    { name: "People", id: "people" },
    { name: "More", id: "more" },
  ];
  const returnOptions = (id) => {
    if (id === "movies") {
      return moviesOptions;
    } else if (id === "tv_shows") {
      return tvOptions;
    } else if (id === "people") {
      return peopleOptions;
    } else {
      return moreOptions;
    }
  };
  return (
    <>
      <Grid2
        container
        sx={{
          display: "flex",
          alignItems: "center",
          px: { xs: 4, sm: 6, md: 10, lg: 20 },
          boxShadow: "0 4px 6px -4px rgba(0, 0, 0, 0.1)",
          py: 1.5,
          "&:hover": {
            boxShadow: "0 5px 8px -4px rgba(0, 0, 0, 0.12)",
          },
          transition: "box-shadow 0.3s ease",
          position: "sticky",
          top: 0,
          zIndex: 1200,
          backgroundColor: theme.palette.common.white,
        }}
      >
        <Grid2 size={isSmallScreen ? 6 : 2}>
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: 500,
              color: theme.palette.primary.dark,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Loom
          </Typography>
        </Grid2>
        <Grid2 size={7} sx={{ display: isSmallScreen ? "none" : "block" }}>
          <Stack direction={"row"} spacing={4}>
            {menuItems?.map((item) => (
              <Stack
                onMouseEnter={(event) => handleMouseEnter(event, item.id)}
                onMouseLeave={handleMouseLeave}
                sx={{
                  cursor: "pointer",
                }}
              >
                <Typography
                  sx={{
                    color: theme.palette.grey[700],
                    fontSize: { xs: "12px", md: "14px", lg: "16px" },
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  key={item.id}
                >
                  {item.name}
                </Typography>
                <Menu
                  anchorEl={anchorEl}
                  open={open && hoveredItem === item.id}
                  onClose={handleMouseLeave}
                  MenuListProps={{
                    onMouseEnter: () => {}, // Keeps the menu open when hovering over it
                    onMouseLeave: handleMouseLeave,
                  }}
                  PaperProps={{
                    style: {
                      borderRadius: "12px",
                    },
                  }}
                >
                  {returnOptions(item.id)?.map((item, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        handleMouseLeave();
                        navigate(`${item.route}`);
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Menu>
              </Stack>
            ))}
          </Stack>
        </Grid2>
      </Grid2>
    </>
  );
};

export default Navbar;
