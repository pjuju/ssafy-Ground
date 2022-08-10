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
      >
        <Grid container>
          <div
            className="id-result__box"
          >
            등록된 아이디는<span className="id-result__highlight"> {userId}</span> 입니다.
          </div>
        </Grid>
        <Grid container alignItems="center" justifyContent="center">
          <GrButton className="findid-form__button" variant="contained">
            로그인 하러 가기
          </GrButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default IdResult;