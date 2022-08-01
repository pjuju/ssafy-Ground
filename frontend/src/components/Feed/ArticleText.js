import GrTextField from "components/common/GrTextField";
import { Grid } from "@mui/material";


function ArticleText () {
  return (
    <Grid
      container
      direction="row">
      <GrTextField
        label="오늘은 어떤 운동을 하셨나요?"
      />
      <div>0/1,000자</div>
    </Grid> 
  )
}

export default ArticleText;
