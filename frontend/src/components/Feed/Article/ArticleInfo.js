import { Grid } from "@mui/material";

function ArticleInfo(props) {
  const formatDate = (date) => {
    // let converted = new Date();
    let converted = new Date(Date.parse(date));
    let diff = new Date() - converted; // 차이(ms)

    // 차이가 1초 미만이라면
    if (diff < 1000) {
      return "방금";
    }

    let sec = Math.floor(diff / 1000); // 차이를 초로 변환

    if (sec < 60) {
      return sec + "초 전";
    }

    let min = Math.floor(diff / 60000); // 차이를 분으로 변환
    if (min < 60) {
      return min + "분 전";
    }

    let hour = Math.floor(diff / 360000); // 차이를 분으로 변환
    if (hour < 24) {
      return min + "시간 전";
    }

    // 날짜의 포맷을 변경
    // 일, 월, 시, 분이 숫자 하나로 구성되어있는 경우, 앞에 0을 추가해줌
    let d = converted;
    d = [
      "" + d.getFullYear(),
      "0" + (d.getMonth() + 1),
      "0" + d.getDate(),
      "0" + d.getHours(),
      "0" + d.getMinutes(),
    ].map((component) => component.slice(-2)); // 모든 컴포넌트의 마지막 숫자 2개를 가져옴

    // 컴포넌트를 조합
    return d.slice(0, 3).join(".") + " " + d.slice(3).join(":");
  };

  return (
    <Grid className="info" container direction="row">
      <Grid className="info__others">
        <Grid className="info__others__username bold">{props.nickname}</Grid>
        <Grid className="info__others__category">{props.category}</Grid>
      </Grid>
      <Grid className="info__regtime">{formatDate(props.date)}</Grid>
    </Grid>
  );
}

export default ArticleInfo;
