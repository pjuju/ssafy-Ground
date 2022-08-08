import { Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Fragment } from "react";

function LatestSearch({ list }) {
  return (
    <Grid container>
      {list.map((item, index) => (
        <Fragment key={index}>
          <Grid item xs={11}>
            {item}
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => {}}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Fragment>
      ))}
    </Grid>
  );
}

export default LatestSearch;
