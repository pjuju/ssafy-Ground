import { Grid }  from "@mui/material";
import GrButton from 'components/common/GrButton';

function IdResult() {
	return (
			<div style={{width: 512}}>
				<Grid item>
					<div 
          style={{
            height: "200px",
            boxShadow: "2px 4px 4px grey",
            textAlign: "center",
            lineHeight: "200px"
          }}>
						등록된 아이디는 userid입니다.
					</div>
				</Grid>
				<Grid item>
          <GrButton
            className="findid-form__button"
            variant="contained"
          >
            로그인 하러 가기
          </GrButton>
				</Grid>
			</div>
	)
};

export default IdResult;