import * as React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import LatestSearch from "./LatestSearch";
import { useState, useEffect } from "react";
import {
  deleteAllSearchBoard,
  deleteAllSearchUser,
  deleteSearchBoard,
  deleteSearchUser,
  getSearchBoard,
  getSearchUser,
} from "api/search";

function LatestSearchBox({ standard, setOpenLatest }) {
  const [latestBoard, setLatestBoard] = useState([]);
  const [latestUser, setLatestUser] = useState([]);

  const handleDeleteItem = (id) => {
    if (standard === "board") {
      deleteSearchBoard(id, (res) => {
        const deletedList = latestBoard.filter((board) => {return board.id !== id});
        setLatestBoard(deletedList);
      });
    } else if (standard === "user") {
      deleteSearchUser(id, (res) => {
        const deletedList = latestUser.filter((user) => {return user.id !== id});
        setLatestUser(deletedList);
      })
    }
  };

  const handleDeleteAll = (e) => {
    e.preventDefault();
    if (standard === "board") {
      deleteAllSearchBoard(
        (res) => {
          setLatestBoard([]);
        },
        (err) => {
          console.log(err);
        }
      );
    }  else if (standard === "user") {
      deleteAllSearchUser(
        (res) => {
          setLatestUser([]);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  useEffect(() => {
    // 보드 최근 검색 기록
    getSearchBoard(
      (res) => {
        setLatestBoard(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
    // 유저 최근 검색 기록
    getSearchUser(
      (res) => {
        setLatestUser(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <Grid container justifyContent="end">
      <Box className="search-latest-box-wrapper">
        <Grid container className="search-latest-box" direction="column">
          <h4>최근 검색어</h4>
          <Grid className="search-latest-box__content" item xs={9.3}>
            {standard === "board" && (
              <LatestSearch
                latest={latestBoard}
                handleDeleteItem={handleDeleteItem}
              />
            )}
            {standard === "user" && (
              <LatestSearch
                latest={latestUser}
                handleDeleteItem={handleDeleteItem}
              />
            )}
          </Grid>
          <Grid
            className="search-latest-box__deleteAll--wrapper"
            item
            textAlign="end"
          >
            <span
              className="search-latest-box__deleteAll"
              onClick={(e) => {
                setOpenLatest(true);
                handleDeleteAll(e);
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
