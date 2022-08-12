import CalendarHeatmap from "react-calendar-heatmap";
import "styles/Profile/UserStatic.scss";

const getStartDate = () => {
  const startDate = new Date();
  startDate.setFullYear(new Date().getFullYear() - 1);
  return startDate;
};

const getColorScale = (count) => {
  let colorScale = count;
  if(count > 4) colorScale = 4;
  return colorScale;
}

function UserGroundCalendar() {
  getStartDate();
  return (
    <CalendarHeatmap
      startDate={getStartDate()}
      endDate={new Date()}
      showMonthLabels={false}
      showWeekdayLabels
      weekdayLabels={["S", "M", "T", "W", "T", "F", "S"]}
      values={[
        { date: "2022-08-01", count: 1 },
        { date: "2022-08-02", count: 2 },
        { date: "2022-08-03", count: 3 },
        { date: "2022-08-04", count: 4 },
        // ...and so on
      ]}
      classForValue={(value) => {
        if (!value) {
          return 'color-empty';
        }
        return `color-scale-${getColorScale(value.count)}`;
      }}
    />
  );
}

export default UserGroundCalendar;
