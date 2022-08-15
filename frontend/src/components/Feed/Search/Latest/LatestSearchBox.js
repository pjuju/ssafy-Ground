import * as React from "react";
import { Grid, Box } from "@mui/material";
import LatestSearch from "./LatestSearch";
import { useEffect } from "react";
import { getSearchBoard, getSearchUser } from "api/search";

import {
  deleteAllSearchBoard,
  deleteAllSearchUser,
  deleteSearchBoard,
  deleteSearchUser,
} from "api/search";
import { useSearchState } from "../SearchContext";
import { useState } from "react";

function LatestSearchBox({ open, setOpen, handleLatestClick }) {
  const { standard } = useSearchState();
  const [userLatest, setUserLatest] = useState([]);
  const [boardLatest, setBoardLatest] = useState([]);

  useEffect(() => {
    getSearchBoard((res) => {
      setBoardLatest(res.data);
    });
    getSearchUser((res) => {
      setUserLatest(res.data);
    });
  }, []);

  const handleDeleteItem = (id) => {
    if (standard === 0) {
      deleteSearchBoard(id, (res) => {
        const deletedList = boardLatest.filter((board) => {
          return board.id !== id;
        });
        setBoardLatest(deletedList);
      });
    } else if (standard === 1) {
      deleteSearchUser(id, (res) => {
        const deletedList = userLatest.filter((user) => {
          return user.id !== id;
        });
        setUserLatest(deletedList);
      });
    }
  };

  const handleDeleteAll = (e) => {
    e.preventDefault();
    if (standard === 0) {
      deleteAllSearchBoard((res) => {
        setBoardLatest([]);
      });
    } else if (standard === 1) {
      deleteAllSearchUser((res) => {
        setUserLatest([]);
      });
    }
  };

  return (
    <Grid container justifyContent="end">
      <Box className="search-latest-box-wrapper">
        <Grid container className="search-latest-box" direction="column">
          <h4>최근 검색어</h4>
          <Grid className="search-latest-box__content" item>
            <LatestSearch
              latest={standard === 0 ? boardLatest : userLatest}
              setOpen={setOpen}
              handleDeleteItem={handleDeleteItem}
              handleLatestClick={handleLatestClick}
            />
          </Grid>
          <Grid
            className="search-latest-box__deleteAll--wrapper"
            item
            textAlign="end"
          >
            <span
              tabIndex={-1}
              className="search-latest-box__deleteAll"
              onClick={(e) => {
                handleDeleteAll(e);
              }}
              onBlur={(e) => {
                const tabIndex = e.relatedTarget?.tabIndex;
                if (tabIndex !== -1) {
                  setOpen(false);
                }
              }}
            >
              전체 삭제
            </span>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default LatestSearchBox;
