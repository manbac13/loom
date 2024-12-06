import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Divider,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import useFilter from "hooks/filter/useFilter";
import { ArrowDown2 } from "iconsax-react";
import { useCallback, useEffect, useState } from "react";
import { sortFiltersList } from "utils";
import Dot from "../Dot";
import { debounce } from "lodash";

const minDistance = 1;

const Filter = () => {
  const theme = useTheme();
  const [rangeValue, setRangeValue] = useState([0, 10]);

  const {
    getAllMovieGenreListAction,
    allGenre,
    appliedGenre,
    setGenreFiltersAction,
    appliedSort,
    setSortByFilterAction,
    setVoteAverageAction,
  } = useFilter();

  useEffect(() => {
    if (!allGenre || allGenre?.length <= 0) {
      getAllMovieGenreListAction();
    }
  }, []);

  const handleGenreClick = (id) => {
    setGenreFiltersAction(id);
  };

  const handleSortFilterChange = (e) => {
    setSortByFilterAction(e.target.value);
  };

  const handleRangeValueChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setRangeValue([
        Math.min(newValue[0], rangeValue[1] - minDistance),
        rangeValue[1],
      ]);
    } else {
      setRangeValue([
        rangeValue[0],
        Math.max(newValue[1], rangeValue[0] + minDistance),
      ]);
    }
    debouncedSetVoteAverage(newValue);
  };

  const debouncedSetVoteAverage = useCallback(
    debounce((newValue) => {
      if (newValue[0] === 0 && newValue[1] === 10) {
        setVoteAverageAction([0, 10]);
      } else {
        setVoteAverageAction([newValue[0], newValue[1]]);
      }
    }, 600), // Adjust debounce time as needed (e.g., 300ms)
    []
  );

  const returnRangeValueApplyStatus = () => {
    if (rangeValue[0] === 0 && rangeValue[1] === 10) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <>
      <Grid2
        container
        sx={{
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        }}
        spacing={1}
      >
        {/* sort */}
        <Grid2 size={12}>
          <Accordion>
            <AccordionSummary
              sx={{ backgroundColor: theme.palette.divider }}
              expandIcon={<ArrowDown2 size="18" />}
            >
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <Typography sx={{ fontSize: "16px" }}>Sort</Typography>
                {appliedSort && <Dot color={theme.palette.error.main} />}
              </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Select Sort Filter</InputLabel>
                <Select
                  label="Select Sort Filter"
                  onChange={handleSortFilterChange}
                  value={appliedSort}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {sortFiltersList?.map((item) => (
                    <MenuItem key={item.key} value={item.key}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </Grid2>
        <Grid2 size={12}>
          <Accordion defaultExpanded>
            <AccordionSummary
              sx={{ backgroundColor: theme.palette.divider }}
              expandIcon={<ArrowDown2 size="18" />}
            >
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <Typography sx={{ fontSize: "16px" }}>Filters</Typography>
                {(appliedGenre?.length > 0 ||
                  returnRangeValueApplyStatus()) && (
                  <Dot color={theme.palette.error.main} />
                )}
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={3}>
                <Stack spacing={1}>
                  <Typography
                    sx={{ fontWeight: "500", color: theme.palette.grey[800] }}
                  >
                    Genre
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {allGenre?.map((item, index) => (
                      <Chip
                        size="small"
                        key={item.id || index}
                        label={item.name}
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleGenreClick(item.id)}
                        variant={
                          appliedGenre?.includes(item.id)
                            ? "filled"
                            : "outlined"
                        }
                        color={
                          appliedGenre?.includes(item.id)
                            ? "primary"
                            : "default"
                        }
                      />
                    ))}
                  </Box>
                </Stack>

                <Divider />

                <Stack spacing={1}>
                  <Typography
                    sx={{ fontWeight: "500", color: theme.palette.grey[800] }}
                  >
                    User Score
                  </Typography>
                  <Box>
                    <Slider
                      value={rangeValue}
                      onChange={handleRangeValueChange}
                      step={1}
                      marks={marks}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      min={0}
                      max={10}
                      disableSwap
                    />
                  </Box>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Grid2>
      </Grid2>
    </>
  );
};

export default Filter;

function valuetext(value) {
  return `${value}°C`;
}

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,
    label: "10",
  },
];
