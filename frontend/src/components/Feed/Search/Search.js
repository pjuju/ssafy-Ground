import { Grid, Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import "styles/Search/Search.scss";

function Search() {
  return (
    <Grid className="search-inner" item>
      <Grid container>
        <FormControl>
          <InputLabel id="search-standard">기준 선택</InputLabel>
          <Select labelId="search-standard" label="기준 선택">
            <MenuItem value="board">게시글</MenuItem>
            <MenuItem value="user">유저</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default Search;
