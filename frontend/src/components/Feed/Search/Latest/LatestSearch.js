import { Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Fragment } from "react";

function LatestSearch({ latest, handleDeleteItem }) {
  return (
    <Grid container>
      {latest.map((item, index) => (
        <Fragment key={index}>
          <Grid item xs={11}>
            {item.word}
          </Grid>
          <Grid item xs={1}>
            <IconButton
              onClick={() => {
                // console.log(item.id + " 삭제!")
               handleDeleteItem(item.id);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Fragment>
      ))}
    </Grid>
  );
}

export default LatestSearch;
