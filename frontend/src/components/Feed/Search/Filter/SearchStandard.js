import { FormControl, MenuItem, Select } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "components/common/theme.js";

function SearchStandard({standard, setStandard}) {
  return (
    <FormControl sx={{ minWidth: "100%", height: "100%" }}>
      <ThemeProvider theme={theme}>
        <Select
          inputProps={{ "aria-label": "Without label" }}
          size="small"
          value={standard}
          onChange={(e) => {
            setStandard(e.target.value);
          }}
          sx={{ height: "100%" }}
        >
          <MenuItem value="board">게시글</MenuItem>
          <MenuItem value="user">유저</MenuItem>
        </Select>
      </ThemeProvider>
    </FormControl>
  );
}

export default SearchStandard;
