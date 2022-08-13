import { Grid } from "@mui/material";
import TitleBar from "components/common/TitleBar";
import { useOutletContext } from "react-router-dom";
import "styles/common/_utils.scss";

function ProfileEdit() {
  // Outlet에 생성한 context를 가져온다.
  const [onSetSideMenuIdx, onSetBottomMenuIdx] = useOutletContext();

  return (
    <Grid className="content profile-edit">
      <Grid className="content__title-desktop">
        <h2>프로필 수정</h2>
      </Grid>
      <Grid className="content__title-mobile">
        <TitleBar title="프로필 수정" />
      </Grid>
      <Grid id="inner" className="content__inner">
        <Grid className="">프로필</Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileEdit;
