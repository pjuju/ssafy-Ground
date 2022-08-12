import { Grid } from "@mui/material";
import { type } from "../initData";

function SearchSort({ sortType, setSortType, onSubmit }) {
  return (
    <Grid className="search-inner__result__sort-wrapper" container>
      {type.map((item, index) => (
        <Grid
          className="search-inner__result__sort"
          key={index}
          item
          sx={
            sortType === item.id ? { color: "black", fontWeight: "bold" } : {}
          }
          onClick={() => {
            setSortType(item.id);
            onSubmit(item.id);
          }}
        >
          {item.value}
        </Grid>
      ))}
    </Grid>
  );
}

export default SearchSort;
