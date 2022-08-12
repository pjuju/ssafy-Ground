import { useRef } from "react";
import ReactFrappeChart from "react-frappe-charts";

function UserGroundGraph(props) {
  const chartRef = useRef();

  return (
    <ReactFrappeChart
      ref={chartRef}
      type="donut"
      data={{
        labels: ["헬스", "요가", "필라테스", "러닝", "배드민턴", "테니스", "자전거", "홈트레이닝"],
        datasets: [{ values: [1, 2, 3, 1, 2, 3, 1] }],
      }}
    />
  );
}

export default UserGroundGraph;
