import "styles/Search/Search.scss";
import { Grid } from "@mui/material";

import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { SearchProvider } from "./SearchContext";

import SearchTitle from "./Top/SearchTitle";
import SearchTop from "./Top/SearchTop";
import SearchResult from "./Result/SearchResult";

function Search() {
  const [onSetSideMenuIdx, onSetBottomMenuIdx] = useOutletContext();

  // 새로고침 시 Navbar가 알맞은 메뉴 인덱스를 가리키도록 함
  useEffect(() => {
    onSetSideMenuIdx(2);
    onSetBottomMenuIdx(3);
  }, []);

  return (
    <Grid className="content">
      <SearchProvider>
        <SearchTitle />
        <Grid className="search-inner" item>
          <SearchTop />
          <SearchResult />
        </Grid>
      </SearchProvider>
    </Grid>
  );
}

export default Search;
