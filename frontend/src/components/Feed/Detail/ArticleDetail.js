import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";

function ArticleDetail() {
  const {id} = useParams();

  useEffect(() => {
    console.log(id);
  }, [])
  

  return <Grid className="content"></Grid>;
}

export default ArticleDetail;
