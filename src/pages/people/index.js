import {
  Grid2,
  Typography,
  Fade,
  Card,
  CardMedia,
  CardContent,
  TextField,
} from "@mui/material";
import PaginationItem from "components/common/pagination";
import { renderSkeletonsForGrid } from "components/common/skeleton/forGrid";
import { imageUrl } from "config";
import usePeople from "hooks/people/usePeople";
import { debounce } from "lodash";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const People = () => {
  const navigate = useNavigate();
  const {
    peopleData,
    getPeopleAction,
    setPageAction,
    pageNumber,
    loading,
    getSearchedPeopleAction,
  } = usePeople();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayData, setDisplayData] = useState([]);

  //search
  const [search, setSearch] = useState("");

  const paramsForFetch = useMemo(() => {
    try {
      setIsTransitioning(true);
      return {
        page: pageNumber,
      };
    } catch (error) {
      return {
        page: 1,
      };
    }
  }, [pageNumber]);

  const debouncedSearch = useCallback(
    debounce((search) => {
      setIsTransitioning(true);
      getSearchedPeopleAction({ query: search });
    }, 600),
    []
  );

  useEffect(() => {
    if (search) {
      debouncedSearch(search);
    } else {
      getPeopleAction(paramsForFetch);
    }
    return () => debouncedSearch.cancel();
  }, [paramsForFetch, search]);

  useEffect(() => {
    if (!loading && peopleData) {
      const timer = setTimeout(() => {
        setDisplayData(peopleData?.results);
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading, peopleData]);

  return (
    <>
      <Grid2
        container
        sx={{ px: { xs: 4, sm: 6, md: 10, lg: 20 }, py: 2 }}
        spacing={2}
      >
        <Grid2 size={9}>
          <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
            Popular People
          </Typography>
        </Grid2>
        <Grid2 size={3}>
          <TextField
            size="small"
            fullWidth
            placeholder="Search people..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
          <Fade in={!isTransitioning} timeout={600}>
            <Grid2 container spacing={2} sx={{ alignItems: "stretch" }}>
              {!isTransitioning && displayData?.length > 0
                ? displayData.map((item, index) => (
                    <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                      <Card
                        onClick={() => navigate(`/people/${item.id}`)}
                        sx={{
                          height: "100%",
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: "0.3s ease-in-out",
                          "&:hover": {
                            transform: "scale(1.01)",
                          },
                        }}
                      >
                        <CardMedia
                          sx={{ height: "300px" }}
                          component={"img"}
                          src={`${imageUrl}${item.profile_path}`}
                        />
                        <CardContent
                          sx={{ p: 1 }}
                          style={{ paddingBottom: "8px" }}
                        >
                          <Typography sx={{ fontWeight: 600 }}>
                            {item.name}
                          </Typography>
                          <Typography sx={{ fontSize: "12px" }}>
                            {item.known_for
                              ?.map((item) => item.title || item.name)
                              ?.join(", ")}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid2>
                  ))
                : renderSkeletonsForGrid()}

              <Grid2
                size={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <PaginationItem
                  count={peopleData?.total_pages}
                  pageNumber={pageNumber}
                  setPageAction={setPageAction}
                  setIsTransitioning={setIsTransitioning}
                />
              </Grid2>
            </Grid2>
          </Fade>
        </Grid2>
      </Grid2>
    </>
  );
};

export default People;
