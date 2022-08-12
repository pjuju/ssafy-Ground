import { useRef } from "react";
import ReactFrappeChart from "react-frappe-charts";
import { color } from "./colorPalette";

function UserGroundGraph(props) {
  const chartRef = useRef();

  return (
    <ReactFrappeChart
      ref={chartRef}
      type="donut"
      colors={color}
      data={{
        labels: [
          "헬스",
          "요가",
          "필라테스",
          "러닝",
          "홈트레이닝",
          "축구",
          "야구",
          "농구",
          "테니스",
          "배드민턴",
          "등산",
          "수영",
          "골프",
          "볼링",
          "자전거/사이클",
          "기타"
        ],
        datasets: [{ values: [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1] }],
      }}
    />
  );
}

export default UserGroundGraph;
