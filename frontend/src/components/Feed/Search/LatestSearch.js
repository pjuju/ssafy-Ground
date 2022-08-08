import * as React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

export default function LatestSearch() {
  return (
    <Grid container>
      <Box
        sx={{
          width: 300,
          height: 300,
          backgroundColor: "primary.dark",
          position: "absolute",
          zIndex: 100,
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      />
    </Grid>
  );
}
