import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";

function ArticleDetail() {
  const { boardId } = useParams();

  useEffect(() => {
    console.log(boardId);
  }, [])
  

  return <Grid className="content"></Grid>;
}

export default ArticleDetail;
