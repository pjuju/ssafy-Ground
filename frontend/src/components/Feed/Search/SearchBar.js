import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Divider, Grid } from "@mui/material";
import LatestSearchBox from "./Latest/LatestSearchBox";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLatestSearchBoard, setLatestSearchUser } from "modules/search";
import { getSearchBoard, getSearchUser } from "api/search";

export default function SearchBar({
  handleOpen,
  onSubmit,
  standard,
  word,
  setWord,
}) {
  const [openLatest, setOpenLatest] = useState(false);
  const latestBoard = useSelector((state) => state.search.latestBoard);
  const latestUser = useSelector((state) => state.search.latestUser);

  const dispatch = useDispatch();

  const onSetLatestSearchBoard = (latestBoard) =>
    dispatch(setLatestSearchBoard(latestBoard));
  const onSetLatestSearchUser = (latestUser) =>
    dispatch(setLatestSearchUser(latestUser));

  useEffect(() => {
    getSearchBoard((res) => {
      onSetLatestSearchBoard(res.data);
    });
    getSearchUser((res) => {
      onSetLatestSearchUser(res.data);
    });
  }, []);

  return (
    <Grid className="search-bar" container>
      <Paper className="search-bar__wrapper" component="div">
        {standard === "board" ? (
          <IconButton sx={{ p: "10px" }} onClick={handleOpen}>
            <FilterAltIcon />
          </IconButton>
        ) : (
          <IconButton sx={{ p: "10px" }} disabled>
            <FilterAltOffIcon />
          </IconButton>
        )}
        <Divider
          sx={{ height: 28, m: 0.5, borderColor: "#54BAB9" }}
          orientation="vertical"
        />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="검색어 입력"
          inputProps={{ "aria-label": "search google maps" }}
          value={word}
          tabIndex={-1}
          onChange={(e) => {
            setWord(e.target.value);
          }}
          onFocus={() => setOpenLatest(true)}
          onBlur={(e) => {
            const tabIndex = e.relatedTarget?.tabIndex;
            if(tabIndex !== -1) {
              setOpenLatest(false);
            }
          }}
        />
        <IconButton
          type="submit"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={async (e) => {
            e.preventDefault();
            await onSubmit();
            if (standard === "board") {
              getSearchBoard((res) => {
                onSetLatestSearchBoard(res.data);
              });
            } else {
              getSearchUser((res) => {
                onSetLatestSearchUser(res.data);
              });
            }
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      {openLatest && (
        <LatestSearchBox
          standard={standard}
          setOpenLatest={setOpenLatest}
          latestBoard={latestBoard}
          latestUser={latestUser}
          setLatestSearchBoard={setLatestSearchBoard}
          setLatestSearchUser={setLatestSearchUser}
        />
      )}
    </Grid>
  );
}
