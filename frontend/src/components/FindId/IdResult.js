import { Grid }  from "@mui/material";
import GrButton from 'components/common/GrButton';

function IdResult({onSetIdFlag, idFlag, userId}) {
	return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ width: 512 }}
      >
        <Grid item style={{width: "100%"}}>
          <div
            style={{
              width: "100%",
              height: "200px",
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              textAlign: "center",
              lineHeight: "200px",
            }}
          >
            등록된 아이디는 {userId} 입니다.
          </div>
        </Grid>
        <Grid item alignItems="center" justifyContent="center">
          <GrButton className="findid-form__button" variant="contained">
            로그인 하러 가기
          </GrButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default IdResult;