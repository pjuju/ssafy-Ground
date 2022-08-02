const {
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} = require("@mui/material");

function Search() {
  return (
    <Grid item>
      <FormControl>
        <InputLabel id="search-standard">기준 선택</InputLabel>
        <Select labelId="search-standard" label="기준 선택">
          <MenuItem value="board">게시글</MenuItem>
          <MenuItem value="user">유저</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
}

export default Search;
