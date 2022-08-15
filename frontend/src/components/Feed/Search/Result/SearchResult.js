import { Grid } from "@mui/material";

import { useSearchState } from "../SearchContext";

import BoardSearchResult from "./board/BoardSearchResult";
import UserSearchResult from "./user/UserSearchResult";

function SearchResult() {
  const { standard } = useSearchState();
  return (
    <Grid className="search-inner__result" container direction="column">
      {standard === 0 && <BoardSearchResult />}
      {standard === 1 && <UserSearchResult />}
    </Grid>
  );
}

export default SearchResult;
