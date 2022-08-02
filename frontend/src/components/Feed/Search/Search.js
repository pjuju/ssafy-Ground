const { Grid, Select, FormControl, InputLabel, MenuItem } = require("@mui/material");

function Search() {
  return (
    <Grid className="search-inner" container direction="column">
      <Grid className="search-inner__top" container direction="column">
        <Grid className="top__search-bar" container>
          <FormControl>
            <InputLabel id="search-standard">기준 선택</InputLabel>
            <Select labelId="search-standard" label="기준 선택">
              <MenuItem value="board">게시글</MenuItem>
              <MenuItem value="user">유저</MenuItem>
            </Select>
          </FormControl>
          <Grid item>검색바</Grid>
          <Grid item>버튼</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Search;
