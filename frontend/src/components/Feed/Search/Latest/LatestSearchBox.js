import * as React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import LatestSearch from "./LatestSearch";
import { useState } from "react";
import {
  deleteAllSearchBoard,
  deleteAllSearchUser,
  deleteSearchBoard,
  deleteSearchUser,
} from "api/search";

function LatestSearchBox({
  standard,
  setOpenLatest,
  latestBoard,
  latestUser,
  setLatestSearchBoard,
  setLatestSearchUser,
}) {
  const [curLatestBoard, setCurLatestBoard] = useState(latestBoard);
  const [curLatestUser, setCurLatestUser] = useState(latestUser);

  const handleDeleteItem = (id) => {
    if (standard === "board") {
      deleteSearchBoard(id, (res) => {
        const deletedList = latestBoard.filter((board) => {
          return board.id !== id;
        });
        setCurLatestBoard(deletedList);
        setLatestSearchBoard(deletedList);
      });
    } else if (standard === "user") {
      deleteSearchUser(id, (res) => {
        const deletedList = latestUser.filter((user) => {
          return user.id !== id;
        });
        setCurLatestUser(deletedList);
        setLatestSearchUser(deletedList);
      });
    }
  };

  const handleDeleteAll = (e) => {
    e.preventDefault();
    if (standard === "board") {
      deleteAllSearchBoard(
        (res) => {
          setCurLatestBoard([]);
          setLatestSearchBoard([]);
        },
        (err) => {
          console.log(err);
        }
      );
    } else if (standard === "user") {
      deleteAllSearchUser(
        (res) => {
          setCurLatestUser([]);
          setLatestSearchUser([]);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  return (
    <Grid container justifyContent="end">
      <Box className="search-latest-box-wrapper">
        <Grid container className="search-latest-box" direction="column">
          <h4>최근 검색어</h4>
          <Grid className="search-latest-box__content" item>
            {standard === "board" && (
              <LatestSearch
                latest={curLatestBoard}
                handleDeleteItem={handleDeleteItem}
                setOpenLatest={setOpenLatest}
              />
            )}
            {standard === "user" && (
              <LatestSearch
                latest={curLatestUser}
                handleDeleteItem={handleDeleteItem}
                setOpenLatest={setOpenLatest}
              />
            )}
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
                if(tabIndex !== -1) {
                  setOpenLatest(false);
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
