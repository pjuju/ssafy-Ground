import { FormControl, MenuItem, Select } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import { useSearchState, useSearchDispatch } from "../SearchContext";

import theme from "components/common/theme.js";

function SearchStandard() {
  const { standard } = useSearchState();
  const dispatch = useSearchDispatch();

  return (
    <FormControl sx={{ minWidth: "100%", height: "100%" }}>
      <ThemeProvider theme={theme}>
        <Select
          inputProps={{ "aria-label": "Without label" }}
          size="small"
          value={standard}
          onChange={(e) => {
            dispatch({ type: "standard" });
          }}
          sx={{ height: "100%" }}
        >
          <MenuItem value={0}>게시글</MenuItem>
          <MenuItem value={1}>유저</MenuItem>
        </Select>
      </ThemeProvider>
    </FormControl>
  );
}

export default SearchStandard;
