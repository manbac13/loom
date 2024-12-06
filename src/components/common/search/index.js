import { useEffect, useState } from "react";

import { TextField } from "@mui/material";
import useMovie from "hooks/movie/useMovie";

const Search = ({ title = "Search..." }) => {
  const [search, setSearch] = useState("");
  const { setSearchAction } = useMovie();

  useEffect(() => {
    setSearchAction(search);
  }, [search]);
  return (
    <>
      <TextField
        fullWidth
        size="small"
        placeholder={title}
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
};

export default Search;
