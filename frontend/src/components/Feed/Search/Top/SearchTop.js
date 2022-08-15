import { Grid } from "@mui/material";

import SearchStandard from "./SearchStandard";
import SearchBar from "./SearchBar";

function SearchTop() {
  return (
    <Grid
      container
      className="search-inner__top"
      justifyContent="space-between"
    >
      <Grid item xs={2}>
        <SearchStandard />
      </Grid>
      <Grid item className="search-inner__search-bar" xs={12} sm={9.5}>
        <SearchBar />
      </Grid>
    </Grid>
  );
}

export default SearchTop;
