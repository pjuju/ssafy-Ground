import { useRef } from "react";
import ReactFrappeChart from "react-frappe-charts";
import { color } from "./colorPalette";
import { interest } from "assets/data/initData";
import { Grid } from "@mui/material";

const getLabels = (category) => {
  const labels = category.map((item) => interest[item.id - 1].value);
  return labels;
};

const getValues = (category) => {
  const values = category.map((item) => item.count);
  return values;
};

function UserGroundGraph(props) {
  const chartRef = useRef();
  const category = props.category;

  return (
    <>
      <Grid className="ground__title category-graph__title">
        <h2>통계</h2>
      </Grid>
      <ReactFrappeChart
        ref={chartRef}
        type="donut"
        colors={color}
        data={{
          labels: getLabels(category),
          datasets: [{ values: getValues(category) }],
        }}
      />
    </>
  );
}

export default UserGroundGraph;
