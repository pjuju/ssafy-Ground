import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Divider } from "@mui/material";

export default function SearchBar({ handleOpen, onSubmit, standard, field }) {
  const style = {
    p: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    border: "2px solid #54BAB9",
    boxShadow: "none",
  };

  return (
    <Paper component="div" sx={style}>
      {standard === "board" && (
        <>
          <IconButton sx={{ p: "10px" }} aria-label="menu" onClick={handleOpen}>
            <FilterAltIcon />
          </IconButton>
          <Divider
            sx={{ height: 28, m: 0.5, borderColor: "#54BAB9" }}
            orientation="vertical"
          />
        </>
      )}
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="검색어 입력"
        inputProps={{ "aria-label": "search google maps" }}
        {...field}
      />
      <IconButton
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={onSubmit}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
